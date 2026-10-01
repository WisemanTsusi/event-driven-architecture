import type {DomainEvent} from "../core/events.js";
import type {EventBroker,EventHandler,Subscription} from "../core/broker.js";
import {withRetry} from "../core/retry.js";
import type {IdempotencyStore} from "../core/idempotency.js";

interface Registration{type:string;handler:EventHandler}
export class InMemoryEventBroker implements EventBroker{
  private readonly subscriptions:Registration[]=[];
  private readonly deadLetters:DomainEvent[]=[];
  constructor(private readonly idempotency:IdempotencyStore,private readonly maxRetries=3,private readonly baseDelayMs=25){}
  async publish(event:DomainEvent){
    const regs=this.subscriptions.filter(s=>s.type===event.type);
    await Promise.all(regs.map(async({handler})=>{
      if(await this.idempotency.has(event.id))return;
      try{
        await withRetry(()=>handler(event),{maxAttempts:this.maxRetries,baseDelayMs:this.baseDelayMs,maxDelayMs:1000});
        await this.idempotency.markProcessed(event.id);
      }catch{this.deadLetters.push(event)}
    }));
  }
  subscribe(eventType:string,handler:EventHandler):Subscription{
    const registration={type:eventType,handler};this.subscriptions.push(registration);
    return {unsubscribe:()=>{const i=this.subscriptions.indexOf(registration);if(i>=0)this.subscriptions.splice(i,1)}};
  }
  getDeadLetters(){return [...this.deadLetters]}
  async replayDeadLetters(){const pending=this.deadLetters.splice(0);for(const e of pending)await this.publish(e);return pending.length}
}
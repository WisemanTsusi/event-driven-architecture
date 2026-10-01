import type {DomainEvent} from "./events.js";
export type EventHandler=(event:DomainEvent)=>Promise<void>;
export interface Subscription{unsubscribe():void}
export interface EventBroker{
  publish(event:DomainEvent):Promise<void>;
  subscribe(eventType:string,handler:EventHandler):Subscription;
  getDeadLetters():DomainEvent[];
  replayDeadLetters():Promise<number>;
}
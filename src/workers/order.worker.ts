import type {DomainEvent} from "../core/events.js";
export interface OrderProjection{handledOrderIds:string[]}
export function registerOrderWorker(subscribe:(type:string,handler:(event:DomainEvent)=>Promise<void>)=>{unsubscribe():void},projection:OrderProjection){
  return subscribe("order.created",async event=>{
    const data=event.data as {orderId?:string};
    if(!data.orderId)throw new Error("orderId is required");
    projection.handledOrderIds.push(data.orderId);
  });
}
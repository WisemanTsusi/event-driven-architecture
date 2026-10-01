import {createEvent,type DomainEvent} from "../core/events.js";
export function createOrderCreatedEvent(tenantId:string,orderId:string,correlationId=orderId):DomainEvent{
  return createEvent({type:"order.created",source:"order-service",subject:`orders/${orderId}`,tenantId,correlationId,causationId:correlationId,data:{orderId}});
}
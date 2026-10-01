import { randomUUID } from "node:crypto";
import { z } from "zod";

export const eventSchema = z.object({
  id:z.string().uuid(), type:z.string().min(1), source:z.string().min(1),
  subject:z.string().optional(), time:z.string().datetime(), specversion:z.literal("1.0"),
  datacontenttype:z.literal("application/json"), tenantId:z.string().min(1),
  correlationId:z.string().min(1), causationId:z.string().min(1), data:z.unknown()
});
export type DomainEvent=z.infer<typeof eventSchema>;
export function createEvent<T>(input:Omit<DomainEvent,"id"|"time"|"specversion"|"datacontenttype">&{data:T}):DomainEvent{
  return {...input,id:randomUUID(),time:new Date().toISOString(),specversion:"1.0",datacontenttype:"application/json"};
}
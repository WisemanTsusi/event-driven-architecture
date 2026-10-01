import {describe,expect,it} from "vitest";
import {InMemoryEventBroker} from "../src/infrastructure/in-memory-broker.js";
import {InMemoryIdempotencyStore} from "../src/core/idempotency.js";
import {createEvent} from "../src/core/events.js";
describe("broker",()=>{
 it("delivers and deduplicates",async()=>{const b=new InMemoryEventBroker(new InMemoryIdempotencyStore(),2,1);const received:string[]=[];b.subscribe("demo.created",async e=>{received.push(e.id)});const e=createEvent({type:"demo.created",source:"test",tenantId:"t1",correlationId:"c1",causationId:"c1",data:{}});await b.publish(e);await b.publish(e);expect(received).toEqual([e.id])});
 it("dead-letters exhausted events",async()=>{const b=new InMemoryEventBroker(new InMemoryIdempotencyStore(),2,1);b.subscribe("demo.failed",async()=>{throw Error("failure")});const e=createEvent({type:"demo.failed",source:"test",tenantId:"t1",correlationId:"c1",causationId:"c1",data:{}});await b.publish(e);expect(b.getDeadLetters()).toHaveLength(1)});
});
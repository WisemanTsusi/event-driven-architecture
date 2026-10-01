import {describe,expect,it} from "vitest";
import {createOrderCreatedEvent} from "../src/services/order.service.js";
import {registerOrderWorker} from "../src/workers/order.worker.js";
describe("order workflow",()=>it("projects order-created",async()=>{const handlers=new Map<string,any>();const p={handledOrderIds:[] as string[]};registerOrderWorker((t,h)=>{handlers.set(t,h);return{unsubscribe(){}}},p);await handlers.get("order.created")(createOrderCreatedEvent("t1","order-123"));expect(p.handledOrderIds).toEqual(["order-123"])}));
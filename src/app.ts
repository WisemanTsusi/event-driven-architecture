import helmet from "helmet";
import pino from "pino";
import {InMemoryEventBroker} from "./infrastructure/in-memory-broker.js";
import {InMemoryIdempotencyStore} from "./core/idempotency.js";
import {registerOrderWorker} from "./workers/order.worker.js";
import {createHttpApp} from "./api/http.js";
export function createApp(){
  const logger=pino({level:process.env.LOG_LEVEL??"info"});
  const broker=new InMemoryEventBroker(new InMemoryIdempotencyStore(),Number(process.env.MAX_RETRIES??3),Number(process.env.BASE_RETRY_DELAY_MS??25));
  const projection={handledOrderIds:[] as string[]};
  registerOrderWorker((type,handler)=>broker.subscribe(type,handler),projection);
  const app=createHttpApp(broker);app.use(helmet());return {app,broker,projection,logger};
}
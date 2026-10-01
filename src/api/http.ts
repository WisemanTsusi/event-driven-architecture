import express from "express";
import {z} from "zod";
import type {EventBroker} from "../core/broker.js";
import {createOrderCreatedEvent} from "../services/order.service.js";
const schema=z.object({tenantId:z.string().min(1),orderId:z.string().min(1),correlationId:z.string().min(1).optional()});
export function createHttpApp(broker:EventBroker){
  const app=express();app.use(express.json({limit:"256kb"}));
  app.get("/health",(_req,res)=>res.json({status:"ok"}));app.get("/ready",(_req,res)=>res.json({status:"ready"}));
  app.post("/api/v1/events/order-created",async(req,res,next)=>{try{const i=schema.parse(req.body);const e=createOrderCreatedEvent(i.tenantId,i.orderId,i.correlationId);await broker.publish(e);res.status(202).json({accepted:true,event:e})}catch(e){next(e)}});
  app.get("/api/v1/dead-letters",(_req,res)=>res.json({events:broker.getDeadLetters()}));
  app.post("/api/v1/dead-letters/replay",async(_req,res,next)=>{try{res.json({replayed:await broker.replayDeadLetters()})}catch(e){next(e)}});
  app.use((error:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
    if(error instanceof z.ZodError)return res.status(400).json({error:"validation_error",issues:error.issues});
    return res.status(500).json({error:"internal_error"});
  });return app;
}
import {createApp} from "./app.js";
const port=Number(process.env.PORT??3000);const {app,logger}=createApp();
app.listen(port,()=>logger.info({port},"event-driven reference service started"));
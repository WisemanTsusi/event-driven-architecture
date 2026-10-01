import {describe,expect,it} from "vitest";
import {withRetry} from "../src/core/retry.js";
describe("withRetry",()=>{
 it("retries transient failures",async()=>{let calls=0;const r=await withRetry(async()=>{calls++;if(calls<3)throw Error("temporary");return"ok"},{maxAttempts:3,baseDelayMs:1});expect(r.value).toBe("ok");expect(r.attempts).toBe(3)});
 it("throws after max attempts",async()=>{await expect(withRetry(async()=>{throw Error("permanent")},{maxAttempts:2,baseDelayMs:1})).rejects.toThrow("permanent")});
});
export interface RetryPolicy{maxAttempts:number;baseDelayMs:number;maxDelayMs?:number}
export async function withRetry<T>(operation:(attempt:number)=>Promise<T>,policy:RetryPolicy):Promise<{value:T;attempts:number}>{
  let lastError:unknown;
  for(let attempt=1;attempt<=policy.maxAttempts;attempt++){
    try{return {value:await operation(attempt),attempts:attempt}}catch(error){
      lastError=error;if(attempt===policy.maxAttempts)break;
      const delay=Math.min(policy.baseDelayMs*2**(attempt-1),policy.maxDelayMs??Number.MAX_SAFE_INTEGER);
      await new Promise(r=>setTimeout(r,delay));
    }
  }
  throw lastError;
}
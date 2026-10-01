export interface IdempotencyStore{has(eventId:string):Promise<boolean>;markProcessed(eventId:string):Promise<void>}
export class InMemoryIdempotencyStore implements IdempotencyStore{
  private readonly processed=new Set<string>();
  async has(eventId:string){return this.processed.has(eventId)}
  async markProcessed(eventId:string){this.processed.add(eventId)}
}
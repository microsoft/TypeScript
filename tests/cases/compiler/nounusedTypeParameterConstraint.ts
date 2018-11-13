// @noUnusedLocals: true
// @noUnusedParameters:true

//@filename: bar.ts
export interface IEventSourcedEntity { }

//@filename: test.ts
import { IEventSourcedEntity } from "./bar";
export type DomainEntityConstructor<TEntity extends IEventSourcedEntity> = { new(): TEntity; };
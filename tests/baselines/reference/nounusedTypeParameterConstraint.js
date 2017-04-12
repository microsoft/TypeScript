//// [tests/cases/compiler/nounusedTypeParameterConstraint.ts] ////

//// [bar.ts]
export interface IEventSourcedEntity { }

//// [test.ts]
import { IEventSourcedEntity } from "./bar";
export type DomainEntityConstructor<TEntity extends IEventSourcedEntity> = { new(): TEntity; };

//// [bar.js]
"use strict";
exports.__esModule = true;
//// [test.js]
"use strict";
exports.__esModule = true;

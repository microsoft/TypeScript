//// [tests/cases/compiler/nounusedTypeParameterConstraint.ts] ////

//// [bar.ts]
export interface IEventSourcedEntity { }

//// [test.ts]
import { IEventSourcedEntity } from "./bar";
export type DomainEntityConstructor<TEntity extends IEventSourcedEntity> = { new(): TEntity; };

//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

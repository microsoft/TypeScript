//// [tests/cases/compiler/importPropertyFromMappedType.ts] ////

//// [errors.d.ts]
export = createHttpError;
declare const createHttpError: createHttpError.NamedConstructors;
declare namespace createHttpError {
    type NamedConstructors =  { [P in 'NotFound']: unknown;}
}

//// [main.ts]
import { NotFound } from './errors'


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

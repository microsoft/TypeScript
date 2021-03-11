//// [tests/cases/compiler/importPropertyFromMappedType.ts] ////

//// [errors.d.ts]
// #42957

export = createHttpError;
declare const createHttpError: createHttpError.NamedConstructors;
declare namespace createHttpError {
    type NamedConstructors =  { [P in 'NotFound']: unknown;}
}

//// [main.ts]
import { NotFound } from './errors'


//// [main.js]
"use strict";
exports.__esModule = true;

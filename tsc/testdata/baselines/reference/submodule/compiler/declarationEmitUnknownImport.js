//// [tests/cases/compiler/declarationEmitUnknownImport.ts] ////

//// [declarationEmitUnknownImport.ts]
import Foo = SomeNonExistingName
export {Foo}

//// [declarationEmitUnknownImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;

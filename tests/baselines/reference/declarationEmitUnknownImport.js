//// [tests/cases/compiler/declarationEmitUnknownImport.ts] ////

//// [declarationEmitUnknownImport.ts]
import Foo = SomeNonExistingName
export {Foo}

//// [declarationEmitUnknownImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = SomeNonExistingName;
exports.Foo = Foo;


//// [declarationEmitUnknownImport.d.ts]
import Foo = SomeNonExistingName;
export { Foo };

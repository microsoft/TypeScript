//// [declarationEmitUnknownImport.ts]
import Foo = SomeNonExistingName
export {Foo}

//// [declarationEmitUnknownImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = SomeNonExistingName;
exports.Foo = Foo;

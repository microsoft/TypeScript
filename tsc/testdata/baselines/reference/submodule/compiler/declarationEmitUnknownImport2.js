//// [tests/cases/compiler/declarationEmitUnknownImport2.ts] ////

//// [declarationEmitUnknownImport2.ts]
import Foo From './Foo'; // Syntax error
export default Foo

//// [declarationEmitUnknownImport2.js]
"use strict";
'./Foo'; // Syntax error
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;

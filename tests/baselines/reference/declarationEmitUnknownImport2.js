//// [declarationEmitUnknownImport2.ts]
import Foo From './Foo'; // Syntax error
export default Foo

//// [declarationEmitUnknownImport2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = From;
'./Foo'; // Syntax error
exports.default = Foo;

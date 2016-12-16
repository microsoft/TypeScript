//// [declarationEmitUnknownImport2.ts]

import Foo From './Foo'; // Syntax error
export default Foo

//// [declarationEmitUnknownImport2.js]
"use strict";
var Foo = From;
'./Foo'; // Syntax error
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foo;

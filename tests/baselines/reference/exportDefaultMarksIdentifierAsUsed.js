//// [tests/cases/compiler/exportDefaultMarksIdentifierAsUsed.ts] ////

//// [a.js]
const Obj = {};
export default Obj;
//// [b.js]
import Obj from './a';

Obj.fn = function() {};

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Obj = {};
exports.default = Obj;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
a_1.default.fn = function () { };

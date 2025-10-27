//// [tests/cases/compiler/exportDefaultAbstractClass.ts] ////

//// [a.ts]
export default abstract class A { a: number; }

class B extends A {}
new B().a.toExponential();

//// [b.ts]
import A from './a';

class C extends A {}
new C().a.toExponential();

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
    a;
}
exports.default = A;
class B extends A {
}
new B().a.toExponential();
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
class C extends a_1.default {
}
new C().a.toExponential();

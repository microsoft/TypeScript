//// [tests/cases/compiler/allowSyntheticDefaultImports3.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.ts]
export class Foo {
	member: string;
}


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    member;
}
exports.Foo = Foo;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const b_1 = require("./b");
exports.x = new b_1.default.Foo();

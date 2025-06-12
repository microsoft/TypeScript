//// [tests/cases/compiler/declarationEmitExpressionInExtends6.ts] ////

//// [index.d.ts]
declare const require: any;

//// [a.ts]
export class Foo {}

//// [b.ts]
import * as A from "./a";
const { Foo } = A;
export default class extends Foo {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = require("./a");
const { Foo } = A;
class default_1 extends Foo {
}
exports.default = default_1;


//// [a.d.ts]
export declare class Foo {
}
//// [b.d.ts]
import * as A from "./a";
declare const Foo: typeof A.Foo;
export default class extends Foo {
}
export {};

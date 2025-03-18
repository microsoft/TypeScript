//// [tests/cases/conformance/decorators/class/constructor/decoratorOnClassConstructor3.ts] ////

//// [0.ts]
export class base { }
export function foo(target: Object, propertyKey: string | symbol, parameterIndex: number) { }

//// [2.ts]
import {base} from "./0"
import {foo} from "./0"

/* Comment on the Class Declaration */
export class C  extends base{
    constructor(@foo prop: any) {
        super();
    }
}

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
exports.foo = foo;
class base {
}
exports.base = base;
function foo(target, propertyKey, parameterIndex) { }
//// [2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const _0_1 = require("./0");
const _0_2 = require("./0");
class C extends _0_1.base {
    constructor(prop) {
        super();
    }
}
exports.C = C;

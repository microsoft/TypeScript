//// [tests/cases/compiler/keyofModuleObjectHasCorrectKeys.ts] ////

//// [example.ts]
export default function add(a: number, b: number) {
    return a + b;
}

//// [test.ts]
import * as example from './example';

declare function test<T>(object: T, method: keyof T): void;

test(example, "default");


//// [example.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = add;
function add(a, b) {
    return a + b;
}
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var example = require("./example");
test(example, "default");

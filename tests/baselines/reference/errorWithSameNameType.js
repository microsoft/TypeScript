//// [tests/cases/compiler/errorWithSameNameType.ts] ////

//// [a.ts]
export interface F {
    foo1: number
}

//// [b.ts]
export interface F {
    foo2: number
}

//// [c.ts]
import * as A from './a'
import * as B from './b'

let a: A.F
let b: B.F

if (a === b) {

}

a = b


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
//// [c.js]
"use strict";
exports.__esModule = true;
var a;
var b;
if (a === b) {
}
a = b;

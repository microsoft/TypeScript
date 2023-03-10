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
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a;
var b;
if (a === b) {
}
a = b;

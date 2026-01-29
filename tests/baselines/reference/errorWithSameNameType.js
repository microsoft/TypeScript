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

declare let a: A.F
declare let b: B.F

if (a === b) {

}

a = b


//// [a.js]
export {};
//// [b.js]
export {};
//// [c.js]
if (a === b) {
}
a = b;
export {};

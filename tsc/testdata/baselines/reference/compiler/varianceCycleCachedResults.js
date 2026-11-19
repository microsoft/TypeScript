//// [tests/cases/compiler/varianceCycleCachedResults.ts] ////

//// [first.ts]
declare let b1: Box<string>;
declare let b2: Box<number>;
b1 = b2;

//// [box.ts]
declare let a1: Box<string>;
declare let a2: Box<number>;
declare const cond: boolean;
class Box<T> {
    value!: T;
    m() {
        if (cond) return a1;
        return a2;
    }
}
const r = new Box<boolean>().m();


//// [first.js]
"use strict";
b1 = b2;
//// [box.js]
"use strict";
class Box {
    value;
    m() {
        if (cond)
            return a1;
        return a2;
    }
}
const r = new Box().m();

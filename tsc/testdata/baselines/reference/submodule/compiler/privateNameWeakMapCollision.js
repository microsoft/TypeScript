//// [tests/cases/compiler/privateNameWeakMapCollision.ts] ////

//// [privateNameWeakMapCollision.ts]
function test() {
    let WeakMap;
    let WeakSet;
    class C {
        #x;
    }
}


//// [privateNameWeakMapCollision.js]
"use strict";
function test() {
    let WeakMap;
    let WeakSet;
    class C {
        #x;
    }
}

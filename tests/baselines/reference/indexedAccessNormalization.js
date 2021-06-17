//// [indexedAccessNormalization.ts]
// Repro from from #43152

type MyMap<M extends object> = {
    [K in keyof M]: {
        x: number
    }
}

declare function g<T>(value?: T): void;

function f1<M extends object>(mymap: MyMap<M>, k: keyof M) {
    const elemofM = mymap[k];
    g(elemofM);
}

function f2<M extends object>(mymap: MyMap<M>, k: keyof M, z: { x: number }) {
    const q1: MyMap<M>[keyof M] = z;
    const q2: MyMap<M>[keyof M] | undefined = z;
    const q3: MyMap<M>[keyof M] | string = z;
}


//// [indexedAccessNormalization.js]
"use strict";
// Repro from from #43152
function f1(mymap, k) {
    var elemofM = mymap[k];
    g(elemofM);
}
function f2(mymap, k, z) {
    var q1 = z;
    var q2 = z;
    var q3 = z;
}

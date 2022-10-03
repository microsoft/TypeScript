//// [mappedTypeIndexedAccess.ts]
// Repro from #15756

type Pairs<T> = {
    [TKey in keyof T]: {
        key: TKey;
        value: T[TKey];
    };
};

type Pair<T> = Pairs<T>[keyof T];

type FooBar = {
    foo: string;
    bar: number;
};

// Error expected here
let pair1: Pair<FooBar> = {
    key: "foo",
    value: 3
};

// Error expected here
let pair2: Pairs<FooBar>[keyof FooBar] = {
    key: "foo",
    value: 3
};


//// [mappedTypeIndexedAccess.js]
"use strict";
// Repro from #15756
// Error expected here
var pair1 = {
    key: "foo",
    value: 3
};
// Error expected here
var pair2 = {
    key: "foo",
    value: 3
};

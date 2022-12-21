//// [callChainInference.ts]
// Repro from #42404

interface Y {
    foo<T>(this: T, arg: keyof T): void;
    a: number;
    b: string;
}

declare const value: Y | undefined;

if (value) {
    value?.foo("a");
}

value?.foo("a");


//// [callChainInference.js]
"use strict";
// Repro from #42404
if (value) {
    value === null || value === void 0 ? void 0 : value.foo("a");
}
value === null || value === void 0 ? void 0 : value.foo("a");

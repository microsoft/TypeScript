//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChainInference.ts] ////

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
    value?.foo("a");
}
value?.foo("a");

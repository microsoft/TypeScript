//// [tests/cases/conformance/expressions/functions/voidParamAssignmentCompatibility.ts] ////

//// [voidParamAssignmentCompatibility.ts]
declare function g(a: void): void;
let gg: () => void = g;

interface Obj<T> {
    method(value: T): void;
}

declare const o: Obj<void>;
gg = o.method;


//// [voidParamAssignmentCompatibility.js]
"use strict";
let gg = g;
gg = o.method;

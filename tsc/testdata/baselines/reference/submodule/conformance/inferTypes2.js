//// [tests/cases/conformance/types/conditional/inferTypes2.ts] ////

//// [inferTypes2.ts]
// Repros from #22755

export declare function foo<T>(obj: T): T extends () => infer P ? P : never;
export function bar<T>(obj: T) {
    return foo(obj);
}

export type BadNested<T> = { x: T extends number ? T : string };

export declare function foo2<T>(obj: T): T extends { [K in keyof BadNested<infer P>]: BadNested<infer P>[K] } ? P : never;
export function bar2<T>(obj: T) {
    return foo2(obj);
}

// Repros from #31099

type Weird = any extends infer U ? U : never;
type AlsoWeird = unknown extends infer U ? U : never;

const a: Weird = null;
const b: string = a;


//// [inferTypes2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
exports.bar2 = bar2;
function bar(obj) {
    return foo(obj);
}
function bar2(obj) {
    return foo2(obj);
}
const a = null;
const b = a;

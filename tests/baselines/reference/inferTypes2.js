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
// Repros from #22755
exports.__esModule = true;
exports.bar2 = exports.bar = void 0;
function bar(obj) {
    return foo(obj);
}
exports.bar = bar;
function bar2(obj) {
    return foo2(obj);
}
exports.bar2 = bar2;
var a = null;
var b = a;


//// [inferTypes2.d.ts]
export declare function foo<T>(obj: T): T extends () => infer P ? P : never;
export declare function bar<T>(obj: T): T extends () => infer P ? P : never;
export declare type BadNested<T> = {
    x: T extends number ? T : string;
};
export declare function foo2<T>(obj: T): T extends {
    [K in keyof BadNested<infer P>]: BadNested<infer P>[K];
} ? P : never;
export declare function bar2<T>(obj: T): T extends {
    x: infer P extends number ? infer P : string;
} ? P : never;

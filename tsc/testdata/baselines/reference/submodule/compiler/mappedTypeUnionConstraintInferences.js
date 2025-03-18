//// [tests/cases/compiler/mappedTypeUnionConstraintInferences.ts] ////

//// [mappedTypeUnionConstraintInferences.ts]
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type PartialProperties<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
export function doSomething_Actual<T extends {
    prop: string;
}>(a: T) {
    const x: { [P in keyof PartialProperties<T, "prop">]: PartialProperties<T, "prop">[P]; } = null as any;
    return x;
}
export declare function doSomething_Expected<T extends {
    prop: string;
}>(a: T): { [P in keyof PartialProperties<T, "prop">]: PartialProperties<T, "prop">[P]; };

export let a = doSomething_Actual({ prop: "test" });
a = {} // should be fine, equivalent to below

export let b = doSomething_Expected({ prop: "test" });
b = {} // fine


//// [mappedTypeUnionConstraintInferences.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.doSomething_Actual = doSomething_Actual;
function doSomething_Actual(a) {
    const x = null;
    return x;
}
exports.a = doSomething_Actual({ prop: "test" });
exports.a = {};
exports.b = doSomething_Expected({ prop: "test" });
exports.b = {};

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
exports.__esModule = true;
exports.b = exports.a = exports.doSomething_Actual = void 0;
function doSomething_Actual(a) {
    var x = null;
    return x;
}
exports.doSomething_Actual = doSomething_Actual;
exports.a = doSomething_Actual({ prop: "test" });
exports.a = {}; // should be fine, equivalent to below
exports.b = doSomething_Expected({ prop: "test" });
exports.b = {}; // fine


//// [mappedTypeUnionConstraintInferences.d.ts]
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type PartialProperties<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
export declare function doSomething_Actual<T extends {
    prop: string;
}>(a: T): { [P in keyof PartialProperties<T, "prop">]: PartialProperties<T, "prop">[P]; };
export declare function doSomething_Expected<T extends {
    prop: string;
}>(a: T): {
    [P in keyof PartialProperties<T, "prop">]: PartialProperties<T, "prop">[P];
};
export declare let a: {
    prop?: string;
};
export declare let b: {
    prop?: string;
};

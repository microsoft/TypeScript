//// [tests/cases/compiler/circularMappedTypeConstraint2.ts] ////

//// [circularMappedTypeConstraint2.ts]
// https://github.com/microsoft/TypeScript/issues/62176

type Test = keyof {
    [P in keyof P]: unknown  // Error
};

declare const test: Test;

export function getTest() {
    return test;
}

type Cond<T> = T extends string ? { a: T } : { b: T };

type T1 = { [P in keyof P | "x"]: unknown };  // Error
type T2 = { [P in Extract<keyof P, string>]: unknown };  // Error
type T3 = { [P in keyof Cond<P>]: unknown };  // Error
type T4<T> = { [P in keyof P]: T };  // Error

declare const t4: keyof T4<string>;

export function getT4() {
    return t4;
}

// No errors

type T5<T extends keyof T> = T;
type T6 = { [P in keyof { [P in "a" | "b"]: P }]: P };
type T7<T> = { [P in keyof T as `get${P & string}`]: T[P] };


//// [circularMappedTypeConstraint2.js]
// https://github.com/microsoft/TypeScript/issues/62176
export function getTest() {
    return test;
}
export function getT4() {
    return t4;
}


//// [circularMappedTypeConstraint2.d.ts]
export declare function getTest(): any;
export declare function getT4(): any;

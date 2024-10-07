// @strict: true
// @noEmit: true
// @target: esnext

// Tests for when return type narrowing can and cannot happen

// @filename: file.ts
// Type parameter in outer scope
function outer<T extends boolean>(x: T): number {
    return inner();

    function inner(): T extends true ? 1 : T extends false ? 2 : never {
        return x ? 1 : 2;
    }
}

// Overloads
function fun6<T extends boolean>(x: T, y: string): T extends true ? string : T extends false ? 2 : never;
function fun6<T extends boolean>(x: T, y: undefined): T extends true ? 1 : T extends false ? 2 : never;
function fun6(x: boolean): 1 | 2 | string;
function fun6<T extends boolean>(x: T, y?: string): T extends true ? 1 | string : T extends false ? 2 : never {
    return x ? y !== undefined ? y : 1 : 2;
}

// Indexed access with conditional inside

// DOESN'T NARROW the nested conditional type of wrong shape
interface SomeInterfaceBad<T> {
    prop1: T extends 1 ? true : T extends 2 ? false : never;
    prop2: T extends true ? 1 : T extends false ? 2 : never;
}

function fun4bad<T, U extends keyof SomeInterfaceBad<unknown>>(x: T, y: U): SomeInterfaceBad<T>[U] {
    if (y === "prop1") {
        return x === 1 ? true : false;
    }
    return x ? 1 : 2;
}

// Narrows nested conditional type of right shape
interface SomeInterfaceGood<T> {
    prop1: T extends true ? 2 : T extends false ? 1 : never;
    prop2: T extends true ? 1 : T extends false ? 2 : never;
}

function fun4good<T extends boolean, U extends keyof SomeInterfaceGood<unknown>>(x: T, y: U): SomeInterfaceGood<T>[U] {
    if (y === "prop1") {
        return x ? 2 : 1;
    }
    return x ? 1 : 2;
}

// Indexed access with indexed access inside - OK, narrows
interface BB {
    "a": number;
    "b": string;
}

interface AA<T extends keyof BB> {
    "c": BB[T];
    "d": boolean,
}

function reduction<T extends keyof BB, U extends keyof AA<any>>(x: T, y: U): AA<T>[U] {
    if (x === "a" && y === "c") {
        return 0; // Ok
    }

    return undefined as never;
}

// Conditional with indexed access inside - OK, narrows
function fun5<T extends 1 | 2, U extends keyof BB>(x: T, y: U): T extends 1 ? BB[U] : T extends 2 ? boolean : never {
    if (x === 1) {
        if (y === "a") {
            return 0;
        }
        return "";
    }
    return true;
}

// `this` type parameter - Doesn't narrow
abstract class SomeClass {
    fun3(this: Sub1 | Sub2): this extends Sub1 ? 1 : this extends Sub2 ? 2 : never {
        if (this instanceof Sub1) {
            return 1;
        }
        return 2;
    }
}
class Sub1 extends SomeClass {
    #sub1!: symbol;
};
class Sub2 extends SomeClass {
    #sub2!: symbol;
};

// Detection of type parameter reference in presence of typeof
function fun2<T extends boolean>(x: T, y: typeof x): T extends true ? 1 : T extends false ? 2 : never {
    return x ? 1 : 2;
}

// Contextually-typed lambdas
const fun1: <T extends boolean>(x: T) => T extends true ? 1 : T extends false ? 2 : never = (x) => x ? 1 : 2;


// Circular conditionals
type SomeCond<T> = T extends true ? 1 : T extends false ? SomeCond<T> : never;

function f7<T extends boolean>(x: T): SomeCond<T> {
    if (x) {
        return 1;
    }
    return 2;
}

// Composite instantiation of conditional type
type OtherCond<T> = T extends 1 ? "one" : T extends 2 ? "two" : T extends 3 ? "three" : T extends 4 ? "four" : never;

function f8<U extends 1 | 2, V extends 3 | 4>(x: U, y: V): OtherCond<U | V> {
    if (x === 1 && y === 3)  {
        return "one";
    }
}

// Conditionals with `infer` - will not narrow, it is not safe to infer from the narrowed type into an `infer` type parameter
function f9<T extends "a"[] | "b"[] | number>(x: T): T extends Array<infer P> ? P : T extends number ? undefined : never {
    if (Array.isArray(x)) {
        // If we allowed narrowing of the conditional return type, when resolving the conditional `T & ("a"[] | "b"[]) extends Array<infer P> ? P : ...`,
        // we could infer `"a" | "b"` for `P`, and allow "a" to be returned. However, when calling `f10`, `T` could be instantiated with `"b"[]`, and the return type would be `"b"`,
        // so allowing an `"a"` return would be unsound.
        return "a";
    }
    return undefined;
}


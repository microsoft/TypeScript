// @strict: true
// @noEmit: true
// @target: esnext

interface A {
    1: number;
    2: string;
}

function f1<T extends 1 | 2>(x: T): A[T] {
    if (x === 1) {
        return 0; // Ok
    }
    else {
        return 1; // Error
    }
}

interface C {
    1: number;
    2: string;
    3: boolean;
}

function f2<T extends 1 | 2 | 3>(x: T): C[T] {
    if (x === 1) {
        return 0; // Ok
    }
    else {
        return ""; // Error, returned expression needs to have type string & boolean (= never)
    }
}

function f3<T extends 1 | 2 | 3>(x: T): T extends 1 ? number : T extends 2 ? string : T extends 3 ? boolean : never {
    if (x === 1) {
        return 0; // Ok
    }
    else {
        return ""; // Error, returned expression needs to have type string & boolean (= never)
    }
}

interface One {
    a: "a";
    b: "b";
    c: "c";
    d: "d";
}

interface Two {
    a: "a";
    b: "b";
    e: "e";
    f: "f";
}

interface Three {
    a: "a";
    c: "c";
    e: "e";
    g: "g";
}

interface Four {
    a: "a";
    d: "d";
    f: "f";
    g: "g";
}
// Badly written conditional return type, will not trigger narrowing
function f10<T extends 1 | 2 | 3 | 4>(x: T): T extends 1 ? One : T extends 2 ? Two : T extends 3 ? Three : Four {
    if (x === 1 || x === 2) {
        return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f" }; // Error
    }
    return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" }; // Error
}
// Well written conditional
function f101<T extends 1 | 2 | 3 | 4>(x: T): T extends 1 ? One : T extends 2 ? Two : T extends 3 ? Three : T extends 4 ? Four : never {
    if (x === 1 || x === 2) {
        return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f" }; // Ok
    }
    // Excess property becomes a problem with the change,
    // because we now check assignability to a narrower type...
    return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" }; // EPC Error
}

// This will not work for several reasons:
// - first because the constraint of type parameter `Arg` is generic,
//   so attempting to narrow the type of `arg` in the `if` would result in type `Arg & LeftIn`,
//   which when substituted in the conditional return type, would not further resolve that conditional type
// - second because the `else` branch would never work because we don't narrow the type of `arg` to `Arg & RightIn` 
function conditionalProducingIf<LeftIn, RightIn, LeftOut, RightOut, Arg extends LeftIn | RightIn>(
    arg: Arg,
    cond: (arg: LeftIn | RightIn) => arg is LeftIn,
    produceLeftOut: (arg: LeftIn) => LeftOut,
    produceRightOut: (arg: RightIn) => RightOut):
    Arg extends LeftIn ? LeftOut : Arg extends RightIn ? RightOut : never
{
    if (cond(arg)) {
        return produceLeftOut(arg);
    } else {
        return produceRightOut(arg as RightIn);
    }
}

interface Animal {
    name: string;
}

interface Dog extends Animal {
    bark: () => string;
}

// This would be unsafe to narrow.
declare function isDog(x: Animal): x is Dog;
declare function doggy(x: Dog): number;
function f12<T extends Animal>(x: T): T extends Dog ? number : string {
    if (isDog(x)) { // `x` has type `T & Dog` here
        return doggy(x);
    }
    return ""; // Error: Should not work because we can't express "not a Dog" in the type system
}

// Cannot narrow `keyof` too eagerly or something like the below breaks
function f<Entry extends { [index: string]: number | boolean }, EntryId extends keyof Entry>(entry: EntryId): Entry[EntryId] {
    const entries = {} as Entry;
    return entries[entry];
}

// Works the same as before
declare function takeA(val: 'A'): void;
export function bounceAndTakeIfA<AB extends 'A' | 'B'>(value: AB): AB {
    if (value === 'A') {
        takeA(value);
        takeAB(value);
        return value;
    }

    return value;
    function takeAB(val: AB): void {}
}

// Works the same as before
export function bbb<AB extends "a" | "b">(value: AB): "a" {
    if (value === "a") {
        return value;
    }
    return "a";
}

class Unnamed {
    root!: { name: string };
    // Error: No narrowing because parameter is optional but `T` doesn't allow for undefined
    name<T extends string>(name?: T): T extends string ? this : T extends undefined ? string : never {
        if (typeof name === 'undefined') {
            return this.root.name;
        }
        return this;
    }

    // Good conditional
    name2<T extends string | undefined>(name?: T): T extends string ? this : T extends undefined ? string : never {
        if (typeof name === 'undefined') {
            return this.root.name; // Ok
        }
        this.root.name = name;
        return this; // Ok
    }

    // Good conditional, wrong return expressions
    name3<T extends string | undefined>(name?: T): T extends string ? this : T extends undefined ? string : never {
        if (typeof name === 'undefined') {
            return this; // Error
        }
        this.root.name = name;
        return name; // Error
    }
}

// Conditional expressions
interface Aa {
    1: number;
    2: string;
    3: boolean;
}

function trivialConditional<T extends 1 | 2 | 3>(x: T): Aa[T] {
    if (x !== 1) {
        return x === 2 ? "" : true;
    }
    else {
        return 0;
    }
}

function conditional<T extends boolean>(x: T):
 T extends true ? 1 : T extends false ? 2 : never {
    return x ? 1 : 2; // Ok
}

function contextualConditional<T extends "a" | "b">(
    x: T
): T extends "a" ? "a" : T extends "b" ? number : never {
    return x === "a" ? x : parseInt(x); // Ok
}

function conditionalWithError<T extends "a" | "b">(
    x: T
): T extends "a" ? number : T extends "b" ? string : never {
    return x === "a" ? x : parseInt(x); // Error
}

// Multiple indexed type reductions
interface BB {
    "a": number;
    [y: number]: string;
}

interface AA<T extends keyof BB> {
    "c": BB[T];
    "d": boolean,
}

function reduction<T extends keyof BB, U extends "c" | "d">(x: T, y: U): AA<T>[U] {
    if (y === "c" && x === "a") {
        // AA<T>[U='c'] -> BB[T]
        // BB[T='a'] -> number
        return 0; // Ok
    }

    return undefined as never;
}

// Substitution types are not narrowed
function subsCond<T extends 1 | 2 | 3>(
    x: T,
): T extends 1 | 2
    ? T extends 1
        ? string
        : T extends 2
          ? boolean
          : never
    : T extends 3
      ? number
      : never {
    if (x === 1) {
        return "";
    } else if (x == 2) {
        return true;
    }
    return 3;
}


// Unsafe: check types overlap
declare function q(x: object): x is { b: number };
function foo<T extends { a: string } | { b: number }>(
    x: T,
): T extends { a: string } ? number : T extends { b: number } ? string : never {
    if (q(x)) {
        x.b;
        return "";
    }
    x.a;
    return 1;
}

let y = { a: "", b: 1 }
const r = foo<{ a: string }>(y); // type says number but actually string

type HelperCond<T, A, R1, B, R2> = T extends A ? R1 : T extends B ? R2 : never;

// We don't narrow the return type because the conditionals are not distributive
function foo2<U extends string | number, V extends boolean>(x: U, y: V):
    HelperCond<{ x: U, y: V },
        { x: string, y: true }, 1,
        { x: number, y: false }, 2> {
    if (typeof x === "string" && y === true) {
        return 1; // Error
    }
    if (typeof x === "number" && y === false) {
        return 2; // Error
    }
    return 0; // Error
}

// From https://github.com/microsoft/TypeScript/issues/24929#issue-332087943
declare function isString(s: unknown): s is string;
// capitalize a string or each element of an array of strings
function capitalize<T extends string | string[]>(
    input: T
): T extends string[] ? string[] : T extends string ? string : never {
    if (isString(input)) {
        return input[0].toUpperCase() + input.slice(1); // Ok
    } else {
        return input.map(elt => capitalize(elt)); // Ok
    }
}

function badCapitalize<T extends string | string[]>(
    input: T
): T extends string[] ? string[] : T extends string ? string : never {
    if (isString(input)) {
        return input[0].toUpperCase() + input.slice(1); // Ok
    } else {
        return input[0].toUpperCase() + input.slice(1); // Bad, error
    }
}

// No narrowing because conditional's extends type is different from type parameter constraint types
function voidRet<T extends { a: string } | undefined>(
    x: T
): T extends {} ? void : T extends undefined ? number : never {
    if (x) {
        return;
    }
    return 1;
}

// Multiple type parameters at once
function woo<T extends string | number, U extends string | number>(
    x: T,
    y: U,
): T extends string
    ? U extends string
        ? 1
        : U extends number
          ? 2
          : never
    : T extends number
      ? U extends number
          ? 3
          : U extends string
            ? 4
            : never
      : never {
    if (typeof x === "number" && typeof y === "string") {
        return 1; // Good error
    }
    return undefined as any;
}

function ttt<T extends string | number, U extends string | number>(
    x: T,
    y: U,
): T extends string
    ? U extends string
        ? 1
        : U extends number
          ? 2
          : never
    : T extends number
      ? U extends number
          ? 3
          : U extends string
            ? 4
            : never
      : never {
    if (typeof x === "number" && typeof y === "string") {
        return 4; // Ok
    }
    
    return undefined as any;
}

// Shadowing of the narrowed reference
function shadowing<T extends 1 | 2>(x: T): T extends 1 ? number : T extends 2 ? string : never {
    if (true) {
        let x: number = Math.random() ? 1 : 2;
        if (x === 1) {
            return 1; // Error
        }
        return ""; // Error
    }
}

function noShadowing<T extends 1 | 2>(x: T): T extends 1 ? number : T extends 2 ? string : never {
    if (true) {
        if (x === 1) {
            return 1; // Ok
        }
        return ""; // Ok
    }
}

// If the narrowing reference is out of scope, we simply won't narrow its type
declare let someX: boolean;
function scope2<T extends boolean>(a: T): T extends true ? 1 : T extends false ? 2 : never {
    if ((true)) {
        const someX = a;
        if (someX) { // We narrow `someX` and the return type here
            return 1;
        }
    }
    if (!someX) { // This is a different `someX`, so we don't narrow here
        return 2;
    }

    return undefined as any;
}

function moreShadowing<T extends 1 | 2>(x: T): T extends 1 ? number : T extends 2 ? string : never {
    if (x === 2) {
        let x: number = Math.random() ? 1 : 2;
        if (x === 1) {
            return 1; // Error
        }
        return ""; // Ok
    }
    return 0; // Ok
}

// This would be unsafe to narrow due to `infer` type.
function withInfer<T extends [string] | number>(x: T): T extends [infer R] ? R : T extends number ? boolean : never {
    if (typeof x === "number") {
        return true;
    }
    return "";
}

const withInferResult = withInfer(["a"] as const); // The type says it returns `"a"`, but the function actually returns `""`.

// Ok
async function abool<T extends true | false>(x: T): Promise<T extends true ? 1 : T extends false ? 2 : never> {
    if (x) {
        return 1;
    }
    return 2;
}

// Ok
function* bbool<T extends true | false>(x: T): Generator<number, T extends true ? 1 : T extends false ? 2 : never, unknown> {
    yield 3;
    if (x) {
        return 1;
    }
    return 2;
}

// We don't do the same type of narrowing for `yield` statements
function* cbool<T extends true | false>(x: T): Generator<T extends true ? 1 : T extends false ? 2 : never, number, unknown> {
    if (x) {
        yield 1;
    }
    yield 2;
    return 0;
}

// From #33912
abstract class Operation<T, R> {
    abstract perform(t: T): R;
}

type ConditionalReturnType<T, R, EOp extends Operation<T, R> | undefined> =
    EOp extends Operation<T, R> ? R : EOp extends undefined ? T | R : never;


class ConditionalOperation<
    T,
    R,
    EOp extends Operation<T, R> | undefined,
> extends Operation<T, ConditionalReturnType<T, R, EOp>> {
    constructor(
        private predicate: (value: T) => boolean,
        private thenOp: Operation<T, R>,
        private elseOp?: EOp,
    ) {
        super();
    }

    // We won't try to narrow the return type because `T` is declared on the class and we don't analyze this case.
    perform(t: T): ConditionalReturnType<T, R, EOp> {
        if (this.predicate(t)) {
            return this.thenOp.perform(t); // Bad: this is assignable to all of the branches of the conditional, but we still can't return it
        } else if (typeof this.elseOp !== "undefined") {
            return this.elseOp.perform(t); // Would be ok
        } else {
            return t; // Would be ok
        }
    }
}

// Like the version above, we will not attempt to narrow because there's more than one reference to `T`,
// because `T` shows up in the type of `predicate`.
function perform<T, R, EOp extends Operation<T, R> | undefined>(
    t: T,
    predicate: (value: T) => boolean,
    thenOp: Operation<T, R>,
    elseOp?: EOp,
    ): ConditionalReturnType<T, R, EOp> {
    if (predicate(t)) {
        return thenOp.perform(t); // Bad: this is assignable to all of the branches of the conditional, but we still can't return it
    } else if (elseOp !== undefined) {
        return elseOp.perform(t); // Would be ok
    } else {
        return t; // Would be ok
    }
}

// Return conditional expressions with parentheses
function returnStuff1<T extends boolean>(x: T ): T extends true ? 1 : T extends false ? 2 : never {
    return (x ? (1) : 2);
}

function returnStuff2<T extends 1 | 2 | "a">(x: T ):
    T extends 1 ? "one" : T extends 2 ? "two" : T extends "a" ? 0 : never {
    return (typeof x === "string" ? 0 : (x === 1 ? ("one") : "two"));
}

// If the conditional type's input is `never`, then it resolves to `never`:
function neverOk<T extends boolean>(x: T): T extends true ? 1 : T extends false ? 2 : never {
    if (x === true) {
        return 1;
    }
    if (x === false) {
        return 2;
    }
    return 1;
}
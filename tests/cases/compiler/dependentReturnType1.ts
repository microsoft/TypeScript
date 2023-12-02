// @strict: true
// @noEmit: true

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

function f10<T extends 1 | 2 | 3 | 4>(x: T): T extends 1 ? One : T extends 2 ? Two : T extends 3 ? Three : Four { // Badly written conditional
    if (x === 1 || x === 2) {
        return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f" }; // Ok
        return { a: "a" }; // Error
    }
    // Excess property becomes a problem with the change,
    // because we now check assignability to a narrower type...
    return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" }; // Error
}

function f101<T extends 1 | 2 | 3 | 4>(x: T): T extends 1 ? One : T extends 2 ? Two : T extends 3 ? Three : T extends 4 ? Four : One | Two | Three | Four { // Well written conditional
    if (x === 1 || x === 2) {
        return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f" }; // Ok
        return { a: "a" }; // Error
    }
    // Excess property becomes a problem with the change,
    // because we now check assignability to a narrower type...
    return { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g" }; // Error
}

// Asymmetry
function conditionalProducingIf<LeftIn, RightIn, LeftOut, RightOut, Arg extends LeftIn | RightIn>(
    arg: Arg,
    cond: (arg: LeftIn | RightIn) => arg is LeftIn,
    produceLeftOut: (arg: LeftIn) => LeftOut,
    produceRightOut: (arg: RightIn) => RightOut):
    Arg extends LeftIn ? LeftOut : RightOut
{
    type OK = Arg extends LeftIn ? LeftOut : RightOut;
    if (cond(arg)) {
        return produceLeftOut(arg); // Ok
    } else {
        return produceRightOut(arg as RightIn); // Error: Doesn't work because we don't narrow `arg` to `Arg & RightIn` here
    }
}

interface Animal {
    name: string;
}

interface Dog extends Animal {
    bark: () => string;
}

// This is unsafe
declare function isDog(x: Animal): x is Dog;
declare function doggy(x: Dog): number;
function f12<T extends Animal>(x: T): T extends Dog ? number : string {
    if (isDog(x)) { // `x` has type `T & Dog` here
        return doggy(x); // Ok
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
    // Error because parameter is optional
    name<T extends string>(name?: T): T extends string ? this : string {
        if (typeof name === 'undefined') {
            return this.root.name;
        }
        return this;
    }
    // Error because parameter is optional?
    nameWithError<T extends string>(name?: T): T extends string ? this : string {
        return this; // Error: Investigate error message
    }

    // Good conditional
    name2<T extends string | undefined>(name?: T): T extends string ? this : T extends undefined ? string : this | undefined {
        if (typeof name === 'undefined') {
            return this.root.name; // Ok
        }
        this.root.name = name;
        return this; // Ok
    }

    // Good conditional, wrong return expressions
    name3<T extends string | undefined>(name?: T): T extends string ? this : T extends undefined ? string : this | undefined {
        if (typeof name === 'undefined') {
            return this; // Error
        }
        this.root.name = name;
        return name; // Error
    }
}

interface Aa {
    1: number;
    2: string;
    3: string;
}

function trivialConditional<T extends 1 | 2 | 3>(x: T): Aa[T] {
    if (x !== 1) {
        return x === 2 ? "" : `${x}`;
    }
    else {
        return 0;
    }
}

// Conditional expressions
function conditional<T extends boolean>(x: T):
 T extends true ? 1 : T extends false ? 2 : 1 | 2 {
    return x ? 1 : 2; // Ok
}

function contextualConditional<T extends "a" | "b">(x: T): T extends "a" ? "a" : T extends "b" ? number : "a" | number {
    return x === "a" ? x : parseInt(x); // Ok
}

function conditionalWithError<T extends "a" | "b">(x: T): T extends "a" ? number : T extends "b" ? string : number | string {
    return x === "a" ? x : parseInt(x); // Error
}

// Multiple reductions
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

// Substitution types are not narrowed?
function subsCond<T extends 1 | 2 | 3>(x: T): T extends 1 | 2 ? (T extends 1 ? string : boolean) : number {
    if (x === 1) {
        return "";
    }
}

// Unsafe: supertype problem
declare function q(x: object): x is { b: number };
function foo<T extends { a: string } | { b: number }>(x: T): T extends { a: string } ? number : (string | number) {
    if (q(x)) {
        x.b;
        return "";
    }
}

let y = { a: "", b: 1 }
const r = foo<{ a: string }>(y); // number

function lessBadFoo<T extends { a: string } | { b: number }>(x: T): T extends { b: number } ? string : T extends { a: string } ? number : (string | number) {
    if (q(x)) {
        x.b;
        return "";
    }
    return 2;
}

const r2 = lessBadFoo<{ a: string }>(y); // number, bad

type HelperCond<T, A, R1, B, R2> = T extends A ? R1 : T extends B ? R2 : R1 | R2;

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
function capitalize<T extends string | string[]>(input: T): T extends string[] ? string[] : T extends string ? string : string[] | string {
    if (isString(input)) {
        return input[0].toUpperCase() + input.slice(1); // Ok
    } else {
        return input.map(elt => capitalize(elt)); // Ok
    }
}

function badCapitalize<T extends string | string[]>(input: T): T extends string[] ? string[] : T extends string ? string : string[] | string {
    if (isString(input)) {
        return input[0].toUpperCase() + input.slice(1); // Ok
    } else {
        return input[0].toUpperCase() + input.slice(1); // Bad
    }
}

// >> TODO: test non-tail recursive conditionals

function voidRet<T extends { a: string } | undefined>(x: T): T extends {} ? void : T extends undefined ? number : void | number {
    if (x) {
        return; // Ok
    }
    return 1; // Ok
}

function woo<T extends string | number, U extends string | number>(x: T, y: U):
T extends string ? U extends string ? 1 : 2 : U extends number ? 3 : 4 {
    if (typeof x === "number" && typeof y === "string") {
        return 1; // Error
    }
    return undefined as any;
}

function ttt<T extends string | number, U extends string | number>(x: T, y: U):
T extends string
? number extends string
  ? 6
  : U extends string
    ? 1
    : 2
: U extends number
  ? 3
  : 4 {
    if (typeof x === "string" && typeof y === "string") {
        return 1; // Ok
    }
    
    return undefined as any;
}
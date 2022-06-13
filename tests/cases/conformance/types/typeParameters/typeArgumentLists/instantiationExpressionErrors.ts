// @strict: true
// @declaration: true

declare let f: { <T>(): T, g<U>(): U };

// Type arguments in member expressions

const a1 = f<number>;  // { (): number; g<U>(): U; }
const a2 = f.g<number>;  // () => number
const a3 = f<number>.g;  // <U>() => U
const a4 = f<number>.g<number>;  // () => number
const a5 = f['g']<number>;  // () => number

// `[` is an expression starter and cannot immediately follow a type argument list

const a6 = f<number>['g'];  // Error
const a7 = (f<number>)['g'];

// An `<` cannot immediately follow a type argument list

const a8 = f<number><number>;  // Relational operator error
const a9 = (f<number>)<number>;  // Error, no applicable signatures

// Type arguments with `?.` token

const b1 = f?.<number>;  // Error, `(` expected
const b2 = f?.<number>();
const b3 = f<number>?.();
const b4 = f<number>?.<number>();  // Error, expected no type arguments

// Instantiation expression and binary operators

declare let g: (<T>(x: T) => T) | undefined;

const c1 = g<string> || ((x: string) => x);
const c2 = g<string> ?? ((x: string) => x);
const c3 = g<string> && ((x: string) => x);

// Parsed as function call, even though this differs from JavaScript

const x1 = f<true>
(true);

// Parsed as relational expressions

const r1 = f < true > true;
const r2 = f < true > +1;
const r3 = f < true > -1;

// All of the following are parsed as instantiation expressions

const x2 = f<true>
true;

const x3 = f<true>;
true;

const x4 = f<true>
if (true) {}

const x5 = f<true>
let yy = 0;

const x6 = f<true>
interface I {}

let x10 = f<true>
this.bar()

let x11 = f<true>
function bar() {}

let x12 = f<true>
class C {}

let x13 = f<true>
bar()

let x14 = f<true>
void bar()

class C1 {
    static specialFoo = f<string>
    static bar = 123
}

class C2 {
    public specialFoo = f<string>
    public bar = 123
}

class C3 {
    private specialFoo = f<string>
    private bar = 123
}

class C4 {
    protected specialFoo = f<string>
    protected bar = 123
}

//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbols.ts] ////

//// [uniqueSymbols.ts]
// declarations with call initializer
const constCall = Symbol();
let letCall = Symbol();
var varCall = Symbol();

// ambient declaration with type
declare const constType: unique symbol;

// declaration with type and call initializer
const constTypeAndCall: unique symbol = Symbol();

// declaration from initializer
const constInitToConstCall = constCall;
const constInitToLetCall = letCall;
const constInitToVarCall = varCall;
const constInitToConstDeclAmbient = constType;
let letInitToConstCall = constCall;
let letInitToLetCall = letCall;
let letInitToVarCall = varCall;
let letInitToConstDeclAmbient = constType;
var varInitToConstCall = constCall;
var varInitToLetCall = letCall;
var varInitToVarCall = varCall;
var varInitToConstDeclAmbient = constType;

// declaration from initializer with type query
const constInitToConstCallWithTypeQuery: typeof constCall = constCall;
const constInitToConstDeclAmbientWithTypeQuery: typeof constType = constType;

// assignment from any
// https://github.com/Microsoft/TypeScript/issues/29108
const fromAny: unique symbol = {} as any;

// function return inference
function funcReturnConstCall() { return constCall; }
function funcReturnLetCall() { return letCall; }
function funcReturnVarCall() { return varCall; }

// function return value with type query
function funcReturnConstCallWithTypeQuery(): typeof constCall { return constCall; }

// generator function yield inference
function* genFuncYieldConstCall() { yield constCall; }
function* genFuncYieldLetCall() { yield letCall; }
function* genFuncYieldVarCall() { yield varCall; }

// generator function yield with return type query
function* genFuncYieldConstCallWithTypeQuery(): IterableIterator<typeof constCall> { yield constCall; }

// async function return inference
async function asyncFuncReturnConstCall() { return constCall; }
async function asyncFuncReturnLetCall() { return letCall; }
async function asyncFuncReturnVarCall() { return varCall; }

// async generator function yield inference
async function* asyncGenFuncYieldConstCall() { yield constCall; }
async function* asyncGenFuncYieldLetCall() { yield letCall; }
async function* asyncGenFuncYieldVarCall() { yield varCall; }

// classes
class C {
    static readonly readonlyStaticCall = Symbol();
    static readonly readonlyStaticType: unique symbol;
    static readonly readonlyStaticTypeAndCall: unique symbol = Symbol();
    static readwriteStaticCall = Symbol();

    readonly readonlyCall = Symbol();
    readwriteCall = Symbol();
}
declare const c: C;

const constInitToCReadonlyStaticCall = C.readonlyStaticCall;
const constInitToCReadonlyStaticType = C.readonlyStaticType;
const constInitToCReadonlyStaticTypeAndCall = C.readonlyStaticTypeAndCall;
const constInitToCReadwriteStaticCall = C.readwriteStaticCall;

const constInitToCReadonlyStaticCallWithTypeQuery: typeof C.readonlyStaticCall = C.readonlyStaticCall;
const constInitToCReadonlyStaticTypeWithTypeQuery: typeof C.readonlyStaticType = C.readonlyStaticType;
const constInitToCReadonlyStaticTypeAndCallWithTypeQuery: typeof C.readonlyStaticTypeAndCall = C.readonlyStaticTypeAndCall;
const constInitToCReadwriteStaticCallWithTypeQuery: typeof C.readwriteStaticCall = C.readwriteStaticCall;

const constInitToCReadonlyCall = c.readonlyCall;
const constInitToCReadwriteCall = c.readwriteCall;
const constInitToCReadonlyCallWithTypeQuery: typeof c.readonlyCall = c.readonlyCall;
const constInitToCReadwriteCallWithTypeQuery: typeof c.readwriteCall = c.readwriteCall;
const constInitToCReadonlyCallWithIndexedAccess: C["readonlyCall"] = c.readonlyCall;
const constInitToCReadwriteCallWithIndexedAccess: C["readwriteCall"] = c.readwriteCall;

// interfaces
interface I {
    readonly readonlyType: unique symbol;
}
declare const i: I;

const constInitToIReadonlyType = i.readonlyType;
const constInitToIReadonlyTypeWithTypeQuery: typeof i.readonlyType = i.readonlyType;
const constInitToIReadonlyTypeWithIndexedAccess: I["readonlyType"] = i.readonlyType;

// type literals
type L = {
    readonly readonlyType: unique symbol;
    nested: {
        readonly readonlyNestedType: unique symbol;
    }
};
declare const l: L;

const constInitToLReadonlyType = l.readonlyType;
const constInitToLReadonlyNestedType = l.nested.readonlyNestedType;
const constInitToLReadonlyTypeWithTypeQuery: typeof l.readonlyType = l.readonlyType;
const constInitToLReadonlyNestedTypeWithTypeQuery: typeof l.nested.readonlyNestedType = l.nested.readonlyNestedType;
const constInitToLReadonlyTypeWithIndexedAccess: L["readonlyType"] = l.readonlyType;
const constInitToLReadonlyNestedTypeWithIndexedAccess: L["nested"]["readonlyNestedType"] = l.nested.readonlyNestedType;

// type argument inference
const promiseForConstCall = Promise.resolve(constCall);
const arrayOfConstCall = [constCall];

// unique symbol widening in expressions
declare const s: unique symbol;
declare namespace N { const s: unique symbol; }
declare const o: { [s]: "a", [N.s]: "b" };
declare function f<T>(x: T): T;
declare function g(x: typeof s): void;
declare function g(x: typeof N.s): void;

// widening positions

// argument inference
f(s);
f(N.s);
f(N["s"]);

// array literal elements
[s];
[N.s];
[N["s"]];

// property assignments/methods
const o2 = {
    a: s,
    b: N.s,
    c: N["s"],

    method1() { return s; },
    async method2() { return s; },
    async * method3() { yield s; },
    * method4() { yield s; },
    method5(p = s) { return p; },
};

// property initializers
class C0 {
    static readonly a = s;
    static readonly b = N.s;
    static readonly c = N["s"];

    static d = s;
    static e = N.s;
    static f = N["s"];

    readonly a = s;
    readonly b = N.s;
    readonly c = N["s"];

    d = s;
    e = N.s;
    f = N["s"];

    method1() { return s; }
    async method2() { return s; }
    async * method3() { yield s; }
    * method4() { yield s; }
    method5(p = s) { return p; }
}

// non-widening positions

// element access
o[s];
o[N.s];
o[N["s"]];

// arguments (no-inference)
f<typeof s>(s);
f<typeof N.s>(N.s);
f<typeof N.s>(N["s"]);
g(s);
g(N.s);
g(N["s"]);

// falsy expressions
s || "";
N.s || "";
N["s"] || "";

// conditionals
Math.random() * 2 ? s : "a";
Math.random() * 2 ? N.s : "a";
Math.random() * 2 ? N["s"] : "a";

// computed property names
({
    [s]: "a",
    [N.s]: "b",
});

class C1 {
    static [s]: "a";
    static [N.s]: "b";

    [s]: "a";
    [N.s]: "b";
}

// contextual types

interface Context {
    method1(): typeof s;
    method2(): Promise<typeof s>;
    method3(): AsyncIterableIterator<typeof s>;
    method4(): IterableIterator<typeof s>;
    method5(p?: typeof s): typeof s;
}

const o3: Context = {
    method1() {
        return s; // return type should not widen due to contextual type
    },
    async method2() {
        return s; // return type should not widen due to contextual type
    },
    async * method3() {
        yield s; // yield type should not widen due to contextual type
    },
    * method4() {
        yield s; // yield type should not widen due to contextual type
    },
    method5(p = s) { // parameter should not widen due to contextual type
        return p;
    },
};

// allowed when not emitting declarations

const o4 = {
    method1(p: typeof s): typeof s {
        return p;
    },
    method2(p: I["readonlyType"]): I["readonlyType"] {
        return p;
    }
};

const ce0 = class {
    method1(p: typeof s): typeof s {
        return p;
    }
    method2(p: I["readonlyType"]): I["readonlyType"] {
        return p;
    }
};

function funcInferredReturnType(obj: { method(p: typeof s): void }) {
    return obj;
}


//// [uniqueSymbols.js]
// declarations with call initializer
const constCall = Symbol();
let letCall = Symbol();
var varCall = Symbol();
// declaration with type and call initializer
const constTypeAndCall = Symbol();
// declaration from initializer
const constInitToConstCall = constCall;
const constInitToLetCall = letCall;
const constInitToVarCall = varCall;
const constInitToConstDeclAmbient = constType;
let letInitToConstCall = constCall;
let letInitToLetCall = letCall;
let letInitToVarCall = varCall;
let letInitToConstDeclAmbient = constType;
var varInitToConstCall = constCall;
var varInitToLetCall = letCall;
var varInitToVarCall = varCall;
var varInitToConstDeclAmbient = constType;
// declaration from initializer with type query
const constInitToConstCallWithTypeQuery = constCall;
const constInitToConstDeclAmbientWithTypeQuery = constType;
// assignment from any
// https://github.com/Microsoft/TypeScript/issues/29108
const fromAny = {};
// function return inference
function funcReturnConstCall() { return constCall; }
function funcReturnLetCall() { return letCall; }
function funcReturnVarCall() { return varCall; }
// function return value with type query
function funcReturnConstCallWithTypeQuery() { return constCall; }
// generator function yield inference
function* genFuncYieldConstCall() { yield constCall; }
function* genFuncYieldLetCall() { yield letCall; }
function* genFuncYieldVarCall() { yield varCall; }
// generator function yield with return type query
function* genFuncYieldConstCallWithTypeQuery() { yield constCall; }
// async function return inference
async function asyncFuncReturnConstCall() { return constCall; }
async function asyncFuncReturnLetCall() { return letCall; }
async function asyncFuncReturnVarCall() { return varCall; }
// async generator function yield inference
async function* asyncGenFuncYieldConstCall() { yield constCall; }
async function* asyncGenFuncYieldLetCall() { yield letCall; }
async function* asyncGenFuncYieldVarCall() { yield varCall; }
// classes
class C {
    constructor() {
        this.readonlyCall = Symbol();
        this.readwriteCall = Symbol();
    }
    static { this.readonlyStaticCall = Symbol(); }
    static { this.readonlyStaticTypeAndCall = Symbol(); }
    static { this.readwriteStaticCall = Symbol(); }
}
const constInitToCReadonlyStaticCall = C.readonlyStaticCall;
const constInitToCReadonlyStaticType = C.readonlyStaticType;
const constInitToCReadonlyStaticTypeAndCall = C.readonlyStaticTypeAndCall;
const constInitToCReadwriteStaticCall = C.readwriteStaticCall;
const constInitToCReadonlyStaticCallWithTypeQuery = C.readonlyStaticCall;
const constInitToCReadonlyStaticTypeWithTypeQuery = C.readonlyStaticType;
const constInitToCReadonlyStaticTypeAndCallWithTypeQuery = C.readonlyStaticTypeAndCall;
const constInitToCReadwriteStaticCallWithTypeQuery = C.readwriteStaticCall;
const constInitToCReadonlyCall = c.readonlyCall;
const constInitToCReadwriteCall = c.readwriteCall;
const constInitToCReadonlyCallWithTypeQuery = c.readonlyCall;
const constInitToCReadwriteCallWithTypeQuery = c.readwriteCall;
const constInitToCReadonlyCallWithIndexedAccess = c.readonlyCall;
const constInitToCReadwriteCallWithIndexedAccess = c.readwriteCall;
const constInitToIReadonlyType = i.readonlyType;
const constInitToIReadonlyTypeWithTypeQuery = i.readonlyType;
const constInitToIReadonlyTypeWithIndexedAccess = i.readonlyType;
const constInitToLReadonlyType = l.readonlyType;
const constInitToLReadonlyNestedType = l.nested.readonlyNestedType;
const constInitToLReadonlyTypeWithTypeQuery = l.readonlyType;
const constInitToLReadonlyNestedTypeWithTypeQuery = l.nested.readonlyNestedType;
const constInitToLReadonlyTypeWithIndexedAccess = l.readonlyType;
const constInitToLReadonlyNestedTypeWithIndexedAccess = l.nested.readonlyNestedType;
// type argument inference
const promiseForConstCall = Promise.resolve(constCall);
const arrayOfConstCall = [constCall];
// widening positions
// argument inference
f(s);
f(N.s);
f(N["s"]);
// array literal elements
[s];
[N.s];
[N["s"]];
// property assignments/methods
const o2 = {
    a: s,
    b: N.s,
    c: N["s"],
    method1() { return s; },
    async method2() { return s; },
    async *method3() { yield s; },
    *method4() { yield s; },
    method5(p = s) { return p; },
};
// property initializers
class C0 {
    constructor() {
        this.a = s;
        this.b = N.s;
        this.c = N["s"];
        this.d = s;
        this.e = N.s;
        this.f = N["s"];
    }
    static { this.a = s; }
    static { this.b = N.s; }
    static { this.c = N["s"]; }
    static { this.d = s; }
    static { this.e = N.s; }
    static { this.f = N["s"]; }
    method1() { return s; }
    async method2() { return s; }
    async *method3() { yield s; }
    *method4() { yield s; }
    method5(p = s) { return p; }
}
// non-widening positions
// element access
o[s];
o[N.s];
o[N["s"]];
// arguments (no-inference)
f(s);
f(N.s);
f(N["s"]);
g(s);
g(N.s);
g(N["s"]);
// falsy expressions
s || "";
N.s || "";
N["s"] || "";
// conditionals
Math.random() * 2 ? s : "a";
Math.random() * 2 ? N.s : "a";
Math.random() * 2 ? N["s"] : "a";
// computed property names
({
    [s]: "a",
    [N.s]: "b",
});
class C1 {
    static { N.s, N.s; }
}
const o3 = {
    method1() {
        return s; // return type should not widen due to contextual type
    },
    async method2() {
        return s; // return type should not widen due to contextual type
    },
    async *method3() {
        yield s; // yield type should not widen due to contextual type
    },
    *method4() {
        yield s; // yield type should not widen due to contextual type
    },
    method5(p = s) {
        return p;
    },
};
// allowed when not emitting declarations
const o4 = {
    method1(p) {
        return p;
    },
    method2(p) {
        return p;
    }
};
const ce0 = class {
    method1(p) {
        return p;
    }
    method2(p) {
        return p;
    }
};
function funcInferredReturnType(obj) {
    return obj;
}

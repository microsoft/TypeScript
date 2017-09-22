//// [uniqueSymbols.ts]
// declarations with call initializer
const constCall = Symbol();
let letCall = Symbol();
var varCall = Symbol();

// ambient declaration with type
declare const constType: symbol();

// declaration with type and call initializer
const constTypeAndCall: symbol() = Symbol();

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
    static readonly readonlyStaticType: symbol();
    static readonly readonlyStaticTypeAndCall: symbol() = Symbol();
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
    readonly readonlyType: symbol();
}
declare const i: I;

const constInitToIReadonlyType = i.readonlyType;
const constInitToIReadonlyTypeWithTypeQuery: typeof i.readonlyType = i.readonlyType;
const constInitToIReadonlyTypeWithIndexedAccess: I["readonlyType"] = i.readonlyType;

// type literals
type L = {
    readonly readonlyType: symbol();
    nested: {
        readonly readonlyNestedType: symbol();
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
}
C.readonlyStaticCall = Symbol();
C.readonlyStaticTypeAndCall = Symbol();
C.readwriteStaticCall = Symbol();
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


//// [uniqueSymbols.d.ts]
declare const constCall: symbol();
declare let letCall: symbol;
declare var varCall: symbol;
declare const constType: symbol();
declare const constTypeAndCall: symbol();
declare const constInitToConstCall: symbol;
declare const constInitToLetCall: symbol;
declare const constInitToVarCall: symbol;
declare const constInitToConstDeclAmbient: symbol;
declare let letInitToConstCall: symbol;
declare let letInitToLetCall: symbol;
declare let letInitToVarCall: symbol;
declare let letInitToConstDeclAmbient: symbol;
declare var varInitToConstCall: symbol;
declare var varInitToLetCall: symbol;
declare var varInitToVarCall: symbol;
declare var varInitToConstDeclAmbient: symbol;
declare const constInitToConstCallWithTypeQuery: typeof constCall;
declare const constInitToConstDeclAmbientWithTypeQuery: typeof constType;
declare function funcReturnConstCall(): symbol;
declare function funcReturnLetCall(): symbol;
declare function funcReturnVarCall(): symbol;
declare function funcReturnConstCallWithTypeQuery(): typeof constCall;
declare function genFuncYieldConstCall(): IterableIterator<symbol>;
declare function genFuncYieldLetCall(): IterableIterator<symbol>;
declare function genFuncYieldVarCall(): IterableIterator<symbol>;
declare function genFuncYieldConstCallWithTypeQuery(): IterableIterator<typeof constCall>;
declare function asyncFuncReturnConstCall(): Promise<symbol>;
declare function asyncFuncReturnLetCall(): Promise<symbol>;
declare function asyncFuncReturnVarCall(): Promise<symbol>;
declare function asyncGenFuncYieldConstCall(): AsyncIterableIterator<symbol>;
declare function asyncGenFuncYieldLetCall(): AsyncIterableIterator<symbol>;
declare function asyncGenFuncYieldVarCall(): AsyncIterableIterator<symbol>;
declare class C {
    static readonly readonlyStaticCall: symbol();
    static readonly readonlyStaticType: symbol();
    static readonly readonlyStaticTypeAndCall: symbol();
    static readwriteStaticCall: symbol;
    readonly readonlyCall: symbol;
    readwriteCall: symbol;
}
declare const c: C;
declare const constInitToCReadonlyStaticCall: symbol;
declare const constInitToCReadonlyStaticType: symbol;
declare const constInitToCReadonlyStaticTypeAndCall: symbol;
declare const constInitToCReadwriteStaticCall: symbol;
declare const constInitToCReadonlyStaticCallWithTypeQuery: typeof C.readonlyStaticCall;
declare const constInitToCReadonlyStaticTypeWithTypeQuery: typeof C.readonlyStaticType;
declare const constInitToCReadonlyStaticTypeAndCallWithTypeQuery: typeof C.readonlyStaticTypeAndCall;
declare const constInitToCReadwriteStaticCallWithTypeQuery: typeof C.readwriteStaticCall;
declare const constInitToCReadonlyCall: symbol;
declare const constInitToCReadwriteCall: symbol;
declare const constInitToCReadonlyCallWithTypeQuery: typeof c.readonlyCall;
declare const constInitToCReadwriteCallWithTypeQuery: typeof c.readwriteCall;
declare const constInitToCReadonlyCallWithIndexedAccess: C["readonlyCall"];
declare const constInitToCReadwriteCallWithIndexedAccess: C["readwriteCall"];
interface I {
    readonly readonlyType: symbol();
}
declare const i: I;
declare const constInitToIReadonlyType: symbol;
declare const constInitToIReadonlyTypeWithTypeQuery: typeof i.readonlyType;
declare const constInitToIReadonlyTypeWithIndexedAccess: I["readonlyType"];
declare type L = {
    readonly readonlyType: symbol();
    nested: {
        readonly readonlyNestedType: symbol();
    };
};
declare const l: L;
declare const constInitToLReadonlyType: symbol;
declare const constInitToLReadonlyNestedType: symbol;
declare const constInitToLReadonlyTypeWithTypeQuery: typeof l.readonlyType;
declare const constInitToLReadonlyNestedTypeWithTypeQuery: typeof l.nested.readonlyNestedType;
declare const constInitToLReadonlyTypeWithIndexedAccess: L["readonlyType"];
declare const constInitToLReadonlyNestedTypeWithIndexedAccess: L["nested"]["readonlyNestedType"];
declare const promiseForConstCall: Promise<symbol>;
declare const arrayOfConstCall: symbol[];

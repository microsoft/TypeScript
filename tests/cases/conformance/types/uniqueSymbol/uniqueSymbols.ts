// @target: esnext
// @lib: esnext
// @declaration: true

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
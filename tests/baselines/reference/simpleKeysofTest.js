//// [simpleKeysofTest.ts]
// First, check that the new keyword doesn't interfere
// with any other potential uses of the identifier `keysof`.
namespace keysof {
    export type name = {};
}
function old(a: keysof.name) {}

type keysof = {a: string};
function old2(a: keysof, b: keysof): keysof { return {a: ""}; }
var old3 = (): keysof => ({a: ""});

function disambiguate1(a: keysof ({b: number})) {}
function disambiguate2(): keysof ({a}) {return "a";}

// Then check that the `keysof` operator works as expected 
interface FooBar {
    foo: "yes";
    bar: "no";
    [index: string]: string; // Remove when the indexer is patched to passthru unions
}

function pick(thing: FooBar, member: keysof FooBar) {
    return thing[member];
}

const a = pick({foo: "yes", "bar": "no"}, "bar");

function pick2<T>(thing: T, member: keysof T): keysof T {
    return member;
}
const realA: "a" = "a";
const x = pick2({a: "", b: 0}, realA);
const xx = pick2({a: "", b: 0}, "a");
const item = {0: "yes", 1: "no"};
const xxx = pick2(item, "0");

function annotate<U, T extends keysof U>(obj: U, key: T): U & {annotation: T} {
    const ret = obj as U & {annotation: T};
    if (key === "annotation") return ret; // Already annotated
    ret.annotation = key;
    return ret;
}

annotate({a: "things", b: "stuff"}, "b").annotation === "b";


//// [simpleKeysofTest.js]
function old(a) { }
function old2(a, b) { return { a: "" }; }
var old3 = function () { return ({ a: "" }); };
function disambiguate1(a) { }
function disambiguate2() { return "a"; }
function pick(thing, member) {
    return thing[member];
}
var a = pick({ foo: "yes", "bar": "no" }, "bar");
function pick2(thing, member) {
    return member;
}
var realA = "a";
var x = pick2({ a: "", b: 0 }, realA);
var xx = pick2({ a: "", b: 0 }, "a");
var item = { 0: "yes", 1: "no" };
var xxx = pick2(item, "0");
function annotate(obj, key) {
    var ret = obj;
    if (key === "annotation")
        return ret; // Already annotated
    ret.annotation = key;
    return ret;
}
annotate({ a: "things", b: "stuff" }, "b").annotation === "b";

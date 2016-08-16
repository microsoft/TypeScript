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
}

function pick(thing: FooBar, member: keysof FooBar): typeof member {
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
const xxxx = pick2(item, 0);
item["0"].charCodeAt(0);
item[0].charCodeAt(0);

function pick3<U, T extends keysof U>(obj: U, key: T) {
    key
}
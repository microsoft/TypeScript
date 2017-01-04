// @target: es5
let o = { a: 1, b: 'no' }

/// private propagates
class PrivateOptionalX {
    private x?: number;
}
class PublicX {
    public x: number;
}
let o2: { ...PublicX, ...PrivateOptionalX };
let sn: number = o2.x; // error, x is private
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let allOptional: { sn: string | number } = { ...optionalString, ...optionalNumber };
// error, 'sn' is optional in source, required in target

// assignability as target
interface Bool { b: boolean };
interface Str { s: string };
let spread: { ...Bool, ...Str } = { s: "foo" };  // error, missing 'b'
let b: Bool;
spread = b; // error, missing 's'

// literal repeats are not allowed, but spread repeats are fine
let duplicated = { b: 'bad', ...o, b: 'bad', ...o2, b: 'bad' }
let duplicatedSpread = { ...o, ...o }

// null and undefined are just skipped
let spreadNull = { ...null };
spreadNull.null;
let spreadUndefined = { ...undefined };
spreadUndefined.undefined;

// primitives are not allowed
let spreadNum = { ...12 };
let spreadSum = { ...1 + 1 };
spreadSum.toFixed(); // error, no methods from number
let spreadBool = { ...false };
spreadBool.valueOf(); // error, what were you thinking?
let spreadStr = { ...'foo' };
spreadStr.length; // error, no 'length'
spreadStr.charAt(1); // error, no methods either
// functions are skipped
let spreadFunc = { ...function () { } }
spreadFunc(); // error, no call signature

// write-only properties get skipped
let setterOnly = { ...{ set b (bad: number) { } } };
setterOnly.b = 12; // error, 'b' does not exist

// methods are skipped because they aren't enumerable
class C { p = 1; m() { } }
let c: C = new C()
let spreadC = { ...c }
spreadC.m(); // error 'm' is not in '{ ... c }'

let callableConstructableSpread: { ...PublicX, (n: number): number, new (p: number) };
callableConstructableSpread(12); // error, no call signature
new callableConstructableSpread(12); // error, no construct signature

function override<T,U,V>(initial: U, override: U, t: T, v: V): U {
    // { ...T & V } is not assignable to { ...T & U }
    let tvs: { ...T & V };
    let mistake: { ...T & U } = tvs;
    // { ...U } is not assignable to U
    return { ...initial, ...override };
}

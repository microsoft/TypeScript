// @target: es5
let o = { a: 1, b: 'no' }

/// private propagates
class PrivateOptionalX {
    private x?: number;
}
class PublicX {
    public x: number;
}
let publicX: PublicX;
let privateOptionalX: PrivateOptionalX;
let o2 = { ...publicX, ...privateOptionalX };
let sn: number = o2.x; // error, x is private
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let allOptional: { sn: string | number } = { ...optionalString, ...optionalNumber };
// error, 'sn' is optional in source, required in target

// assignability as target
interface Bool { b: boolean };
interface Str { s: string };
let spread = { ...{ b: true }, ...{s: "foo" } };
spread = { s: "foo" };  // error, missing 'b'
let b = { b: false };
spread = b; // error, missing 's'

// literal repeats are not allowed, but spread repeats are fine
let duplicated = { b: 'bad', ...o, b: 'bad', ...o2, b: 'bad' }
let duplicatedSpread = { ...o, ...o }

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

// non primitive
let obj: object = { a: 123 };
let spreadObj = { ...obj };
spreadObj.a; // error 'a' is not in {}

// generics
function f<T, U>(t: T, u: U) {
    return { ...t, ...u, id: 'id' };
}
function override<U>(initial: U, override: U): U {
    return { ...initial, ...override };
}
let exclusive: { id: string, a: number, b: string, c: string, d: boolean } =
    f({ a: 1, b: 'yes' }, { c: 'no', d: false })
let overlap: { id: string, a: number, b: string } =
    f({ a: 1 }, { a: 2, b: 'extra' })
let overlapConflict: { id:string, a: string } =
    f({ a: 1 }, { a: 'mismatch' })
let overwriteId: { id: string, a: number, c: number, d: string } =
    f({ a: 1, id: true }, { c: 1, d: 'no' })

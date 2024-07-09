// @target: es5
// @strictNullChecks: true
let o = { a: 1, b: 'no' }

/// private propagates
class PrivateOptionalX {
    private x?: number;
}
class PublicX {
    public x: number;
}
declare let publicX: PublicX;
declare let privateOptionalX: PrivateOptionalX;
let o2 = { ...publicX, ...privateOptionalX };
let sn: number = o2.x; // error, x is private
declare let optionalString: { sn?: string };
declare let optionalNumber: { sn?: number };
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
// Note: ignore changes the order that properties are printed
let ignore: { a: number, b: string } =
    { b: 'ignored', ...o }

let o3 = { a: 1, b: 'no' }
let o4 = { b: 'yes', c: true }
let combinedBefore: { a: number, b: string, c: boolean } =
    { b: 'ok', ...o3, ...o4 }
let combinedMid: { a: number, b: string, c: boolean } =
    { ...o3, b: 'ok', ...o4 }
let combinedNested: { a: number, b: boolean, c: string, d: string } =
    { ...{ a: 4, ...{ b: false, c: 'overriden' } }, d: 'actually new', ...{ a: 5, d: 'maybe new' } }
let changeTypeBefore: { a: number, b: string } =
    { a: 'wrong type?', ...o3 };
let computedMiddle: { a: number, b: string, c: boolean, "in the middle": number } =
    { ...o3, ['in the middle']: 13, b: 'maybe?', ...o4 }

// primitives are not allowed, except for falsy ones
let spreadNum = { ...12 };
let spreadSum = { ...1 + 1 };
let spreadZero = { ...0 };
spreadZero.toFixed(); // error, no methods even from a falsy number
let spreadBool = { ...true };
spreadBool.valueOf();
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

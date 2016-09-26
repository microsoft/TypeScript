// @target: es5
let o = { a: 1, b: 'no' }

/// private propagates
class PrivateOptionalX {
    private x?: number;
}
class PublicX {
    public x: number;
}
let privateOptionalx: PrivateOptionalX;
let publicx: PublicX;
let o3 = { ...publicx, ...privateOptionalx };
let sn: string | number = o3.x; // error, x is private
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let allOptional: { sn: string | number } = { ...optionalString, ...optionalNumber };
// error, 'sn' is optional in source, required in target

// assignability as target
interface Bool { b: boolean };
interface Str { s: string };
let spread: { ...Bool, ...Str } = { s: 'foo' }; // error, missing 'b'
let b: Bool;
spread = b; // error, missing 's'

// expressions are not allowed
let o1 = { ...1 + 1 };
let o2 = { ...(1 + 1) };

// literal repeats are not allowed, but spread repeats are fine
let duplicated = { b: 'bad', ...o, b: 'bad', ...o2, b: 'bad' }
let duplicatedSpread = { ...o, ...o }

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

let callableSpread = { ...publicx, ...(n => n + 1) }; // error, can't spread functions

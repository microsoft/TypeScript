//// [objectSpreadNegative.ts]
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


//// [objectSpreadNegative.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var o = { a: 1, b: 'no' };
/// private propagates
var PrivateOptionalX = (function () {
    function PrivateOptionalX() {
    }
    return PrivateOptionalX;
}());
var PublicX = (function () {
    function PublicX() {
    }
    return PublicX;
}());
var privateOptionalx;
var publicx;
var o3 = __assign({}, publicx, privateOptionalx);
var sn = o3.x; // error, x is private
var optionalString;
var optionalNumber;
var allOptional = __assign({}, optionalString, optionalNumber);
;
;
var spread = { s: 'foo' }; // error, missing 'b'
var b;
spread = b; // error, missing 's'
// expressions are not allowed
var o1 = __assign({}, 1 + 1);
var o2 = __assign({}, (1 + 1));
// literal repeats are not allowed, but spread repeats are fine
var duplicated = __assign({ b: 'bad' }, o, { b: 'bad' }, o2, { b: 'bad' });
var duplicatedSpread = __assign({}, o, o);
// write-only properties get skipped
var setterOnly = __assign({ set b(bad: number) { } });
setterOnly.b = 12; // error, 'b' does not exist
// methods are skipped because they aren't enumerable
var C = (function () {
    function C() {
        this.p = 1;
    }
    C.prototype.m = function () { };
    return C;
}());
var c = new C();
var spreadC = __assign({}, c);
spreadC.m(); // error 'm' is not in '{ ... c }'
var callableConstructableSpread;
callableConstructableSpread(12); // error, no call signature
new callableConstructableSpread(12); // error, no construct signature
var callableSpread = __assign({}, publicx, (function (n) { return n + 1; })); // error, can't spread functions

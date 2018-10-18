//// [objectSpreadNegative.ts]
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


//// [objectSpreadNegative.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var o = { a: 1, b: 'no' };
/// private propagates
var PrivateOptionalX = /** @class */ (function () {
    function PrivateOptionalX() {
    }
    return PrivateOptionalX;
}());
var PublicX = /** @class */ (function () {
    function PublicX() {
    }
    return PublicX;
}());
var publicX;
var privateOptionalX;
var o2 = __assign({}, publicX, privateOptionalX);
var sn = o2.x; // error, x is private
var optionalString;
var optionalNumber;
var allOptional = __assign({}, optionalString, optionalNumber);
;
;
var spread = __assign({ b: true }, { s: "foo" });
spread = { s: "foo" }; // error, missing 'b'
var b = { b: false };
spread = b; // error, missing 's'
// literal repeats are not allowed, but spread repeats are fine
var duplicated = __assign({ b: 'bad' }, o, { b: 'bad' }, o2, { b: 'bad' });
var duplicatedSpread = __assign({}, o, o);
// primitives are not allowed, except for falsy ones
var spreadNum = __assign({}, 12);
var spreadSum = __assign({}, 1 + 1);
var spreadZero = __assign({}, 0);
spreadZero.toFixed(); // error, no methods even from a falsy number
var spreadBool = __assign({}, true);
spreadBool.valueOf();
var spreadStr = __assign({}, 'foo');
spreadStr.length; // error, no 'length'
spreadStr.charAt(1); // error, no methods either
// functions are skipped
var spreadFunc = __assign({}, function () { });
spreadFunc(); // error, no call signature
// write-only properties get skipped
var setterOnly = __assign({ set b(bad) { } });
setterOnly.b = 12; // error, 'b' does not exist
// methods are skipped because they aren't enumerable
var C = /** @class */ (function () {
    function C() {
        this.p = 1;
    }
    C.prototype.m = function () { };
    return C;
}());
var c = new C();
var spreadC = __assign({}, c);
spreadC.m(); // error 'm' is not in '{ ... c }'
// non primitive
var obj = { a: 123 };
var spreadObj = __assign({}, obj);
spreadObj.a; // error 'a' is not in {}
// generics
function f(t, u) {
    return __assign({}, t, u, { id: 'id' });
}
function override(initial, override) {
    return __assign({}, initial, override);
}
var exclusive = f({ a: 1, b: 'yes' }, { c: 'no', d: false });
var overlap = f({ a: 1 }, { a: 2, b: 'extra' });
var overlapConflict = f({ a: 1 }, { a: 'mismatch' });
var overwriteId = f({ a: 1, id: true }, { c: 1, d: 'no' });

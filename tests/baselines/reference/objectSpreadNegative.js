//// [objectSpreadNegative.ts]
let o = { a: 1, b: 'no' }

/// private propagates
class PrivateOptionalX {
    private x?: number;
}
class PublicX {
    public x: number;
}
let o2: spread(PublicX, PrivateOptionalX);
let sn: number = o2.x; // error, x is private
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let allOptional: { sn: string | number } = { ...optionalString, ...optionalNumber };
// error, 'sn' is optional in source, required in target

// assignability as target
interface Bool { b: boolean };
interface Str { s: string };
let spread: spread(Bool, Str) = { s: "foo" };  // error, missing 'b'
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

let callableConstructableSpread: spread(PublicX, { (n: number): number, new (p: number) });
callableConstructableSpread(12); // error, no call signature
new callableConstructableSpread(12); // error, no construct signature

function override<T,U,V>(initial: U, override: U, t: T, v: V): U {
    // { ...T & V } is not assignable to { ...T & U }
    let tvs: spread(T & V);
    let mistake: spread(T & U) = tvs;
    // { ...U } is not assignable to U
    return { ...initial, ...override };
}


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
var o2;
var sn = o2.x; // error, x is private
var optionalString;
var optionalNumber;
var allOptional = __assign({}, optionalString, optionalNumber);
;
;
var spread = { s: "foo" }; // error, missing 'b'
var b;
spread = b; // error, missing 's'
// literal repeats are not allowed, but spread repeats are fine
var duplicated = __assign({ b: 'bad' }, o, { b: 'bad' }, o2, { b: 'bad' });
var duplicatedSpread = __assign({}, o, o);
// null and undefined are just skipped
var spreadNull = __assign({}, null);
spreadNull.null;
var spreadUndefined = __assign({}, undefined);
spreadUndefined.undefined;
// primitives are not allowed
var spreadNum = __assign({}, 12);
var spreadSum = __assign({}, 1 + 1);
spreadSum.toFixed(); // error, no methods from number
var spreadBool = __assign({}, false);
spreadBool.valueOf(); // error, what were you thinking?
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
function override(initial, override, t, v) {
    // { ...T & V } is not assignable to { ...T & U }
    var tvs;
    var mistake = tvs;
    // { ...U } is not assignable to U
    return __assign({}, initial, override);
}

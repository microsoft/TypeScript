//// [spreadUnion3.ts]
function f(x: { y: string } | undefined): { y: string } {
    return { y: 123, ...x } // y: string | number
}
f(undefined)


function g(t?: { a: number } | null): void {
    let b = { ...t };
    let c: number = b.a;  // might not have 'a'
}
g()
g(undefined)
g(null)

// spreading nothing but null and undefined is not allowed
declare const nullAndUndefinedUnion: null | undefined;
var x = { ...nullAndUndefinedUnion, ...nullAndUndefinedUnion };
var y = { ...nullAndUndefinedUnion };


//// [spreadUnion3.js]
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
function f(x) {
    return __assign({ y: 123 }, x); // y: string | number
}
f(undefined);
function g(t) {
    var b = __assign({}, t);
    var c = b.a; // might not have 'a'
}
g();
g(undefined);
g(null);
var x = __assign(__assign({}, nullAndUndefinedUnion), nullAndUndefinedUnion);
var y = __assign({}, nullAndUndefinedUnion);

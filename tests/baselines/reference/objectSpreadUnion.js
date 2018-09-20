//// [objectSpreadUnion.ts]
// concrete types work
interface A1 { a: number }
interface A2 { a: string }
let a12: A1 | A2;
let result = { ...a12 };
let sn: number | string = result.a;
let assignable: { ...(A1 | A2) } = result;

function tripleUnion<T, U, V>(t: T, u: U, v: V): void {
    let tuv: T | U | V;
    let result = { ...tuv, id: 'foo' };
    let expected: { ...T, id: string } | { ...U, id: string } | { ...V, id: string } = result;
    let assignable: { ...(T | U | V), id: string } = result;
}
function iteratedDoubleUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U | V;
    let result = { ...tu, ...uv, id: 'bar' };
    let expected: { ...T, ...U, id: string } | { ...T, ...V, id: string } | { ...U, id: string } | { ...U, ...V, id: string };
    let assignable: { ...(T | U), ...(U | V), id: string } = result;
}




//// [objectSpreadUnion.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var a12;
var result = __assign({}, a12);
var sn = result.a;
var assignable = result;
function tripleUnion(t, u, v) {
    var tuv;
    var result = __assign({}, tuv, { id: 'foo' });
    var expected = result;
    var assignable = result;
}
function iteratedDoubleUnion(t, u, v) {
    var tu;
    var uv;
    var result = __assign({}, tu, uv, { id: 'bar' });
    var expected;
    var assignable = result;
}

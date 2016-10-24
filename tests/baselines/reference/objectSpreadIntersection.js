//// [objectSpreadIntersection.ts]
function iteratedUnionIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'foo' };
    let assignable: { ...(T | U), ...(U & V), id: string } = result;
}
// concrete types work
interface A1 { a: number }
interface A2 { a: string }
interface B1 { b: number }
interface B2 { b: string }
let a12: A1 & A2;
let b12: B1 & B2;
let result = { ...a12, ...b12 };
let sn: number & string = result.a;
sn = result.b;
let assignable: { ...(A1 & A2), ...(B1 & B2) } = result;

function tripleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tuv: T & U & V;
    let result = { ...tuv, id: 'bar' };
    let assignable: { ...(T & U & V), id: string } = result;
}
function iteratedDoubleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'baz' };
    let assignable: { ...(T & U), ...(U & V), id: string } = result;
}
function iteratedIntersectionUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U | V;
    let result = { ...tu, ...uv, id: 'qux' };
    let assignable: { ...(T & U), ...(U | V), id: string } = result;
}



//// [objectSpreadIntersection.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function iteratedUnionIntersection(t, u, v) {
    var tu;
    var uv;
    var result = __assign({}, tu, uv, { id: 'foo' });
    var assignable = result;
}
var a12;
var b12;
var result = __assign({}, a12, b12);
var sn = result.a;
sn = result.b;
var assignable = result;
function tripleIntersection(t, u, v) {
    var tuv;
    var result = __assign({}, tuv, { id: 'bar' });
    var assignable = result;
}
function iteratedDoubleIntersection(t, u, v) {
    var tu;
    var uv;
    var result = __assign({}, tu, uv, { id: 'baz' });
    var assignable = result;
}
function iteratedIntersectionUnion(t, u, v) {
    var tu;
    var uv;
    var result = __assign({}, tu, uv, { id: 'qux' });
    var assignable = result;
}

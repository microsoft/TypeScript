//// [objectSpreadIntersection.ts]
function iteratedUnionIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U & V;
    let result = { id: 'bar', ...tu, ...uv };
    let expected: ({ id: string, ...T, ...U } & { id: string, ...T, ...V }) | ({ id: string, ...U } & { id: string, ...U, ...V });
    let assignable: { id: string, ...(T | U), ...(U & V) } = result;
}
// concrete types work
interface A1 { a: number }
interface A2 { a: string }
let a12: A1 & A2;
let result = { ...a12 };
let sn: number & string = result.a;
let assignable: { ...(A1 & A2) } = result;

function tripleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tuv: T & U & V;
    let result = { id: 'foo', ...tuv };
    let expected: { id: string, ...T } & { id: string, ...U } & { id: string, ...V } = result;
    let assignable: { id: string, ...(T & U & V) } = result;
}
function iteratedDoubleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U & V;
    let result = { id: 'bar', ...tu, ...uv };
    let expected: { id: string, ...T, ...U } & { id: string, ...T, ...V } & { id: string, ...U } & { id: string, ...U, ...V };
    let assignable: { id: string, ...(T & U), ...(U & V) } = result;
}
function iteratedIntersectionUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U | V;
    let result = { id: 'bar', ...tu, ...uv };
    let expected: ({ id: string, ...T, ...U } & { id: string, ...U }) | ({ id: string, ...T, ...V } & { id: string, ...U, ...V });
    let assignable: { id: string, ...(T & U), ...(U | V) } = result;
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
    var result = __assign({ id: 'bar' }, tu, uv);
    var expected;
    var assignable = result;
}
var a12;
var result = __assign({}, a12);
var sn = result.a;
var assignable = result;
function tripleIntersection(t, u, v) {
    var tuv;
    var result = __assign({ id: 'foo' }, tuv);
    var expected = result;
    var assignable = result;
}
function iteratedDoubleIntersection(t, u, v) {
    var tu;
    var uv;
    var result = __assign({ id: 'bar' }, tu, uv);
    var expected;
    var assignable = result;
}
function iteratedIntersectionUnion(t, u, v) {
    var tu;
    var uv;
    var result = __assign({ id: 'bar' }, tu, uv);
    var expected;
    var assignable = result;
}

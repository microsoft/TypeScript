function iteratedUnionIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'foo' };
    let assignable: spread(spread(T | U, U & V), { id: string }) = result;
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
let assignable: spread(A1 & A2, B1 & B2) = result;

function tripleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tuv: T & U & V;
    let result = { ...tuv, id: 'bar' };
    let assignable: spread(T & U & V, { id: string }) = result;
}
function iteratedDoubleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'baz' };
    let assignable: spread(spread(T & U, U & V), { id: string }) = result;
}
function iteratedIntersectionUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U | V;
    let result = { ...tu, ...uv, id: 'qux' };
    let assignable: spread(spread(T & U, U | V), { id: string }) = result;
}

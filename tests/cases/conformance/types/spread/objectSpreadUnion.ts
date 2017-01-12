// concrete types work
interface A1 { a: number }
interface A2 { a: string }
let a12: A1 | A2;
let result = { ...a12 };
let sn: number | string = result.a;
let assignable: spread(A1 | A2) = result;

function tripleUnion<T, U, V>(t: T, u: U, v: V): void {
    let tuv: T | U | V;
    let result = { ...tuv, id: 'foo' };
    let expected: spread(T, { id: string }) | spread(U, { id: string }) | spread(V, { id: string }) = result;
    let assignable: spread(T | U | V, { id: string }) = result;
}
function iteratedDoubleUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U | V;
    let result = { ...tu, ...uv, id: 'bar' };
    let expected: spread(spread(T, U), { id: string }) | spread(spread(T, V), { id: string }) | spread(U, { id: string }) | spread(spread(U, V), { id: string });
    let assignable: spread(spread(T | U, U | V), { id: string }) = result;
}

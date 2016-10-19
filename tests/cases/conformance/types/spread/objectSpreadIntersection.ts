function iteratedUnionIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T | U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'foo' };
    let expected: ({ ...T, ...U, id: string } & { ...T, ...V, id: string }) | ({ ...U, id: string } & { ...U, ...V, id: string });
    let assignable: { ...(T | U), ...(U & V), id: string } = result;
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
    let result = { ...tuv, id: 'bar' };
    let expected: { ...T, id: string } & { ...U, id: string } & { ...V, id: string } = result;
    let assignable: { ...(T & U & V), id: string } = result;
}
function iteratedDoubleIntersection<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U & V;
    let result = { ...tu, ...uv, id: 'baz' };
    let expected: { ...T, ...U, id: string } & { ...T, ...V, id: string } & { ...U, id: string } & { ...U, ...V, id: string };
    let assignable: { ...(T & U), ...(U & V), id: string } = result;
}
function iteratedIntersectionUnion<T, U, V>(t: T, u: U, v: V): void {
    let tu: T & U;
    let uv: U | V;
    let result = { ...tu, ...uv, id: 'qux' };
    let expected: ({ ...T, ...U, id: string } & { ...U, id: string }) | ({ ...T, ...V, id: string } & { ...U, ...V, id: string });
    let assignable: { ...(T & U), ...(U | V), id: string } = result;
}


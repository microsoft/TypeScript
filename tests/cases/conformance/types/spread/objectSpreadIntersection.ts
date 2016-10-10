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


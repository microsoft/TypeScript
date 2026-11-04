// @strict: true
// @declaration: true

interface First { first: string }
interface Middle { middle: string }
interface ZLast { last: string }

namespace A {
    export type Alias<T> = (T extends string ? ZLast : First) & { common: unknown };
}
namespace B {
    export type Alias<T> = T & { common: unknown };
}

declare const a: A.Alias<string>;
declare const b: A.Alias<number>;
declare const c: B.Alias<Middle>;
export const values = [a, b, c];
export const reversed = [c, b, a];
export const shuffled = [b, a, c];

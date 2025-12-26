// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59826

declare function g<A>(a: A, b: A extends string ? `rel:${NoInfer<A>}` : never): A;
const result1 = g("5", "rel:7"); // error

declare function g2<A>(a: A, b: A extends string ? NoInfer<`rel:${A}`> : never): A;
const result2 = g2("5", "rel:7"); // error

declare function g3<A>(a: A, b: NoInfer<A extends string ? `rel:${A}` : never>): A;
const result3 = g3("5", "rel:7"); // error

declare function h<const A>(a: A, b: A extends string ? NoInfer<A> : never): A;
const result4 = h("foo", "bar"); // error

declare function h2<const A>(a: A, b: NoInfer<A> extends string ? NoInfer<A> : never): A;
const result5 = h2("foo", "bar"); // error

declare function h3<const A>(a: A, b: NoInfer<A> extends string ? A : never): A;
const result6 = h3("foo", "bar"); // no error
const result7 = h3("foo", 42); // error

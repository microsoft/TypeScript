// @lib: es6, dom
interface A { a: A }
declare let a: A;
type Deep<T> = { [K in keyof T]: Deep<T[K]> }
declare function foo<T>(deep: Deep<T>): T;
const out = foo(a);

let xhr: XMLHttpRequest;
const out2 = foo(xhr);

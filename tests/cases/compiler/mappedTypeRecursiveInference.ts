// @lib: es6, dom
interface A { a: A }
declare let a: A;
type Deep<T> = { [K in keyof T]: Deep<T[K]> }
declare function foo<T>(deep: Deep<T>): T;
const out = foo(a);
out.a
out.a.a
out.a.a.a.a.a.a.a

let xhr: XMLHttpRequest;
const out2 = foo(xhr);
out2.responseXML
out2.responseXML.activeElement.className.length

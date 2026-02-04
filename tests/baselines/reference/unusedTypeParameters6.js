//// [tests/cases/compiler/unusedTypeParameters6.ts] ////

//// [a.ts]
class C<T> { }

//// [b.ts]
interface C<T> { a: T; }

//// [a.js]
"use strict";
class C {
}
//// [b.js]
"use strict";

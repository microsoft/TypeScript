//// [tests/cases/compiler/unusedTypeParameters7.ts] ////

//// [a.ts]
class C<T> { a: T; }

//// [b.ts]
interface C<T> { }

//// [a.js]
"use strict";
class C {
    a;
}
//// [b.js]
"use strict";

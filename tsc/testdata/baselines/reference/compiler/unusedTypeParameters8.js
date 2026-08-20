//// [tests/cases/compiler/unusedTypeParameters8.ts] ////

//// [a.ts]
class C<T> { }

//// [b.ts]
interface C<T> { }

//// [a.js]
"use strict";
class C {
}
//// [b.js]
"use strict";

//// [tests/cases/compiler/classHeritageWithTrailingSeparator.ts] ////

//// [classHeritageWithTrailingSeparator.ts]
class C { foo: number }
class D extends C, {
}

//// [classHeritageWithTrailingSeparator.js]
"use strict";
class C {
    foo;
}
class D extends C {
}

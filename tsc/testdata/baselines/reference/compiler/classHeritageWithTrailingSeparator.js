//// [tests/cases/compiler/classHeritageWithTrailingSeparator.ts] ////

//// [classHeritageWithTrailingSeparator.ts]
class C { foo: number }
class D extends C, {
}

//// [classHeritageWithTrailingSeparator.js]
"use strict";
class C {
}
class D extends C {
}

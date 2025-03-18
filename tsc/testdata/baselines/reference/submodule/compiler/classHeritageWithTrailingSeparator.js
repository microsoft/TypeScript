//// [tests/cases/compiler/classHeritageWithTrailingSeparator.ts] ////

//// [classHeritageWithTrailingSeparator.ts]
class C { foo: number }
class D extends C, {
}

//// [classHeritageWithTrailingSeparator.js]
class C {
    foo;
}
class D extends C {
}

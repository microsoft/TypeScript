//// [tests/cases/compiler/classHeritageWithTrailingSeparator.ts] ////

//// [classHeritageWithTrailingSeparator.ts]
class C { foo: number }
class D extends C, {
}

//// [classHeritageWithTrailingSeparator.js]
class C {
}
class D extends C {
}

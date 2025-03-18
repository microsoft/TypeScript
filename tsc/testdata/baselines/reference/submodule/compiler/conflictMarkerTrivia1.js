//// [tests/cases/compiler/conflictMarkerTrivia1.ts] ////

//// [conflictMarkerTrivia1.ts]
class C {
<<<<<<< HEAD
    v = 1;
=======
    v = 2;
>>>>>>> Branch-a
}

//// [conflictMarkerTrivia1.js]
class C {
    v = 1;
}

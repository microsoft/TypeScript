//// [tests/cases/compiler/conflictMarkerDiff3Trivia1.ts] ////

//// [conflictMarkerDiff3Trivia1.ts]
class C {
<<<<<<< HEAD
    v = 1;
||||||| merged common ancestors
    v = 3;
=======
    v = 2;
>>>>>>> Branch-a
}

//// [conflictMarkerDiff3Trivia1.js]
class C {
    v = 1;
}

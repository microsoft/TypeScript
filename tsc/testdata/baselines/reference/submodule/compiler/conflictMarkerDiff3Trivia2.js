//// [tests/cases/compiler/conflictMarkerDiff3Trivia2.ts] ////

//// [conflictMarkerDiff3Trivia2.ts]
class C {
  foo() {
<<<<<<< B
     a();
  }
||||||| merged common ancestors
     c();
  }
=======
     b();
  }
>>>>>>> A

  public bar() { }
}


//// [conflictMarkerDiff3Trivia2.js]
class C {
    foo() {
        a();
    }
    bar() { }
}

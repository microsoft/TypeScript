//// [tests/cases/compiler/conflictMarkerTrivia2.ts] ////

//// [conflictMarkerTrivia2.ts]
class C {
  foo() {
<<<<<<< B
     a();
  }
=======
     b();
  }
>>>>>>> A

  public bar() { }
}


//// [conflictMarkerTrivia2.js]
class C {
    foo() {
        a();
    }
    bar() { }
}

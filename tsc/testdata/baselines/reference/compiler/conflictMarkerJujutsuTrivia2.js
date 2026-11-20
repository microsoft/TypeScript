//// [tests/cases/compiler/conflictMarkerJujutsuTrivia2.ts] ////

//// [conflictMarkerJujutsuTrivia2.ts]
class C {
  foo() {
<<<<<<< conflict 1 of 1
+++++++ lnqukurm 3504bbcc "call a()"
     a();
------- puqzxvrm 9be6077e "call c()"
     c();
+++++++ uxvuvmmx 392ce8b5 "call b()"
     b();
>>>>>>> conflict 1 of 1 ends
  }

  public bar() { }
}


//// [conflictMarkerJujutsuTrivia2.js]
"use strict";
class C {
    foo() {
        a();
    }
    bar() { }
}

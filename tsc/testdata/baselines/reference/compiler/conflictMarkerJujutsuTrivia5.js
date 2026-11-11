//// [tests/cases/compiler/conflictMarkerJujutsuTrivia5.ts] ////

//// [conflictMarkerJujutsuTrivia5.ts]
class C {
  foo() {
<<<<<<< conflict 1 of 1
%%%%%%% diff from: puqzxvrm 9be6077e "call c()"
\\\\\\\        to: lnqukurm 3504bbcc "call a()"
-     c();
+     a();
+++++++ uxvuvmmx 392ce8b5 "call b()"
     b();
>>>>>>> conflict 1 of 1 ends
  }

  public bar() { }
}


//// [conflictMarkerJujutsuTrivia5.js]
"use strict";
class C {
    foo() {
        b();
    }
    bar() { }
}

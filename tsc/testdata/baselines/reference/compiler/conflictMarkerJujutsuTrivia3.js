//// [tests/cases/compiler/conflictMarkerJujutsuTrivia3.ts] ////

//// [conflictMarkerJujutsuTrivia3.ts]
class C {
  foo() {
<<<<<<<<<<< conflict 1 of 2
%%%%%%%%%%% diff from: puqzxvrm 9be6077e "call c()"
\\\\\\\\\\\        to: lnqukurm 84b1da1d "call a()"
-     c();
+     a();
+++++++++++ uxvuvmmx 71bb7e49 "call b()"
     b();
>>>>>>>>>>> conflict 1 of 2 ends
  }

<<<<<<<<<<< conflict 2 of 2
%%%%%%%%%%% diff from: puqzxvrm 9be6077e "call c()"
\\\\\\\\\\\        to: lnqukurm 84b1da1d "call a()"
+/*
+=======
+*/
+
+++++++++++ uxvuvmmx 71bb7e49 "call b()"
/*
%%%%%%%
*/

>>>>>>>>>>> conflict 2 of 2 ends
  public bar() { }
}


//// [conflictMarkerJujutsuTrivia3.js]
"use strict";
class C {
    foo() {
        b();
    }
    bar() { }
}

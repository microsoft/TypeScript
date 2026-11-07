// @target: es2015
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

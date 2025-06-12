//// [tests/cases/compiler/superInCatchBlock1.ts] ////

//// [superInCatchBlock1.ts]
class A {
 m(): void { }
}
class B extends A {
 m() {
  try {
  }
  catch (e) {
   super.m();
  }
 }
}


//// [superInCatchBlock1.js]
class A {
    m() { }
}
class B extends A {
    m() {
        try {
        }
        catch (e) {
            super.m();
        }
    }
}

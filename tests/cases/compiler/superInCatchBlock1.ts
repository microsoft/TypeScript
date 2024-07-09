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

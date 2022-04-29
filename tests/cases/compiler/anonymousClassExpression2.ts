// Fixes #14860
// note: repros with `while (0);` too
// but it's less inscrutable and more obvious to put it *inside* the loop
while (0) {
    class A {
        methodA() {
            this; //note: a this reference of some kind is required to trigger the bug
        }
    }

    class B {
        methodB() {
            this.methodA; // error
            this.methodB; // ok
        }
    }
}


class A {
    isA(): this is A { return true; }
    doA() { }
}
  
class B {
    isA(): this is A { return false; }
}

type AorB = A | B;

declare function f(): AorB;

let aorb: AorB

if ((aorb = f()).isA()) {
    aorb.doA();
}
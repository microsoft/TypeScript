class A {
  static bar(): string {
     return "";
    }
    foo(): number { return 1; }
}
 
class C2 extends A {}

var a: A;
var c: C2;
a.bar(); // static off an instance - should be an error
c.bar(); // static off an instance - should be an error
A.bar(); // valid
C2.bar(); // valid
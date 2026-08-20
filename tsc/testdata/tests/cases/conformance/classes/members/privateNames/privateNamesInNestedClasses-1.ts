// @strict: true
// @target: es6

class A {
   #foo = "A's #foo";
   #bar = "A's #bar";
   method () {
       class B {
           #foo = "B's #foo";
           bar (a: any) {
               a.#foo; // OK, no compile-time error, don't know what `a` is
           }
           baz (a: A) {
               a.#foo; // compile-time error, shadowed
           }
           quux (b: B) {
               b.#foo; // OK
           }
       }
       const a = new A();
       new B().bar(a);
       new B().baz(a);
       const b = new B();
       new B().quux(b);
   }
}

new A().method();

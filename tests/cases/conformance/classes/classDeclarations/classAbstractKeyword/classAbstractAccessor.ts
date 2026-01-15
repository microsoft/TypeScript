// @target: es5

abstract class A {
   abstract get a();
   abstract get aa() { return 1; } // error
   abstract set b(x: string);
   abstract set bb(x: string) {} // error
}

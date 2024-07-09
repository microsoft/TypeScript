//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticAndStaticInitializer.ts] ////

//// [privateNameStaticAndStaticInitializer.ts]
class A {
  static #foo = 1;
  static #prop = 2;
}



//// [privateNameStaticAndStaticInitializer.js]
var _a, _A_foo, _A_prop;
class A {
}
_a = A;
_A_foo = { value: 1 };
_A_prop = { value: 2 };

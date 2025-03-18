//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticAndStaticInitializer.ts] ////

//// [privateNameStaticAndStaticInitializer.ts]
class A {
  static #foo = 1;
  static #prop = 2;
}



//// [privateNameStaticAndStaticInitializer.js]
class A {
    static #foo = 1;
    static #prop = 2;
}

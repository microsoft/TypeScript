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

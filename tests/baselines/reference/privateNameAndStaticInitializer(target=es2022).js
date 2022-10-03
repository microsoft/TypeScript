//// [privateNameAndStaticInitializer.ts]
class A {
  #foo = 1;
  static inst = new A();
  #prop = 2;
}



//// [privateNameAndStaticInitializer.js]
class A {
    #foo = 1;
    static inst = new A();
    #prop = 2;
}

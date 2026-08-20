//// [tests/cases/conformance/classes/members/privateNames/privateNameAndStaticInitializer.ts] ////

//// [privateNameAndStaticInitializer.ts]
class A {
  #foo = 1;
  static inst = new A();
  #prop = 2;
}



//// [privateNameAndStaticInitializer.js]
"use strict";
class A {
    #foo = 1;
    static inst = new A();
    #prop = 2;
}

//// [tests/cases/compiler/privateAccessInSubclass1.ts] ////

//// [privateAccessInSubclass1.ts]
class Base {
  private options: any;
}

class D extends Base {
  myMethod() {
    this.options;
  }
}

//// [privateAccessInSubclass1.js]
"use strict";
class Base {
}
class D extends Base {
    myMethod() {
        this.options;
    }
}

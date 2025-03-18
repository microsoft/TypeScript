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
class Base {
    options;
}
class D extends Base {
    myMethod() {
        this.options;
    }
}

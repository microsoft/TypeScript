//// [tests/cases/conformance/classes/propertyMemberDeclarations/redeclaredProperty.ts] ////

//// [redeclaredProperty.ts]
class Base {
  b = 1;
}

class Derived extends Base {
  b;
  d = this.b;

  constructor() {
    super();
    this.b = 2;
  }
}


//// [redeclaredProperty.js]
class Base {
    b = 1;
}
class Derived extends Base {
    b;
    d = this.b;
    constructor() {
        super();
        this.b = 2;
    }
}

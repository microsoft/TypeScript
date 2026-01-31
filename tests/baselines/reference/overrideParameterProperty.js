//// [tests/cases/conformance/override/overrideParameterProperty.ts] ////

//// [overrideParameterProperty.ts]
class Base {
  p1!: string;
}

class C1 extends Base {
  constructor(public override p1: "hello") {
    super();
    this.p1;
  }
}

class C2 extends Base {
  constructor(override p1: "hello") {
    super();
    this.p1;
  }
}

class C3 extends Base {
  constructor(override public p1: "hello") {
    super();
    this.p1;
  }

  m(override p1: "hello") {}
}

class C4 extends Base {
  constructor(public override p2: string) {
    super();
  }
}

//// [overrideParameterProperty.js]
class Base {
}
class C1 extends Base {
    constructor(p1) {
        super();
        this.p1 = p1;
        this.p1;
    }
}
class C2 extends Base {
    constructor(p1) {
        super();
        this.p1 = p1;
        this.p1;
    }
}
class C3 extends Base {
    constructor(p1) {
        super();
        this.p1 = p1;
        this.p1;
    }
    m(p1) { }
}
class C4 extends Base {
    constructor(p2) {
        super();
        this.p2 = p2;
    }
}

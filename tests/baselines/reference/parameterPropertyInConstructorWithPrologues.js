//// [tests/cases/compiler/parameterPropertyInConstructorWithPrologues.ts] ////

//// [parameterPropertyInConstructorWithPrologues.ts]
// https://github.com/microsoft/TypeScript/issues/48671

class C {}

class Foo1 {
  constructor(private A: string) {
    "ngInject1";
  }
}

class Foo2 {
  constructor(private A: string, private B: string) {
    "ngInject1";
    "ngInject2";
  }
}

class Foo3 {
  constructor(private A: string, private B: string, private C: string) {
    "ngInject1";
    "ngInject2";
  }
}

class Foo4 {
  constructor(private A: string) {
    "ngInject1";
    console.log("hi");
  }
}

class Foo5 {
  constructor(private A: string, private B: string) {
    "ngInject1";
    "ngInject2";
    console.log("hi");
  }
}

class Foo6 {
  constructor(private A: string, private B: string, private C: string) {
    "ngInject1";
    "ngInject2";
    console.log("hi");
  }
}

class Foo7 extends C {
  constructor(
    private member: boolean,
  ) {
    "ngInject1";
    super();
    console.log("hi");
  }
}

class Foo8 extends C {
  constructor(
    private member: boolean,
  ) {
    "ngInject1";
    super();
    this.m();
    console.log("hi");
  }

  m() {}
}

class Foo9 extends C {
  constructor() {
    "ngInject1";
    "ngInject2";
    super();
    this.m();
    console.log("hi");
  }

  m() {}
}


//// [parameterPropertyInConstructorWithPrologues.js]
// https://github.com/microsoft/TypeScript/issues/48671
class C {
}
class Foo1 {
    constructor(A) {
        "ngInject1";
        this.A = A;
    }
}
class Foo2 {
    constructor(A, B) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
    }
}
class Foo3 {
    constructor(A, B, C) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        this.C = C;
    }
}
class Foo4 {
    constructor(A) {
        "ngInject1";
        this.A = A;
        console.log("hi");
    }
}
class Foo5 {
    constructor(A, B) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        console.log("hi");
    }
}
class Foo6 {
    constructor(A, B, C) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        this.C = C;
        console.log("hi");
    }
}
class Foo7 extends C {
    constructor(member) {
        "ngInject1";
        super();
        this.member = member;
        console.log("hi");
    }
}
class Foo8 extends C {
    constructor(member) {
        "ngInject1";
        super();
        this.member = member;
        this.m();
        console.log("hi");
    }
    m() { }
}
class Foo9 extends C {
    constructor() {
        "ngInject1";
        "ngInject2";
        super();
        this.m();
        console.log("hi");
    }
    m() { }
}

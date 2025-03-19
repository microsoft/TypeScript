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
    A;
    constructor(A) {
        this.A = A;
        "ngInject1";
    }
}
class Foo2 {
    A;
    B;
    constructor(A, B) {
        this.A = A;
        this.B = B;
        "ngInject1";
        "ngInject2";
    }
}
class Foo3 {
    A;
    B;
    C;
    constructor(A, B, C) {
        this.A = A;
        this.B = B;
        this.C = C;
        "ngInject1";
        "ngInject2";
    }
}
class Foo4 {
    A;
    constructor(A) {
        "ngInject1";
        "ngInject1";
        this.A = A;
        console.log("hi");
    }
}
class Foo5 {
    A;
    B;
    constructor(A, B) {
        "ngInject1";
        "ngInject2";
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        console.log("hi");
    }
}
class Foo6 {
    A;
    B;
    C;
    constructor(A, B, C) {
        "ngInject1";
        "ngInject2";
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        this.C = C;
        console.log("hi");
    }
}
class Foo7 extends C {
    member;
    constructor(member) {
        "ngInject1";
        "ngInject1";
        this.member = member;
        super();
        console.log("hi");
    }
}
class Foo8 extends C {
    member;
    constructor(member) {
        "ngInject1";
        "ngInject1";
        this.member = member;
        super();
        this.m();
        console.log("hi");
    }
    m() { }
}
class Foo9 extends C {
    constructor() {
        "ngInject1";
        "ngInject2";
        "ngInject1";
        "ngInject2";
        super();
        this.m();
        console.log("hi");
    }
    m() { }
}

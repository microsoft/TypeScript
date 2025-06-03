//// [tests/cases/compiler/controlFlowAutoAccessor1.ts] ////

//// [controlFlowAutoAccessor1.ts]
class Example {
  accessor test;

  constructor(test: number) {
    this.test = test;
  }

  getTest() {
    return this.test;
  }
}

class Example2 {
  accessor test;

  constructor(test: number | undefined) {
    this.test = test;
  }

  getTest() {
    if (this.test) {
      return this.test;
    }
    return 0;
  }
}

// https://github.com/microsoft/TypeScript/issues/59728

class Example3 {
  accessor value;

  constructor(n: number) {
    this.value = n;

    if (n < 0) {
      this.value = null;
    }
  }
}

declare var n: number;
class Example4 {
  static accessor value;
  static {
    this.value = n;
    if (n < 0) {
      this.value = null;
    }
  }
}

class Example5 {
  static accessor value; // error
}
Example5.value = 123;
Example5.value++;


//// [controlFlowAutoAccessor1.js]
class Example {
    accessor test;
    constructor(test) {
        this.test = test;
    }
    getTest() {
        return this.test;
    }
}
class Example2 {
    accessor test;
    constructor(test) {
        this.test = test;
    }
    getTest() {
        if (this.test) {
            return this.test;
        }
        return 0;
    }
}
// https://github.com/microsoft/TypeScript/issues/59728
class Example3 {
    accessor value;
    constructor(n) {
        this.value = n;
        if (n < 0) {
            this.value = null;
        }
    }
}
class Example4 {
    static accessor value;
    static {
        this.value = n;
        if (n < 0) {
            this.value = null;
        }
    }
}
class Example5 {
    static accessor value; // error
}
Example5.value = 123;
Example5.value++;


//// [controlFlowAutoAccessor1.d.ts]
declare class Example {
    accessor test: any;
    constructor(test: number);
    getTest(): any;
}
declare class Example2 {
    accessor test: any;
    constructor(test: number | undefined);
    getTest(): any;
}
// https://github.com/microsoft/TypeScript/issues/59728
declare class Example3 {
    accessor value: any;
    constructor(n: number);
}
declare var n: number;
declare class Example4 {
    static accessor value: any;
}
declare class Example5 {
    static accessor value: any; // error
}

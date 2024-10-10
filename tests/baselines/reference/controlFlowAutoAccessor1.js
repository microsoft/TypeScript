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


//// [controlFlowAutoAccessor1.js]
"use strict";
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


//// [controlFlowAutoAccessor1.d.ts]
declare class Example {
    accessor test: number;
    constructor(test: number);
    getTest(): number;
}
declare class Example2 {
    accessor test: number | undefined;
    constructor(test: number | undefined);
    getTest(): number;
}
declare class Example3 {
    accessor value: number | null;
    constructor(n: number);
}

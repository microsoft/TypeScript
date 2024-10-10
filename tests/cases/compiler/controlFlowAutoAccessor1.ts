// @strict: true
// @target: esnext
// @declaration: true

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

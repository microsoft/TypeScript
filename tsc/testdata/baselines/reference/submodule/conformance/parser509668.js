//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser509668.ts] ////

//// [parser509668.ts]
class Foo3 {
  // Doesn't work, but should
  constructor (public ...args: string[]) { }
}

//// [parser509668.js]
class Foo3 {
    args;
    // Doesn't work, but should
    constructor(...args) {
        this.args = args;
    }
}

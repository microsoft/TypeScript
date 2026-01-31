//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser553699.ts] ////

//// [parser553699.ts]
class Foo {
  constructor() { }
  public banana (x: public) { }
}

class Bar {
  constructor(c: Bar) { }
}

//// [parser553699.js]
class Foo {
    constructor() { }
    banana(x) { }
}
class Bar {
    constructor(c) { }
}

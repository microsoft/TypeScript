//// [tests/cases/compiler/quotedFunctionName2.ts] ////

//// [quotedFunctionName2.ts]
class Test1 {
  static "prop1"() { }
}

//// [quotedFunctionName2.js]
class Test1 {
    static "prop1"() { }
}

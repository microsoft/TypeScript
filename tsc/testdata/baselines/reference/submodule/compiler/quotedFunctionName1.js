//// [tests/cases/compiler/quotedFunctionName1.ts] ////

//// [quotedFunctionName1.ts]
class Test1 {
  "prop1"() { }
}

//// [quotedFunctionName1.js]
class Test1 {
    "prop1"() { }
}

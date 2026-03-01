//// [tests/cases/compiler/quotedFunctionName2.ts] ////

//// [quotedFunctionName2.ts]
class Test1 {
  static "prop1"() { }
}

//// [quotedFunctionName2.js]
"use strict";
class Test1 {
    static "prop1"() { }
}

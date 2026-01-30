//// [tests/cases/compiler/fillInMissingTypeArgsOnConstructCalls.ts] ////

//// [fillInMissingTypeArgsOnConstructCalls.ts]
class A<T extends Object>{
      list: T ;
}
var a = new A();


//// [fillInMissingTypeArgsOnConstructCalls.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var a = new A();

//// [fillInMissingTypeArgsOnConstructCalls.ts]
class A<T extends Object>{
      list: T ;
}
var a = new A();


//// [fillInMissingTypeArgsOnConstructCalls.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var a = new A();

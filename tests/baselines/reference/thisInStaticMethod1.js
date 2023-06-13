//// [tests/cases/compiler/thisInStaticMethod1.ts] ////

//// [thisInStaticMethod1.ts]
class foo {
 static x = 3;
 static bar() {
  return this.x;
 } 
} 
var x = foo.bar();

//// [thisInStaticMethod1.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.bar = function () {
        return this.x;
    };
    foo.x = 3;
    return foo;
}());
var x = foo.bar();

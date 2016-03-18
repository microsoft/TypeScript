//// [thisInStaticMethod1.ts]
class foo {
 static x = 3;
 static bar() {
  return this.x;
 } 
} 
var x = foo.bar();

//// [thisInStaticMethod1.js]
var foo = (function () {
    function foo() {
    }
    foo.bar = function () {
        return this.x;
    };
    return foo;
}());
foo.x = 3;
var x = foo.bar();

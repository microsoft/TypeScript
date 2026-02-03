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
class foo {
    static bar() {
        return this.x;
    }
}
foo.x = 3;
var x = foo.bar();

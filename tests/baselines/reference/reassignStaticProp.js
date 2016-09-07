//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // errror - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
var foo = (function () {
    function foo() {
    }
    return foo;
}());
foo.bar = 1;

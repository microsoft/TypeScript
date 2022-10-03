//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // errror - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.bar = 1;
    return foo;
}());

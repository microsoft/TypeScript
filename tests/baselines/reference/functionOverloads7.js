//// [functionOverloads7.ts]
class foo { 
   private bar();
   private bar(foo: string);
   private bar(foo?: any){ return "foo" }
   public n() {
     var foo = this.bar();
     foo = this.bar("test");
   }
}


//// [functionOverloads7.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    foo.prototype.bar = function (foo) { return "foo"; };
    foo.prototype.n = function () {
        var foo = this.bar();
        foo = this.bar("test");
    };
    return foo;
}());

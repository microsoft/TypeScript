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
var foo = (function () {
    function foo() {
    }
    var proto_1 = foo.prototype;
    proto_1.bar = function (foo) { return "foo"; };
    proto_1.n = function () {
        var foo = this.bar();
        foo = this.bar("test");
    };
    return foo;
}());

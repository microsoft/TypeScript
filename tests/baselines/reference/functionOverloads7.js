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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var foo = (function () {
    function foo() {
    }
    foo.prototype.bar = function (foo) { return "foo"; };
    foo.prototype.n = function () {
        var foo = this.bar();
        foo = this.bar("test");
    };
    __names(foo.prototype, ["bar", "n"]);
    return foo;
}());

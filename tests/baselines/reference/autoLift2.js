//// [autoLift2.ts]
class A

{
    constructor() {
        this.foo: any;
        this.bar: any;
    }


  baz() {

     this.foo = "foo";

     this.bar = "bar";

     [1, 2].forEach((p) => this.foo);

     [1, 2].forEach((p) => this.bar);

  }

}



var a = new A();

a.baz();




//// [autoLift2.js]
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
var A = (function () {
    function A() {
        this.foo;
        any;
        this.bar;
        any;
    }
    A.prototype.baz = function () {
        var _this = this;
        this.foo = "foo";
        this.bar = "bar";
        [1, 2].forEach(function (p) { return _this.foo; });
        [1, 2].forEach(function (p) { return _this.bar; });
    };
    __names(A.prototype, ["baz"]);
    return A;
}());
var a = new A();
a.baz();

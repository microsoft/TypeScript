//// [asiInES6Classes.ts]
class Foo {

 

    defaults = {

        done: false

    }

 

    bar() {

        return 3;

    }

 

}


//// [asiInES6Classes.js]
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
var Foo = (function () {
    function Foo() {
        this.defaults = {
            done: false
        };
    }
    Foo.prototype.bar = function () {
        return 3;
    };
    __names(Foo.prototype, ["bar"]);
    return Foo;
}());

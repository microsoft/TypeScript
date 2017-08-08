//// [contextualTypeAppliedToVarArgs.ts]
function delegate(instance: any, method: (...args: any[]) => any, data?: any): (...args: any[]) => any {
    return function () { };
}

class Foo{


    Bar() {
        delegate(this, function (source, args2)
        {
            var a = source.node;
            var b = args2.node;
        } );
    }
}


//// [contextualTypeAppliedToVarArgs.js]
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
function delegate(instance, method, data) {
    return function () { };
}
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function () {
        delegate(this, function (source, args2) {
            var a = source.node;
            var b = args2.node;
        });
    };
    __names(Foo.prototype, ["Bar"]);
    return Foo;
}());

//// [classAbstractAsIdentifier.ts]
class abstract {
    foo() { return 1; }
}

new abstract;

//// [classAbstractAsIdentifier.js]
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
var abstract = (function () {
    function abstract() {
    }
    abstract.prototype.foo = function () { return 1; };
    __names(abstract.prototype, ["foo"]);
    return abstract;
}());
new abstract;

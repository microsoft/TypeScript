//// [implementsInClassExpression.ts]
interface Foo {
    doThing(): void;
}

let cls = class implements Foo {
    doThing() { }
}

//// [implementsInClassExpression.js]
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
var cls = (function () {
    function class_1() {
    }
    class_1.prototype.doThing = function () { };
    __names(class_1.prototype, ["doThing"]);
    return class_1;
}());

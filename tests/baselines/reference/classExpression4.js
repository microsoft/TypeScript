//// [classExpression4.ts]
let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();


//// [classExpression4.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var C = (function () {
    function class_1() {
    }
    class_1.prototype.foo = function () {
        return new C();
    };
    __names(class_1.prototype, ["foo"]);
    return class_1;
}());
var x = (new C).foo();

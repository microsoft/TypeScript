//// [classExpression5.ts]
new class {
    hi() {
        return "Hi!";
    }
}().hi();

//// [classExpression5.js]
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
new (function () {
    function class_1() {
    }
    class_1.prototype.hi = function () {
        return "Hi!";
    };
    __names(class_1.prototype, ["hi"]);
    return class_1;
}())().hi();

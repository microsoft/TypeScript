//// [functionsInClassExpressions.ts]
let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    }
    m() { return this.bar; }
}

//// [functionsInClassExpressions.js]
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
    function class_1() {
        var _this = this;
        this.bar = 0;
        this.inc = function () {
            _this.bar++;
        };
        this.bar++;
    }
    class_1.prototype.m = function () { return this.bar; };
    __names(class_1.prototype, ["m"]);
    return class_1;
}());

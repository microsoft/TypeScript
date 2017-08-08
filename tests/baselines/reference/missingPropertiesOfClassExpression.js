//// [missingPropertiesOfClassExpression.ts]
class George extends class { reset() { return this.y; } } {
    constructor() {
        super();
    }
}


//// [missingPropertiesOfClassExpression.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var George = (function (_super) {
    __extends(George, _super);
    function George() {
        return _super.call(this) || this;
    }
    return George;
}((function () {
    function class_1() {
    }
    class_1.prototype.reset = function () { return this.y; };
    __names(class_1.prototype, ["reset"]);
    return class_1;
}())));

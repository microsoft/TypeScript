//// [es5ExportDefaultClassDeclaration2.ts]
export default class {
    method() { }
}


//// [es5ExportDefaultClassDeclaration2.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.method = function () { };
    __names(default_1.prototype, ["method"]);
    return default_1;
}());
exports.default = default_1;


//// [es5ExportDefaultClassDeclaration2.d.ts]
export default class  {
    method(): void;
}

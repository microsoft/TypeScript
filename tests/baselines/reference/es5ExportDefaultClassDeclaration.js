//// [es5ExportDefaultClassDeclaration.ts]
export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var C = (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __names(C.prototype, ["method"]);
    return C;
}());
exports.default = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}

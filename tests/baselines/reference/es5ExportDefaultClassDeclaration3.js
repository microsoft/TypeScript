//// [es5ExportDefaultClassDeclaration3.ts]
var before: C = new C();

export default class C {
    method(): C {
        return new C();
    }
}

var after: C = new C();

var t: typeof C = C;



//// [es5ExportDefaultClassDeclaration3.js]
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
var before = new C();
var C = (function () {
    function C() {
    }
    C.prototype.method = function () {
        return new C();
    };
    __names(C.prototype, ["method"]);
    return C;
}());
exports.default = C;
var after = new C();
var t = C;


//// [es5ExportDefaultClassDeclaration3.d.ts]
export default class C {
    method(): C;
}

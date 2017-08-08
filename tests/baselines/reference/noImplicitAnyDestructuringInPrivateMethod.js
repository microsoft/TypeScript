//// [noImplicitAnyDestructuringInPrivateMethod.ts]
type Arg = {
    a: number;
};
export class Bar {
    private bar({ a, }: Arg): number {
        return a;
    }
}
export declare class Bar2 {
    private bar({ a, });
}

//// [noImplicitAnyDestructuringInPrivateMethod.js]
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
exports.__esModule = true;
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.bar = function (_a) {
        var a = _a.a;
        return a;
    };
    __names(Bar.prototype, ["bar"]);
    return Bar;
}());
exports.Bar = Bar;


//// [noImplicitAnyDestructuringInPrivateMethod.d.ts]
export declare class Bar {
    private bar({a});
}
export declare class Bar2 {
    private bar({a});
}

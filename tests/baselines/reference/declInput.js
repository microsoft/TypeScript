//// [declInput.ts]
interface bar {

}

class bar {
  public f() { return ''; }
  public g() { return {a: <bar>null, b: undefined, c: void 4 }; }
  public h(x = 4, y = null, z = '') { x++; }
}


//// [declInput.js]
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
var bar = (function () {
    function bar() {
    }
    bar.prototype.f = function () { return ''; };
    bar.prototype.g = function () { return { a: null, b: undefined, c: void 4 }; };
    bar.prototype.h = function (x, y, z) {
        if (x === void 0) { x = 4; }
        if (y === void 0) { y = null; }
        if (z === void 0) { z = ''; }
        x++;
    };
    __names(bar.prototype, ["f", "g", "h"]);
    return bar;
}());


//// [declInput.d.ts]
interface bar {
}
declare class bar {
    f(): string;
    g(): {
        a: bar;
        b: any;
        c: any;
    };
    h(x?: number, y?: any, z?: string): void;
}

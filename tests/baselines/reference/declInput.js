//// [declInput.ts]
interface bar {

}

class bar {
  public f() { return ''; }
  public g() { return {a: <bar>null, b: undefined, c: void 4 }; }
  public h(x = 4, y = null, z = '') { x++; }
}


//// [declInput.js]
var bar = (function () {
    function bar() {
    }
    var proto_1 = bar.prototype;
    proto_1.f = function () { return ''; };
    proto_1.g = function () { return { a: null, b: undefined, c: void 4 }; };
    proto_1.h = function (x, y, z) {
        if (x === void 0) { x = 4; }
        if (y === void 0) { y = null; }
        if (z === void 0) { z = ''; }
        x++;
    };
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

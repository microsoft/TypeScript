//// [declInput3.ts]
interface bar2 {

}

class bar {
  public f() { return ''; }
  public g() { return {a: <bar>null, b: undefined, c: void 4 }; }
  public h(x = 4, y = null, z = '') { x++; }
}


//// [declInput3.js]
var bar = (function () {
    function bar() {
    }
    bar.prototype.f = function () {
        return '';
    };
    bar.prototype.g = function () {
        return { a: null, b: undefined, c: void 4 };
    };
    bar.prototype.h = function (x, y, z) {
        if (typeof x === "undefined") { x = 4; }
        if (typeof y === "undefined") { y = null; }
        if (typeof z === "undefined") { z = ''; }
        x++;
    };
    return bar;
})();


////[declInput3.d.ts]
interface bar2 {
}
declare class bar {
    public f(): string;
    public g(): {
        a: bar;
        b: any;
        c: any;
    };
    public h(x?: number, y?: any, z?: string): void;
}

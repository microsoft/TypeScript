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
    bar.prototype.h = function () {
        var x = (arguments[0] === void 0) ? 4 : arguments[0];
        var y = (arguments[1] === void 0) ? null : arguments[1];
        var z = (arguments[2] === void 0) ? '' : arguments[2];
        x++;
    };
    return bar;
})();


//// [declInput3.d.ts]
interface bar2 {
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

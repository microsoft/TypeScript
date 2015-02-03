//// [symbolProperty32.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 extends C1 {
    [s: Symbol]: () => { x: number };
}

//// [symbolProperty32.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C1 = (function () {
    function C1() {
    }
    C1.prototype[Symbol.toStringTag] = function () {
        return { x: "" };
    };
    return C1;
})();
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(C1);

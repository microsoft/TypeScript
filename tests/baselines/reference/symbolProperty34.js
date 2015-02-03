//// [symbolProperty34.ts]
class C1 extends C2 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}
class C2 {
    [s: Symbol]: () => { x: number };
}

//// [symbolProperty34.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        _super.apply(this, arguments);
    }
    C1.prototype[Symbol.toStringTag] = function () {
        return { x: "" };
    };
    return C1;
})(C2);
var C2 = (function () {
    function C2() {
    }
    return C2;
})();

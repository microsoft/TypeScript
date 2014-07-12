//// [extendBaseClassBeforeItsDeclared.ts]
class derived extends base { }
 
class base { constructor (public n: number) { } }

//// [extendBaseClassBeforeItsDeclared.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var derived = (function (_super) {
    __extends(derived, _super);
    function derived() {
        _super.apply(this, arguments);
    }
    return derived;
})(base);

var base = (function () {
    function base(n) {
        this.n = n;
    }
    return base;
})();

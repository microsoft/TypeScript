//// [extendsClauseAlreadySeen2.ts]
class C<T> {

}
class D<T> extends C<number> extends C<string> {
    baz() { }
}

//// [extendsClauseAlreadySeen2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.baz = function () {
    };
    return D;
})(C);

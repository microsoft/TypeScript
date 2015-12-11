//// [recursiveBaseCheck4.ts]
class M<T> extends M<string> { }
(new M).blah;

//// [recursiveBaseCheck4.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M = (function (_super) {
    __extends(M, _super);
    function M() {
        _super.apply(this, arguments);
    }
    return M;
}(M));
(new M).blah;

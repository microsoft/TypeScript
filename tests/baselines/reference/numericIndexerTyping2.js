//// [numericIndexerTyping2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var I = (function () {
    function I() {
    }
    return I;
})();

var I2 = (function (_super) {
    __extends(I2, _super);
    function I2() {
        _super.apply(this, arguments);
    }
    return I2;
})(I);

var i;
var r = i[1];

var i2;
var r2 = i2[1]; // error: numeric indexer returns the type of the string indexere

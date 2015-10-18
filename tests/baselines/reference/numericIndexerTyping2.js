//// [numericIndexerTyping2.ts]
class I {
    [x: string]: Date
}

class I2 extends I {
}

var i: I;
var r: string = i[1]; // error: numeric indexer returns the type of the string indexer

var i2: I2;
var r2: string = i2[1]; // error: numeric indexer returns the type of the string indexere

//// [numericIndexerTyping2.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var r = i[1]; // error: numeric indexer returns the type of the string indexer
var i2;
var r2 = i2[1]; // error: numeric indexer returns the type of the string indexere

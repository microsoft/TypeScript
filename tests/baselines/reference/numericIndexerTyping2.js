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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var I = (function () {
    function I() {
    }
    return I;
}());
var I2 = (function (_super) {
    __extends(I2, _super);
    function I2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return I2;
}(I));
var i;
var r = i[1]; // error: numeric indexer returns the type of the string indexer
var i2;
var r2 = i2[1]; // error: numeric indexer returns the type of the string indexere

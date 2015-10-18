//// [classIndexer3.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

class D123 extends C123 {
    x: number;
    y: string;
}

//// [classIndexer3.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C123 = (function () {
    function C123() {
    }
    return C123;
})();
var D123 = (function (_super) {
    __extends(D123, _super);
    function D123() {
        _super.apply(this, arguments);
    }
    return D123;
})(C123);

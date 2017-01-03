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
var C123 = (function () {
    function C123() {
    }
    return C123;
}());
var D123 = (function (_super) {
    __extends(D123, _super);
    function D123() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D123;
}(C123));

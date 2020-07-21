//// [override5.ts]
class B {
    p1: number = 1;
    p2: number = 2;
}

class D extends B{
    declare p1: number

    override declare p2: number
}


//// [override5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var B = /** @class */ (function () {
    function B() {
        this.p1 = 1;
        this.p2 = 2;
    }
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(B));


//// [override5.d.ts]
declare class B {
    p1: number;
    p2: number;
}
declare class D extends B {
    p1: number;
    override p2: number;
}

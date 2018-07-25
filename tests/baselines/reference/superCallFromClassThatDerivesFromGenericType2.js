//// [superCallFromClassThatDerivesFromGenericType2.ts]
declare class B<T> {
    m<U>(): B<U>;
}

class D extends B<any> {
    constructor() {
        super();
    }
}


//// [superCallFromClassThatDerivesFromGenericType2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.call(this) || this;
    }
    return D;
}(B));

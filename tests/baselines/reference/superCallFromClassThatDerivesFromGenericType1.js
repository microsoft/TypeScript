//// [superCallFromClassThatDerivesFromGenericType1.ts]
declare class B<T> {
    m<U>(): B<U>;
    static g(): B<any>;
}

class D extends B<any> {
    constructor() {
        super();
    }
}


//// [superCallFromClassThatDerivesFromGenericType1.js]
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
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.call(this) || this;
    }
    return D;
}(B));

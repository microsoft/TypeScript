//// [superWithGenerics.ts]
declare class B<T> {    
    m<U>(): B<U>;
    static g(): B<any>;
}

class D extends B<any> {
    constructor() {
        super(); 
    }
}


//// [superWithGenerics.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.call(this);
    }
    return D;
})(B);

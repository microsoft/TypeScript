//// [bases.ts]
interface I {
    x;
}

class B {
    constructor() {
        this.y: any;
    }
}

class C extends B implements I {
    constructor() {
        this.x: any;
    }
}

new C().x;
new C().y;



//// [bases.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B() {
        this.y;
        any;
    }
    return B;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        this.x;
        any;
    }
    return C;
}(B));
new C().x;
new C().y;

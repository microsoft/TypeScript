//// [superCallAssignResult.ts]
class E {
    constructor(arg: any) { }
}

class H extends E {
    constructor() {
        var x = super(5); // Should be of type void, not E.
        x = 5;
    }
}

//// [superCallAssignResult.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var E = (function () {
    function E(arg) {
    }
    return E;
}());
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        var x = _super.call(this, 5); // Should be of type void, not E.
        x = 5;
    }
    return H;
}(E));

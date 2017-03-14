//// [extendingFromGenericTypeWithMissingTypeArguments.ts]
class C1<T> {
    c1_prop: T;
}
class D1 extends C1 {
    d1_prop: number;
}

var d1 = new D1();
d1.c1_prop; // any
d1.d1_prop;


class C2<T> {
    constructor(a: T) { }
    c1_prop: T;
}
class D2 extends C2 {
    d1_prop: number;
}

var d1 = new D2(2);
d1.c1_prop; // any
d1.d1_prop;



//// [extendingFromGenericTypeWithMissingTypeArguments.js]
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
var C1 = (function () {
    function C1() {
    }
    return C1;
}());
var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(C1));
var d1 = new D1();
d1.c1_prop; // any
d1.d1_prop;
var C2 = (function () {
    function C2(a) {
    }
    return C2;
}());
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(C2));
var d1 = new D2(2);
d1.c1_prop; // any
d1.d1_prop;

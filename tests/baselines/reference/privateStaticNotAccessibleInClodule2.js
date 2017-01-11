//// [privateStaticNotAccessibleInClodule2.ts]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    private foo: string;
    private static bar: string;
}

class D extends C {
    baz: number;   
}

module D {
    export var y = D.bar; // error
}

//// [privateStaticNotAccessibleInClodule2.js]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.
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
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
(function (D) {
    D.y = D.bar; // error
})(D || (D = {}));

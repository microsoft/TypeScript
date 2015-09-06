//// [baseClassOutOfOrderPropertyAccessIsAlias.ts]
module M {
    export module Q {
        export class C {
        }
    }

    export class C {
    }
    export import im = Q.C;
}

import im4 = M;

class B1 extends im1.C { // error
}
class B2 extends im1.Q.C { // error
}
class B3 extends im2.C { // error
}
class B4 extends im3 { // error
}
class B5 extends im1.im { // error
}
class B6 extends im4.im { // no error
}
class B7 extends im4.C { // no error
}
class B8 extends im4.Q.C { // no error
}
class B9 extends M.C { // no error
}
class B10 extends M.Q.C { // no error
}
class B11 extends M.im { // no error
}

import im1 = M;
import im2 = M.Q;
import im3 = M.Q.C;

//// [baseClassOutOfOrderPropertyAccessIsAlias.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var Q;
    (function (Q) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        Q.C = C;
    })(Q = M.Q || (M.Q = {}));
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
    M.im = Q.C;
})(M || (M = {}));
var im4 = M;
var B1 = (function (_super) {
    __extends(B1, _super);
    function B1() {
        _super.apply(this, arguments);
    }
    return B1;
})(im1.C);
var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    return B2;
})(im1.Q.C);
var B3 = (function (_super) {
    __extends(B3, _super);
    function B3() {
        _super.apply(this, arguments);
    }
    return B3;
})(im2.C);
var B4 = (function (_super) {
    __extends(B4, _super);
    function B4() {
        _super.apply(this, arguments);
    }
    return B4;
})(im3);
var B5 = (function (_super) {
    __extends(B5, _super);
    function B5() {
        _super.apply(this, arguments);
    }
    return B5;
})(im1.im);
var B6 = (function (_super) {
    __extends(B6, _super);
    function B6() {
        _super.apply(this, arguments);
    }
    return B6;
})(im4.im);
var B7 = (function (_super) {
    __extends(B7, _super);
    function B7() {
        _super.apply(this, arguments);
    }
    return B7;
})(im4.C);
var B8 = (function (_super) {
    __extends(B8, _super);
    function B8() {
        _super.apply(this, arguments);
    }
    return B8;
})(im4.Q.C);
var B9 = (function (_super) {
    __extends(B9, _super);
    function B9() {
        _super.apply(this, arguments);
    }
    return B9;
})(M.C);
var B10 = (function (_super) {
    __extends(B10, _super);
    function B10() {
        _super.apply(this, arguments);
    }
    return B10;
})(M.Q.C);
var B11 = (function (_super) {
    __extends(B11, _super);
    function B11() {
        _super.apply(this, arguments);
    }
    return B11;
})(M.im);
var im1 = M;
var im2 = M.Q;
var im3 = M.Q.C;

//// [baseClassOutOfOrderIdentifierIsAlias.ts]
module M {
    export class c {
    }
}

import im2 = M.c;

class B extends im { //error
}

class C extends im2 { // no error
}

import im = M.c;

//// [baseClassOutOfOrderIdentifierIsAlias.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    M.c = c;
})(M || (M = {}));
var im2 = M.c;
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(im);
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(im2);
var im = M.c;

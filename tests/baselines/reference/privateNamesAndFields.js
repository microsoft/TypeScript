//// [privateNamesAndFields.ts]
// @target es6

class A {
    #foo: number;
    constructor () {
        this.#foo = 3;
    }
}

class B extends A {
    #foo: string;
    constructor () {
        super();
        this.#foo = "some string";
    }
}


//// [privateNamesAndFields.js]
"use strict";
// @target es6
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
        this.#foo = 3;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super.call(this) || this;
        _this.#foo = "some string";
        return _this;
    }
    return B;
}(A));

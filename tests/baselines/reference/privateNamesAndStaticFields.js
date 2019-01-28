//// [privateNamesAndStaticFields.ts]
// @target es6

class A {
    static #foo: number;
    constructor () {
        A.#foo = 3;
    }
}

class B extends A {
    static #foo: string;
    constructor () {
        super();
        B.#foo = "some string";
    }
}


tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticFields.js(18,12): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticFields.js(26,12): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticFields.js (2 errors) ====
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
            A. = 3;
               ~
!!! error TS1003: Identifier expected.
        }
        return A;
    }());
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            var _this = _super.call(this) || this;
            B. = "some string";
               ~
!!! error TS1003: Identifier expected.
            return _this;
        }
        return B;
    }(A));
    
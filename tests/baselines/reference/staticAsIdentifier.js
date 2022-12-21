//// [staticAsIdentifier.ts]
class C1 {
    static static
    [x: string]: string;
}

class C2 {
    static static
    m() {}
}

class C3 {
    static static p: string;
}

class C4 {
    static static foo() {}
}

class C5 {
    static static
}

class C6 {
    static 
    static
}

class C7 extends C6 {
    static override static
}




//// [staticAsIdentifier.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.m = function () { };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
    }
    C4.prototype.foo = function () { };
    return C4;
}());
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
var C6 = /** @class */ (function () {
    function C6() {
    }
    return C6;
}());
var C7 = /** @class */ (function (_super) {
    __extends(C7, _super);
    function C7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C7;
}(C6));

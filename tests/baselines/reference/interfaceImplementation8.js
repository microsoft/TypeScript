//// [interfaceImplementation8.ts]
/*
    1
*/
interface i1 {
    name: string;
}

class C1 implements i1 {
    public name:string;
}

class C2 implements i1 {
    private name:string;
}

class C3 {
    private name:any;
}

class C4 extends C1 implements i1{ }
class C5 extends C2 implements i1{ }
class C6 extends C3 implements i1{ }

/*
    2
*/

interface i2 {
    name: string;
    age: number;
}

class C7 {
    public name:string;
}

class C8 extends C7 implements i2{
    public age:number;
}


//// [interfaceImplementation8.js]
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
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(C1));
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C5;
}(C2));
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C6;
}(C3));
var C7 = /** @class */ (function () {
    function C7() {
    }
    return C7;
}());
var C8 = /** @class */ (function (_super) {
    __extends(C8, _super);
    function C8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C8;
}(C7));

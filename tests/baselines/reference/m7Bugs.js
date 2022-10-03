//// [m7Bugs.ts]
// scenario 1
interface ISomething {
   something: number;
}

var s: ISomething = <ISomething>({ });


// scenario 2
interface A { x: string; }

interface B extends A { }

var x: B = <B>{ };

class C1 {
	public x: string;
}

class C2 extends C1 {}

var y1: C1 = new C2();
var y2: C1 = <C1> new C2();
var y3: C1 = <C1> {};



//// [m7Bugs.js]
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
var s = ({});
var x = {};
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(C1));
var y1 = new C2();
var y2 = new C2();
var y3 = {};

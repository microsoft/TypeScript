//// [tests/cases/compiler/untypedFunctionCallsWithTypeParameters1.ts] ////

//// [untypedFunctionCallsWithTypeParameters1.ts]
// none of these function calls should be allowed
var x = function () { return; };
var r1 = x<number>();
var y: any = x;
var r2 = y<string>();

var c: Function;
var r3 = c<number>(); // should be an error

class C implements Function {
    prototype = null;
    length = 1;
    arguments = null;
    caller = () => { };
}

var c2: C;
var r4 = c2<number>(); // should be an error

class C2 extends Function { } // error
var c3: C2;
var r5 = c3<number>(); // error

interface I {
    (number): number;
}
var z: I;
var r6 = z<string>(1); // error

interface callable2<T> {
    (a: T): T;
}

var c4: callable2<number>;
c4<number>(1);
interface callable3<T> {
    (a: T): T;
}

var c5: callable3<number>;
c5<string>(1); // error



//// [untypedFunctionCallsWithTypeParameters1.js]
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
// none of these function calls should be allowed
var x = function () { return; };
var r1 = x();
var y = x;
var r2 = y();
var c;
var r3 = c(); // should be an error
var C = /** @class */ (function () {
    function C() {
        this.prototype = null;
        this.length = 1;
        this.arguments = null;
        this.caller = function () { };
    }
    return C;
}());
var c2;
var r4 = c2(); // should be an error
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(Function)); // error
var c3;
var r5 = c3(); // error
var z;
var r6 = z(1); // error
var c4;
c4(1);
var c5;
c5(1); // error

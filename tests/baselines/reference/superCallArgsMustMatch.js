//// [superCallArgsMustMatch.ts]
class T5<T>{

    public foo: T;

    constructor(public bar: T) { }

}

 

class T6 extends T5<number>{

    constructor() {

        // Should error; base constructor has type T for first arg,
        // which is instantiated with 'number' in the extends clause
        super("hi");

        var x: number = this.foo;

    }

}



//// [superCallArgsMustMatch.js]
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
var T5 = /** @class */ (function () {
    function T5(bar) {
        this.bar = bar;
    }
    return T5;
}());
var T6 = /** @class */ (function (_super) {
    __extends(T6, _super);
    function T6() {
        var _this = 
        // Should error; base constructor has type T for first arg,
        // which is instantiated with 'number' in the extends clause
        _super.call(this, "hi") || this;
        var x = _this.foo;
        return _this;
    }
    return T6;
}(T5));

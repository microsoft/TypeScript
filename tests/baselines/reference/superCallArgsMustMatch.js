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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var T5 = (function () {
    function T5(bar) {
        this.bar = bar;
    }
    return T5;
}());
var T6 = (function (_super) {
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

//// [constructorArgs.ts]
interface Options {
 value: number;
}

class Super {
 constructor(value:number) {
 }
}

class Sub extends Super {
 constructor(public options:Options) {
  super(options.value);
 } 
}


//// [constructorArgs.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Super = (function () {
    function Super(value) {
    }
    return Super;
}());
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub(options) {
        var _this = _super.call(this, options.value) || this;
        _this.options = options;
        return _this;
    }
    return Sub;
}(Super));

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
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
        _super.call(this, options.value);
        this.options = options;
    }
    return Sub;
}(Super));

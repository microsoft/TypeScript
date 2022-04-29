//// [thisBinding2.ts]
class C {
 x: number;
    constructor() {
        this.x = (() => {
   var x = 1;
   return this.x;
  })();
  this.x = function() {
   var x = 1;
   return this.x;
  }();
    }  
}
declare function setTimeout(expression: any, msec?: number, language?: any): number;
var messenger = {
    message: "Hello World",
    start: function () {
        return setTimeout(() => { var x = this.message; }, 3000);
    }
};


//// [thisBinding2.js]
var C = /** @class */ (function () {
    function C() {
        var _this = this;
        this.x = (function () {
            var x = 1;
            return _this.x;
        })();
        this.x = function () {
            var x = 1;
            return this.x;
        }();
    }
    return C;
}());
var messenger = {
    message: "Hello World",
    start: function () {
        var _this = this;
        return setTimeout(function () { var x = _this.message; }, 3000);
    }
};

//// [tests/cases/compiler/thisBinding2.ts] ////

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
class C {
    x;
    constructor() {
        this.x = (() => {
            var x = 1;
            return this.x;
        })();
        this.x = function () {
            var x = 1;
            return this.x;
        }();
    }
}
var messenger = {
    message: "Hello World",
    start: function () {
        return setTimeout(() => { var x = this.message; }, 3000);
    }
};

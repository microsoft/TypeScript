//// [es6ClassTest5.ts]
class C1T5 {
    foo: (i: number, s: string) => number = 
	   	(i) => {
	        return i;
	    }
}
module C2T5 {}

class  bigClass {
     public break = 1;
}


//// [es6ClassTest5.js]
var C1T5 = /** @class */ (function () {
    function C1T5() {
        this.foo = function (i) {
            return i;
        };
    }
    return C1T5;
}());
var bigClass = /** @class */ (function () {
    function bigClass() {
        this["break"] = 1;
    }
    return bigClass;
}());

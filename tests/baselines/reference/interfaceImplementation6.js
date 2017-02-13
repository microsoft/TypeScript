//// [interfaceImplementation6.ts]
interface I1 {
    item:number;
}

class C1 implements I1 {
    public item:number;
}

class C2 implements I1 {
    private item:number;
}

class C3 implements I1 {
    constructor() {
       var item: number;
    }
}
 
export class Test {
    private pt: I1 = { item: 1 };
}




//// [interfaceImplementation6.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var C1 = (function () {
        function C1() {
        }
        return C1;
    }());
    var C2 = (function () {
        function C2() {
        }
        return C2;
    }());
    var C3 = (function () {
        function C3() {
            var item;
        }
        return C3;
    }());
    var Test = (function () {
        function Test() {
            this.pt = { item: 1 };
        }
        return Test;
    }());
    exports.Test = Test;
});

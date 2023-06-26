//// [tests/cases/compiler/interfaceImplementation6.ts] ////

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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test = void 0;
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    var C2 = /** @class */ (function () {
        function C2() {
        }
        return C2;
    }());
    var C3 = /** @class */ (function () {
        function C3() {
            var item;
        }
        return C3;
    }());
    var Test = /** @class */ (function () {
        function Test() {
            this.pt = { item: 1 };
        }
        return Test;
    }());
    exports.Test = Test;
});

//// [interfaceDeclaration3.ts]
interface I1 { item:number; }

module M1 {
    interface I1 { item:string; }  
    interface I2 { item:number; }   
    class C1 implements I1 {
        public item:number;
    }
    class C2 implements I1 {
        public item:string;
    }
    class C3 implements I2 {
        public item:number;
    }
    
    class C4 implements M2.I1 { 
        public item:string;
    }

    class C5 implements M2.M3.I1 {
        public item:string;
    }
}

export module M2 {
    export interface I1 { item:string; }
    export interface I2 { item:string; }
    export module M3 {
        export interface I1 { item:string; }
    }
    class C1 implements I1 {
        public item:number;    
    }
    class C2 implements I1 {
        public item:string;    
    }
    class C3 implements I2 {
        public item:string;    
    }
}

class C1 implements I1 {
    public item:number;
}

class C2 implements M2.I1 { 
    public item:string;
}

class C3 implements M2.M3.I1 {
    public item:string;
}

interface I2 extends I1 { item:string; }


//// [interfaceDeclaration3.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.M2 = void 0;
    var M1;
    (function (M1) {
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
            }
            return C3;
        }());
        var C4 = /** @class */ (function () {
            function C4() {
            }
            return C4;
        }());
        var C5 = /** @class */ (function () {
            function C5() {
            }
            return C5;
        }());
    })(M1 || (M1 = {}));
    var M2;
    (function (M2) {
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
            }
            return C3;
        }());
    })(M2 = exports.M2 || (exports.M2 = {}));
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
        }
        return C3;
    }());
});

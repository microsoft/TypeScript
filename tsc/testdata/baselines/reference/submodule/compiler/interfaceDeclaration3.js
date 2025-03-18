//// [tests/cases/compiler/interfaceDeclaration3.ts] ////

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2 = void 0;
var M1;
(function (M1) {
    class C1 {
        item;
    }
    class C2 {
        item;
    }
    class C3 {
        item;
    }
    class C4 {
        item;
    }
    class C5 {
        item;
    }
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    class C1 {
        item;
    }
    class C2 {
        item;
    }
    class C3 {
        item;
    }
})(M2 || (exports.M2 = M2 = {}));
class C1 {
    item;
}
class C2 {
    item;
}
class C3 {
    item;
}

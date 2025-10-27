//// [tests/cases/compiler/exportDeclareClass1.ts] ////

//// [exportDeclareClass1.ts]
    export declare class eaC {
        static tF() { };
        static tsF(param:any) { };
    };
	
	export declare class eaC2 {
        static tF();
        static tsF(param:any);
    };

//// [exportDeclareClass1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
});

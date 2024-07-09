//@module: amd
//@filename: collisionExportsRequireAndAmbientVar_externalmodule.ts
export declare var exports: number;
export declare var require: string;
declare module m1 {
    var exports: string;
    var require: number;
}
module m2 {
    export declare var exports: number;
    export declare var require: string;
    var a = 10;
}

//@filename: collisionExportsRequireAndAmbientVar_globalFile.ts
declare var exports: number;
declare var require: string;
declare module m3 {
    var exports: string;
    var require: number;
}
module m4 {
    export declare var exports: string;
    export declare var require: number;
    var a = 10;
}
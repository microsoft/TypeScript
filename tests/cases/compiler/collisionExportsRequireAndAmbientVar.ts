//@module: commonjs
//@filename: collisionExportsRequireAndAmbientVar_externalmodule.ts
export declare var exports: number;
export declare var require: string;
declare namespace m1 {
    var exports: string;
    var require: number;
}
namespace m2 {
    export declare var exports: number;
    export declare var require: string;
    var a = 10;
}

//@filename: collisionExportsRequireAndAmbientVar_globalFile.ts
declare var exports: number;
declare var require: string;
declare namespace m3 {
    var exports: string;
    var require: number;
}
namespace m4 {
    export declare var exports: string;
    export declare var require: number;
    var a = 10;
}
//@module: amd
//@filename: collisionExportsRequireAndAmbientClass_externalmodule.ts
export declare class require {
}
export declare class exports {
}
declare module m1 {
    class require {
    }
    class exports {
    }
}
module m2 {
    export declare class require {
    }
    export declare class exports {
    }
}

//@filename: collisionExportsRequireAndAmbientClass_globalFile.ts
declare class require {
}
declare class exports {
}
declare module m3 {
    class require {
    }
    class exports {
    }
}
module m4 {
    export declare class require {
    }
    export declare class exports {
    }
    var a = 10;
}
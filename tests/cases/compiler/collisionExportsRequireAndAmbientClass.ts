//@module: commonjs
//@filename: collisionExportsRequireAndAmbientClass_externalmodule.ts
export declare class require {
}
export declare class exports {
}
declare namespace m1 {
    class require {
    }
    class exports {
    }
}
namespace m2 {
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
declare namespace m3 {
    class require {
    }
    class exports {
    }
}
namespace m4 {
    export declare class require {
    }
    export declare class exports {
    }
    var a = 10;
}
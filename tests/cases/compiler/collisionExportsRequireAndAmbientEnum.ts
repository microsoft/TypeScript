//@module: commonjs
//@filename: collisionExportsRequireAndAmbientEnum_externalmodule.ts
export declare enum require {
    _thisVal1,
    _thisVal2,
}
export declare enum exports {
    _thisVal1,
    _thisVal2,
}
declare namespace m1 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
namespace m2 {
    export declare enum require { 
        _thisVal1,
        _thisVal2,
    }
    export declare enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//@filename: collisionExportsRequireAndAmbientEnum_globalFile.ts
declare enum require {
    _thisVal1,
    _thisVal2,
}
declare enum exports {
    _thisVal1,
    _thisVal2,
}
declare namespace m3 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
namespace m4 {
    export declare enum require {
        _thisVal1,
        _thisVal2,
    }
    export declare enum exports {
        _thisVal1,
        _thisVal2,
    }
}
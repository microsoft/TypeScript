//@module: amd
//@filename: collisionExportsRequireAndAmbientEnum_externalmodule.ts
export declare enum require {
    _thisVal1,
    _thisVal2,
}
export declare enum exports {
    _thisVal1,
    _thisVal2,
}
declare module m1 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
module m2 {
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
declare module m3 {
    enum require {
        _thisVal1,
        _thisVal2,
    }
    enum exports {
        _thisVal1,
        _thisVal2,
    }
}
module m4 {
    export declare enum require {
        _thisVal1,
        _thisVal2,
    }
    export declare enum exports {
        _thisVal1,
        _thisVal2,
    }
}
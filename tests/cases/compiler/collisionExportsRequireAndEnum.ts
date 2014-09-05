//@module: amd
//@filename: collisionExportsRequireAndEnum_externalmodule.ts
export enum require { // Error
    _thisVal1,
    _thisVal2,
}
export enum exports { // Error
    _thisVal1,
    _thisVal2,
}
module m1 {
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
    export enum require { 
        _thisVal1,
        _thisVal2,
    }
    export enum exports {
        _thisVal1,
        _thisVal2,
    }
}

//@filename: collisionExportsRequireAndEnum_globalFile.ts
enum require {
    _thisVal1,
    _thisVal2,
}
enum exports {
    _thisVal1,
    _thisVal2,
}
module m3 {
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
    export enum require {
        _thisVal1,
        _thisVal2,
    }
    export enum exports {
        _thisVal1,
        _thisVal2,
    }
}
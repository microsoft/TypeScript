//@module: amd
//@filename: collisionExportsRequireAndAmbientModule_externalmodule.ts
export declare module require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export declare module exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
declare module m1 {
    namespace require {
        export interface I {
        }
        export class C {
        }
    }
    namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}
namespace m2 {
    export declare module require {
        export interface I {
        }
        export class C {
        }
    }
    export declare module exports {
        export interface I {
        }
        export class C {
        }
    }
    var a = 10;
}

//@filename: collisionExportsRequireAndAmbientModule_globalFile.ts
declare module require {
    export interface I {
    }
    export class C {
    }
}
declare module exports {
    export interface I {
    }
    export class C {
    }
}
declare module m3 {
    namespace require {
        export interface I {
        }
        export class C {
        }
    }
    namespace exports {
        export interface I {
        }
        export class C {
        }
    }
}
namespace m4 {
    export declare module require {
        export interface I {
        }
        export class C {
        }
    }
    export declare module exports {
        export interface I {
        }
        export class C {
        }
    }

    var a = 10;
}

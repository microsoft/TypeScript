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
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m2 {
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
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m4 {
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

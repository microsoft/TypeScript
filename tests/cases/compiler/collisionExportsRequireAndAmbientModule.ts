//@module: commonjs
//@filename: collisionExportsRequireAndAmbientModule_externalmodule.ts
export declare namespace require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export declare namespace exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
declare namespace m1 {
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
    export declare namespace require {
        export interface I {
        }
        export class C {
        }
    }
    export declare namespace exports {
        export interface I {
        }
        export class C {
        }
    }
    var a = 10;
}

//@filename: collisionExportsRequireAndAmbientModule_globalFile.ts
declare namespace require {
    export interface I {
    }
    export class C {
    }
}
declare namespace exports {
    export interface I {
    }
    export class C {
    }
}
declare namespace m3 {
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
    export declare namespace require {
        export interface I {
        }
        export class C {
        }
    }
    export declare namespace exports {
        export interface I {
        }
        export class C {
        }
    }

    var a = 10;
}

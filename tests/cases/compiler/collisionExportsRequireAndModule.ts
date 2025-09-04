//@module: amd
//@filename: collisionExportsRequireAndModule_externalmodule.ts
export module require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export module exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
namespace m1 {
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
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}

//@filename: collisionExportsRequireAndModule_globalFile.ts
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
namespace m3 {
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
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}

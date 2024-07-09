//// [tests/cases/compiler/collisionExportsRequireAndAmbientModule.ts] ////

//// [collisionExportsRequireAndAmbientModule_externalmodule.ts]
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

//// [collisionExportsRequireAndAmbientModule_globalFile.ts]
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


//// [collisionExportsRequireAndAmbientModule_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    exports.foo2 = foo2;
    function foo() {
        return null;
    }
    function foo2() {
        return null;
    }
    var m2;
    (function (m2) {
        var a = 10;
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndAmbientModule_globalFile.js]
var m4;
(function (m4) {
    var a = 10;
})(m4 || (m4 = {}));

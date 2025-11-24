//// [tests/cases/compiler/collisionExportsRequireAndAmbientModule.ts] ////

//// [collisionExportsRequireAndAmbientModule_externalmodule.ts]
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

//// [collisionExportsRequireAndAmbientModule_globalFile.ts]
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


//// [collisionExportsRequireAndAmbientModule_externalmodule.js]
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
//// [collisionExportsRequireAndAmbientModule_globalFile.js]
var m4;
(function (m4) {
    var a = 10;
})(m4 || (m4 = {}));

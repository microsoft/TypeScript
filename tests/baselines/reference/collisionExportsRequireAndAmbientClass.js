//// [tests/cases/compiler/collisionExportsRequireAndAmbientClass.ts] ////

//// [collisionExportsRequireAndAmbientClass_externalmodule.ts]
export declare class require {
}
export declare class exports {
}
declare module m1 {
    class require {
    }
    class exports {
    }
}
module m2 {
    export declare class require {
    }
    export declare class exports {
    }
}

//// [collisionExportsRequireAndAmbientClass_globalFile.ts]
declare class require {
}
declare class exports {
}
declare module m3 {
    class require {
    }
    class exports {
    }
}
module m4 {
    export declare class require {
    }
    export declare class exports {
    }
    var a = 10;
}

//// [collisionExportsRequireAndAmbientClass_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m2;
    (function (m2) {
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndAmbientClass_globalFile.js]
var m4;
(function (m4) {
    var a = 10;
})(m4 || (m4 = {}));

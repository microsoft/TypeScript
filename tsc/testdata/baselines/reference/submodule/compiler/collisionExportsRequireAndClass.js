//// [tests/cases/compiler/collisionExportsRequireAndClass.ts] ////

//// [collisionExportsRequireAndClass_externalmodule.ts]
export class require {
}
export class exports {
}
module m1 {
    class require {
    }
    class exports {
    }
}
module m2 {
    export class require {
    }
    export class exports {
    }
}

//// [collisionExportsRequireAndClass_globalFile.ts]
class require {
}
class exports {
}
module m3 {
    class require {
    }
    class exports {
    }
}
module m4 {
    export class require {
    }
    export class exports {
    }
}

//// [collisionExportsRequireAndClass_externalmodule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exports = exports.require = void 0;
class require {
}
exports.require = require;
class exports {
}
exports.exports = exports;
var m1;
(function (m1) {
    class require {
    }
    class exports {
    }
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    class require {
    }
    m2.require = require;
    class exports {
    }
    m2.exports = exports;
})(m2 || (m2 = {}));
//// [collisionExportsRequireAndClass_globalFile.js]
class require {
}
class exports {
}
var m3;
(function (m3) {
    class require {
    }
    class exports {
    }
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    class require {
    }
    m4.require = require;
    class exports {
    }
    m4.exports = exports;
})(m4 || (m4 = {}));

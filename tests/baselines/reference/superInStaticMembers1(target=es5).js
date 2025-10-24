//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/superInStaticMembers1.ts] ////

//// [external.ts]
export class Reflect {}
export interface Foo {}
export declare namespace Bar { type _ = unknown; }
export const enum Baz {}
export default class {};

//// [locals.ts]
export {};
declare class B { static w(): number; }
class C extends B {
    static _ = [
        (() => {
            var Reflect; // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            var [Reflect] = [null]; // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            class Reflect {} // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            function Reflect() {} // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            enum Reflect {} // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            const enum Reflect {} // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            type Reflect = unknown; // no collision
            super.w();
        })(),
        (() => {
            interface Reflect {}; // no collision
            super.w();
        })(),
        (() => {
            (class Reflect {}); // no collision
            super.w();
        })(),
        (() => {
            (function Reflect() {}); // no collision
            super.w();
        })(),
    ];

    static {
        var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
        super.w();
    }

    static {
        var [Reflect] = [null]; // collision (es2015-es2021 only)
        super.w();
    }

    static {
        var Reflect; // collision (es2015-es2021 only)
        super.w();
    }

    static {
        class Reflect {} // collision (es2015-es2021 only)
        super.w();
    }

    static {
        function Reflect() {} // collision (es2015-es2021 only)
        super.w();
    }

    static {
        enum Reflect {} // collision (es2015-es2021 only)
        super.w();
    }

    static {
        const enum Reflect {} // collision (es2015-es2021 only)
        super.w();
    }

    static {
        type Reflect = unknown; // no collision
        super.w();
    }

    static {
        interface Reflect {} // no collision
        super.w();
    }

    static {
        (class Reflect {}) // no collision
        super.w();
    }

    static {
        (function Reflect() {}) // no collision
        super.w();
    }
}

//// [varInContainingScopeStaticField1.ts]
export {};
declare class B { static w(): number; }
var Reflect = null; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [varInContainingScopeStaticField2.ts]
export {};
declare class B { static w(): number; }
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [varInContainingScopeStaticField3.ts]
export {};
declare class B { static w(): number; }
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [varInContainingScopeStaticBlock1.ts]
export {};
declare class B { static w(): number; }
var Reflect = null; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [varInContainingScopeStaticBlock2.ts]
export {};
declare class B { static w(): number; }
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [varInContainingScopeStaticBlock3.ts]
export {};
declare class B { static w(): number; }
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [classDeclInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
class Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [classDeclInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
class Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [funcDeclInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
function Reflect() {} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [funcDeclInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
function Reflect() {} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [valueNamespaceInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
namespace Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [valueNamespaceInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
namespace Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [enumInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
enum Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [enumInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
enum Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [constEnumInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
const enum Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [constEnumInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
const enum Reflect {} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [namespaceImportInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import * as Reflect from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [namespaceImportInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import * as Reflect from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [namedImportInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import { Reflect } from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [namedImportInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import { Reflect } from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [namedImportOfInterfaceInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import { Foo as Reflect } from "./external"; // collision (es2015-es2021 only, not a type-only import)
class C extends B {
    static _ = super.w();
}

//// [namedImportOfInterfaceInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import { Foo as Reflect } from "./external"; // collision (es2015-es2021 only, not a type-only import)
class C extends B {
    static { super.w(); }
}

//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import { Bar as Reflect } from "./external"; // collision (es2015-es2021 only, not a type-only import)
class C extends B {
    static _ = super.w();
}

//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import { Bar as Reflect } from "./external"; // collision (es2015-es2021 only, not a type-only import)
class C extends B {
    static { super.w(); }
}

//// [namedImportOfConstEnumInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import { Baz as Reflect } from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [namedImportOfConstEnumInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import { Baz as Reflect } from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [typeOnlyNamedImportInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import type { Reflect } from "./external"; // no collision
class C extends B {
    static _ = super.w();
}

//// [typeOnlyNamedImportInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import type { Reflect } from "./external"; // no collision
class C extends B {
    static { super.w(); }
}

//// [defaultImportInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import Reflect from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}

//// [defaultImportInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import Reflect from "./external"; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}

//// [typeOnlyDefaultImportInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
import type Reflect from "./external"; // no collision
class C extends B {
    static _ = super.w();
}

//// [typeOnlyDefaultImportInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
import type Reflect from "./external"; // no collision
class C extends B {
    static { super.w(); }
}

//// [typeInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
type Reflect = unknown; // no collision
class C extends B {
    static _ = super.w();
}

//// [typeInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
type Reflect = unknown; // no collision
class C extends B {
    static { super.w(); }
}

//// [interfaceInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
interface Reflect {}; // no collision
class C extends B {
    static _ = super.w();
}

//// [interfaceInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
interface Reflect {}; // no collision
class C extends B {
    static { super.w(); }
}

//// [uninstantiatedNamespaceInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
declare namespace Reflect { type _ = unknown; }; // no collision
class C extends B {
    static _ = super.w();
}

//// [uninstantiatedNamespaceInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
declare namespace Reflect { type _ = unknown; }; // no collision
class C extends B {
    static { super.w(); }
}

//// [classExprInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
(class Reflect {}); // no collision
class C extends B {
    static _ = super.w();
}

//// [classExprInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
(class Reflect {}); // no collision
class C extends B {
    static { super.w(); }
}

//// [inContainingClassExprStaticField.ts]
export {};
declare class B { static w(): number; }
(class Reflect { // collision (es2015-es2021 only)
    static {
        class C extends B {
            static _ = super.w();
        }
    }
});

//// [inContainingClassExprStaticBlock.ts]
export {};
declare class B { static w(): number; }
(class Reflect { // collision (es2015-es2021 only)
    static {
        class C extends B {
            static { super.w(); }
        }
    }
});

//// [funcExprInContainingScopeStaticField.ts]
export {};
declare class B { static w(): number; }
(function Reflect() {}); // no collision
class C extends B {
    static _ = super.w();
}

//// [funcExprInContainingScopeStaticBlock.ts]
export {};
declare class B { static w(): number; }
(function Reflect() {}); // no collision
class C extends B {
    static { super.w(); }
}

//// [inContainingFuncExprStaticField.ts]
export {};
declare class B { static w(): number; }
(function Reflect() { // collision (es2015-es2021 only)
    class C extends B {
        static _ = super.w();
    }
});

//// [inContainingFuncExprStaticBlock.ts]
export {};
declare class B { static w(): number; }
(function Reflect() { // collision (es2015-es2021 only)
    class C extends B {
        static { super.w(); }
    }
});


//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflect = void 0;
class Reflect {
}
exports.Reflect = Reflect;
class default_1 {
}
exports.default = default_1;
;
//// [locals.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = [
    (() => {
        var Reflect; // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        var [Reflect] = [null]; // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        class Reflect {
        } // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        function Reflect() { } // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        let Reflect;
        (function (Reflect) {
        })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        ; // no collision
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        (class Reflect {
        }); // no collision
        Reflect.get(_b, "w", _a).call(_a);
    })(),
    (() => {
        (function Reflect() { }); // no collision
        Reflect.get(_b, "w", _a).call(_a);
    })(),
];
(() => {
    var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    var [Reflect] = [null]; // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    var Reflect; // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    class Reflect {
    } // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    function Reflect() { } // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    let Reflect;
    (function (Reflect) {
    })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    (class Reflect {
    }); // no collision
    Reflect.get(_b, "w", _a).call(_a);
})();
(() => {
    (function Reflect() { }); // no collision
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [varInContainingScopeStaticField1.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [varInContainingScopeStaticField2.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [varInContainingScopeStaticField3.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [varInContainingScopeStaticBlock1.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [varInContainingScopeStaticBlock2.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [varInContainingScopeStaticBlock3.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [classDeclInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class Reflect {
} // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [classDeclInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class Reflect {
} // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [funcDeclInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { } // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [funcDeclInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { } // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [valueNamespaceInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [valueNamespaceInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [enumInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [enumInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [constEnumInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [constEnumInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [namespaceImportInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [namespaceImportInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [namedImportInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [namedImportInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [namedImportOfInterfaceInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [namedImportOfInterfaceInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [namedImportOfConstEnumInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [namedImportOfConstEnumInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [typeOnlyNamedImportInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [typeOnlyNamedImportInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [defaultImportInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [defaultImportInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [typeOnlyDefaultImportInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [typeOnlyDefaultImportInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [typeInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [typeInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [interfaceInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [interfaceInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [uninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [uninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [classExprInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
}); // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [classExprInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
}); // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [inContainingClassExprStaticField.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = class Reflect {
    },
    (() => {
        var _b, _c;
        class C extends (_c = B) {
        }
        _b = C;
        C._ = Reflect.get(_c, "w", _b).call(_b);
    })(),
    _a);
//// [inContainingClassExprStaticBlock.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = class Reflect {
    },
    (() => {
        var _b, _c;
        class C extends (_c = B) {
        }
        _b = C;
        (() => {
            Reflect.get(_c, "w", _b).call(_b);
        })();
    })(),
    _a);
//// [funcExprInContainingScopeStaticField.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { }); // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
//// [funcExprInContainingScopeStaticBlock.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { }); // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
//// [inContainingFuncExprStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    var _a, _b;
    class C extends (_b = B) {
    }
    _a = C;
    C._ = Reflect.get(_b, "w", _a).call(_a);
});
//// [inContainingFuncExprStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    var _a, _b;
    class C extends (_b = B) {
    }
    _a = C;
    (() => {
        Reflect.get(_b, "w", _a).call(_a);
    })();
});

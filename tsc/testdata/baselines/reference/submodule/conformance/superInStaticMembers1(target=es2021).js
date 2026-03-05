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
export class Reflect {
}
export default class {
}
;
//// [locals.js]
var _a, _b;
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
export {};
//// [varInContainingScopeStaticField1.js]
var _a, _b;
var Reflect = null; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [varInContainingScopeStaticField2.js]
var _a, _b;
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [varInContainingScopeStaticField3.js]
var _a, _b;
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [varInContainingScopeStaticBlock1.js]
var _a, _b;
var Reflect = null; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [varInContainingScopeStaticBlock2.js]
var _a, _b;
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [varInContainingScopeStaticBlock3.js]
var _a, _b;
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [classDeclInContainingScopeStaticField.js]
var _a, _b;
class Reflect {
} // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [classDeclInContainingScopeStaticBlock.js]
var _a, _b;
class Reflect {
} // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [funcDeclInContainingScopeStaticField.js]
var _a, _b;
function Reflect() { } // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [funcDeclInContainingScopeStaticBlock.js]
var _a, _b;
function Reflect() { } // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [valueNamespaceInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [valueNamespaceInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [enumInContainingScopeStaticField.js]
var _a, _b;
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [enumInContainingScopeStaticBlock.js]
var _a, _b;
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [constEnumInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [constEnumInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [namespaceImportInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [namespaceImportInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [namedImportInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [namedImportInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [namedImportOfInterfaceInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [namedImportOfInterfaceInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [namedImportOfConstEnumInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [namedImportOfConstEnumInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [typeOnlyNamedImportInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [typeOnlyNamedImportInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [defaultImportInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [defaultImportInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [typeOnlyDefaultImportInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [typeOnlyDefaultImportInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [typeInContainingScopeStaticField.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [typeInContainingScopeStaticBlock.js]
var _a, _b;
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [interfaceInContainingScopeStaticField.js]
var _a, _b;
; // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [interfaceInContainingScopeStaticBlock.js]
var _a, _b;
; // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [uninstantiatedNamespaceInContainingScopeStaticField.js]
var _a, _b;
; // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [uninstantiatedNamespaceInContainingScopeStaticBlock.js]
var _a, _b;
; // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [classExprInContainingScopeStaticField.js]
var _a, _b;
(class Reflect {
}); // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [classExprInContainingScopeStaticBlock.js]
var _a, _b;
(class Reflect {
}); // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [inContainingClassExprStaticField.js]
var _a;
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
export {};
//// [inContainingClassExprStaticBlock.js]
var _a;
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
export {};
//// [funcExprInContainingScopeStaticField.js]
var _a, _b;
(function Reflect() { }); // no collision
class C extends (_b = B) {
}
_a = C;
C._ = Reflect.get(_b, "w", _a).call(_a);
export {};
//// [funcExprInContainingScopeStaticBlock.js]
var _a, _b;
(function Reflect() { }); // no collision
class C extends (_b = B) {
}
_a = C;
(() => {
    Reflect.get(_b, "w", _a).call(_a);
})();
export {};
//// [inContainingFuncExprStaticField.js]
(function Reflect() {
    var _a, _b;
    class C extends (_b = B) {
    }
    _a = C;
    C._ = Reflect.get(_b, "w", _a).call(_a);
});
export {};
//// [inContainingFuncExprStaticBlock.js]
(function Reflect() {
    var _a, _b;
    class C extends (_b = B) {
    }
    _a = C;
    (() => {
        Reflect.get(_b, "w", _a).call(_a);
    })();
});
export {};

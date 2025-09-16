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
            class Reflect {
            } // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            function Reflect() { } // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            let Reflect;
            (function (Reflect) {
            })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
            super.w();
        })(),
        (() => {
            super.w();
        })(),
        (() => {
            super.w();
        })(),
        (() => {
            ; // no collision
            super.w();
        })(),
        (() => {
            (class Reflect {
            }); // no collision
            super.w();
        })(),
        (() => {
            (function Reflect() { }); // no collision
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
        class Reflect {
        } // collision (es2015-es2021 only)
        super.w();
    }
    static {
        function Reflect() { } // collision (es2015-es2021 only)
        super.w();
    }
    static {
        let Reflect;
        (function (Reflect) {
        })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
        super.w();
    }
    static {
        super.w();
    }
    static {
        super.w();
    }
    static {
        super.w();
    }
    static {
        (class Reflect {
        }); // no collision
        super.w();
    }
    static {
        (function Reflect() { }); // no collision
        super.w();
    }
}
export {};
//// [varInContainingScopeStaticField1.js]
var Reflect = null; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [varInContainingScopeStaticField2.js]
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [varInContainingScopeStaticField3.js]
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [varInContainingScopeStaticBlock1.js]
var Reflect = null; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [varInContainingScopeStaticBlock2.js]
var { Reflect } = { Reflect: null }; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [varInContainingScopeStaticBlock3.js]
var [Reflect] = [null]; // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [classDeclInContainingScopeStaticField.js]
class Reflect {
} // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [classDeclInContainingScopeStaticBlock.js]
class Reflect {
} // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [funcDeclInContainingScopeStaticField.js]
function Reflect() { } // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [funcDeclInContainingScopeStaticBlock.js]
function Reflect() { } // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [valueNamespaceInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [valueNamespaceInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [enumInContainingScopeStaticField.js]
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends B {
    static _ = super.w();
}
export {};
//// [enumInContainingScopeStaticBlock.js]
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
class C extends B {
    static { super.w(); }
}
export {};
//// [constEnumInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [constEnumInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [namespaceImportInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [namespaceImportInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [namedImportInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [namedImportInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [namedImportOfInterfaceInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [namedImportOfInterfaceInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [namedImportOfConstEnumInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [namedImportOfConstEnumInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [typeOnlyNamedImportInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [typeOnlyNamedImportInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [defaultImportInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [defaultImportInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [typeOnlyDefaultImportInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [typeOnlyDefaultImportInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [typeInContainingScopeStaticField.js]
class C extends B {
    static _ = super.w();
}
export {};
//// [typeInContainingScopeStaticBlock.js]
class C extends B {
    static { super.w(); }
}
export {};
//// [interfaceInContainingScopeStaticField.js]
; // no collision
class C extends B {
    static _ = super.w();
}
export {};
//// [interfaceInContainingScopeStaticBlock.js]
; // no collision
class C extends B {
    static { super.w(); }
}
export {};
//// [uninstantiatedNamespaceInContainingScopeStaticField.js]
; // no collision
class C extends B {
    static _ = super.w();
}
export {};
//// [uninstantiatedNamespaceInContainingScopeStaticBlock.js]
; // no collision
class C extends B {
    static { super.w(); }
}
export {};
//// [classExprInContainingScopeStaticField.js]
(class Reflect {
}); // no collision
class C extends B {
    static _ = super.w();
}
export {};
//// [classExprInContainingScopeStaticBlock.js]
(class Reflect {
}); // no collision
class C extends B {
    static { super.w(); }
}
export {};
//// [inContainingClassExprStaticField.js]
(class Reflect {
    static {
        class C extends B {
            static _ = super.w();
        }
    }
});
export {};
//// [inContainingClassExprStaticBlock.js]
(class Reflect {
    static {
        class C extends B {
            static { super.w(); }
        }
    }
});
export {};
//// [funcExprInContainingScopeStaticField.js]
(function Reflect() { }); // no collision
class C extends B {
    static _ = super.w();
}
export {};
//// [funcExprInContainingScopeStaticBlock.js]
(function Reflect() { }); // no collision
class C extends B {
    static { super.w(); }
}
export {};
//// [inContainingFuncExprStaticField.js]
(function Reflect() {
    class C extends B {
        static _ = super.w();
    }
});
export {};
//// [inContainingFuncExprStaticBlock.js]
(function Reflect() {
    class C extends B {
        static { super.w(); }
    }
});
export {};

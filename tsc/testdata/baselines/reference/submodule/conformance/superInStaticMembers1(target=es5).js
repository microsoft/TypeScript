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
exports.Baz = exports.Reflect = void 0;
class Reflect {
}
exports.Reflect = Reflect;
var Baz;
(function (Baz) {
})(Baz || (exports.Baz = Baz = {}));
class default_1 {
}
exports.default = default_1;
;
//// [locals.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = [
        (() => {
            var Reflect;
            super.w();
        })(),
        (() => {
            var { Reflect } = { Reflect: null };
            super.w();
        })(),
        (() => {
            var [Reflect] = [null];
            super.w();
        })(),
        (() => {
            class Reflect {
            }
            super.w();
        })(),
        (() => {
            function Reflect() { }
            super.w();
        })(),
        (() => {
            let Reflect;
            (function (Reflect) {
            })(Reflect || (Reflect = {}));
            super.w();
        })(),
        (() => {
            let Reflect;
            (function (Reflect) {
            })(Reflect || (Reflect = {}));
            super.w();
        })(),
        (() => {
            super.w();
        })(),
        (() => {
            ;
            super.w();
        })(),
        (() => {
            (class Reflect {
            });
            super.w();
        })(),
        (() => {
            (function Reflect() { });
            super.w();
        })(),
    ];
    static {
        var { Reflect } = { Reflect: null };
        super.w();
    }
    static {
        var [Reflect] = [null];
        super.w();
    }
    static {
        var Reflect;
        super.w();
    }
    static {
        class Reflect {
        }
        super.w();
    }
    static {
        function Reflect() { }
        super.w();
    }
    static {
        let Reflect;
        (function (Reflect) {
        })(Reflect || (Reflect = {}));
        super.w();
    }
    static {
        let Reflect;
        (function (Reflect) {
        })(Reflect || (Reflect = {}));
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
        });
        super.w();
    }
    static {
        (function Reflect() { });
        super.w();
    }
}
//// [varInContainingScopeStaticField1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null;
class C extends B {
    static _ = super.w();
}
//// [varInContainingScopeStaticField2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var { Reflect } = { Reflect: null };
class C extends B {
    static _ = super.w();
}
//// [varInContainingScopeStaticField3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var [Reflect] = [null];
class C extends B {
    static _ = super.w();
}
//// [varInContainingScopeStaticBlock1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null;
class C extends B {
    static { super.w(); }
}
//// [varInContainingScopeStaticBlock2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var { Reflect } = { Reflect: null };
class C extends B {
    static { super.w(); }
}
//// [varInContainingScopeStaticBlock3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var [Reflect] = [null];
class C extends B {
    static { super.w(); }
}
//// [classDeclInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reflect {
}
class C extends B {
    static _ = super.w();
}
//// [classDeclInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reflect {
}
class C extends B {
    static { super.w(); }
}
//// [funcDeclInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { }
class C extends B {
    static _ = super.w();
}
//// [funcDeclInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { }
class C extends B {
    static { super.w(); }
}
//// [valueNamespaceInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [valueNamespaceInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [enumInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {}));
class C extends B {
    static _ = super.w();
}
//// [enumInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {}));
class C extends B {
    static { super.w(); }
}
//// [constEnumInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {}));
class C extends B {
    static _ = super.w();
}
//// [constEnumInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {}));
class C extends B {
    static { super.w(); }
}
//// [namespaceImportInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [namespaceImportInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [namedImportInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [namedImportInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [namedImportOfInterfaceInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [namedImportOfInterfaceInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [namedImportOfConstEnumInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [namedImportOfConstEnumInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [typeOnlyNamedImportInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [typeOnlyNamedImportInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [defaultImportInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [defaultImportInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [typeOnlyDefaultImportInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [typeOnlyDefaultImportInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [typeInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static _ = super.w();
}
//// [typeInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C extends B {
    static { super.w(); }
}
//// [interfaceInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class C extends B {
    static _ = super.w();
}
//// [interfaceInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class C extends B {
    static { super.w(); }
}
//// [uninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class C extends B {
    static _ = super.w();
}
//// [uninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class C extends B {
    static { super.w(); }
}
//// [classExprInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
});
class C extends B {
    static _ = super.w();
}
//// [classExprInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
});
class C extends B {
    static { super.w(); }
}
//// [inContainingClassExprStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
    static {
        class C extends B {
            static _ = super.w();
        }
    }
});
//// [inContainingClassExprStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(class Reflect {
    static {
        class C extends B {
            static { super.w(); }
        }
    }
});
//// [funcExprInContainingScopeStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { });
class C extends B {
    static _ = super.w();
}
//// [funcExprInContainingScopeStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { });
class C extends B {
    static { super.w(); }
}
//// [inContainingFuncExprStaticField.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    class C extends B {
        static _ = super.w();
    }
});
//// [inContainingFuncExprStaticBlock.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    class C extends B {
        static { super.w(); }
    }
});

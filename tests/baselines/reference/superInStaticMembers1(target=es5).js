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
var Reflect = /** @class */ (function () {
    function Reflect() {
    }
    return Reflect;
}());
exports.Reflect = Reflect;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
exports.default = default_1;
;
//// [locals.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = [
        (function () {
            var Reflect; // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            var Reflect = { Reflect: null }.Reflect; // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            var Reflect = [null][0]; // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            var Reflect = /** @class */ (function () {
                function Reflect() {
                }
                return Reflect;
            }()); // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            function Reflect() { } // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            var Reflect;
            (function (Reflect) {
            })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
            _super.w.call(_a);
        })(),
        (function () {
            _super.w.call(_a);
        })(),
        (function () {
            _super.w.call(_a);
        })(),
        (function () {
            ; // no collision
            _super.w.call(_a);
        })(),
        (function () {
            (/** @class */ (function () {
                function Reflect() {
                }
                return Reflect;
            }())); // no collision
            _super.w.call(_a);
        })(),
        (function () {
            (function Reflect() { }); // no collision
            _super.w.call(_a);
        })(),
    ];
    (function () {
        var Reflect = { Reflect: null }.Reflect; // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        var Reflect = [null][0]; // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        var Reflect; // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        var Reflect = /** @class */ (function () {
            function Reflect() {
            }
            return Reflect;
        }()); // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        function Reflect() { } // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        var Reflect;
        (function (Reflect) {
        })(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
        _super.w.call(_a);
    })();
    (function () {
        _super.w.call(_a);
    })();
    (function () {
        _super.w.call(_a);
    })();
    (function () {
        _super.w.call(_a);
    })();
    (function () {
        (/** @class */ (function () {
            function Reflect() {
            }
            return Reflect;
        }())); // no collision
        _super.w.call(_a);
    })();
    (function () {
        (function Reflect() { }); // no collision
        _super.w.call(_a);
    })();
    return C;
}(B));
//// [varInContainingScopeStaticField1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [varInContainingScopeStaticField2.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = { Reflect: null }.Reflect; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [varInContainingScopeStaticField3.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = [null][0]; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [varInContainingScopeStaticBlock1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = null; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [varInContainingScopeStaticBlock2.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = { Reflect: null }.Reflect; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [varInContainingScopeStaticBlock3.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = [null][0]; // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [classDeclInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = /** @class */ (function () {
    function Reflect() {
    }
    return Reflect;
}()); // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [classDeclInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect = /** @class */ (function () {
    function Reflect() {
    }
    return Reflect;
}()); // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [funcDeclInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { } // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [funcDeclInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
function Reflect() { } // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [valueNamespaceInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [valueNamespaceInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [enumInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [enumInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Reflect;
(function (Reflect) {
})(Reflect || (Reflect = {})); // collision (es2015-es2021 only)
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [constEnumInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [constEnumInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [namespaceImportInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [namespaceImportInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [namedImportInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [namedImportInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [namedImportOfInterfaceInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [namedImportOfInterfaceInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [namedImportOfUninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [namedImportOfConstEnumInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [namedImportOfConstEnumInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [typeOnlyNamedImportInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [typeOnlyNamedImportInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [defaultImportInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [defaultImportInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [typeOnlyDefaultImportInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [typeOnlyDefaultImportInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [typeInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [typeInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [interfaceInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [interfaceInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [uninstantiatedNamespaceInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [uninstantiatedNamespaceInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
; // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [classExprInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
(/** @class */ (function () {
    function Reflect() {
    }
    return Reflect;
}())); // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [classExprInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
(/** @class */ (function () {
    function Reflect() {
    }
    return Reflect;
}())); // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [inContainingClassExprStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = /** @class */ (function () {
        function Reflect() {
        }
        return Reflect;
    }()),
    (function () {
        var C = /** @class */ (function (_super) {
            __extends(C, _super);
            function C() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            var _b;
            _b = C;
            C._ = _super.w.call(_b);
            return C;
        }(B));
    })(),
    _a);
//// [inContainingClassExprStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = /** @class */ (function () {
        function Reflect() {
        }
        return Reflect;
    }()),
    (function () {
        var _b;
        var C = /** @class */ (function (_super) {
            __extends(C, _super);
            function C() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return C;
        }(B));
        _b = C;
        (function () {
            _super.w.call(_b);
        })();
    })(),
    _a);
//// [funcExprInContainingScopeStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { }); // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = C;
    C._ = _super.w.call(_a);
    return C;
}(B));
//// [funcExprInContainingScopeStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() { }); // no collision
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
_a = C;
(function () {
    _super.w.call(_a);
})();
//// [inContainingFuncExprStaticField.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        var _a;
        _a = C;
        C._ = _super.w.call(_a);
        return C;
    }(B));
});
//// [inContainingFuncExprStaticBlock.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
(function Reflect() {
    var _this = this;
    var _a;
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C;
    }(B));
    _a = C;
    (function () {
        _super.w.call(_a);
    })();
});

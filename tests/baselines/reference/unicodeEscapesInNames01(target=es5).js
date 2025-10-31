//// [tests/cases/compiler/unicodeEscapesInNames01.ts] ////

//// [identifierVariableWithEscape1.ts]
export let \u0078 = 10;
x++;

//// [identifierVariableWithEscape2.ts]
export let x\u0078 = 10;
xx++;

//// [identifierVariableWithEscape3.ts]
export let a\u0062c\u0064e = 10;
abcde++;

//// [identifierVariableWithExtendedEscape1.ts]
export let \u{78} = 10;
x++;

//// [identifierVariableWithExtendedEscape2.ts]
export let x\u{78} = 10;
xx++;

//// [identifierVariableWithExtendedEscape3.ts]
export let a\u{62}c\u{64}e = 10;
abcde++;

//// [IdentifierNameWithEscape1.ts]
export class IdentifierNameWithEscape1 {
    \u0078: number;

    constructor() {
        this.\u0078 = 0;
    }

    doThing() {
        this.x = 42;
    }
}

//// [IdentifierNameWithEscape2.ts]
export class IdentifierNameWithEscape2 {
    x\u0078: number;

    constructor() {
        this.x\u0078 = 0;
    }

    doThing() {
        this.xx = 42;
    }
}

//// [IdentifierNameWithEscape3.ts]
export class IdentifierNameWithEscape3 {
    a\u0062c\u0064e: number;

    constructor() {
        this.a\u0062c\u0064e = 0;
    }

    doThing() {
        this.abcde = 42;
    }
}

//// [IdentifierNameWithExtendedEscape1.ts]
export class IdentifierNameWithExtendedEscape1 {
    \u{78}: number;

    constructor() {
        this.\u{78} = 0;
    }

    doThing() {
        this.x = 42;
    }
}

//// [IdentifierNameWithExtendedEscape2.ts]
export class IdentifierNameWithExtendedEscape2 {
    x\u{78}: number;

    constructor() {
        this.x\u{78} = 0;
    }

    doThing() {
        this.xx = 42;
    }
}

//// [IdentifierNameWithExtendedEscape3.ts]
export class IdentifierNameWithExtendedEscape3 {
    a\u{62}c\u{64}e: number;

    constructor() {
        this.a\u{62}c\u{64}e = 0;
    }

    doThing() {
        this.abcde = 42;
    }
}

//// [PrivateIdentifierNameWithEscape1.ts]
export class PrivateIdentifierWithEscape1 {
    #\u0078: number;

    constructor() {
        this.#\u0078 = 0;
    }

    doThing() {
        this.#x = 42;
    }
}

//// [PrivateIdentifierNameWithEscape2.ts]
export class PrivateIdentifierWithEscape2 {
    #x\u0078: number;

    constructor() {
        this.#x\u0078 = 0;
    }

    doThing() {
        this.#xx = 42;
    }
}

//// [PrivateIdentifierNameWithEscape3.ts]
export class PrivateIdentifierWithEscape3 {
    #a\u0062c\u0064e: number;

    constructor() {
        this.#a\u0062c\u0064e = 0;
    }

    doThing() {
        this.#abcde = 42;
    }
}

//// [PrivateIdentifierNameWithExtendedEscape1.ts]
export class PrivateIdentifierWithExtendedEscape1 {
    #\u{78}: number;

    constructor() {
        this.#\u{78} = 0;
    }

    doThing() {
        this.#x = 42;
    }
}

//// [PrivateIdentifierNameWithExtendedEscape2.ts]
export class PrivateIdentifierWithExtendedEscape2 {
    #x\u{78}: number;

    constructor() {
        this.#x\u{78} = 0;
    }

    doThing() {
        this.#xx = 42;
    }
}

//// [PrivateIdentifierNameWithExtendedEscape3.ts]
export class PrivateIdentifierWithExtendedEscape3 {
    #a\u{62}c\u{64}e: number;

    constructor() {
        this.#a\u{62}c\u{64}e = 0;
    }

    doThing() {
        this.#abcde = 42;
    }
}


//// [identifierVariableWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.\u0078 = 10;
exports.x++;
//# sourceMappingURL=identifierVariableWithEscape1.js.map
//// [identifierVariableWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xx = void 0;
exports.x\u0078 = 10;
exports.xx++;
//# sourceMappingURL=identifierVariableWithEscape2.js.map
//// [identifierVariableWithEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abcde = void 0;
exports.a\u0062c\u0064e = 10;
exports.abcde++;
//# sourceMappingURL=identifierVariableWithEscape3.js.map
//// [identifierVariableWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;
exports.x++;
//# sourceMappingURL=identifierVariableWithExtendedEscape1.js.map
//// [identifierVariableWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xx = void 0;
exports.xx = 10;
exports.xx++;
//# sourceMappingURL=identifierVariableWithExtendedEscape2.js.map
//// [identifierVariableWithExtendedEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abcde = void 0;
exports.abcde = 10;
exports.abcde++;
//# sourceMappingURL=identifierVariableWithExtendedEscape3.js.map
//// [IdentifierNameWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithEscape1 = void 0;
var IdentifierNameWithEscape1 = /** @class */ (function () {
    function IdentifierNameWithEscape1() {
        this.\u0078 = 0;
    }
    IdentifierNameWithEscape1.prototype.doThing = function () {
        this.x = 42;
    };
    return IdentifierNameWithEscape1;
}());
exports.IdentifierNameWithEscape1 = IdentifierNameWithEscape1;
//# sourceMappingURL=IdentifierNameWithEscape1.js.map
//// [IdentifierNameWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithEscape2 = void 0;
var IdentifierNameWithEscape2 = /** @class */ (function () {
    function IdentifierNameWithEscape2() {
        this.x\u0078 = 0;
    }
    IdentifierNameWithEscape2.prototype.doThing = function () {
        this.xx = 42;
    };
    return IdentifierNameWithEscape2;
}());
exports.IdentifierNameWithEscape2 = IdentifierNameWithEscape2;
//# sourceMappingURL=IdentifierNameWithEscape2.js.map
//// [IdentifierNameWithEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithEscape3 = void 0;
var IdentifierNameWithEscape3 = /** @class */ (function () {
    function IdentifierNameWithEscape3() {
        this.a\u0062c\u0064e = 0;
    }
    IdentifierNameWithEscape3.prototype.doThing = function () {
        this.abcde = 42;
    };
    return IdentifierNameWithEscape3;
}());
exports.IdentifierNameWithEscape3 = IdentifierNameWithEscape3;
//# sourceMappingURL=IdentifierNameWithEscape3.js.map
//// [IdentifierNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape1 = void 0;
var IdentifierNameWithExtendedEscape1 = /** @class */ (function () {
    function IdentifierNameWithExtendedEscape1() {
        this.x = 0;
    }
    IdentifierNameWithExtendedEscape1.prototype.doThing = function () {
        this.x = 42;
    };
    return IdentifierNameWithExtendedEscape1;
}());
exports.IdentifierNameWithExtendedEscape1 = IdentifierNameWithExtendedEscape1;
//# sourceMappingURL=IdentifierNameWithExtendedEscape1.js.map
//// [IdentifierNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape2 = void 0;
var IdentifierNameWithExtendedEscape2 = /** @class */ (function () {
    function IdentifierNameWithExtendedEscape2() {
        this.xx = 0;
    }
    IdentifierNameWithExtendedEscape2.prototype.doThing = function () {
        this.xx = 42;
    };
    return IdentifierNameWithExtendedEscape2;
}());
exports.IdentifierNameWithExtendedEscape2 = IdentifierNameWithExtendedEscape2;
//# sourceMappingURL=IdentifierNameWithExtendedEscape2.js.map
//// [IdentifierNameWithExtendedEscape3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape3 = void 0;
var IdentifierNameWithExtendedEscape3 = /** @class */ (function () {
    function IdentifierNameWithExtendedEscape3() {
        this.abcde = 0;
    }
    IdentifierNameWithExtendedEscape3.prototype.doThing = function () {
        this.abcde = 42;
    };
    return IdentifierNameWithExtendedEscape3;
}());
exports.IdentifierNameWithExtendedEscape3 = IdentifierNameWithExtendedEscape3;
//# sourceMappingURL=IdentifierNameWithExtendedEscape3.js.map
//// [PrivateIdentifierNameWithEscape1.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape1_x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithEscape1 = void 0;
var PrivateIdentifierWithEscape1 = /** @class */ (function () {
    function PrivateIdentifierWithEscape1() {
        _PrivateIdentifierWithEscape1_x.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape1_x, 0, "f");
    }
    PrivateIdentifierWithEscape1.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape1_x, 42, "f");
    };
    return PrivateIdentifierWithEscape1;
}());
exports.PrivateIdentifierWithEscape1 = PrivateIdentifierWithEscape1;
_PrivateIdentifierWithEscape1_x = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithEscape1.js.map
//// [PrivateIdentifierNameWithEscape2.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape2_xx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithEscape2 = void 0;
var PrivateIdentifierWithEscape2 = /** @class */ (function () {
    function PrivateIdentifierWithEscape2() {
        _PrivateIdentifierWithEscape2_xx.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape2_xx, 0, "f");
    }
    PrivateIdentifierWithEscape2.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape2_xx, 42, "f");
    };
    return PrivateIdentifierWithEscape2;
}());
exports.PrivateIdentifierWithEscape2 = PrivateIdentifierWithEscape2;
_PrivateIdentifierWithEscape2_xx = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithEscape2.js.map
//// [PrivateIdentifierNameWithEscape3.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape3_abcde;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithEscape3 = void 0;
var PrivateIdentifierWithEscape3 = /** @class */ (function () {
    function PrivateIdentifierWithEscape3() {
        _PrivateIdentifierWithEscape3_abcde.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape3_abcde, 0, "f");
    }
    PrivateIdentifierWithEscape3.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape3_abcde, 42, "f");
    };
    return PrivateIdentifierWithEscape3;
}());
exports.PrivateIdentifierWithEscape3 = PrivateIdentifierWithEscape3;
_PrivateIdentifierWithEscape3_abcde = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithEscape3.js.map
//// [PrivateIdentifierNameWithExtendedEscape1.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape1_x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape1 = void 0;
var PrivateIdentifierWithExtendedEscape1 = /** @class */ (function () {
    function PrivateIdentifierWithExtendedEscape1() {
        _PrivateIdentifierWithExtendedEscape1_x.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape1_x, 0, "f");
    }
    PrivateIdentifierWithExtendedEscape1.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape1_x, 42, "f");
    };
    return PrivateIdentifierWithExtendedEscape1;
}());
exports.PrivateIdentifierWithExtendedEscape1 = PrivateIdentifierWithExtendedEscape1;
_PrivateIdentifierWithExtendedEscape1_x = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape1.js.map
//// [PrivateIdentifierNameWithExtendedEscape2.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape2_xx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape2 = void 0;
var PrivateIdentifierWithExtendedEscape2 = /** @class */ (function () {
    function PrivateIdentifierWithExtendedEscape2() {
        _PrivateIdentifierWithExtendedEscape2_xx.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape2_xx, 0, "f");
    }
    PrivateIdentifierWithExtendedEscape2.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape2_xx, 42, "f");
    };
    return PrivateIdentifierWithExtendedEscape2;
}());
exports.PrivateIdentifierWithExtendedEscape2 = PrivateIdentifierWithExtendedEscape2;
_PrivateIdentifierWithExtendedEscape2_xx = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape2.js.map
//// [PrivateIdentifierNameWithExtendedEscape3.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape3_abcde;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape3 = void 0;
var PrivateIdentifierWithExtendedEscape3 = /** @class */ (function () {
    function PrivateIdentifierWithExtendedEscape3() {
        _PrivateIdentifierWithExtendedEscape3_abcde.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape3_abcde, 0, "f");
    }
    PrivateIdentifierWithExtendedEscape3.prototype.doThing = function () {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape3_abcde, 42, "f");
    };
    return PrivateIdentifierWithExtendedEscape3;
}());
exports.PrivateIdentifierWithExtendedEscape3 = PrivateIdentifierWithExtendedEscape3;
_PrivateIdentifierWithExtendedEscape3_abcde = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape3.js.map
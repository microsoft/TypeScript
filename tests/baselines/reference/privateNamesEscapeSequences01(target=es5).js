//// [tests/cases/conformance/classes/members/privateNames/privateNamesEscapeSequences01.ts] ////

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
//// [IdentifierNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape1 = void 0;
var IdentifierNameWithExtendedEscape1 = /** @class */ (function () {
    function IdentifierNameWithExtendedEscape1() {
    }
    return IdentifierNameWithExtendedEscape1;
}());
exports.IdentifierNameWithExtendedEscape1 = IdentifierNameWithExtendedEscape1;
{
    78;
}
number;
constructor();
{
    this.;
    u;
    {
        78;
    }
    0;
}
doThing();
{
    this.x = 42;
}
//// [IdentifierNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape2 = void 0;
var IdentifierNameWithExtendedEscape2 = /** @class */ (function () {
    function IdentifierNameWithExtendedEscape2() {
    }
    return IdentifierNameWithExtendedEscape2;
}());
exports.IdentifierNameWithExtendedEscape2 = IdentifierNameWithExtendedEscape2;
{
    78;
}
number;
constructor();
{
    this.x;
    u;
    {
        78;
    }
    0;
}
doThing();
{
    this.xx = 42;
}
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
//// [PrivateIdentifierNameWithExtendedEscape1.js]
"use strict";
var _PrivateIdentifierWithExtendedEscape1_;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape1 = void 0;
var PrivateIdentifierWithExtendedEscape1 = /** @class */ (function () {
    function PrivateIdentifierWithExtendedEscape1() {
        _PrivateIdentifierWithExtendedEscape1_.set(this, void 0);
    }
    return PrivateIdentifierWithExtendedEscape1;
}());
exports.PrivateIdentifierWithExtendedEscape1 = PrivateIdentifierWithExtendedEscape1;
_PrivateIdentifierWithExtendedEscape1_ = new WeakMap();
{
    78;
}
number;
constructor();
{
    this.;
    u;
    {
        78;
    }
    0;
}
doThing();
{
    this. = 42;
}
//// [PrivateIdentifierNameWithExtendedEscape2.js]
"use strict";
var _PrivateIdentifierWithExtendedEscape2_x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape2 = void 0;
var PrivateIdentifierWithExtendedEscape2 = /** @class */ (function () {
    function PrivateIdentifierWithExtendedEscape2() {
        _PrivateIdentifierWithExtendedEscape2_x.set(this, void 0);
    }
    return PrivateIdentifierWithExtendedEscape2;
}());
exports.PrivateIdentifierWithExtendedEscape2 = PrivateIdentifierWithExtendedEscape2;
_PrivateIdentifierWithExtendedEscape2_x = new WeakMap();
{
    78;
}
number;
constructor();
{
    this.;
    u;
    {
        78;
    }
    0;
}
doThing();
{
    this. = 42;
}

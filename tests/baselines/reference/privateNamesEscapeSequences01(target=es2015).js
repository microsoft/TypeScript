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
export class IdentifierNameWithEscape1 {
    constructor() {
        this.\u0078 = 0;
    }
    doThing() {
        this.x = 42;
    }
}
//// [IdentifierNameWithEscape2.js]
export class IdentifierNameWithEscape2 {
    constructor() {
        this.x\u0078 = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
//// [IdentifierNameWithExtendedEscape1.js]
export class IdentifierNameWithExtendedEscape1 {
    constructor() {
        this.\u{78} = 0;
    }
    doThing() {
        this.x = 42;
    }
}
//// [IdentifierNameWithExtendedEscape2.js]
export class IdentifierNameWithExtendedEscape2 {
    constructor() {
        this.x\u{78} = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
//// [PrivateIdentifierNameWithEscape1.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape1_x;
export class PrivateIdentifierWithEscape1 {
    constructor() {
        _PrivateIdentifierWithEscape1_x.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape1_x, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape1_x, 42, "f");
    }
}
_PrivateIdentifierWithEscape1_x = new WeakMap();
//// [PrivateIdentifierNameWithEscape2.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape2_xx;
export class PrivateIdentifierWithEscape2 {
    constructor() {
        _PrivateIdentifierWithEscape2_xx.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape2_xx, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape2_xx, 42, "f");
    }
}
_PrivateIdentifierWithEscape2_xx = new WeakMap();
//// [PrivateIdentifierNameWithExtendedEscape1.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape1_x;
export class PrivateIdentifierWithExtendedEscape1 {
    constructor() {
        _PrivateIdentifierWithExtendedEscape1_x.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape1_x, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape1_x, 42, "f");
    }
}
_PrivateIdentifierWithExtendedEscape1_x = new WeakMap();
//// [PrivateIdentifierNameWithExtendedEscape2.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape2_xx;
export class PrivateIdentifierWithExtendedEscape2 {
    constructor() {
        _PrivateIdentifierWithExtendedEscape2_xx.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape2_xx, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape2_xx, 42, "f");
    }
}
_PrivateIdentifierWithExtendedEscape2_xx = new WeakMap();

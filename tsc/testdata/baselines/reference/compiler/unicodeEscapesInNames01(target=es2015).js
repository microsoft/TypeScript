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
export let \u0078 = 10;
x++;
//# sourceMappingURL=identifierVariableWithEscape1.js.map
//// [identifierVariableWithEscape2.js]
export let x\u0078 = 10;
xx++;
//# sourceMappingURL=identifierVariableWithEscape2.js.map
//// [identifierVariableWithEscape3.js]
export let a\u0062c\u0064e = 10;
abcde++;
//# sourceMappingURL=identifierVariableWithEscape3.js.map
//// [identifierVariableWithExtendedEscape1.js]
export let \u{78} = 10;
x++;
//# sourceMappingURL=identifierVariableWithExtendedEscape1.js.map
//// [identifierVariableWithExtendedEscape2.js]
export let x\u{78} = 10;
xx++;
//# sourceMappingURL=identifierVariableWithExtendedEscape2.js.map
//// [identifierVariableWithExtendedEscape3.js]
export let a\u{62}c\u{64}e = 10;
abcde++;
//# sourceMappingURL=identifierVariableWithExtendedEscape3.js.map
//// [IdentifierNameWithEscape1.js]
export class IdentifierNameWithEscape1 {
    constructor() {
        this.\u0078 = 0;
    }
    doThing() {
        this.x = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithEscape1.js.map
//// [IdentifierNameWithEscape2.js]
export class IdentifierNameWithEscape2 {
    constructor() {
        this.x\u0078 = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithEscape2.js.map
//// [IdentifierNameWithEscape3.js]
export class IdentifierNameWithEscape3 {
    constructor() {
        this.a\u0062c\u0064e = 0;
    }
    doThing() {
        this.abcde = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithEscape3.js.map
//// [IdentifierNameWithExtendedEscape1.js]
export class IdentifierNameWithExtendedEscape1 {
    constructor() {
        this.\u{78} = 0;
    }
    doThing() {
        this.x = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithExtendedEscape1.js.map
//// [IdentifierNameWithExtendedEscape2.js]
export class IdentifierNameWithExtendedEscape2 {
    constructor() {
        this.x\u{78} = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithExtendedEscape2.js.map
//// [IdentifierNameWithExtendedEscape3.js]
export class IdentifierNameWithExtendedEscape3 {
    constructor() {
        this.a\u{62}c\u{64}e = 0;
    }
    doThing() {
        this.abcde = 42;
    }
}
//# sourceMappingURL=IdentifierNameWithExtendedEscape3.js.map
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
//# sourceMappingURL=PrivateIdentifierNameWithEscape1.js.map
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
//# sourceMappingURL=PrivateIdentifierNameWithEscape2.js.map
//// [PrivateIdentifierNameWithEscape3.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithEscape3_abcde;
export class PrivateIdentifierWithEscape3 {
    constructor() {
        _PrivateIdentifierWithEscape3_abcde.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape3_abcde, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithEscape3_abcde, 42, "f");
    }
}
_PrivateIdentifierWithEscape3_abcde = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithEscape3.js.map
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
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape1.js.map
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
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape2.js.map
//// [PrivateIdentifierNameWithExtendedEscape3.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrivateIdentifierWithExtendedEscape3_abcde;
export class PrivateIdentifierWithExtendedEscape3 {
    constructor() {
        _PrivateIdentifierWithExtendedEscape3_abcde.set(this, void 0);
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape3_abcde, 0, "f");
    }
    doThing() {
        __classPrivateFieldSet(this, _PrivateIdentifierWithExtendedEscape3_abcde, 42, "f");
    }
}
_PrivateIdentifierWithExtendedEscape3_abcde = new WeakMap();
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape3.js.map
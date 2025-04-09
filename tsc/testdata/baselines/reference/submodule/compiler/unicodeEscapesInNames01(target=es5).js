//// [tests/cases/compiler/unicodeEscapesInNames01.ts] ////

//// [identifierVariableWithEscape1.ts]
export let \u0078 = 10;
x++;

//// [identifierVariableWithEscape2.ts]
export let x\u0078 = 10;
xx++;

//// [identifierVariableWithExtendedEscape1.ts]
export let \u{78} = 10;
x++;

//// [identifierVariableWithExtendedEscape2.ts]
export let x\u{78} = 10;
xx++;

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


//// [identifierVariableWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;
exports.x++;
//# sourceMappingURL=identifierVariableWithEscape1.js.map
//// [identifierVariableWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xx = void 0;
exports.xx = 10;
exports.xx++;
//# sourceMappingURL=identifierVariableWithEscape2.js.map
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
//// [IdentifierNameWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithEscape1 = void 0;
class IdentifierNameWithEscape1 {
    \u0078;
    constructor() {
        this.\u0078 = 0;
    }
    doThing() {
        this.x = 42;
    }
}
exports.IdentifierNameWithEscape1 = IdentifierNameWithEscape1;
//# sourceMappingURL=IdentifierNameWithEscape1.js.map
//// [IdentifierNameWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithEscape2 = void 0;
class IdentifierNameWithEscape2 {
    x\u0078;
    constructor() {
        this.x\u0078 = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
exports.IdentifierNameWithEscape2 = IdentifierNameWithEscape2;
//# sourceMappingURL=IdentifierNameWithEscape2.js.map
//// [IdentifierNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape1 = void 0;
class IdentifierNameWithExtendedEscape1 {
    \u{78};
    constructor() {
        this.\u{78} = 0;
    }
    doThing() {
        this.x = 42;
    }
}
exports.IdentifierNameWithExtendedEscape1 = IdentifierNameWithExtendedEscape1;
//# sourceMappingURL=IdentifierNameWithExtendedEscape1.js.map
//// [IdentifierNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierNameWithExtendedEscape2 = void 0;
class IdentifierNameWithExtendedEscape2 {
    x\u{78};
    constructor() {
        this.x\u{78} = 0;
    }
    doThing() {
        this.xx = 42;
    }
}
exports.IdentifierNameWithExtendedEscape2 = IdentifierNameWithExtendedEscape2;
//# sourceMappingURL=IdentifierNameWithExtendedEscape2.js.map
//// [PrivateIdentifierNameWithEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithEscape1 = void 0;
class PrivateIdentifierWithEscape1 {
    #\u0078;
    constructor() {
        this.#\u0078 = 0;
    }
    doThing() {
        this.#x = 42;
    }
}
exports.PrivateIdentifierWithEscape1 = PrivateIdentifierWithEscape1;
//# sourceMappingURL=PrivateIdentifierNameWithEscape1.js.map
//// [PrivateIdentifierNameWithEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithEscape2 = void 0;
class PrivateIdentifierWithEscape2 {
    #x\u0078;
    constructor() {
        this.#x\u0078 = 0;
    }
    doThing() {
        this.#xx = 42;
    }
}
exports.PrivateIdentifierWithEscape2 = PrivateIdentifierWithEscape2;
//# sourceMappingURL=PrivateIdentifierNameWithEscape2.js.map
//// [PrivateIdentifierNameWithExtendedEscape1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape1 = void 0;
class PrivateIdentifierWithExtendedEscape1 {
    #\u{78};
    constructor() {
        this.#\u{78} = 0;
    }
    doThing() {
        this.#x = 42;
    }
}
exports.PrivateIdentifierWithExtendedEscape1 = PrivateIdentifierWithExtendedEscape1;
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape1.js.map
//// [PrivateIdentifierNameWithExtendedEscape2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateIdentifierWithExtendedEscape2 = void 0;
class PrivateIdentifierWithExtendedEscape2 {
    #x\u{78};
    constructor() {
        this.#x\u{78} = 0;
    }
    doThing() {
        this.#xx = 42;
    }
}
exports.PrivateIdentifierWithExtendedEscape2 = PrivateIdentifierWithExtendedEscape2;
//# sourceMappingURL=PrivateIdentifierNameWithExtendedEscape2.js.map
//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsSubclassWithExplicitNoArgumentConstructor.ts] ////

//// [index.js]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg, secondArg) { }
}

export class Sub extends Super {
    constructor() {
        super('first', 'second');
    }
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = exports.Super = void 0;
class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg, secondArg) { }
}
exports.Super = Super;
class Sub extends Super {
    constructor() {
        super('first', 'second');
    }
}
exports.Sub = Sub;


//// [index.d.ts]
export declare class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg: string, secondArg: string);
}
export declare class Sub extends Super {
    constructor();
}

//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassAccessor.ts] ////

//// [supplement.d.ts]
export { };
declare module "./argument.js" {
    interface Argument {
        idlType: any;
        default: null;
    }
}
//// [base.js]
export class Base {
    constructor() { }

    toJSON() {
        const json = { type: undefined, name: undefined, inheritance: undefined };
        return json;
    }
}
//// [argument.js]
import { Base } from "./base.js";
export class Argument extends Base {
    /**
     * @param {*} tokeniser
     */
    static parse(tokeniser) {
        return;
    }

    get type() {
        return "argument";
    }

    /**
     * @param {*} defs
     */
    *validate(defs) { }
}

//// [base.js]
export class Base {
    constructor() { }
    toJSON() {
        const json = { type: undefined, name: undefined, inheritance: undefined };
        return json;
    }
}
//// [argument.js]
import { Base } from "./base.js";
export class Argument extends Base {
    /**
     * @param {*} tokeniser
     */
    static parse(tokeniser) {
        return;
    }
    get type() {
        return "argument";
    }
    /**
     * @param {*} defs
     */
    *validate(defs) { }
}


//// [base.d.ts]
export class Base {
    toJSON(): {
        type: any;
        name: any;
        inheritance: any;
    };
}
//// [argument.d.ts]
export class Argument extends Base {
    /**
     * @param {*} tokeniser
     */
    static parse(tokeniser: any): void;
    get type(): string;
    /**
     * @param {*} defs
     */
    validate(defs: any): Generator<never, void, unknown>;
    idlType: any;
    default: null;
}
import { Base } from "./base.js";

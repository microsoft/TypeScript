// @allowJs: true
// @checkJs: true
// @target: es2019
// @outDir: ./out
// @declaration: true
// @filename: supplement.d.ts
export { };
declare module "./argument.js" {
    interface Argument {
        idlType: any;
        default: null;
    }
}
// @filename: base.js
export class Base {
    constructor() { }

    toJSON() {
        const json = { type: undefined, name: undefined, inheritance: undefined };
        return json;
    }
}
// @filename: argument.js
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
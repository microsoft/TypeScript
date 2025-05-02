//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassExpressionAnonymous.ts] ////

//// [index.js]
module.exports = class {
    /**
     * @param {number} p
     */
    constructor(p) {
        this.t = 12 + p;
    }
}

//// [index.js]
module.exports = /** @class */ (function () {
    /**
     * @param {number} p
     */
    function exports(p) {
        this.t = 12 + p;
    }
    return exports;
}());


//// [index.d.ts]
export = exports;
declare class exports {
    /**
     * @param {number} p
     */
    constructor(p: number);
    t: number;
}

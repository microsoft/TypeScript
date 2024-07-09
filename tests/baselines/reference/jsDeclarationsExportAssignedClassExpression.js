//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassExpression.ts] ////

//// [index.js]
module.exports = class Thing {
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
    function Thing(p) {
        this.t = 12 + p;
    }
    return Thing;
}());


//// [index.d.ts]
export = Thing;
declare class Thing {
    /**
     * @param {number} p
     */
    constructor(p: number);
    t: number;
}

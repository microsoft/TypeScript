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
module.exports = class Thing {
    /**
     * @param {number} p
     */
    constructor(p) {
        this.t = 12 + p;
    }
};


//// [index.d.ts]
declare const _default: {
    new (p: number): {
        t: number;
    };
};
export = _default;

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
    new (p: number): import(".");
};
export = _default;


//// [DtsFileErrors]


out/index.d.ts(2,22): error TS1340: Module '.' does not refer to a type, but is used as a type here. Did you mean 'typeof import('.')'?


==== out/index.d.ts (1 errors) ====
    declare const _default: {
        new (p: number): import(".");
                         ~~~~~~~~~~~
!!! error TS1340: Module '.' does not refer to a type, but is used as a type here. Did you mean 'typeof import('.')'?
    };
    export = _default;
    
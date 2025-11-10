//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassExpressionAnonymousWithSub.ts] ////

//// [index.js]
module.exports = class {
    /**
     * @param {number} p
     */
    constructor(p) {
        this.t = 12 + p;
    }
}
module.exports.Sub = class {
    constructor() {
        this.instance = new module.exports(10);
    }
}


//// [index.js]
module.exports = class {
    /**
     * @param {number} p
     */
    constructor(p) {
        this.t = 12 + p;
    }
};
export var Sub = class {
    constructor() {
        this.instance = new module.exports(10);
    }
};
module.exports.Sub = class {
    constructor() {
        this.instance = new module.exports(10);
    }
};


//// [index.d.ts]
declare const _default: {
    new (p: number): {
        t: number;
    };
};
export = _default;
export declare var Sub: {
    new (): {
        instance: {
            t: number;
        };
    };
};

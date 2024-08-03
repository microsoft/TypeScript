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
module.exports = /** @class */ (function () {
    /**
     * @param {number} p
     */
    function exports(p) {
        this.t = 12 + p;
    }
    return exports;
}());
module.exports.Sub = /** @class */ (function () {
    function Sub() {
        this.instance = new module.exports(10);
    }
    return Sub;
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
declare namespace exports {
    export { Sub };
}
declare class Sub {
    instance: import("index");
}


//// [DtsFileErrors]


out/index.d.ts(13,22): error TS2307: Cannot find module 'index' or its corresponding type declarations.


==== out/index.d.ts (1 errors) ====
    export = exports;
    declare class exports {
        /**
         * @param {number} p
         */
        constructor(p: number);
        t: number;
    }
    declare namespace exports {
        export { Sub };
    }
    declare class Sub {
        instance: import("index");
                         ~~~~~~~
!!! error TS2307: Cannot find module 'index' or its corresponding type declarations.
    }
    
//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedConstructorFunctionWithSub.ts] ////

//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.js]
/**
 * @param {number} p
 */
module.exports = function (p) {
    this.t = 12 + p;
}
module.exports.Sub = function() {
    this.instance = new module.exports(10);
}
module.exports.Sub.prototype = { }


//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.js]
/**
 * @param {number} p
 */
module.exports = function (p) {
    this.t = 12 + p;
};
module.exports.Sub = function () {
    this.instance = new module.exports(10);
};
module.exports.Sub.prototype = {};


//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.d.ts]
declare const _exports: {
    (p: number): void;
    new (p: number): exports;
    Sub: typeof Sub;
};
export = _exports;


//// [DtsFileErrors]


out/jsDeclarationsExportAssignedConstructorFunctionWithSub.d.ts(3,22): error TS2304: Cannot find name 'exports'.
out/jsDeclarationsExportAssignedConstructorFunctionWithSub.d.ts(4,17): error TS2304: Cannot find name 'Sub'.


==== out/jsDeclarationsExportAssignedConstructorFunctionWithSub.d.ts (2 errors) ====
    declare const _exports: {
        (p: number): void;
        new (p: number): exports;
                         ~~~~~~~
!!! error TS2304: Cannot find name 'exports'.
        Sub: typeof Sub;
                    ~~~
!!! error TS2304: Cannot find name 'Sub'.
    };
    export = _exports;
    
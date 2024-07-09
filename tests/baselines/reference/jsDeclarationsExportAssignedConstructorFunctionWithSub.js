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

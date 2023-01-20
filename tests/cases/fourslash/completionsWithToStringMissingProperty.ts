/// <reference path="fourslash.ts" />

// Repro of crash - #52334

// @allowJs: true
// @checkJs: true
// @strict: true
// @target: esnext

// @Filename: index.js
//// export var RxQueryBase = /*#__PURE__*/function () {
////     var _proto = RxQueryBase.prototype;
////     _proto.toString = function toString() {
////         var stringObj = sortObject({
////             op: /**/this.op,
////             query: this.mangoQuery,
////             other: this.other
////         }, true);
////         var value = JSON.stringify(stringObj, stringifyFilter);
////         this.toString = () => value;
////         return value;
////     }
//// }

verify.completions({
    marker: "",
    isNewIdentifierLocation: false,
});

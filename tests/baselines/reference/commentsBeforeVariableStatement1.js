//// [commentsBeforeVariableStatement1.ts]
/** b's comment*/
export var b: number;


//// [commentsBeforeVariableStatement1.js]
define(["require", "exports"], function(require, exports) {
    /** b's comment*/
    exports.b;
});

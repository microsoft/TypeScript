//// [tests/cases/compiler/commentsBeforeVariableStatement1.ts] ////

//// [commentsBeforeVariableStatement1.ts]
/** b's comment*/
export var b: number;


//// [commentsBeforeVariableStatement1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
});

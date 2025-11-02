//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignmentExpressionPlusSecondary.ts] ////

//// [index.js]
const Strings = {
    a: "A",
    b: "B"
};
module.exports = {
    thing: "ok",
    also: "ok",
    desc: {
        item: "ok"
    }
};
module.exports.Strings = Strings;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = {
    a: "A",
    b: "B"
};
module.exports = {
    thing: "ok",
    also: "ok",
    desc: {
        item: "ok"
    }
};
export var Strings = Strings;
module.exports.Strings = Strings;


//// [index.d.ts]
declare const _default: {
    thing: string;
    also: string;
    desc: {
        item: string;
    };
};
export = _default;
export declare var Strings: {
    a: string;
    b: string;
};

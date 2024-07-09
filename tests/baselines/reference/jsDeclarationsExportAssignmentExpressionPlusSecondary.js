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
var Strings = {
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


//// [index.d.ts]
export namespace Strings {
    let a: string;
    let b: string;
}
export declare let thing: string;
export declare let also: string;
export declare namespace desc {
    let item: string;
}

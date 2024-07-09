//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignmentWithKeywordName.ts] ////

//// [index.js]
var x = 12;
module.exports = {
    extends: 'base',
    more: {
        others: ['strs']
    },
    x
};

//// [index.js]
var x = 12;
module.exports = {
    extends: 'base',
    more: {
        others: ['strs']
    },
    x: x
};


//// [index.d.ts]
export var x: number;
declare let _extends: string;
export declare namespace more {
    let others: string[];
}
export { _extends as extends };

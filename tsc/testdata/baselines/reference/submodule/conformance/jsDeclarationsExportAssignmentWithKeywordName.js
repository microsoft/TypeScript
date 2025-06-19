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
    x
};


//// [index.d.ts]
declare const _default: {
    extends: string;
    more: {
        others: string[];
    };
    x: number;
};
export = _default;

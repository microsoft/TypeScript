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
declare const _exports: {
    extends: string;
    more: {
        others: string[];
    };
    x: number;
};
export = _exports;

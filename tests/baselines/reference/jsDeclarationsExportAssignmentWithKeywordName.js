//// [index.js]
module.exports = {
    extends: 'base',
    more: {
        others: ['strs']
    }
};

//// [index.js]
module.exports = {
    extends: 'base',
    more: {
        others: ['strs']
    }
};


//// [index.d.ts]
declare const _exports: {
    extends: string;
    more: {
        others: string[];
    };
};
export = _exports;

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
declare const _extends: string;
export declare namespace more {
    const others: string[];
}
export { _extends as extends };

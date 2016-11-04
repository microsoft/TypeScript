//// [objectSpreadIndexSignature.ts]
interface Indexed {
    [n: string]: number;
    a: number;
}
interface Indexed2 {
    [n: string]: boolean;
    c: boolean;
}
let indexed: Indexed;
let indexed2: Indexed2;
let i = { ...indexed, b: 11 };
// only indexed has indexer, so i[101]: any
i[101];
let ii = { ...indexed, ...indexed2 };
// both have indexer, so i[1001]: number | boolean
ii[1001];


//// [objectSpreadIndexSignature.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var indexed;
var indexed2;
var i = __assign({}, indexed, { b: 11 });
// only indexed has indexer, so i[101]: any
i[101];
var ii = __assign({}, indexed, indexed2);
// both have indexer, so i[1001]: number | boolean
ii[1001];

//// [exportDefaultParenthesize.ts]
export default {
    ['foo']: 42
};

//// [exportDefaultParenthesize.js]
export default (_a = {},
    _a['foo'] = 42,
    _a);
var _a;

//// [tests/cases/compiler/exportDefaultParenthesize.ts] ////

//// [commalist.ts]
export default {
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
    ['foo'+'']: 42,
};

//// [comma.ts]
export default {
    ['foo']: 42
};

//// [functionexpression.ts]
export default () => 42;


//// [commalist.js]
export default (_a = {},
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a['foo' + ''] = 42,
    _a);
var _a;
//// [comma.js]
export default (_a = {},
    _a['foo'] = 42,
    _a);
var _a;
//// [functionexpression.js]
export default (function () { return 42; });

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
var _a;
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
//// [comma.js]
var _a;
export default (_a = {},
    _a['foo'] = 42,
    _a);
//// [functionexpression.js]
export default (function () { return 42; });

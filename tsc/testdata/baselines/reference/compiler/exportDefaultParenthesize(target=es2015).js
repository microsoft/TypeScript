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
export default {
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
    ['foo' + '']: 42,
};
//// [comma.js]
export default {
    ['foo']: 42
};
//// [functionexpression.js]
export default () => 42;

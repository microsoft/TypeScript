process.nextTick(function () {
    t.equal(Buffer('abc').toString('base64'), 'YWJj');
    t.equal(Buffer([98,99,100]).toString(), 'bcd');
});

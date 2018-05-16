process.nextTick(function () {
    t.equal(__filename, '/foo/index.js');
    t.equal(__dirname, '/foo');
});

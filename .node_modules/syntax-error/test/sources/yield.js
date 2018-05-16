function *foo () {
    yield 5
}

(function *() {
    console.log(foo().next().value)
})().next();

(function *() { })();

(function * () {
    yield yield 3
})();

//// [noErrorsInCallback.js]
var Bar = (function () {
    function Bar(foo) {
        this.foo = foo;
    }
    return Bar;
})();
var one = new Bar({});
[].forEach(function () {
    var two = new Bar({});
});

//// [reassignStaticProp.js]
var foo = (function () {
    function foo() {
    }
    foo.bar = 1;
    return foo;
})();

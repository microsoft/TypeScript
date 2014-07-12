//// [invokingNonGenericMethodWithTypeArguments1.js]
var Foo = (function () {
    function Foo() {
        this.foo();
    }
    return Foo;
})();

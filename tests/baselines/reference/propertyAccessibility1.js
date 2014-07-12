//// [propertyAccessibility1.js]
var Foo = (function () {
    function Foo() {
        this.privProp = 0;
    }
    return Foo;
})();
var f = new Foo();
f.privProp;

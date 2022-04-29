//// [propertyWrappedInTry.ts]
class Foo {

    try {

        public bar = someInitThatMightFail();

    } catch(e) {}



    public baz() {

        return this.bar; // doesn't get rewritten to Foo.bar.

    }

}



//// [propertyWrappedInTry.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
try {
    bar = someInitThatMightFail();
}
catch (e) { }
baz();
{
    return this.bar; // doesn't get rewritten to Foo.bar.
}

//// [tests/cases/compiler/propertyWrappedInTry.ts] ////

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
class Foo {
}
try {
    bar = someInitThatMightFail();
}
catch (e) { }
baz();
{
    return this.bar; // doesn't get rewritten to Foo.bar.
}

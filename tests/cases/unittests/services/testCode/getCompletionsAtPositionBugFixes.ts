module BugFixes {
    enum Foo {
        bar,
        baz
    }

    var f: Foo = Foo./*here*/;

    import foo f = Foo;
    foo./*here*/;
}

module BugFix2 {
    interface iFace { (event: string); }
    var foo: iFace = function (elem) { /*here*/ }
}

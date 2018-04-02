interface Foo {
    method();
}

interface Bar {
    somethingElse();
}

function f(x: Promise<Foo> & Bar) {
    x.method();
}

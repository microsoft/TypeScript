interface Foo {
    method();
}

interface Bar {
    method();
    somethingElse();
}

function f(x: Promise<Foo> | Promise<Bar>) {
    x.method();
}

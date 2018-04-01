//// [missingPropertyOfPromiseIntersection.ts]
interface Foo {
    method();
}

interface Bar {
    somethingElse();
}

function f(x: Promise<Foo> & Bar) {
    x.method();
}


//// [missingPropertyOfPromiseIntersection.js]
function f(x) {
    x.method();
}

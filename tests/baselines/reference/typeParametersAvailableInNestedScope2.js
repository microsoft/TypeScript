//// [typeParametersAvailableInNestedScope2.ts]
function foo<T, U>(x: T, y: U) {
    function bar<V>(z: V) {
        function baz<W>(a: W) {
            var c: T;
            var d: U;
            var e: V;
        }
    }
}

//// [typeParametersAvailableInNestedScope2.js]
function foo(x, y) {
    function bar(z) {
        function baz(a) {
            var c;
            var d;
            var e;
        }
    }
}

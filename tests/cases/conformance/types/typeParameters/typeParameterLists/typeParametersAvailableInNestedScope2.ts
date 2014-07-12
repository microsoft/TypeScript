function foo<T, U>(x: T, y: U) {
    function bar<V>(z: V) {
        function baz<W>(a: W) {
            var c: T;
            var d: U;
            var e: V;
        }
    }
}
// @declaration: true

function foo<T>(v: T) {
    function a<T>(a: T) { return a; }
    function b(): T { return v; }

    type Alias = T;
    function c<T>(v: T) {
        type Alias2 = T;
        function a<T>(a: T) { return a; }
        function b(): T { return v; }
        function c<T>(): [Alias, Alias2, T] { return null as any; }
        return { a, b, c };
    }

    return { a, b, c };
}

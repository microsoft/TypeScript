//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typeParametersAvailableInNestedScope3.ts] ////

//// [typeParametersAvailableInNestedScope3.ts]
function foo<T>(v: T) {
    function a<T>(a: T) { return a; }
    function b(): T { return v; }

    function c<T>(v: T) {
        function a<T>(a: T) { return a; }
        function b(): T { return v; }
        return { a, b };
    }

    return { a, b, c };
}


//// [typeParametersAvailableInNestedScope3.js]
function foo(v) {
    function a(a) { return a; }
    function b() { return v; }
    function c(v) {
        function a(a) { return a; }
        function b() { return v; }
        return { a, b };
    }
    return { a, b, c };
}

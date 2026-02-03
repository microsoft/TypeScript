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
        return { a: a, b: b };
    }
    return { a: a, b: b, c: c };
}


//// [typeParametersAvailableInNestedScope3.d.ts]
declare function foo<T>(v: T): {
    a: <T_1>(a: T_1) => T_1;
    b: () => T;
    c: <T_1>(v: T_1) => {
        a: <T_2>(a: T_2) => T_2;
        b: () => T_1;
    };
};

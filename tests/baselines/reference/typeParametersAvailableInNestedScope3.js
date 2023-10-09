//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typeParametersAvailableInNestedScope3.ts] ////

//// [typeParametersAvailableInNestedScope3.ts]
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


//// [typeParametersAvailableInNestedScope3.js]
function foo(v) {
    function a(a) { return a; }
    function b() { return v; }
    function c(v) {
        function a(a) { return a; }
        function b() { return v; }
        function c() { return null; }
        return { a: a, b: b, c: c };
    }
    return { a: a, b: b, c: c };
}


//// [typeParametersAvailableInNestedScope3.d.ts]
declare function foo<T>(v: T): {
    a: <T_1>(a: T_1) => T_1;
    b: () => T;
    c: <T_2>(v: T_2) => {
        a: <T_3>(a: T_3) => T_3;
        b: () => T_2;
        c: <T_4>() => [T, T_2, T_4];
    };
};

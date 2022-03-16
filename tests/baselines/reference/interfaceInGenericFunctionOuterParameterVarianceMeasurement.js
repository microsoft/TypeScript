//// [interfaceInGenericFunctionOuterParameterVarianceMeasurement.ts]
function f<T>() {
    interface A<U> {
        co: U;
        contra: (x: T) => unknown;
    }

    return (null as any as A<T>);
}

function g<T, TSub extends T>() {
    let a = f<T>();
    let b = f<TSub>();

    a = b;
    b = a;
}

//// [interfaceInGenericFunctionOuterParameterVarianceMeasurement.js]
"use strict";
function f() {
    return null;
}
function g() {
    var a = f();
    var b = f();
    a = b;
    b = a;
}

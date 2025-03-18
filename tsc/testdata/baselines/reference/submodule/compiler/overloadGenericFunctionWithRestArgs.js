//// [tests/cases/compiler/overloadGenericFunctionWithRestArgs.ts] ////

//// [overloadGenericFunctionWithRestArgs.ts]
class B<V>{
    private id: V;
}
class A<U>{
    GetEnumerator: () => B<U>;
}
function Choice<T>(...v_args: T[]): A<T>;
function Choice<T>(...v_args: T[]): A<T> {
    return new A<T>();
}

//// [overloadGenericFunctionWithRestArgs.js]
class B {
    id;
}
class A {
    GetEnumerator;
}
function Choice(...v_args) {
    return new A();
}

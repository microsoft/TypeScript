//// [tests/cases/compiler/functionOverloadsRecursiveGenericReturnType.ts] ////

//// [functionOverloadsRecursiveGenericReturnType.ts]
class B<V>{
    private id: V;
}

class A<U>{
    GetEnumerator: () => B<U>;
}

function Choice<T>(args: T[]): A<T>;
function Choice<T>(...v_args: T[]): A<T>;
function Choice<T>(...v_args: any[]): A<T>{
    return new A<T>();
}


//// [functionOverloadsRecursiveGenericReturnType.js]
class B {
}
class A {
}
function Choice(...v_args) {
    return new A();
}

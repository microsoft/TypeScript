// @strict: true
function f<T>() {
    type A<U> = {
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
// Repro for #27596

type MyMap<T> = {[P in keyof T]: T[keyof T]};
function foo<U>(arg: U): MyMap<U> {
    return arg;
}

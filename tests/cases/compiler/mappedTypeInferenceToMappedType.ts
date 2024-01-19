// @strict: true
// @noEmit: true

// #56133

declare class Base<T> {
    someProp: T;
    method<U extends unknown[]>(x: { [K in keyof U]: U[K] }): Base<U>;
}

declare class Derived<T> extends Base<T> {
    method<V extends unknown[]>(x: { [K in keyof V]: V[K] }): Base<V>;
}
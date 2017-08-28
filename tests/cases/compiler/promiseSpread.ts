interface Promise<T> {
    spread<U>(fulfilledHandler: (...values: T & any[]) => U | Promise<U>): Promise<U>;
    spread<U>(fulfilledHandler: (...values: [T]) => U | Promise<U>): Promise<U>;
}

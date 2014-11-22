interface Promise_<T> {
    then<U>(success?: (value: T) => U): Promise_<U>;
    then<U>(success?: (value: T) => Promise_<U>): Promise_<U>;
    value: T;
}

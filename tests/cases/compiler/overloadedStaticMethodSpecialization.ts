class A<T> {
    static B<S>(v: A<S>): A<S>;
    static B<S>(v: S): A<S>;
    static B<S>(v: any): A<S> {
        return null;
    }
}

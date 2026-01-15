class C<T extends C<T>> {
    foo<U extends C<C<T>>(x: U) {
        return null;
    }
}
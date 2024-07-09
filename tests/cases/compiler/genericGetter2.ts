class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A {
        return this.data;
    }
}
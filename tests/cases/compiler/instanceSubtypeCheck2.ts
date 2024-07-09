class C1<T> {
    x: C2<T>;
}

class C2<T> extends C1<T> {
    x: string
}
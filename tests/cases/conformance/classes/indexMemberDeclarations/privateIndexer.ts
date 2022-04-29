// private indexers not allowed

class C {
    private [x: string]: string;
}

class D {
    private [x: number]: string;
}

class E<T> {
    private [x: string]: T;
}
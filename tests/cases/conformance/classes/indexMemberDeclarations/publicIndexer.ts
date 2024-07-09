// public indexers not allowed

class C {
    public [x: string]: string;
}

class D {
    public [x: number]: string;
}

class E<T> {
    public [x: string]: T;
}
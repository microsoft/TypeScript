// merged interfaces behave as if all extends clauses from each declaration are merged together
// no errors expected

class C<T> {
    a: T;
}

class C2<T> {
    b: T;
}

class C3<T> {
    c: T;
}

class C4<T> {
    d: T;
}

interface A<T> extends C<string>, C3<string> {
    y: T;
}

interface A<T> extends C<string>, C4<string> {
    z: T;
}

class D implements A<boolean> {
    a: string;
    b: Date;
    c: string;
    d: string;
    y: boolean;
    z: boolean;
}
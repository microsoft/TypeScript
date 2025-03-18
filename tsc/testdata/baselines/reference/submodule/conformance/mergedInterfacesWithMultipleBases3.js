//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithMultipleBases3.ts] ////

//// [mergedInterfacesWithMultipleBases3.ts]
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

//// [mergedInterfacesWithMultipleBases3.js]
class C {
    a;
}
class C2 {
    b;
}
class C3 {
    c;
}
class C4 {
    d;
}
class D {
    a;
    b;
    c;
    d;
    y;
    z;
}

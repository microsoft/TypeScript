//// [tests/cases/conformance/classes/indexMemberDeclarations/staticIndexers.ts] ////

//// [staticIndexers.ts]
// static indexers not allowed

class C {
    static [x: string]: string;
}

class D {
    static [x: number]: string;
}

class E<T> {
    static [x: string]: T;
}

//// [staticIndexers.js]
class C {
}
class D {
}
class E {
}

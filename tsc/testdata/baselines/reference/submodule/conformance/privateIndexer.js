//// [tests/cases/conformance/classes/indexMemberDeclarations/privateIndexer.ts] ////

//// [privateIndexer.ts]
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

//// [privateIndexer.js]
class C {
}
class D {
}
class E {
}

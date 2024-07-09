//// [tests/cases/conformance/override/override18.ts] ////

//// [override18.ts]
class A {
    foo?: string;
}

class B extends A {
    override foo = "string";
}


//// [override18.js]
class A {
    foo;
}
class B extends A {
    foo = "string";
}

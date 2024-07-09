// Binding for an import statement in a typeref position is being added to the global scope
// Shouldn't compile b.B is not defined in C
module A {
    import b = B;
    import c = C;
}

module B {
    import a = A;
    export class B { }
}

module C {
    import a = A;
    function hello(): b.B { return null; }
}
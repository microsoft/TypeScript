//// [tests/cases/compiler/staticMethodsReferencingClassTypeParameters.ts] ////

//// [staticMethodsReferencingClassTypeParameters.ts]
class C<T> {
    static s(p: T) { return p; }
}

//// [staticMethodsReferencingClassTypeParameters.js]
class C {
    static s(p) { return p; }
}

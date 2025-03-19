//// [tests/cases/conformance/types/typeRelationships/recursiveTypes/recursiveTypeInGenericConstraint.ts] ////

//// [recursiveTypeInGenericConstraint.ts]
class G<T> {
    x: G<G<T>>; // infinitely expanding type reference
}

class Foo<T extends G<T>> { // error, constraint referencing itself
    bar: T;
}

class D<T> {
    x: G<G<T>>; 
}

var c1 = new Foo<D<string>>(); // ok, circularity in assignment compat check causes success

//// [recursiveTypeInGenericConstraint.js]
class G {
    x; // infinitely expanding type reference
}
class Foo {
    bar;
}
class D {
    x;
}
var c1 = new Foo(); // ok, circularity in assignment compat check causes success

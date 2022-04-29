interface Object { }

class Foo<T, U extends T> { }
class Bar<T extends Object, U extends T> {
    data: Foo<Object, Object>; // Error 1 Type 'Object' does not satisfy the constraint 'T' for type parameter 'U extends T'.
}

var x: Foo< { a: string }, { a: string; b: number }>; // Error 2 Type '{ a: string; b: number; }' does not satisfy the constraint 'T' for type 

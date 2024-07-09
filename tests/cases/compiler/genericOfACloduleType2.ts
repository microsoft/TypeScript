class G<T>{ bar(x: T) { return x; } }
module M {
    export class C { foo() { } }
    export module C {
        export class X {
        }
    }

    var g1 = new G<C>();
    g1.bar(null).foo(); // no error
}

module N {
    var g2 = new G<M.C>()
}
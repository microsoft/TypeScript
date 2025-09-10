class G<T>{ bar(x: T) { return x; } }
namespace M {
    export class C { foo() { } }
    export namespace C {
        export class X {
        }
    }

    var g1 = new G<C>();
    g1.bar(null).foo(); // no error
}

namespace N {
    var g2 = new G<M.C>()
}
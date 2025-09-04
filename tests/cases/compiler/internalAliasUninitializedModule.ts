// @declaration: true
namespace a {
    export module b {
        export interface I {
            foo();
        }
    }
}

namespace c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}
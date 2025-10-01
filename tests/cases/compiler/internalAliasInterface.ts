// @declaration: true
namespace a {
    export interface I {
    }
}

namespace c {
    import b = a.I;
    export var x: b;
}

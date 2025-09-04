// @declaration: true
namespace a {
    export module b {
        export class c {
        }
    }
}

namespace c {
    import b = a.b;
    export var x: b.c = new b.c();
}
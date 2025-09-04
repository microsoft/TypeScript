// @declaration: true
namespace a {
    export class c {
    }
}

namespace c {
    import b = a.c;
    export var x: b = new b();
}
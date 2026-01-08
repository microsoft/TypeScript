// @declaration: true
namespace a {
    export var x = 10;
}

namespace c {
    import b = a.x;
    export var bVal = b;
}

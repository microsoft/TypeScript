// @target: es2015
// @strict: false
class C {
    set x(y) { }
    static set y(z) { }
}

namespace C {
    export var x = 1;
}
namespace C {
    export function x() { }
}
class C {
    get x() { return 1; }
    static get x() {
        return '';
    }
    static foo() { }
}

namespace C {
    export var x = 1;
}
namespace C {
    export function foo() { }
    export function x() { }
}
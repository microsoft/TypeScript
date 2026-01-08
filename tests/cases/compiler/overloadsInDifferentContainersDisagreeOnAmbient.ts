declare namespace M {
    // Error because body is not ambient and this overload is
    export function f();
}

namespace M {
    export function f() { }
}
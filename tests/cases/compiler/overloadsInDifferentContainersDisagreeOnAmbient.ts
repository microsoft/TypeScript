declare module M {
    // Error because body is not ambient and this overload is
    export function f();
}

module M {
    export function f() { }
}
// error
export function bar(func = () => foo) {
    let foo = "in";
}
// error
export function baz1(func = { f() { return foo } }) {
    let foo = "in";
}

// error
export function baz2(func = function () { return foo }) {
    let foo = "in";
}

// error
export function baz3(func = class { x = foo }) {
    let foo = "in";
}

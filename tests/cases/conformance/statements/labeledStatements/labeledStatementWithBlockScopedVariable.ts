// @target: es2015

// Labels should not conflict with block-scoped variables declared later.
// A label named `foo` is in a different namespace from a variable named `foo`.

// Label defined before let variable of the same name
foo: while (true) {
    break foo;
}
let foo = 1;

// Label defined before const variable of the same name
bar: for (;;) {
    continue bar;
}
const bar = 2;

// Nested labeled statement with same-name variable
outer: for (let i = 0; i < 1; i++) {
    inner: for (let j = 0; j < 1; j++) {
        break outer;
    }
}
let outer = "hello";
let inner = "world";

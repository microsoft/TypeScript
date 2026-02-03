//// [tests/cases/compiler/class2.ts] ////

//// [class2.ts]
class foo { constructor() { static f = 3; } }

//// [class2.js]
let foo = (() => {
    class foo {
        constructor() { }
    }
    foo.f = 3;
    return foo;
})();

// @target: ES6
function f() {
    var x=arguments[12];
    (() => arguments)();
}

(() => arguments)();

interface I {
    method(args: typeof arguments): void;
    fn: (args: typeof arguments) => void;
    (args: typeof arguments): void;
    new (args: typeof arguments): void;
    construct: new (args: typeof arguments) => void;
}
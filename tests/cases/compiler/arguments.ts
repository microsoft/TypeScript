function f() {
    var x=arguments[12];
}

interface I {
    method(args: typeof arguments): void;
    fn: (args: typeof arguments) => void;
    (args: typeof arguments): void;
    new (args: typeof arguments): void;
    construct: new (args: typeof arguments) => void;
}
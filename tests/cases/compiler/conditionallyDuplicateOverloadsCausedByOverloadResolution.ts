declare function foo(func: (x: string, y: string) => any): boolean;
declare function foo(func: (x: string, y: number) => any): string;

var out = foo((x, y) => {
    function bar(a: typeof x): void;
    function bar(b: typeof y): void;
    function bar() { }
    return bar;
});

declare function foo2(func: (x: string, y: string) => any): boolean;
declare function foo2(func: (x: string, y: number) => any): string;

var out2 = foo2((x, y) => {
    var bar: {
        (a: typeof x): void;
        (b: typeof y): void;
    };
    return bar;
});
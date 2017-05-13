function foo(f: (x: string) => string) {
    return f("");
}
var g = (x: string) => x + "blah";
var x = () => g;
foo(g);
foo(() => g);
foo(x);

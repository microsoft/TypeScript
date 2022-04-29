interface I {
    new (...args: any[]): string;
    new (): number;
}
var tag: I;
tag `Hello world!`;
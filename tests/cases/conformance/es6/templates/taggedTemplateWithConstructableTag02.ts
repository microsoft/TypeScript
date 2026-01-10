interface I {
    new (...args: any[]): string;
    new (): number;
}
declare var tag: I;
tag `Hello world!`;
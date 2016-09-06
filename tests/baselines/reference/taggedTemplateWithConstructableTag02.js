//// [taggedTemplateWithConstructableTag02.ts]
interface I {
    new (...args: any[]): string;
    new (): number;
}
var tag: I;
tag `Hello world!`;

//// [taggedTemplateWithConstructableTag02.js]
var tag;
(_a = ["Hello world!"], _a.raw = ["Hello world!"], tag(_a));
var _a;

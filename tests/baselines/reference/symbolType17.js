//// [symbolType17.ts]
interface Foo { prop }
var x: symbol | Foo;

x;
if (typeof x === "symbol") {
    x;
}
else {
    x;
}

//// [symbolType17.js]
var x;
x;
if (typeof x === "symbol") {
    x;
}
else {
    x;
}

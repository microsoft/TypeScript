//@target: ES6
interface Foo { prop }
var x: symbol | Foo;

x;
if (typeof x === "object") {
    x;
}
else {
    x;
}
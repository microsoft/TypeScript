//@target: ES6
interface Foo { prop }
var x: symbol | Foo;

x;
if (typeof x === "symbol") {
    x;
}
else {
    x;
}
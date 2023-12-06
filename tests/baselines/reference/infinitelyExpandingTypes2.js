//// [tests/cases/compiler/infinitelyExpandingTypes2.ts] ////

//// [infinitelyExpandingTypes2.ts]
interface Foo<T> {
    x: Foo<Foo<T>>;
} 

interface Bar<T> extends Foo<T> {
    y: string;
}

function f(p: Foo<number>) {
    console.log(p);
}

var v: Bar<number> = null;

f(v); // should not error


//// [infinitelyExpandingTypes2.js]
function f(p) {
    console.log(p);
}
var v = null;
f(v); // should not error

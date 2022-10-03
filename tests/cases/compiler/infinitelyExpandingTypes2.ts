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

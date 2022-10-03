interface Foo {
    (bar:number): string;
}

interface Bar extends Foo {
    (key: string): string;
}

var a: Bar;
var kitty = a(1);
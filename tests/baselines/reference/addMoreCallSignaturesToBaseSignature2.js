//// [addMoreCallSignaturesToBaseSignature2.ts]
interface Foo {
    (bar:number): string;
}

interface Bar extends Foo {
    (key: string): string;
}

var a: Bar;
var kitty = a(1);

//// [addMoreCallSignaturesToBaseSignature2.js]
var a;
var kitty = a(1);

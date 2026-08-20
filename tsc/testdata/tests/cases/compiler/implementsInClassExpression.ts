// @target: es2015
interface Foo {
    doThing(): void;
}

let cls = class implements Foo {
    doThing() { }
}
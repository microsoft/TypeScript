interface Foo {
    doThing(): void;
}

let cls = class implements Foo {
    doThing() { }
}
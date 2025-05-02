//// [tests/cases/compiler/errorMessagesIntersectionTypes02.ts] ////

//// [errorMessagesIntersectionTypes02.ts]
interface Foo {
    fooProp: "hello" | "world";
}

interface Bar {
    barProp: string;
}

interface FooBar extends Foo, Bar {
}

declare function mixBar<T>(obj: T): T & Bar;

let fooBar: FooBar = mixBar({
    fooProp: "frizzlebizzle"
});

//// [errorMessagesIntersectionTypes02.js]
var fooBar = mixBar({
    fooProp: "frizzlebizzle"
});

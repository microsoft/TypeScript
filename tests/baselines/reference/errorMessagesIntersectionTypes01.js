//// [tests/cases/compiler/errorMessagesIntersectionTypes01.ts] ////

//// [errorMessagesIntersectionTypes01.ts]
interface Foo {
    fooProp: boolean;
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

//// [errorMessagesIntersectionTypes01.js]
let fooBar = mixBar({
    fooProp: "frizzlebizzle"
});

//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/interfaceExtendingClass2.ts] ////

//// [interfaceExtendingClass2.ts]
class Foo {
    x: string;
    y() { }
    get Z() {
        return 1;
    }
    [x: string]: Object;
}

interface I2 extends Foo { // error
    a: {
        toString: () => {
            return 1;
        };
    }

//// [interfaceExtendingClass2.js]
class Foo {
    x;
    y() { }
    get Z() {
        return 1;
    }
}
return 1;
;

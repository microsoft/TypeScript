//// [tests/cases/conformance/types/members/duplicatePropertyNames.ts] ////

//// [duplicatePropertyNames.ts]
// duplicate property names are an error in all types

interface Number {
    foo: string;
    foo: string;
}

interface String {
    foo(): string;
    foo(): string;
}

interface Array<T> {
    foo: T;
    foo: T;
}

class C {
    foo: string;
    foo: string;

    bar(x) { }
    bar(x) { }

    baz = () => { }
    baz = () => { }
}

interface I {
    foo: string;
    foo: string;
}

var a: {
    foo: string;
    foo: string;

    bar: () => {};
    bar: () => {};
}

var b = {
    foo: '',
    foo: '',
    bar: () => { },
    bar: () => { }
}


//// [duplicatePropertyNames.js]
class C {
    foo;
    foo;
    bar(x) { }
    bar(x) { }
    baz = () => { };
    baz = () => { };
}
var a;
var b = {
    foo: '',
    foo: '',
    bar: () => { },
    bar: () => { }
};

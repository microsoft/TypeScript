//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty7.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty7.ts]
export namespace Foo {
    export const key = Symbol();
}

export class C {
    [Foo.key]: string;

    constructor() {
        this[Foo.key] = "hello";
    }
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty7.js]
export var Foo;
(function (Foo) {
    Foo.key = Symbol();
})(Foo || (Foo = {}));
export class C {
    [Foo.key];
    constructor() {
        this[Foo.key] = "hello";
    }
}

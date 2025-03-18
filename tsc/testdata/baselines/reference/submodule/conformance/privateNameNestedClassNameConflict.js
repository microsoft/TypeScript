//// [tests/cases/conformance/classes/members/privateNames/privateNameNestedClassNameConflict.ts] ////

//// [privateNameNestedClassNameConflict.ts]
class A {
    #foo: string;
    constructor() {
        class A {
            #foo: string;
        }
    }
}


//// [privateNameNestedClassNameConflict.js]
class A {
    #foo;
    constructor() {
        class A {
            #foo;
        }
    }
}

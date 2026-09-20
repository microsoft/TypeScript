//// [tests/cases/conformance/classes/members/privateNames/privateNamesNotAllowedAsDestructuringPatterns.ts] ////

//// [privateNamesNotAllowedAsDestructuringPatterns.ts]
class A {
    #foo = 1;
    bar() {
        const { #foo: foo } = this;
        let bar;
        ({ #foo: bar } = this);
    }
}


//// [privateNamesNotAllowedAsDestructuringPatterns.js]
"use strict";
class A {
    #foo = 1;
    bar() {
        const { #foo: foo } = this;
        let bar;
        ({ #foo: bar } = this);
    }
}

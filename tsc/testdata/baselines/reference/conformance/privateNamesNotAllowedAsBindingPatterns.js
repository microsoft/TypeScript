//// [tests/cases/conformance/classes/members/privateNames/privateNamesNotAllowedAsBindingPatterns.ts] ////

//// [privateNamesNotAllowedAsBindingPatterns.ts]
class A {
    #foo = 1;
    bar() {
        const { #foo: foo } = this;
    }
}


//// [privateNamesNotAllowedAsBindingPatterns.js]
"use strict";
class A {
    #foo = 1;
    bar() {
        const { #foo: foo } = this;
    }
}

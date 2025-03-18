//// [tests/cases/conformance/classes/members/privateNames/privateNameNotAccessibleOutsideDefiningClass.ts] ////

//// [privateNameNotAccessibleOutsideDefiningClass.ts]
class A {
    #foo: number = 3;
}

new A().#foo = 4;               // Error


//// [privateNameNotAccessibleOutsideDefiningClass.js]
class A {
    #foo = 3;
}
new A().#foo = 4;

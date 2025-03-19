//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.ts] ////

//// [privateNamesAndkeyof.ts]
class A {
    #fooField = 3;
    #fooMethod() { };
    get #fooProp() { return 1; };
    set #fooProp(value: number) { };
    bar = 3;
    baz = 3;
}

// `keyof A` should not include '#foo*'
let k: keyof A = "bar"; // OK
k = "baz"; // OK

k = "#fooField"; // Error
k = "#fooMethod"; // Error
k = "#fooProp"; // Error

k = "fooField"; // Error
k = "fooMethod"; // Error
k = "fooProp"; // Error


//// [privateNamesAndkeyof.js]
class A {
    #fooField = 3;
    #fooMethod() { }
    ;
    get #fooProp() { return 1; }
    ;
    set #fooProp(value) { }
    ;
    bar = 3;
    baz = 3;
}
// `keyof A` should not include '#foo*'
let k = "bar"; // OK
k = "baz"; // OK
k = "#fooField"; // Error
k = "#fooMethod"; // Error
k = "#fooProp"; // Error
k = "fooField"; // Error
k = "fooMethod"; // Error
k = "fooProp"; // Error

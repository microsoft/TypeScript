//// [tests/cases/compiler/errorElaborationDivesIntoApparentlyPresentPropsOnly.ts] ////

//// [errorElaborationDivesIntoApparentlyPresentPropsOnly.ts]
function foo<T extends { a: string }>(x: T) {
    x = { a: "abc", b: 20, c: 30 };
}

function bar<T extends { a: string }>(x: T) {
    x = { a: 20 };
}

function baz<T extends { a: string }>(x: T) {
    x = { a: "not ok" };
}


//// [errorElaborationDivesIntoApparentlyPresentPropsOnly.js]
function foo(x) {
    x = { a: "abc", b: 20, c: 30 };
}
function bar(x) {
    x = { a: 20 };
}
function baz(x) {
    x = { a: "not ok" };
}

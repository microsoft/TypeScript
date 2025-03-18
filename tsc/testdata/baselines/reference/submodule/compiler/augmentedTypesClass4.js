//// [tests/cases/compiler/augmentedTypesClass4.ts] ////

//// [augmentedTypesClass4.ts]
//// class then class
class c3 { public foo() { } } // error
class c3 { public bar() { } } // error


//// [augmentedTypesClass4.js]
class c3 {
    foo() { }
}
class c3 {
    bar() { }
}

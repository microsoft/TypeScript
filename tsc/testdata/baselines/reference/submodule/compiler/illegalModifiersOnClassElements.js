//// [tests/cases/compiler/illegalModifiersOnClassElements.ts] ////

//// [illegalModifiersOnClassElements.ts]
class C {
    declare foo = 1;
    export bar = 1;
}

//// [illegalModifiersOnClassElements.js]
class C {
    export bar = 1;
}

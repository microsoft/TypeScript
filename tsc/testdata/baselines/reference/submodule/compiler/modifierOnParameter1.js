//// [tests/cases/compiler/modifierOnParameter1.ts] ////

//// [modifierOnParameter1.ts]
class C {
   constructor(declare p) { }
}

//// [modifierOnParameter1.js]
class C {
    constructor(p) { }
}

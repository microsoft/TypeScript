//// [tests/cases/compiler/declareDottedModuleName.ts] ////

//// [declareDottedModuleName.ts]
module M {
    module P.Q { } // This shouldnt be emitted
}

module M {
    export module R.S { }  //This should be emitted
}

module T.U { // This needs to be emitted
}

//// [declareDottedModuleName.js]


//// [declareDottedModuleName.d.ts]
declare namespace M {
}
declare namespace M {
    namespace R.S { }
}
declare namespace T.U {
}

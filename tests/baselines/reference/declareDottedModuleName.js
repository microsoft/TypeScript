//// [tests/cases/compiler/declareDottedModuleName.ts] ////

//// [declareDottedModuleName.ts]
namespace M {
    namespace P.Q { } // This shouldnt be emitted
}

namespace M {
    export namespace R.S { }  //This should be emitted
}

namespace T.U { // This needs to be emitted
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

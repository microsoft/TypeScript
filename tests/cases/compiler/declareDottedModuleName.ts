// @declaration: true
namespace M {
    module P.Q { } // This shouldnt be emitted
}

namespace M {
    export module R.S { }  //This should be emitted
}

module T.U { // This needs to be emitted
}
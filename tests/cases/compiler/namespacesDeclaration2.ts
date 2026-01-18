// @declaration: true

namespace N {
    function S() {}
}
namespace M {
    function F() {}
}

declare namespace ns {
    let f: number;
}

var foge: N.S;
var foo: M.F;
let x: ns.A;
//// [tests/cases/conformance/internalModules/importDeclarations/importAliasMergedNamespace.ts] ////

//// [importAliasMergedNamespace.ts]
namespace N {
    export namespace M {
        export class C {}
    }

    import Local = M.C;
    new Local();
}

namespace N {
    import A = M.C;
    new A();

    import B = M;
    new B.C();

    export import D = M.C;
    new D();

    export import E = M;
    new E.C();

    import Explicit = N.M.C;
    new Explicit();
}

namespace Outer {
    export namespace Inner {
        export namespace M {
            export class C {}
        }
    }
}

namespace Outer.Inner {
    import A = M.C;
    new A();
}


//// [importAliasMergedNamespace.js]
"use strict";
var N;
(function (N) {
    let M;
    (function (M) {
        class C {
        }
        M.C = C;
    })(M = N.M || (N.M = {}));
    var Local = M.C;
    new Local();
})(N || (N = {}));
(function (N) {
    var A = N.M.C;
    new A();
    var B = N.M;
    new B.C();
    N.D = N.M.C;
    new N.D();
    N.E = N.M;
    new N.E.C();
    var Explicit = N.M.C;
    new Explicit();
})(N || (N = {}));
var Outer;
(function (Outer) {
    let Inner;
    (function (Inner) {
        let M;
        (function (M) {
            class C {
            }
            M.C = C;
        })(M = Inner.M || (Inner.M = {}));
    })(Inner = Outer.Inner || (Outer.Inner = {}));
})(Outer || (Outer = {}));
(function (Outer) {
    var Inner;
    (function (Inner) {
        var A = Inner.M.C;
        new A();
    })(Inner = Outer.Inner || (Outer.Inner = {}));
})(Outer || (Outer = {}));

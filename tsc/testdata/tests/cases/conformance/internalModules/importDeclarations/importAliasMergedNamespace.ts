// @strict: true
// @target: es2022
// @module: commonjs

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

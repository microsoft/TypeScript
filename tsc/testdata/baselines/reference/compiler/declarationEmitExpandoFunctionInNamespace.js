//// [tests/cases/compiler/declarationEmitExpandoFunctionInNamespace.ts] ////

//// [declarationEmitExpandoFunctionInNamespace.ts]
namespace NS {
    export function f(): void {}
    f.a = "";
}

namespace Outer {
    export namespace Inner {
        export function g(): void {}
        g.b = 0;
    }
}




//// [declarationEmitExpandoFunctionInNamespace.d.ts]
declare namespace NS {
    export function f(): void;
    export namespace f {
        var a: string;
    }
}
declare namespace Outer {
    namespace Inner {
        export function g(): void;
        export namespace g {
            var b: number;
        }
    }
}

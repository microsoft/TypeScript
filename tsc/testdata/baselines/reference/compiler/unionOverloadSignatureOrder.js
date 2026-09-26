//// [tests/cases/compiler/unionOverloadSignatureOrder.ts] ////

//// [unionOverloadSignatureOrder.ts]
namespace Unprimed {
    interface Alpha {
        foo(n: "str", opt?: boolean): string;
    }

    interface Beta {
        foo(n: "str", opt?: true): string;
        foo(n: string): number | string;
    }

    declare let alphaBeta: Alpha | Beta;
    declare let betaAlpha: Beta | Alpha;

    const alphaBetaResult: string = alphaBeta.foo("str");
    const betaAlphaResult: string = betaAlpha.foo("str");
}

namespace Primed {
    interface Alpha {
        foo(n: "str", opt?: boolean): string;
    }

    type B = Beta["foo"];

    interface Beta {
        foo(n: "str", opt?: true): string;
        foo(n: string): number | string;
    }

    declare let alphaBeta: Alpha | Beta;
    declare let betaAlpha: Beta | Alpha;

    const alphaBetaResult: string = alphaBeta.foo("str");
    const betaAlphaResult: string = betaAlpha.foo("str");
}

namespace MultipleOverloads {
    interface Alpha {
        foo(type: "num", opts?: unknown): number;
        foo(type: "str", opts?: unknown): string;
        foo(type: string, opts?: unknown): number | string;
    }

    interface Beta {
        foo(type: "num", opts?: { a?: string }): number;
        foo(type: "str", opts?: { b?: string }): string;
        foo(type: "num" | "str", opts?: unknown): number | string;
    }

    declare let beta: Beta;
    beta.foo("str");

    declare let alphaBeta: Alpha | Beta;
    const result: string = alphaBeta.foo("str");
    alphaBeta.foo("other");
    alphaBeta.foo("str", false);
}

namespace ReversedDeclarations {
    interface Beta {
        foo(n: "str", opt?: true): string;
        foo(n: string): number | string;
    }

    interface Alpha {
        foo(n: "str", opt?: boolean): string;
    }

    declare let alphaBeta: Alpha | Beta;
    const result: string = alphaBeta.foo("str");
}


//// [unionOverloadSignatureOrder.js]
"use strict";
var Unprimed;
(function (Unprimed) {
    const alphaBetaResult = alphaBeta.foo("str");
    const betaAlphaResult = betaAlpha.foo("str");
})(Unprimed || (Unprimed = {}));
var Primed;
(function (Primed) {
    const alphaBetaResult = alphaBeta.foo("str");
    const betaAlphaResult = betaAlpha.foo("str");
})(Primed || (Primed = {}));
var MultipleOverloads;
(function (MultipleOverloads) {
    beta.foo("str");
    const result = alphaBeta.foo("str");
    alphaBeta.foo("other");
    alphaBeta.foo("str", false);
})(MultipleOverloads || (MultipleOverloads = {}));
var ReversedDeclarations;
(function (ReversedDeclarations) {
    const result = alphaBeta.foo("str");
})(ReversedDeclarations || (ReversedDeclarations = {}));

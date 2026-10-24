//// [tests/cases/compiler/unionOverloadSignaturePriority.ts] ////

//// [unionOverloadSignaturePriority.ts]
namespace TupleRest {
    interface Alpha {
        foo(...args: [n: "str", opt?: boolean]): string;
    }
    interface Beta {
        foo(...args: [n: "str", opt?: true]): string;
        foo(n: string): number | string;
    }
    declare let value: Alpha | Beta;
    declare let reversed: Beta | Alpha;
    const result: string = value.foo("str");
    const reversedResult: string = reversed.foo("str");
    const withOption: string = value.foo("str", true);
    // @ts-expect-error
    value.foo(0);
}

namespace RequiredTupleRest {
    interface Alpha {
        foo(...args: [n: "str", count: number, opt?: boolean]): string;
    }
    interface Beta {
        foo(...args: [n: "str", count: number, opt?: true]): string;
        foo(n: string, count: number): number | string;
    }
    declare let value: Alpha | Beta;
    const result: string = value.foo("str", 1);
    // @ts-expect-error
    value.foo("str");
}

namespace OverlappingOverloads {
    interface Alpha {
        foo(n: "num", opt?: unknown): number;
        foo(n: "str", opt?: unknown): string;
        foo(n: string, opt?: unknown): number | string;
    }
    interface Beta {
        foo(n: "num", opt?: { a?: string }): number;
        foo(n: "str", opt?: { b?: string }): string;
        foo(n: "num" | "str", opt?: unknown): number | string;
    }
    declare let value: Alpha | Beta;
    declare let reversed: Beta | Alpha;
    const str: string = value.foo("str");
    const num: number = value.foo("num");
    const reversedStr: string = reversed.foo("str");
    const reversedNum: number = reversed.foo("num");
    const fallback: number | string = value.foo("str", false);
    // @ts-expect-error
    const narrowFallback: string = value.foo("str", false);
    // @ts-expect-error
    value.foo("other");
}

namespace RestArguments {
    interface Alpha {
        foo(n: "str", ...values: boolean[]): string;
    }
    interface Beta {
        foo(n: "str", ...values: true[]): string;
        foo(n: string, ...values: boolean[]): number | string;
    }
    declare let value: Alpha | Beta;
    declare let reversed: Beta | Alpha;
    const result: string = value.foo("str");
    const withValues: string = value.foo("str", true, true);
    const reversedResult: string = reversed.foo("str");
    const fallback: number | string = value.foo("str", false);
    // @ts-expect-error
    const narrowFallback: string = value.foo("str", false);
    // @ts-expect-error
    value.foo("str", 1);
}

namespace IncomparableOverloadPriorities {
    interface Alpha {
        foo(n: string, opt?: boolean): string;
        foo(n: string | number): number;
    }
    interface Beta {
        foo(n: string | number): boolean;
        foo(n: string, opt?: true): Date;
    }
    declare let value: Alpha | Beta;
    declare let reversed: Beta | Alpha;
    const result = value.foo("str");
    const reversedResult = reversed.foo("str");
    const consistent: typeof result = reversedResult;
}

namespace IdenticalGenericSignatures {
    interface Alpha {
        foo<T>(value: T, opt?: boolean): T;
    }
    interface Beta {
        foo<T>(value: T, opt?: boolean): T;
        foo(n: string): number;
    }
    declare let value: Alpha | Beta;
    const result: "str" = value.foo("str");
    const explicit: number = value.foo<number>(1);
    // @ts-expect-error
    value.foo<number>("str");
}

namespace ThreeConstituents {
    interface Alpha {
        foo(n: "str", opt?: boolean): string;
    }
    interface Beta {
        foo(n: "str", opt?: true): string;
        foo(n: string): number | string;
    }
    interface Gamma {
        foo(n: "str", opt?: true): string;
        foo(n: string): boolean | string;
    }
    declare let abc: Alpha | Beta | Gamma;
    declare let acb: Alpha | Gamma | Beta;
    declare let bac: Beta | Alpha | Gamma;
    declare let bca: Beta | Gamma | Alpha;
    declare let cab: Gamma | Alpha | Beta;
    declare let cba: Gamma | Beta | Alpha;
    const abcResult: string = abc.foo("str");
    const acbResult: string = acb.foo("str");
    const bacResult: string = bac.foo("str");
    const bcaResult: string = bca.foo("str");
    const cabResult: string = cab.foo("str");
    const cbaResult: string = cba.foo("str");
}

namespace ConstructSignatures {
    interface Alpha {
        new(n: "str", opt?: boolean): { value: string };
    }
    interface Beta {
        new(n: "str", opt?: true): { value: string };
        new(n: string): { value: number | string };
    }
    declare let value: Alpha | Beta;
    declare let reversed: Beta | Alpha;
    const result: string = new value("str").value;
    const reversedResult: string = new reversed("str").value;
    // @ts-expect-error
    new value(1);
}

namespace MergedDeclarations {
    interface Alpha {
        foo(n: string, opt?: unknown): string;
    }
    interface Beta {
        foo(n: string, opt?: { a?: string }): string;
    }
    interface Beta {
        foo(n: string): number;
    }
    declare let beta: Beta;
    declare let value: Alpha | Beta;
    const direct: number = beta.foo("str");
    const result: string | number = value.foo("str");
    // @ts-expect-error
    const unsafeNarrow: string = value.foo("str");
}



//// [unionOverloadSignaturePriority.js]
"use strict";
var TupleRest;
(function (TupleRest) {
    const result = value.foo("str");
    const reversedResult = reversed.foo("str");
    const withOption = value.foo("str", true);
    // @ts-expect-error
    value.foo(0);
})(TupleRest || (TupleRest = {}));
var RequiredTupleRest;
(function (RequiredTupleRest) {
    const result = value.foo("str", 1);
    // @ts-expect-error
    value.foo("str");
})(RequiredTupleRest || (RequiredTupleRest = {}));
var OverlappingOverloads;
(function (OverlappingOverloads) {
    const str = value.foo("str");
    const num = value.foo("num");
    const reversedStr = reversed.foo("str");
    const reversedNum = reversed.foo("num");
    const fallback = value.foo("str", false);
    // @ts-expect-error
    const narrowFallback = value.foo("str", false);
    // @ts-expect-error
    value.foo("other");
})(OverlappingOverloads || (OverlappingOverloads = {}));
var RestArguments;
(function (RestArguments) {
    const result = value.foo("str");
    const withValues = value.foo("str", true, true);
    const reversedResult = reversed.foo("str");
    const fallback = value.foo("str", false);
    // @ts-expect-error
    const narrowFallback = value.foo("str", false);
    // @ts-expect-error
    value.foo("str", 1);
})(RestArguments || (RestArguments = {}));
var IncomparableOverloadPriorities;
(function (IncomparableOverloadPriorities) {
    const result = value.foo("str");
    const reversedResult = reversed.foo("str");
    const consistent = reversedResult;
})(IncomparableOverloadPriorities || (IncomparableOverloadPriorities = {}));
var IdenticalGenericSignatures;
(function (IdenticalGenericSignatures) {
    const result = value.foo("str");
    const explicit = value.foo(1);
    // @ts-expect-error
    value.foo("str");
})(IdenticalGenericSignatures || (IdenticalGenericSignatures = {}));
var ThreeConstituents;
(function (ThreeConstituents) {
    const abcResult = abc.foo("str");
    const acbResult = acb.foo("str");
    const bacResult = bac.foo("str");
    const bcaResult = bca.foo("str");
    const cabResult = cab.foo("str");
    const cbaResult = cba.foo("str");
})(ThreeConstituents || (ThreeConstituents = {}));
var ConstructSignatures;
(function (ConstructSignatures) {
    const result = new value("str").value;
    const reversedResult = new reversed("str").value;
    // @ts-expect-error
    new value(1);
})(ConstructSignatures || (ConstructSignatures = {}));
var MergedDeclarations;
(function (MergedDeclarations) {
    const direct = beta.foo("str");
    const result = value.foo("str");
    // @ts-expect-error
    const unsafeNarrow = value.foo("str");
})(MergedDeclarations || (MergedDeclarations = {}));

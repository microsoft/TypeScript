//// [stringLiteralTypesForBindingPatternVariables03.ts]

var kindAndVal: {
     kind: "kindA";
     val: any;
};

namespace Consts {
    export const { kind = "kindB", val } = kindAndVal;
    export const { kind: constKind = "kindB" } = kindAndVal;
    export const a: "kindA" = kind;
    export const b: "kindA" = constKind;
}

namespace Lets {
    export let { kind = "kindB" } = kindAndVal;
    export let { kind: letKind = "kindB" } = kindAndVal;
    kind = letKind;
    letKind = kind;
}

//// [stringLiteralTypesForBindingPatternVariables03.js]
var kindAndVal;
var Consts;
(function (Consts) {
    _a = kindAndVal.kind, Consts.kind = _a === void 0 ? "kindB" : _a, Consts.val = kindAndVal.val;
    _b = kindAndVal.kind, Consts.constKind = _b === void 0 ? "kindB" : _b;
    Consts.a = Consts.kind;
    Consts.b = Consts.constKind;
    var _a, _b;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    _a = kindAndVal.kind, Lets.kind = _a === void 0 ? "kindB" : _a;
    _b = kindAndVal.kind, Lets.letKind = _b === void 0 ? "kindB" : _b;
    Lets.kind = Lets.letKind;
    Lets.letKind = Lets.kind;
    var _a, _b;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables03.d.ts]
declare var kindAndVal: {
    kind: "kindA";
    val: any;
};
declare namespace Consts {
    const kind: "kindA", val: any;
    const constKind: "kindA";
    const a: "kindA";
    const b: "kindA";
}
declare namespace Lets {
    let kind: string;
    let letKind: string;
}

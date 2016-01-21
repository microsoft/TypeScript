//// [stringLiteralTypesForBindingPatternVariables05.ts]

var kindAndVal: {
     kind: "kindA" | "kindB";
     val: any;
};

namespace Consts {
    export const { kind = "kindC", val } = kindAndVal;
    export const { kind: constKind = "kindC" } = kindAndVal;
    export const a: "kindA" = kind;
    export const b: "kindA" = constKind;
}

namespace Lets {
    export let { kind = "kindC" } = kindAndVal;
    export let { kind: letKind = "kindC" } = kindAndVal;
    kind = letKind;
    letKind = kind;
}

//// [stringLiteralTypesForBindingPatternVariables05.js]
var kindAndVal;
var Consts;
(function (Consts) {
    _a = kindAndVal.kind, Consts.kind = _a === void 0 ? "kindC" : _a, Consts.val = kindAndVal.val;
    _b = kindAndVal.kind, Consts.constKind = _b === void 0 ? "kindC" : _b;
    Consts.a = Consts.kind;
    Consts.b = Consts.constKind;
    var _a, _b;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    _a = kindAndVal.kind, Lets.kind = _a === void 0 ? "kindC" : _a;
    _b = kindAndVal.kind, Lets.letKind = _b === void 0 ? "kindC" : _b;
    Lets.kind = Lets.letKind;
    Lets.letKind = Lets.kind;
    var _a, _b;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables05.d.ts]
declare var kindAndVal: {
    kind: "kindA" | "kindB";
    val: any;
};
declare namespace Consts {
    const kind: "kindA" | "kindB", val: any;
    const constKind: "kindA" | "kindB";
    const a: "kindA";
    const b: "kindA";
}
declare namespace Lets {
    let kind: "kindA" | "kindB";
    let letKind: "kindA" | "kindB";
}

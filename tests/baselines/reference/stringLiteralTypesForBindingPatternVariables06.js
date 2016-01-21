//// [stringLiteralTypesForBindingPatternVariables06.ts]

var kindAndVal: ["kindA" | "kindB", any];

namespace Consts {
    export const [kind = "kindC", val] = kindAndVal;
    export const a: "kindA" = kind;
    export const b: "kindC" = kind;
}

namespace Lets {
    export let [ kind1 = "kindC", val ] = kindAndVal;
    export let [ kind2 = "kindC" ] = kindAndVal;
    kind1 = kind2;
    kind2 = kind1;

    kind1 = "kindA";
    kind1 = "kindC";

    kind2 = "kindA";
    kind2 = "kindC";
} 

//// [stringLiteralTypesForBindingPatternVariables06.js]
var kindAndVal;
var Consts;
(function (Consts) {
    _a = kindAndVal[0], Consts.kind = _a === void 0 ? "kindC" : _a, Consts.val = kindAndVal[1];
    Consts.a = Consts.kind;
    Consts.b = Consts.kind;
    var _a;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    _a = kindAndVal[0], Lets.kind1 = _a === void 0 ? "kindC" : _a, Lets.val = kindAndVal[1];
    _b = kindAndVal[0], Lets.kind2 = _b === void 0 ? "kindC" : _b;
    Lets.kind1 = Lets.kind2;
    Lets.kind2 = Lets.kind1;
    Lets.kind1 = "kindA";
    Lets.kind1 = "kindC";
    Lets.kind2 = "kindA";
    Lets.kind2 = "kindC";
    var _a, _b;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables06.d.ts]
declare var kindAndVal: ["kindA" | "kindB", any];
declare namespace Consts {
    const kind: "kindA" | "kindB", val: any;
    const a: "kindA";
    const b: "kindC";
}
declare namespace Lets {
    let kind1: "kindA" | "kindB", val: any;
    let kind2: "kindA" | "kindB";
}

//// [stringLiteralTypesForBindingPatternVariables04.ts]

var kindAndVal: ["kindA", any];

namespace Consts {
    export const [kind = "kindB", val] = kindAndVal;
    export const a: "kindA" = kind;
    export const b: "kindB" = kind;
}

namespace Lets {
    export let [ kind1 = "kindB", val ] = kindAndVal;
    export let [ kind2 = "kindB" ] = kindAndVal;
    kind1 = kind2;
    kind2 = kind1;

    kind1 = "kindA";
    kind1 = "kindB";

    kind2 = "kindA";
    kind2 = "kindB";
}

//// [stringLiteralTypesForBindingPatternVariables04.js]
var kindAndVal;
var Consts;
(function (Consts) {
    _a = kindAndVal[0], Consts.kind = _a === void 0 ? "kindB" : _a, Consts.val = kindAndVal[1];
    Consts.a = Consts.kind;
    Consts.b = Consts.kind;
    var _a;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    _a = kindAndVal[0], Lets.kind1 = _a === void 0 ? "kindB" : _a, Lets.val = kindAndVal[1];
    _b = kindAndVal[0], Lets.kind2 = _b === void 0 ? "kindB" : _b;
    Lets.kind1 = Lets.kind2;
    Lets.kind2 = Lets.kind1;
    Lets.kind1 = "kindA";
    Lets.kind1 = "kindB";
    Lets.kind2 = "kindA";
    Lets.kind2 = "kindB";
    var _a, _b;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables04.d.ts]
declare var kindAndVal: ["kindA", any];
declare namespace Consts {
    const kind: "kindA", val: any;
    const a: "kindA";
    const b: "kindB";
}
declare namespace Lets {
    let kind1: string, val: any;
    let kind2: string;
}

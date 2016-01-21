//// [stringLiteralTypesForBindingPatternVariables01.ts]

var kindAndVal: {
     kind: "kindA";
     val: any;
};

namespace Consts {
    export const { kind, val } = kindAndVal;
    export const { kind: constKind } = kindAndVal;
    export let a: "kindA" = kind;
    export let b: "kindA" = constKind;
}

namespace Lets {
    export let { kind } = kindAndVal;
    export let { kind: letKind } = kindAndVal;
    kind = letKind;
    letKind = kind;
}

//// [stringLiteralTypesForBindingPatternVariables01.js]
var kindAndVal;
var Consts;
(function (Consts) {
    Consts.kind = kindAndVal.kind, Consts.val = kindAndVal.val;
    Consts.constKind = kindAndVal.kind;
    Consts.a = Consts.kind;
    Consts.b = Consts.constKind;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    Lets.kind = kindAndVal.kind;
    Lets.letKind = kindAndVal.kind;
    Lets.kind = Lets.letKind;
    Lets.letKind = Lets.kind;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables01.d.ts]
declare var kindAndVal: {
    kind: "kindA";
    val: any;
};
declare namespace Consts {
    const kind: "kindA", val: any;
    const constKind: "kindA";
    let a: "kindA";
    let b: "kindA";
}
declare namespace Lets {
    let kind: "kindA";
    let letKind: "kindA";
}

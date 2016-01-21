//// [stringLiteralTypesForBindingPatternVariables02.ts]

var kindAndVal: ["kindA", any];

namespace Consts {
    export const [ kind, val ] = kindAndVal;
    export let a: "kindA" = kind;
}

namespace Lets {
    export let [ kind ] = kindAndVal;
    export let { 0: letKind } = kindAndVal;
    kind = letKind;
    letKind = kind;
}

//// [stringLiteralTypesForBindingPatternVariables02.js]
var kindAndVal;
var Consts;
(function (Consts) {
    Consts.kind = kindAndVal[0], Consts.val = kindAndVal[1];
    Consts.a = Consts.kind;
})(Consts || (Consts = {}));
var Lets;
(function (Lets) {
    Lets.kind = kindAndVal[0];
    Lets.letKind = kindAndVal[0];
    Lets.kind = Lets.letKind;
    Lets.letKind = Lets.kind;
})(Lets || (Lets = {}));


//// [stringLiteralTypesForBindingPatternVariables02.d.ts]
declare var kindAndVal: ["kindA", any];
declare namespace Consts {
    const kind: "kindA", val: any;
    let a: "kindA";
}
declare namespace Lets {
    let kind: "kindA";
    let letKind: "kindA";
}

// @declaration: true
// @noImplicitAny: true

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
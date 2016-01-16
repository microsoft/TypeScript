// @declaration: true
// @noImplicitAny: true

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
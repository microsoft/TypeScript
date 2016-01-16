// @declaration: true
// @noImplicitAny: true

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
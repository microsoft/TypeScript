// @declaration: true
// @noImplicitAny: true

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
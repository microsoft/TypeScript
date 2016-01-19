// @declaration: true
// @noImplicitAny: true

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
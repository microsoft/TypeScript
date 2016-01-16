// @declaration: true
// @noImplicitAny: true

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
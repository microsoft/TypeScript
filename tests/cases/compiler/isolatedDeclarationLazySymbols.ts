// @declaration: true
// @isolatedDeclarations: true
// @target: ESNext
// @isolatedDeclarationFixedDiffReason: Expando function declarations are not fixed.


export function foo() {

}

const o = {
    ["prop.inner"]: "a",
    prop: {
        inner: "b",
    }
} as const

foo[o["prop.inner"]] ="A";
foo[o.prop.inner] = "B";

export class Foo {
    [o["prop.inner"]] ="A"
    [o.prop.inner] = "B"
}

export let oo = {
    [o['prop.inner']]:"A",
    [o.prop.inner]: "B",
}
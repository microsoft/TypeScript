// @declaration: true
// @isolatedDeclarationFixedDiffReason: Semantically invalid. TSC does not emit .d.ts

type Test<T> = T extends infer A extends B ? number : string;

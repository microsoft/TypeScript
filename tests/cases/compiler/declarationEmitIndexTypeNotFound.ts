// @declaration: true
// @isolatedDeclarationFixedDiffReason: Semantically invalid. TSC does not emit .d.ts

export interface Test {
    [index: TypeNotFound]: any;
}

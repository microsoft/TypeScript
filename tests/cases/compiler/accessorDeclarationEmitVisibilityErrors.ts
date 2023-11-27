// @target: es6
// @strict: true
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Semantically invalid. TSC does not emit .d.ts

export class Q {
    set bet(arg: DoesNotExist) {}
}
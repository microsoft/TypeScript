// @declaration: true
// @isolatedDeclarationFixedDiffReason: Semantically invalid. TSC does not emit .d.ts
type T0<T> = ({[K in keyof T]}) extends ({[key in K]: T[K]}) ? number : never;
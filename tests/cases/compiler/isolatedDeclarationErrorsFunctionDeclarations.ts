// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @target: ESNext

export function noReturn() {}

export function noParamAnnotation(p): void {}

export function noParamAnnotationDefault(p = 1): void {}

export function noParamAnnotationBadDefault(p = 1 + 1, p2 = { a: 1 + 1 }, p3 = [1 + 1] as const): void {}

export function noParamAnnotationBadDefault2(p = { a: 1 + 1 }): void {}

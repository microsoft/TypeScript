// @declaration: true
// @isolatedDeclarationFixedDiffReason: Printing differences
export enum Test {
    A, B, C
}

export type TestType = typeof Test;

export const bar = (null as TestType[Extract<keyof TestType, string>][]);
// @module: commonjs
// @target: es2015
// @declaration: true
export enum Test {
    A, B, C
}

export type TestType = typeof Test;

export const bar = null! as TestType[Extract<keyof TestType, string>][] satisfies any;
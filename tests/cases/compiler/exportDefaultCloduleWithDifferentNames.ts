// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default class A {
    A1: string = "init"
}
export default namespace B {
    export const A2 = 32;
}

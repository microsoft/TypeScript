// @target: es2015
// @declaration: true

type Test<T> = T extends infer A extends B ? number : string;

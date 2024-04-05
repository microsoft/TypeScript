// @declaration: true

type Test<T> = T extends infer A extends B ? number : string;

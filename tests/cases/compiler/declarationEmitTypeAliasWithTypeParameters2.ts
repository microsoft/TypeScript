// @declaration: true

export type Bar<X, Y, Z> = () => [X, Y, Z];
export type Baz<M, N> = Bar<M, string, N>;
export type Baa<Y> = Baz<boolean, Y>;
export const y = (x: Baa<number>) => 1
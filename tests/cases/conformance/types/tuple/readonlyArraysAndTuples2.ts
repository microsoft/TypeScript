// @strict: true
// @declaration: true
// @emitDecoratorMetadata: true
// @experimentalDecorators: true

type T10 = string[];
type T11 = Array<string>;
type T12 = readonly string[];
type T13 = ReadonlyArray<string>;

type T20 = [number, number];
type T21 = readonly [number, number];

declare function f1(ma: string[], ra: readonly string[], mt: [string, string], rt: readonly [string, string]): readonly [string, string];

declare const someDec: any;

class A {
  @someDec
  j: readonly string[] = [];
  @someDec
  k: readonly [string, number] = ['foo', 42];
}

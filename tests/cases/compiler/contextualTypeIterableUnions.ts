// @strict: true
// @target: esnext

declare class DMap<K, V>  {
  constructor(iterable: Iterable<[K, V]> | undefined);
}
new DMap([["1", 2]]);

const i1: Iterable<{ a: true }> | undefined = [{ a: true }];
const i2: Iterable<{ a: true }> | Iterable<{ b: false }> = [{ b: false }];
const i3: Iterable<number> | 1[] = [2];

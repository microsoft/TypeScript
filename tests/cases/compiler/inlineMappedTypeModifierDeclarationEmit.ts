// @declaration: true
// @filename: index.ts
import { test1, test2 } from "./other";

export function wrappedTest1<T, K extends string>(obj: T, k: K) {
  return test1(obj, k);
}

export function wrappedTest2<T, K extends string>(obj: T, k: K) {
  return test2(obj, k);
}

export type Obj = {
  a: number;
  readonly foo: string;
};

export const processedInternally1 = wrappedTest1({} as Obj, "a");
export const processedInternally2 = wrappedTest2({} as Obj, "a");
// @filename: other.ts
// how Omit from lib is defined
type OmitReal<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// what we see when we hover it
type OmitUnveiled<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export function test1<T, K extends string>(obj: T, k: K): OmitReal<T, K> {
  return {} as any;
}

export function test2<T, K extends string>(obj: T, k: K): OmitUnveiled<T, K> {
  return {} as any;
}
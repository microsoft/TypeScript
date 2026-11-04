// @strict: true
// @noEmit: true

type ChildPaths<T> = [PathTuples<T>] extends [never] ? [] : PathTuples<T>;
type PathTuples<T> = T extends object
  ? {
      [K in keyof T & string as K extends '_key' ? never : K]: [PathTuples<T[K]>] extends [never]
        ? never
        : readonly [K, ...ChildPaths<T[K]>];
    }[Exclude<keyof T & string, '_key'>]
  : [];

type T1 = PathTuples<{ a: string; _key: string; b: { c: number } }>;
const t1: T1 = ['b', 'c'];

type S1<T> = { [K in keyof T & string as K extends '_key' ? never : K]: 1 }[Exclude<keyof T & string, '_key'>];
type S2<T> = { [K in string & keyof T as K extends '_key' ? never : K]: 1 }[Exclude<string & keyof T, '_key'>];

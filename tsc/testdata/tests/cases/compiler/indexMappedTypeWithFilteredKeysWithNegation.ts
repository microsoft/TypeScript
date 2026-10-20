// @strict: true

// homomorphic - mapped type causes `keyof ExcludeKey` to not simplify, relater operates with full mapped type awareness
type ExcludeKey<T, TKey> = {
    [K in keyof T as K extends TKey ? never : K]: T[K]
};

interface Test {
    a: string;
    b: number;
    c: boolean;
}

declare const test: ExcludeKey<Test, "b">; 
declare var possibleKey: string & keyof Test & not "b";

test[possibleKey];

function f<T extends Test>(test: ExcludeKey<T, "b">, possibleKey: string & keyof T & not "b") {
    test[possibleKey];
}

// non-homomorphic - mapped type declared with `keyof T & string` causes `keyof PathTuples` to simplify to `(keyof T & string) extends '_key' ? never : (keyof T & string)`
// relater must operate without mapped type awareness
// ultimate comparison is `keyof T & string & not '_key'` to `(keyof T & string) extends '_key' ? never : (keyof T & string)`
type LocalExclude<T, U> = T & not U;
type ChildPaths<T> = [PathTuples<T>] extends [never] ? [] : PathTuples<T>;
type PathTuples<T> = T extends object
  ? {
      [K in keyof T & string as K extends '_key' ? never : K]: [PathTuples<T[K]>] extends [never]
        ? never
        : readonly [K, ...ChildPaths<T[K]>];
    }[LocalExclude<keyof T & string, '_key'>]
  : [];

type T1 = PathTuples<{ a: string; _key: string; b: { c: number } }>;
const t1: T1 = ['b', 'c'];

type S1<T> = { [K in keyof T & string as K extends '_key' ? never : K]: 1 }[LocalExclude<keyof T & string, '_key'>];
type S2<T> = { [K in string & keyof T as K extends '_key' ? never : K]: 1 }[LocalExclude<string & keyof T, '_key'>];

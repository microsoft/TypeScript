// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55382

declare function test1<T>(arg: {
  [K in keyof T]: T[K];
}): T;
const result1 = test1(["foo", 42]);

declare function test2<T extends readonly unknown[]>(arg: {
  [K in keyof T]: T[K];
}): T;
const result2 = test2(["foo", 42]);

type Schema = Record<string, unknown> | readonly unknown[];
type Definition<T> = {
  [K in keyof T]: (() => T[K]) | Definition<T[K]>;
};
declare function create<T extends Schema>(definition: Definition<T>): T;
const created1 = create([() => 1, [() => ""]]);
const created2 = create({
  a: () => 1,
  b: [() => ""],
});

interface CompilerOptions {
  allowUnreachableCode?: boolean;
  allowUnusedLabels?: boolean;
  alwaysStrict?: boolean;
}
type KeepLiteralStrings<T extends string[]> = {
  [K in keyof T]: T[K];
};
declare function test4<T extends Record<string, string[]>>(obj: {
  [K in keyof T & keyof CompilerOptions]: {
    dependencies: KeepLiteralStrings<T[K]>;
  };
}): T;
const result4 = test4({
  alwaysStrict: {
    dependencies: ["foo", "bar"],
  },
  allowUnusedLabels: {
    dependencies: ["baz", "qwe"],
  },
});

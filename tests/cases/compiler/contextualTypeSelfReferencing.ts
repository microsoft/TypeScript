// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54048

type narrow<def> = def extends string
  ? def
  : def extends [unknown, ...unknown[]]
  ? def
  : {
      [k in keyof def]: narrow<def[k]>;
    };

declare const parse: <def>(def: narrow<def>) => def;

const result = parse([{ a: "foo" }]);
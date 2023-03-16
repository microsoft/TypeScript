// @strict: true
// @noEmit: true
// @lib: es2015

// See: https://github.com/microsoft/TypeScript/pull/53280#discussion_r1138684984

declare function test(
  arg: Record<string, (arg: string) => void> | Array<(arg: number) => void>
): void;

test([
  (arg) => {
    arg; // number
  },
]);

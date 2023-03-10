// @strict: true
// @noEmit: true
// @lib: es5

// repro from #52588

declare function test(
  arg: Record<string, (arg: string) => void> | Array<(arg: number) => void>
): void;

test([
  (arg) => {
    arg; // number
  },
]);

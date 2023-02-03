// @strict: true
// @noEmit: true

// repro from #52588

declare function test(
  arg: Record<string, (arg: string) => void> | Array<(arg: number) => void>
): void;

test([
  (arg) => {
    arg; // number
  },
]);

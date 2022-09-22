// @noEmit: true
// @strict: true


// repro #50687

declare function repro<T>(config: {
  params: T;
  callback: () => (params: T) => number;
}): void;

repro({
  params: 1,
  callback: () => { return a => a + 1 },
});

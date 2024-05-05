// @strict: true
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58371

type T1 = "A" | "B";

type T2 = {
  C: [string];
  D: [number];
};

declare const map: {
  [K in T1 | keyof T2]: (...args: K extends keyof T2 ? T2[K] : []) => unknown;
};

declare const args: any;

for (const [key, fn] of Object.entries(map)) {
  fn(...args);
}

const test2: ((a: number, ...args: []) => void) &
  ((b: string) => void) &
  ((c: boolean) => void) = (arg) => {};

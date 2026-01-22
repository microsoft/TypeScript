// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/2551

type S1 = { input: { a: number } };
type S2 = { input: { b: number } };
type S3 = { input: { c: number } };
type S4 = { input: { d: number } };
type S5 = { input: { e: number } };
type S6 = { input: { f: number } };
type S7 = { input: { g: number } };
type S8 = { input: { h: number } };
type S9 = { input: { i: number } };
type S10 = { input: { j: number } };
type S11 = { input: { k?: string[] } };

type Base = { type: string; settings: S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | S10 | S11; };

type Action =
  | Base & { type: '1'; settings: S1 }
  | Base & { type: '2'; settings: S2 }
  | Base & { type: '3'; settings: S3 }
  | Base & { type: '4'; settings: S4 }
  | Base & { type: '5'; settings: S5 }
  | Base & { type: '6'; settings: S6 }
  | Base & { type: '7'; settings: S7 }
  | Base & { type: '8'; settings: S8 }
  | Base & { type: '9'; settings: S9 }
  | Base & { type: '10'; settings: S10 }
  | Base & { type: '11'; settings: S11 };

declare function read<T>(arg: T): void;
declare const step: Action;

read({
  ...step,
  settings: { ...step.settings, input: { ...step.settings.input, k: ['5'] } },
});

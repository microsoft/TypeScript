// @strict: true
// @noEmit: true

type Target =
  | { type: `${string}_FOO`; cb: (arg: number) => void }
  | { type: `${string}_BAR`; cb: (arg: string) => void };

declare const str: string;

const obj1: Target = {
  type: `${str}_FOO`,
  cb: (arg) => {},
};

const obj2: Target = {
  type: `${str}_BAR`,
  cb: (arg) => {},
};

// error
const obj3: Target = {
  type: `${str}_BAZ`,
  cb: (arg) => {},
};

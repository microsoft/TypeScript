// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57109

type A = {
  k: symbol;
};

type B = "k" extends keyof A ? A["k"] : never;

type C = {
  k: symbol;
  other: boolean;
};

type D = "k" extends keyof C ? C["k"] : never;
type E = "k" extends keyof C ? C["k" | "other"] : never;

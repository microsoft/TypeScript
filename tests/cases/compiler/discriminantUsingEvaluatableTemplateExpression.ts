// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/53888

type S = { d: "s"; cb: (x: string) => void };
type N = { d: "n"; cb: (x: number) => void };

declare function foo(foo: S | N): void;

foo({
  d: `${"s"}`,
  cb: (x) => {
    x; // string
  },
});

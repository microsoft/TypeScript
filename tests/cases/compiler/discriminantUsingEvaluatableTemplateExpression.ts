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

type E1 = { d: "main1-sub1"; cb: (x: string) => void };
type E2 = { d: "main2-sub2"; cb: (x: number) => void };

declare function bar(_: E1 | E2): void;

const someCategory = "main1";
const someSubcategory = "sub1";

bar({ d: `${someCategory}-${someSubcategory}`, cb: (x) => {} });

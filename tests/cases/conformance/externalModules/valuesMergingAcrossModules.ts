// @Filename: a.ts
function A() {}
export { A };

// @Filename: b.ts
import { A } from "./a";
type A = 0;
export { A };

// @Filename: c.ts
import { A } from "./b";
namespace A {
  export const displayName = "A";
}

A();
A.displayName;

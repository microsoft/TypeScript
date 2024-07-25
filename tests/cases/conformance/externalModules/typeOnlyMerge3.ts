// @Filename: a.ts
function A() {}
export type { A };

// @Filename: b.ts
import { A } from "./a";
namespace A {
  export const displayName = "A";
}
export { A };

// @Filename: c.ts
import { A } from "./b";
A;
A.displayName;
A();

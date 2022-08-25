// @Filename: a.ts
function A() {}
export { A };

// @Filename: b.ts
import { A } from "./a";
namespace A {
  export const displayName = "A";
}

A();
A.displayName;

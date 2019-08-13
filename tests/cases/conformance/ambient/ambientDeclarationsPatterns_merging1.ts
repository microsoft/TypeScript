// @filename: types.ts
declare module "*.foo" {
  let everywhere: string;
}


// @filename: testA.ts
import { everywhere, onlyInA } from "a.foo";
declare module "a.foo" {
  let onlyInA: number;
}

// @filename: testB.ts
import { everywhere, onlyInA } from "b.foo"; // Error

// @filename: types.ts
declare module "*.foo" {
  let everywhere: string;
}


// @filename: testA.ts
import { everywhere, onlyInA, alsoOnlyInA } from "a.foo";
declare module "a.foo" {
  let onlyInA: number;
}

// @filename: testB.ts
import { everywhere, onlyInA, alsoOnlyInA } from "b.foo"; // Error
declare module "a.foo" {
  let alsoOnlyInA: number;
}
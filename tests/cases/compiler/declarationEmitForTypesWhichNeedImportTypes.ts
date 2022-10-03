// @declaration: true
// @filename: b.ts
export interface Named {}

export function createNamed(): Named {
  return {};
}
// @filename: a.ts
import { createNamed } from "./b";

export const Value = createNamed();

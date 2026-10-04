// @module: commonjs
// @target: es2015
// @declaration: true
// @filename: r/node_modules/foo/node_modules/nested/index.d.ts
export interface MySpecialType {
    val: string;
}
// @filename: r/node_modules/foo/index.d.ts
import { MySpecialType } from "nested";
export function getSpecial(): MySpecialType;
// @filename: r/entry.ts
import { getSpecial } from "foo";
export const special = getSpecial();

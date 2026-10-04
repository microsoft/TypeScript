// @target: es2022
// @module: commonjs
// @noTypesAndSymbols: true

// @filename: /enum.ts
export class CodePriceType {
    static A = "a";
    static B = "b";
}
export default CodePriceType;
export const pair = ["a", "b"];
export const fallback = "fallback";

// @filename: /repro.ts
import { CodePriceType } from "./enum";
export const { A, B } = CodePriceType;

// @filename: /arrayPattern.ts
import { pair } from "./enum";
export const [ArrayA, ArrayB] = pair;

// @filename: /aliasedNamedObject.ts
import { CodePriceType as PriceType } from "./enum";
export const { A: AliasA, B: AliasB } = PriceType;

// @filename: /defaultObject.ts
import CodePriceType from "./enum";
export const { A: DefaultA, B: DefaultB } = CodePriceType;

// @filename: /defaultInitializer.ts
import { CodePriceType, fallback } from "./enum";
export const { Missing = fallback } = CodePriceType as any;

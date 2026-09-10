// @strict: true
// @module: preserve
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /valid.d.ts
declare module "*.asset" with { type: "css" } {
  const stylesheet: CSSStyleSheet;
  export default stylesheet;
}

declare module "*.text" with { type: "text" } {
  const text: string;
  export default text;
}

declare module "*.data" with { type: "json" | "json5" } {
  const data: { version: number };
  export default data;
}

declare module "*.augmentable" {
  export interface Existing {}
}
// @filename: /valid.ts
import stylesheet from "./button.asset" with { type: "css" };
import text from "./license.text" with { type: "text" };
import data from "./config.data" with { type: "json5" };

stylesheet.insertRule("");
text.toUpperCase();
data.version.toFixed();

// @filename: /checkErrors.d.ts
declare module "*.numberValue" with { type: number } {}
declare module "*.objectValue" with { type: { name: string } } {}
declare module "*" with { type: "md" | "markdown" } {}
// @filename: /augmentation.ts
export {};
declare module "file.augmentable" with { type: "css" } {
  export interface Added {}
}
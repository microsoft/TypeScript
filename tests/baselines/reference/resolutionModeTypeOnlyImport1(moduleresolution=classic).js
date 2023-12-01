//// [tests/cases/conformance/moduleResolution/resolutionModeTypeOnlyImport1.ts] ////

//// [package.json]
{
  "name": "@types/foo",
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./index.d.mts",
      "require": "./index.d.cts"
    }
  }
}

//// [index.d.mts]
export declare const x: "module";

//// [index.d.cts]
export declare const x: "script";

//// [app.ts]
import type { x as Default } from "foo";
import type { x as Import } from "foo" assert { "resolution-mode": "import" };
import type { x as Require } from "foo" assert { "resolution-mode": "require" };
type _Default = typeof Default;
type _Import = typeof Import;
type _Require = typeof Require;

// resolution-mode does not enforce file extension in `bundler`, just sets conditions
import type { x as ImportRelative } from "./other" assert { "resolution-mode": "import" };
import type { x as RequireRelative } from "./other" assert { "resolution-mode": "require" };
type _ImportRelative = typeof ImportRelative;
type _RequireRelative = typeof RequireRelative;

export {
  _Default,
  _Import,
  _Require,
  _ImportRelative,
  _RequireRelative
}

//// [other.ts]
export const x = "other";




//// [other.d.ts]
export declare const x = "other";
//// [app.d.ts]
import type { x as Default } from "foo";
import type { x as Import } from "foo" assert { "resolution-mode": "import" };
import type { x as Require } from "foo" assert { "resolution-mode": "require" };
type _Default = typeof Default;
type _Import = typeof Import;
type _Require = typeof Require;
import type { x as ImportRelative } from "./other" assert { "resolution-mode": "import" };
import type { x as RequireRelative } from "./other" assert { "resolution-mode": "require" };
type _ImportRelative = typeof ImportRelative;
type _RequireRelative = typeof RequireRelative;
export { _Default, _Import, _Require, _ImportRelative, _RequireRelative };

// @noImplicitReferences: true
// @filename: tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./dist",
    "declarationDir": "./types",
    "declaration": true
  }
}
// @filename: package.json
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": {
      "default": "./dist/index.js",
      "types": "./types/index.d.ts"
    }
  }
}
// @filename: index.ts
export {srcthing as thing} from "./src/thing.js";
// @filename: src/thing.ts
// The following import should cause `index.ts`
// to be included in the build, which will,
// in turn, cause the common src directory to not be `src`
// (the harness is wierd here in that noImplicitReferences makes only
// this file get loaded as an entrypoint and emitted, while on the
// real command-line we'll crawl the imports for that set - a limitation
// of the harness, I suppose)
import * as me from "@this/package";

me.thing();

export function srcthing(): void {}


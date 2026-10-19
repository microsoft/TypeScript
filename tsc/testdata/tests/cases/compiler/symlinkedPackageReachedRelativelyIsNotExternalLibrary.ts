// @noTypesAndSymbols: true

// @filename: /src/tsconfig.json
{
    "compilerOptions": { "outDir": "out", "module": "commonjs", "target": "es2015" },
    "files": ["a.ts", "b.ts"]
}

// @filename: /src/a.ts
import { util } from "./lib/index";
export const a = util;

// @filename: /src/b.ts
import { util } from "lib";
export const b = util;

// @filename: /src/lib/package.json
// @symlink: /src/node_modules/lib/package.json
{ "name": "lib", "types": "index.ts" }

// @filename: /src/lib/index.ts
// @symlink: /src/node_modules/lib/index.ts
export { util } from "./util";

// @filename: /src/lib/util.ts
// @symlink: /src/node_modules/lib/util.ts
export const util = 1;

// The type of "v" comes from "/project/shared/lib/index.ts". The file
// "/project/shared/lib.ts" is next to the "lib" directory, so "./lib" would
// name a different module. Declaration emit keeps "/index" in the specifier,
// although the target is outside the directory of "a.ts". The "paths" option
// makes the emitter also check a "@shared/*" specifier. Both files are in the
// project, so the emitter uses the relative specifier.

// @filename: /project/tsconfig.json
{
    "compilerOptions": {
        "declaration": true,
        "emitDeclarationOnly": true,
        "paths": { "@shared/*": ["./shared/*"] }
    },
    "include": ["app/src"]
}

// @filename: /project/shared/lib/index.ts
export interface T { v: number }
export function make(): T { return { v: 1 }; }

// @filename: /project/shared/lib.ts
export const other = 1;

// @filename: /project/app/src/re.ts
export { make } from "../../shared/lib/index";

// @filename: /project/app/src/a.ts
import { make } from "./re";
export const v = make();

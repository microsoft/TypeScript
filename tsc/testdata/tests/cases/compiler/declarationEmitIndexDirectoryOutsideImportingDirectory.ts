// The type of "v" comes from "/project/shared/lib/index.ts". The file
// "/project/shared/lib.ts" is not in the program, but it is next to the "lib"
// directory. So the specifier "../../shared/lib" would name "lib.ts", not
// "lib/index.ts". Declaration emit keeps "/index" in the specifier, although
// the target is outside the directory of "a.ts".

// @filename: /project/tsconfig.json
{
    "compilerOptions": {
        "declaration": true,
        "emitDeclarationOnly": true
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

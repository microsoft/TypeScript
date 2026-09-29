// @captureSuggestions: true
// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext",
        "noImplicitAny": true,
        "declaration": true
    },
    "files": ["/index.mts"]
}
// @Filename: /untyped.mjs
export const x = 1;
// @Filename: /index.mts
// @ts-expect-error
import { x } from "./untyped.mjs";
x;

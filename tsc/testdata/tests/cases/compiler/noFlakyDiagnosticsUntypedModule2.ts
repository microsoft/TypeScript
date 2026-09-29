// @captureSuggestions: true
// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "noImplicitAny": true,
        "declaration": true
    },
    "files": ["/index.ts"]
}
// @Filename: /untyped.js
exports.x = 1;
// @Filename: /index.ts
// @ts-expect-error
import { x } from "./untyped";
x;

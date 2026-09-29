// @captureSuggestions: true
// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "allowJs": true,
        "noImplicitAny": true,
        "declaration": true,
        "outDir": "/out",
        "rootDir": "/"
    },
    "files": ["/index.js"]
}
// @Filename: /node_modules/untyped/index.js
exports.x = 1;
// @Filename: /index.js
import { x } from "untyped";
x;

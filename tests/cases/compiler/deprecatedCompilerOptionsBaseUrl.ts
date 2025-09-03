// @typeScriptVersion: 6.0
// @filename: /foo/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@app/*": ["app/*"],
            "@lib/*": ["lib/*"]
        }
    }
}

// @filename: /foo/src/app/module.ts
export const value = 42;

// @filename: /foo/src/main.ts
import { value } from "@app/module";
const result = value;
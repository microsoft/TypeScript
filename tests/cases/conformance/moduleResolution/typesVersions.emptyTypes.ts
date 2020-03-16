// @baseUrl: /
// @traceResolution: true
// @target: esnext
// @module: commonjs

// @filename: /a/package.json
{
    "types": "",
    "typesVersions": {
        ">=3.1.0-0": { "*" : ["ts3.1/*"] }
    }
}

// @filename: /a/ts3.1/index.d.ts
export const a = 0;

// @filename: /b/user.ts
import { a } from "a";

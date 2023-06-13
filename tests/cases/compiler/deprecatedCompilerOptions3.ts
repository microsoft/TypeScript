// @typeScriptVersion: 6.0
// @filename: /foo/tsconfig.json
{
    "compilerOptions": {
        "target": "ES3",
        "noImplicitUseStrict": true,
        "keyofStringsOnly": true,
        "suppressExcessPropertyErrors": true,
        "suppressImplicitAnyIndexErrors": true,
        "noStrictGenericChecks": true,
        "charset": "utf8",
        "out": "dist.js",
    }
}

// @filename: /foo/a.ts
const a = 1;

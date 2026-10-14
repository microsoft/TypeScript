// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "preserve",
        "rewriteRelativeImportExtensions": true,
        "outDir": "/dist"
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".astro"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": {
        "contentMapper": {
            "exec": ["compiler-test-mapper"],
            "outputExtensions": { ".astro": ".js" }
        }
    }
}

// @Filename: /component.astro
export const fromAstro = true;

// @Filename: /component.ts
export const fromTs = true;

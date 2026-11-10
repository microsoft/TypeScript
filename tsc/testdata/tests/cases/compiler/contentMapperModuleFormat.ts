// @runExternalCode: true
// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext",
        "rewriteRelativeImportExtensions": true,
        "rootDir": "/src",
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".esm", ".cbox", ".box"],
        "outputExtensions": { ".esm": ".mjs", ".cbox": ".cjs" }
    }]
}

// @Filename: /package.json
{ "type": "module" }

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /src/expected-esm.esm
// @box-extension: .cts
export const value = 1;

// @Filename: /src/expected-cjs.cbox
// @box-extension: .mts
export const value = 1;

// @Filename: /src/package-inferred.box
// @box-extension: .cts
export const value = 1;

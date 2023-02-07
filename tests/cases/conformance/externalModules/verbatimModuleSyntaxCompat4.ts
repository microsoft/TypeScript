// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /tsconfig.base.json
{
    "compilerOptions": {
        "verbatimModuleSyntax": true
    }
}
// @Filename: /tsconfig.json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "isolatedModules": true,
        "preserveValueImports": true,
        "importsNotUsedAsValues": "error",
    }
}
// @Filename: /index.ts
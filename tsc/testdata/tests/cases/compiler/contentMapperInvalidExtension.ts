// @runExternalCode: true
// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
    "contentMappers": [
        { "package": "mapper", "extensions": [".box"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /component.box
// @box-extension: .coffee
export const value = 1;

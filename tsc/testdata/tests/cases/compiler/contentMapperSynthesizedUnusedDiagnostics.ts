// @runExternalCode: true
// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
        "strict": true,
        "noUnusedLocals": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".box"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"], "compilerOptions": ["target", "jsx"] } }
}

// @Filename: /widget.box
const mappedUnused = 1;
export {};
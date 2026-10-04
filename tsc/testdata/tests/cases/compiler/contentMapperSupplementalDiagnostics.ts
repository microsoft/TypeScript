// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
        "strict": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".astro"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["supplemental-diagnostics-mapper"] } }
}

// @Filename: /component.astro
const mappedError: number = "not a number";

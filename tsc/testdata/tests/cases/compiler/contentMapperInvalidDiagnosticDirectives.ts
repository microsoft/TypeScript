// @runExternalCode: true
// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
        "strict": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".invalidrange"] },
        { "package": "mapper", "extensions": [".invalidpolicy"] },
        { "package": "mapper", "extensions": [".expectmissing"] },
        { "package": "mapper", "extensions": [".invalidunusedindex"] },
        { "package": "mapper", "extensions": [".overlap"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": {
        "exec": ["compiler-test-mapper"],
        "compilerOptions": ["target", "jsx"]
    } }
}

// @Filename: /invalidRange.invalidrange
// @box-invalid-directive: invalid-range

// @Filename: /invalidPolicy.invalidpolicy
// @box-invalid-directive: invalid-policy

// @Filename: /expectWithoutUnusedDiagnostic.expectmissing
// @box-invalid-directive: expect-without-unused-diagnostic

// @Filename: /invalidUnusedDiagnosticIndex.invalidunusedindex
// @box-invalid-directive: invalid-unused-diagnostic-index

// @Filename: /overlap.overlap
// @box-invalid-directive: overlap
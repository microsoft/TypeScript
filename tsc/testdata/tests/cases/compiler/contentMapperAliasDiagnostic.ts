// @runExternalCode: true
// @noEmit: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".lisp"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["lisp-mapper"] } }
}

// @Filename: /expression.lisp
(+ 1 2 "oops")

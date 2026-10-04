// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "declaration": true,
        "declarationMap": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".vue"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["failing-mapper"] } }
}

// @Filename: /component.vue
export const component = 1;

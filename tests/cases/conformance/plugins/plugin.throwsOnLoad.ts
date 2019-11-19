// @noImplicitReferences: true
// @noTypesAndSymbols: true
// @filename: node_modules/typescript-plugin-transform/package.json
{
    "name": "typescript-plugin-transform",
    "version": "1.0.0",
    "main": "index.js",
    "typescriptPlugin": {
        "activationEvents": ["preEmit"]
    }
}

// @filename: node_modules/typescript-plugin-transform/index.js
throw new Error("Not yet implemented.");

// @filename: tsconfig.json
{
    "compilerOptions": {},
    "plugins": [
        "transform"
    ]
}

// @filename: main.ts
const a = undefined;
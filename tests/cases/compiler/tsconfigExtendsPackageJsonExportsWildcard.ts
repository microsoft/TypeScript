// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /node_modules/foo/package.json
{
    "name": "foo",
    "version": "1.0.0",
    "exports": {
        "./*.json": "./configs/*.json"
    }
}

// @Filename: /node_modules/foo/configs/strict.json
{
    "compilerOptions": {
        "strict": true
    }
}

// @Filename: /tsconfig.json
{
    "extends": "foo/strict.json"
}

// @Filename: /index.ts
let x: string;
x.toLowerCase();

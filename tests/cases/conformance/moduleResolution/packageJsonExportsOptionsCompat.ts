// @noTypesAndSymbols: true

// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "classic",
    "customConditions": ["webpack", "browser"],
    "resolvePackageJsonExports": true,
    "resolvePackageJsonImports": true,
    "noEmit": true
  }
}

// @Filename: /index.ts
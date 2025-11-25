// Test case related to GitHub issue #43121: tsconfig should support extends with suffix `.jsonc`
// This test case is to ensure an `extends` pointing to a package with a jsonc file works

// @filename: /node_modules/test-config/base.jsonc
{
    "compilerOptions": {
        "inlineSourceMap": true
    }
}

// @filename: /node_modules/test-config/package.json
{
    "name": "test-config",
    "version": "1.0.0"
}

// @filename: /tsconfig.json
{
    "extends": "test-config/base.jsonc"
}

// @filename: /index.ts
export const x = 42;

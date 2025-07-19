// Test case related to GitHub issue #43121: tsconfig should support extends with suffix `.jsonc`
// Relative extends paths were passing before the issue: this test is to prevent regressions

// @filename: /configs/base.jsonc
{
    "compilerOptions": {
        "inlineSourceMap": true
    }
}

// @filename: /tsconfig.json
{
    "extends": "./configs/base.jsonc"
}

// @filename: /index.ts
export const x = 42;

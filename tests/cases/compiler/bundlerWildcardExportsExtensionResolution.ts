// @module: preserve
// @moduleResolution: bundler
// @noEmit: true
// @traceResolution: true
// @jsx: react

// Test: Wildcard exports should resolve extensionless imports in bundler mode
// Related: https://github.com/microsoft/TypeScript/issues/62909

// @filename: /node_modules/@repo/library/package.json
{
    "name": "@repo/library",
    "type": "module",
    "exports": {
        "./*": "./src/*"
    }
}

// @filename: /node_modules/@repo/library/src/utils.ts
export function greet(): string {
    return "hello";
}

// @filename: /node_modules/@repo/library/src/component.tsx
export const Component = () => null;

// @filename: /node_modules/@repo/library/src/deep/nested/module.ts
export const deep = true;

// @filename: /app.ts
// These imports should all resolve successfully in bundler mode
import { greet } from "@repo/library/utils";
import { Component } from "@repo/library/component";
import { deep } from "@repo/library/deep/nested/module";

greet();
Component;
deep;

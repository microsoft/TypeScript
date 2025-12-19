// @module: node16
// @moduleResolution: node16
// @noEmit: true
// @traceResolution: true

// Test: Wildcard exports should NOT resolve extensionless imports in node16 mode
// This verifies that the fix for bundler mode doesn't affect node16 behavior
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

// @filename: /package.json
{
    "type": "module"
}

// @filename: /app.ts
// This import should FAIL in node16 mode - extensionless imports not supported
import { greet } from "@repo/library/utils";

greet();

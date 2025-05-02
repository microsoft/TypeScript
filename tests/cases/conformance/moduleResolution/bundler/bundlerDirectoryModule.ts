// @module: node18,nodenext
// @moduleResolution: nodenext,bundler
// @noImplicitAny: true
// @noEmit: true
// @traceResolution: true
// @noTypesAndSymbols: true
// @noImplicitReferences: true

// @Filename: /lib/package.json
{
  "main": "./cjs/index.js"
}

// @Filename: /lib/cjs/index.js
export function test() {}

// @Filename: /lib/cjs/index.d.ts
export function test(): void;

// @Filename: /app/test.ts
import { test } from '../lib';

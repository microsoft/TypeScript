// @moduleResolution: node16,nodenext,bundler
// @noEmit: true
// @noTypesAndSymbols: true
// @traceResolution: true
// @strict: true

// @Filename: /node_modules/@restart/hooks/package.json
{
    "name": "@restart/hooks",
    "version": "0.3.25",
    "main": "cjs/index.js",
    "types": "cjs/index.d.ts",
    "module": "esm/index.js"
}

// @Filename: /node_modules/@restart/hooks/useMergedRefs/package.json
{
    "name": "@restart/hooks/useMergedRefs",
    "private": true,
    "main": "../cjs/useMergedRefs.js",
    "module": "../esm/useMergedRefs.js",
    "types": "../esm/useMergedRefs.d.ts"
  }

// @Filename: /node_modules/@restart/hooks/esm/useMergedRefs.d.ts
export {};

// @Filename: /main.ts
import {} from "@restart/hooks/useMergedRefs";

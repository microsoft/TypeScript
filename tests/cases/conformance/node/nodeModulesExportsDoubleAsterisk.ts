// @module: node18,nodenext
// @noTypesAndSymbols: true
// @noEmit: true

// @Filename: /node_modules/double-asterisk/package.json
{
    "name": "double-asterisk",
    "version": "1.0.0",
    "type": "module",
    "exports": {
      "./a/*/b/*/c/*": "./example.js"
    }
}

// @Filename: /node_modules/double-asterisk/example.d.ts
export {};

// @Filename: /main.mts
import {} from "double-asterisk/a/*/b/*/c/*";

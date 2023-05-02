// @noEmit: true
// @moduleResolution: node16,nodenext
// @noTypesAndSymbols: true
// @traceResolution: true

// @filename: /node_modules/foo/package.json
{   
    "name": "foo",
    "version": "1.0.0",
    "exports": {
        "types": null,
        "require": "./index.js"
    }
}

// @filename: /node_modules/foo/index.js
module.exports = { a: 'a' };

// @filename: /node_modules/foo/index.d.ts
export declare const a: 'a'

// @filename: /a.ts
export { a } from "foo";


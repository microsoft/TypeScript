// @target: esnext
// @module: esnext
// @ignoreDeprecations: 6.0
// @noTypesAndSymbols: true

// @Filename: /a.ts
// With ignoreDeprecations: "6.0", import assertions should not produce a deprecation error.
import json from "./package.json" assert { type: "json" };

// @Filename: /b.ts
import * as data from "./data.json" assert { type: "json" };

// @Filename: /c.ts
export { default as config } from "./config.json" assert { type: "json" };

// @Filename: /package.json
{}

// @Filename: /data.json
{}

// @Filename: /config.json
{}

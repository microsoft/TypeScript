// @target: esnext
// @module: esnext
// @noTypesAndSymbols: true

// @Filename: /a.ts
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

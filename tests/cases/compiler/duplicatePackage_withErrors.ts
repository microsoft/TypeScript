// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
export { x } from "x";

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export const x = 1 + 1;

// @Filename: /node_modules/a/node_modules/x/package.json
{ "name": "x", "version": "1.2.3" }

// @Filename: /node_modules/b/index.d.ts
export { x } from "x";

// @Filename: /node_modules/b/node_modules/x/index.d.ts
content not parsed

// @Filename: /node_modules/b/node_modules/x/package.json
{ "name": "x", "version": "1.2.3" }

// @Filename: /src/a.ts
import { x as xa } from "a";
import { x as xb } from "b";

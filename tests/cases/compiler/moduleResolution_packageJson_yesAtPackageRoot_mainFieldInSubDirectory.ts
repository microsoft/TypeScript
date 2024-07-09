// @traceResolution: true

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3", "main": "src/index.js" }

// @Filename: /node_modules/foo/src/index.d.ts
export const x: number;

// @Filename: /index.ts
import { x } from "foo";

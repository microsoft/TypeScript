// moduleSuffixes has one entry and there's a matching package with a specific path.
// @fullEmitPaths: true
// @filename: /tsconfig.json
{
	"compilerOptions": {
		"allowJs": true,
		"checkJs": false,
		"outDir": "bin",
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [".ios"]
	}
}

// @filename: /node_modules/some-library/foo.ios.js
"use strict";
exports.__esModule = true;
function iosfoo() {}
exports.iosfoo = iosfoo;
// @filename: /node_modules/some-library/foo.ios.d.ts
export declare function iosfoo(): void;
// @filename: /node_modules/some-library/foo.js
"use strict";
exports.__esModule = true;
function basefoo() {}
exports.basefoo = basefoo;
// @filename: /node_modules/some-library/foo.d.ts
export declare function basefoo(): void;

// @filename: /index.ts
import { iosfoo } from "some-library/foo";

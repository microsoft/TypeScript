// moduleSuffixes has one entry and there's a matching package.
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

// @filename: /node_modules/some-library/index.ios.js
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
// @filename: /node_modules/some-library/index.ios.d.ts
export declare function ios(): void;
// @filename: /node_modules/some-library/index.js
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;
// @filename: /node_modules/some-library/index.d.ts
export declare function base(): void;

// @filename: /index.ts
import { ios } from "some-library";

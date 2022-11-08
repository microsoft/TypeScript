// moduleSuffixes has one entry and there's a matching package. use the 'paths' option to map the package.
// @fullEmitPaths: true
// @filename: /tsconfig.json
{
	"compilerOptions": {
		"allowJs": true,
		"checkJs": false,
		"outDir": "bin",
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [".ios"],
		"baseUrl": "/",
		"paths": {
			"some-library": ["node_modules/some-library/lib"],
			"some-library/*": ["node_modules/some-library/lib/*"]
		}
	}
}

// @filename: /node_modules/some-library/lib/index.ios.js
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
// @filename: /node_modules/some-library/lib/index.ios.d.ts
export declare function ios(): void;
// @filename: /node_modules/some-library/lib/index.js
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;
// @filename: /node_modules/some-library/lib/index.d.ts
export declare function base(): void;

// @filename: /test.ts
import { ios } from "some-library";
import { ios as ios2 } from "some-library/index";
import { ios as ios3 } from "some-library/index.js";

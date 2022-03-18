// moduleSuffixes has one entry and there's a matching file. module name explicitly includes JS file extension.
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

// @filename: /index.ts
import { ios } from "./foo.js";
// @filename: /foo.ios.js
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
// @filename: /foo.js
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;

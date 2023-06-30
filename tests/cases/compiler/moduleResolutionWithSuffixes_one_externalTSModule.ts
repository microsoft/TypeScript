// moduleSuffixes has one entry and there's a matching package with TS files.
// @fullEmitPaths: true
// @filename: /tsconfig.json
{
	"compilerOptions": {
		"outDir": "bin",
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [".ios"]
	}
}

// @filename: /node_modules/some-library/index.ios.ts
export function ios() {}
// @filename: /node_modules/some-library/index.ts
export function base() {}
// @filename: /test.ts
import { ios } from "some-library";

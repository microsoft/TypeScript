// moduleSuffixes has one entry and there's a matching dir with an index file.

// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [".ios"]
	}
}

// @filename: /index.ts
import { ios } from "./foo";
// @filename: /foo/index.ios.ts
export function ios() {}
// @filename: /foo/index.ts
export function base() {}
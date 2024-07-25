// moduleSuffixes has one entry and there's a matching file.

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
// @filename: /foo.ios.ts
export function ios() {}
// @filename: /foo.ts
export function base() {}

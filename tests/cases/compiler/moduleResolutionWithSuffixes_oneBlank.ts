// moduleSuffixes has one blank entry. Normal module resolution should occur.

// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": [""]
	}
}

// @filename: /index.ts
import { base } from "./foo";
// @filename: /foo.ts
export function base() {}

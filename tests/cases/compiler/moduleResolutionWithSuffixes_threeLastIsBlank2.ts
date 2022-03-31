// moduleSuffixes has three entries, and the last one is blank. Module resolution should match on the second suffix.

// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": ["-ios", "__native", ""]
	}
}

// @filename: /index.ts
import { native } from "./foo";
// @filename: /foo__native.ts
export function native() {}
// @filename: /foo.ts
export function base() {}

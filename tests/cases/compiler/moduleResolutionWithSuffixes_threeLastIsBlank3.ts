// moduleSuffixes has three entries, and the last one is blank. Module resolution should match on the blank suffix.

// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": ["-ios", "__native", ""]
	}
}

// @filename: /index.ts
import { base } from "./foo";
// @filename: /foo.ts
export function base() {}

// moduleSuffixes has three entries, and the last one is blank. Module resolution should match on the first suffix.

// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
		"moduleSuffixes": ["-ios", "__native", ""]
	}
}

// @filename: /index.ts
import { ios } from "./foo";
// @filename: /foo-ios.ts
export function ios() {}
// @filename: /foo__native.ts
export function native() {}
// @filename: /foo.ts
export function base() {}

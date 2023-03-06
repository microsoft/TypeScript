// moduleSuffixes has one entry but there isn't a matching file. Module resolution should fail.

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
// @filename: /foo.ts
export function base() {}

// moduleSuffixes has three entries, and the last one is blank. Module resolution should fail.

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

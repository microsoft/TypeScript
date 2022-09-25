// moduleSuffixes is not specified. Normal module resolution should occur.
// @filename: /tsconfig.json
{
	"compilerOptions": {
		"moduleResolution": "node",
		"traceResolution": true,
	}
}
// @filename: /index.ts
import { base } from "./foo";
// @filename: /foo.ts
export function base() {}

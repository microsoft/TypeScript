// @filename: /tsconfig.json
{
	"compilerOptions": {
		"outDir": "lib",
		"target": "ES6",
		"module": "ES6",
		"baseUrl": "/",
		"moduleResolution": "Node",
		"noImplicitAny": true,
		"traceResolution": true,
		"paths": {
			"foo/*": ["node_modules/foo/lib/*"]
		}
	}
}

// @filename: /node_modules/foo/lib/test.js
export function test() {
	console.log("test");
}

// @filename: /node_modules/foo/lib/test.d.ts
export declare function test(): void;

// @filename: /relative.js
export function relative() {
	console.log("test");
}

// @filename: /relative.d.ts
export declare function relative(): void;


// @filename: /test.ts
import { test } from "foo/test.js";
import { test as test2 } from "foo/test";
import { relative } from "./relative.js";
import { relative as relative2 } from "./relative";



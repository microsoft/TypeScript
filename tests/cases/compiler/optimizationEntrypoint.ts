// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: index.ts

// @filename: index.ts
export * from "./a";

// @filename: a.ts
import {Main as BaseMain} from "./b";

export class Main extends BaseMain {
	memberc: string;
}

// @filename: b.ts
import {Main as BaseMain} from "./c";

export class Main extends BaseMain {
	member2: string;
}

// @filename: c.ts
export class Main {
	member1: string;
}
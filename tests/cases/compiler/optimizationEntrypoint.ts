// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
export * from "./a";
export {Detail} from "./b";

export interface Inner {
	item4: number;
}

// @Filename: a.ts
import {Main as BaseMain, Inner as Middle} from "./b";

export class Main extends BaseMain {
	memberc: Middle;
}

export interface Inner {
	item3: number;
}

// @Filename: b.ts
import {Main as BaseMain, Inner as Innermost} from "./c";

export class Main extends BaseMain {
	member2: Innermost;
	details: Detail;
}

export interface Inner {
	item2: number;
}

export interface Detail {
	id: string;
}

// @Filename: c.ts
export class Main {
	member1: string;
}

export interface Inner {
	item: number;
}
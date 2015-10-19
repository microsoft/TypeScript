// @module: amd
// @outFile: bundled.js
// @optimizationEntrypoint: tests/cases/compiler/index.ts
// @declaration: true

// @Filename: index.ts
export * from "./a";
export {Detail, Detail as DetailMock, Detail as DetailReal} from "./b";

export interface Inner {
	item4: number;
}

export interface default_1 { // make sure generated names don't clash
	number: number;
}

export {default as BBaseMain, Inner as Middle} from "./b";
export {default as CBaseMain, Inner as Innermost} from "./c";
export {default} from "./a";

// @Filename: a.ts
import {default as BaseMain, Inner as Middle} from "./b";

export default class Main extends BaseMain {
	memberc: Middle;
}

export interface Inner {
	item3: number;
}

// @Filename: b.ts
import {default as BaseMain, Inner as Innermost} from "./c";

export default class Main extends BaseMain {
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
export default class Main {
	member1: string;
}

export interface Inner {
	item: number;
}
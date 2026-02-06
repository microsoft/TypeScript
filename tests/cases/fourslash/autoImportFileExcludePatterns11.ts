/// <reference path="fourslash.ts" />

// @Filename: /src/vs/test.ts
//// import { Parts } from './parts';
//// export class /**/Extended implements Parts {
//// }

// @Filename: /src/vs/parts.ts
//// import { Event } from '../thing';
//// export interface Parts {
//// 	readonly options: Event;
//// }

// @Filename: /src/event/event.ts
//// export interface Event {
//// 	(): string;
//// }

// @Filename: /src/thing.ts
//// import { Event } from './event/event';
//// export { Event };

// @Filename: /src/a.ts
//// import './thing'
//// declare module './thing' {
//// 	interface Event {
//// 		c: string;
//// 	}
//// }


verify.codeFix({
    description: "Implement interface 'Parts'",
    newFileContent: 
`import { Event } from '../event/event';
import { Parts } from './parts';
export class Extended implements Parts {
    options: Event;
}`,
    preferences: {
        autoImportFileExcludePatterns: ["src/thing.ts"],
    }
});

/// <reference path="fourslash.ts" />

// @Filename: /src/vs/workbench/test.ts
//// import { Parts } from './parts';
//// export class /**/EditorParts implements Parts { }

// @Filename: /src/vs/event/event.ts
//// export interface Event {
//// 	(): string;
//// }

// @Filename: /src/vs/workbench/parts.ts
//// import { Event } from '../event/event';
//// export interface Parts {
//// 	readonly options: Event;
//// }

// @Filename: /src/vs/workbench/workbench.ts
//// import { Event } from './workbench2';
//// export { Event };

// @Filename: /src/vs/workbench/workbench2.ts
//// import { Event } from '../event/event';
//// export { Event };

verify.codeFix({
    description: "Implement interface 'Parts'",
    newFileContent: 
`import { Event } from '../event/event';
import { Parts } from './parts';
export class EditorParts implements Parts {
    options: Event;
}`,
    preferences: {
        autoImportFileExcludePatterns: ["src/vs/workbench/workbench*"],
    }
});

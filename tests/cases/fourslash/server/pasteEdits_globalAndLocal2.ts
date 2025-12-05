/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// [||]

// @Filename: /home/src/workspaces/project/test.ts
//// import { Disposable } from './lifecycle';
//// [|export interface EditingService extends Disposable { }|]

// @Filename: /home/src/workspaces/project/lifecycle.ts
//// export interface Disposable {
//// 	(): string;
//// }

// @Filename: /home/src/workspaces/project/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["target.ts", "globals.d.ts", "test.ts", "lifecycle.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        copiedFrom: { file: "/home/src/workspaces/project/test.ts", range: [ranges[1]] },
        pastedText: [ `export interface EditingService extends Disposable { }` ],
        pasteLocations: [ranges[0]],
    },
    newFileContents: {
        "/home/src/workspaces/project/target.ts":
`import { Disposable } from './lifecycle';

export interface EditingService extends Disposable { }`

    }
});
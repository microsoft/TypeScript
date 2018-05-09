/// <reference path='fourslash.ts'/>
// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
////import [|{| "name": "useAX", "isWriteAccess": true, "isDefinition": true |}X|] from "x";
////export function a(x: [|X|]): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
////export default class /*defAX*/[|{| "isWriteAccess": true, "isDefinition": true |}X|] {
////    private x: number;
////}

// @Filename: /node_modules/a/node_modules/x/package.json
////{ "name": "x", "version": "1.2.3" }

// @Filename: /node_modules/b/index.d.ts
////import [|{| "name": "useBX", "isWriteAccess": true, "isDefinition": true |}X|] from "x";
////export const b: [|X|];

// @Filename: /node_modules/b/node_modules/x/index.d.ts
////export default class /*defBX*/[|{| "isWriteAccess": true, "isDefinition": true |}X|] {
////    private x: number;
////}

// @Filename: /node_modules/b/node_modules/x/package.json
////{ "name": "x", "version": "1.2.3" }

// @Filename: /src/a.ts
////import { a } from "a";
////import { b } from "b";
////a(/*error*/b);

goTo.file("/src/a.ts");
verify.numberOfErrorsInCurrentFile(0);
verify.goToDefinition("useAX", "defAX");
verify.goToDefinition("useBX", "defAX");

const [r0, r1, r2, r3, r4, r5] = test.ranges();
const aImport = { definition: "(alias) class X\nimport X", ranges: [r0, r1] };
const def = { definition: "class X", ranges: [r2] };
const bImport = { definition: "(alias) class X\nimport X", ranges: [r3, r4] };
verify.referenceGroups([r0, r1], [aImport, def, bImport]);
verify.referenceGroups([r2, r5], [def, aImport, bImport]);
verify.referenceGroups([r3, r4], [bImport, def, aImport]);

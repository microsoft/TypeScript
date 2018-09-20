/// <reference path='fourslash.ts'/>
// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
////import X from "x";
////export function a(x: X): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
////export default class /*defAX*/X {
////    private x: number;
////}

// @Filename: /node_modules/a/node_modules/x/package.json
////{ "name": "x", "version": "1.2./*aVersionPatch*/3" }

// @Filename: /node_modules/b/index.d.ts
////import X from "x";
////export const b: X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
////export default class /*defBX*/X {
////    private x: number;
////}

// @Filename: /node_modules/b/node_modules/x/package.json
////{ "name": "x", "version": "1.2./*bVersionPatch*/3" }

// @Filename: /src/a.ts
////import { a } from "a";
////import { b } from "b";
////a(/*error*/b);

goTo.file("/src/a.ts");
verify.numberOfErrorsInCurrentFile(0);

testChangeAndChangeBack("aVersionPatch", "defAX");
testChangeAndChangeBack("bVersionPatch", "defBX");

function testChangeAndChangeBack(versionPatch: string, def: string) {
    goTo.marker(versionPatch);
    edit.insert("4");
    goTo.marker(def);
    edit.insert(" ");

    // No longer have identical packageId, so we get errors.
    verify.errorExistsAfterMarker("error");

    // Undo the change.
    goTo.marker(versionPatch);
    edit.deleteAtCaret();
    goTo.marker(def);
    edit.deleteAtCaret();

    // Back to being identical.
    goTo.file("/src/a.ts");
    verify.numberOfErrorsInCurrentFile(0);
}

/// <reference path="fourslash.ts" />

//@Filename: test.tsx
//@jsx: react
////declare var React: any;
////const z = <div>{[].map(x => </**/

// This test exists because it used to crash: #31347
goTo.marker();
verify.noSignatureHelpForTriggerReason({ kind: "characterTyped", triggerCharacter: "<" });

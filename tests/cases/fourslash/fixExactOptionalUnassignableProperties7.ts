/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @Filename: fixExactOptionalUnassignableProperties6.ts
// based on snapshotterInjected.ts in microsoft/playwright
//// class Feh {
////     _requestFinished(error?: string) {
////         this._finishedPromiseCallback({ error/**/ });
////     }
////     private _finishedPromiseCallback: (arg: { error?: string }) => void = () => {};
//// }
verify.codeFixAvailable([ ]);
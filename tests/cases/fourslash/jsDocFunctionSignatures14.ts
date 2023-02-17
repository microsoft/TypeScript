///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * This callback type is called `requestCallback` and is displayed as a global symbol.
//// *
//// * @callback requestCallback
//// * @param {number} [responseCode=500]
//// * @param {string} [responseMessage="Not handled"]
//// */
////
/////**
//// * Does something asynchronously and executes the callback on completion.
//// * @param {requestCallback} cb - The callback that handles the response.
//// */
//// function doSomethingAsynchronously(cb) {
////    cb(/**/)
////};
////

verify.baselineSignatureHelp()

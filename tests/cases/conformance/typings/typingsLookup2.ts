// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// This tests that an @types package with `"typings": null` is not automatically included.
// (If it were, this test would break because there are no typings to be found.)

// @filename: /tsconfig.json
{}

// @filename: /node_modules/@types/angular2/package.json
{ "typings": null }

// @filename: /a.ts

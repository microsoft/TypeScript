# TypeScript (Native Preview)

This package provides a preview build of [the native port of TypeScript](https://devblogs.microsoft.com/typescript/typescript-native-port/).
Not all features are implemented yet.

This package is intended for testing and experimentation.
It will eventually be replaced by the official TypeScript package.

## Usage

For TypeScript 7.0 RC and later, use `tsc` just like for TypeScript 6.0.

For other builds, use the `tsgo` command just like you would use `tsc`:

```sh
npx tsgo --help
```

## Issues and Feedback

The native port of TypeScript is still in progress.
We expect many gaps, but are seeking experimentation and feedback.
If you have found differences that are not yet known, we encourage you to leave feedback on [the issue tracker](https://github.com/microsoft/TypeScript/tsc/issues).

## Development

Enums in `src/enums` are represented as `.js` / `.d.ts` pairs. Import them using relative `.js` paths:
TypeScript resolves the enum declarations, while Node loads the JavaScript implementations without a build or enum transformation.
Most are generated from metadata and Go source; run `npx hereby generate:enums` from the repository root to regenerate those pairs.
The package build scripts copy both files into `dist/enums`, since TypeScript does not emit input declaration files.

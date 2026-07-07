# TypeScript 7

This extension provides the native implementation of the TypeScript language service. It provides features like go-to-definition, completions, errors and diagnostics, quick info/tooltip hovers, and more.

## Usage

1. Install the extension from the marketplace.
2. Open a TypeScript or JavaScript file (`.ts`) in your editor.
3. Activate the extension with the command `TypeScript: Enable TypeScript 7`, or update your settings below:

## Configuration

You can enable this extension by modifying the following settings:

```jsonc
{
    // UI Setting:
    // TypeScript 7 > Experimental: Use Tsgo
    "js/ts.experimental.useTsgo": true,

    // Optional: use a local TypeScript package directory.
    "js/ts.tsdk.path": "./node_modules/typescript"
}
```

## Feedback

If you encounter any issues or have suggestions for improvement, please open an issue on the [GitHub repository](https://github.com/microsoft/typescript-go).

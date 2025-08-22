# TypeScript 7

[Not sure what this is? Read the announcement post!](https://devblogs.microsoft.com/typescript/typescript-native-port/)

## Preview

A preview build is available on npm as [`@typescript/native-preview`](https://www.npmjs.com/package/@typescript/native-preview).

```sh
npm install @typescript/native-preview
npx tsgo # Use this as you would tsc.
```

A preview VS Code extension is [available on the VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.native-preview).

To use this, set this in your VS Code settings:

```json
{
    "typescript.experimental.useTsgo": true
}
```

## What Works So Far?

This is still a work in progress and is not yet at full feature parity with TypeScript. Bugs may exist. Please check this list carefully before logging a new issue or assuming an intentional change.

| Feature | Status | Notes |
|---------|--------|-------|
| Program creation | done | Same files and module resolution as TS 5.8. Not all resolution modes supported yet. |
| Parsing/scanning | done | Exact same syntax errors as TS 5.8 |
| Commandline and `tsconfig.json` parsing | mostly done | Missing --help, --init. |
| Type resolution | done | Same types as TS 5.8. |
| Type checking | done | Same errors, locations, and messages as TS 5.8. Types printback in errors may display differently. |
| JavaScript-specific inference and JSDoc | in progress | Mostly complete, but intentionally lacking some features. Declaration emit not complete. |
| JSX | done | - |
| Declaration emit | in progress | Most common features are in place, but some edge cases and feature flags are still unhandled. |
| Emit (JS output) | in progress | `target: esnext` well-supported, other targets may have gaps. |
| Watch mode | prototype | Watches files and rebuilds, but no incremental rechecking. Not optimized. |
| Build mode / project references | done | - |
| Incremental build | done | - |
| Language service (LSP) | in progress | Some functionality (errors, hover, go to def, refs, sig help). More features coming soon. |
| API | not ready | - |

Definitions:

 * **done** aka "believed done": We're not currently aware of any deficits or major left work to do. OK to log bugs
 * **in progress**: currently being worked on; some features may work and some might not. OK to log panics, but nothing else please
 * **prototype**: proof-of-concept only; do not log bugs
 * **not ready**: either haven't even started yet, or far enough from ready that you shouldn't bother messing with it yet

## Other Notes

Long-term, we expect that this repo and its contents will be merged into `microsoft/TypeScript`.
As a result, the repo and issue tracker for typescript-go will eventually be closed, so treat discussions/issues accordingly.

For a list of intentional changes with respect to TypeScript 5.7, see CHANGES.md.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [Contributor License Agreements](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

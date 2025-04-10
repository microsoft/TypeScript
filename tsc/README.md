# TypeScript 7

[Not sure what this is? Read the announcement post!](https://devblogs.microsoft.com/typescript/typescript-native-port/)

This repo is very much under active development; as such there are no published artifacts at this time.
Interested developers can clone and run locally to try out things as they become available.

## How to Build and Run

This repo uses [Go 1.24 or higher](https://go.dev/dl/), [Rust 1.85 or higher](https://www.rust-lang.org/tools/install), [Node.js with npm](https://nodejs.org/), and [`hereby`](https://www.npmjs.com/package/hereby).

For tests and code generation, this repo contains a git submodule to the main TypeScript repo pointing to the commit being ported.
When cloning, you'll want to clone with submodules:

```sh
git clone --recurse-submodules https://github.com/microsoft/typescript-go.git
```

If you have already cloned the repo, you can initialize the submodule with:

```sh
git submodule update --init --recursive
```

With the submodule in place and `npm ci`, you can run tasks via `hereby`, similar to the TypeScript repo:

```sh
hereby build          # Verify that the project builds
hereby test           # Run all tests
hereby install-tools  # Install additional tools such as linters
hereby lint           # Run all linters
hereby format         # Format all code
hereby generate       # Generate all Go code (e.g. diagnostics, committed to repo)
```

Additional tasks are a work in progress.

`hereby` is not required to work on the repo; the regular `go` tooling (e.g., `go build`, `go test ./...`) will work as expected.
`hereby` tasks are provided as a convenience for those familiar with the TypeScript repo.

### Running `tsgo`

After running `hereby build`, you can run `built/local/tsgo`, which behaves mostly the same as `tsc` (respects tsconfig, but also prints out perf stats).
This is mainly a testing entry point; for higher fidelity with regular `tsc`, run `tsgo tsc [flags]`, which behaves more similarly to `tsc`.

### Running LSP Prototype

To try the prototype LSP experience:

* Run VS Code in the repo workspace (`code .`)
* Copy `.vscode/launch.template.json` to `.vscode/launch.json`
* <kbd>F5</kbd> (or `Debug: Start Debugging` from the command palette)

This will launch a new VS Code instance which uses the Corsa LS as the backend. If correctly set up, you should see "typescript-go" as an option in the Output pane:

![LSP Prototype Screenshot](.github/ls-screenshot.png)


## What Works So Far?

This is still a work in progress and is not yet at full feature parity with TypeScript. Bugs may exist. Please check this list carefully before logging a new issue or assuming an intentional change.

| Feature | Status | Notes |
|---------|--------|-------|
| Program creation | done | Same files and module resolution as TS5.8. Not all resolution modes supported yet. |
| Parsing/scanning | done | Exact same syntax errors as TS5.8 |
| Commandline and `tsconfig.json` parsing | mostly done | Entry point slightly different for now |
| Type resolution | done | Same types as TS5.8 |
| Type checking | done | Same errors, locations, and messages as TS5.8. Types printback in errors may display differently (in progress) |
| JavaScript-specific inference and JS Doc | not ready | - |
| JSX | done | - |
| Declaration emit | not ready | Coming soon |
| Emit (JS output) | in progress | `target: esnext` well-supported, other targets may have gaps |
| Watch mode | prototype | Watches files and rebuilds, but no incremental rechecking |
| Build mode / project references | not ready | - |
| Incremental build | not ready | - |
| Language service (LSP) | prototype | Minimal functionality (errors, hover, go to def). More features coming soon |
| API | not ready | - |

Definitions:

 * **done** aka "believed done": We're not currently aware of any deficits or major left work to do. OK to log bugs
 * **in progress**: currently being worked on; some features may work and some might not. OK to log panics, but nothing else please
 * **prototype**: proof-of-concept only; do not log bugs
 * **not ready**: either haven't even started yet, or far enough from ready that you shouldn't bother messing with it yet

## Other Notes

Long-term, we expect this repo is that its contents will be merged into `microsoft/TypeScript`.
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

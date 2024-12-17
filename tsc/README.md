# typescript-go

```console
$ go run github.com/microsoft/typescript-go/cmd/tsgo@latest
```

For a list of intentional changes with respect to Typescript 5.7, see CHANGES.md.

## Local development

This repo uses Go and TypeScript. For a full development experience, you'll need to have both installed.

For tests and code generation, this repo contains a git submodule to the main TypeScript repo pointing to the commit being ported.
When cloning, you'll want to clone with submodules:

```console
$ git clone --recurse-submodules https://github.com/microsoft/typescript-go.git
```

If you have already cloned the repo, you can initialize the submodule with:

```console
$ git submodule update --init --recursive
```

With the submodule in place and `npm ci`, you can run tasks via `hereby`, similar to the TypeScript repo:

```console
$ hereby build          # Verify that the project builds
$ hereby test           # Run all tests
$ hereby install-tools  # Install additional tools such as linters
$ hereby lint           # Run all linters
$ hereby format         # Format all code
$ hereby generate       # Generate all Go code (e.g. diagnostics, committed to repo)
```

Additional tasks are a work in progress.

`hereby` is not required to work on the repo; the regular `go` tooling (e.g., `go build`, `go test ./...`) will work as expected.
`hereby` tasks are provided as a convenience for those familiar with the TypeScript repo.

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

module github.com/microsoft/typescript-go

go 1.25

require (
	github.com/dlclark/regexp2 v1.11.5
	github.com/go-json-experiment/json v0.0.0-20250910080747-cc2cfa0554c3
	github.com/google/go-cmp v0.7.0
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.0.2
	golang.org/x/sync v0.17.0
	golang.org/x/sys v0.36.0
	golang.org/x/term v0.35.0
	golang.org/x/text v0.29.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.0.9 // indirect
	github.com/matryer/moq v0.6.0 // indirect
	golang.org/x/mod v0.27.0 // indirect
	golang.org/x/tools v0.36.0 // indirect
	mvdan.cc/gofumpt v0.9.1 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
	mvdan.cc/gofumpt
)

ignore (
	./_extension
	./_packages
	./_submodules
	./built
	./coverage
	node_modules
)

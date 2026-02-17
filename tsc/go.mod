module github.com/microsoft/typescript-go

go 1.26

require (
	github.com/Microsoft/go-winio v0.6.2
	github.com/dlclark/regexp2 v1.11.5
	github.com/go-json-experiment/json v0.0.0-20260214004413-d219187c3433
	github.com/google/go-cmp v0.7.0
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.1.0
	golang.org/x/sync v0.19.0
	golang.org/x/sys v0.41.0
	golang.org/x/term v0.40.0
	golang.org/x/text v0.34.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.2.10 // indirect
	github.com/matryer/moq v0.6.0 // indirect
	golang.org/x/mod v0.33.0 // indirect
	golang.org/x/tools v0.42.0 // indirect
	mvdan.cc/gofumpt v0.9.2 // indirect
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

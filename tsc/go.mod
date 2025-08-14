module github.com/microsoft/typescript-go

go 1.25

require (
	github.com/dlclark/regexp2 v1.11.5
	github.com/go-json-experiment/json v0.0.0-20250811204210-4789234c3ea1
	github.com/google/go-cmp v0.7.0
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.0.2
	golang.org/x/sync v0.16.0
	golang.org/x/sys v0.35.0
	golang.org/x/term v0.34.0
	golang.org/x/text v0.28.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.0.9 // indirect
	github.com/matryer/moq v0.5.3 // indirect
	golang.org/x/mod v0.26.0 // indirect
	golang.org/x/tools v0.35.0 // indirect
	mvdan.cc/gofumpt v0.8.0 // indirect
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

module github.com/microsoft/typescript-go

go 1.26

require (
	github.com/Microsoft/go-winio v0.6.2
	github.com/go-json-experiment/json v0.0.0-20260214004413-d219187c3433
	github.com/google/go-cmp v0.7.0
	github.com/mackerelio/go-osstat v0.2.7
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.1.0
	golang.org/x/sync v0.20.0
	golang.org/x/sys v0.43.0
	golang.org/x/term v0.42.0
	golang.org/x/text v0.36.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.2.10 // indirect
	github.com/matryer/moq v0.7.1 // indirect
	golang.org/x/mod v0.35.0 // indirect
	golang.org/x/tools v0.44.0 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
)

ignore (
	./_extension
	./_packages
	./_submodules
	./built
	./coverage
	node_modules
)

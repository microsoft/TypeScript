module github.com/microsoft/TypeScript/tsc

go 1.27

require (
	github.com/Microsoft/go-winio v0.6.2
	github.com/google/go-cmp v0.7.0
	github.com/klauspost/compress v1.19.0
	github.com/mackerelio/go-osstat v0.2.8
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.1.0
	golang.org/x/sync v0.22.0
	golang.org/x/sys v0.47.0
	golang.org/x/term v0.45.0
	golang.org/x/text v0.41.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.2.10 // indirect
	github.com/matryer/moq v0.7.1 // indirect
	github.com/pmezard/go-difflib v1.0.1-0.20181226105442-5d4384ee4fb2 // indirect
	golang.org/x/mod v0.40.0 // indirect
	golang.org/x/tools v0.49.0 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
)

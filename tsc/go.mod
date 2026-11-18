module github.com/microsoft/TypeScript/tsc

go 1.27

require (
	github.com/Microsoft/go-winio v0.6.4
	github.com/google/go-cmp v0.7.0
	github.com/klauspost/compress v1.20.3
	github.com/mackerelio/go-osstat v0.2.8
	github.com/peter-evans/patience v0.3.0
	github.com/zeebo/xxh3 v1.1.0
	golang.org/x/sync v0.24.0
	golang.org/x/sys v0.49.0
	golang.org/x/term v0.47.0
	golang.org/x/text v0.43.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/klauspost/cpuid/v2 v2.2.10 // indirect
	github.com/matryer/moq v0.8.1 // indirect
	github.com/pmezard/go-difflib v1.0.1-0.20181226105442-5d4384ee4fb2 // indirect
	golang.org/x/mod v0.42.0 // indirect
	golang.org/x/tools v0.52.0 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
)

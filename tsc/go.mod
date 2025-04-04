module github.com/microsoft/typescript-go

go 1.24.0

require (
	github.com/dlclark/regexp2 v1.11.5
	github.com/go-json-experiment/json v0.0.0-20250223041408-d3c622f1b874
	github.com/google/go-cmp v0.7.0
	github.com/pkg/diff v0.0.0-20241224192749-4e6772a4315c
	golang.org/x/sys v0.31.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/matryer/moq v0.5.3 // indirect
	golang.org/x/mod v0.23.0 // indirect
	golang.org/x/sync v0.11.0 // indirect
	golang.org/x/tools v0.30.0 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
)

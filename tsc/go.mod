module github.com/microsoft/typescript-go

go 1.24.0

require (
	github.com/dlclark/regexp2 v1.11.5
	github.com/go-json-experiment/json v0.0.0-20250714165856-be8212f5270d
	github.com/google/go-cmp v0.7.0
	github.com/peter-evans/patience v0.3.0
	golang.org/x/sync v0.16.0
	golang.org/x/sys v0.34.0
	gotest.tools/v3 v3.5.2
)

require (
	github.com/matryer/moq v0.5.3 // indirect
	golang.org/x/mod v0.24.0 // indirect
	golang.org/x/tools v0.32.0 // indirect
	mvdan.cc/gofumpt v0.8.0 // indirect
)

tool (
	github.com/matryer/moq
	golang.org/x/tools/cmd/stringer
	mvdan.cc/gofumpt
)

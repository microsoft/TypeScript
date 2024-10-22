// Package diagnostics contains generated localizable diagnostic messages.
package diagnostics

//go:generate go run generate.go -output ./diagnostics_generated.go
//go:generate go run golang.org/x/tools/cmd/stringer -type=Category -output=stringer_generated.go

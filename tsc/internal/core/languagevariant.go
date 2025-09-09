package core

//go:generate go tool golang.org/x/tools/cmd/stringer -type=LanguageVariant -output=languagevariant_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -w languagevariant_stringer_generated.go

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

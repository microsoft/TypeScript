package core

//go:generate go run golang.org/x/tools/cmd/stringer -type=LanguageVariant -output=languagevariant_stringer_generated.go

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

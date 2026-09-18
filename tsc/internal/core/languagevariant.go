package core

//go:generate node ../../../tools/scripts/gen/generateStringer.mts -type=LanguageVariant -output=languagevariant_stringer_generated.go

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

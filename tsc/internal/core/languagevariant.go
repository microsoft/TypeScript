package core

//go:generate npx hereby generate:languagevariant

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

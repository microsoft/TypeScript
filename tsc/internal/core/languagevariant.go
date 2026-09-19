package core

//go:generate npm run --silent cache -- --input $GOFILE --output languagevariant_stringer_generated.go --command go tool golang.org/x/tools/cmd/stringer -type=LanguageVariant -output=languagevariant_stringer_generated.go --command dprint fmt languagevariant_stringer_generated.go

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

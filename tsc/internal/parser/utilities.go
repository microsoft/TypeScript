package parser

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func ensureScriptKind(fileName string, scriptKind core.ScriptKind) core.ScriptKind {
	// Using scriptKind as a condition handles both:
	// - 'scriptKind' is unspecified and thus it is `undefined`
	// - 'scriptKind' is set and it is `Unknown` (0)
	// If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
	// to get the ScriptKind from the file name. If it cannot be resolved
	// from the file name then the default 'TS' script kind is returned.
	if scriptKind == core.ScriptKindUnknown {
		scriptKind = getScriptKindFromFileName(fileName)
	}
	if scriptKind == core.ScriptKindUnknown {
		scriptKind = core.ScriptKindTS
	}
	return scriptKind
}

func getScriptKindFromFileName(fileName string) core.ScriptKind {
	dotPos := strings.LastIndex(fileName, ".")
	if dotPos >= 0 {
		switch strings.ToLower(fileName[dotPos:]) {
		case tspath.ExtensionJs, tspath.ExtensionCjs, tspath.ExtensionMjs:
			return core.ScriptKindJS
		case tspath.ExtensionJsx:
			return core.ScriptKindJSX
		case tspath.ExtensionTs, tspath.ExtensionCts, tspath.ExtensionMts:
			return core.ScriptKindTS
		case tspath.ExtensionTsx:
			return core.ScriptKindTSX
		case tspath.ExtensionJson:
			return core.ScriptKindJSON
		}
	}
	return core.ScriptKindUnknown
}

func getLanguageVariant(scriptKind core.ScriptKind) core.LanguageVariant {
	switch scriptKind {
	case core.ScriptKindTSX, core.ScriptKindJSX, core.ScriptKindJS, core.ScriptKindJSON:
		// .tsx and .jsx files are treated as jsx language variant.
		return core.LanguageVariantJSX
	}
	return core.LanguageVariantStandard
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

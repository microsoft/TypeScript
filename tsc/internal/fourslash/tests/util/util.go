package fourslash_test

import (
	"fmt"
	"slices"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func PtrTo[T any](v T) *T {
	return &v
}

var Ignored = struct{}{}

var DefaultCommitCharacters = []string{".", ",", ";"}

var CompletionGlobalThisItem = &lsproto.CompletionItem{
	Label:    "globalThis",
	Kind:     PtrTo(lsproto.CompletionItemKindModule),
	SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
}

var CompletionUndefinedVarItem = &lsproto.CompletionItem{
	Label:    "undefined",
	Kind:     PtrTo(lsproto.CompletionItemKindVariable),
	SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
}

var CompletionGlobalVars = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Infinity",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NaN",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURI",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURIComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURI",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURIComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "eval",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isFinite",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isNaN",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseFloat",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseInt",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "escape",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "unescape",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
}

var CompletionGlobalKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "as",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "await",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "break",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "case",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "catch",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "class",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "const",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "continue",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "debugger",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "default",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "delete",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "do",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "else",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "enum",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "export",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "extends",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "finally",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "for",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "function",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "if",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "implements",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "import",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "in",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "instanceof",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "interface",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "let",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "module",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "namespace",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "new",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "package",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "return",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "satisfies",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "super",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "switch",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "this",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "throw",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "try",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "type",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "using",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "var",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "while",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "with",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "yield",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionGlobalTypeDecls = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "Symbol",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyKey",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptorMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ObjectConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FunctionConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisParameterType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OmitThisParameter",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CallableFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NewableFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IArguments",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StringConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BooleanConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NumberConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TemplateStringsArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportMeta",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportCallOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAssertions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAttributes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DateConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpMatchArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpExecArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadonlyArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConcatArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypedPropertyDescriptor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MethodDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParameterDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMemberDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadataObject",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMethodDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassGetterDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassSetterDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassFieldDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseConstructorLike",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseLike",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Promise",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Awaited",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayLike",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Partial",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Required",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pick",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Record",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Exclude",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Extract",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Omit",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonNullable",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Parameters",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstructorParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReturnType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InstanceType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uppercase",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lowercase",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Capitalize",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uncapitalize",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NoInfer",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisType",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferLike",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferView",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataViewConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKey",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKeyTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionTypeKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "undefined",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionClassElementKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "accessor",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "constructor",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "get",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "override",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "set",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "static",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionClassElementInJSKeywords = getInJSKeywords(CompletionClassElementKeywords)

var CompletionGlobals = sortCompletionItems(slices.Concat(
	CompletionGlobalVars,
	CompletionGlobalKeywords,
	[]fourslash.CompletionsExpectedItem{
		CompletionGlobalThisItem,
		CompletionUndefinedVarItem,
	},
))

func sortCompletionItems(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	compareStrings := stringutil.CompareStringsCaseInsensitiveThenSensitive
	items = slices.Clone(items)
	slices.SortStableFunc(items, func(a fourslash.CompletionsExpectedItem, b fourslash.CompletionsExpectedItem) int {
		defaultSortText := string(ls.SortTextLocationPriority)
		var aSortText, bSortText string
		switch a := a.(type) {
		case *lsproto.CompletionItem:
			if a.SortText != nil {
				aSortText = *a.SortText
			}
		}
		switch b := b.(type) {
		case *lsproto.CompletionItem:
			if b.SortText != nil {
				bSortText = *b.SortText
			}
		}
		aSortText = core.OrElse(aSortText, defaultSortText)
		bSortText = core.OrElse(bSortText, defaultSortText)
		bySortText := compareStrings(aSortText, bSortText)
		if bySortText != 0 {
			return bySortText
		}
		var aLabel, bLabel string
		switch a := a.(type) {
		case *lsproto.CompletionItem:
			aLabel = a.Label
		case string:
			aLabel = a
		default:
			panic(fmt.Sprintf("unexpected completion item type: %T", a))
		}
		switch b := b.(type) {
		case *lsproto.CompletionItem:
			bLabel = b.Label
		case string:
			bLabel = b
		default:
			panic(fmt.Sprintf("unexpected completion item type: %T", b))
		}
		return compareStrings(aLabel, bLabel)
	})
	return items
}

func CompletionGlobalsPlus(items []fourslash.CompletionsExpectedItem, noLib bool) []fourslash.CompletionsExpectedItem {
	var all []fourslash.CompletionsExpectedItem
	if noLib {
		all = slices.Concat(
			items,
			[]fourslash.CompletionsExpectedItem{CompletionGlobalThisItem, CompletionUndefinedVarItem},
			CompletionGlobalKeywords,
		)
	} else {
		all = slices.Concat(items, CompletionGlobals)
	}
	return sortCompletionItems(all)
}

func CompletionGlobalTypesPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(slices.Concat(
		CompletionGlobalTypeDecls,
		[]fourslash.CompletionsExpectedItem{CompletionGlobalThisItem},
		CompletionTypeKeywords,
		items,
	))
}

var CompletionGlobalTypes = CompletionGlobalTypesPlus(nil)

func getInJSKeywords(keywords []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return core.Filter(keywords, func(item fourslash.CompletionsExpectedItem) bool {
		var label string
		switch item := item.(type) {
		case *lsproto.CompletionItem:
			label = item.Label
		case string:
			label = item
		default:
			panic(fmt.Sprintf("unexpected completion item type: %T", item))
		}
		switch label {
		case "enum", "interface", "implements", "private", "protected", "public", "abstract",
			"any", "boolean", "declare", "infer", "is", "keyof", "module", "namespace", "never",
			"readonly", "number", "object", "string", "symbol", "type", "unique", "override",
			"unknown", "global", "bigint":
			return false
		default:
			return true
		}
	},
	)
}

var CompletionGlobalInJSKeywords = getInJSKeywords(CompletionGlobalKeywords)

func CompletionGlobalsInJSPlus(items []fourslash.CompletionsExpectedItem, noLib bool) []fourslash.CompletionsExpectedItem {
	all := slices.Concat(
		items,
		[]fourslash.CompletionsExpectedItem{CompletionGlobalThisItem, CompletionUndefinedVarItem},
		CompletionGlobalInJSKeywords,
	)
	if !noLib {
		all = append(all, CompletionGlobalVars...)
	}
	return sortCompletionItems(all)
}

var CompletionConstructorParameterKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "override",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionFunctionMembers = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label: "apply",
		Kind:  PtrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "arguments",
		Kind:  PtrTo(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "bind",
		Kind:  PtrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "call",
		Kind:  PtrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "caller",
		Kind:  PtrTo(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "length",
		Kind:  PtrTo(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "toString",
		Kind:  PtrTo(lsproto.CompletionItemKindMethod),
	},
}

func CompletionFunctionMembersPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		slices.Concat(
			CompletionFunctionMembers,
			items,
		),
	)
}

var CompletionFunctionMembersWithPrototype = sortCompletionItems(slices.Concat(
	CompletionFunctionMembers,
	[]fourslash.CompletionsExpectedItem{
		&lsproto.CompletionItem{
			Label: "prototype",
			Kind:  PtrTo(lsproto.CompletionItemKindField),
		},
	},
))

func CompletionFunctionMembersWithPrototypePlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		slices.Concat(
			CompletionFunctionMembersWithPrototype,
			items,
		),
	)
}

func CompletionTypeKeywordsPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		slices.Concat(
			CompletionTypeKeywords,
			items,
		),
	)
}

var CompletionTypeAssertionKeywords = CompletionGlobalTypesPlus([]fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "const",
		Kind:     PtrTo(lsproto.CompletionItemKindKeyword),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
})

func ToAny[T any](items []T) []any {
	return core.Map(items, func(item T) any { return item })
}

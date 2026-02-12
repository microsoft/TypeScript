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

var Ignored = struct{}{}

var DefaultCommitCharacters = []string{".", ",", ";"}

var CompletionGlobalThisItem = &lsproto.CompletionItem{
	Label:    "globalThis",
	Kind:     new(lsproto.CompletionItemKindModule),
	SortText: new(string(ls.SortTextGlobalsOrKeywords)),
}

var CompletionUndefinedVarItem = &lsproto.CompletionItem{
	Label:    "undefined",
	Kind:     new(lsproto.CompletionItemKindVariable),
	SortText: new(string(ls.SortTextGlobalsOrKeywords)),
}

var CompletionGlobalVars = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Infinity",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     new(lsproto.CompletionItemKindModule),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NaN",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURI",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURIComponent",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURI",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURIComponent",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "eval",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isFinite",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isNaN",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseFloat",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseInt",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "escape",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "unescape",
		Kind:     new(lsproto.CompletionItemKindFunction),
		SortText: new(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
}

var CompletionGlobalKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "as",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "await",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "break",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "case",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "catch",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "class",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "const",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "continue",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "debugger",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "default",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "delete",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "do",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "else",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "enum",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "export",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "extends",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "finally",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "for",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "function",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "if",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "implements",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "import",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "in",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "instanceof",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "interface",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "let",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "module",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "namespace",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "new",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "package",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "return",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "satisfies",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "super",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "switch",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "this",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "throw",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "try",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "type",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "using",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "var",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "while",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "with",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "yield",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionGlobalTypeDecls = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "Symbol",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyKey",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptorMap",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ObjectConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FunctionConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisParameterType",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OmitThisParameter",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CallableFunction",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NewableFunction",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IArguments",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StringConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BooleanConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NumberConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TemplateStringsArray",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportMeta",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportCallOptions",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAssertions",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAttributes",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DateConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpMatchArray",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpExecArray",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIErrorConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadonlyArray",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConcatArray",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypedPropertyDescriptor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecorator",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDecorator",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MethodDecorator",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParameterDecorator",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMemberDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorContext",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadata",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadataObject",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMethodDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassGetterDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassSetterDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorTarget",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorResult",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassFieldDecoratorContext",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseConstructorLike",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseLike",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Promise",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Awaited",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayLike",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Partial",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Required",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Readonly",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pick",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Record",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Exclude",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Extract",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Omit",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonNullable",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Parameters",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstructorParameters",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReturnType",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InstanceType",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uppercase",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lowercase",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Capitalize",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uncapitalize",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NoInfer",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisType",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferTypes",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferLike",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferView",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataViewConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     new(lsproto.CompletionItemKindVariable),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64ArrayConstructor",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     new(lsproto.CompletionItemKindModule),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKey",
		Kind:     new(lsproto.CompletionItemKindClass),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKeyTypes",
		Kind:     new(lsproto.CompletionItemKindInterface),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionTypeKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "undefined",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionClassElementKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "accessor",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "constructor",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "get",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "override",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "set",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "static",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
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
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var CompletionFunctionMembers = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label: "apply",
		Kind:  new(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "arguments",
		Kind:  new(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "bind",
		Kind:  new(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "call",
		Kind:  new(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "caller",
		Kind:  new(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "length",
		Kind:  new(lsproto.CompletionItemKindField),
	},
	&lsproto.CompletionItem{
		Label: "toString",
		Kind:  new(lsproto.CompletionItemKindMethod),
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
			Kind:  new(lsproto.CompletionItemKindField),
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
		Kind:     new(lsproto.CompletionItemKindKeyword),
		SortText: new(string(ls.SortTextGlobalsOrKeywords)),
	},
})

func ToAny[T any](items []T) []any {
	return core.Map(items, func(item T) any { return item })
}

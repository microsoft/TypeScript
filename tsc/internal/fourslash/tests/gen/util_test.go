package fourslash_test

import (
	"cmp"
	"fmt"
	"slices"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func ptrTo[T any](v T) *T {
	return &v
}

var ignored = struct{}{}

var defaultCommitCharacters = []string{".", ",", ";"}

var completionGlobalThisItem = &lsproto.CompletionItem{
	Label:    "globalThis",
	Kind:     ptrTo(lsproto.CompletionItemKindModule),
	SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
}

var completionUndefinedVarItem = &lsproto.CompletionItem{
	Label:    "undefined",
	Kind:     ptrTo(lsproto.CompletionItemKindVariable),
	SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
}

var completionGlobalVars = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "AbortController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignal",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ActiveXObject",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEffect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationTimeline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Attr",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Audio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDestinationNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioListener",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParam",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParamMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorklet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAssertionResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttestationResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BarProp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BeforeUnloadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Blob",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BroadcastChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ByteLengthQueuingStrategy",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CDATASection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSS",
		Kind:     ptrTo(lsproto.CompletionItemKindModule),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSAnimation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSConditionRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSContainerRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSCounterStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFaceRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFeatureValuesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontPaletteValuesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSGroupingRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImageValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImportRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframeRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerBlockRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerStatementRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathClamp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathInvert",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMax",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMin",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathNegate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathProduct",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathSum",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMediaRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNamespaceRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNestedDeclarations",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPageRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspective",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPropertyRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRotate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRuleList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScale",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScopeRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkew",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewX",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewY",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStartingStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleDeclaration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSupportsRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTranslate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnitValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSVariableReferenceValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSViewTransitionRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Cache",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCaptureMediaStreamTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasGradient",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPattern",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CharacterData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Clipboard",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Comment",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CountQueuingStrategy",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Credential",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialsContainer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Crypto",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKey",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementRegistry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomStateSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMException",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMImplementation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParser",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPoint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuad",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMTokenList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransfer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItemList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecompressionStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DelayNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Document",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentFragment",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimeline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentType",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Element",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementInternals",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunk",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunk",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Enumerator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Event",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventCounts",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSource",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "File",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWritableFileStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFace",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FragmentDirective",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Gamepad",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadButton",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticActuator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Geolocation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationCoordinates",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPositionError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAllCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAnchorElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAreaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAudioElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBaseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLButtonElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCanvasElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDetailsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDialogElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDivElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLEmbedElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFieldSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormControlsCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHtmlElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLIFrameElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLInputElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLIElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLabelElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLegendElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLinkElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMapElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMenuElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMetaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMeterElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLModElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLObjectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptGroupElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionsCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOutputElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParagraphElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPictureElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPreElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLProgressElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLQuoteElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLScriptElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSelectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSlotElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSourceElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSpanElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLStyleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCaptionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCellElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableColElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableRowElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableSectionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTemplateElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTextAreaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTimeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTitleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTrackElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUnknownElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Headers",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Highlight",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightRegistry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "History",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursor",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorWithValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabase",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBFactory",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndex",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBKeyRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStore",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransaction",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleDeadline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Image",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrackList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Infinity",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputDeviceInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     ptrTo(lsproto.CompletionItemKindModule),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyboardEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LargestContentfulPaint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Location",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lock",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccess",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutputMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPort",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilities",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevices",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySession",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatusMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemAccess",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeys",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSession",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSource",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioDestinationNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePort",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecord",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NaN",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedNodeMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationActivation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Navigator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Node",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeFilter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeIterator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Notification",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioCompletionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvas",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasRenderingContext2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Option",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverconstrainedError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Path2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentAddress",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Performance",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMark",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasure",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigationTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverEntryList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformancePaintTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceResourceTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceServerTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWave",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatus",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Permissions",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindow",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProcessingInstruction",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseRejectionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredential",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscription",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSender",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpScriptTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSender",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescription",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsReport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RadioNodeList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Range",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableByteStreamController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlayback",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Report",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportBody",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Request",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverSize",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Response",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAngle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateMotionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateTransformElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedAngle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedBoolean",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedEnumeration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedInteger",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLength",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLengthList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumber",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumberList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPreserveAspectRatio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedString",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedTransformList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimationElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGCircleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGClipPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGComponentTransferFunctionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDefsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDescElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGEllipseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEBlendElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEColorMatrixElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEComponentTransferElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFECompositeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEConvolveMatrixElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDiffuseLightingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDisplacementMapElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDistantLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDropShadowElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFloodElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncAElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncBElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEGaussianBlurElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeNodeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMorphologyElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEOffsetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEPointLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpecularLightingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpotLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETileElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETurbulenceElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGForeignObjectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGeometryElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGraphicsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLength",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLengthList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLineElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLinearGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMarkerElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMaskElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMetadataElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumber",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumberList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPatternElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPoint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPointList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolygonElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolylineElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPreserveAspectRatio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRadialGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGScriptElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStopElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStringList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStyleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSwitchElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSymbolElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTSpanElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextContentElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPositioningElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTitleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransformList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUnitTypes",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGViewElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SafeArray",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Screen",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Selection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRoot",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SharedWorker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionAlternative",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResult",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResultList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesis",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtterance",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisVoice",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Storage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMapReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheetList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubtleCrypto",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Text",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextMetrics",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimeRanges",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Touch",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TreeWalker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URL",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URLSearchParams",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UserActivation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTCue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTRegion",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityState",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VarDate",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpace",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPlaybackQuality",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionTypeSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WSH",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WScript",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLock",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebAssembly",
		Kind:     ptrTo(lsproto.CompletionItemKindModule),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLActiveInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLFramebuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLProgram",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLQuery",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderbuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSampler",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShaderPrecisionFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSync",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTexture",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTransformFeedback",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLUniformLocation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObject",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebKitCSSMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocket",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportBidirectionalStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportDatagramDuplexStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Window",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worklet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultWriter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLDocument",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestUpload",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLSerializer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathExpression",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathResult",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XSLTProcessor",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "addEventListener",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "alert",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "atob",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "btoa",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "caches",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "cancelAnimationFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "cancelIdleCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "clearInterval",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "clearTimeout",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "close",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "closed",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "confirm",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "console",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "createImageBitmap",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "crossOriginIsolated",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "crypto",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "customElements",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURI",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "decodeURIComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "devicePixelRatio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "dispatchEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "document",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURI",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "encodeURIComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "eval",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "fetch",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "focus",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "frameElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "frames",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "getComputedStyle",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "getSelection",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "history",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "importScripts",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "indexedDB",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "innerHeight",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "innerWidth",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isFinite",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isNaN",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "isSecureContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "length",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "localStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "location",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "locationbar",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "matchMedia",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "menubar",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "moveBy",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "moveTo",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "navigator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onabort",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onafterprint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationcancel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationiteration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onauxclick",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeinput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeprint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforetoggle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeunload",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onblur",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncancel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncanplay",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncanplaythrough",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onclick",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onclose",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextlost",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextmenu",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextrestored",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncopy",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncuechange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncut",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondblclick",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondevicemotion",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondeviceorientation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondeviceorientationabsolute",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondrag",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragenter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragleave",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragover",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondrop",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondurationchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onemptied",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onended",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onerror",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onfocus",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onformdata",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongamepadconnected",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongamepaddisconnected",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongotpointercapture",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onhashchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oninput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oninvalid",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onkeydown",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onkeyup",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onlanguagechange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onload",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadeddata",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadedmetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onlostpointercapture",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmessage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmessageerror",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmousedown",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseenter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseleave",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmousemove",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseout",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseover",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseup",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onoffline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ononline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpagehide",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpagereveal",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpageshow",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpageswap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpaste",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpause",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onplay",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onplaying",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointercancel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerdown",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerenter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerleave",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointermove",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerout",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerover",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerup",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpopstate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onprogress",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onratechange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onrejectionhandled",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onreset",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onresize",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onscroll",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onscrollend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsecuritypolicyviolation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onseeked",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onseeking",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselectionchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselectstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onslotchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onstalled",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onstorage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsubmit",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsuspend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontimeupdate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontoggle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchcancel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchmove",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitioncancel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionrun",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onunhandledrejection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onvolumechange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onwaiting",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onwheel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "open",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "opener",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "origin",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "outerHeight",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "outerWidth",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "pageXOffset",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "pageYOffset",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseFloat",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parseInt",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "performance",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "personalbar",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "postMessage",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "print",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "prompt",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "queueMicrotask",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "removeEventListener",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "reportError",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "requestAnimationFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "requestIdleCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "resizeBy",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "resizeTo",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screen",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenLeft",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenTop",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenX",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenY",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scroll",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollBy",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollTo",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollX",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollY",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollbars",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "self",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "sessionStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "setInterval",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "setTimeout",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "speechSynthesis",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "statusbar",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "stop",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "structuredClone",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "toString",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "toolbar",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "top",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "visualViewport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "webkitURL",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "window",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "External",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDirectoryElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDocument",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFontElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMarqueeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParamElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeType",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeTypeArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "Plugin",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PluginArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "TextEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "blur",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "captureEvents",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "clientInformation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "escape",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "event",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "external",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "name",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onkeypress",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onorientationchange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onunload",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationiteration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationstart",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkittransitionend",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "orientation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "releaseEvents",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "status",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "unescape",
		Kind:     ptrTo(lsproto.CompletionItemKindFunction),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
}

var completionGlobalKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "as",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "await",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "break",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "case",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "catch",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "class",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "const",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "continue",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "debugger",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "default",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "delete",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "do",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "else",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "enum",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "export",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "extends",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "finally",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "for",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "function",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "if",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "implements",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "import",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "in",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "instanceof",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "interface",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "let",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "module",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "namespace",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "new",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "package",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "return",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "satisfies",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "super",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "switch",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "this",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "throw",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "try",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "type",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "using",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "var",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "while",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "with",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "yield",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var completionGlobalTypeDecls = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "ANGLE_instanced_arrays",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ARIAMixin",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignal",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignalEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractWorker",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractWorkerEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ActiveXObject",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AddEventListenerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AddressErrors",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesCbcParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesCtrParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesDerivedKeyParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesGcmParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesKeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesKeyGenParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Algorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlgorithmIdentifier",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlignSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AllowSharedBufferSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlphaOption",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animatable",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEffect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationFrameProvider",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlayState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationReplaceState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationTimeline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AppendMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferLike",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferTypes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferView",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayLike",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AssignedNodesOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AttestationConveyancePreference",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Attr",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextLatencyCategory",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataCopyToOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataOutputCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderSupport",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDestinationNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderSupport",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioListener",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParam",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParamMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioSampleFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNodeEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioTimestamp",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorklet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNodeEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientInputs",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientInputsJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientOutputs",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFInputs",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFOutputs",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFValues",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAssertionResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttachment",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttestationResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorSelectionCriteria",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFill",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillAddressKind",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillBase",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillContactField",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillContactKind",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillCredentialField",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillField",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillNormalField",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillSection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoKeyword",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutomationRate",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AvcBitstreamFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AvcEncoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Awaited",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BarProp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Base64URLString",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContextEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BeforeUnloadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BigInteger",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BinaryType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BitrateMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Blob",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobPart",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobPropertyBag",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Body",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BodyInit",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BooleanConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BroadcastChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BroadcastChannelEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BufferSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ByteLengthQueuingStrategy",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CDATASection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "COSEAlgorithmIdentifier",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSAnimation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSConditionRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSContainerRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSCounterStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFaceRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFeatureValuesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontPaletteValuesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSGroupingRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImageValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImportRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframeRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframesRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordish",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerBlockRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerStatementRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathClamp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathInvert",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMax",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMin",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathNegate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathOperator",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathProduct",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathSum",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponentOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMediaRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNamespaceRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNestedDeclarations",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumberish",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericBaseType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericType",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPageRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspective",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspectiveValue",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPropertyRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRotate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRuleList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScale",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScopeRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkew",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewX",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewY",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStartingStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleDeclaration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheetInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSupportsRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTranslate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnitValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedSegment",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSVariableReferenceValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSViewTransitionRule",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Cache",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheQueryOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CallableFunction",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanPlayTypeResult",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCaptureMediaStreamTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCompositing",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDirection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDrawImage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDrawPath",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFillRule",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFillStrokeStyles",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFilters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontKerning",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontStretch",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontVariantCaps",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasGradient",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageData",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageSmoothing",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasLineCap",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasLineJoin",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPath",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPathDrawingStyles",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPattern",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRect",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2DSettings",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasSettings",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasShadowStyles",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasState",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasText",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextAlign",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextBaseline",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextDrawingStyles",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextRendering",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasUserInterface",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Capitalize",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPositionFromPointOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelCountMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelInterpretation",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CharacterData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CheckVisibilityOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChildNode",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorResult",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecorator",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassFieldDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassGetterDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMemberDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMethodDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassSetterDecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClientQueryOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClientTypes",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Clipboard",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItemData",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItemOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItems",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CodecState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ColorGamut",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ColorSpaceConversion",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Comment",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositeOperation",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositeOperationOrAuto",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ComputedEffectTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ComputedKeyframe",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConcatArray",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Console",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainBoolean",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainBooleanParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDOMString",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDOMStringParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDouble",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDoubleRange",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainULong",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainULongRange",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstructorParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CountQueuingStrategy",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Credential",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialCreationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialMediationRequirement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialPropertiesOutput",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialRequestOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialsContainer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Crypto",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKey",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKeyPair",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementRegistry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomStateSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMException",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMHighResTimeStamp",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMImplementation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix2DInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParser",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParserSupportedType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPoint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuad",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuadInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMTokenList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransfer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItemList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataView",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataViewConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Date",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DateConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecodeErrorCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecodeSuccessCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecompressionStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorContext",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecoratorMetadataObject",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DelayNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DelayOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventAcceleration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventAccelerationInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventRotationRate",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventRotationRateInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DirectionSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DisplayCaptureSurfaceType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DisplayMediaStreamOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DistanceModelType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Document",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentFragment",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentOrShadowRoot",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentReadyState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimeline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimelineOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentType",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentVisibilityState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DoubleRange",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_blend_minmax",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_color_buffer_float",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_color_buffer_half_float",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_float_blend",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_frag_depth",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_sRGB",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_shader_texture_lod",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_compression_bptc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_compression_rgtc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_filter_anisotropic",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_norm16",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyGenParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyImportParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcdhKeyDeriveParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcdsaParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EffectTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Element",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementCSSInlineStyle",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementContentEditable",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementCreationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementDefinitionOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementInternals",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunk",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkOutputCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunk",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkOutputCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EndOfStreamError",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EndingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Enumerator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EnumeratorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EpochTimeStamp",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Event",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventCounts",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListener",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerObject",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerOrEventListenerObject",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventModifierInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSource",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSourceEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSourceInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Exclude",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Extract",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "File",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FilePropertyBag",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReaderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystem",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemCreateWritableOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntriesCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntryCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFlags",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemGetDirectoryOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemGetFileOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandleKind",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemRemoveOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWritableFileStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWriteChunkType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FillMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float32List",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Float64ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontDisplay",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFace",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceDescriptors",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceLoadStatus",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadStatus",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEntryValue",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FragmentDirective",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FrameRequestCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FullscreenNavigationUI",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FullscreenOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FunctionConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FunctionStringCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLbitfield",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLboolean",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLclampf",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLenum",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLfloat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLint",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLint64",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLintptr",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLsizei",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLsizeiptr",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLuint",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLuint64",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GPUError",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Gamepad",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadButton",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEffectParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticActuator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticEffectType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticsResult",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadMappingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GenericTransformStream",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Geolocation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationCoordinates",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPositionError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetAnimationsOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetHTMLOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetNotificationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetRootNodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalCompositeOperation",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalEventHandlers",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalEventHandlersEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAllCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAnchorElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAreaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAudioElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBaseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLButtonElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCanvasElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollectionBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollectionOf",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDetailsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDialogElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDivElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementDeprecatedTagNameMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementTagNameMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLEmbedElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFieldSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormControlsCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHtmlElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHyperlinkElementUtils",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLIFrameElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLInputElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLIElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLabelElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLegendElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLinkElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMapElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMenuElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMetaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMeterElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLModElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLObjectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptGroupElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionsCollection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGScriptElement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOutputElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParagraphElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPictureElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPreElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLProgressElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLQuoteElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLScriptElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSelectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSlotElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSourceElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSpanElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLStyleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCaptionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCellElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableColElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableRowElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableSectionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTemplateElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTextAreaElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTimeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTitleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTrackElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUListElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUnknownElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HardwareAcceleration",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashAlgorithmIdentifier",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HdrMetadataType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Headers",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HeadersInit",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Highlight",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightRegistry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "History",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HkdfParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacImportParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacKeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacKeyGenParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IArguments",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursor",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorDirection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorWithValue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabase",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabaseEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabaseInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBFactory",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndex",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndexParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBKeyRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStore",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStoreParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequestEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequestEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequestReadyState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransaction",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionDurability",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBValidKey",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ITextWriter",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleDeadline",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleRequestCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleRequestOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContextSettings",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBufferSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageData",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDataSettings",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecodeResult",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoderInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageEncodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageOrientation",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageSmoothingQuality",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrackList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAttributes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportCallOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportMeta",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputDeviceInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InsertPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InstanceType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int16ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int32List",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Int8ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     ptrTo(lsproto.CompletionItemKindModule),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IterationCompositeOperation",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JsonWebKey",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KHR_parallel_shader_compile",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyUsage",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyboardEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyboardEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Keyframe",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeAnimationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffectOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LargestContentfulPaint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LatencyMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LineAlignSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LineAndPositionSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LinkStyle",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Location",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lock",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockGrantedCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManagerSnapshot",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lowercase",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccess",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccessEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutput",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutputMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPort",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortConnectionState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortDeviceState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElementTagNameMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilities",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesDecodingInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesEncodingInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDecodingConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDecodingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceKind",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevices",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevicesEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncodingConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncodingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaImage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySession",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionClosedReason",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatus",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatusMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemAccess",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemMediaCapability",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeys",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeysPolicy",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeysRequirement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadataInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaPositionState",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaProvider",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorderOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSession",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionAction",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionActionDetails",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionActionHandler",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionPlaybackState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSource",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceHandle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioDestinationNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamConstraints",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackCapabilities",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackConstraintSet",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackConstraints",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackSettings",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackSupportedConstraints",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventTargetEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePort",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePortEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MethodDecorator",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MultiCacheQueryOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserverInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecord",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecordType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedCurve",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedNodeMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationActivation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntryEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadState",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationTimingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Navigator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorAutomationInformation",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorBadge",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorConcurrentHardware",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorContentUtils",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorCookies",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorID",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLanguage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLocks",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorOnLine",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorPlugins",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NewableFunction",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NoInfer",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Node",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeFilter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeIterator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeListOf",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonDocumentTypeChildNode",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonElementParentNode",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonNullable",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Notification",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationDirection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationPermission",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationPermissionCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Number",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NumberConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_draw_buffers_indexed",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_element_index_uint",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_fbo_render_mipmap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_standard_derivatives",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_float",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_float_linear",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_half_float",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_half_float_linear",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_vertex_array_object",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OVR_multiview2",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Object",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ObjectConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioCompletionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioCompletionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContextEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContextOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvas",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasRenderingContext2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenRenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenRenderingContextId",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Omit",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OmitThisParameter",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnBeforeUnloadEventHandler",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnBeforeUnloadEventHandlerNonNull",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnErrorEventHandler",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnErrorEventHandlerNonNull",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalEffectTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalPostfixToken",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalPrefixToken",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OpusBitstreamFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OpusEncoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OrientationType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverSampleType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverconstrainedError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PanningModelType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParameterDecorator",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Parameters",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParentNode",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Partial",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Path2D",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PayerErrors",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentAddress",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentComplete",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentCurrencyAmount",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsModifier",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsUpdate",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentItem",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodData",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponse",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponseEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentShippingOption",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentShippingType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentValidationErrors",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pbkdf2Params",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Performance",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntryList",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMark",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMarkOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasure",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasureOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigationTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverEntryList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformancePaintTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceResourceTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceServerTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWave",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWaveConstraints",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWaveOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionDescriptor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionName",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatus",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatusEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Permissions",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pick",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindow",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindowEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PlaneLayout",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PlaybackDirection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerLockOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopoverInvokerElement",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionAlignSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionErrorCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PredefinedColorSpace",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PremultiplyAlpha",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PresentationStyle",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProcessingInstruction",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Promise",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseConstructorLike",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseLike",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseRejectionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseRejectionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDecorator",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDefinition",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDescriptorMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyIndexedKeyframes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyKey",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredential",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialClientCapabilities",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialCreationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialCreationOptionsJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialDescriptor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialDescriptorJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialEntity",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRequestOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRequestOptionsJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRpEntity",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialUserEntity",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialUserEntityJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushEncryptionKeyName",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscription",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionJSON",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptionsInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategy",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategyInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategySize",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCAnswerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCBundlePolicy",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificateExpiration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSender",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSenderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDegradationPreference",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsFingerprint",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsRole",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransportEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransportState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrameMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrameMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrameType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorDetailType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidate",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidateInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidatePair",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidatePairStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidateType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceComponent",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceConnectionState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceGathererState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceGatheringState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceProtocol",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceRole",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceServer",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTcpCandidateType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportPolicy",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCInboundRtpStreamStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCLocalSessionDescriptionInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOfferAnswerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOfferOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOutboundRtpStreamStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionErrorCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPriorityType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCQualityLimitationReason",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCReceivedRtpStreamStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtcpMuxPolicy",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtcpParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCapabilities",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodec",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodecParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodingParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpContributingSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpEncodingParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpHeaderExtensionCapability",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpHeaderExtensionParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiveParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpScriptTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSendParameters",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSender",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpStreamStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSynchronizationSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiverDirection",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiverInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransportEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransportState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSdpType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSentRtpStreamStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescription",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescriptionCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescriptionInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSetParameterOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSignalingState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsIceCandidatePairState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsReport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTransportStats",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RadioNodeList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Range",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableByteStreamController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamController",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultReader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamGenericReader",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamGetReaderOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamIteratorOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadDoneResult",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadResult",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadValueResult",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReader",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReaderMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableWritablePair",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Readonly",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadonlyArray",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadyState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Record",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RecordingState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferenceErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReferrerPolicy",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExp",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpExecArray",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpMatchArray",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegistrationOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlayback",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackAvailabilityCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Report",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportBody",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportList",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserverCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserverOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Request",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestCache",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestCredentials",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestDestination",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestPriority",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestRedirect",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Required",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResidentKeyRequirement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserver",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverBoxOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverEntry",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverSize",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeQuality",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Response",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResponseInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResponseType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReturnType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedImportParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedKeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedKeyGenParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaKeyAlgorithm",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaKeyGenParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaOaepParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaOtherPrimesInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaPssParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAngle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateMotionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateTransformElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedAngle",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedBoolean",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedEnumeration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedInteger",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLength",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLengthList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumber",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumberList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPoints",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPreserveAspectRatio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedString",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedTransformList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimationElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGBoundingBoxOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGCircleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGClipPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGComponentTransferFunctionElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDefsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDescElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElementTagNameMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGEllipseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEBlendElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEColorMatrixElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEComponentTransferElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFECompositeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEConvolveMatrixElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDiffuseLightingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDisplacementMapElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDistantLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDropShadowElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFloodElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncAElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncBElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncRElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEGaussianBlurElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeNodeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMorphologyElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEOffsetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEPointLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpecularLightingElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpotLightElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETileElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETurbulenceElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterPrimitiveStandardAttributes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFitToViewBox",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGForeignObjectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGeometryElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGraphicsElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGImageElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLength",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLengthList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLineElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLinearGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMarkerElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMaskElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMetadataElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumber",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumberList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPatternElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPoint",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPointList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolygonElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolylineElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPreserveAspectRatio",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRadialGradientElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRect",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRectElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElementEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGScriptElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStopElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStringList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStyleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSwitchElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSymbolElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTSpanElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTests",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextContentElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPathElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPositioningElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTitleElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransform",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransformList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGURIReference",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUnitTypes",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUseElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGViewElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SafeArray",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Screen",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientationEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNodeEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollBehavior",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollIntoViewOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollLogicalPosition",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollRestoration",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollSetting",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollToOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEventDisposition",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Selection",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SelectionMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainerEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistration",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistrationEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerState",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerUpdateViaCache",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRoot",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShareData",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SharedWorker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SlotAssignmentMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Slottable",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferListEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionAlternative",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResult",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResultList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesis",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorCode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtterance",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtteranceEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisVoice",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRange",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRangeInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Storage",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEstimate",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageManager",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StreamPipeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StringConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StructuredSerializeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMap",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMapReadOnly",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheetList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubtleCrypto",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Symbol",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TemplateStringsArray",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TexImageSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Text",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderCommon",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderCommon",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderEncodeIntoResult",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextMetrics",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamReader",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamWriter",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrack",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackKind",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackListEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisParameterType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisType",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimeRanges",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimerHandler",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Touch",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchList",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransferFunction",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Transferable",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Transformer",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerFlushCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerStartCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerTransformCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TreeWalker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypedPropertyDescriptor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ULongRange",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIErrorConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URL",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URLSearchParams",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint16ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint32List",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8Array",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uint8ClampedArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uncapitalize",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingByteSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingDefaultSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSink",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkAbortCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkCloseCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkStartCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkWriteCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSource",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourceCancelCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourcePullCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourceStartCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uppercase",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UserActivation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UserVerificationRequirement",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArrayConstructor",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTCue",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTRegion",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityState",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityStateFlags",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VarDate",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VibratePattern",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorPrimaries",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpace",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpaceInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoConfiguration",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderSupport",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoder",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderBitrateMode",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderConfig",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEncodeOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEncodeOptionsForAvc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderSupport",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFacingModeEnum",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrame",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameBufferInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameCallbackMetadata",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameCopyToOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameOutputCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameRequestCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoMatrixCoefficients",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPixelFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPlaybackQuality",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoTransferCharacteristics",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransition",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionTypeSet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionUpdateCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewportEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VoidFunction",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_color_buffer_float",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_astc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_etc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_etc1",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_pvrtc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_s3tc",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_s3tc_srgb",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_debug_renderer_info",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_debug_shaders",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_depth_texture",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_draw_buffers",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_lose_context",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_multi_draw",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLock",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinel",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinelEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKey",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WeakKeyTypes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebAssembly",
		Kind:     ptrTo(lsproto.CompletionItemKindModule),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebCodecsErrorCallback",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContextBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContextOverloads",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLActiveInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLBuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextAttributes",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLFramebuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLPowerPreference",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLProgram",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLQuery",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderbuffer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContext",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContextBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContextOverloads",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSampler",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShader",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShaderPrecisionFormat",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSync",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTexture",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTransformFeedback",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLUniformLocation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObject",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObjectOES",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebKitCSSMatrix",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocket",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocketEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransport",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportBidirectionalStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportCloseInfo",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportCongestionControl",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportDatagramDuplexStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportError",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportErrorOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportErrorSource",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportHash",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportSendStreamOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEventInit",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Window",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventHandlers",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventHandlersEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowLocalStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowOrWorkerGlobalScope",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowPostMessageOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowProxy",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowSessionStorage",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worker",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worklet",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkletOptions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStream",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultController",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultWriter",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WriteCommandType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WriteParams",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLDocument",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequest",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestBodyInit",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTarget",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTargetEventMap",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestResponseType",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestUpload",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLSerializer",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluator",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluatorBase",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathExpression",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathNSResolver",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathResult",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XSLTProcessor",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "webkitURL",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ClientRect",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ElementTagNameMap",
		Kind:     ptrTo(lsproto.CompletionItemKindClass),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "External",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDirectoryElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDocument",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFontElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMarqueeElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParamElement",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableDataCellElement",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableHeaderCellElement",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAssertions",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeType",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeTypeArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigation",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceTiming",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "Plugin",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PluginArray",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNode",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "StyleMedia",
		Kind:     ptrTo(lsproto.CompletionItemKindInterface),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "TextEvent",
		Kind:     ptrTo(lsproto.CompletionItemKindVariable),
		SortText: ptrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
}

var completionTypeKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "any",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "asserts",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "bigint",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "boolean",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "false",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "infer",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "keyof",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "never",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "null",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "number",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "object",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "string",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "symbol",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "true",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "typeof",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "undefined",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unique",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "unknown",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "void",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var completionClassElementKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "abstract",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "accessor",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "async",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "constructor",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "declare",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "get",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "override",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "set",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "static",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var completionClassElementInJSKeywords = getInJSKeywords(completionClassElementKeywords)

var completionGlobals = sortCompletionItems(append(
	append(completionGlobalVars, completionGlobalKeywords...),
	completionGlobalThisItem,
	completionUndefinedVarItem,
))

func sortCompletionItems(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
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
		bySortText := cmp.Compare(aSortText, bSortText)
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
		return cmp.Compare(aLabel, bLabel)
	})
	return items
}

func completionGlobalsPlus(items []fourslash.CompletionsExpectedItem, noLib bool) []fourslash.CompletionsExpectedItem {
	var all []fourslash.CompletionsExpectedItem
	if noLib {
		all = append(
			append(items, completionGlobalThisItem, completionUndefinedVarItem),
			completionGlobalKeywords...,
		)
	} else {
		all = append(items, completionGlobals...)
	}
	return sortCompletionItems(all)
}

func completionGlobalTypesPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		append(
			append(
				append(completionGlobalTypeDecls, completionGlobalThisItem),
				completionTypeKeywords...,
			),
			items...,
		),
	)
}

var completionGlobalTypes = completionGlobalTypesPlus(nil)

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

var completionGlobalInJSKeywords = getInJSKeywords(completionGlobalKeywords)

func completionGlobalsInJSPlus(items []fourslash.CompletionsExpectedItem, noLib bool) []fourslash.CompletionsExpectedItem {
	var all []fourslash.CompletionsExpectedItem
	all = append(
		append(items, completionGlobalThisItem, completionUndefinedVarItem),
		completionGlobalInJSKeywords...,
	)
	if !noLib {
		all = append(all, completionGlobalVars...)
	}
	return sortCompletionItems(all)
}

var completionConstructorParameterKeywords = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "override",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "private",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "protected",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "public",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "readonly",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
}

var completionFunctionMembers = []fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label: "apply",
		Kind:  ptrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "arguments",
		Kind:  ptrTo(lsproto.CompletionItemKindProperty),
	},
	&lsproto.CompletionItem{
		Label: "bind",
		Kind:  ptrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "call",
		Kind:  ptrTo(lsproto.CompletionItemKindMethod),
	},
	&lsproto.CompletionItem{
		Label: "caller",
		Kind:  ptrTo(lsproto.CompletionItemKindProperty),
	},
	&lsproto.CompletionItem{
		Label: "length",
		Kind:  ptrTo(lsproto.CompletionItemKindProperty),
	},
	&lsproto.CompletionItem{
		Label: "toString",
		Kind:  ptrTo(lsproto.CompletionItemKindMethod),
	},
}

func completionFunctionMembersPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		append(
			completionFunctionMembers,
			items...,
		),
	)
}

var completionFunctionMembersWithPrototype = sortCompletionItems(append(
	completionFunctionMembers,
	&lsproto.CompletionItem{
		Label: "prototype",
		Kind:  ptrTo(lsproto.CompletionItemKindProperty),
	},
))

func completionFunctionMembersWithPrototypePlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		append(
			completionFunctionMembersWithPrototype,
			items...,
		),
	)
}

func completionTypeKeywordsPlus(items []fourslash.CompletionsExpectedItem) []fourslash.CompletionsExpectedItem {
	return sortCompletionItems(
		append(
			completionTypeKeywords,
			items...,
		),
	)
}

var completionTypeAssertionKeywords = completionGlobalTypesPlus([]fourslash.CompletionsExpectedItem{
	&lsproto.CompletionItem{
		Label:    "const",
		Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
		SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
})

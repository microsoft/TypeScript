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
		Label:    "AbortController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignal",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ActiveXObject",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEffect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationTimeline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
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
		Label:    "Attr",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Audio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDestinationNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioListener",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParam",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParamMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorklet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAssertionResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttestationResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BarProp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BeforeUnloadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Blob",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Boolean",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BroadcastChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ByteLengthQueuingStrategy",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CDATASection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSPViolationReportBody",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSS",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSAnimation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSConditionRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSContainerRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSCounterStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFaceRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFeatureValuesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontPaletteValuesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSGroupingRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImageValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImportRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframeRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerBlockRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerStatementRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathClamp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathInvert",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMax",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathNegate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathProduct",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathSum",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMediaRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNamespaceRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNestedDeclarations",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPageRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspective",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPropertyRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRotate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRuleList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScale",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScopeRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkew",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewX",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewY",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStartingStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleDeclaration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSupportsRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTranslate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnitValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSVariableReferenceValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSViewTransitionRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Cache",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCaptureMediaStreamTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasGradient",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPattern",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CharacterData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Clipboard",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Comment",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStore",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStoreManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CountQueuingStrategy",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Credential",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialsContainer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Crypto",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKey",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementRegistry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomStateSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMException",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMImplementation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParser",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPoint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuad",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMTokenList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransfer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItemList",
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
		Label:    "DecompressionStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DelayNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Document",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentFragment",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimeline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentType",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Element",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementInternals",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunk",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunk",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Enumerator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EvalError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Event",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventCounts",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSource",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "File",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWritableFileStream",
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
		Label:    "FocusEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFace",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FragmentDirective",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Function",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Gamepad",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadButton",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticActuator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Geolocation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationCoordinates",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPositionError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAllCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAnchorElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAreaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAudioElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBaseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLButtonElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCanvasElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDetailsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDialogElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDivElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLEmbedElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFieldSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormControlsCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHtmlElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLIFrameElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLInputElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLIElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLabelElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLegendElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLinkElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMapElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMenuElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMetaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMeterElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLModElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLObjectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptGroupElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionsCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOutputElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParagraphElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPictureElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPreElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLProgressElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLQuoteElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLScriptElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSelectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSlotElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSourceElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSpanElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLStyleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCaptionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCellElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableColElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableRowElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableSectionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTemplateElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTextAreaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTimeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTitleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTrackElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUnknownElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Headers",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Highlight",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightRegistry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "History",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursor",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorWithValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabase",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBFactory",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndex",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBKeyRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStore",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransaction",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleDeadline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Image",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageCapture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrackList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Infinity",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputDeviceInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEvent",
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
		Label:    "IntersectionObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverEntry",
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
		Label:    "KeyboardEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LargestContentfulPaint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Location",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lock",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccess",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutputMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPort",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevices",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySession",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatusMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemAccess",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeys",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSession",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSource",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioDestinationNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePort",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecord",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NaN",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedNodeMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationActivation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Navigator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLogin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Node",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeFilter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeIterator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Notification",
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
		Label:    "OfflineAudioCompletionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvas",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasRenderingContext2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Option",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverconstrainedError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Path2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentAddress",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Performance",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMark",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasure",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigationTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverEntryList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformancePaintTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceResourceTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceServerTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWave",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Permissions",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindow",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProcessingInstruction",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseRejectionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredential",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscription",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSender",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpScriptTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSender",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescription",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsReport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RadioNodeList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Range",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RangeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableByteStreamController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultReader",
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
		Label:    "RemotePlayback",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Report",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportBody",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Request",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverSize",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Response",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAngle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateMotionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateTransformElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedAngle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedBoolean",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedEnumeration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedInteger",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLength",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLengthList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumber",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumberList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPreserveAspectRatio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedString",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedTransformList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimationElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGCircleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGClipPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGComponentTransferFunctionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDefsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDescElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGEllipseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEBlendElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEColorMatrixElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEComponentTransferElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFECompositeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEConvolveMatrixElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDiffuseLightingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDisplacementMapElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDistantLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDropShadowElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFloodElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncAElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncBElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEGaussianBlurElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeNodeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMorphologyElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEOffsetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEPointLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpecularLightingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpotLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETileElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETurbulenceElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGForeignObjectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGeometryElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGraphicsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLength",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLengthList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLineElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLinearGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMarkerElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMaskElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMetadataElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumber",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumberList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPatternElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPoint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPointList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolygonElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolylineElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPreserveAspectRatio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRadialGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGScriptElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStopElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStringList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStyleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSwitchElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSymbolElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTSpanElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextContentElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPositioningElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTitleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransformList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUnitTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGViewElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SafeArray",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Screen",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Selection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRoot",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SharedWorker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionAlternative",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResult",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResultList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesis",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtterance",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisVoice",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Storage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "String",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMapReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheetList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubtleCrypto",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SyntaxError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Text",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextMetrics",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimeRanges",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Touch",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TreeWalker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TypeError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URIError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URL",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URLSearchParams",
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
		Label:    "UserActivation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTCue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTRegion",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityState",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VarDate",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpace",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPlaybackQuality",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionTypeSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WSH",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WScript",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLock",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebAssembly",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLActiveInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLFramebuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLProgram",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLQuery",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderbuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSampler",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShaderPrecisionFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSync",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTexture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTransformFeedback",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLUniformLocation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObject",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebKitCSSMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocket",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportBidirectionalStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportDatagramDuplexStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Window",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worklet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultWriter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLDocument",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestUpload",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLSerializer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathExpression",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathResult",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XSLTProcessor",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "addEventListener",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "alert",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "atob",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "btoa",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "caches",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "cancelAnimationFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "cancelIdleCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "clearInterval",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "clearTimeout",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "close",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "closed",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "confirm",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "cookieStore",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "console",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "createImageBitmap",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "crossOriginIsolated",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "crypto",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "customElements",
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
		Label:    "devicePixelRatio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "dispatchEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "document",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "fetch",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "focus",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "frameElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "frames",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "getComputedStyle",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "getSelection",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "history",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "importScripts",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "indexedDB",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "innerHeight",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "innerWidth",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "isSecureContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "length",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "localStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "location",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "locationbar",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "matchMedia",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "menubar",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "moveBy",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "moveTo",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "navigator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onabort",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onafterprint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationcancel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationiteration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onanimationstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onauxclick",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeinput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforematch",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeprint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforetoggle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onbeforeunload",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onblur",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncancel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncanplay",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncanplaythrough",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onclick",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onclose",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextlost",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextmenu",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncontextrestored",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncopy",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncuechange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oncut",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondblclick",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondevicemotion",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondeviceorientation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondeviceorientationabsolute",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondrag",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragenter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragleave",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragover",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondragstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondrop",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ondurationchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onemptied",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onended",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onerror",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onfocus",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onformdata",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongamepadconnected",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongamepaddisconnected",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ongotpointercapture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onhashchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oninput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "oninvalid",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onkeydown",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onkeyup",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onlanguagechange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onload",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadeddata",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadedmetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onloadstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onlostpointercapture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmessage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmessageerror",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmousedown",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseenter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseleave",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmousemove",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseout",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseover",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onmouseup",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onoffline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ononline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpagehide",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpagereveal",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpageshow",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpageswap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpaste",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpause",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onplay",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onplaying",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointercancel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerdown",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerenter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerleave",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerrawupdate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointermove",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerout",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerover",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpointerup",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onpopstate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onprogress",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onratechange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onrejectionhandled",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onreset",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onresize",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onscroll",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onscrollend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsecuritypolicyviolation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onseeked",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onseeking",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselectionchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onselectstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onslotchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onstalled",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onstorage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsubmit",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onsuspend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontimeupdate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontoggle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchcancel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchmove",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontouchstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitioncancel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionrun",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ontransitionstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onunhandledrejection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onvolumechange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onwaiting",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "onwheel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "open",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "opener",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "origin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "originAgentCluster",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "outerHeight",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "outerWidth",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "pageXOffset",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "pageYOffset",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "parent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "performance",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "personalbar",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "postMessage",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "print",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "prompt",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "queueMicrotask",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "removeEventListener",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "reportError",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "requestAnimationFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "requestIdleCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "resizeBy",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "resizeTo",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screen",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenLeft",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenTop",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenX",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "screenY",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scroll",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollBy",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollTo",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollX",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollY",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "scrollbars",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "self",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "sessionStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "setInterval",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "setTimeout",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "speechSynthesis",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "statusbar",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "stop",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "structuredClone",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "toString",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "toolbar",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "top",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "visualViewport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "webkitURL",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "window",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "External",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDirectoryElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDocument",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFontElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMarqueeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParamElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeType",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeTypeArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "Plugin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PluginArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "TextEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "blur",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "captureEvents",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "clientInformation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "escape",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "event",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "external",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "name",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onkeypress",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onorientationchange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onunload",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationiteration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkitanimationstart",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "onwebkittransitionend",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "orientation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "releaseEvents",
		Kind:     PtrTo(lsproto.CompletionItemKindFunction),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "status",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "ANGLE_instanced_arrays",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ARIAMixin",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignal",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbortSignalEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractWorker",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AbstractWorkerEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ActiveXObject",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AddEventListenerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AddressErrors",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesCbcParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesCtrParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesDerivedKeyParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesGcmParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesKeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AesKeyGenParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Algorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlgorithmIdentifier",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlignSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AllowSharedBufferSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AlphaOption",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnalyserOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animatable",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Animation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEffect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationFrameProvider",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlayState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationPlaybackEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationReplaceState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AnimationTimeline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AppendMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
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
		Label:    "ArrayBufferConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferLike",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayBufferView",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ArrayLike",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AssignedNodesOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AttestationConveyancePreference",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Attr",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioBufferSourceOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextLatencyCategory",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioContextState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataCopyToOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDataOutputCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDecoderSupport",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioDestinationNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioEncoderSupport",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioListener",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioNodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParam",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioParamMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioSampleFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioScheduledSourceNodeEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioTimestamp",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorklet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNodeEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioWorkletNodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientInputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientInputsJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsClientOutputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFInputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFOutputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFValues",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAssertionResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttachment",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorAttestationResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorSelectionCriteria",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticatorTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFill",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillAddressKind",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillBase",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillContactField",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillContactKind",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillCredentialField",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillField",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillNormalField",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoFillSection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutoKeyword",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AutomationRate",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AvcBitstreamFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AvcEncoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Awaited",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BarProp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Base64URLString",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BaseAudioContextEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BeforeUnloadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BigInteger",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BinaryType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BiquadFilterType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BitrateMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Blob",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobPart",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BlobPropertyBag",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Body",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BodyInit",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "BroadcastChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BroadcastChannelEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "BufferSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ByteLengthQueuingStrategy",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CDATASection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "COSEAlgorithmIdentifier",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSPViolationReportBody",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSAnimation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSConditionRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSContainerRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSCounterStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFaceRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontFeatureValuesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSFontPaletteValuesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSGroupingRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImageValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSImportRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframeRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeyframesRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSKeywordish",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerBlockRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSLayerStatementRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathClamp",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathInvert",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMax",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathMin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathNegate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathOperator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathProduct",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathSum",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMathValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMatrixComponentOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSMediaRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNamespaceRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNestedDeclarations",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumberish",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericBaseType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericType",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSNumericValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPageRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspective",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPerspectiveValue",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSPropertyRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRotate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSRuleList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScale",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSScopeRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkew",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewX",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSkewY",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStartingStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleDeclaration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleSheetInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSStyleValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSSupportsRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransformValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTransition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSTranslate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnitValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedSegment",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSUnparsedValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSVariableReferenceValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CSSViewTransitionRule",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Cache",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheQueryOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CacheStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CallableFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanPlayTypeResult",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCaptureMediaStreamTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasCompositing",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDirection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDrawImage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasDrawPath",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFillRule",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFillStrokeStyles",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFilters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontKerning",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontStretch",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasFontVariantCaps",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasGradient",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageData",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageSmoothing",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasImageSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasLineCap",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasLineJoin",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPath",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPathDrawingStyles",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasPattern",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRect",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasRenderingContext2DSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasShadowStyles",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasState",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasText",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextAlign",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextBaseline",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextDrawingStyles",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTextRendering",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CanvasUserInterface",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Capitalize",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CaretPositionFromPointOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelCountMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelInterpretation",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelMergerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChannelSplitterOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CharacterData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CheckVisibilityOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ChildNode",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassAccessorDecoratorTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassFieldDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassGetterDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMemberDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassMethodDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClassSetterDecoratorContext",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClientQueryOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClientTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Clipboard",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItemData",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItemOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ClipboardItems",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CloseEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CodecState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ColorGamut",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ColorSpaceConversion",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Comment",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositeOperation",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositeOperationOrAuto",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompositionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CompressionStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ComputedEffectTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ComputedKeyframe",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConcatArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Console",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstantSourceOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainBoolean",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainBooleanParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDOMString",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDOMStringParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDouble",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainDoubleRange",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainULong",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstrainULongRange",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConstructorParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ContentVisibilityAutoStateChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ConvolverOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CountQueuingStrategy",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Credential",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialCreationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialMediationRequirement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialPropertiesOutput",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialRequestOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CredentialsContainer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Crypto",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKey",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CryptoKeyPair",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomElementRegistry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CustomStateSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMException",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMHighResTimeStamp",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMImplementation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrix2DInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMMatrixReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParser",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMParserSupportedType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPoint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMPointReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuad",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMQuadInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMRectReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMStringMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DOMTokenList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransfer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DataTransferItemList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "DecodeErrorCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecodeSuccessCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DecompressionStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "DelayNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DelayOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventAcceleration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventAccelerationInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventRotationRate",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceMotionEventRotationRateInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DeviceOrientationEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DirectionSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DisplayCaptureSurfaceType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DisplayMediaStreamOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DistanceModelType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Document",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentFragment",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentOrShadowRoot",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentReadyState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimeline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentTimelineOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentType",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DocumentVisibilityState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DoubleRange",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DragEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "DynamicsCompressorOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_blend_minmax",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_color_buffer_float",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_color_buffer_half_float",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_float_blend",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_frag_depth",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_sRGB",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_shader_texture_lod",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_compression_bptc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_compression_rgtc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_filter_anisotropic",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EXT_texture_norm16",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyGenParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcKeyImportParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcdhKeyDeriveParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EcdsaParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EffectTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Element",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementCSSInlineStyle",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementContentEditable",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementCreationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementDefinitionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ElementInternals",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunk",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkOutputCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedAudioChunkType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunk",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkOutputCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EncodedVideoChunkType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EndOfStreamError",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EndingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Enumerator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EnumeratorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EpochTimeStamp",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Error",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ErrorEventInit",
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
		Label:    "Event",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventCounts",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListener",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerObject",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventListenerOrEventListenerObject",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventModifierInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSource",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSourceEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventSourceInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "EventTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "File",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FilePropertyBag",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileReaderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystem",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemCreateWritableOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemDirectoryReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntriesCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemEntryCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFileHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemFlags",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemGetDirectoryOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemGetFileOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemHandleKind",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemRemoveOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWritableFileStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FileSystemWriteChunkType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FillMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "Float32List",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "FocusEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FocusOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontDisplay",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFace",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceDescriptors",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceLoadStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSetLoadStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FontFaceSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEntryValue",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FormDataEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FragmentDirective",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FrameRequestCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FullscreenNavigationUI",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FullscreenOptions",
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
		Label:    "FunctionStringCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLbitfield",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLboolean",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLclampf",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLenum",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLfloat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLint",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLint64",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLintptr",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLsizei",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLsizeiptr",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLuint",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GLuint64",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GPUError",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GainOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Gamepad",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadButton",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEffectParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticActuator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticEffectType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadHapticsResult",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GamepadMappingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GenericTransformStream",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Geolocation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationCoordinates",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GeolocationPositionError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetAnimationsOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetHTMLOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetNotificationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetRootNodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalCompositeOperation",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalEventHandlers",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GlobalEventHandlersEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAllCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAnchorElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAreaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLAudioElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBaseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLBodyElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLButtonElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCanvasElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollectionBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLCollectionOf",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDataListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDetailsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDialogElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDivElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementDeprecatedTagNameMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLElementTagNameMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLEmbedElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFieldSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormControlsCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFormElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHeadingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHtmlElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLHyperlinkElementUtils",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLIFrameElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLInputElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLIElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLabelElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLegendElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLLinkElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMapElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMediaElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMenuElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMetaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMeterElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLModElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLObjectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptGroupElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOptionsCollection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOrSVGScriptElement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLOutputElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParagraphElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPictureElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLPreElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLProgressElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLQuoteElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLScriptElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSelectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSlotElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSourceElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLSpanElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLStyleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCaptionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableCellElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableColElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableRowElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableSectionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTemplateElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTextAreaElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTimeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTitleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTrackElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUListElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLUnknownElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLVideoElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HardwareAcceleration",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashAlgorithmIdentifier",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HashChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HdrMetadataType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Headers",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HeadersInit",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Highlight",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightRegistry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HighlightType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "History",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HkdfParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacImportParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacKeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HmacKeyGenParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IArguments",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursor",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorDirection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBCursorWithValue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabase",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabaseEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBDatabaseInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBFactory",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndex",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBIndexParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBKeyRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStore",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBObjectStoreParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBOpenDBRequestEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequestEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBRequestReadyState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransaction",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionDurability",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBTransactionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBValidKey",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IDBVersionChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IIRFilterOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ITextWriter",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleDeadline",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleRequestCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IdleRequestOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapRenderingContextSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBitmapSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageBufferSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageCapture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageData",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDataSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecodeResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDecoderInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageEncodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageOrientation",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageSmoothingQuality",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageTrackList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAttributes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportCallOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportMeta",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputDeviceInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InputEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InsertPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "InstanceType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "Int32List",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "IntersectionObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IntersectionObserverInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Intl",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "IterationCompositeOperation",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JSON",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "JsonWebKey",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KHR_parallel_shader_compile",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyUsage",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyboardEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyboardEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Keyframe",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeAnimationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeyframeEffectOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LargestContentfulPaint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LatencyMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LineAlignSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LineAndPositionSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LinkStyle",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Location",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lock",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockGrantedCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockManagerSnapshot",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LockOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Lowercase",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccess",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIAccessEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIConnectionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIInputMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIMessageEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutput",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIOutputMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPort",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortConnectionState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortDeviceState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MIDIPortType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Math",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MathMLElementTagNameMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesDecodingInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesEncodingInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDecodingConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDecodingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDeviceKind",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevices",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaDevicesEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaElementAudioSourceOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncodingConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncodingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaEncryptedEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaImage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyMessageType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySession",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionClosedReason",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySessionType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeyStatusMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemAccess",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeySystemMediaCapability",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeys",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeysPolicy",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaKeysRequirement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaMetadataInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaPositionState",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaProvider",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaQueryListEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaRecorderOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSession",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionAction",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionActionDetails",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionActionHandler",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSessionPlaybackState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSource",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSourceHandle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioDestinationNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamAudioSourceOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamConstraints",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaStreamTrackState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackConstraintSet",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackConstraints",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaTrackSupportedConstraints",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessageEventTargetEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePort",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MessagePortEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MethodDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MouseEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MultiCacheQueryOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationObserverInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecord",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MutationRecordType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedCurve",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NamedNodeMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationActivation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationHistoryEntryEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationPreloadState",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationTimingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigationType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Navigator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorAutomationInformation",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorBadge",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorConcurrentHardware",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorContentUtils",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorCookies",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorID",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLanguage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLocks",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorOnLine",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorPlugins",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NewableFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NoInfer",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Node",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeFilter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeIterator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NodeListOf",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonDocumentTypeChildNode",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonElementParentNode",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NonNullable",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Notification",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationDirection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationPermission",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NotificationPermissionCallback",
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
		Label:    "OES_draw_buffers_indexed",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_element_index_uint",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_fbo_render_mipmap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_standard_derivatives",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_float",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_float_linear",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_half_float",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_texture_half_float_linear",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OES_vertex_array_object",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OVR_multiview2",
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
		Label:    "OfflineAudioCompletionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioCompletionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContextEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OfflineAudioContextOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvas",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenCanvasRenderingContext2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenRenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OffscreenRenderingContextId",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Omit",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OmitThisParameter",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnBeforeUnloadEventHandler",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnBeforeUnloadEventHandlerNonNull",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnErrorEventHandler",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OnErrorEventHandlerNonNull",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalEffectTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalPostfixToken",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OptionalPrefixToken",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OpusBitstreamFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OpusEncoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OrientationType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OscillatorType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverSampleType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "OverconstrainedError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageRevealEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageSwapEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PageTransitionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PannerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PanningModelType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParameterDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Parameters",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ParentNode",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Partial",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Path2D",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PayerErrors",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentAddress",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentComplete",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentCurrencyAmount",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsModifier",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentDetailsUpdate",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentItem",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentMethodData",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentRequestUpdateEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponse",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentResponseEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentShippingOption",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentShippingType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PaymentValidationErrors",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pbkdf2Params",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Performance",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEntryList",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceEventTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMark",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMarkOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasure",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceMeasureOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigationTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverEntryList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceObserverInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformancePaintTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceResourceTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceServerTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWave",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWaveConstraints",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PeriodicWaveOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionDescriptor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionName",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PermissionStatusEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Permissions",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Pick",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindow",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PictureInPictureWindowEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PlaneLayout",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PlaybackDirection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PointerLockOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopStateEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PopoverInvokerElement",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionAlignSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionErrorCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PositionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PredefinedColorSpace",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PremultiplyAlpha",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PresentationStyle",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProcessingInstruction",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ProgressEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Promise",
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
		Label:    "PromiseRejectionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PromiseRejectionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDecorator",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyDefinition",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
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
		Label:    "PropertyIndexedKeyframes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PropertyKey",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredential",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialClientCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialCreationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialCreationOptionsJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialDescriptor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialDescriptorJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialEntity",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRequestOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRequestOptionsJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialRpEntity",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialUserEntity",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PublicKeyCredentialUserEntityJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushEncryptionKeyName",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscription",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PushSubscriptionOptionsInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategy",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategyInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "QueuingStrategySize",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCAnswerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCBundlePolicy",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCCertificateExpiration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSender",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFSenderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDTMFToneChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDataChannelState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDegradationPreference",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsFingerprint",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsRole",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransportEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCDtlsTransportState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedAudioFrameMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrameMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedVideoFrameType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorDetailType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCErrorInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidate",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidateInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidatePair",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidatePairStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceCandidateType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceComponent",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceConnectionState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceGathererState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceGatheringState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceProtocol",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceRole",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceServer",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTcpCandidateType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportPolicy",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCIceTransportState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCInboundRtpStreamStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCLocalSessionDescriptionInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOfferAnswerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOfferOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCOutboundRtpStreamStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionErrorCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceErrorEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionIceEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPeerConnectionState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCPriorityType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCQualityLimitationReason",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCReceivedRtpStreamStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtcpMuxPolicy",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtcpParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodec",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodecParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpCodingParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpContributingSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpEncodingParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpHeaderExtensionCapability",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpHeaderExtensionParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiveParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpReceiver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpScriptTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSendParameters",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSender",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpStreamStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpSynchronizationSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiverDirection",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransceiverInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCRtpTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransportEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSctpTransportState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSdpType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSentRtpStreamStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescription",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescriptionCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSessionDescriptionInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSetParameterOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCSignalingState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsIceCandidatePairState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsReport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCStatsType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTrackEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCTransportStats",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RadioNodeList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Range",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "ReadableByteStreamController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamBYOBRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamController",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamDefaultReader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamGenericReader",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamGetReaderOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamIteratorOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadDoneResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadResult",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReadValueResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReader",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamReaderMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableStreamType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadableWritablePair",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Readonly",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadonlyArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReadyState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Record",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RecordingState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "ReferrerPolicy",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "RegExpExecArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegExpMatchArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RegistrationOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlayback",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackAvailabilityCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RemotePlaybackState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Report",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportBody",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportList",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserverCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReportingObserverOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Request",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestCache",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestCredentials",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestDestination",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestPriority",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RequestRedirect",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Required",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResidentKeyRequirement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserver",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverBoxOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverEntry",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeObserverSize",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResizeQuality",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Response",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResponseInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ResponseType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ReturnType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedImportParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedKeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaHashedKeyGenParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaKeyAlgorithm",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaKeyGenParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaOaepParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaOtherPrimesInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RsaPssParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAngle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateMotionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimateTransformElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedAngle",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedBoolean",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedEnumeration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedInteger",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLength",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedLengthList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumber",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedNumberList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPoints",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedPreserveAspectRatio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedString",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimatedTransformList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGAnimationElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGBoundingBoxOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGCircleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGClipPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGComponentTransferFunctionElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDefsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGDescElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGElementTagNameMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGEllipseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEBlendElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEColorMatrixElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEComponentTransferElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFECompositeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEConvolveMatrixElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDiffuseLightingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDisplacementMapElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDistantLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEDropShadowElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFloodElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncAElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncBElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEFuncRElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEGaussianBlurElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMergeNodeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEMorphologyElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEOffsetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFEPointLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpecularLightingElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFESpotLightElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETileElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFETurbulenceElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFilterPrimitiveStandardAttributes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGFitToViewBox",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGForeignObjectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGeometryElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGGraphicsElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGImageElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLength",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLengthList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLineElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGLinearGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMarkerElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMaskElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGMetadataElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumber",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGNumberList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPatternElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPoint",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPointList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolygonElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPolylineElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGPreserveAspectRatio",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRadialGradientElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRect",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGRectElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSVGElementEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGScriptElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStopElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStringList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGStyleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSwitchElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGSymbolElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTSpanElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTests",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextContentElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPathElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTextPositioningElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTitleElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransform",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGTransformList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGURIReference",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUnitTypes",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGUseElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SVGViewElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SafeArray",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Screen",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScreenOrientationEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNodeEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollBehavior",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollIntoViewOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollLogicalPosition",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollRestoration",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollSetting",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ScrollToOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEventDisposition",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SecurityPolicyViolationEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Selection",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SelectionMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerContainerEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistration",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerRegistrationEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerState",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ServiceWorkerUpdateViaCache",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRoot",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShadowRootMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ShareData",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SharedWorker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SlotAssignmentMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Slottable",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SourceBufferListEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionAlternative",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResult",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechRecognitionResultList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesis",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorCode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisErrorEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtterance",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisUtteranceEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SpeechSynthesisVoice",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRange",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StaticRangeInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StereoPannerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Storage",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEstimate",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StorageManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StreamPipeOptions",
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
		Label:    "StructuredSerializeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMap",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StylePropertyMapReadOnly",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StyleSheetList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubmitEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "SubtleCrypto",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Symbol",
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
		Label:    "TemplateStringsArray",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TexImageSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Text",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderCommon",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextDecoderStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderCommon",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderEncodeIntoResult",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextEncoderStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextMetrics",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamReader",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextStreamWriter",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrack",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackCueList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackKind",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackListEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TextTrackMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisParameterType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ThisType",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimeRanges",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TimerHandler",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ToggleEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Touch",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchList",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TouchType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TrackEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransferFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Transferable",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Transformer",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerFlushCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerStartCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransformerTransformCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TransitionEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "TreeWalker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "TypedPropertyDescriptor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UIEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ULongRange",
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
		Label:    "URL",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "URLSearchParams",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
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
		Label:    "Uint32List",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
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
		Label:    "Uncapitalize",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingByteSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingDefaultSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSink",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkAbortCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkCloseCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkStartCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSinkWriteCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSource",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourceCancelCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourcePullCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UnderlyingSourceStartCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Uppercase",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UserActivation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "UserVerificationRequirement",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VBArrayConstructor",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTCue",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VTTRegion",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityState",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ValidityStateFlags",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VarDate",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VibratePattern",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorPrimaries",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpace",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoColorSpaceInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoDecoderSupport",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoder",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderBitrateMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderConfig",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEncodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEncodeOptionsForAvc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoEncoderSupport",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFacingModeEnum",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrame",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameBufferInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameCallbackMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameCopyToOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameOutputCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoFrameRequestCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoMatrixCoefficients",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPixelFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoPlaybackQuality",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VideoTransferCharacteristics",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransition",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionTypeSet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ViewTransitionUpdateCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VisualViewportEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "VoidFunction",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_color_buffer_float",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_astc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_etc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_etc1",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_pvrtc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_s3tc",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_compressed_texture_s3tc_srgb",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_debug_renderer_info",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_debug_shaders",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_depth_texture",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_draw_buffers",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_lose_context",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WEBGL_multi_draw",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLock",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinel",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockSentinelEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WakeLockType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WaveShaperOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
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
	&lsproto.CompletionItem{
		Label:    "WebAssembly",
		Kind:     PtrTo(lsproto.CompletionItemKindModule),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebCodecsErrorCallback",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContextBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGL2RenderingContextOverloads",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLActiveInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLBuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextAttributes",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLContextEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLFramebuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLPowerPreference",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLProgram",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLQuery",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderbuffer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContext",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContextBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLRenderingContextOverloads",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSampler",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShader",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLShaderPrecisionFormat",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLSync",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTexture",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLTransformFeedback",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLUniformLocation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObject",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebGLVertexArrayObjectOES",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebKitCSSMatrix",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocket",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebSocketEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransport",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportBidirectionalStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportCloseInfo",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportCongestionControl",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportDatagramDuplexStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportError",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportErrorOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportErrorSource",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportHash",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportSendStreamOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WheelEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Window",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventHandlers",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventHandlersEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowLocalStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowOrWorkerGlobalScope",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowPostMessageOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowProxy",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WindowSessionStorage",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worker",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkerType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "Worklet",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WorkletOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStream",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultController",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WritableStreamDefaultWriter",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WriteCommandType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WriteParams",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLDocument",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequest",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestBodyInit",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTarget",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestEventTargetEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestResponseType",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLHttpRequestUpload",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XMLSerializer",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluator",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathEvaluatorBase",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathExpression",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathNSResolver",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XPathResult",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "XSLTProcessor",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "webkitURL",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AudioProcessingEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ClientRect",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ElementTagNameMap",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "External",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDirectoryElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLDocument",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFontElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLFrameSetElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLMarqueeElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLParamElement",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableDataCellElement",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "HTMLTableHeaderCellElement",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ImportAssertions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeType",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "MimeTypeArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceNavigation",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PerformanceTiming",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "Plugin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "PluginArray",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "ScriptProcessorNode",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "StyleMedia",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "TextEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextGlobalsOrKeywords))),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsLargeBlobInputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsLargeBlobInputsJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsLargeBlobOutputs",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFInputsJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "AuthenticationExtensionsPRFValuesJSON",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieChangeEvent",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieChangeEventInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieList",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieListItem",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieSameSite",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStore",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStoreDeleteOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStoreEventMap",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStoreGetOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "CookieStoreManager",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "FillLightMode",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "GetComposedRangesOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImageDataArray",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "ImportNodeOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "KeySystemTrackConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "LoginStatus",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaCapabilitiesKeySystemConfiguration",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "MediaSettingsRange",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "NavigatorLogin",
		Kind:     PtrTo(lsproto.CompletionItemKindVariable),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PhotoCapabilities",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "PhotoSettings",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RedEyeReduction",
		Kind:     PtrTo(lsproto.CompletionItemKindClass),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCEncodedFrameMetadata",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "RTCLocalIceCandidateInit",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "StartViewTransitionOptions",
		Kind:     PtrTo(lsproto.CompletionItemKindInterface),
		SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
	},
	&lsproto.CompletionItem{
		Label:    "WebTransportSendOptions",
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

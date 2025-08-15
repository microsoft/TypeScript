package estransforms

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/transformers"
)

// !!! TODO: This fixed layering scheme assumes you can't swap out the es decorator transform for the legacy one,
// or the proper es class field transform for the legacy one
var (
	NewESNextTransformer = transformers.Chain(newESDecoratorTransformer, newUsingDeclarationTransformer)
	// 2025: only module system syntax (import attributes, json modules), untransformed regex modifiers
	// 2024: no new downlevel syntax
	// 2023: no new downlevel syntax
	NewES2022Transformer = transformers.Chain(NewESNextTransformer, newClassStaticBlockTransformer, newClassFieldsTransformer)    // !!! top level await? not transformed, just errored on at lower targets - also more of a module system feature anyway
	NewES2021Transformer = transformers.Chain(NewES2022Transformer, newLogicalAssignmentTransformer)                              // !!! numeric seperators? always elided by printer?
	NewES2020Transformer = transformers.Chain(NewES2021Transformer, newNullishCoalescingTransformer, newOptionalChainTransformer) // also dynamic import - module system feature
	NewES2019Transformer = transformers.Chain(NewES2020Transformer, newOptionalCatchTransformer)
	NewES2018Transformer = transformers.Chain(NewES2019Transformer, newObjectRestSpreadTransformer, newforawaitTransformer)
	NewES2017Transformer = transformers.Chain(NewES2018Transformer, newAsyncTransformer)
	NewES2016Transformer = transformers.Chain(NewES2017Transformer, newExponentiationTransformer)
)

func GetESTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	options := opts.CompilerOptions
	switch options.GetEmitScriptTarget() {
	case core.ScriptTargetESNext:
		return nil // no transforms needed
	case /*core.ScriptTargetES2025,*/ core.ScriptTargetES2024, core.ScriptTargetES2023, core.ScriptTargetES2022:
		return NewESNextTransformer(opts)
	case core.ScriptTargetES2021:
		return NewES2022Transformer(opts)
	case core.ScriptTargetES2020:
		return NewES2021Transformer(opts)
	case core.ScriptTargetES2019:
		return NewES2020Transformer(opts)
	case core.ScriptTargetES2018:
		return NewES2019Transformer(opts)
	case core.ScriptTargetES2017:
		return NewES2018Transformer(opts)
	case core.ScriptTargetES2016:
		return NewES2017Transformer(opts)
	default: // other, older, option, transform maximally
		return NewES2016Transformer(opts)
	}
}

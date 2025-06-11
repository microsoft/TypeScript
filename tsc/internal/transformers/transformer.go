package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type Transformer struct {
	emitContext *printer.EmitContext
	factory     *printer.NodeFactory
	visitor     *ast.NodeVisitor
}

func (tx *Transformer) NewTransformer(visit func(node *ast.Node) *ast.Node, emitContext *printer.EmitContext) *Transformer {
	if tx.emitContext != nil {
		panic("Transformer already initialized")
	}
	if emitContext == nil {
		emitContext = printer.NewEmitContext()
	}
	tx.emitContext = emitContext
	tx.factory = emitContext.Factory
	tx.visitor = emitContext.NewNodeVisitor(visit)
	return tx
}

func (tx *Transformer) EmitContext() *printer.EmitContext {
	return tx.emitContext
}

func (tx *Transformer) Visitor() *ast.NodeVisitor {
	return tx.visitor
}

func (tx *Transformer) Factory() *printer.NodeFactory {
	return tx.factory
}

func (tx *Transformer) TransformSourceFile(file *ast.SourceFile) *ast.SourceFile {
	return tx.visitor.VisitSourceFile(file)
}

func getModuleTransformer(emitContext *printer.EmitContext, options *core.CompilerOptions, resolver binder.ReferenceResolver, getEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind) *Transformer {
	switch options.GetEmitModuleKind() {
	case core.ModuleKindPreserve:
		// `ESModuleTransformer` contains logic for preserving CJS input syntax in `--module preserve`
		return NewESModuleTransformer(emitContext, options, resolver, getEmitModuleFormatOfFile)

	case core.ModuleKindESNext,
		core.ModuleKindES2022,
		core.ModuleKindES2020,
		core.ModuleKindES2015,
		core.ModuleKindNode16,
		core.ModuleKindNodeNext,
		core.ModuleKindCommonJS:
		return NewImpliedModuleTransformer(emitContext, options, resolver, getEmitModuleFormatOfFile)

	default:
		return NewCommonJSModuleTransformer(emitContext, options, resolver, getEmitModuleFormatOfFile)
	}
}

func GetScriptTransformers(emitContext *printer.EmitContext, host printer.EmitHost, sourceFile *ast.SourceFile) []*Transformer {
	var tx []*Transformer
	options := host.Options()
	languageVersion := options.GetEmitScriptTarget()

	// JS files don't use reference calculations as they don't do import elision, no need to calculate it
	importElisionEnabled := !options.VerbatimModuleSyntax.IsTrue() && !ast.IsInJSFile(sourceFile.AsNode())

	var emitResolver printer.EmitResolver
	var referenceResolver binder.ReferenceResolver
	if importElisionEnabled || options.GetJSXTransformEnabled() {
		emitResolver = host.GetEmitResolver(sourceFile, false /*skipDiagnostics*/) // !!! conditionally skip diagnostics
		emitResolver.MarkLinkedReferencesRecursively(sourceFile)
		referenceResolver = emitResolver
	} else {
		referenceResolver = binder.NewReferenceResolver(options, binder.ReferenceResolverHooks{})
	}

	// transform TypeScript syntax
	{
		// erase types
		tx = append(tx, NewTypeEraserTransformer(emitContext, options))

		// elide imports
		if importElisionEnabled {
			tx = append(tx, NewImportElisionTransformer(emitContext, options, emitResolver))
		}

		// transform `enum`, `namespace`, and parameter properties
		tx = append(tx, NewRuntimeSyntaxTransformer(emitContext, options, referenceResolver))
	}

	// !!! transform legacy decorator syntax
	if options.GetJSXTransformEnabled() {
		tx = append(tx, NewJSXTransformer(emitContext, options, emitResolver))
	}

	if languageVersion < core.ScriptTargetESNext {
		tx = append(tx, NewESNextTransformer(emitContext))
	}

	// !!! transform native decorator syntax
	// !!! transform class field syntax
	// !!! transform other language targets

	// transform module syntax
	tx = append(tx, getModuleTransformer(emitContext, options, referenceResolver, host.GetEmitModuleFormatOfFile))
	return tx
}

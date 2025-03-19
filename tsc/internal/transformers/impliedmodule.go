package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type ImpliedModuleTransformer struct {
	Transformer
	compilerOptions            *core.CompilerOptions
	resolver                   binder.ReferenceResolver
	sourceFileMetaDataProvider printer.SourceFileMetaDataProvider
	cjsTransformer             *Transformer
	esmTransformer             *Transformer
}

func NewImpliedModuleTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions, resolver binder.ReferenceResolver, sourceFileMetaDataProvider printer.SourceFileMetaDataProvider) *Transformer {
	if resolver == nil {
		resolver = binder.NewReferenceResolver(compilerOptions, binder.ReferenceResolverHooks{})
	}
	tx := &ImpliedModuleTransformer{compilerOptions: compilerOptions, resolver: resolver, sourceFileMetaDataProvider: sourceFileMetaDataProvider}
	return tx.newTransformer(tx.visit, emitContext)
}

func (tx *ImpliedModuleTransformer) visit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindSourceFile:
		node = tx.visitSourceFile(node.AsSourceFile())
	}
	return node
}

func (tx *ImpliedModuleTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile {
		return node.AsNode()
	}

	format := tx.getEmitModuleFormatOfFile(node)

	var transformer *Transformer
	if format >= core.ModuleKindES2015 {
		if tx.esmTransformer == nil {
			tx.esmTransformer = NewESModuleTransformer(tx.emitContext, tx.compilerOptions, tx.resolver, tx.sourceFileMetaDataProvider)
		}
		transformer = tx.esmTransformer
	} else {
		if tx.cjsTransformer == nil {
			tx.cjsTransformer = NewCommonJSModuleTransformer(tx.emitContext, tx.compilerOptions, tx.resolver, tx.sourceFileMetaDataProvider)
		}
		transformer = tx.cjsTransformer
	}

	return transformer.TransformSourceFile(node).AsNode()
}

func (tx *ImpliedModuleTransformer) getEmitModuleFormatOfFile(node *ast.SourceFile) core.ModuleKind {
	// !!! host.getEmitModuleFormatOfFile?
	return ast.GetEmitModuleFormatOfFileWorker(node, tx.compilerOptions, tx.sourceFileMetaDataProvider.GetSourceFileMetaData(node.Path()))
}

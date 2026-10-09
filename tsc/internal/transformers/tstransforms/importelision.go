package tstransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

type ImportElisionTransformer struct {
	transformers.Transformer
	compilerOptions   *core.CompilerOptions
	currentSourceFile *ast.SourceFile
	emitResolver      printer.EmitResolver
}

func NewImportElisionTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opt.CompilerOptions
	emitContext := opt.Context
	if compilerOptions.VerbatimModuleSyntax.IsTrue() {
		panic("ImportElisionTransformer should not be used with VerbatimModuleSyntax")
	}
	tx := &ImportElisionTransformer{compilerOptions: compilerOptions, emitResolver: opt.EmitResolver}
	return tx.NewTransformer(tx.visit, emitContext)
}

func (tx *ImportElisionTransformer) visit(node ast.Node) ast.Node {
	if ast.IsSourceFile(node) && tx.emitResolver != nil {
		tx.emitResolver.MarkLinkedReferencesRecursively(tx.EmitContext().MostOriginal(node).AsSourceFile())
	}

	switch node.Kind() {
	case ast.KindImportEqualsDeclaration:
		if ast.IsExternalModuleImportEqualsDeclaration(node) {
			if !tx.shouldEmitAliasDeclaration(node) {
				return ast.Node{}
			}
		} else {
			if !tx.shouldEmitImportEqualsDeclaration(node.AsImportEqualsDeclaration()) {
				return ast.Node{}
			}
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindImportDeclaration:
		n := node.AsImportDeclaration()
		// Do not elide a side-effect only import declaration.
		//  import "foo";
		if !n.ImportClause().IsNil() {
			importClause := tx.Visitor().VisitNode(n.ImportClause())
			if importClause.IsNil() {
				return ast.Node{}
			}
			return tx.Factory().UpdateImportDeclaration(n, n.Modifiers(), importClause, n.ModuleSpecifier(), tx.Visitor().VisitNode(n.Attributes()))
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindImportClause:
		n := node.AsImportClause()
		name := core.IfElse(tx.shouldEmitAliasDeclaration(node), n.Name(), ast.Node{})
		namedBindings := tx.Visitor().VisitNode(n.NamedBindings())
		if name.IsNil() && namedBindings.IsNil() {
			// all import bindings were elided
			return ast.Node{}
		}
		return tx.Factory().UpdateImportClause(n, n.PhaseModifier(), name, namedBindings)
	case ast.KindNamespaceImport:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide unused imports
			return ast.Node{}
		}
		return node
	case ast.KindNamedImports:
		n := node.AsNamedImports()
		elements := tx.Visitor().VisitNodes(n.Elements())
		if len(elements.Nodes) == 0 {
			// all import specifiers were elided
			return ast.Node{}
		}
		return tx.Factory().UpdateNamedImports(n, elements)
	case ast.KindImportSpecifier:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide type-only or unused imports
			return ast.Node{}
		}
		return node
	case ast.KindExportAssignment:
		if !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && !tx.isValueAliasDeclaration(node) {
			// elide unused import
			return ast.Node{}
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		var exportClause ast.Node
		if !n.ExportClause().IsNil() {
			exportClause = tx.Visitor().VisitNode(n.ExportClause())
			if exportClause.IsNil() {
				// all export bindings were elided
				return ast.Node{}
			}
		}
		return tx.Factory().UpdateExportDeclaration(n, nil /*modifiers*/, false /*isTypeOnly*/, exportClause, tx.Visitor().VisitNode(n.ModuleSpecifier()), tx.Visitor().VisitNode(n.Attributes()))
	case ast.KindNamedExports:
		n := node.AsNamedExports()
		elements := tx.Visitor().VisitNodes(n.Elements())
		if len(elements.Nodes) == 0 {
			// all export specifiers were elided
			return ast.Node{}
		}
		return tx.Factory().UpdateNamedExports(n, elements)
	case ast.KindExportSpecifier:
		if !tx.isValueAliasDeclaration(node) {
			// elide unused export
			return ast.Node{}
		}
		return node
	case ast.KindSourceFile:
		savedCurrentSourceFile := tx.currentSourceFile
		tx.currentSourceFile = node.AsSourceFile()
		node = tx.Visitor().VisitEachChild(node)
		tx.currentSourceFile = savedCurrentSourceFile
		return node
	case ast.KindModuleDeclaration, ast.KindModuleBlock:
		return tx.Visitor().VisitEachChild(node)
	default:
		return node
	}
}

func (tx *ImportElisionTransformer) shouldEmitAliasDeclaration(node ast.Node) bool {
	return ast.IsInJSFile(node) || tx.isReferencedAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) shouldEmitImportEqualsDeclaration(node ast.ImportEqualsDeclaration) bool {
	// preserve old compiler's behavior: emit import declaration (even if we do not consider them referenced) when
	// - current file is not external module
	// - import declaration is top level and target is value imported by entity name
	return tx.shouldEmitAliasDeclaration(node.AsNode()) || (!ast.IsExternalModule(tx.currentSourceFile) && tx.isTopLevelValueImportEqualsWithEntityName(node.AsNode()))
}

func (tx *ImportElisionTransformer) isReferencedAliasDeclaration(node ast.Node) bool {
	node = tx.EmitContext().ParseNode(node)
	return node.IsNil() || tx.emitResolver.IsReferencedAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isValueAliasDeclaration(node ast.Node) bool {
	node = tx.EmitContext().ParseNode(node)
	return node.IsNil() || tx.emitResolver.IsValueAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isTopLevelValueImportEqualsWithEntityName(node ast.Node) bool {
	node = tx.EmitContext().ParseNode(node)
	return !node.IsNil() && tx.emitResolver.IsTopLevelValueImportEqualsWithEntityName(node)
}

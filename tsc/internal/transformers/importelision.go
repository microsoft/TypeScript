package transformers

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type ImportElisionTransformer struct {
	Transformer
	compilerOptions   *core.CompilerOptions
	currentSourceFile *ast.SourceFile
	emitResolver      printer.EmitResolver
}

func NewImportElisionTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions, resolver printer.EmitResolver) *Transformer {
	if compilerOptions.VerbatimModuleSyntax.IsTrue() {
		panic("ImportElisionTransformer should not be used with VerbatimModuleSyntax")
	}
	tx := &ImportElisionTransformer{compilerOptions: compilerOptions, emitResolver: resolver}
	return tx.newTransformer(tx.visit, emitContext)
}

func (tx *ImportElisionTransformer) visit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		if !tx.shouldEmitImportEqualsDeclaration(n) {
			return nil
		}
		return tx.visitor.VisitEachChild(node)

	case ast.KindImportDeclaration:
		n := node.AsImportDeclaration()
		if n.ImportClause == nil {
			// Do not elide a side-effect only import declaration.
			//  import "foo";
			return node
		}
		importClause := tx.visitor.VisitNode(n.ImportClause)
		if importClause == nil {
			return nil
		}
		return tx.factory.UpdateImportDeclaration(n, n.Modifiers(), importClause, n.ModuleSpecifier, n.Attributes)
	case ast.KindImportClause:
		n := node.AsImportClause()
		name := core.IfElse(tx.shouldEmitAliasDeclaration(node), n.Name(), nil)
		namedBindings := tx.visitor.VisitNode(n.NamedBindings)
		if name == nil && namedBindings == nil {
			// all import bindings were elided
			return nil
		}
		return tx.factory.UpdateImportClause(n, false /*isTypeOnly*/, name, namedBindings)
	case ast.KindNamespaceImport:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide unused imports
			return nil
		}
		return node
	case ast.KindNamedImports:
		n := node.AsNamedImports()
		elements := tx.visitor.VisitNodes(n.Elements)
		if len(elements.Nodes) == 0 {
			// all import specifiers were elided
			return nil
		}
		return tx.factory.UpdateNamedImports(n, elements)
	case ast.KindImportSpecifier:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide type-only or unused imports
			return nil
		}
		return node
	case ast.KindExportAssignment:
		if !tx.isValueAliasDeclaration(node) {
			// elide unused import
			return nil
		}
		return tx.visitor.VisitEachChild(node)
	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		var exportClause *ast.Node
		if n.ExportClause != nil {
			exportClause = tx.visitor.VisitNode(n.ExportClause)
			if exportClause == nil {
				// all export bindings were elided
				return nil
			}
		}
		return tx.factory.UpdateExportDeclaration(n, nil /*modifiers*/, false /*isTypeOnly*/, exportClause, tx.visitor.VisitNode(n.ModuleSpecifier), tx.visitor.VisitNode(n.Attributes))
	case ast.KindNamedExports:
		n := node.AsNamedExports()
		elements := tx.visitor.VisitNodes(n.Elements)
		if len(elements.Nodes) == 0 {
			// all export specifiers were elided
			return nil
		}
		return tx.factory.UpdateNamedExports(n, elements)
	case ast.KindExportSpecifier:
		if !tx.isValueAliasDeclaration(node) {
			// elide unused export
			return nil
		}
		return node
	case ast.KindSourceFile:
		savedCurrentSourceFile := tx.currentSourceFile
		tx.currentSourceFile = node.AsSourceFile()
		node = tx.visitor.VisitEachChild(node)
		tx.currentSourceFile = savedCurrentSourceFile
		return node
	default:
		return tx.visitor.VisitEachChild(node)
	}
}

func (tx *ImportElisionTransformer) shouldEmitAliasDeclaration(node *ast.Node) bool {
	return ast.IsInJSFile(node) || tx.isReferencedAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) shouldEmitImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) bool {
	if !tx.shouldEmitAliasDeclaration(node.AsNode()) {
		return false
	}
	if node.ModuleReference.Kind == ast.KindExternalModuleReference {
		return true
	}
	// preserve old compiler's behavior: emit import declaration (even if we do not consider them referenced) when
	// - current file is not external module
	// - import declaration is top level and target is value imported by entity name
	return tx.currentSourceFile != nil && ast.IsExternalModule(tx.currentSourceFile) && tx.isTopLevelValueImportEqualsWithEntityName(node.AsNode())
}

func (tx *ImportElisionTransformer) isReferencedAliasDeclaration(node *ast.Node) bool {
	node = tx.emitContext.MostOriginal(node)
	return tx.emitResolver.IsReferencedAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isValueAliasDeclaration(node *ast.Node) bool {
	node = tx.emitContext.MostOriginal(node)
	return tx.emitResolver.IsValueAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isTopLevelValueImportEqualsWithEntityName(node *ast.Node) bool {
	node = tx.emitContext.MostOriginal(node)
	return tx.emitResolver.IsTopLevelValueImportEqualsWithEntityName(node)
}

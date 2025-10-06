package tstransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
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

func (tx *ImportElisionTransformer) visit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportEqualsDeclaration:
		if !tx.isElisionBlocked(node) && !tx.shouldEmitImportEqualsDeclaration(node.AsImportEqualsDeclaration()) {
			return nil
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindImportDeclaration:
		if !tx.isElisionBlocked(node) {
			n := node.AsImportDeclaration()
			// Do not elide a side-effect only import declaration.
			//  import "foo";
			if n.ImportClause != nil {
				importClause := tx.Visitor().VisitNode(n.ImportClause)
				if importClause == nil {
					return nil
				}
				return tx.Factory().UpdateImportDeclaration(n, n.Modifiers(), importClause, n.ModuleSpecifier, tx.Visitor().VisitNode(n.Attributes))
			}
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindImportClause:
		n := node.AsImportClause()
		name := core.IfElse(tx.shouldEmitAliasDeclaration(node), n.Name(), nil)
		namedBindings := tx.Visitor().VisitNode(n.NamedBindings)
		if name == nil && namedBindings == nil {
			// all import bindings were elided
			return nil
		}
		return tx.Factory().UpdateImportClause(n, n.PhaseModifier, name, namedBindings)
	case ast.KindNamespaceImport:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide unused imports
			return nil
		}
		return node
	case ast.KindNamedImports:
		n := node.AsNamedImports()
		elements := tx.Visitor().VisitNodes(n.Elements)
		if len(elements.Nodes) == 0 {
			// all import specifiers were elided
			return nil
		}
		return tx.Factory().UpdateNamedImports(n, elements)
	case ast.KindImportSpecifier:
		if !tx.shouldEmitAliasDeclaration(node) {
			// elide type-only or unused imports
			return nil
		}
		return node
	case ast.KindExportAssignment:
		if !tx.isElisionBlocked(node) && !tx.compilerOptions.VerbatimModuleSyntax.IsTrue() && !tx.isValueAliasDeclaration(node) {
			// elide unused import
			return nil
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindExportDeclaration:
		if !tx.isElisionBlocked(node) {
			n := node.AsExportDeclaration()
			var exportClause *ast.Node
			if n.ExportClause != nil {
				exportClause = tx.Visitor().VisitNode(n.ExportClause)
				if exportClause == nil {
					// all export bindings were elided
					return nil
				}
			}
			return tx.Factory().UpdateExportDeclaration(n, nil /*modifiers*/, false /*isTypeOnly*/, exportClause, tx.Visitor().VisitNode(n.ModuleSpecifier), tx.Visitor().VisitNode(n.Attributes))
		}
		return tx.Visitor().VisitEachChild(node)
	case ast.KindNamedExports:
		n := node.AsNamedExports()
		elements := tx.Visitor().VisitNodes(n.Elements)
		if len(elements.Nodes) == 0 {
			// all export specifiers were elided
			return nil
		}
		return tx.Factory().UpdateNamedExports(n, elements)
	case ast.KindExportSpecifier:
		if !tx.isValueAliasDeclaration(node) {
			// elide unused export
			return nil
		}
		return node
	case ast.KindSourceFile:
		savedCurrentSourceFile := tx.currentSourceFile
		tx.currentSourceFile = node.AsSourceFile()
		node = tx.Visitor().VisitEachChild(node)
		tx.currentSourceFile = savedCurrentSourceFile
		return node
	default:
		return node
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
	node = tx.EmitContext().ParseNode(node)
	return node == nil || tx.emitResolver.IsReferencedAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isValueAliasDeclaration(node *ast.Node) bool {
	node = tx.EmitContext().ParseNode(node)
	return node == nil || tx.emitResolver.IsValueAliasDeclaration(node)
}

func (tx *ImportElisionTransformer) isTopLevelValueImportEqualsWithEntityName(node *ast.Node) bool {
	node = tx.EmitContext().ParseNode(node)
	return node != nil && tx.emitResolver.IsTopLevelValueImportEqualsWithEntityName(node)
}

// Determines whether import/export elision is blocked for this statement.
//
// @description
// We generally block import/export elision if the statement was modified by a `before` custom
// transform, although we will continue to allow it if the statement hasn't replaced a node of a different kind and
// as long as the local bindings for the declarations are unchanged.
func (tx *ImportElisionTransformer) isElisionBlocked(node *ast.Node /*ImportDeclaration | ImportEqualsDeclaration | ExportAssignment | ExportDeclaration*/) bool {
	parsed := tx.EmitContext().ParseNode(node)
	if parsed == node || ast.IsExportAssignment(node) {
		return false
	}

	if parsed == nil || parsed.Kind != node.Kind {
		// no longer safe to elide as the declaration was replaced with a node of a different kind
		return true
	}

	switch node.Kind {
	case ast.KindImportDeclaration:
		n := node.AsImportDeclaration()
		p := parsed.AsImportDeclaration()
		if n.ImportClause != p.ImportClause {
			return true // no longer safe to elide as the import clause has changed
		}
		if n.Attributes != p.Attributes {
			return true // no longer safe to elide as the import attributes have changed
		}
	case ast.KindImportEqualsDeclaration:
		n := node.AsImportEqualsDeclaration()
		p := parsed.AsImportEqualsDeclaration()
		if n.Name() != p.Name() {
			return true // no longer safe to elide as local binding has changed
		}
		if n.IsTypeOnly != p.IsTypeOnly {
			return true // no longer safe to elide as `type` modifier has changed
		}
		if n.ModuleReference != p.ModuleReference && (ast.IsEntityName(n.ModuleReference) || ast.IsEntityName(p.ModuleReference)) {
			return true // no longer safe to elide as EntityName reference has changed.
		}
	case ast.KindExportDeclaration:
		n := node.AsExportDeclaration()
		p := parsed.AsExportDeclaration()
		if n.ExportClause != p.ExportClause {
			return true // no longer safe to elide as the export clause has changed
		}
		if n.Attributes != p.Attributes {
			return true // no longer safe to elide as the export attributes have changed
		}
	}

	return false
}

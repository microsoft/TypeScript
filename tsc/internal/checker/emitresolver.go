package checker

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

var _ printer.EmitResolver = &emitResolver{}

type emitResolver struct {
	checker                 *Checker
	checkerMu               sync.Mutex
	isValueAliasDeclaration func(node *ast.Node) bool
	referenceResolver       binder.ReferenceResolver
}

func isConstEnumOrConstEnumOnlyModule(s *ast.Symbol) bool {
	return isConstEnumSymbol(s) || s.Flags&ast.SymbolFlagsConstEnumOnlyModule != 0
}

func (r *emitResolver) IsReferencedAliasDeclaration(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData || !ast.IsParseTreeNode(node) {
		return true
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	if ast.IsAliasSymbolDeclaration(node) {
		if symbol := c.getSymbolOfDeclaration(node); symbol != nil {
			aliasLinks := c.aliasSymbolLinks.Get(symbol)
			if aliasLinks.referenced {
				return true
			}
			target := aliasLinks.aliasTarget
			if target != nil && node.ModifierFlags()&ast.ModifierFlagsExport != 0 &&
				c.getSymbolFlags(target)&ast.SymbolFlagsValue != 0 &&
				(c.compilerOptions.ShouldPreserveConstEnums() || !isConstEnumOrConstEnumOnlyModule(target)) {
				return true
			}
		}
	}
	return false
}

func (r *emitResolver) IsValueAliasDeclaration(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData || !ast.IsParseTreeNode(node) {
		return true
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.isValueAliasDeclarationWorker(node)
}

func (r *emitResolver) isValueAliasDeclarationWorker(node *ast.Node) bool {
	c := r.checker

	switch node.Kind {
	case ast.KindImportEqualsDeclaration:
		return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), false /*excludeTypeOnlyValues*/)
	case ast.KindImportClause,
		ast.KindNamespaceImport,
		ast.KindImportSpecifier,
		ast.KindExportSpecifier:
		symbol := c.getSymbolOfDeclaration(node)
		return symbol != nil && r.isAliasResolvedToValue(symbol, true /*excludeTypeOnlyValues*/)
	case ast.KindExportDeclaration:
		exportClause := node.AsExportDeclaration().ExportClause
		if r.isValueAliasDeclaration == nil {
			r.isValueAliasDeclaration = r.isValueAliasDeclarationWorker
		}
		return exportClause != nil && (ast.IsNamespaceExport(exportClause) ||
			core.Some(exportClause.AsNamedExports().Elements.Nodes, r.isValueAliasDeclaration))
	case ast.KindExportAssignment:
		if node.AsExportAssignment().Expression != nil && node.AsExportAssignment().Expression.Kind == ast.KindIdentifier {
			return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), true /*excludeTypeOnlyValues*/)
		}
		return true
	}
	return false
}

func (r *emitResolver) isAliasResolvedToValue(symbol *ast.Symbol, excludeTypeOnlyValues bool) bool {
	c := r.checker
	if symbol == nil {
		return false
	}
	if symbol.ValueDeclaration != nil {
		if container := ast.GetSourceFileOfNode(symbol.ValueDeclaration); container != nil {
			fileSymbol := c.getSymbolOfDeclaration(container.AsNode())
			// Ensures cjs export assignment is setup, since this symbol may point at, and merge with, the file itself.
			// If we don't, the merge may not have yet occurred, and the flags check below will be missing flags that
			// are added as a result of the merge.
			c.resolveExternalModuleSymbol(fileSymbol, false /*dontResolveAlias*/)
		}
	}
	target := c.getExportSymbolOfValueSymbolIfExported(c.resolveAlias(symbol))
	if target == c.unknownSymbol {
		return !excludeTypeOnlyValues || c.getTypeOnlyAliasDeclaration(symbol) == nil
	}
	// const enums and modules that contain only const enums are not considered values from the emit perspective
	// unless 'preserveConstEnums' option is set to true
	return c.getSymbolFlagsEx(symbol, excludeTypeOnlyValues, true /*excludeLocalMeanings*/)&ast.SymbolFlagsValue != 0 &&
		(c.compilerOptions.ShouldPreserveConstEnums() ||
			!isConstEnumOrConstEnumOnlyModule(target))
}

func (r *emitResolver) IsTopLevelValueImportEqualsWithEntityName(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData {
		return true
	}
	if !ast.IsParseTreeNode(node) || node.Kind != ast.KindImportEqualsDeclaration || node.Parent.Kind != ast.KindSourceFile {
		return false
	}
	n := node.AsImportEqualsDeclaration()
	if ast.NodeIsMissing(n.ModuleReference) || n.ModuleReference.Kind != ast.KindExternalModuleReference {
		return false
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), false /*excludeTypeOnlyValues*/)
}

func (r *emitResolver) MarkLinkedReferencesRecursively(file *ast.SourceFile) {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	if file != nil {
		var visit ast.Visitor
		visit = func(n *ast.Node) bool {
			if ast.IsImportEqualsDeclaration(n) && n.ModifierFlags()&ast.ModifierFlagsExport == 0 {
				return false // These are deferred and marked in a chain when referenced
			}
			if ast.IsImportDeclaration(n) {
				return false // likewise, these are ultimately what get marked by calls on other nodes - we want to skip them
			}
			r.checker.markLinkedReferences(n, ReferenceHintUnspecified, nil /*propSymbol*/, nil /*parentType*/)
			n.ForEachChild(visit)
			return false
		}
		file.ForEachChild(visit)
	}
}

func (r *emitResolver) GetExternalModuleFileFromDeclaration(node *ast.Node) *ast.SourceFile {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	if ast.IsParseTreeNode(node) {
		// !!!
		// return r.checker.getExternalModuleFileFromDeclaration(node)
	}
	return nil
}

func (r *emitResolver) getReferenceResolver() binder.ReferenceResolver {
	if r.referenceResolver == nil {
		r.referenceResolver = binder.NewReferenceResolver(r.checker.compilerOptions, binder.ReferenceResolverHooks{
			ResolveName:                            r.checker.resolveName,
			GetResolvedSymbol:                      r.checker.getResolvedSymbol,
			GetMergedSymbol:                        r.checker.getMergedSymbol,
			GetParentOfSymbol:                      r.checker.getParentOfSymbol,
			GetSymbolOfDeclaration:                 r.checker.getSymbolOfDeclaration,
			GetTypeOnlyAliasDeclaration:            r.checker.getTypeOnlyAliasDeclarationEx,
			GetExportSymbolOfValueSymbolIfExported: r.checker.getExportSymbolOfValueSymbolIfExported,
		})
	}
	return r.referenceResolver
}

func (r *emitResolver) GetReferencedExportContainer(node *ast.IdentifierNode, prefixLocals bool) *ast.Node /*SourceFile|ModuleDeclaration|EnumDeclaration*/ {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedExportContainer(node, prefixLocals)
}

func (r *emitResolver) GetReferencedImportDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedImportDeclaration(node)
}

func (r *emitResolver) GetReferencedValueDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedValueDeclaration(node)
}

func (r *emitResolver) GetReferencedValueDeclarations(node *ast.IdentifierNode) []*ast.Declaration {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedValueDeclarations(node)
}

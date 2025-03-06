package binder

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
)

type ReferenceResolver interface {
	GetReferencedExportContainer(node *ast.IdentifierNode, prefixLocals bool) *ast.Node
	GetReferencedImportDeclaration(node *ast.IdentifierNode) *ast.Declaration
	GetReferencedValueDeclaration(node *ast.IdentifierNode) *ast.Declaration
	GetReferencedValueDeclarations(node *ast.IdentifierNode) []*ast.Declaration
}

type ReferenceResolverHooks struct {
	ResolveName                            func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol
	GetResolvedSymbol                      func(*ast.Node) *ast.Symbol
	GetMergedSymbol                        func(*ast.Symbol) *ast.Symbol
	GetParentOfSymbol                      func(*ast.Symbol) *ast.Symbol
	GetSymbolOfDeclaration                 func(*ast.Declaration) *ast.Symbol
	GetTypeOnlyAliasDeclaration            func(symbol *ast.Symbol, include ast.SymbolFlags) *ast.Declaration
	GetExportSymbolOfValueSymbolIfExported func(*ast.Symbol) *ast.Symbol
}

var _ ReferenceResolver = &referenceResolver{}

type referenceResolver struct {
	resolver *NameResolver
	hooks    ReferenceResolverHooks
}

func NewReferenceResolver(hooks ReferenceResolverHooks) ReferenceResolver {
	return &referenceResolver{
		hooks: hooks,
	}
}

func (r *referenceResolver) getResolvedSymbol(node *ast.Node) *ast.Symbol {
	if node != nil {
		if r.hooks.GetResolvedSymbol != nil {
			return r.hooks.GetResolvedSymbol(node)
		}
	}
	return nil
}

func (r *referenceResolver) getMergedSymbol(symbol *ast.Symbol) *ast.Symbol {
	if symbol != nil {
		if r.hooks.GetMergedSymbol != nil {
			return r.hooks.GetMergedSymbol(symbol)
		}
		return symbol
	}
	return nil
}

func (r *referenceResolver) getParentOfSymbol(symbol *ast.Symbol) *ast.Symbol {
	if symbol != nil {
		if r.hooks.GetParentOfSymbol != nil {
			return r.hooks.GetParentOfSymbol(symbol)
		}
		return symbol.Parent
	}
	return nil
}

func (r *referenceResolver) getSymbolOfDeclaration(declaration *ast.Declaration) *ast.Symbol {
	if declaration != nil {
		if r.hooks.GetSymbolOfDeclaration != nil {
			return r.hooks.GetSymbolOfDeclaration(declaration)
		}
		return declaration.Symbol()
	}
	return nil
}

func (r *referenceResolver) getReferencedValueSymbol(reference *ast.IdentifierNode, startInDeclarationContainer bool) *ast.Symbol {
	resolvedSymbol := r.getResolvedSymbol(reference)
	if resolvedSymbol != nil {
		return resolvedSymbol
	}

	location := reference
	if startInDeclarationContainer && reference.Parent != nil && ast.IsDeclaration(reference.Parent) && reference.Parent.Name() == reference {
		location = ast.GetDeclarationContainer(reference.Parent)
	}

	if r.hooks.ResolveName != nil {
		return r.hooks.ResolveName(location, reference.Text(), ast.SymbolFlagsExportValue|ast.SymbolFlagsValue|ast.SymbolFlagsAlias, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/)
	}

	if r.resolver == nil {
		r.resolver = &NameResolver{}
	}

	return r.resolver.Resolve(location, reference.Text(), ast.SymbolFlagsExportValue|ast.SymbolFlagsValue|ast.SymbolFlagsAlias, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/)
}

func (r *referenceResolver) isTypeOnlyAliasDeclaration(symbol *ast.Symbol) bool {
	if symbol != nil {
		if r.hooks.GetTypeOnlyAliasDeclaration != nil {
			return r.hooks.GetTypeOnlyAliasDeclaration(symbol, ast.SymbolFlagsValue) != nil
		}

		node := r.getDeclarationOfAliasSymbol(symbol)
		for node != nil {
			switch node.Kind {
			case ast.KindImportEqualsDeclaration, ast.KindExportDeclaration:
				return node.IsTypeOnly()
			case ast.KindImportClause, ast.KindImportSpecifier, ast.KindExportSpecifier:
				if node.IsTypeOnly() {
					return true
				}
				node = node.Parent
				continue
			case ast.KindNamedImports, ast.KindNamedExports:
				node = node.Parent
				continue
			}
			break
		}
	}
	return false
}

func (r *referenceResolver) getDeclarationOfAliasSymbol(symbol *ast.Symbol) *ast.Declaration {
	return core.FindLast(symbol.Declarations, ast.IsAliasSymbolDeclaration)
}

func (r *referenceResolver) getExportSymbolOfValueSymbolIfExported(symbol *ast.Symbol) *ast.Symbol {
	if symbol != nil {
		if r.hooks.GetExportSymbolOfValueSymbolIfExported != nil {
			return r.hooks.GetExportSymbolOfValueSymbolIfExported(symbol)
		}
		if symbol.Flags&ast.SymbolFlagsExportValue != 0 && symbol.ExportSymbol != nil {
			symbol = symbol.ExportSymbol
		}
		return r.getMergedSymbol(symbol)
	}
	return nil
}

func (r *referenceResolver) GetReferencedExportContainer(node *ast.IdentifierNode, prefixLocals bool) *ast.Node /*SourceFile|ModuleDeclaration|EnumDeclaration*/ {
	// When resolving the export for the name of a module or enum
	// declaration, we need to start resolution at the declaration's container.
	// Otherwise, we could incorrectly resolve the export as the
	// declaration if it contains an exported member with the same name.
	startInDeclarationContainer := node.Parent != nil && (node.Parent.Kind == ast.KindModuleDeclaration || node.Parent.Kind == ast.KindEnumDeclaration) && node == node.Parent.Name()
	if symbol := r.getReferencedValueSymbol(node, startInDeclarationContainer); symbol != nil {
		if symbol.Flags&ast.SymbolFlagsExportValue != 0 {
			// If we reference an exported entity within the same module declaration, then whether
			// we prefix depends on the kind of entity. SymbolFlags.ExportHasLocal encompasses all the
			// kinds that we do NOT prefix.
			exportSymbol := r.getMergedSymbol(symbol.ExportSymbol)
			if !prefixLocals && exportSymbol.Flags&(ast.SymbolFlagsExportHasLocal|ast.SymbolFlagsVariable) == 0 {
				return nil
			}
			symbol = exportSymbol
		}
		parentSymbol := r.getParentOfSymbol(symbol)
		if parentSymbol != nil {
			if parentSymbol.Flags&ast.SymbolFlagsValueModule != 0 && parentSymbol.ValueDeclaration != nil && parentSymbol.ValueDeclaration.Kind == ast.KindSourceFile {
				symbolFile := parentSymbol.ValueDeclaration.AsSourceFile()
				referenceFile := ast.GetSourceFileOfNode(node)
				// If `node` accesses an export and that export isn't in the same file, then symbol is a namespace export, so return nil.
				symbolIsUmdExport := symbolFile != referenceFile
				if symbolIsUmdExport {
					return nil
				}
				return symbolFile.AsNode()
			}
			isMatchingContainer := func(n *ast.Node) bool {
				return (n.Kind == ast.KindModuleDeclaration || n.Kind == ast.KindEnumDeclaration) && r.getSymbolOfDeclaration(n) == parentSymbol
			}
			if container := ast.FindAncestor(symbol.ValueDeclaration, isMatchingContainer); container != nil {
				return container
			}
			return ast.FindAncestor(node.Parent, isMatchingContainer)
		}
	}

	return nil
}

func (r *referenceResolver) GetReferencedImportDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	if symbol := r.getReferencedValueSymbol(node, false /*startInDeclarationContainer*/); symbol != nil {
		// We should only get the declaration of an alias if there isn't a local value
		// declaration for the symbol
		if ast.IsNonLocalAlias(symbol, ast.SymbolFlagsValue /*excludes*/) && !r.isTypeOnlyAliasDeclaration(symbol) {
			return r.getDeclarationOfAliasSymbol(symbol)
		}
	}

	return nil
}

func (r *referenceResolver) GetReferencedValueDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	if symbol := r.getReferencedValueSymbol(node, false /*startInDeclarationContainer*/); symbol != nil {
		return r.getExportSymbolOfValueSymbolIfExported(symbol).ValueDeclaration
	}
	return nil
}

func (r *referenceResolver) GetReferencedValueDeclarations(node *ast.IdentifierNode) []*ast.Declaration {
	var declarations []*ast.Declaration
	if symbol := r.getReferencedValueSymbol(node, false /*startInDeclarationContainer*/); symbol != nil {
		symbol = r.getExportSymbolOfValueSymbolIfExported(symbol)
		for _, declaration := range symbol.Declarations {
			switch declaration.Kind {
			case ast.KindVariableDeclaration,
				ast.KindParameter,
				ast.KindBindingElement,
				ast.KindPropertyDeclaration,
				ast.KindPropertyAssignment,
				ast.KindShorthandPropertyAssignment,
				ast.KindEnumMember,
				ast.KindObjectLiteralExpression,
				ast.KindFunctionDeclaration,
				ast.KindFunctionExpression,
				ast.KindArrowFunction,
				ast.KindClassDeclaration,
				ast.KindClassExpression,
				ast.KindEnumDeclaration,
				ast.KindMethodDeclaration,
				ast.KindGetAccessor,
				ast.KindSetAccessor,
				ast.KindModuleDeclaration:
				declarations = append(declarations, declaration)
			}
		}
	}
	return declarations
}

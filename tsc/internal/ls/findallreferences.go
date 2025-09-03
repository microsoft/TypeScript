package ls

import (
	"cmp"
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"

	"github.com/microsoft/typescript-go/internal/tspath"
)

// === types for settings ===
type referenceUse int

const (
	referenceUseNone       referenceUse = 0
	referenceUseOther      referenceUse = 1
	referenceUseReferences referenceUse = 2
	referenceUseRename     referenceUse = 3
)

type refOptions struct {
	findInStrings       bool
	findInComments      bool
	use                 referenceUse // other, references, rename
	implementations     bool
	useAliasesForRename bool // renamed from providePrefixAndSuffixTextForRename. default: true
}

// === types for results ===

type refInfo struct {
	file       *ast.SourceFile
	fileName   string
	reference  *ast.FileReference
	unverified bool
}

type SymbolAndEntries struct {
	definition *Definition
	references []*referenceEntry
}

func NewSymbolAndEntries(kind definitionKind, node *ast.Node, symbol *ast.Symbol, references []*referenceEntry) *SymbolAndEntries {
	return &SymbolAndEntries{
		&Definition{
			Kind:   kind,
			node:   node,
			symbol: symbol,
		},
		references,
	}
}

type definitionKind int

const (
	definitionKindSymbol               definitionKind = 0
	definitionKindLabel                definitionKind = 1
	definitionKindKeyword              definitionKind = 2
	definitionKindThis                 definitionKind = 3
	definitionKindString               definitionKind = 4
	definitionKindTripleSlashReference definitionKind = 5
)

type Definition struct {
	Kind               definitionKind
	symbol             *ast.Symbol
	node               *ast.Node
	tripleSlashFileRef *tripleSlashDefinition
}
type tripleSlashDefinition struct {
	reference *ast.FileReference
	file      *ast.SourceFile
}

type entryKind int

const (
	entryKindNone                       entryKind = 0
	entryKindRange                      entryKind = 1
	entryKindNode                       entryKind = 2
	entryKindStringLiteral              entryKind = 3
	entryKindSearchedLocalFoundProperty entryKind = 4
	entryKindSearchedPropertyFoundLocal entryKind = 5
)

type referenceEntry struct {
	kind      entryKind
	node      *ast.Node
	context   *ast.Node // !!! ContextWithStartAndEndNode, optional
	fileName  string
	textRange *lsproto.Range
}

func (l *LanguageService) getRangeOfEntry(entry *referenceEntry) *lsproto.Range {
	return l.resolveEntry(entry).textRange
}

func (l *LanguageService) getFileNameOfEntry(entry *referenceEntry) string {
	return l.resolveEntry(entry).fileName
}

func (l *LanguageService) resolveEntry(entry *referenceEntry) *referenceEntry {
	if entry.textRange == nil {
		sourceFile := ast.GetSourceFileOfNode(entry.node)
		entry.textRange = l.getRangeOfNode(entry.node, sourceFile, nil /*endNode*/)
		entry.fileName = sourceFile.FileName()
	}
	return entry
}

func (l *LanguageService) newRangeEntry(file *ast.SourceFile, start, end int) *referenceEntry {
	// !!! used in not-yet implemented features
	return &referenceEntry{
		kind:      entryKindRange,
		fileName:  file.FileName(),
		textRange: l.createLspRangeFromBounds(start, end, file),
	}
}

func newNodeEntryWithKind(node *ast.Node, kind entryKind) *referenceEntry {
	e := newNodeEntry(node)
	e.kind = kind
	return e
}

func newNodeEntry(node *ast.Node) *referenceEntry {
	// creates nodeEntry with `kind == entryKindNode`
	return &referenceEntry{
		kind:    entryKindNode,
		node:    core.OrElse(node.Name(), node),
		context: getContextNodeForNodeEntry(node),
	}
}

func getContextNodeForNodeEntry(node *ast.Node) *ast.Node {
	if ast.IsDeclaration(node) {
		return getContextNode(node)
	}

	if node.Parent == nil {
		return nil
	}

	if !ast.IsDeclaration(node.Parent) && node.Parent.Kind != ast.KindExportAssignment && node.Parent.Kind != ast.KindJSExportAssignment {
		// Special property assignment in javascript
		if ast.IsInJSFile(node) {
			// !!! jsdoc: check if branch still needed
			binaryExpression := core.IfElse(node.Parent.Kind == ast.KindBinaryExpression,
				node.Parent,
				core.IfElse(ast.IsAccessExpression(node.Parent) && node.Parent.Parent.Kind == ast.KindBinaryExpression && node.Parent.Parent.AsBinaryExpression().Left == node.Parent,
					node.Parent.Parent,
					nil))
			if binaryExpression != nil && ast.GetAssignmentDeclarationKind(binaryExpression.AsBinaryExpression()) != ast.JSDeclarationKindNone {
				return getContextNode(binaryExpression)
			}
		}

		// Jsx Tags
		switch node.Parent.Kind {
		case ast.KindJsxOpeningElement, ast.KindJsxClosingElement:
			return node.Parent.Parent
		case ast.KindJsxSelfClosingElement, ast.KindLabeledStatement, ast.KindBreakStatement, ast.KindContinueStatement:
			return node.Parent
		case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
			if validImport := tryGetImportFromModuleSpecifier(node); validImport != nil {
				declOrStatement := ast.FindAncestor(validImport, func(*ast.Node) bool {
					return ast.IsDeclaration(node) || ast.IsStatement(node) || ast.IsJSDocTag(node)
				})
				if ast.IsDeclaration(declOrStatement) {
					return getContextNode(declOrStatement)
				}
				return declOrStatement
			}
		}

		// Handle computed property name
		propertyName := ast.FindAncestor(node, ast.IsComputedPropertyName)
		if propertyName != nil {
			return getContextNode(propertyName.Parent)
		}
		return nil
	}

	if node.Parent.Name() == node || // node is name of declaration, use parent
		node.Parent.Kind == ast.KindConstructor ||
		node.Parent.Kind == ast.KindExportAssignment ||
		node.Parent.Kind == ast.KindJSExportAssignment ||
		// Property name of the import export specifier or binding pattern, use parent
		((ast.IsImportOrExportSpecifier(node.Parent) || node.Parent.Kind == ast.KindBindingElement) && node.Parent.PropertyName() == node) ||
		// Is default export
		(node.Kind == ast.KindDefaultKeyword && ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsExportDefault)) {
		return getContextNode(node.Parent)
	}

	return nil
}

func getContextNode(node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}
	switch node.Kind {
	case ast.KindVariableDeclaration:
		if !ast.IsVariableDeclarationList(node.Parent) || len(node.Parent.AsVariableDeclarationList().Declarations.Nodes) != 1 {
			return node
		} else if ast.IsVariableStatement(node.Parent.Parent) {
			return node.Parent.Parent
		} else if ast.IsForInOrOfStatement(node.Parent.Parent) {
			return getContextNode(node.Parent.Parent)
		}
		return node.Parent

	case ast.KindBindingElement:
		return getContextNode(node.Parent.Parent)

	case ast.KindImportSpecifier:
		return node.Parent.Parent.Parent

	case ast.KindExportSpecifier, ast.KindNamespaceImport:
		return node.Parent.Parent

	case ast.KindImportClause, ast.KindNamespaceExport:
		return node.Parent

	case ast.KindBinaryExpression:
		return core.IfElse(node.Parent.Kind == ast.KindExpressionStatement, node.Parent, node)

	case ast.KindForOfStatement, ast.KindForInStatement:
		// !!! not implemented
		return nil

	case ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
		if isArrayLiteralOrObjectLiteralDestructuringPattern(node.Parent) {
			return getContextNode(ast.FindAncestor(node.Parent, func(node *ast.Node) bool {
				return node.Kind == ast.KindBinaryExpression || ast.IsForInOrOfStatement(node)
			}))
		}
		return node
	case ast.KindSwitchStatement:
		// !!! not implemented
		return nil
	default:
		return node
	}
}

// utils
func (l *LanguageService) getRangeOfNode(node *ast.Node, sourceFile *ast.SourceFile, endNode *ast.Node) *lsproto.Range {
	if sourceFile == nil {
		sourceFile = ast.GetSourceFileOfNode(node)
	}
	start := scanner.GetTokenPosOfNode(node, sourceFile, false /*includeJsDoc*/)
	end := core.IfElse(endNode != nil, endNode, node).End()
	if ast.IsStringLiteralLike(node) && (end-start) > 2 {
		if endNode != nil {
			panic("endNode is not nil for stringLiteralLike")
		}
		start += 1
		end -= 1
	}
	if endNode != nil && endNode.Kind == ast.KindCaseBlock {
		end = endNode.Pos()
	}
	return l.createLspRangeFromBounds(start, end, sourceFile)
}

func isValidReferencePosition(node *ast.Node, searchSymbolName string) bool {
	switch node.Kind {
	case ast.KindPrivateIdentifier:
		// !!!
		// if (isJSDocMemberName(node.Parent)) {
		// 	return true;
		// }
		return len(node.Text()) == len(searchSymbolName)
	case ast.KindIdentifier:
		return len(node.Text()) == len(searchSymbolName)
	case ast.KindNoSubstitutionTemplateLiteral, ast.KindStringLiteral:
		return len(node.Text()) == len(searchSymbolName) && (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
			isNameOfModuleDeclaration(node) ||
			isExpressionOfExternalModuleImportEqualsDeclaration(node) ||
			// !!! object.defineProperty
			// (ast.IsCallExpression(node.Parent) && ast.IsBindableObjectDefinePropertyCall(node.Parent) && node.Parent.Arguments()[1] == node) ||
			ast.IsImportOrExportSpecifier(node.Parent))
	case ast.KindNumericLiteral:
		return isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && len(node.Text()) == len(searchSymbolName)
	case ast.KindDefaultKeyword:
		return len("default") == len(searchSymbolName)
	}
	return false
}

func isForRenameWithPrefixAndSuffixText(options refOptions) bool {
	return options.use == referenceUseRename && options.useAliasesForRename
}

func skipPastExportOrImportSpecifierOrUnion(symbol *ast.Symbol, node *ast.Node, checker *checker.Checker, useLocalSymbolForExportSpecifier bool) *ast.Symbol {
	if node == nil {
		return nil
	}
	parent := node.Parent
	if parent.Kind == ast.KindExportSpecifier && useLocalSymbolForExportSpecifier {
		return getLocalSymbolForExportSpecifier(node.AsIdentifier(), symbol, parent.AsExportSpecifier(), checker)
	}
	// If the symbol is declared as part of a declaration like `{ type: "a" } | { type: "b" }`, use the property on the union type to get more references.
	return core.FirstNonNil(symbol.Declarations, func(decl *ast.Node) *ast.Symbol {
		if decl.Parent == nil {
			// Ignore UMD module and global merge
			if symbol.Flags&ast.SymbolFlagsTransient != 0 {
				return nil
			}
			// Assertions for GH#21814. We should be handling SourceFile symbols in `getReferencedSymbolsForModule` instead of getting here.
			panic(fmt.Sprintf("Unexpected symbol at %s: %s", node.Kind.String(), symbol.Name))
		}
		if decl.Parent.Kind == ast.KindTypeLiteral && decl.Parent.Parent.Kind == ast.KindUnionType {
			return checker.GetPropertyOfType(checker.GetTypeFromTypeNode(decl.Parent.Parent), symbol.Name)
		}
		return nil
	})
}

func getSymbolScope(symbol *ast.Symbol) *ast.Node {
	// If this is the symbol of a named function expression or named class expression,
	// then named references are limited to its own scope.
	valueDeclaration := symbol.ValueDeclaration
	if valueDeclaration != nil && (valueDeclaration.Kind == ast.KindFunctionExpression || valueDeclaration.Kind == ast.KindClassExpression) {
		return valueDeclaration
	}

	if len(symbol.Declarations) == 0 {
		return nil
	}

	declarations := symbol.Declarations
	// If this is private property or method, the scope is the containing class
	if symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod) != 0 {
		privateDeclaration := core.Find(declarations, func(d *ast.Node) bool {
			return checker.HasModifier(d, ast.ModifierFlagsPrivate) || ast.IsPrivateIdentifierClassElementDeclaration(d)
		})
		if privateDeclaration != nil {
			return ast.FindAncestorKind(privateDeclaration, ast.KindClassDeclaration)
		}
		// Else this is a public property and could be accessed from anywhere.
		return nil
	}

	// If symbol is of object binding pattern element without property name we would want to
	// look for property too and that could be anywhere
	if core.Some(declarations, isObjectBindingElementWithoutPropertyName) {
		return nil
	}

	/*
		If the symbol has a parent, it's globally visible unless:
		- It's a private property (handled above).
		- It's a type parameter.
		- The parent is an external module: then we should only search in the module (and recurse on the export later).
		- But if the parent has `export as namespace`, the symbol is globally visible through that namespace.
	*/
	exposedByParent := symbol.Parent != nil && symbol.Flags&ast.SymbolFlagsTypeParameter == 0
	if exposedByParent && !(checker.IsExternalModuleSymbol(symbol.Parent) && symbol.Parent.GlobalExports == nil) {
		return nil
	}

	var scope *ast.Node
	for _, declaration := range declarations {
		container := getContainerNode(declaration)
		if scope != nil && scope != container {
			// Different declarations have different containers, bail out
			return nil
		}

		if container == nil || (container.Kind == ast.KindSourceFile && !ast.IsExternalOrCommonJSModule(container.AsSourceFile())) {
			// This is a global variable and not an external module, any declaration defined
			// within this scope is visible outside the file
			return nil
		}

		scope = container
	}

	// If symbol.parent, this means we are in an export of an external module. (Otherwise we would have returned `undefined` above.)
	// For an export of a module, we may be in a declaration file, and it may be accessed elsewhere. E.g.:
	//     declare module "a" { export type T = number; }
	//     declare module "b" { import { T } from "a"; export const x: T; }
	// So we must search the whole source file. (Because we will mark the source file as seen, we we won't return to it when searching for imports.)
	if exposedByParent {
		return ast.GetSourceFileOfNode(scope).AsNode()
	}
	return scope // TODO: GH#18217
}

// === functions on (*ls) ===

func (l *LanguageService) ProvideReferences(ctx context.Context, params *lsproto.ReferenceParams) (lsproto.ReferencesResponse, error) {
	// `findReferencedSymbols` except only computes the information needed to return reference locations
	program, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	position := int(l.converters.LineAndCharacterToPosition(sourceFile, params.Position))

	node := astnav.GetTouchingPropertyName(sourceFile, position)
	options := refOptions{use: referenceUseReferences}

	symbolsAndEntries := l.getReferencedSymbolsForNode(ctx, position, node, program, program.GetSourceFiles(), options, nil)

	locations := core.FlatMap(symbolsAndEntries, l.convertSymbolAndEntriesToLocations)
	return lsproto.LocationsOrNull{Locations: &locations}, nil
}

func (l *LanguageService) ProvideImplementations(ctx context.Context, params *lsproto.ImplementationParams) (lsproto.ImplementationResponse, error) {
	program, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	position := int(l.converters.LineAndCharacterToPosition(sourceFile, params.Position))
	node := astnav.GetTouchingPropertyName(sourceFile, position)

	var seenNodes collections.Set[*ast.Node]
	var entries []*referenceEntry
	queue := l.getImplementationReferenceEntries(ctx, program, node, position)
	for len(queue) != 0 {
		if ctx.Err() != nil {
			return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, ctx.Err()
		}

		entry := queue[0]
		queue = queue[1:]
		if !seenNodes.Has(entry.node) {
			seenNodes.Add(entry.node)
			entries = append(entries, entry)
			queue = append(queue, l.getImplementationReferenceEntries(ctx, program, entry.node, entry.node.Pos())...)
		}
	}

	locations := l.convertEntriesToLocations(entries)
	return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{Locations: &locations}, nil
}

func (l *LanguageService) getImplementationReferenceEntries(ctx context.Context, program *compiler.Program, node *ast.Node, position int) []*referenceEntry {
	options := refOptions{use: referenceUseReferences, implementations: true}
	symbolsAndEntries := l.getReferencedSymbolsForNode(ctx, position, node, program, program.GetSourceFiles(), options, nil)
	return core.FlatMap(symbolsAndEntries, func(s *SymbolAndEntries) []*referenceEntry { return s.references })
}

func (l *LanguageService) ProvideRename(ctx context.Context, params *lsproto.RenameParams) (lsproto.WorkspaceEditOrNull, error) {
	program, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	position := int(l.converters.LineAndCharacterToPosition(sourceFile, params.Position))
	node := astnav.GetTouchingPropertyName(sourceFile, position)
	if node.Kind != ast.KindIdentifier {
		return lsproto.WorkspaceEditOrNull{}, nil
	}
	options := refOptions{use: referenceUseRename, useAliasesForRename: true}
	symbolsAndEntries := l.getReferencedSymbolsForNode(ctx, position, node, program, program.GetSourceFiles(), options, nil)
	entries := core.FlatMap(symbolsAndEntries, func(s *SymbolAndEntries) []*referenceEntry { return s.references })
	changes := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	checker, done := program.GetTypeChecker(ctx)
	defer done()
	for _, entry := range entries {
		uri := FileNameToDocumentURI(l.getFileNameOfEntry(entry))
		textEdit := &lsproto.TextEdit{
			Range:   *l.getRangeOfEntry(entry),
			NewText: l.getTextForRename(node, entry, params.NewName, checker),
		}
		changes[uri] = append(changes[uri], textEdit)
	}
	return lsproto.WorkspaceEditOrNull{
		WorkspaceEdit: &lsproto.WorkspaceEdit{
			Changes: &changes,
		},
	}, nil
}

func (l *LanguageService) getTextForRename(originalNode *ast.Node, entry *referenceEntry, newText string, checker *checker.Checker) string {
	if entry.kind != entryKindRange && (ast.IsIdentifier(originalNode) || ast.IsStringLiteralLike(originalNode)) {
		node := entry.node
		kind := entry.kind
		parent := node.Parent
		name := originalNode.Text()
		isShorthandAssignment := ast.IsShorthandPropertyAssignment(parent)
		switch {
		case isShorthandAssignment || (isObjectBindingElementWithoutPropertyName(parent) && parent.Name() == node && parent.AsBindingElement().DotDotDotToken == nil):
			if kind == entryKindSearchedLocalFoundProperty {
				return name + ": " + newText
			}
			if kind == entryKindSearchedPropertyFoundLocal {
				return newText + ": " + name
			}
			// In `const o = { x }; o.x`, symbolAtLocation at `x` in `{ x }` is the property symbol.
			// For a binding element `const { x } = o;`, symbolAtLocation at `x` is the property symbol.
			if isShorthandAssignment {
				grandParent := parent.Parent
				if ast.IsObjectLiteralExpression(grandParent) && ast.IsBinaryExpression(grandParent.Parent) && ast.IsModuleExportsAccessExpression(grandParent.Parent.AsBinaryExpression().Left) {
					return name + ": " + newText
				}
				return newText + ": " + name
			}
			return name + ": " + newText
		case ast.IsImportSpecifier(parent) && parent.PropertyName() == nil:
			// If the original symbol was using this alias, just rename the alias.
			var originalSymbol *ast.Symbol
			if ast.IsExportSpecifier(originalNode.Parent) {
				originalSymbol = checker.GetExportSpecifierLocalTargetSymbol(originalNode.Parent)
			} else {
				originalSymbol = checker.GetSymbolAtLocation(originalNode)
			}
			if slices.Contains(originalSymbol.Declarations, parent) {
				return name + " as " + newText
			}
			return newText
		case ast.IsExportSpecifier(parent) && parent.PropertyName() == nil:
			// If the symbol for the node is same as declared node symbol use prefix text
			if originalNode == entry.node || checker.GetSymbolAtLocation(originalNode) == checker.GetSymbolAtLocation(entry.node) {
				return name + " as " + newText
			}
			return newText + " as " + name
		}
	}
	return newText
}

// == functions for conversions ==
func (l *LanguageService) convertSymbolAndEntriesToLocations(s *SymbolAndEntries) []lsproto.Location {
	return l.convertEntriesToLocations(s.references)
}

func (l *LanguageService) convertEntriesToLocations(entries []*referenceEntry) []lsproto.Location {
	locations := make([]lsproto.Location, len(entries))
	for i, entry := range entries {
		locations[i] = lsproto.Location{
			Uri:   FileNameToDocumentURI(l.getFileNameOfEntry(entry)),
			Range: *l.getRangeOfEntry(entry),
		}
	}
	return locations
}

func (l *LanguageService) mergeReferences(program *compiler.Program, referencesToMerge ...[]*SymbolAndEntries) []*SymbolAndEntries {
	result := []*SymbolAndEntries{}
	getSourceFileIndexOfEntry := func(program *compiler.Program, entry *referenceEntry) int {
		var sourceFile *ast.SourceFile
		if entry.kind == entryKindRange {
			sourceFile = program.GetSourceFile(entry.fileName)
		} else {
			sourceFile = ast.GetSourceFileOfNode(entry.node)
		}
		return slices.Index(program.SourceFiles(), sourceFile)
	}

	for _, references := range referencesToMerge {
		if len(references) == 0 {
			continue
		}
		if len(result) == 0 {
			result = references
			continue
		}
		for _, entry := range references {
			if entry.definition == nil || entry.definition.Kind != definitionKindSymbol {
				result = append(result, entry)
				continue
			}
			symbol := entry.definition.symbol
			refIndex := core.FindIndex(result, func(ref *SymbolAndEntries) bool {
				return ref.definition != nil &&
					ref.definition.Kind == definitionKindSymbol &&
					ref.definition.symbol == symbol
			})
			if refIndex == -1 {
				result = append(result, entry)
				continue
			}

			reference := result[refIndex]
			sortedRefs := append(reference.references, entry.references...)
			slices.SortStableFunc(sortedRefs, func(entry1, entry2 *referenceEntry) int {
				entry1File := getSourceFileIndexOfEntry(program, entry1)
				entry2File := getSourceFileIndexOfEntry(program, entry2)
				if entry1File != entry2File {
					return cmp.Compare(entry1File, entry2File)
				}

				return CompareRanges(l.getRangeOfEntry(entry1), l.getRangeOfEntry(entry2))
			})
			result[refIndex] = &SymbolAndEntries{
				definition: reference.definition,
				references: sortedRefs,
			}
		}
	}
	return result
}

// === functions for find all ref implementation ===

func (l *LanguageService) getReferencedSymbolsForNode(ctx context.Context, position int, node *ast.Node, program *compiler.Program, sourceFiles []*ast.SourceFile, options refOptions, sourceFilesSet *collections.Set[string]) []*SymbolAndEntries {
	// !!! cancellationToken
	if sourceFilesSet == nil || sourceFilesSet.Len() == 0 {
		sourceFilesSet = collections.NewSetWithSizeHint[string](len(sourceFiles))
		for _, file := range sourceFiles {
			sourceFilesSet.Add(file.FileName())
		}
	}

	checker, done := program.GetTypeChecker(ctx)
	defer done()

	if node.Kind == ast.KindSourceFile {
		resolvedRef := getReferenceAtPosition(node.AsSourceFile(), position, program)
		if resolvedRef.file == nil {
			return nil
		}

		if moduleSymbol := checker.GetMergedSymbol(resolvedRef.file.Symbol); moduleSymbol != nil {
			return getReferencedSymbolsForModule(program, moduleSymbol /*excludeImportTypeOfExportEquals*/, false, sourceFiles, sourceFilesSet)
		}

		// !!! not implemented
		// fileIncludeReasons := program.getFileIncludeReasons();
		// if (!fileIncludeReasons) {
		// 	return nil
		// }
		return []*SymbolAndEntries{{
			definition: &Definition{Kind: definitionKindTripleSlashReference, tripleSlashFileRef: &tripleSlashDefinition{reference: resolvedRef.reference}},
			references: getReferencesForNonModule(resolvedRef.file, program /*fileIncludeReasons,*/),
		}}
	}

	if !options.implementations {
		// !!! cancellationToken
		if special := getReferencedSymbolsSpecial(node, sourceFiles); special != nil {
			return special
		}
	}

	// constructors should use the class symbol, detected by name, if present
	symbol := checker.GetSymbolAtLocation(core.IfElse(node.Kind == ast.KindConstructor && node.Parent.Name() != nil, node.Parent.Name(), node))
	// Could not find a symbol e.g. unknown identifier
	if symbol == nil {
		// String literal might be a property (and thus have a symbol), so do this here rather than in getReferencedSymbolsSpecial.
		if !options.implementations && ast.IsStringLiteralLike(node) {
			if isModuleSpecifierLike(node) {
				// !!! not implemented
				// fileIncludeReasons := program.GetFileIncludeReasons()
				// if referencedFile := program.GetResolvedModuleFromModuleSpecifier(node, nil /*sourceFile*/); referencedFile != nil {
				// return []*SymbolAndEntries{{
				// 	definition: &Definition{Kind: definitionKindString, node: node},
				// 	references: getReferencesForNonModule(referencedFile, program /*fileIncludeReasons,*/),
				// }}
				// }
				// Fall through to string literal references. This is not very likely to return
				// anything useful, but I guess it's better than nothing, and there's an existing
				// test that expects this to happen (fourslash/cases/untypedModuleImport.ts).
			}
			// !!! not implemented
			// return getReferencesForStringLiteral(node, sourceFiles, checker) // !!! cancellationToken
			return nil
		}
		return nil
	}

	if symbol.Name == ast.InternalSymbolNameExportEquals {
		return getReferencedSymbolsForModule(program, symbol.Parent, false /*excludeImportTypeOfExportEquals*/, sourceFiles, sourceFilesSet)
	}

	moduleReferences := l.getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx, symbol, program, sourceFiles, checker, options, sourceFilesSet) // !!! cancellationToken
	if moduleReferences != nil && symbol.Flags&ast.SymbolFlagsTransient != 0 {
		return moduleReferences
	}

	aliasedSymbol := getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker)
	moduleReferencesOfExportTarget := l.getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx, aliasedSymbol, program, sourceFiles, checker, options, sourceFilesSet) // !!! cancellationToken

	references := getReferencedSymbolsForSymbol(symbol, node, sourceFiles, sourceFilesSet, checker, options) // !!! cancellationToken
	return l.mergeReferences(program, moduleReferences, references, moduleReferencesOfExportTarget)
}

func (l *LanguageService) getReferencedSymbolsForModuleIfDeclaredBySourceFile(ctx context.Context, symbol *ast.Symbol, program *compiler.Program, sourceFiles []*ast.SourceFile, checker *checker.Checker, options refOptions, sourceFilesSet *collections.Set[string]) []*SymbolAndEntries {
	moduleSourceFileName := ""
	if symbol == nil || !((symbol.Flags&ast.SymbolFlagsModule != 0) && len(symbol.Declarations) != 0) {
		return nil
	}
	if moduleSourceFile := core.Find(symbol.Declarations, ast.IsSourceFile); moduleSourceFile != nil {
		moduleSourceFileName = moduleSourceFile.AsSourceFile().FileName()
	} else {
		return nil
	}
	exportEquals := symbol.Exports[ast.InternalSymbolNameExportEquals]
	// If exportEquals != nil, we're about to add references to `import("mod")` anyway, so don't double-count them.
	moduleReferences := getReferencedSymbolsForModule(program, symbol, exportEquals != nil, sourceFiles, sourceFilesSet)
	if exportEquals == nil || !sourceFilesSet.Has(moduleSourceFileName) {
		return moduleReferences
	}
	symbol, _ = checker.ResolveAlias(exportEquals)
	return l.mergeReferences(program, moduleReferences, getReferencedSymbolsForSymbol(symbol /*node*/, nil, sourceFiles, sourceFilesSet, checker /*, cancellationToken*/, options))
}

func getReferencedSymbolsSpecial(node *ast.Node, sourceFiles []*ast.SourceFile) []*SymbolAndEntries {
	if isTypeKeyword(node.Kind) {
		// A void expression (i.e., `void foo()`) is not special, but the `void` type is.
		if node.Kind == ast.KindVoidKeyword && node.Parent.Kind == ast.KindVoidExpression {
			return nil
		}

		// A modifier readonly (like on a property declaration) is not special;
		// a readonly type keyword (like `readonly string[]`) is.
		if node.Kind == ast.KindReadonlyKeyword && !isReadonlyTypeOperator(node) {
			return nil
		}
		// Likewise, when we *are* looking for a special keyword, make sure we
		// *don't* include readonly member modifiers.
		return getAllReferencesForKeyword(
			sourceFiles,
			node.Kind,
			// cancellationToken,
			node.Kind == ast.KindReadonlyKeyword,
		)
	}

	if ast.IsImportMeta(node.Parent) && node.Parent.Name() == node {
		// !!! unimplemented
		return nil // getAllReferencesForImportMeta(sourceFiles /*, cancellationToken*/)
	}

	if node.Kind == ast.KindStaticKeyword && node.Parent.Kind == ast.KindClassStaticBlockDeclaration {
		return []*SymbolAndEntries{{definition: &Definition{Kind: definitionKindKeyword, node: node}, references: []*referenceEntry{newNodeEntry(node)}}}
	}

	// Labels
	if isJumpStatementTarget(node) {
		// if we have a label definition, look within its statement for references, if not, then
		// the label is undefined and we have no results..
		if labelDefinition := getTargetLabel(node.Parent, node.Text()); labelDefinition != nil {
			return getLabelReferencesInNode(labelDefinition.Parent, labelDefinition)
		}
		return nil
	}

	if isLabelOfLabeledStatement(node) {
		// it is a label definition and not a target, search within the parent labeledStatement
		return getLabelReferencesInNode(node.Parent, node)
	}

	if isThis(node) {
		return getReferencesForThisKeyword(node, sourceFiles /*, cancellationToken*/)
	}

	if node.Kind == ast.KindSuperKeyword {
		return getReferencesForSuperKeyword(node)
	}

	return nil
}

func getLabelReferencesInNode(container *ast.Node, targetLabel *ast.Node) []*SymbolAndEntries {
	sourceFile := ast.GetSourceFileOfNode(container)
	labelName := targetLabel.Text()
	references := core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), func(node *ast.Node) *referenceEntry {
		// Only pick labels that are either the target label, or have a target that is the target label
		if node == targetLabel.AsNode() || (isJumpStatementTarget(node) && getTargetLabel(node, labelName) == targetLabel) {
			return newNodeEntry(node)
		}
		return nil
	})
	return []*SymbolAndEntries{NewSymbolAndEntries(definitionKindLabel, targetLabel, nil, references)}
}

func getReferencesForThisKeyword(thisOrSuperKeyword *ast.Node, sourceFiles []*ast.SourceFile) []*SymbolAndEntries {
	searchSpaceNode := ast.GetThisContainer(thisOrSuperKeyword, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)

	// Whether 'this' occurs in a static context within a class.
	staticFlag := ast.ModifierFlagsStatic
	isParameterName := func(node *ast.Node) bool {
		return node.Kind == ast.KindIdentifier && node.Parent.Kind == ast.KindParameter && node.Parent.Name() == node
	}

	switch searchSpaceNode.Kind {
	case ast.KindMethodDeclaration, ast.KindMethodSignature,
		ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor:
		if (searchSpaceNode.Kind == ast.KindMethodDeclaration || searchSpaceNode.Kind == ast.KindMethodSignature) && ast.IsObjectLiteralMethod(searchSpaceNode) {
			staticFlag &= searchSpaceNode.ModifierFlags()
			searchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning object literals
			break
		}
		staticFlag &= searchSpaceNode.ModifierFlags()
		searchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning class
	case ast.KindSourceFile:
		if ast.IsExternalModule(searchSpaceNode.AsSourceFile()) || isParameterName(thisOrSuperKeyword) {
			return nil
		}
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		// Computed properties in classes are not handled here because references to this are illegal,
		// so there is no point finding references to them.
	default:
		return nil
	}

	filesToSearch := sourceFiles
	if searchSpaceNode.Kind == ast.KindSourceFile {
		filesToSearch = []*ast.SourceFile{searchSpaceNode.AsSourceFile()}
	}
	references := core.Map(
		core.FlatMap(filesToSearch, func(sourceFile *ast.SourceFile) []*ast.Node {
			// cancellationToken.throwIfCancellationRequested();
			return core.Filter(
				getPossibleSymbolReferenceNodes(sourceFile, "this", core.IfElse(searchSpaceNode.Kind == ast.KindSourceFile, sourceFile.AsNode(), searchSpaceNode)),
				func(node *ast.Node) bool {
					if !isThis(node) {
						return false
					}
					container := ast.GetThisContainer(node /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/, false)
					if !ast.CanHaveSymbol(container) {
						return false
					}
					switch searchSpaceNode.Kind {
					case ast.KindFunctionExpression, ast.KindFunctionDeclaration:
						return searchSpaceNode.Symbol() == container.Symbol()
					case ast.KindMethodDeclaration, ast.KindMethodSignature:
						return ast.IsObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.Symbol() == container.Symbol()
					case ast.KindClassExpression, ast.KindClassDeclaration, ast.KindObjectLiteralExpression:
						// Make sure the container belongs to the same class/object literals
						// and has the appropriate static modifier from the original container.
						return container.Parent != nil && ast.CanHaveSymbol(container.Parent) && searchSpaceNode.Symbol() == container.Parent.Symbol() && ast.IsStatic(container) == (staticFlag != ast.ModifierFlagsNone)
					case ast.KindSourceFile:
						return container.Kind == ast.KindSourceFile && !ast.IsExternalModule(container.AsSourceFile()) && !isParameterName(node)
					}
					return false
				})
		}),
		func(n *ast.Node) *referenceEntry { return newNodeEntry(n) },
	)

	thisParameter := core.FirstNonNil(references, func(ref *referenceEntry) *ast.Node {
		if ref.node.Parent.Kind == ast.KindParameter {
			return ref.node
		}
		return nil
	})
	if thisParameter == nil {
		thisParameter = thisOrSuperKeyword
	}
	return []*SymbolAndEntries{NewSymbolAndEntries(definitionKindThis, thisParameter, nil, references)}
}

func getReferencesForSuperKeyword(superKeyword *ast.Node) []*SymbolAndEntries {
	searchSpaceNode := ast.GetSuperContainer(superKeyword, false /*stopOnFunctions*/)
	if searchSpaceNode == nil {
		return nil
	}
	// Whether 'super' occurs in a static context within a class.
	staticFlag := ast.ModifierFlagsStatic

	switch searchSpaceNode.Kind {
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor:
		staticFlag &= searchSpaceNode.ModifierFlags()
		searchSpaceNode = searchSpaceNode.Parent // re-assign to be the owning class
	default:
		return nil
	}

	sourceFile := ast.GetSourceFileOfNode(searchSpaceNode)
	references := core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, "super", searchSpaceNode), func(node *ast.Node) *referenceEntry {
		if node.Kind != ast.KindSuperKeyword {
			return nil
		}

		container := ast.GetSuperContainer(node, false /*stopOnFunctions*/)

		// If we have a 'super' container, we must have an enclosing class.
		// Now make sure the owning class is the same as the search-space
		// and has the same static qualifier as the original 'super's owner.
		if container != nil && ast.IsStatic(container) == (staticFlag != ast.ModifierFlagsNone) && container.Parent.Symbol() == searchSpaceNode.Symbol() {
			return newNodeEntry(node)
		}
		return nil
	})

	return []*SymbolAndEntries{NewSymbolAndEntries(definitionKindSymbol, nil, searchSpaceNode.Symbol(), references)}
}

func getAllReferencesForKeyword(sourceFiles []*ast.SourceFile, keywordKind ast.Kind, filterReadOnlyTypeOperator bool) []*SymbolAndEntries {
	// references is a list of NodeEntry
	references := core.FlatMap(sourceFiles, func(sourceFile *ast.SourceFile) []*referenceEntry {
		// cancellationToken.throwIfCancellationRequested();
		return core.MapNonNil(getPossibleSymbolReferenceNodes(sourceFile, scanner.TokenToString(keywordKind), sourceFile.AsNode()), func(referenceLocation *ast.Node) *referenceEntry {
			if referenceLocation.Kind == keywordKind && (!filterReadOnlyTypeOperator || isReadonlyTypeOperator(referenceLocation)) {
				return newNodeEntry(referenceLocation)
			}
			return nil
		})
	})
	if len(references) == 0 {
		return nil
	}
	return []*SymbolAndEntries{NewSymbolAndEntries(definitionKindKeyword, references[0].node, nil, references)}
}

func getPossibleSymbolReferenceNodes(sourceFile *ast.SourceFile, symbolName string, container *ast.Node) []*ast.Node {
	return core.MapNonNil(getPossibleSymbolReferencePositions(sourceFile, symbolName, container), func(pos int) *ast.Node {
		if referenceLocation := astnav.GetTouchingPropertyName(sourceFile, pos); referenceLocation != sourceFile.AsNode() {
			return referenceLocation
		}
		return nil
	})
}

func getPossibleSymbolReferencePositions(sourceFile *ast.SourceFile, symbolName string, container *ast.Node) []int {
	positions := []int{}

	/// TODO: Cache symbol existence for files to save text search
	// Also, need to make this work for unicode escapes.

	// Be resilient in the face of a symbol with no name or zero length name
	if symbolName == "" {
		return positions
	}

	text := sourceFile.Text()
	sourceLength := len(text)
	symbolNameLength := len(symbolName)

	if container == nil {
		container = sourceFile.AsNode()
	}

	position := strings.Index(text[container.Pos():], symbolName)
	endPos := container.End()
	for position >= 0 && position < endPos {
		// We found a match.  Make sure it's not part of a larger word (i.e. the char
		// before and after it have to be a non-identifier char).
		endPosition := position + symbolNameLength

		if (position == 0 || !scanner.IsIdentifierPart(rune(text[position-1]))) &&
			(endPosition == sourceLength || !scanner.IsIdentifierPart(rune(text[endPosition]))) {
			// Found a real match.  Keep searching.
			positions = append(positions, position)
		}
		startIndex := position + symbolNameLength + 1
		if foundIndex := strings.Index(text[startIndex:], symbolName); foundIndex != -1 {
			position = startIndex + foundIndex
		} else {
			break
		}
	}

	return positions
}

func getReferencesForNonModule(referencedFile *ast.SourceFile, program *compiler.Program) []*referenceEntry {
	// !!! not implemented
	return []*referenceEntry{}
}

func getMergedAliasedSymbolOfNamespaceExportDeclaration(node *ast.Node, symbol *ast.Symbol, checker *checker.Checker) *ast.Symbol {
	if node.Parent != nil && node.Parent.Kind == ast.KindNamespaceExportDeclaration {
		if aliasedSymbol, ok := checker.ResolveAlias(symbol); ok {
			targetSymbol := checker.GetMergedSymbol(aliasedSymbol)
			if aliasedSymbol != targetSymbol {
				return targetSymbol
			}
		}
	}
	return nil
}

func getReferencedSymbolsForModule(program *compiler.Program, symbol *ast.Symbol, excludeImportTypeOfExportEquals bool, sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string]) []*SymbolAndEntries {
	// !!! not implemented
	return nil
}

func getReferenceAtPosition(sourceFile *ast.SourceFile, position int, program *compiler.Program) *refInfo {
	if referencePath := findReferenceInPosition(sourceFile.ReferencedFiles, position); referencePath != nil {
		if file := program.GetSourceFileFromReference(sourceFile, referencePath); file != nil {
			return &refInfo{reference: referencePath, fileName: file.FileName(), file: file, unverified: false}
		}
		return nil
	}

	if typeReferenceDirective := findReferenceInPosition(sourceFile.TypeReferenceDirectives, position); typeReferenceDirective != nil {
		if reference := program.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeReferenceDirective, sourceFile); reference != nil {
			if file := program.GetSourceFile(reference.ResolvedFileName); file != nil {
				return &refInfo{reference: typeReferenceDirective, fileName: file.FileName(), file: file, unverified: false}
			}
		}
		return nil
	}

	if libReferenceDirective := findReferenceInPosition(sourceFile.LibReferenceDirectives, position); libReferenceDirective != nil {
		if file := program.GetLibFileFromReference(libReferenceDirective); file != nil {
			return &refInfo{reference: libReferenceDirective, fileName: file.FileName(), file: file, unverified: false}
		}
		return nil
	}

	if len(sourceFile.Imports()) == 0 && len(sourceFile.ModuleAugmentations) == 0 {
		return nil
	}

	node := astnav.GetTouchingToken(sourceFile, position)
	if !isModuleSpecifierLike(node) || !tspath.IsExternalModuleNameRelative(node.Text()) {
		return nil
	}
	if resolution := program.GetResolvedModuleFromModuleSpecifier(sourceFile, node); resolution != nil {
		verifiedFileName := resolution.ResolvedFileName
		fileName := resolution.ResolvedFileName
		if fileName == "" {
			fileName = tspath.ResolvePath(tspath.GetDirectoryPath(sourceFile.FileName()), node.Text())
		}
		return &refInfo{
			file:       program.GetSourceFile(fileName),
			fileName:   fileName,
			reference:  nil,
			unverified: verifiedFileName != "",
		}
	}

	return nil
}

// -- Core algorithm for find all references --
func getReferencedSymbolsForSymbol(originalSymbol *ast.Symbol, node *ast.Node, sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string], checker *checker.Checker, options refOptions) []*SymbolAndEntries {
	// Core find-all-references algorithm for a normal symbol.

	symbol := core.Coalesce(skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker /*useLocalSymbolForExportSpecifier*/, !isForRenameWithPrefixAndSuffixText(options)), originalSymbol)

	// Compute the meaning from the location and the symbol it references
	searchMeaning := getIntersectingMeaningFromDeclarations(node, symbol, ast.SemanticMeaningAll)
	state := newState(sourceFiles, sourceFilesSet, node, checker /*, cancellationToken*/, searchMeaning, options)

	var exportSpecifier *ast.Node
	if !isForRenameWithPrefixAndSuffixText(options) || len(symbol.Declarations) == 0 {
		exportSpecifier = core.Find(symbol.Declarations, ast.IsExportSpecifier)
	}
	if exportSpecifier != nil {
		// !!! not implemented

		// When renaming at an export specifier, rename the export and not the thing being exported.
		// state.getReferencesAtExportSpecifier(exportSpecifier.Name(), symbol, exportSpecifier.AsExportSpecifier(), state.createSearch(node, originalSymbol, comingFromUnknown /*comingFrom*/, "", nil), true /*addReferencesHere*/, true /*alwaysGetReferences*/)
	} else if node != nil && node.Kind == ast.KindDefaultKeyword && symbol.Name == ast.InternalSymbolNameDefault && symbol.Parent != nil {
		state.addReference(node, symbol, entryKindNone)
		// !!! not implemented
		// state.searchForImportsOfExport(node, symbol, &ExportInfo{exportingModuleSymbol: symbol.Parent, exportKind: ExportKindDefault})
	} else {
		search := state.createSearch(node, symbol, ImpExpKindUnknown /*comingFrom*/, "", state.populateSearchSymbolSet(symbol, node, options.use == referenceUseRename, options.useAliasesForRename, options.implementations))
		state.getReferencesInContainerOrFiles(symbol, search)
	}

	return state.result
}

// Symbol that is currently being searched for.
// This will be replaced if we find an alias for the symbol.
type refSearch struct {
	// If coming from an export, we will not recursively search for the imported symbol (since that's where we came from).
	comingFrom ImpExpKind // import, export

	symbol      *ast.Symbol
	text        string
	escapedText string

	// Only set if `options.implementations` is true. These are the symbols checked to get the implementations of a property access.
	parents []*ast.Symbol

	allSearchSymbols []*ast.Symbol

	// Whether a symbol is in the search set.
	// Do not compare directly to `symbol` because there may be related symbols to search for. See `populateSearchSymbolSet`.
	includes func(symbol *ast.Symbol) bool
}

// type inheritKey struct {
// 	symbol *ast.Symbol
// 	parent *ast.Symbol
// }

type refState struct {
	sourceFiles       []*ast.SourceFile
	sourceFilesSet    *collections.Set[string]
	specialSearchKind string // !!! none, constructor, class
	checker           *checker.Checker
	// cancellationToken CancellationToken
	searchMeaning ast.SemanticMeaning
	options       refOptions
	result        []*SymbolAndEntries
	// inheritsFromCache            map[inheritKey]bool
	seenContainingTypeReferences collections.Set[*ast.Node] // node seen tracker
	// seenReExportRHS           *collections.Set[*ast.Node] // node seen tracker
	importTracker           ImportTracker
	symbolToReferences      map[*ast.Symbol]*SymbolAndEntries
	sourceFileToSeenSymbols map[*ast.SourceFile]*collections.Set[*ast.Symbol]
}

func newState(sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string], node *ast.Node, checker *checker.Checker, searchMeaning ast.SemanticMeaning, options refOptions) *refState {
	return &refState{
		sourceFiles:       sourceFiles,
		sourceFilesSet:    sourceFilesSet,
		specialSearchKind: "none", // !!! other search kinds not implemented
		checker:           checker,
		searchMeaning:     searchMeaning,
		options:           options,
		// inheritsFromCache: map[inheritKey]bool{},
		// seenReExportRHS:           &collections.Set[*ast.Node]{},
		symbolToReferences:      map[*ast.Symbol]*SymbolAndEntries{},
		sourceFileToSeenSymbols: map[*ast.SourceFile]*collections.Set[*ast.Symbol]{},
	}
}

func (state *refState) includesSourceFile(sourceFile *ast.SourceFile) bool {
	return state.sourceFilesSet.Has(sourceFile.FileName())
}

func (state *refState) getImportSearches(exportSymbol *ast.Symbol, exportInfo *ExportInfo) *ImportsResult {
	if state.importTracker == nil {
		state.importTracker = createImportTracker(state.sourceFiles, state.sourceFilesSet, state.checker)
	}
	return state.importTracker(exportSymbol, exportInfo, state.options.use == referenceUseRename)
}

// @param allSearchSymbols set of additional symbols for use by `includes`
func (state *refState) createSearch(location *ast.Node, symbol *ast.Symbol, comingFrom ImpExpKind, text string, allSearchSymbols []*ast.Symbol) *refSearch {
	// Note: if this is an external module symbol, the name doesn't include quotes.
	// Note: getLocalSymbolForExportDefault handles `export default class C {}`, but not `export default C` or `export { C as default }`.
	// The other two forms seem to be handled downstream (e.g. in `skipPastExportOrImportSpecifier`), so special-casing the first form
	// here appears to be intentional).
	if text == "" {
		s := binder.GetLocalSymbolForExportDefault(symbol)
		if s == nil {
			s = getNonModuleSymbolOfMergedModuleSymbol(symbol)
			if s == nil {
				s = symbol
			}
		}
		text = stringutil.StripQuotes(ast.SymbolName(s))
	}
	if len(allSearchSymbols) == 0 {
		allSearchSymbols = []*ast.Symbol{symbol}
	}
	search := &refSearch{
		symbol:           symbol,
		comingFrom:       comingFrom,
		text:             text,
		escapedText:      text,
		allSearchSymbols: allSearchSymbols,
		includes:         func(sym *ast.Symbol) bool { return slices.Contains(allSearchSymbols, sym) },
	}
	if state.options.implementations && location != nil {
		search.parents = getParentSymbolsOfPropertyAccess(location, symbol, state.checker)
	}
	return search
}

func (state *refState) referenceAdder(searchSymbol *ast.Symbol) func(*ast.Node, entryKind) {
	// !!! after find all references is fully implemented, rename this to something like 'getReferenceAdder'
	symbolAndEntries := state.symbolToReferences[searchSymbol]
	if symbolAndEntries == nil {
		symbolAndEntries = NewSymbolAndEntries(definitionKindSymbol, nil, searchSymbol, nil)
		state.symbolToReferences[searchSymbol] = symbolAndEntries
		state.result = append(state.result, symbolAndEntries)
	}
	return func(node *ast.Node, kind entryKind) {
		symbolAndEntries.references = append(symbolAndEntries.references, newNodeEntryWithKind(node, kind))
	}
}

func (state *refState) addReference(referenceLocation *ast.Node, symbol *ast.Symbol, kind entryKind) {
	// if rename symbol from default export anonymous function, for example `export default function() {}`, we do not need to add reference
	if state.options.use == referenceUseRename && referenceLocation.Kind == ast.KindDefaultKeyword {
		return
	}

	addRef := state.referenceAdder(symbol)
	if state.options.implementations {
		state.addImplementationReferences(referenceLocation, func(n *ast.Node) { addRef(n, kind) })
	} else {
		addRef(referenceLocation, kind)
	}
}

func (state *refState) addImplementationReferences(refNode *ast.Node, addRef func(*ast.Node)) {
	// Check if we found a function/propertyAssignment/method with an implementation or initializer
	if ast.IsDeclarationName(refNode) && isImplementation(refNode.Parent) {
		addRef(refNode)
		return
	}

	if refNode.Kind != ast.KindIdentifier {
		return
	}

	if refNode.Parent.Kind == ast.KindShorthandPropertyAssignment {
		// Go ahead and dereference the shorthand assignment by going to its definition

		// !!! not implemented
		// getReferenceEntriesForShorthandPropertyAssignment(refNode, state.checker, addRef);
	}

	// Check if the node is within an extends or implements clause

	if containingNode := getContainingNodeIfInHeritageClause(refNode); containingNode != nil {
		addRef(containingNode)
		return
	}

	// If we got a type reference, try and see if the reference applies to any expressions that can implement an interface
	// Find the first node whose parent isn't a type node -- i.e., the highest type node.
	typeNode := ast.FindAncestor(refNode, func(a *ast.Node) bool {
		return !ast.IsQualifiedName(a.Parent) && !ast.IsTypeNode(a.Parent) && !ast.IsTypeElement(a.Parent)
	})

	if typeNode == nil || typeNode.Parent.Type() == nil {
		return
	}

	typeHavingNode := typeNode.Parent
	if typeHavingNode.Type() == typeNode && !state.seenContainingTypeReferences.AddIfAbsent(typeHavingNode) {
		addIfImplementation := func(e *ast.Expression) {
			if isImplementationExpression(e) {
				addRef(e)
			}
		}
		if ast.HasInitializer(typeHavingNode) {
			addIfImplementation(typeHavingNode.Initializer())
		} else if ast.IsFunctionLike(typeHavingNode) && typeHavingNode.Body() != nil {
			body := typeHavingNode.Body()
			if body.Kind == ast.KindBlock {
				ast.ForEachReturnStatement(body, func(returnStatement *ast.Node) bool {
					if expr := returnStatement.Expression(); expr != nil {
						addIfImplementation(expr)
					}
					return false
				})
			} else {
				addIfImplementation(body)
			}
		} else if ast.IsAssertionExpression(typeHavingNode) || ast.IsSatisfiesExpression(typeHavingNode) {
			addIfImplementation(typeHavingNode.Expression())
		}
	}
}

func (state *refState) getReferencesInContainerOrFiles(symbol *ast.Symbol, search *refSearch) {
	// Try to get the smallest valid scope that we can limit our search to;
	// otherwise we'll need to search globally (i.e. include each file).
	if scope := getSymbolScope(symbol); scope != nil {
		state.getReferencesInContainer(scope, ast.GetSourceFileOfNode(scope), search /*addReferencesHere*/, !(scope.Kind == ast.KindSourceFile && !slices.Contains(state.sourceFiles, scope.AsSourceFile())))
	} else {
		// Global search
		for _, sourceFile := range state.sourceFiles {
			// state.cancellationToken.throwIfCancellationRequested();
			state.searchForName(sourceFile, search)
		}
	}
}

func (state *refState) getReferencesInSourceFile(sourceFile *ast.SourceFile, search *refSearch, addReferencesHere bool) {
	// state.cancellationToken.throwIfCancellationRequested();
	state.getReferencesInContainer(sourceFile.AsNode(), sourceFile, search, addReferencesHere)
}

func (state *refState) getReferencesInContainer(container *ast.Node, sourceFile *ast.SourceFile, search *refSearch, addReferencesHere bool) {
	// Search within node "container" for references for a search value, where the search value is defined as a
	//     tuple of (searchSymbol, searchText, searchLocation, and searchMeaning).
	// searchLocation: a node where the search value
	if !state.markSearchedSymbols(sourceFile, search.allSearchSymbols) {
		return
	}

	for _, position := range getPossibleSymbolReferencePositions(sourceFile, search.text, container) {
		state.getReferencesAtLocation(sourceFile, position, search, addReferencesHere)
	}
}

func (state *refState) markSearchedSymbols(sourceFile *ast.SourceFile, symbols []*ast.Symbol) bool {
	seenSymbols := state.sourceFileToSeenSymbols[sourceFile]
	if seenSymbols == nil {
		seenSymbols = &collections.Set[*ast.Symbol]{}
		state.sourceFileToSeenSymbols[sourceFile] = seenSymbols
	}
	anyNewSymbols := false
	for _, sym := range symbols {
		if seenSymbols.AddIfAbsent(sym) {
			anyNewSymbols = true
		}
	}
	return anyNewSymbols
}

func (state *refState) getReferencesAtLocation(sourceFile *ast.SourceFile, position int, search *refSearch, addReferencesHere bool) {
	referenceLocation := astnav.GetTouchingPropertyName(sourceFile, position)

	if !isValidReferencePosition(referenceLocation, search.text) {
		// This wasn't the start of a token.  Check to see if it might be a
		// match in a comment or string if that's what the caller is asking
		// for.

		// !!! not implemented
		// if (!state.options.implementations && (state.options.findInStrings && isInString(sourceFile, position) || state.options.findInComments && isInNonReferenceComment(sourceFile, position))) {
		// 	// In the case where we're looking inside comments/strings, we don't have
		// 	// an actual definition.  So just use 'undefined' here.  Features like
		// 	// 'Rename' won't care (as they ignore the definitions), and features like
		// 	// 'FindReferences' will just filter out these results.
		// 	state.addStringOrCommentReference(sourceFile.FileName, createTextSpan(position, search.text.length));
		// }

		return
	}

	if getMeaningFromLocation(referenceLocation)&state.searchMeaning == 0 {
		return
	}

	referenceSymbol := state.checker.GetSymbolAtLocation(referenceLocation)
	if referenceSymbol == nil {
		return
	}

	parent := referenceLocation.Parent
	if parent.Kind == ast.KindImportSpecifier && parent.PropertyName() == referenceLocation {
		// This is added through `singleReferences` in ImportsResult. If we happen to see it again, don't add it again.
		return
	}

	if parent.Kind == ast.KindExportSpecifier {
		// !!! not implemented
		// debug.Assert(referenceLocation.Kind == ast.KindIdentifier || referenceLocation.Kind == ast.KindStringLiteral)
		// state.getReferencesAtExportSpecifier(referenceLocation /* Identifier | StringLiteral*/, referenceSymbol, parent.AsExportSpecifier(), search, addReferencesHere, false /*alwaysGetReferences*/)
		return
	}

	relatedSymbol, relatedSymbolKind := state.getRelatedSymbol(search, referenceSymbol, referenceLocation)
	if relatedSymbol == nil {
		state.getReferenceForShorthandProperty(referenceSymbol, search)
		return
	}

	switch state.specialSearchKind {
	case "none":
		if addReferencesHere {
			state.addReference(referenceLocation, relatedSymbol, relatedSymbolKind)
		}
	case "constructor":
		// !!! not implemented
		// state.addConstructorReferences(referenceLocation, sourceFile, search)
	case "class":
		// !!! not implemented
		// state.addClassStaticThisReferences(referenceLocation, search)
	}

	// Use the parent symbol if the location is commonjs require syntax on javascript files only.
	if ast.IsInJSFile(referenceLocation) && referenceLocation.Parent.Kind == ast.KindBindingElement &&
		ast.IsVariableDeclarationInitializedToRequire(referenceLocation.Parent.Parent.Parent) {
		referenceSymbol = referenceLocation.Parent.Symbol()
		// The parent will not have a symbol if it's an ObjectBindingPattern (when destructuring is used).  In
		// this case, just skip it, since the bound identifiers are not an alias of the import.
		if referenceSymbol == nil {
			return
		}
	}

	state.getImportOrExportReferences(referenceLocation, referenceSymbol, search)
}

func (state *refState) getImportOrExportReferences(referenceLocation *ast.Node, referenceSymbol *ast.Symbol, search *refSearch) {
	importOrExport := getImportOrExportSymbol(referenceLocation, referenceSymbol, state.checker, search.comingFrom == ImpExpKindExport)
	if importOrExport == nil {
		return
	}
	if importOrExport.kind == ImpExpKindImport {
		if !isForRenameWithPrefixAndSuffixText(state.options) {
			state.searchForImportedSymbol(importOrExport.symbol)
		}
	} else {
		state.searchForImportsOfExport(referenceLocation, importOrExport.symbol, importOrExport.exportInfo)
	}
}

// Go to the symbol we imported from and find references for it.
func (state *refState) searchForImportedSymbol(symbol *ast.Symbol) {
	for _, declaration := range symbol.Declarations {
		exportingFile := ast.GetSourceFileOfNode(declaration)
		// Need to search in the file even if it's not in the search-file set, because it might export the symbol.
		state.getReferencesInSourceFile(exportingFile, state.createSearch(declaration, symbol, ImpExpKindImport, "", nil), state.includesSourceFile(exportingFile))
	}
}

// Search for all imports of a given exported symbol using `State.getImportSearches`. */
func (state *refState) searchForImportsOfExport(exportLocation *ast.Node, exportSymbol *ast.Symbol, exportInfo *ExportInfo) {
	r := state.getImportSearches(exportSymbol, exportInfo)

	// For `import { foo as bar }` just add the reference to `foo`, and don't otherwise search in the file.
	if len(r.singleReferences) != 0 {
		addRef := state.referenceAdder(exportSymbol)
		for _, singleRef := range r.singleReferences {
			if state.shouldAddSingleReference(singleRef) {
				addRef(singleRef, entryKindNode)
			}
		}
	}

	// For each import, find all references to that import in its source file.
	for _, i := range r.importSearches {
		state.getReferencesInSourceFile(ast.GetSourceFileOfNode(i.importLocation), state.createSearch(i.importLocation, i.importSymbol, ImpExpKindExport, "", nil), true /*addReferencesHere*/)
	}

	if len(r.indirectUsers) != 0 {
		var indirectSearch *refSearch
		switch exportInfo.exportKind {
		case ExportKindNamed:
			indirectSearch = state.createSearch(exportLocation, exportSymbol, ImpExpKindExport, "", nil)
		case ExportKindDefault:
			// Search for a property access to '.default'. This can't be renamed.
			if state.options.use != referenceUseRename {
				indirectSearch = state.createSearch(exportLocation, exportSymbol, ImpExpKindExport, "default", nil)
			}
		}
		if indirectSearch != nil {
			for _, indirectUser := range r.indirectUsers {
				state.searchForName(indirectUser, indirectSearch)
			}
		}
	}
}

func (state *refState) shouldAddSingleReference(singleRef *ast.Node) bool {
	if !state.hasMatchingMeaning(singleRef) {
		return false
	}
	if state.options.use != referenceUseRename {
		return true
	}
	// Don't rename an import type `import("./module-name")` when renaming `name` in `export = name;`
	if !ast.IsIdentifier(singleRef) && !ast.IsImportOrExportSpecifier(singleRef.Parent) {
		return false
	}
	// At `default` in `import { default as x }` or `export { default as x }`, do add a reference, but do not rename.
	return !(ast.IsImportOrExportSpecifier(singleRef.Parent) && ast.ModuleExportNameIsDefault(singleRef))
}

func (state *refState) hasMatchingMeaning(referenceLocation *ast.Node) bool {
	return getMeaningFromLocation(referenceLocation)&state.searchMeaning != 0
}

func (state *refState) getReferenceForShorthandProperty(referenceSymbol *ast.Symbol, search *refSearch) {
	if referenceSymbol.Flags&ast.SymbolFlagsTransient != 0 || referenceSymbol.ValueDeclaration == nil {
		return
	}
	shorthandValueSymbol := state.checker.GetShorthandAssignmentValueSymbol(referenceSymbol.ValueDeclaration)
	name := ast.GetNameOfDeclaration(referenceSymbol.ValueDeclaration)

	// Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
	// has two meanings: property name and property value. Therefore when we do findAllReference at the position where
	// an identifier is declared, the language service should return the position of the variable declaration as well as
	// the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
	// position of property accessing, the referenceEntry of such position will be handled in the first case.
	if name != nil && search.includes(shorthandValueSymbol) {
		state.addReference(name, shorthandValueSymbol, entryKindNone)
	}
}

// === search ===
func (state *refState) populateSearchSymbolSet(symbol *ast.Symbol, location *ast.Node, isForRename, providePrefixAndSuffixText, implementations bool) []*ast.Symbol {
	if location == nil {
		return []*ast.Symbol{symbol}
	}
	result := []*ast.Symbol{}
	state.forEachRelatedSymbol(
		symbol,
		location,
		isForRename,
		!(isForRename && providePrefixAndSuffixText),
		func(sym *ast.Symbol, root *ast.Symbol, base *ast.Symbol) *ast.Symbol {
			// static method/property and instance method/property might have the same name. Only include static or only include instance.
			if base != nil {
				if isStaticSymbol(symbol) != isStaticSymbol(base) {
					base = nil
				}
			}
			result = append(result, core.OrElse(base, core.OrElse(root, sym)))
			return nil
		}, // when try to find implementation, implementations is true, and not allowed to find base class
		/*allowBaseTypes*/ func(_ *ast.Symbol) bool { return !implementations },
	)
	return result
}

func (state *refState) getRelatedSymbol(search *refSearch, referenceSymbol *ast.Symbol, referenceLocation *ast.Node) (*ast.Symbol, entryKind) {
	return state.forEachRelatedSymbol(
		referenceSymbol,
		referenceLocation,
		false, /*isForRenamePopulateSearchSymbolSet*/
		state.options.use != referenceUseRename || state.options.useAliasesForRename, /*onlyIncludeBindingElementAtReferenceLocation*/
		func(sym *ast.Symbol, rootSymbol *ast.Symbol, baseSymbol *ast.Symbol) *ast.Symbol {
			// check whether the symbol used to search itself is just the searched one.
			if baseSymbol != nil {
				// static method/property and instance method/property might have the same name. Only check static or only check instance.
				if isStaticSymbol(referenceSymbol) != isStaticSymbol(baseSymbol) {
					baseSymbol = nil
				}
			}
			searchSym := core.Coalesce(baseSymbol, core.Coalesce(rootSymbol, sym))
			if searchSym != nil && search.includes(searchSym) {
				if rootSymbol != nil && sym.CheckFlags&ast.CheckFlagsSynthetic == 0 {
					return rootSymbol
				}
				return sym
			}
			// For a base type, use the symbol for the derived type. For a synthetic (e.g. union) property, use the union symbol.
			return nil
		},
		func(rootSymbol *ast.Symbol) bool {
			return !(len(search.parents) != 0 && !core.Some(search.parents, func(parent *ast.Symbol) bool {
				return false
				// !!! not implemented
				// return state.explicitlyInheritsFrom(rootSymbol.Parent, parent)
			}))
		},
	)
}

func (state *refState) forEachRelatedSymbol(
	symbol *ast.Symbol,
	location *ast.Node,
	isForRenamePopulateSearchSymbolSet,
	onlyIncludeBindingElementAtReferenceLocation bool,
	cbSymbol func(*ast.Symbol, *ast.Symbol, *ast.Symbol) *ast.Symbol,
	allowBaseTypes func(*ast.Symbol) bool,
) (*ast.Symbol, entryKind) {
	fromRoot := func(sym *ast.Symbol) *ast.Symbol {
		// If this is a union property:
		//   - In populateSearchSymbolsSet we will add all the symbols from all its source symbols in all unioned types.
		//   - In findRelatedSymbol, we will just use the union symbol if any source symbol is included in the search.
		// If the symbol is an instantiation from a another symbol (e.g. widened symbol):
		//   - In populateSearchSymbolsSet, add the root the list
		//   - In findRelatedSymbol, return the source symbol if that is in the search. (Do not return the instantiation symbol.)
		for _, rootSymbol := range state.checker.GetRootSymbols(sym) {
			if result := cbSymbol(sym, rootSymbol, nil /*baseSymbol*/); result != nil {
				return result
			}
			// Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
			if rootSymbol.Parent != nil && rootSymbol.Parent.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 && allowBaseTypes(rootSymbol) {
				result := getPropertySymbolsFromBaseTypes(rootSymbol.Parent, rootSymbol.Name, state.checker, func(base *ast.Symbol) *ast.Symbol {
					return cbSymbol(sym, rootSymbol, base)
				})
				if result != nil {
					return result
				}
			}
		}
		return nil
	}

	if containingObjectLiteralElement := getContainingObjectLiteralElement(location); containingObjectLiteralElement != nil {
		/* Because in short-hand property assignment, location has two meaning : property name and as value of the property
		 * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of
		 * property name and variable declaration of the identifier.
		 * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service
		 * should show both 'name' in 'obj' and 'name' in variable declaration
		 *      const name = "Foo";
		 *      const obj = { name };
		 * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment
		 * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration
		 * will be included correctly.
		 */
		shorthandValueSymbol := state.checker.GetShorthandAssignmentValueSymbol(location.Parent)
		// gets the local symbol
		if shorthandValueSymbol != nil && isForRenamePopulateSearchSymbolSet {
			// When renaming 'x' in `const o = { x }`, just rename the local variable, not the property.
			return cbSymbol(shorthandValueSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/), entryKindSearchedLocalFoundProperty
		}
		// If the location is in a context sensitive location (i.e. in an object literal) try
		// to get a contextual type for it, and add the property symbol from the contextual
		// type to the search set
		if contextualType := state.checker.GetContextualType(containingObjectLiteralElement.Parent, checker.ContextFlagsNone); contextualType != nil {
			symbols := state.checker.GetPropertySymbolsFromContextualType(containingObjectLiteralElement, contextualType, true /*unionSymbolOk*/)
			for _, sym := range symbols {
				if res := fromRoot(sym); res != nil {
					return res, entryKindSearchedPropertyFoundLocal
				}
			}
		}
		// If the location is name of property symbol from object literal destructuring pattern
		// Search the property symbol
		//      for ( { property: p2 } of elems) { }
		if propertySymbol := state.checker.GetPropertySymbolOfDestructuringAssignment(location); propertySymbol != nil {
			if res := cbSymbol(propertySymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {
				return res, entryKindSearchedPropertyFoundLocal
			}
		}
		if shorthandValueSymbol != nil {
			if res := cbSymbol(shorthandValueSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {
				return res, entryKindSearchedLocalFoundProperty
			}
		}
	}

	if aliasedSymbol := getMergedAliasedSymbolOfNamespaceExportDeclaration(location, symbol, state.checker); aliasedSymbol != nil {
		// In case of UMD module and global merging, search for global as well
		if res := cbSymbol(aliasedSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {
			return res, entryKindNode
		}
	}

	if res := fromRoot(symbol); res != nil {
		return res, entryKindNone
	}

	if symbol.ValueDeclaration != nil && ast.IsParameterPropertyDeclaration(symbol.ValueDeclaration, symbol.ValueDeclaration.Parent) {
		// For a parameter property, now try on the other symbol (property if this was a parameter, parameter if this was a property).
		if symbol.ValueDeclaration == nil || symbol.ValueDeclaration.Kind != ast.KindParameter {
			panic("expected symbol.ValueDeclaration to be a parameter")
		}
		paramProp1, paramProp2 := state.checker.GetSymbolsOfParameterPropertyDeclaration(symbol.ValueDeclaration, symbol.Name)
		debug.Assert((paramProp1.Flags&ast.SymbolFlagsFunctionScopedVariable != 0) && (paramProp2.Flags&ast.SymbolFlagsProperty != 0)) // is [parameter, property]
		if !(paramProp1.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 && paramProp2.Flags&ast.SymbolFlagsProperty != 0) {
			panic("Expected a parameter and a property")
		}
		return fromRoot(core.IfElse(symbol.Flags&ast.SymbolFlagsFunctionScopedVariable != 0, paramProp2, paramProp1)), entryKindNone
	}

	if exportSpecifier := ast.GetDeclarationOfKind(symbol, ast.KindExportSpecifier); exportSpecifier != nil && (!isForRenamePopulateSearchSymbolSet || exportSpecifier.PropertyName() == nil) {
		if localSymbol := state.checker.GetExportSpecifierLocalTargetSymbol(exportSpecifier); localSymbol != nil {
			if res := cbSymbol(localSymbol, nil /*rootSymbol*/, nil /*baseSymbol*/); res != nil {
				return res, entryKindNode
			}
		}
	}

	// symbolAtLocation for a binding element is the local symbol. See if the search symbol is the property.
	// Don't do this when populating search set for a rename when prefix and suffix text will be provided -- just rename the local.
	if !isForRenamePopulateSearchSymbolSet {
		var bindingElementPropertySymbol *ast.Symbol
		if onlyIncludeBindingElementAtReferenceLocation {
			if !isObjectBindingElementWithoutPropertyName(location.Parent) {
				return nil, entryKindNone
			}
			bindingElementPropertySymbol = getPropertySymbolFromBindingElement(state.checker, location.Parent)
		} else {
			bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, state.checker)
		}
		if bindingElementPropertySymbol == nil {
			return nil, entryKindNone
		}
		return fromRoot(bindingElementPropertySymbol), entryKindSearchedPropertyFoundLocal
	}

	debug.Assert(isForRenamePopulateSearchSymbolSet)

	// due to the above assert and the arguments at the uses of this function,
	// (onlyIncludeBindingElementAtReferenceLocation <=> !providePrefixAndSuffixTextForRename) holds
	includeOriginalSymbolOfBindingElement := onlyIncludeBindingElementAtReferenceLocation

	if includeOriginalSymbolOfBindingElement {
		if bindingElementPropertySymbol := getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol, state.checker); bindingElementPropertySymbol != nil {
			return fromRoot(bindingElementPropertySymbol), entryKindSearchedPropertyFoundLocal
		}
	}
	return nil, entryKindNone
}

// Search for all occurrences of an identifier in a source file (and filter out the ones that match).
func (state *refState) searchForName(sourceFile *ast.SourceFile, search *refSearch) {
	if _, ok := getNameTable(sourceFile)[search.escapedText]; ok {
		state.getReferencesInSourceFile(sourceFile, search, true /*addReferencesHere*/)
	}
}

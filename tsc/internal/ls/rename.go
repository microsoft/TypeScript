package ls

import (
	"context"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// RenameInfo represents the result of a rename validation check.
// It is used by the `textDocument/prepareRename` LSP handler.
type RenameInfo struct {
	CanRename             bool
	LocalizedErrorMessage string
	DisplayName           string
	TriggerSpan           lsproto.Range
	FileToRename          string
	NewFileName           string
}

func (l *LanguageService) ProvideRename(ctx context.Context, params *lsproto.RenameParams, orchestrator CrossProjectOrchestrator) (lsproto.WorkspaceEditOrNull, error) {
	return handleCrossProject(
		l,
		ctx,
		params,
		orchestrator,
		(*LanguageService).symbolAndEntriesToRename,
		combineRenameResponse,
		true,  /*isRename*/
		false, /*implementations*/
		symbolEntryTransformOptions{},
	)
}

func (l *LanguageService) GetRenameInfo(ctx context.Context, newName string, documentURI lsproto.DocumentUri, position lsproto.Position) RenameInfo {
	program, sourceFile := l.getProgramAndFile(documentURI)
	pos := int(l.converters.LineAndCharacterToPosition(sourceFile, position))

	node := astnav.GetTouchingPropertyName(sourceFile, pos)
	node = getAdjustedLocation(node, true /*forRename*/, sourceFile)

	if nodeIsEligibleForRename(node) {
		if renameInfo, ok := l.getRenameInfoForNode(ctx, newName, node, sourceFile, program); ok {
			return renameInfo
		}
	}
	return getRenameInfoError(ctx, diagnostics.You_cannot_rename_this_element)
}

func (l *LanguageService) symbolAndEntriesToRename(ctx context.Context, params *lsproto.RenameParams, data SymbolAndEntriesData, options symbolEntryTransformOptions) (lsproto.WorkspaceEditOrNull, error) {
	if !nodeIsEligibleForRename(data.OriginalNode) {
		return lsproto.WorkspaceEditOrNull{}, nil
	}

	program := l.GetProgram()

	// Defense-in-depth: validate rename eligibility even if the client skipped prepareRename.
	// Use getRenameInfoForNode directly with the already-resolved node to avoid
	// re-resolving the position and polluting state baselines.
	sourceFile := ast.GetSourceFileOfNode(data.OriginalNode)
	if info, ok := l.getRenameInfoForNode(ctx, params.NewName, data.OriginalNode, sourceFile, program); !ok || !info.CanRename {
		return lsproto.WorkspaceEditOrNull{}, nil
	}

	entries := core.FlatMap(data.SymbolsAndEntries, func(s *SymbolAndEntries) []*ReferenceEntry { return s.references })
	changes := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	ch, done := program.GetTypeChecker(ctx)
	defer done()

	quotePreference := lsutil.GetQuotePreference(sourceFile, l.UserPreferences())

	for _, entry := range entries {
		uri := l.getFileNameOfEntry(entry)
		if l.UserPreferences().AllowRenameOfImportPath != core.TSTrue && entry.node != nil && ast.IsStringLiteralLike(entry.node) && ast.TryGetImportFromModuleSpecifier(entry.node) != nil {
			continue
		}
		textEdit := &lsproto.TextEdit{
			Range:   l.getRangeOfEntry(entry),
			NewText: l.getTextForRename(data.OriginalNode, entry, params.NewName, ch, quotePreference),
		}
		changes[uri] = append(changes[uri], textEdit)
	}
	return lsproto.WorkspaceEditOrNull{
		WorkspaceEdit: &lsproto.WorkspaceEdit{
			Changes: &changes,
		},
	}, nil
}

// getRenameInfoForNode performs detailed validation for a rename operation on a specific node.
func (l *LanguageService) getRenameInfoForNode(ctx context.Context, newName string, node *ast.Node, sourceFile *ast.SourceFile, program *compiler.Program) (RenameInfo, bool) {
	ch, done := program.GetTypeChecker(ctx)
	defer done()

	symbol := ch.GetSymbolAtLocation(node)
	if symbol == nil {
		if ast.IsStringLiteralLike(node) {
			// Allow renaming of string literal types with contextual string literal types
			typ := getContextualTypeFromParentOrAncestorTypeNode(node, ch)
			if typ != nil && (typ.IsStringLiteral() ||
				(typ.IsUnion() && core.Every(typ.Types(), func(t *checker.Type) bool {
					return t.IsStringLiteral()
				}))) {
				return getRenameInfoSuccess(node, sourceFile, node.Text(), l.converters), true
			}
		} else if ast.IsLabelName(node) {
			name := node.Text()
			return getRenameInfoSuccess(node, sourceFile, name, l.converters), true
		}
		return RenameInfo{}, false
	}

	// Only allow a symbol to be renamed if it actually has at least one declaration.
	if len(symbol.Declarations) == 0 {
		return RenameInfo{}, false
	}

	if msg := l.renameBlockedReason(sourceFile, node, symbol, ch, program); msg != nil {
		return getRenameInfoError(ctx, msg), true
	}

	if ast.IsStringLiteralLike(node) && ast.TryGetImportFromModuleSpecifier(node) != nil {
		if l.UserPreferences().AllowRenameOfImportPath.IsTrue() {
			return l.getRenameInfoForModule(ctx, newName, node, sourceFile, symbol)
		}
		return RenameInfo{}, false
	}

	return getRenameInfoSuccess(node, sourceFile, ch.SymbolToString(symbol), l.converters), true
}

func nodeIsEligibleForRename(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier,
		ast.KindPrivateIdentifier,
		ast.KindStringLiteral,
		ast.KindNoSubstitutionTemplateLiteral,
		ast.KindThisKeyword:
		return true
	case ast.KindNumericLiteral:
		return isLiteralNameOfPropertyDeclarationOrIndexAccess(node)
	default:
		return false
	}
}

// renameBlockedReason returns a non-nil diagnostic message if the rename should be blocked
// because the symbol is a library definition, a default keyword, or would cross node_modules boundaries.
func (l *LanguageService) renameBlockedReason(sourceFile *ast.SourceFile, node *ast.Node, symbol *ast.Symbol, ch *checker.Checker, program *compiler.Program) *diagnostics.Message {
	for _, declaration := range symbol.Declarations {
		if isDefinedInLibraryFile(program, declaration) {
			return diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library
		}
	}

	// Cannot rename `default` as in `import { default as foo } from "./someModule"`
	if ast.IsIdentifier(node) && node.Text() == "default" && symbol.Parent != nil && symbol.Parent.Flags&ast.SymbolFlagsModule != 0 {
		return diagnostics.You_cannot_rename_this_element
	}

	if msg := wouldRenameInOtherNodeModules(sourceFile, symbol, ch, l.UserPreferences()); msg != nil {
		return msg
	}

	return nil
}

// isDefinedInLibraryFile checks if a declaration is from a default library file (e.g., lib.d.ts).
func isDefinedInLibraryFile(program *compiler.Program, declaration *ast.Node) bool {
	declSourceFile := ast.GetSourceFileOfNode(declaration)
	return program.IsSourceFileDefaultLibrary(declSourceFile.Path()) && tspath.IsDeclarationFileName(declSourceFile.FileName())
}

// wouldRenameInOtherNodeModules checks if renaming the symbol would affect node_modules.
func wouldRenameInOtherNodeModules(originalFile *ast.SourceFile, symbol *ast.Symbol, ch *checker.Checker, preferences lsutil.UserPreferences) *diagnostics.Message {
	sym := symbol
	if !preferences.UseAliasesForRename.IsTrue() && sym.Flags&ast.SymbolFlagsAlias != 0 {
		importSpecifier := core.Find(sym.Declarations, ast.IsImportSpecifier)
		if importSpecifier != nil && importSpecifier.AsImportSpecifier().PropertyName == nil {
			sym = ch.GetAliasedSymbol(sym)
		}
	}

	declarations := sym.Declarations
	if len(declarations) == 0 {
		return nil
	}

	originalPackage := module.ParseNodeModuleFromPath(originalFile.FileName(), false /*isFolder*/)
	if originalPackage == "" {
		// Original source file is not in node_modules.
		for _, declaration := range declarations {
			if isInsideNodeModules(ast.GetSourceFileOfNode(declaration).FileName()) {
				return diagnostics.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder
			}
		}
		return nil
	}

	// Original source file is in node_modules.
	for _, declaration := range declarations {
		declPackage := module.ParseNodeModuleFromPath(ast.GetSourceFileOfNode(declaration).FileName(), false /*isFolder*/)
		if declPackage != "" && declPackage != originalPackage {
			return diagnostics.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder
		}
	}
	return nil
}

func ClientSupportsWillRenameFiles(ctx context.Context) bool {
	return lsproto.GetClientCapabilities(ctx).Workspace.FileOperations.WillRename
}

func ClientSupportsDocumentChanges(ctx context.Context) bool {
	return lsproto.GetClientCapabilities(ctx).Workspace.WorkspaceEdit.DocumentChanges
}

func ClientSupportsRenameResourceOperations(ctx context.Context) bool {
	return slices.Contains(lsproto.GetClientCapabilities(ctx).Workspace.WorkspaceEdit.ResourceOperations, lsproto.ResourceOperationKindRename)
}

// getRenameInfoForModule handles rename validation for module specifiers.
func (l *LanguageService) getRenameInfoForModule(ctx context.Context, newName string, specifier *ast.StringLiteralLike, sourceFile *ast.SourceFile, moduleSymbol *ast.Symbol) (RenameInfo, bool) {
	if !tspath.IsExternalModuleNameRelative(specifier.Text()) {
		return getRenameInfoError(ctx, diagnostics.You_cannot_rename_a_module_via_a_global_import), true
	}
	if !ClientSupportsDocumentChanges(ctx) || !ClientSupportsRenameResourceOperations(ctx) {
		return getRenameInfoError(ctx, diagnostics.File_rename_is_not_supported_by_the_editor), true
	}

	moduleSourceFile := core.Find(moduleSymbol.Declarations, ast.IsSourceFile)
	if moduleSourceFile == nil {
		return RenameInfo{}, false
	}

	fileName := moduleSourceFile.AsSourceFile().FileName()
	withoutIndex := ""
	if !strings.HasSuffix(specifier.Text(), "/index") && !strings.HasSuffix(specifier.Text(), "/index.js") {
		candidate := tspath.RemoveFileExtension(fileName)
		if trimmed, ok := strings.CutSuffix(candidate, "/index"); ok {
			withoutIndex = trimmed
		}
	}

	displayName := fileName
	if withoutIndex != "" {
		displayName = withoutIndex
	}
	newFileName := l.getNewFileNameForModuleRename(displayName, specifier.Text(), newName)

	// Span should only be the last component of the path. + 1 to account for the quote character.
	indexAfterLastSlash := strings.LastIndex(specifier.Text(), "/") + 1
	start := specifier.Pos() + 1 + indexAfterLastSlash
	length := len(specifier.Text()) - indexAfterLastSlash

	return RenameInfo{
		CanRename:    true,
		DisplayName:  specifier.Text()[indexAfterLastSlash:],
		TriggerSpan:  l.converters.ToLSPRange(sourceFile, core.NewTextRange(start, start+length)),
		FileToRename: displayName,
		NewFileName:  newFileName,
	}, true
}

// Adjust the new name based on the old path that an import specifier resolves to.
// For example, if specifier "a.js" resolves to file a.ts, renaming "a.js" -> "b.js" should mean file rename a.ts -> b.ts.
func (l *LanguageService) getNewFileNameForModuleRename(oldPath, specifierText, newName string) string {
	newPath := tspath.CombinePaths(tspath.GetDirectoryPath(oldPath), newName)
	ignoreCase := !l.host.UseCaseSensitiveFileNames()
	var oldExt string
	if tspath.IsDeclarationFileName(oldPath) {
		oldExt = tspath.GetDeclarationFileExtension(oldPath)
	} else {
		oldExt = tspath.GetAnyExtensionFromPath(oldPath, nil /*extensions*/, ignoreCase)
	}
	if !tspath.HasExtension(newPath) {
		newPath = newPath + oldExt
	} else if tspath.GetAnyExtensionFromPath(newPath, nil /*extensions*/, ignoreCase) == tspath.GetAnyExtensionFromPath(specifierText, nil /*extensions*/, ignoreCase) {
		newPath = tspath.ChangeAnyExtension(newPath, oldExt, nil /*extensions*/, ignoreCase)
	}
	return newPath
}

func (l *LanguageService) getTextForRename(originalNode *ast.Node, entry *ReferenceEntry, newText string, ch *checker.Checker, quotePreference lsutil.QuotePreference) string {
	if entry.kind != entryKindRange && (ast.IsIdentifier(originalNode) || ast.IsStringLiteralLike(originalNode)) {
		node := ast.GetReparsedNodeForNode(entry.node)
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
				originalSymbol = ch.GetExportSpecifierLocalTargetSymbol(originalNode.Parent)
			} else {
				originalSymbol = ch.GetSymbolAtLocation(originalNode)
			}
			if slices.Contains(originalSymbol.Declarations, parent) {
				return name + " as " + newText
			}
			return newText
		case ast.IsExportSpecifier(parent) && parent.PropertyName() == nil:
			// If the symbol for the node is same as declared node symbol use prefix text
			if originalNode == entry.node || ch.GetSymbolAtLocation(originalNode) == ch.GetSymbolAtLocation(entry.node) {
				return name + " as " + newText
			}
			return newText + " as " + name
		}
	}

	// If the node is a numerical indexing literal, then add quotes around the property access.
	if entry.kind != entryKindRange && ast.IsNumericLiteral(entry.node) && ast.IsAccessExpression(entry.node.Parent) {
		quote := getQuoteFromPreference(quotePreference)
		return quote + newText + quote
	}

	return newText
}

func getQuoteFromPreference(quotePreference lsutil.QuotePreference) string {
	if quotePreference == lsutil.QuotePreferenceSingle {
		return "'"
	}
	return `"`
}

func getRenameInfoError(ctx context.Context, message *diagnostics.Message) RenameInfo {
	return RenameInfo{
		CanRename:             false,
		LocalizedErrorMessage: message.Localize(locale.FromContext(ctx)),
	}
}

func getRenameInfoSuccess(node *ast.Node, sourceFile *ast.SourceFile, displayName string, converters *lsconv.Converters) RenameInfo {
	start := node.Pos()
	end := node.End()
	if ast.IsStringLiteralLike(node) {
		// Exclude the quotes
		start++
		end--
	}
	return RenameInfo{
		CanRename:   true,
		DisplayName: displayName,
		TriggerSpan: converters.ToLSPRange(sourceFile, core.NewTextRange(start, end)),
	}
}

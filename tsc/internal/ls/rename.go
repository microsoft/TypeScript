package ls

import (
	"context"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// RenameInfo represents the result of a rename validation check.
// It is used by the `textDocument/prepareRename` LSP handler.
type RenameInfo struct {
	CanRename             bool
	LocalizedErrorMessage string
	DisplayName           string
	TriggerSpan           lsproto.Range
	FileToRename          tspath.RootedPath
	NewFileName           tspath.RootedPath
}

type mappedRenameEdit struct {
	uri  lsproto.DocumentUri
	edit *lsproto.TextEdit
}

type renameEditKey struct {
	uri       lsproto.DocumentUri
	textRange lsproto.Range
}

func deduplicateRenameEdits(mappedEdits []mappedRenameEdit) (map[lsproto.DocumentUri][]*lsproto.TextEdit, bool) {
	editTexts := make(map[renameEditKey]string)
	uniqueEdits := make([]mappedRenameEdit, 0, len(mappedEdits))
	for _, mappedEdit := range mappedEdits {
		key := renameEditKey{uri: mappedEdit.uri, textRange: mappedEdit.edit.Range}
		if existingText, ok := editTexts[key]; ok {
			if existingText != mappedEdit.edit.NewText {
				return nil, false
			}
			continue
		}
		editTexts[key] = mappedEdit.edit.NewText
		uniqueEdits = append(uniqueEdits, mappedEdit)
	}
	changes := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	for _, mappedEdit := range uniqueEdits {
		changes[mappedEdit.uri] = append(changes[mappedEdit.uri], mappedEdit.edit)
	}
	return changes, true
}

func (l *LanguageService) ProvideRename(ctx context.Context, params *lsproto.RenameParams, orchestrator CrossProjectOrchestrator) (lsproto.WorkspaceEditOrNull, error) {
	return l.handleCrossProject(
		ctx,
		params,
		orchestrator,
		(*LanguageService).symbolAndEntriesToRename,
		combineRenameResponse,
		true,  /*isRename*/
		false, /*implementations*/
		symbolEntryTransformOptions{},
		nil, /*defaultProjectData*/
	)
}

func (l *LanguageService) GetRenameInfo(ctx context.Context, newName string, documentURI lsproto.DocumentUri, position lsproto.Position) RenameInfo {
	program, sourceFile := l.getProgramAndFile(documentURI)
	positions := l.converters.FromLSPPositionForSourceFile(sourceFile, position, spanmap.FeatureRename)
	for _, mapped := range positions {
		if !mapped.Fidelity.IsExact() {
			continue
		}
		sourceFile := mapped.Script
		node := astnav.GetTouchingPropertyName(sourceFile, int(mapped.Position))
		node = getAdjustedLocation(node, true /*forRename*/, sourceFile)
		if nodeIsEligibleForRename(node) {
			if renameInfo, ok := l.getRenameInfoForNode(ctx, newName, node, sourceFile, program); ok {
				return renameInfo
			}
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

	var mappedEdits []mappedRenameEdit
	ch, done := program.GetTypeChecker(ctx)
	defer done()

	quotePreference := lsutil.GetQuotePreference(sourceFile, l.UserPreferences())
	useAliasesForRename := l.UserPreferences().ProvidePrefixAndSuffixTextForRename.IsTrueOrUnknown()
	renameToNonIdentifier := useAliasesForRename && !scanner.IsIdentifierText(params.NewName, core.LanguageVariantStandard)

	var entries []*ReferenceEntry
	for _, symbolAndEntries := range data.SymbolsAndEntries {
		// A non-identifier name cannot be bound as a local, so `import { foo }` becomes
		// `import { "new-name" as foo }` and uses of the local `foo` are left alone.
		if renameToNonIdentifier && symbolAndEntries.definition != nil && symbolAndEntries.definition.symbol != nil {
			if spec := ast.GetDeclarationOfKind(symbolAndEntries.definition.symbol, ast.KindImportSpecifier); spec != nil && spec.PropertyName() == nil && !isRenamingImportSpecifierLocal(data.OriginalNode, spec, ch) {
				for _, entry := range symbolAndEntries.references {
					if entry.kind != entryKindRange && entry.node != nil && ast.GetReparsedNodeForNode(entry.node) == spec.Name() {
						entries = append(entries, entry)
					}
				}
				continue
			}
		}
		entries = append(entries, symbolAndEntries.references...)
	}

	for _, entry := range entries {
		uri := l.getFileNameOfEntry(entry)
		if l.UserPreferences().AllowRenameOfImportPath != core.TSTrue && entry.node != nil && ast.IsStringLiteralLike(entry.node) && ast.TryGetImportFromModuleSpecifier(entry.node) != nil {
			continue
		}
		var jsxAttributeText string
		if entry.kind != entryKindRange && entry.node != nil && ast.IsStringLiteral(entry.node) && ast.IsJsxAttribute(entry.node.Parent) {
			// JSX attribute strings have no escapes, so the edit replaces the whole initializer.
			jsxAttributeText = l.getJsxAttributeTextForRename(entry, params.NewName)
		}
		rng, ok := l.renameEditRange(entry)
		if !ok {
			// The occurrence lies outside a verbatim span of a content-mapped file, so it cannot be
			// written back to the original text. Skip it and keep renaming the remaining occurrences.
			continue
		}
		newText := jsxAttributeText
		if newText == "" {
			newText = l.getTextForRename(data.OriginalNode, entry, params.NewName, ch, quotePreference, useAliasesForRename)
		}
		textEdit := &lsproto.TextEdit{
			Range:   rng,
			NewText: newText,
		}
		mappedEdits = append(mappedEdits, mappedRenameEdit{uri: uri, edit: textEdit})
	}
	changes, ok := deduplicateRenameEdits(mappedEdits)
	if !ok {
		return lsproto.WorkspaceEditOrNull{}, nil
	}
	return lsproto.WorkspaceEditOrNull{
		WorkspaceEdit: &lsproto.WorkspaceEdit{
			Changes: &changes,
		},
	}, nil
}

// getJsxAttributeTextForRename returns the text for a renamed JSX attribute string, keeping its
// quotes when they can contain the new name, and widens the entry's range to the whole string.
func (l *LanguageService) getJsxAttributeTextForRename(entry *ReferenceEntry, newName string) string {
	sourceFile := ast.GetSourceFileOfNode(entry.node)
	start := scanner.GetTokenPosOfNode(entry.node, sourceFile, false /*includeJSDoc*/)
	textRange := core.NewTextRange(start, entry.node.End())
	entry.sourceFile = sourceFile
	entry.textRange = &textRange
	entry.lspRange = nil
	quoteChar := sourceFile.Text()[start]
	if jsxAttributeStringCanContain(newName, quoteChar) {
		return string(quoteChar) + newName + string(quoteChar)
	}
	return jsxAttributeInitializerText(sourceFile, l.UserPreferences(), newName)
}

// renameEditRange returns the LSP range at which a rename occurrence should be edited. For occurrences in
// content-mapped files it maps the transformed range strictly, returning ok=false when the occurrence is
// not fully within a single verbatim span, so the caller can skip an edit that cannot be applied to the
// original text.
func (l *LanguageService) renameEditRange(entry *ReferenceEntry) (lsproto.Range, bool) {
	l.resolveEntry(entry)
	if entry.node == nil {
		location, fidelity := l.sourceFileRangeToLSPLocation(entry.sourceFile, *entry.textRange)
		return location.Range, fidelity.IsExact()
	}
	sourceFile := ast.GetSourceFileOfNode(entry.node)
	if sourceFile == nil || sourceFile.SpanMap() == nil {
		return l.getRangeOfEntry(entry), true
	}
	lspRange, fidelity := l.converters.ToLSPRange(sourceFile, *entry.textRange)
	return lspRange, fidelity.IsExact()
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
	if len(symbol.Declarations()) == 0 {
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
	if node == nil {
		return false
	}
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
	for _, declaration := range symbol.Declarations() {
		if isDefinedInLibraryFile(program, declaration) {
			return diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library
		}
	}

	// Cannot rename `default` as in `import { default as foo } from "./someModule"`
	if ast.IsIdentifier(node) && node.Text() == "default" && symbol.Parent() != nil && symbol.Parent().Flags()&ast.SymbolFlagsModule != 0 {
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
	return program.IsSourceFileDefaultLibrary(declSourceFile.PathKey()) && declSourceFile.FileName().IsDeclarationFile()
}

// wouldRenameInOtherNodeModules checks if renaming the symbol would affect node_modules.
func wouldRenameInOtherNodeModules(originalFile *ast.SourceFile, symbol *ast.Symbol, ch *checker.Checker, preferences lsutil.UserPreferences) *diagnostics.Message {
	sym := symbol
	if !preferences.ProvidePrefixAndSuffixTextForRename.IsTrueOrUnknown() && sym.Flags()&ast.SymbolFlagsAlias != 0 {
		importSpecifier := core.Find(sym.Declarations(), ast.IsImportSpecifier)
		if importSpecifier != nil && importSpecifier.AsImportSpecifier().PropertyName == nil {
			sym = ch.GetAliasedSymbol(sym)
		}
	}

	declarations := sym.Declarations()
	if len(declarations) == 0 {
		return nil
	}

	originalPackage := module.NodeModulePackageRootForFile(originalFile.FileName())
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
		declPackage := module.NodeModulePackageRootForFile(ast.GetSourceFileOfNode(declaration).FileName())
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

	moduleSourceFile := core.Find(moduleSymbol.Declarations(), ast.IsSourceFile)
	if moduleSourceFile == nil {
		return RenameInfo{}, false
	}

	fileName := moduleSourceFile.AsSourceFile().FileName()
	var withoutIndex tspath.RootedPath
	if !strings.HasSuffix(specifier.Text(), "/index") && !strings.HasSuffix(specifier.Text(), "/index.js") {
		withoutIndex = tryRemoveIndexFileName(fileName)
	}

	displayName := fileName.AsPath()
	if withoutIndex != "" {
		displayName = withoutIndex
	}
	newFileName := l.getNewFileNameForModuleRename(displayName, specifier.Text(), newName)

	// Span should only be the last component of the path. + 1 to account for the quote character.
	indexAfterLastSlash := strings.LastIndex(specifier.Text(), "/") + 1
	start := astnav.GetStartOfNode(specifier, sourceFile, false /*includeJSDoc*/) + 1 + indexAfterLastSlash
	length := len(specifier.Text()) - indexAfterLastSlash

	triggerSpan, fidelity := l.converters.ToLSPRange(sourceFile, core.NewTextRange(start, start+length))
	if !fidelity.IsExact() {
		return RenameInfo{}, false
	}
	return RenameInfo{
		CanRename:    true,
		DisplayName:  specifier.Text()[indexAfterLastSlash:],
		TriggerSpan:  triggerSpan,
		FileToRename: displayName,
		NewFileName:  newFileName,
	}, true
}

func tryRemoveIndexFileName(fileName tspath.RootedFilePath) tspath.RootedPath {
	if tspath.RemoveFileExtension(fileName.BaseName()) == "index" {
		root, relative := fileName.RootAndRelativePath()
		if (root == "/" || root.AsPath().IsDynamic()) && tspath.RemoveFileExtension(relative) == "index" {
			return ""
		}
		return fileName.Directory().AsPath()
	}
	return ""
}

// Adjust the new name based on the old path that an import specifier resolves to.
// For example, if specifier "a.js" resolves to file a.ts, renaming "a.js" -> "b.js" should mean file rename a.ts -> b.ts.
func (l *LanguageService) getNewFileNameForModuleRename(oldPath tspath.RootedPath, specifierText, newName string) tspath.RootedPath {
	oldFileName := tspath.RootedFilePathFromPath(oldPath)
	newPath := oldPath.Directory().ResolveFile(newName)
	caseSensitivity := l.host.CaseSensitivity()
	var oldExt string
	if oldFileName.IsDeclarationFile() {
		oldExt = oldFileName.DeclarationFileExtension()
	} else {
		oldExt = oldFileName.AnyExtension(nil /*extensions*/, caseSensitivity)
	}
	if !newPath.HasExtension() {
		newPath = newPath.AppendSuffix(oldExt)
	} else if newPath.AnyExtension(nil /*extensions*/, caseSensitivity) == tspath.GetAnyExtensionFromPath(specifierText, nil /*extensions*/, caseSensitivity) {
		newPath = newPath.ChangeAnyExtension(oldExt, nil /*extensions*/, caseSensitivity)
	}
	return newPath.AsPath()
}

func (l *LanguageService) getTextForRename(originalNode *ast.Node, entry *ReferenceEntry, newText string, ch *checker.Checker, quotePreference lsutil.QuotePreference, useAliasesForRename bool) string {
	if useAliasesForRename && entry.kind != entryKindRange && (ast.IsIdentifier(originalNode) || ast.IsStringLiteralLike(originalNode)) {
		node := ast.GetReparsedNodeForNode(entry.node)
		kind := entry.kind
		parent := node.Parent
		name := originalNode.Text()
		propertyText := quoteNonIdentifierName(newText, quotePreference)
		isShorthandAssignment := ast.IsShorthandPropertyAssignment(parent)
		switch {
		case isShorthandAssignment || (isObjectBindingElementWithoutPropertyName(parent) && parent.Name() == node && parent.AsBindingElement().DotDotDotToken == nil):
			if kind == entryKindSearchedLocalFoundProperty {
				return name + ": " + newText
			}
			if kind == entryKindSearchedPropertyFoundLocal {
				return propertyText + ": " + name
			}
			// In `const o = { x }; o.x`, symbolAtLocation at `x` in `{ x }` is the property symbol.
			// For a binding element `const { x } = o;`, symbolAtLocation at `x` is the property symbol.
			if isShorthandAssignment {
				grandParent := parent.Parent
				if ast.IsObjectLiteralExpression(grandParent) && ast.IsBinaryExpression(grandParent.Parent) && ast.IsModuleExportsAccessExpression(grandParent.Parent.AsBinaryExpression().Left) {
					return name + ": " + newText
				}
				return propertyText + ": " + name
			}
			return name + ": " + newText
		case ast.IsImportSpecifier(parent) && parent.PropertyName() == nil:
			// If the original symbol was using this alias, just rename the alias.
			if isRenamingImportSpecifierLocal(originalNode, parent, ch) {
				return name + " as " + newText
			}
			if propertyText != newText {
				return propertyText + " as " + name
			}
			return newText
		case ast.IsExportSpecifier(parent) && parent.PropertyName() == nil:
			// If the symbol for the node is same as declared node symbol use prefix text
			usePrefix := originalNode == entry.node || ch.GetSymbolAtLocation(originalNode) == ch.GetSymbolAtLocation(entry.node)
			if ast.IsStringLiteralLike(node) {
				// For `export { "a b" } from "m"`, the edit range covers the literal's contents
				// between its quotes.
				sourceFile := ast.GetSourceFileOfNode(node)
				quoteChar := getStringLiteralQuoteChar(sourceFile, node)
				quote := func(s string) string {
					return string(quoteChar) + printer.EscapeString(s, quoteChar) + string(quoteChar)
				}
				text := quote(newText) + " as " + quote(name)
				if usePrefix {
					text = quote(name) + " as " + quote(newText)
				}
				if node.End()-scanner.GetTokenPosOfNode(node, sourceFile, false /*includeJSDoc*/) <= 2 {
					return text
				}
				return text[1 : len(text)-1]
			}
			if usePrefix {
				return name + " as " + propertyText
			}
			return propertyText + " as " + name
		}
	}

	if entry.kind != entryKindRange && ast.IsStringLiteralLike(entry.node) {
		sourceFile := ast.GetSourceFileOfNode(entry.node)
		quoteChar := getStringLiteralQuoteChar(sourceFile, entry.node)
		escaped := escapeStringForNode(newText, quoteChar, entry.node)
		// The rename range of an empty string literal includes its quotes.
		if entry.node.End()-scanner.GetTokenPosOfNode(entry.node, sourceFile, false /*includeJSDoc*/) <= 2 {
			return string(quoteChar) + escaped + string(quoteChar)
		}
		return escaped
	}

	// If the node is a numerical indexing literal, then add quotes around the property access.
	if entry.kind != entryKindRange && ast.IsNumericLiteral(entry.node) && ast.IsAccessExpression(entry.node.Parent) {
		quoteChar := getQuoteFromPreference(quotePreference)
		return string(quoteChar) + escapeStringForNode(newText, quoteChar, entry.node) + string(quoteChar)
	}

	// A numeric property name, as in `{ 0: x }`, must be quoted when the new name is not an identifier.
	if entry.kind != entryKindRange && ast.IsNumericLiteral(entry.node) && ast.IsDeclarationName(entry.node) {
		return quoteNonIdentifierName(newText, quotePreference)
	}

	if entry.kind != entryKindRange && ast.IsIdentifier(entry.node) && isModuleExportNameOfSpecifier(entry.node) {
		return quoteNonIdentifierName(newText, quotePreference)
	}

	return newText
}

func isRenamingImportSpecifierLocal(originalNode *ast.Node, importSpecifier *ast.Node, ch *checker.Checker) bool {
	var originalSymbol *ast.Symbol
	if ast.IsExportSpecifier(originalNode.Parent) {
		originalSymbol = ch.GetExportSpecifierLocalTargetSymbol(originalNode.Parent)
	} else {
		originalSymbol = ch.GetSymbolAtLocation(originalNode)
	}
	return originalSymbol != nil && slices.Contains(originalSymbol.Declarations(), importSpecifier)
}

// isModuleExportNameOfSpecifier reports whether node names a module export, which may be
// written as a string literal: `a` in `import { a as b }` and `export { b as a }`, and both
// names in `export { a as b } from "m"`.
func isModuleExportNameOfSpecifier(node *ast.Node) bool {
	parent := node.Parent
	switch {
	case ast.IsImportSpecifier(parent):
		return parent.PropertyName() == node
	case ast.IsExportSpecifier(parent):
		return parent.Name() == node || parent.Parent.Parent.AsExportDeclaration().ModuleSpecifier != nil
	}
	return false
}

func quoteNonIdentifierName(name string, quotePreference lsutil.QuotePreference) string {
	if scanner.IsIdentifierText(name, core.LanguageVariantStandard) {
		return name
	}
	quoteChar := getQuoteFromPreference(quotePreference)
	return string(quoteChar) + printer.EscapeString(name, quoteChar) + string(quoteChar)
}

func escapeStringForNode(s string, quoteChar printer.QuoteChar, node *ast.Node) string {
	if node.Flags&ast.NodeFlagsJSDoc != 0 {
		return lsutil.EscapeStringInComment(s, quoteChar)
	}
	return printer.EscapeString(s, quoteChar)
}

func getQuoteFromPreference(quotePreference lsutil.QuotePreference) printer.QuoteChar {
	if quotePreference == lsutil.QuotePreferenceSingle {
		return printer.QuoteCharSingleQuote
	}
	return printer.QuoteCharDoubleQuote
}

func getRenameInfoError(ctx context.Context, message *diagnostics.Message) RenameInfo {
	return RenameInfo{
		CanRename:             false,
		LocalizedErrorMessage: message.Localize(locale.FromContext(ctx)),
	}
}

func getRenameInfoSuccess(node *ast.Node, sourceFile *ast.SourceFile, displayName string, converters *lsconv.Converters) RenameInfo {
	start := astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/)
	end := node.End()
	if ast.IsStringLiteralLike(node) {
		// Exclude the quotes
		start++
		end--
	}
	triggerSpan, fidelity := converters.ToLSPRange(sourceFile, core.NewTextRange(start, end))
	if !fidelity.IsExact() {
		return RenameInfo{CanRename: false}
	}
	return RenameInfo{
		CanRename:   true,
		DisplayName: displayName,
		TriggerSpan: triggerSpan,
	}
}

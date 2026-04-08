package ls

import (
	"context"
	"math"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func (l *LanguageService) ProvideSourceDefinition(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
) (lsproto.DefinitionResponse, error) {
	caps := lsproto.GetClientCapabilities(ctx)
	clientSupportsLink := caps.TextDocument.Definition.LinkSupport

	program, file := l.getProgramAndFile(documentURI)
	pos := int(l.converters.LineAndCharacterToPosition(file, position))
	resolver := l.newSourceDefResolver(program, file.FileName())
	node := astnav.GetTouchingPropertyName(file, pos)

	if node.Kind == ast.KindSourceFile {
		// Triple-slash directives are comments, not AST nodes, so
		// GetTouchingPropertyName returns the SourceFile node.
		if declarations, ref := resolver.resolveTripleSlashReference(file, pos, program); len(declarations) != 0 {
			originSelectionRange := l.createLspRangeFromBounds(ref.Pos(), ref.End(), file)
			return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, nil /*reference*/), nil
		}
		return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}, nil
	}

	originSelectionRange := l.createLspRangeFromNode(node, file)

	// If the cursor is directly on a module specifier string, resolve to the
	// implementation file's entry point.
	containingModuleSpecifier := findContainingModuleSpecifier(node)
	if node == containingModuleSpecifier {
		specifierMode := program.GetModeForUsageLocation(file, containingModuleSpecifier)
		if implementationFile := resolver.resolveImplementation(containingModuleSpecifier.Text(), specifierMode); implementationFile != "" {
			if sourceFile := resolver.getOrParseSourceFile(implementationFile); sourceFile != nil {
				return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, getSourceDefinitionEntryDeclarations(sourceFile), nil), nil
			}
		}
		return l.provideDefinitionWorker(ctx, documentURI, position)
	}

	// Phase 1: Syntactic fast path — when the cursor is inside an
	// import/require/export, forward-resolve the module specifier to an
	// implementation file and search it directly. This avoids acquiring
	// the type checker entirely when the fast path succeeds.
	var resolvedImplFile string
	if containingModuleSpecifier != nil {
		specifierMode := program.GetModeForUsageLocation(file, containingModuleSpecifier)
		resolvedImplFile = resolver.resolveImplementation(containingModuleSpecifier.Text(), specifierMode)
	}

	if resolvedImplFile != "" {
		names := getCandidateSourceDeclarationNames(node, nil)
		moduleResults := resolver.searchImplementationFile(node, resolvedImplFile, names)
		if len(moduleResults) != 0 {
			if !ast.IsPartOfTypeNode(node) && !ast.IsPartOfTypeOnlyImportOrExportDeclaration(node) || hasConcreteSourceDeclarations(moduleResults) {
				return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, uniqueDeclarationNodes(moduleResults), nil), nil
			}
		}
	}

	// Phase 2: Type checker path — acquire the checker for the original file
	// and use its declarations and module specifier to map to source
	// implementations. This is the only point where the checker is used;
	// after this, only the NoDts module resolver and file parsing are needed.
	checkerDeclarations, moduleSpecifier := getSourceDefCheckerInfo(ctx, program, file, node)

	// Phase 3: Map checker results to source definitions.
	declarations := resolver.resolveFromCheckerInfo(node, resolvedImplFile, checkerDeclarations, moduleSpecifier)
	if len(declarations) == 0 {
		// If we resolved an implementation file from an import/export but
		// couldn't find specific declarations, fall back to the file entry
		// point rather than the standard definition provider — unless the
		// checker found declarations that are all type-only (e.g. interfaces),
		// in which case the .d.ts definition is more appropriate.
		if containingModuleSpecifier != nil && resolvedImplFile != "" && !hasConcreteSourceDeclarations(checkerDeclarations) {
			if sourceFile := resolver.getOrParseSourceFile(resolvedImplFile); sourceFile != nil {
				return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, getSourceDefinitionEntryDeclarations(sourceFile), nil), nil
			}
		}
		return l.provideDefinitionWorker(ctx, documentURI, position)
	}
	return l.createDefinitionLocations(originSelectionRange, clientSupportsLink, declarations, nil /*reference*/), nil
}

// sourceDefResolver resolves source definitions by mapping .d.ts declarations
// to their implementation files (.js/.ts). It uses the NoDts module resolver
// and file parsing for resolution, but never acquires the type checker or
// the original program; all checker-dependent work is done before results
// are passed in.
type sourceDefResolver struct {
	ls            *LanguageService
	fs            vfs.FS
	options       *core.CompilerOptions
	getSourceFile func(string) *ast.SourceFile
	resolveFrom   string
	resolver      *module.Resolver
	parsedFiles   map[string]*ast.SourceFile
}

func (l *LanguageService) newSourceDefResolver(
	program *compiler.Program,
	resolveFrom string,
) *sourceDefResolver {
	options := program.Options()
	noDtsOptions := options.Clone()
	noDtsOptions.NoDtsResolution = core.TSTrue
	return &sourceDefResolver{
		ls:            l,
		fs:            program.Host().FS(),
		options:       options,
		getSourceFile: program.GetSourceFile,
		resolveFrom:   resolveFrom,
		resolver:      module.NewResolver(program.Host(), noDtsOptions, program.GetGlobalTypingsCacheLocation(), ""),
	}
}

// resolveFromCheckerInfo maps type-checker declarations to source
// implementations. It uses only the NoDts module resolver and file parsing;
// the type checker and original request file are not needed.
func (r *sourceDefResolver) resolveFromCheckerInfo(
	node *ast.Node,
	resolvedImplFile string,
	checkerDeclarations []*ast.Node,
	moduleSpecifier string,
) []*ast.Node {
	// If we don't yet have a forward-resolved implementation file, try to
	// recover a module specifier from the checker (e.g. from the import that
	// brought the symbol into scope, or from the root of an access expression).
	if resolvedImplFile == "" && moduleSpecifier != "" {
		resolvedImplFile = r.resolveImplementation(moduleSpecifier, r.inferImpliedNodeFormat(r.resolveFrom))
	}

	// For property access where the checker found no declarations (e.g.
	// mapped types), search the implementation file for the property name.
	if len(checkerDeclarations) == 0 && resolvedImplFile != "" {
		names := getCandidateSourceDeclarationNames(node, nil)
		if results := r.searchImplementationFile(node, resolvedImplFile, names); results != nil {
			return uniqueDeclarationNodes(results)
		}
	}

	var declarations []*ast.Node
	for _, declaration := range checkerDeclarations {
		declarations = append(declarations, r.mapDeclarationToSource(node, declaration, resolvedImplFile)...)
	}
	declarations = uniqueDeclarationNodes(declarations)
	if hasConcreteSourceDeclarations(declarations) {
		return declarations
	}
	return nil
}

// getSourceDefCheckerInfo acquires the type checker for the given file and
// returns the definition declarations for node along with the module specifier
// of the import that brought the symbol into scope (empty if not applicable).
func getSourceDefCheckerInfo(
	ctx context.Context,
	program *compiler.Program,
	file *ast.SourceFile,
	node *ast.Node,
) ([]*ast.Node, string) {
	c, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	declarations := getDeclarationsFromLocation(c, node)
	isPropertyName := node.Parent != nil && ast.IsAccessExpression(node.Parent) && node.Parent.Name() == node
	if len(declarations) == 0 && isPropertyName {
		if left := node.Parent.Expression(); left != nil {
			if prop := c.GetPropertyOfType(c.GetTypeAtLocation(left), node.Text()); prop != nil {
				declarations = prop.Declarations
			}
		}
	}
	if calledDeclaration := tryGetSignatureDeclaration(c, node); calledDeclaration != nil {
		nonFunctionDeclarations := core.Filter(declarations, func(node *ast.Node) bool { return !ast.IsFunctionLike(node) })
		declarations = append(nonFunctionDeclarations, calledDeclaration)
	}

	// Extract module specifier from the import that brought this symbol into
	// scope. For property access (obj.prop), walk up the access chain to the
	// root expression's symbol.
	var moduleSpecifier string
	resolveNode := node
	if isPropertyName {
		expr := node.Parent.Expression()
		for expr != nil && ast.IsAccessExpression(expr) {
			expr = expr.Expression()
		}
		if expr != nil {
			resolveNode = expr
		}
	}
	if sym := c.GetSymbolAtLocation(resolveNode); sym != nil {
		for _, d := range sym.Declarations {
			if !ast.IsImportSpecifier(d) && !ast.IsImportClause(d) && !ast.IsNamespaceImport(d) && !ast.IsImportEqualsDeclaration(d) {
				continue
			}
			if spec := checker.TryGetModuleSpecifierFromDeclaration(d); spec != nil {
				moduleSpecifier = spec.Text()
				break
			}
		}
	}

	return declarations, moduleSpecifier
}

// resolveTripleSlashReference handles /// <reference path/types="..."/> directives.
// For path references to .js files, it returns the entry declarations directly.
// For path references to .d.ts files or type references, it uses the NoDts
// resolver to find the corresponding implementation file.
func (r *sourceDefResolver) resolveTripleSlashReference(file *ast.SourceFile, pos int, program *compiler.Program) ([]*ast.Node, *ast.FileReference) {
	ref := getReferenceAtPosition(file, pos, program)
	if ref == nil || ref.file == nil {
		return nil, nil
	}

	// If the referenced file is already an implementation file, return it directly.
	if !ref.file.IsDeclarationFile {
		return getSourceDefinitionEntryDeclarations(ref.file), ref.reference
	}

	// The referenced file is a .d.ts. Try to find the implementation file
	// using the NoDts module resolver via findImplementationFileFromDtsFileName.
	dtsFileName := ref.file.FileName()
	preferredMode := r.inferImpliedNodeFormat(dtsFileName)
	implementationFile := r.findImplementationFileFromDtsFileName(dtsFileName, preferredMode)
	if implementationFile == "" {
		return nil, nil
	}

	sourceFile := r.getOrParseSourceFile(implementationFile)
	if sourceFile == nil {
		return nil, nil
	}
	return getSourceDefinitionEntryDeclarations(sourceFile), ref.reference
}

// searchImplementationFile searches an implementation file for declarations
// matching the given names. Returns nil when no declarations matched; callers
// fall through to the checker path or to the standard definition provider.
func (r *sourceDefResolver) searchImplementationFile(
	originalNode *ast.Node,
	implementationFile string,
	names []string,
) []*ast.Node {
	if implementationFile == "" {
		return nil
	}
	sourceFile := r.getOrParseSourceFile(implementationFile)
	if sourceFile == nil {
		return nil
	}
	if isDefaultImportName(originalNode) {
		// For default imports, only search for "default" declarations to avoid
		// matching unrelated declarations with the same identifier name.
		defaultDeclarations := r.findDeclarationsInFile(implementationFile, []string{"default"}, &collections.Set[string]{})
		if len(defaultDeclarations) != 0 {
			return filterPreferredSourceDeclarations(originalNode, defaultDeclarations)
		}
		return getSourceDefinitionEntryDeclarations(sourceFile)
	}
	declarations := r.findDeclarationsInFile(implementationFile, names, &collections.Set[string]{})
	if len(declarations) != 0 {
		return filterPreferredSourceDeclarations(originalNode, declarations)
	}
	return nil
}

func isDefaultImportName(node *ast.Node) bool {
	if node == nil || node.Parent == nil || !ast.IsImportClause(node.Parent) || node.Parent.Name() != node || node.Parent.Parent == nil {
		return false
	}
	return ast.IsDefaultImport(node.Parent.Parent)
}

func getSourceDefinitionEntryNode(sourceFile *ast.SourceFile) *ast.Node {
	if len(sourceFile.Statements.Nodes) != 0 {
		return sourceFile.Statements.Nodes[0].AsNode()
	}
	return sourceFile.AsNode()
}

func getSourceDefinitionEntryDeclarations(sourceFile *ast.SourceFile) []*ast.Node {
	return []*ast.Node{getSourceDefinitionEntryNode(sourceFile)}
}

func (r *sourceDefResolver) mapDeclarationToSource(
	originalNode *ast.Node,
	declaration *ast.Node,
	resolvedImplFile string,
) []*ast.Node {
	file, startPos := getFileAndStartPosFromDeclaration(declaration)
	fileName := file.FileName()

	if mapped := r.ls.tryGetSourcePosition(fileName, startPos); mapped != nil {
		if sourceFile := r.getOrParseSourceFile(mapped.FileName); sourceFile != nil {
			return []*ast.Node{findClosestDeclarationNode(sourceFile, mapped.Pos)}
		}
	}

	if !tspath.IsDeclarationFileName(fileName) {
		return []*ast.Node{declaration}
	}

	implementationFile := resolvedImplFile
	if implementationFile == "" {
		// Reverse-resolve .d.ts path to implementation file. This path is only
		// reached for declarations with no associated module specifier (e.g.
		// globals, ambient declarations, or when forward resolution failed).
		dtsFileName := ast.GetSourceFileOfNode(declaration).FileName()
		preferredMode := r.inferImpliedNodeFormat(dtsFileName)
		implementationFile = r.findImplementationFileFromDtsFileName(dtsFileName, preferredMode)
	}

	return r.searchImplementationFile(originalNode, implementationFile, getCandidateSourceDeclarationNames(originalNode, declaration))
}

func (r *sourceDefResolver) findImplementationFileFromDtsFileName(
	dtsFileName string,
	preferredMode core.ResolutionMode,
) string {
	if jsExt := module.TryGetJSExtensionForFile(dtsFileName, r.options); jsExt != "" {
		candidate := tspath.ChangeExtension(dtsFileName, jsExt)
		if r.fs.FileExists(candidate) {
			return candidate
		}
	}

	parts := modulespecifiers.GetNodeModulePathParts(dtsFileName)
	if parts == nil {
		return ""
	}

	// Ensure the file only contains one /node_modules/ segment. If there's more
	// than one, the package name extraction may be incorrect, so bail out.
	if strings.LastIndex(dtsFileName, "/node_modules/") != parts.TopLevelNodeModulesIndex {
		return ""
	}

	packageNamePathPart := dtsFileName[parts.TopLevelPackageNameIndex+1 : parts.PackageRootIndex]
	packageName := module.GetPackageNameFromTypesPackageName(module.UnmangleScopedPackageName(packageNamePathPart))
	if packageName == "" {
		return ""
	}

	pathToFileInPackage := dtsFileName[parts.PackageRootIndex+1:]

	// Try resolving as a package subpath first (e.g. "pkg/dist/utils"), then
	// fall back to the bare package name (e.g. "pkg"). This covers both main
	// entrypoints and deep imports without needing to inspect package.json
	// entrypoints.
	if pathToFileInPackage != "" {
		specifier := packageName + "/" + tspath.RemoveFileExtension(pathToFileInPackage)
		if implementationFile := r.resolveImplementation(specifier, preferredMode); implementationFile != "" {
			return implementationFile
		}
	}
	return r.resolveImplementation(packageName, preferredMode)
}

func (r *sourceDefResolver) resolveImplementation(
	moduleName string,
	preferredMode core.ResolutionMode,
) string {
	return r.resolveImplementationFrom(moduleName, r.resolveFrom, preferredMode)
}

func (r *sourceDefResolver) resolveImplementationFrom(
	moduleName string,
	resolveFromFile string,
	preferredMode core.ResolutionMode,
) string {
	modes := []core.ResolutionMode{preferredMode}
	if preferredMode != core.ModuleKindESNext {
		modes = append(modes, core.ModuleKindESNext)
	}
	if preferredMode != core.ModuleKindCommonJS {
		modes = append(modes, core.ModuleKindCommonJS)
	}

	for _, mode := range modes {
		resolved, _ := r.resolver.ResolveModuleName(moduleName, resolveFromFile, mode, nil)
		if resolved != nil && resolved.IsResolved() && !tspath.IsDeclarationFileName(resolved.ResolvedFileName) {
			return resolved.ResolvedFileName
		}
	}
	return ""
}

func (r *sourceDefResolver) getOrParseSourceFile(fileName string) *ast.SourceFile {
	if sourceFile := r.getSourceFile(fileName); sourceFile != nil {
		return sourceFile
	}
	if sourceFile, ok := r.parsedFiles[fileName]; ok {
		return sourceFile
	}
	var sourceFile *ast.SourceFile
	if text, ok := r.ls.ReadFile(fileName); ok {
		sourceFile = parser.ParseSourceFile(
			ast.SourceFileParseOptions{FileName: fileName, Path: r.ls.toPath(fileName)},
			text,
			core.GetScriptKindFromFileName(fileName),
		)
		binder.BindSourceFile(sourceFile)
	}
	if r.parsedFiles == nil {
		r.parsedFiles = map[string]*ast.SourceFile{}
	}
	r.parsedFiles[fileName] = sourceFile
	return sourceFile
}

// inferImpliedNodeFormat determines the module format for a source file that may not be
// in the program, using the file extension and nearest package.json "type" field.
func (r *sourceDefResolver) inferImpliedNodeFormat(fileName string) core.ResolutionMode {
	var packageJsonType string
	if scope := r.resolver.GetPackageScopeForPath(tspath.GetDirectoryPath(fileName)); scope.Exists() {
		if value, ok := scope.Contents.Type.GetValue(); ok {
			packageJsonType = value
		}
	}
	return ast.GetImpliedNodeFormatForFile(fileName, packageJsonType)
}

func findContainingModuleSpecifier(node *ast.Node) *ast.Node {
	for current := node; current != nil; current = current.Parent {
		if ast.IsAnyImportOrReExport(current) || ast.IsRequireCall(current, true /*requireStringLiteralLikeArgument*/) || ast.IsImportCall(current) {
			if moduleSpecifier := ast.GetExternalModuleName(current); moduleSpecifier != nil && ast.IsStringLiteralLike(moduleSpecifier) {
				return moduleSpecifier
			}
		}
	}
	return nil
}

func (r *sourceDefResolver) findDeclarationsInFile(
	fileName string,
	names []string,
	seen *collections.Set[string],
) []*ast.Node {
	if fileName == "" || len(names) == 0 {
		return nil
	}
	if !seen.AddIfAbsent(fileName) {
		return nil
	}

	sourceFile := r.getOrParseSourceFile(fileName)
	if sourceFile == nil {
		return nil
	}

	declarations := findDeclarationNodesByName(sourceFile, names)
	if len(declarations) != 0 && hasConcreteSourceDeclarations(declarations) {
		return declarations
	}

	var forwarded []*ast.Node
	for _, forwardedFile := range r.getForwardedImplementationFiles(sourceFile) {
		forwarded = append(forwarded, r.findDeclarationsInFile(forwardedFile, names, seen)...)
	}
	if len(forwarded) != 0 {
		if hasConcreteSourceDeclarations(forwarded) {
			return uniqueDeclarationNodes(forwarded)
		}
		return uniqueDeclarationNodes(append(slices.Clip(declarations), forwarded...))
	}
	return declarations
}

func (r *sourceDefResolver) getForwardedImplementationFiles(sourceFile *ast.SourceFile) []string {
	preferredMode := r.inferImpliedNodeFormat(sourceFile.FileName())

	var files []string
	for _, imp := range sourceFile.Imports() {
		moduleName := imp.Text()
		if implementationFile := r.resolveImplementationFrom(moduleName, sourceFile.FileName(), preferredMode); implementationFile != "" {
			files = append(files, implementationFile)
		}
	}
	return core.Deduplicate(files)
}

func getCandidateSourceDeclarationNames(originalNode *ast.Node, declaration *ast.Node) []string {
	var names []string
	if declaration != nil {
		if name := ast.GetNameOfDeclaration(declaration); name != nil {
			if text := ast.GetTextOfPropertyName(name); text != "" {
				names = append(names, text)
			}
		}
		if declaration.Kind == ast.KindExportAssignment {
			names = append(names, "default")
		}
		if (ast.IsFunctionDeclaration(declaration) || ast.IsClassDeclaration(declaration)) && declaration.ModifierFlags()&ast.ModifierFlagsExportDefault == ast.ModifierFlagsExportDefault {
			names = append(names, "default")
		}
		if ast.IsImportSpecifier(declaration) || ast.IsExportSpecifier(declaration) {
			if propName := declaration.PropertyName(); propName != nil {
				names = append(names, propName.Text())
			}
		}
	}
	if originalNode != nil {
		if ast.IsIdentifier(originalNode) || ast.IsPrivateIdentifier(originalNode) {
			names = append(names, originalNode.Text())
		}
		if isDefaultImportName(originalNode) {
			names = append(names, "default")
		}
		if originalNode.Parent != nil {
			if ast.IsImportSpecifier(originalNode.Parent) || ast.IsExportSpecifier(originalNode.Parent) {
				if propName := originalNode.Parent.PropertyName(); propName != nil {
					names = append(names, propName.Text())
				}
			}
		}
	}
	return names
}

func findDeclarationNodesByName(sourceFile *ast.SourceFile, names []string) []*ast.Node {
	names = core.Deduplicate(core.Filter(names, func(name string) bool { return name != "" }))
	if len(names) == 0 {
		return nil
	}

	var wanted collections.Set[string]
	wantDefault := false
	for _, name := range names {
		if name == "default" {
			wantDefault = true
			continue
		}
		wanted.Add(name)
	}

	type candidate struct {
		node  *ast.Node
		depth int
	}
	var candidates []candidate
	minDepth := math.MaxInt

	var visit ast.Visitor
	visit = func(node *ast.Node) bool {
		matched := false
		if name := ast.GetNameOfDeclaration(node); name != nil {
			if text := ast.GetTextOfPropertyName(name); text != "" {
				if wanted.Has(text) {
					matched = true
				}
			}
		}
		if wantDefault && node.Kind == ast.KindExportAssignment {
			matched = true
		}
		if wantDefault && (ast.IsFunctionDeclaration(node) || ast.IsClassDeclaration(node)) && node.ModifierFlags()&ast.ModifierFlagsExportDefault == ast.ModifierFlagsExportDefault {
			matched = true
		}
		if matched {
			depth := getContainerDepth(node)
			candidates = append(candidates, candidate{node: node, depth: depth})
			if depth < minDepth {
				minDepth = depth
			}
		}
		return node.ForEachChild(visit)
	}
	sourceFile.AsNode().ForEachChild(visit)

	// Only keep declarations at the shallowest depth, like getTopMostDeclarationNamesInFile.
	var declarations []*ast.Node
	for _, c := range candidates {
		if c.depth == minDepth {
			declarations = append(declarations, c.node)
		}
	}
	return uniqueDeclarationNodes(declarations)
}

// getContainerDepth counts the number of container nodes above a declaration,
// matching the behavior of getDepth in getTopMostDeclarationNamesInFile.
func getContainerDepth(node *ast.Node) int {
	depth := 0
	current := node
	for current != nil {
		current = getContainerNode(current)
		depth++
	}
	return depth
}

func filterPreferredSourceDeclarations(originalNode *ast.Node, declarations []*ast.Node) []*ast.Node {
	if len(declarations) <= 1 || originalNode == nil {
		return declarations
	}
	if preferred := getPropertyLikeSourceDeclarations(originalNode, declarations); len(preferred) != 0 {
		return preferred
	}
	if preferred := core.Filter(declarations, isConcreteSourceDeclaration); len(preferred) != 0 {
		return preferred
	}
	return declarations
}

func getPropertyLikeSourceDeclarations(originalNode *ast.Node, declarations []*ast.Node) []*ast.Node {
	if originalNode.Parent == nil || !ast.IsAccessExpression(originalNode.Parent) || originalNode.Parent.Name() != originalNode {
		return nil
	}
	return core.Filter(declarations, func(node *ast.Node) bool {
		switch node.Kind {
		case ast.KindPropertyAssignment,
			ast.KindShorthandPropertyAssignment,
			ast.KindPropertyDeclaration,
			ast.KindPropertySignature,
			ast.KindMethodDeclaration,
			ast.KindMethodSignature,
			ast.KindGetAccessor,
			ast.KindSetAccessor,
			ast.KindEnumMember:
			return true
		default:
			return false
		}
	})
}

func hasConcreteSourceDeclarations(declarations []*ast.Node) bool {
	return slices.ContainsFunc(declarations, isConcreteSourceDeclaration)
}

func isConcreteSourceDeclaration(node *ast.Node) bool {
	if !ast.IsDeclaration(node) || node.Kind == ast.KindExportAssignment || node.Kind == ast.KindJSExportAssignment {
		return false
	}
	if (ast.IsBinaryExpression(node) || ast.IsCallExpression(node)) && ast.GetAssignmentDeclarationKind(node) != ast.JSDeclarationKindNone {
		return false
	}
	switch node.Kind {
	case ast.KindParameter,
		ast.KindTypeParameter,
		ast.KindBindingElement,
		ast.KindImportClause,
		ast.KindImportSpecifier,
		ast.KindNamespaceImport,
		ast.KindExportSpecifier,
		ast.KindPropertyAccessExpression,
		ast.KindElementAccessExpression,
		ast.KindCommonJSExport:
		return false
	default:
		return true
	}
}

func uniqueDeclarationNodes(nodes []*ast.Node) []*ast.Node {
	type declarationKey struct {
		fileName string
		loc      core.TextRange
	}
	var seen collections.Set[declarationKey]
	result := make([]*ast.Node, 0, len(nodes))
	for _, node := range nodes {
		if node == nil {
			continue
		}
		fileName := ast.GetSourceFileOfNode(node).FileName()
		key := declarationKey{fileName: fileName, loc: node.Loc}
		if !seen.AddIfAbsent(key) {
			continue
		}
		result = append(result, node)
	}
	return result
}

func findClosestDeclarationNode(sourceFile *ast.SourceFile, pos int) *ast.Node {
	node := astnav.GetTouchingPropertyName(sourceFile, pos)
	for current := node; current != nil; current = current.Parent {
		if ast.IsDeclaration(current) || current.Kind == ast.KindExportAssignment {
			return current
		}
	}
	return getSourceDefinitionEntryNode(sourceFile)
}

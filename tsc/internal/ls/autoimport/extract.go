package autoimport

import (
	"slices"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type symbolExtractor struct {
	nodeModulesDirectory tspath.Path
	packageName          string
	stats                *extractorStats

	localNameResolver *binder.NameResolver
	checker           *checker.Checker
	toPath            func(fileName string) tspath.Path
	// realpath, if set, is used to resolve symlinks for ModuleID generation.
	// This ensures that symlinked packages use their realpath as ModuleID,
	// deduplicating exports from files that appear via multiple symlink paths.
	realpath func(fileName string) string
}

type exportExtractor struct {
	*symbolExtractor
	moduleResolver *module.Resolver
}

type extractorStats struct {
	exports     atomic.Int32
	usedChecker atomic.Int32
}

func (e *exportExtractor) Stats() *extractorStats {
	return e.stats
}

type checkerLease struct {
	used    bool
	checker *checker.Checker
}

func (l *checkerLease) GetChecker() *checker.Checker {
	l.used = true
	return l.checker
}

func (l *checkerLease) TryChecker() *checker.Checker {
	if l.used {
		return l.checker
	}
	return nil
}

func newSymbolExtractor(nodeModulesDirectory tspath.Path, packageName string, checker *checker.Checker, toPath func(string) tspath.Path, realpath func(string) string) *symbolExtractor {
	return &symbolExtractor{
		nodeModulesDirectory: nodeModulesDirectory,
		packageName:          packageName,
		checker:              checker,
		localNameResolver: &binder.NameResolver{
			CompilerOptions: core.EmptyCompilerOptions,
		},
		stats:    &extractorStats{},
		toPath:   toPath,
		realpath: realpath,
	}
}

func (b *registryBuilder) newExportExtractor(nodeModulesDirectory tspath.Path, packageName string, checker *checker.Checker, realpath func(string) string) *exportExtractor {
	return &exportExtractor{
		symbolExtractor: newSymbolExtractor(nodeModulesDirectory, packageName, checker, b.base.toPath, realpath),
		moduleResolver:  b.resolver,
	}
}

// getModuleID returns the ModuleID for a file, using realpath if available.
func (e *symbolExtractor) getModuleID(file *ast.SourceFile) ModuleID {
	if e.realpath != nil && e.toPath != nil {
		realpath := e.realpath(file.FileName())
		return ModuleID(e.toPath(realpath))
	}
	return ModuleID(file.Path())
}

// getModuleIDForSymbol returns the ModuleID for a module symbol, using realpath
// normalization when available for source files.
func (e *symbolExtractor) getModuleIDForSymbol(symbol *ast.Symbol) (ModuleID, bool) {
	moduleID, fileName, ok := tryGetModuleIDAndFileNameOfModuleSymbol(symbol)
	if !ok {
		return "", false
	}
	// If fileName is set, this is a source file that may need realpath normalization
	if fileName != "" && e.realpath != nil {
		decl := ast.GetNonAugmentationDeclaration(symbol)
		if decl != nil && decl.Kind == ast.KindSourceFile {
			return e.getModuleID(decl.AsSourceFile()), true
		}
	}
	return moduleID, true
}

func (e *exportExtractor) extractFromFile(file *ast.SourceFile) []*Export {
	if file.Symbol != nil {
		return e.extractFromModule(file)
	}
	if len(file.AmbientModuleNames) > 0 {
		moduleDeclarations := core.Filter(file.Statements.Nodes, ast.IsModuleWithStringLiteralName)
		var exportCount int
		for _, decl := range moduleDeclarations {
			exportCount += len(decl.AsModuleDeclaration().Symbol.Exports)
		}
		exports := make([]*Export, 0, exportCount)
		for _, decl := range moduleDeclarations {
			e.extractFromModuleDeclaration(decl.AsModuleDeclaration(), file, ModuleID(decl.Name().Text()), "", &exports)
		}
		return exports
	}
	return nil
}

func (e *exportExtractor) extractFromModule(file *ast.SourceFile) []*Export {
	moduleAugmentations := core.MapNonNil(file.ModuleAugmentations, func(name *ast.ModuleName) *ast.ModuleDeclaration {
		decl := name.Parent
		if ast.IsGlobalScopeAugmentation(decl) {
			return nil
		}
		return decl.AsModuleDeclaration()
	})
	var augmentationExportCount int
	for _, decl := range moduleAugmentations {
		augmentationExportCount += len(decl.Symbol.Exports)
	}
	moduleID := e.getModuleID(file)
	exports := make([]*Export, 0, len(file.Symbol.Exports)+augmentationExportCount)
	for name, symbol := range file.Symbol.Exports {
		e.extractFromSymbol(name, symbol, moduleID, file.FileName(), file, &exports)
	}
	for _, decl := range moduleAugmentations {
		name := decl.Name().AsStringLiteral().Text
		moduleID := ModuleID(name)
		var moduleFileName string
		if tspath.IsExternalModuleNameRelative(name) {
			if resolved, _ := e.moduleResolver.ResolveModuleName(name, file.FileName(), core.ModuleKindCommonJS, nil); resolved.IsResolved() {
				moduleFileName = resolved.ResolvedFileName
				moduleID = ModuleID(e.toPath(moduleFileName))
			} else {
				// :shrug:
				moduleFileName = tspath.ResolvePath(tspath.GetDirectoryPath(file.FileName()), name)
				moduleID = ModuleID(e.toPath(moduleFileName))
			}
		}
		e.extractFromModuleDeclaration(decl, file, moduleID, moduleFileName, &exports)
	}
	return exports
}

func (e *exportExtractor) extractFromModuleDeclaration(decl *ast.ModuleDeclaration, file *ast.SourceFile, moduleID ModuleID, moduleFileName string, exports *[]*Export) {
	for name, symbol := range decl.Symbol.Exports {
		e.extractFromSymbol(name, symbol, moduleID, moduleFileName, file, exports)
	}
}

func (e *symbolExtractor) extractFromSymbol(name string, symbol *ast.Symbol, moduleID ModuleID, moduleFileName string, file *ast.SourceFile, exports *[]*Export) {
	if shouldIgnoreSymbol(symbol) {
		return
	}

	if name == ast.InternalSymbolNameExportStar {
		checkerLease := &checkerLease{checker: e.checker}
		allExports := e.checker.GetExportsOfModule(symbol.Parent)
		// allExports includes named exports from the file that will be processed separately;
		// we want to add only the ones that come from the star
		for name, namedExport := range symbol.Parent.Exports {
			if name != ast.InternalSymbolNameExportStar {
				idx := slices.Index(allExports, namedExport)
				if idx >= 0 || shouldIgnoreSymbol(namedExport) {
					allExports = slices.Delete(allExports, idx, idx+1)
				}
			}
		}

		*exports = slices.Grow(*exports, len(allExports))
		for _, reexportedSymbol := range allExports {
			export, _ := e.createExport(reexportedSymbol, moduleID, moduleFileName, ExportSyntaxStar, file, checkerLease)
			if export != nil {
				parent := checkerLease.GetChecker().GetMergedSymbol(reexportedSymbol.Parent)
				if parent != nil && parent.IsExternalModule() {
					if targetModuleID, ok := e.getModuleIDForSymbol(parent); ok {
						export.Target = ExportID{
							ExportName: reexportedSymbol.Name,
							ModuleID:   targetModuleID,
						}
					}
				}
				export.through = ast.InternalSymbolNameExportStar
				*exports = append(*exports, export)
			}
		}
		return
	}

	syntax := getSyntax(symbol)
	checkerLease := &checkerLease{checker: e.checker}
	export, target := e.createExport(symbol, moduleID, moduleFileName, syntax, file, checkerLease)
	if export == nil {
		return
	}

	if symbol.Name == ast.InternalSymbolNameDefault || symbol.Name == ast.InternalSymbolNameExportEquals {
		namedSymbol := symbol
		if s := binder.GetLocalSymbolForExportDefault(symbol); s != nil {
			namedSymbol = s
		}
		export.localName = getDefaultLikeExportNameFromDeclaration(namedSymbol)
		if isUnusableName(export.localName) {
			export.localName = export.Target.ExportName
		}
		if isUnusableName(export.localName) {
			if target != nil {
				namedSymbol = target
				if s := binder.GetLocalSymbolForExportDefault(target); s != nil {
					namedSymbol = s
				}
				export.localName = getDefaultLikeExportNameFromDeclaration(namedSymbol)
				if isUnusableName(export.localName) {
					export.localName = lsutil.ModuleSpecifierToValidIdentifier(string(export.Target.ModuleID), core.ScriptTargetESNext, false)
				}
			} else {
				export.localName = lsutil.ModuleSpecifierToValidIdentifier(string(moduleID), core.ScriptTargetESNext, false)
			}
		}
	}

	*exports = append(*exports, export)

	if target != nil {
		if syntax == ExportSyntaxEquals && target.Flags&ast.SymbolFlagsNamespace != 0 {
			*exports = slices.Grow(*exports, len(target.Exports))
			for _, namedExport := range target.Exports {
				export, _ := e.createExport(namedExport, moduleID, moduleFileName, syntax, file, checkerLease)
				if export != nil {
					export.through = name
					*exports = append(*exports, export)
				}
			}
		}
	} else if syntax == ExportSyntaxCommonJSModuleExports {
		expression := symbol.Declarations[0].AsExportAssignment().Expression
		if expression.Kind == ast.KindObjectLiteralExpression {
			// what is actually desirable here? I think it would be reasonable to only treat these as exports
			// if *every* property is a shorthand property or identifier: identifier
			// At least, it would be sketchy if there were any methods, computed properties...
			*exports = slices.Grow(*exports, len(expression.AsObjectLiteralExpression().Properties.Nodes))
			for _, prop := range expression.AsObjectLiteralExpression().Properties.Nodes {
				if ast.IsShorthandPropertyAssignment(prop) || ast.IsPropertyAssignment(prop) && prop.AsPropertyAssignment().Name().Kind == ast.KindIdentifier {
					export, _ := e.createExport(expression.Symbol().Members[prop.Name().Text()], moduleID, moduleFileName, syntax, file, checkerLease)
					if export != nil {
						export.through = name
						*exports = append(*exports, export)
					}
				}
			}
		}
	}
}

// createExport creates an Export for the given symbol, returning the Export and the target symbol if the export is an alias.
func (e *symbolExtractor) createExport(symbol *ast.Symbol, moduleID ModuleID, moduleFileName string, syntax ExportSyntax, file *ast.SourceFile, checkerLease *checkerLease) (*Export, *ast.Symbol) {
	if shouldIgnoreSymbol(symbol) {
		return nil, nil
	}

	export := &Export{
		ExportID: ExportID{
			ExportName: symbol.Name,
			ModuleID:   moduleID,
		},
		ModuleFileName:       moduleFileName,
		Syntax:               syntax,
		Flags:                symbol.CombinedLocalAndExportSymbolFlags(),
		Path:                 file.Path(),
		NodeModulesDirectory: e.nodeModulesDirectory,
		PackageName:          e.packageName,
	}

	if syntax == ExportSyntaxUMD {
		export.ExportName = ast.InternalSymbolNameExportEquals
		export.localName = symbol.Name
	}

	var targetSymbol *ast.Symbol
	if symbol.Flags&ast.SymbolFlagsAlias != 0 {
		targetSymbol = e.tryResolveSymbol(symbol, syntax, checkerLease)
		if targetSymbol != nil {
			var decl *ast.Node
			if len(targetSymbol.Declarations) > 0 {
				decl = targetSymbol.Declarations[0]
			} else if targetSymbol.CheckFlags&ast.CheckFlagsMapped != 0 {
				if mappedDecl := checkerLease.GetChecker().GetMappedTypeSymbolOfProperty(targetSymbol); mappedDecl != nil && len(mappedDecl.Declarations) > 0 {
					decl = mappedDecl.Declarations[0]
				}
			}
			if decl == nil {
				// !!! consider GetImmediateAliasedSymbol to go as far as we can
				decl = symbol.Declarations[0]
			}
			if decl == nil {
				panic("no declaration for aliased symbol")
			}

			parent := targetSymbol.Parent
			if checker := checkerLease.TryChecker(); checker != nil {
				export.Flags = checker.GetSymbolFlags(targetSymbol)
				export.IsTypeOnly = checker.GetTypeOnlyAliasDeclaration(symbol) != nil
				parent = checker.GetMergedSymbol(parent)
			} else {
				export.Flags = targetSymbol.Flags
				export.IsTypeOnly = core.Some(symbol.Declarations, ast.IsPartOfTypeOnlyImportOrExportDeclaration)
			}
			export.ScriptElementKind = lsutil.GetSymbolKind(checkerLease.TryChecker(), targetSymbol, decl)
			export.ScriptElementKindModifiers = lsutil.GetSymbolModifiers(checkerLease.TryChecker(), targetSymbol)
			moduleID := ModuleID(ast.GetSourceFileOfNode(decl).Path())
			if parent != nil && parent.IsExternalModule() {
				if targetModuleID, ok := e.getModuleIDForSymbol(parent); ok {
					moduleID = targetModuleID
				}
			}
			export.Target = ExportID{
				ExportName: targetSymbol.Name,
				ModuleID:   moduleID,
			}
		}
	} else {
		export.ScriptElementKind = lsutil.GetSymbolKind(checkerLease.TryChecker(), symbol, symbol.Declarations[0])
		export.ScriptElementKindModifiers = lsutil.GetSymbolModifiers(checkerLease.TryChecker(), symbol)
	}

	e.stats.exports.Add(1)
	if checkerLease.TryChecker() != nil {
		e.stats.usedChecker.Add(1)
	}

	return export, targetSymbol
}

func (e *symbolExtractor) tryResolveSymbol(symbol *ast.Symbol, syntax ExportSyntax, checkerLease *checkerLease) *ast.Symbol {
	if !ast.IsNonLocalAlias(symbol, ast.SymbolFlagsNone) {
		return symbol
	}

	var loc *ast.Node
	var name string
	switch syntax {
	case ExportSyntaxNamed:
		decl := ast.GetDeclarationOfKind(symbol, ast.KindExportSpecifier)
		if decl.Parent.Parent.AsExportDeclaration().ModuleSpecifier == nil {
			if n := core.FirstNonZero(decl.Name(), decl.PropertyName()); n.Kind == ast.KindIdentifier {
				loc = n
				name = n.Text()
			}
		}
	// !!! check if module.exports = foo is marked as an alias
	case ExportSyntaxEquals:
		if symbol.Name != ast.InternalSymbolNameExportEquals {
			break
		}
		fallthrough
	case ExportSyntaxDefaultDeclaration:
		decl := ast.GetDeclarationOfKind(symbol, ast.KindExportAssignment)
		if decl.Expression().Kind == ast.KindIdentifier {
			loc = decl.Expression()
			name = loc.Text()
		}
	}

	if loc != nil {
		local := e.localNameResolver.Resolve(loc, name, ast.SymbolFlagsAll, nil, false, false)
		if local != nil && !ast.IsNonLocalAlias(local, ast.SymbolFlagsNone) {
			return local
		}
	}

	checker := checkerLease.GetChecker()
	if resolved := checker.GetAliasedSymbol(symbol); !checker.IsUnknownSymbol(resolved) {
		return resolved
	}
	return nil
}

func shouldIgnoreSymbol(symbol *ast.Symbol) bool {
	if symbol.Flags&ast.SymbolFlagsPrototype != 0 {
		return true
	}
	return false
}

func getSyntax(symbol *ast.Symbol) ExportSyntax {
	for _, decl := range symbol.Declarations {
		switch decl.Kind {
		case ast.KindExportSpecifier:
			return ExportSyntaxNamed
		case ast.KindExportAssignment:
			return core.IfElse(
				decl.AsExportAssignment().IsExportEquals,
				ExportSyntaxEquals,
				ExportSyntaxDefaultDeclaration,
			)
		case ast.KindNamespaceExportDeclaration:
			return ExportSyntaxUMD
		case ast.KindJSExportAssignment:
			return ExportSyntaxCommonJSModuleExports
		case ast.KindCommonJSExport:
			return ExportSyntaxCommonJSExportsProperty
		default:
			if ast.GetCombinedModifierFlags(decl)&ast.ModifierFlagsDefault != 0 {
				return ExportSyntaxDefaultModifier
			} else {
				return ExportSyntaxModifier
			}
		}
	}
	return ExportSyntaxNone
}

func isUnusableName(name string) bool {
	return name == "" ||
		name == "_default" ||
		name == ast.InternalSymbolNameExportStar ||
		name == ast.InternalSymbolNameDefault ||
		name == ast.InternalSymbolNameExportEquals
}

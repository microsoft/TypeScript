package autoimport

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ExportSyntax -output=export_stringer_generated.go
//go:generate npx dprint fmt export_stringer_generated.go

type moduleIDKind uint8

const (
	moduleIDKindInvalid moduleIDKind = iota
	moduleIDKindFile
	moduleIDKindAmbient
)

// ModuleID uniquely identifies either a file module or an ambient module.
type ModuleID struct {
	path      tspath.PathKey
	specifier tspath.ModuleSpecifier
	kind      moduleIDKind
}

func fileModuleID(path tspath.PathKey) ModuleID {
	return ModuleID{path: path, kind: moduleIDKindFile}
}

func ambientModuleID(specifier string) ModuleID {
	return ModuleID{specifier: tspath.ToModuleSpecifier(specifier), kind: moduleIDKindAmbient}
}

func (m ModuleID) AsString() string {
	switch m.kind {
	case moduleIDKindFile:
		return string(m.path)
	case moduleIDKindAmbient:
		return m.specifier.AsString()
	default:
		return ""
	}
}

func (m ModuleID) IsAmbient() bool {
	return m.kind == moduleIDKindAmbient
}

func (m ModuleID) AsPathKey() (tspath.PathKey, bool) {
	if m.kind != moduleIDKindFile {
		return "", false
	}
	return m.path, true
}

func (m ModuleID) AsModuleSpecifier() (tspath.ModuleSpecifier, bool) {
	if m.kind != moduleIDKindAmbient {
		return "", false
	}
	return m.specifier, true
}

type ExportID struct {
	ModuleID   ModuleID
	ExportName string
}

type ExportSyntax int

const (
	ExportSyntaxNone ExportSyntax = iota
	// export const x = {}
	ExportSyntaxModifier
	// export { x }
	ExportSyntaxNamed
	// export default function f() {}
	ExportSyntaxDefaultModifier
	// export default f
	ExportSyntaxDefaultDeclaration
	// export = x
	ExportSyntaxEquals
	// export as namespace x
	ExportSyntaxUMD
	// export * from "module"
	ExportSyntaxStar
	// module.exports = {}
	ExportSyntaxCommonJSModuleExports
	// exports.x = {}
	ExportSyntaxCommonJSExportsProperty
)

type Export struct {
	ExportID
	ModuleFileName            tspath.RootedFilePath
	UnresolvedModuleSpecifier tspath.ModuleSpecifier
	Syntax                    ExportSyntax
	Flags                     ast.SymbolFlags
	localName                 string
	// through is the name of the module symbol's export that this export was found on,
	// either 'export=', InternalSymbolNameExportStar, or empty string.
	through string

	// Checker-set fields

	Target                     ExportID
	IsTypeOnly                 bool
	ScriptElementKind          lsutil.ScriptElementKind
	ScriptElementKindModifiers lsutil.ScriptElementKindModifier

	// The file where the export was found.
	Path tspath.PathKey

	PackageName string
}

func (e *Export) Name() string {
	if e.localName != "" {
		return e.localName
	}
	if e.ExportName == ast.InternalSymbolNameExportEquals {
		return e.Target.ExportName
	}
	return e.ExportName
}

func (e *Export) IsRenameable() bool {
	return e.ExportName == ast.InternalSymbolNameExportEquals || e.ExportName == ast.InternalSymbolNameDefault
}

func (e *Export) AmbientModuleName() string {
	if e.ModuleID.IsAmbient() {
		return e.ModuleID.AsString()
	}
	return ""
}

func (e *Export) IsUnresolvedAlias() bool {
	return e.Flags == ast.SymbolFlagsAlias
}

func SymbolToExport(symbol *ast.Symbol, ch *checker.Checker) *Export {
	if symbol.Parent != nil && checker.IsExternalModuleSymbol(symbol.Parent) {
		if moduleID, moduleFileName, ok := tryGetModuleIDAndFileNameOfModuleSymbol(symbol.Parent); ok {
			return extractFirstExport(symbol, ch, moduleID, moduleFileName, ast.GetSourceFileOfModule(symbol.Parent))
		}
		return nil
	}

	declaration := core.FirstOrNil(symbol.Declarations)
	if declaration == nil {
		return nil
	}

	file := ast.GetSourceFileOfNode(declaration)
	if file.Symbol == nil {
		return nil
	}

	moduleSymbol := ch.GetMergedSymbol(file.Symbol)
	moduleID := fileModuleID(file.PathKey())
	moduleFileName := file.FileName()
	target := ch.GetMergedSymbol(ch.SkipAlias(symbol))

	if export := tryGetModuleExport(ast.InternalSymbolNameDefault, target, moduleSymbol, ch, moduleID, moduleFileName, file); export != nil {
		return export
	}
	if export := tryGetModuleExport(ast.InternalSymbolNameExportEquals, target, moduleSymbol, ch, moduleID, moduleFileName, file); export != nil {
		return export
	}
	return tryGetModuleExport(symbol.Name, target, moduleSymbol, ch, moduleID, moduleFileName, file)
}

func tryGetModuleExport(exportName string, target *ast.Symbol, moduleSymbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName tspath.RootedFilePath, file *ast.SourceFile) *Export {
	exported := ch.TryGetMemberInModuleExportsAndProperties(exportName, moduleSymbol)
	if exported != nil && ch.GetMergedSymbol(ch.SkipAlias(exported)) == target {
		return extractFirstExport(exported, ch, moduleID, moduleFileName, file)
	}
	return nil
}

func extractFirstExport(symbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName tspath.RootedFilePath, file *ast.SourceFile) *Export {
	var exports []*Export
	extractor := newSymbolExtractor("", ch, tspath.CaseInsensitive, nil)
	extractor.extractFromSymbol(symbol.Name, symbol, moduleID, moduleFileName, file, &exports)
	return core.FirstOrNil(exports)
}

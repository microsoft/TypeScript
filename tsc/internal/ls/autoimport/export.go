package autoimport

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ExportSyntax -output=export_stringer_generated.go
//go:generate npx dprint fmt export_stringer_generated.go

// ModuleID uniquely identifies a module across multiple declarations.
// If the export is from an ambient module declaration, this is the module name.
// If the export is from a module augmentation, this is the Path() of the resolved module file.
// Otherwise this is the Path() of the exporting source file.
type ModuleID string

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
	ModuleFileName string
	Syntax         ExportSyntax
	Flags          ast.SymbolFlags
	localName      string
	// through is the name of the module symbol's export that this export was found on,
	// either 'export=', InternalSymbolNameExportStar, or empty string.
	through string

	// Checker-set fields

	Target                     ExportID
	IsTypeOnly                 bool
	ScriptElementKind          lsutil.ScriptElementKind
	ScriptElementKindModifiers lsutil.ScriptElementKindModifier

	// The file where the export was found.
	Path tspath.Path

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
	if !tspath.IsExternalModuleNameRelative(string(e.ModuleID)) {
		return string(e.ModuleID)
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
	moduleID := ModuleID(file.Path())
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

func tryGetModuleExport(exportName string, target *ast.Symbol, moduleSymbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName string, file *ast.SourceFile) *Export {
	exported := ch.TryGetMemberInModuleExportsAndProperties(exportName, moduleSymbol)
	if exported != nil && ch.GetMergedSymbol(ch.SkipAlias(exported)) == target {
		return extractFirstExport(exported, ch, moduleID, moduleFileName, file)
	}
	return nil
}

func extractFirstExport(symbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName string, file *ast.SourceFile) *Export {
	var exports []*Export
	extractor := newSymbolExtractor("", ch, nil, nil)
	extractor.extractFromSymbol(symbol.Name, symbol, moduleID, moduleFileName, file, &exports)
	return core.FirstOrNil(exports)
}

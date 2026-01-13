package autoimport

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ExportSyntax -output=export_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -w export_stringer_generated.go

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
	ScriptElementKindModifiers collections.Set[lsutil.ScriptElementKindModifier]

	// The file where the export was found.
	Path tspath.Path

	NodeModulesDirectory tspath.Path
	PackageName          string
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
	if symbol.Parent == nil || !checker.IsExternalModuleSymbol(symbol.Parent) {
		return nil
	}
	moduleID, moduleFileName := getModuleIDAndFileNameOfModuleSymbol(symbol.Parent)
	extractor := newSymbolExtractor("", "", ch, nil, nil)

	var exports []*Export
	extractor.extractFromSymbol(symbol.Name, symbol, moduleID, moduleFileName, ast.GetSourceFileOfModule(symbol.Parent), &exports)
	if len(exports) > 0 {
		return exports[0]
	}
	return nil
}

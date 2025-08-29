package ls

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=ExportKind -output=autoImports_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -lang=go1.25 -w autoImports_stringer_generated.go

type ImportKind int

const (
	ImportKindNamed     ImportKind = 0
	ImportKindDefault   ImportKind = 1
	ImportKindNamespace ImportKind = 2
	ImportKindCommonJS  ImportKind = 3
)

type ExportKind int

const (
	ExportKindNamed        ExportKind = 0
	ExportKindDefault      ExportKind = 1
	ExportKindExportEquals ExportKind = 2
	ExportKindUMD          ExportKind = 3
	ExportKindModule       ExportKind = 4
)

type ImportFixKind int

const (
	// Sorted with the preferred fix coming first.
	ImportFixKindUseNamespace    ImportFixKind = 0
	ImportFixKindJsdocTypeImport ImportFixKind = 1
	ImportFixKindAddToExisting   ImportFixKind = 2
	ImportFixKindAddNew          ImportFixKind = 3
	ImportFixKindPromoteTypeOnly ImportFixKind = 4
)

type AddAsTypeOnly int

const (
	// These should not be combined as bitflags, but are given powers of 2 values to
	// easily detect conflicts between `NotAllowed` and `Required` by giving them a unique sum.
	// They're also ordered in terms of increasing priority for a fix-all scenario (see
	// `reduceAddAsTypeOnlyValues`).
	AddAsTypeOnlyAllowed    AddAsTypeOnly = 1 << 0
	AddAsTypeOnlyRequired   AddAsTypeOnly = 1 << 1
	AddAsTypeOnlyNotAllowed AddAsTypeOnly = 1 << 2
)

type ImportFix struct {
	kind                ImportFixKind
	isReExport          *bool
	exportInfo          *SymbolExportInfo // !!! | FutureSymbolExportInfo | undefined
	moduleSpecifierKind modulespecifiers.ResultKind
	moduleSpecifier     string
	usagePosition       *lsproto.Position
	namespacePrefix     *string

	importClauseOrBindingPattern *ast.Node  // ImportClause | ObjectBindingPattern
	importKind                   ImportKind // ImportKindDefault | ImportKindNamed
	addAsTypeOnly                AddAsTypeOnly
	propertyName                 string // !!! not implemented

	useRequire bool

	typeOnlyAliasDeclaration *ast.Declaration // TypeOnlyAliasDeclaration
}

func (i *ImportFix) qualification() *Qualification {
	switch i.kind {
	case ImportFixKindAddNew:
		if i.usagePosition == nil || strPtrIsEmpty(i.namespacePrefix) {
			return nil
		}
		fallthrough
	case ImportFixKindUseNamespace:
		return &Qualification{
			usagePosition:   *i.usagePosition,
			namespacePrefix: *i.namespacePrefix,
		}
	}
	panic(fmt.Sprintf("no qualification with ImportFixKind %v", i.kind))
}

type Qualification struct {
	usagePosition   lsproto.Position
	namespacePrefix string
}

func getUseNamespaceImport(
	moduleSpecifier string,
	moduleSpecifierKind modulespecifiers.ResultKind,
	namespacePrefix string,
	usagePosition lsproto.Position,
) *ImportFix {
	return &ImportFix{
		kind:                ImportFixKindUseNamespace,
		moduleSpecifierKind: moduleSpecifierKind,
		moduleSpecifier:     moduleSpecifier,

		usagePosition:   ptrTo(usagePosition),
		namespacePrefix: strPtrTo(namespacePrefix),
	}
}

func getAddJsdocTypeImport(
	moduleSpecifier string,
	moduleSpecifierKind modulespecifiers.ResultKind,
	usagePosition *lsproto.Position,
	exportInfo *SymbolExportInfo,
	isReExport *bool,
) *ImportFix {
	return &ImportFix{
		kind:                ImportFixKindJsdocTypeImport,
		isReExport:          isReExport,
		exportInfo:          exportInfo,
		moduleSpecifierKind: moduleSpecifierKind,
		moduleSpecifier:     moduleSpecifier,
		usagePosition:       usagePosition,
	}
}

func getAddToExistingImport(
	importClauseOrBindingPattern *ast.Node,
	importKind ImportKind,
	moduleSpecifier string,
	moduleSpecifierKind modulespecifiers.ResultKind,
	addAsTypeOnly AddAsTypeOnly,
) *ImportFix {
	return &ImportFix{
		kind:                         ImportFixKindAddToExisting,
		moduleSpecifierKind:          moduleSpecifierKind,
		moduleSpecifier:              moduleSpecifier,
		importClauseOrBindingPattern: importClauseOrBindingPattern,
		importKind:                   importKind,
		addAsTypeOnly:                addAsTypeOnly,
	}
}

func getNewAddNewImport(
	moduleSpecifier string,
	moduleSpecifierKind modulespecifiers.ResultKind,
	importKind ImportKind,
	useRequire bool,
	addAsTypeOnly AddAsTypeOnly,
	exportInfo *SymbolExportInfo, // !!! | FutureSymbolExportInfo
	isReExport *bool,
	qualification *Qualification,
) *ImportFix {
	return &ImportFix{
		kind:                ImportFixKindAddNew,
		isReExport:          isReExport,
		exportInfo:          exportInfo,
		moduleSpecifierKind: modulespecifiers.ResultKindNone,
		moduleSpecifier:     moduleSpecifier,
		importKind:          importKind,
		addAsTypeOnly:       addAsTypeOnly,
		useRequire:          useRequire,
	}
}

func getNewPromoteTypeOnlyImport(typeOnlyAliasDeclaration *ast.Declaration) *ImportFix {
	// !!! function stub
	return &ImportFix{
		kind: ImportFixKindPromoteTypeOnly,
		// 		isReExport          *bool
		// exportInfo          *SymbolExportInfo // !!! | FutureSymbolExportInfo | undefined
		// moduleSpecifierKind modulespecifiers.ResultKind
		// moduleSpecifier     string
		typeOnlyAliasDeclaration: typeOnlyAliasDeclaration,
	}
}

/** Information needed to augment an existing import declaration. */
// !!! after full implementation, rename to AddToExistingImportInfo
type FixAddToExistingImportInfo struct {
	declaration *ast.Declaration
	importKind  ImportKind
	targetFlags ast.SymbolFlags
	symbol      *ast.Symbol
}

func (info *FixAddToExistingImportInfo) getNewImportFromExistingSpecifier(
	isValidTypeOnlyUseSite bool,
	useRequire bool,
	ch *checker.Checker,
	compilerOptions *core.CompilerOptions,
) *ImportFix {
	moduleSpecifier := checker.TryGetModuleSpecifierFromDeclaration(info.declaration)
	if moduleSpecifier == nil || moduleSpecifier.Text() == "" {
		return nil
	}
	addAsTypeOnly := AddAsTypeOnlyNotAllowed
	if !useRequire {
		addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, info.symbol, info.targetFlags, ch, compilerOptions)
	}
	return getNewAddNewImport(
		moduleSpecifier.Text(),
		modulespecifiers.ResultKindNone,
		info.importKind,
		useRequire,
		addAsTypeOnly,
		nil, // exportInfo
		nil, // isReExport
		nil, // qualification
	)
}

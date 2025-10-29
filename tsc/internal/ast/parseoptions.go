package ast

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type JSDocParsingMode uint8

const (
	JSDocParsingModeParseAll JSDocParsingMode = iota
	JSDocParsingModeParseNone
	JSDocParsingModeParseForTypeErrors
	JSDocParsingModeParseForTypeInfo
)

type SourceFileParseOptions struct {
	FileName                       string
	Path                           tspath.Path
	CompilerOptions                core.SourceFileAffectingCompilerOptions
	ExternalModuleIndicatorOptions ExternalModuleIndicatorOptions
	JSDocParsingMode               JSDocParsingMode
}

func GetSourceFileAffectingCompilerOptions(fileName string, options *core.CompilerOptions) core.SourceFileAffectingCompilerOptions {
	// Declaration files are not parsed/bound differently depending on compiler options.
	if tspath.IsDeclarationFileName(fileName) {
		return core.SourceFileAffectingCompilerOptions{}
	}
	return options.SourceFileAffecting()
}

type ExternalModuleIndicatorOptions struct {
	jsx   bool
	force bool
}

func GetExternalModuleIndicatorOptions(fileName string, options *core.CompilerOptions, metadata SourceFileMetaData) ExternalModuleIndicatorOptions {
	if tspath.IsDeclarationFileName(fileName) {
		return ExternalModuleIndicatorOptions{}
	}

	switch options.GetEmitModuleDetectionKind() {
	case core.ModuleDetectionKindForce:
		// All non-declaration files are modules, declaration files still do the usual isFileProbablyExternalModule
		return ExternalModuleIndicatorOptions{force: true}
	case core.ModuleDetectionKindLegacy:
		// Files are modules if they have imports, exports, or import.meta
		return ExternalModuleIndicatorOptions{}
	case core.ModuleDetectionKindAuto:
		// If module is nodenext or node16, all esm format files are modules
		// If jsx is react-jsx or react-jsxdev then jsx tags force module-ness
		// otherwise, the presence of import or export statments (or import.meta) implies module-ness
		return ExternalModuleIndicatorOptions{
			jsx:   options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev,
			force: isFileForcedToBeModuleByFormat(fileName, options, metadata),
		}
	default:
		return ExternalModuleIndicatorOptions{}
	}
}

var isFileForcedToBeModuleByFormatExtensions = []string{tspath.ExtensionCjs, tspath.ExtensionCts, tspath.ExtensionMjs, tspath.ExtensionMts}

func isFileForcedToBeModuleByFormat(fileName string, options *core.CompilerOptions, metadata SourceFileMetaData) bool {
	// Excludes declaration files - they still require an explicit `export {}` or the like
	// for back compat purposes. The only non-declaration files _not_ forced to be a module are `.js` files
	// that aren't esm-mode (meaning not in a `type: module` scope).
	if GetImpliedNodeFormatForEmitWorker(fileName, options.GetEmitModuleKind(), metadata) == core.ModuleKindESNext || tspath.FileExtensionIsOneOf(fileName, isFileForcedToBeModuleByFormatExtensions) {
		return true
	}
	return false
}

func SetExternalModuleIndicator(file *SourceFile, opts ExternalModuleIndicatorOptions) {
	file.ExternalModuleIndicator = getExternalModuleIndicator(file, opts)
}

func getExternalModuleIndicator(file *SourceFile, opts ExternalModuleIndicatorOptions) *Node {
	if file.ScriptKind == core.ScriptKindJSON {
		return nil
	}

	if node := isFileProbablyExternalModule(file); node != nil {
		return node
	}

	if file.IsDeclarationFile {
		return nil
	}

	if opts.jsx {
		if node := isFileModuleFromUsingJSXTag(file); node != nil {
			return node
		}
	}

	if opts.force {
		return file.AsNode()
	}

	return nil
}

func isFileProbablyExternalModule(sourceFile *SourceFile) *Node {
	for _, statement := range sourceFile.Statements.Nodes {
		if isAnExternalModuleIndicatorNode(statement) {
			return statement
		}
	}
	return getImportMetaIfNecessary(sourceFile)
}

func isAnExternalModuleIndicatorNode(node *Node) bool {
	return HasSyntacticModifier(node, ModifierFlagsExport) ||
		IsImportEqualsDeclaration(node) && IsExternalModuleReference(node.AsImportEqualsDeclaration().ModuleReference) ||
		IsImportDeclaration(node) || IsExportAssignment(node) || IsExportDeclaration(node)
}

func getImportMetaIfNecessary(sourceFile *SourceFile) *Node {
	if sourceFile.AsNode().Flags&NodeFlagsPossiblyContainsImportMeta != 0 {
		return findChildNode(sourceFile.AsNode(), IsImportMeta)
	}
	return nil
}

func findChildNode(root *Node, check func(*Node) bool) *Node {
	var result *Node
	var visit func(*Node) bool
	visit = func(node *Node) bool {
		if check(node) {
			result = node
			return true
		}
		return node.ForEachChild(visit)
	}
	visit(root)
	return result
}

func isFileModuleFromUsingJSXTag(file *SourceFile) *Node {
	return walkTreeForJSXTags(file.AsNode())
}

// This is a somewhat unavoidable full tree walk to locate a JSX tag - `import.meta` requires the same,
// but we avoid that walk (or parts of it) if at all possible using the `PossiblyContainsImportMeta` node flag.
// Unfortunately, there's no `NodeFlag` space to do the same for JSX.
func walkTreeForJSXTags(node *Node) *Node {
	var found *Node

	var visitor func(node *Node) bool
	visitor = func(node *Node) bool {
		if found != nil {
			return true
		}
		if node.SubtreeFacts()&SubtreeContainsJsx == 0 {
			return false
		}
		if IsJsxOpeningElement(node) || IsJsxFragment(node) {
			found = node
			return true
		}
		return node.ForEachChild(visitor)
	}
	visitor(node)

	return found
}

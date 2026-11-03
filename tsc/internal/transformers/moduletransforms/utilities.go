package moduletransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func isDeclarationNameOfEnumOrNamespace(emitContext *printer.EmitContext, node *ast.IdentifierNode) bool {
	if original := emitContext.MostOriginal(node); original != nil && original.Parent != nil { //nolint:customlint // MostOriginal yields parse-tree nodes and this helper intentionally inspects parse-tree parents.
		switch original.Parent.Kind { //nolint:customlint // MostOriginal yields parse-tree nodes and this helper intentionally inspects parse-tree parents.
		case ast.KindEnumDeclaration, ast.KindModuleDeclaration:
			return original == original.Parent.Name() //nolint:customlint // MostOriginal yields parse-tree nodes and this helper intentionally inspects parse-tree parents.
		}
	}
	return false
}

func rewriteModuleSpecifier(emitContext *printer.EmitContext, node *ast.Expression, compilerOptions *core.CompilerOptions, rewrites []tspath.ExtensionRewrite, caseSensitivity tspath.CaseSensitivity, sourceFile *ast.SourceFile, getMapperExtension func(*ast.SourceFile, *ast.StringLiteralLike) string) *ast.Expression {
	if node == nil || !ast.IsStringLiteralLike(node) || !compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		return node
	}
	specifier := tspath.ToModuleSpecifier(node.Text())
	if getMapperExtension != nil && specifier.IsRelative() && len(rewrites) > 0 {
		rewrites = contentmapper.RewritesForImport(rewrites, specifier, getMapperExtension(sourceFile, node), caseSensitivity)
	}
	if !specifier.ShouldRewriteExtension(rewrites, caseSensitivity) {
		return node
	}
	updatedSpecifier, rewritten := specifier.RewriteExtension(rewrites, caseSensitivity)
	updatedText := updatedSpecifier.AsString()
	if !rewritten {
		updatedText = tspath.ChangeExtension(node.Text(), outputpaths.GetOutputExtension(node.Text(), compilerOptions.Jsx))
	}
	if updatedText != node.Text() {
		var updated *ast.Expression
		if ast.IsStringLiteral(node) {
			updated = emitContext.Factory.NewStringLiteral(updatedText, node.AsStringLiteral().TokenFlags)
		} else {
			updated = emitContext.Factory.NewNoSubstitutionTemplateLiteral(updatedText, node.AsNoSubstitutionTemplateLiteral().TemplateFlags)
		}
		emitContext.SetOriginal(updated, node)
		emitContext.AssignCommentAndSourceMapRanges(updated, node)
		return updated
	}
	return node
}

func createEmptyImports(factory *printer.NodeFactory) *ast.Statement {
	return factory.NewExportDeclaration(
		nil,   /*modifiers*/
		false, /*isTypeOnly*/
		factory.NewNamedExports(factory.NewNodeList(nil)),
		nil, /*moduleSpecifier*/
		nil, /*attributes*/
	)
}

// Get the name of a target module from an import/export declaration as should be written in the emitted output.
// The emitted output name can be different from the input if:
//  1. The module has a /// <amd-module name="<new name>" />
//  2. --out or --outFile is used, making the name relative to the rootDir
//     3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
//
// Otherwise, a new StringLiteral node representing the module name will be returned.
func getExternalModuleNameLiteral(emitContext *printer.EmitContext, importNode *ast.Node /*ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration | ImportCall*/, sourceFile *ast.SourceFile, host any /*EmitHost*/, resolver printer.EmitResolver, compilerOptions *core.CompilerOptions) *ast.StringLiteralNode {
	factory := emitContext.Factory
	moduleName := ast.GetExternalModuleName(importNode)
	if moduleName != nil && ast.IsStringLiteral(moduleName) {
		name := tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions)
		if name == nil {
			name = tryRenameExternalModule(factory, moduleName, sourceFile)
		}
		if name == nil { // !!! propagate token flags (will produce new diffs)
			name = factory.NewStringLiteral(moduleName.Text(), ast.TokenFlagsNone)
		}
		emitContext.SetOriginal(name, moduleName)
		return name
	}
	return nil
}

// Get the name of a module as should be written in the emitted output.
// The emitted output name can be different from the input if:
//  1. The module has a /// <amd-module name="<new name>" />
//  2. --out or --outFile is used, making the name relative to the rootDir
//
// Otherwise, a new StringLiteral node representing the module name will be returned.
func tryGetModuleNameFromFile(factory *printer.NodeFactory, file *ast.SourceFile, host any /*EmitHost*/, options *core.CompilerOptions) *ast.StringLiteralNode {
	if file == nil {
		return nil
	}
	// !!!
	// if file.moduleName {
	// 	return factory.createStringLiteral(file.moduleName)
	// }
	return nil
}

func tryGetModuleNameFromDeclaration(declaration *ast.Node /*ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ImportCall*/, host any /*EmitHost*/, factory *printer.NodeFactory, resolver printer.EmitResolver, compilerOptions *core.CompilerOptions) *ast.StringLiteralNode {
	if resolver == nil {
		return nil
	}
	return tryGetModuleNameFromFile(factory, resolver.GetExternalModuleFileFromDeclaration(declaration), host, compilerOptions)
}

// Resolves a local path to a path which is absolute to the base of the emit
func getExternalModuleNameFromPath(host any /*ResolveModuleNameResolutionHost*/, fileName string, referencePath string) string {
	// !!!
	return ""
}

// Some bundlers (SystemJS builder) sometimes want to rename dependencies.
// Here we check if alternative name was provided for a given moduleName and return it if possible.
func tryRenameExternalModule(factory *printer.NodeFactory, moduleName *ast.LiteralExpression, sourceFile *ast.SourceFile) *ast.StringLiteralNode {
	// !!!
	return nil
}

func isFileLevelReservedGeneratedIdentifier(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	info := emitContext.GetAutoGenerateInfo(name)
	return info != nil &&
		info.Flags.IsFileLevel() &&
		info.Flags.IsOptimistic() &&
		info.Flags.IsReservedInNestedScopes()
}

// A simple inlinable expression is an expression which can be copied into multiple locations
// without risk of repeating any sideeffects and whose value could not possibly change between
// any such locations
func isSimpleInlineableExpression(expression *ast.Expression) bool {
	return !ast.IsIdentifier(expression) && transformers.IsSimpleCopiableExpression(expression)
}

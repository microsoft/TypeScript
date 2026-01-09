package parser

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func collectExternalModuleReferences(file *ast.SourceFile) {
	for _, node := range file.Statements.Nodes {
		collectModuleReferences(file, node, false /*inAmbientModule*/)
	}

	if file.Flags&ast.NodeFlagsPossiblyContainsDynamicImport != 0 || ast.IsInJSFile(file.AsNode()) {
		ast.ForEachDynamicImportOrRequireCall(file /*includeTypeSpaceImports*/, true /*requireStringLiteralLikeArgument*/, true, func(node *ast.Node, moduleSpecifier *ast.Expression) bool {
			ast.SetImportsOfSourceFile(file, append(file.Imports(), moduleSpecifier))
			return false
		})
	}
}

func collectModuleReferences(file *ast.SourceFile, node *ast.Statement, inAmbientModule bool) {
	if ast.IsAnyImportOrReExport(node) {
		moduleNameExpr := ast.GetExternalModuleName(node)
		// TypeScript 1.0 spec (April 2014): 12.1.6
		// An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
		// only through top - level external module names. Relative external module names are not permitted.
		if moduleNameExpr != nil && ast.IsStringLiteral(moduleNameExpr) {
			moduleName := moduleNameExpr.Text()
			if moduleName != "" && (!inAmbientModule || !tspath.IsExternalModuleNameRelative(moduleName)) {
				ast.SetImportsOfSourceFile(file, append(file.Imports(), moduleNameExpr))
				// !!! removed `&& p.currentNodeModulesDepth == 0`
				if file.UsesUriStyleNodeCoreModules != core.TSTrue && !file.IsDeclarationFile {
					if strings.HasPrefix(moduleName, "node:") && !core.ExclusivelyPrefixedNodeCoreModules[moduleName] {
						// Presence of `node:` prefix takes precedence over unprefixed node core modules
						file.UsesUriStyleNodeCoreModules = core.TSTrue
					} else if file.UsesUriStyleNodeCoreModules == core.TSUnknown && core.UnprefixedNodeCoreModules[moduleName] {
						// Avoid `unprefixedNodeCoreModules.has` for every import
						file.UsesUriStyleNodeCoreModules = core.TSFalse
					}
				}
			}
		}
		return
	}
	if ast.IsModuleDeclaration(node) && ast.IsAmbientModule(node) && (inAmbientModule || ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) || file.IsDeclarationFile) {
		nameText := node.AsModuleDeclaration().Name().Text()
		// Ambient module declarations can be interpreted as augmentations for some existing external modules.
		// This will happen in two cases:
		// - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
		// - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
		//   immediately nested in top level ambient module declaration .
		if ast.IsExternalModule(file) || (inAmbientModule && !tspath.IsExternalModuleNameRelative(nameText)) {
			file.ModuleAugmentations = append(file.ModuleAugmentations, node.AsModuleDeclaration().Name())
		} else if !inAmbientModule {
			file.AmbientModuleNames = append(file.AmbientModuleNames, nameText)
			// An AmbientExternalModuleDeclaration declares an external module.
			// This type of declaration is permitted only in the global module.
			// The StringLiteral must specify a top - level external module name.
			// Relative external module names are not permitted
			// NOTE: body of ambient module is always a module block, if it exists
			if node.Body() != nil {
				for _, statement := range node.Body().Statements() {
					collectModuleReferences(file, statement, true /*inAmbientModule*/)
				}
			}
		}
	}
}

package parser

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
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

// getStringLiteralAttributesFromTypeLiteral extracts name -> string-literal value
// pairs from an ambient module's import-attributes type. Returns nil when there
// are no attributes (treated like with {}). Invalid shapes yield nil so the
// declaration still participates as an empty attributes match.
func getStringLiteralAttributesFromTypeLiteral(attributes *ast.Node) map[string]string {
	if attributes == nil || !ast.IsTypeLiteralNode(attributes) {
		return nil
	}
	members := attributes.AsTypeLiteralNode().Members
	if members == nil || len(members.Nodes) == 0 {
		return nil
	}
	result := make(map[string]string, len(members.Nodes))
	for _, member := range members.Nodes {
		if !ast.IsPropertySignatureDeclaration(member) {
			return nil
		}
		prop := member.AsPropertySignatureDeclaration()
		name := prop.Name()
		if name == nil || !(ast.IsIdentifier(name) || ast.IsStringLiteralLike(name)) {
			return nil
		}
		typeNode := prop.Type
		if typeNode == nil || !ast.IsLiteralTypeNode(typeNode) || !ast.IsStringLiteral(typeNode.AsLiteralTypeNode().Literal) {
			return nil
		}
		result[name.Text()] = typeNode.AsLiteralTypeNode().Literal.Text()
	}
	return result
}

// GetStringLiteralAttributesFromImportAttributes extracts name -> string-literal
// value pairs from an import/export's import attributes expression.
func GetStringLiteralAttributesFromImportAttributes(attributes *ast.Node) map[string]string {
	if attributes == nil || !ast.IsImportAttributes(attributes) {
		return nil
	}
	list := attributes.AsImportAttributes().Attributes
	if list == nil || len(list.Nodes) == 0 {
		return nil
	}
	result := make(map[string]string, len(list.Nodes))
	for _, attr := range list.Nodes {
		name := attr.Name()
		value := attr.AsImportAttribute().Value
		if name == nil || value == nil || !ast.IsStringLiteral(value) {
			return nil
		}
		result[name.Text()] = value.Text()
	}
	return result
}

// ImportAttributesAssignableTo reports whether importAttrs is structurally
// assignable to ambientAttrs for the restricted string-literal attribute types
// used by pattern ambient modules (import may have additional properties).
func ImportAttributesAssignableTo(importAttrs map[string]string, ambientAttrs map[string]string) bool {
	for name, want := range ambientAttrs {
		got, ok := importAttrs[name]
		if !ok || got != want {
			return false
		}
	}
	return true
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
			if pattern := core.TryParsePattern(nameText); pattern.IsValid() && pattern.StarIndex >= 0 {
				file.ParsedPatternAmbientModules = append(file.ParsedPatternAmbientModules, &ast.ParsedPatternAmbientModule{
					Pattern:    pattern,
					Attributes: getStringLiteralAttributesFromTypeLiteral(node.AsModuleDeclaration().Attributes),
				})
			}
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

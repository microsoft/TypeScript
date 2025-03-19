package transformers

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type externalModuleInfo struct {
	externalImports              []*ast.Declaration                                     // ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration. imports and reexports of other external modules
	exportSpecifiers             core.MultiMap[string, *ast.ExportSpecifier]            // Maps local names to their associated export specifiers (excludes reexports)
	exportedBindings             core.MultiMap[*ast.Declaration, *ast.ModuleExportName] // Maps local declarations to their associated export aliases
	exportedNames                []*ast.ModuleExportName                                // all exported names in the module, both local and re-exported, excluding the names of locally exported function declarations
	exportedFunctions            collections.OrderedSet[*ast.FunctionDeclarationNode]   // all of the top-level exported function declarations
	exportEquals                 *ast.ExportAssignment                                  // an export= declaration if one was present
	hasExportStarsToExportValues bool                                                   // whether this module contains export*
}

type externalModuleInfoCollector struct {
	sourceFile       *ast.SourceFile
	compilerOptions  *core.CompilerOptions
	emitContext      *printer.EmitContext
	resolver         binder.ReferenceResolver
	uniqueExports    core.Set[string]
	hasExportDefault bool
	output           *externalModuleInfo
}

func collectExternalModuleInfo(sourceFile *ast.SourceFile, compilerOptions *core.CompilerOptions, emitContext *printer.EmitContext, resolver binder.ReferenceResolver) *externalModuleInfo {
	c := externalModuleInfoCollector{
		sourceFile:      sourceFile,
		compilerOptions: compilerOptions,
		emitContext:     emitContext,
		resolver:        resolver,
		output:          &externalModuleInfo{},
	}
	return c.collect()
}

func (c *externalModuleInfoCollector) collect() *externalModuleInfo {
	hasImportStar := false
	hasImportDefault := false
	for _, node := range c.sourceFile.Statements.Nodes {
		switch node.Kind {
		case ast.KindImportDeclaration:
			// import "mod"
			// import x from "mod"
			// import * as x from "mod"
			// import { x, y } from "mod"
			n := node.AsImportDeclaration()
			c.addExternalImport(node)
			if !hasImportStar && getImportNeedsImportStarHelper(n) {
				hasImportStar = true
			}
			if !hasImportDefault && getImportNeedsImportDefaultHelper(n) {
				hasImportDefault = true
			}

		case ast.KindImportEqualsDeclaration:
			n := node.AsImportEqualsDeclaration()
			if ast.IsExternalModuleReference(n.ModuleReference) {
				// import x = require("mod")
				c.addExternalImport(node)
			}

		case ast.KindExportDeclaration:
			n := node.AsExportDeclaration()
			if n.ModuleSpecifier != nil {
				// export * from "mod"
				// export * as ns from "mod"
				// export { x, y } from "mod"
				c.addExternalImport(node)
				if n.ExportClause == nil {
					// export * from "mod"
					c.output.hasExportStarsToExportValues = true
				} else if ast.IsNamedExports(n.ExportClause) {
					// export { x, y } from "mod"
					c.addExportedNamesForExportDeclaration(n)
					if !hasImportDefault {
						hasImportDefault = containsDefaultReference(n.ExportClause)
					}
				} else {
					// export * as ns from "mod"
					name := n.ExportClause.AsNamespaceExport().Name()
					nameText := name.Text()
					if c.addUniqueExport(nameText) {
						c.addExportedBinding(node, name)
						c.addExportedName(name)
					}
					// we use the same helpers for `export * as ns` as we do for `import * as ns`
					hasImportStar = true
				}
			} else {
				// export { x, y }
				c.addExportedNamesForExportDeclaration(node.AsExportDeclaration())
			}

		case ast.KindExportAssignment:
			n := node.AsExportAssignment()
			if n.IsExportEquals && c.output.exportEquals == nil {
				// export = x
				c.output.exportEquals = n
			}

		case ast.KindVariableStatement:
			n := node.AsVariableStatement()
			if ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
				for _, decl := range n.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					c.collectExportedVariableInfo(decl)
				}
			}

		case ast.KindFunctionDeclaration:
			n := node.AsFunctionDeclaration()
			if ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
				c.addExportedFunctionDeclaration(n, nil /*name*/, ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault))
			}

		case ast.KindClassDeclaration:
			n := node.AsClassDeclaration()
			if ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
				if ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) {
					// export default class { }
					if !c.hasExportDefault {
						name := n.Name()
						if name == nil {
							name = c.emitContext.NewGeneratedNameForNode(node, printer.AutoGenerateOptions{})
						}
						c.addExportedBinding(node, name)
						c.hasExportDefault = true
					}
				} else {
					// export class x { }
					name := n.Name()
					if name != nil {
						if c.addUniqueExport(name.Text()) {
							c.addExportedBinding(node, name)
							c.addExportedName(name)
						}
					}
				}
			}
		}
	}

	return c.output
}

func (c *externalModuleInfoCollector) addUniqueExport(name string) bool {
	if !c.uniqueExports.Has(name) {
		c.uniqueExports.Add(name)
		return true
	}
	return false
}

func (c *externalModuleInfoCollector) addExportedBinding(decl *ast.Declaration, name *ast.ModuleExportName) {
	c.output.exportedBindings.Add(c.emitContext.MostOriginal(decl), name)
}

func (c *externalModuleInfoCollector) addExternalImport(node *ast.Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration*/) {
	c.output.externalImports = append(c.output.externalImports, node)
}

func (c *externalModuleInfoCollector) addExportedName(name *ast.ModuleExportName) {
	c.output.exportedNames = append(c.output.exportedNames, name)
}

func (c *externalModuleInfoCollector) addExportedNamesForExportDeclaration(node *ast.ExportDeclaration) {
	for _, specifier := range node.ExportClause.AsNamedExports().Elements.Nodes {
		specifierNameText := specifier.Name().Text()
		if c.addUniqueExport(specifierNameText) {
			name := specifier.PropertyNameOrName()
			if name.Kind != ast.KindStringLiteral {
				if node.ModuleSpecifier == nil {
					c.output.exportSpecifiers.Add(name.Text(), specifier.AsExportSpecifier())
				}

				decl := c.resolver.GetReferencedImportDeclaration(c.emitContext.MostOriginal(name))
				if decl == nil {
					decl = c.resolver.GetReferencedValueDeclaration(c.emitContext.MostOriginal(name))
				}
				if decl != nil {
					if decl.Kind == ast.KindFunctionDeclaration {
						c.uniqueExports.Delete(specifierNameText)
						c.addExportedFunctionDeclaration(decl.AsFunctionDeclaration(), specifier.Name(), ast.ModuleExportNameIsDefault(specifier.Name()))
						continue
					}
					c.addExportedBinding(decl, specifier.Name())
				}
			}

			c.addExportedName(specifier.Name())
		}
	}
}

func (c *externalModuleInfoCollector) addExportedFunctionDeclaration(node *ast.FunctionDeclaration, name *ast.ModuleExportName, isDefault bool) {
	c.output.exportedFunctions.Add(c.emitContext.MostOriginal(node.AsNode()))
	if isDefault {
		// export default function() { }
		// function x() { } + export { x as default };
		if !c.hasExportDefault {
			if name == nil {
				name = c.emitContext.NewGeneratedNameForNode(node.AsNode(), printer.AutoGenerateOptions{})
			}
			c.addExportedBinding(node.AsNode(), name)
			c.hasExportDefault = true
		}
	} else {
		// export function x() { }
		// function x() { } + export { x }
		if name == nil {
			name = node.Name()
		}
		nameText := name.Text()
		if c.addUniqueExport(nameText) {
			c.addExportedBinding(node.AsNode(), name)
		}
	}
}

func (c *externalModuleInfoCollector) collectExportedVariableInfo(decl *ast.Node /*VariableDeclaration | BindingElement*/) {
	if ast.IsBindingPattern(decl.Name()) {
		for _, element := range decl.Name().AsBindingPattern().Elements.Nodes {
			e := element.AsBindingElement()
			if e.Name() != nil {
				c.collectExportedVariableInfo(element)
			}
		}
	} else if !c.emitContext.HasAutoGenerateInfo(decl.Name()) {
		text := decl.Name().Text()
		if c.addUniqueExport(text) {
			c.addExportedName(decl.Name())
			if isLocalName(c.emitContext, decl.Name()) {
				c.addExportedBinding(decl, decl.Name())
			}
		}
	}
}

const externalHelpersModuleNameText = "tslib"

func createExternalHelpersImportDeclarationIfNeeded(emitContext *printer.EmitContext, sourceFile *ast.SourceFile, compilerOptions *core.CompilerOptions, sourceFileMetaDataProvider printer.SourceFileMetaDataProvider, hasExportStarsToExportValues bool, hasImportStar bool, hasImportDefault bool) *ast.Node /*ImportDeclaration | ImportEqualsDeclaration*/ {
	if compilerOptions.ImportHelpers.IsTrue() && ast.IsEffectiveExternalModule(sourceFile, compilerOptions) {
		moduleKind := compilerOptions.GetEmitModuleKind()
		impliedModuleKind := ast.GetImpliedNodeFormatForEmitWorker(sourceFile.FileName(), compilerOptions, sourceFileMetaDataProvider.GetSourceFileMetaData(sourceFile.Path()))
		helpers := getImportedHelpers(emitContext, sourceFile)
		if (moduleKind >= core.ModuleKindES2015 && moduleKind <= core.ModuleKindESNext) ||
			impliedModuleKind == core.ModuleKindESNext ||
			impliedModuleKind == core.ModuleKindNone && moduleKind == core.ModuleKindPreserve {
			// When we emit as an ES module, generate an `import` declaration that uses named imports for helpers.
			// If we cannot determine the implied module kind under `module: preserve` we assume ESM.
			var helperNames []string
			for _, helper := range helpers {
				importName := helper.ImportName
				if len(importName) > 0 {
					helperNames = core.AppendIfUnique(helperNames, importName)
				}
			}
			if len(helperNames) > 0 {
				slices.SortFunc(helperNames, stringutil.CompareStringsCaseSensitive)
				// Alias the imports if the names are used somewhere in the file.
				// NOTE: We don't need to care about global import collisions as this is a module.

				importSpecifiers := core.Map(helperNames, func(name string) *ast.ImportSpecifierNode {
					if printer.IsFileLevelUniqueName(sourceFile, name, nil /*hasGlobalName*/) {
						return emitContext.Factory.NewImportSpecifier(false /*isTypeOnly*/, nil /*propertyName*/, emitContext.Factory.NewIdentifier(name))
					} else {
						return emitContext.Factory.NewImportSpecifier(false /*isTypeOnly*/, emitContext.Factory.NewIdentifier(name), emitContext.NewUnscopedHelperName(name))
					}
				})
				namedBindings := emitContext.Factory.NewNamedImports(emitContext.Factory.NewNodeList(importSpecifiers))
				parseNode := emitContext.MostOriginal(sourceFile.AsNode())
				emitContext.AddEmitFlags(parseNode, printer.EFExternalHelpers)

				externalHelpersImportDeclaration := emitContext.Factory.NewImportDeclaration(
					nil, /*modifiers*/
					emitContext.Factory.NewImportClause(false /*isTypeOnly*/, nil /*name*/, namedBindings),
					emitContext.Factory.NewStringLiteral(externalHelpersModuleNameText),
					nil, /*attributes*/
				)

				emitContext.AddEmitFlags(externalHelpersImportDeclaration, printer.EFNeverApplyImportHelper|printer.EFCustomPrologue)
				return externalHelpersImportDeclaration
			}
		} else {
			// When we emit to a non-ES module, generate a synthetic `import tslib = require("tslib")` to be further transformed.
			externalHelpersModuleName := getOrCreateExternalHelpersModuleNameIfNeeded(emitContext, sourceFile, compilerOptions, helpers, hasExportStarsToExportValues, hasImportStar || hasImportDefault, sourceFileMetaDataProvider.GetSourceFileMetaData(sourceFile.Path()))
			if externalHelpersModuleName != nil {
				externalHelpersImportDeclaration := emitContext.Factory.NewImportEqualsDeclaration(
					nil,   /*modifiers*/
					false, /*isTypeOnly*/
					externalHelpersModuleName,
					emitContext.Factory.NewExternalModuleReference(emitContext.Factory.NewStringLiteral(externalHelpersModuleNameText)),
				)
				emitContext.AddEmitFlags(externalHelpersImportDeclaration, printer.EFNeverApplyImportHelper|printer.EFCustomPrologue)
				return externalHelpersImportDeclaration
			}
		}
	}
	return nil
}

func getImportedHelpers(emitContext *printer.EmitContext, sourceFile *ast.SourceFile) []*printer.EmitHelper {
	var helpers []*printer.EmitHelper
	for _, helper := range emitContext.GetEmitHelpers(sourceFile.AsNode()) {
		if !helper.Scoped {
			helpers = append(helpers, helper)
		}
	}
	return helpers
}

func getOrCreateExternalHelpersModuleNameIfNeeded(emitContext *printer.EmitContext, node *ast.SourceFile, compilerOptions *core.CompilerOptions, helpers []*printer.EmitHelper, hasExportStarsToExportValues bool, hasImportStarOrImportDefault bool, sourceFileMetaData *ast.SourceFileMetaData) *ast.IdentifierNode {
	externalHelpersModuleName := emitContext.GetExternalHelpersModuleName(node)
	if externalHelpersModuleName != nil {
		return externalHelpersModuleName
	}

	create := len(helpers) > 0 ||
		(hasExportStarsToExportValues || compilerOptions.GetESModuleInterop() && hasImportStarOrImportDefault) &&
			ast.GetEmitModuleFormatOfFileWorker(node, compilerOptions, sourceFileMetaData) < core.ModuleKindSystem

	if create {
		externalHelpersModuleName = emitContext.NewUniqueName(externalHelpersModuleNameText, printer.AutoGenerateOptions{})
		emitContext.SetExternalHelpersModuleName(node, externalHelpersModuleName)
	}

	return externalHelpersModuleName
}

func isNamedDefaultReference(e *ast.Node /*ImportSpecifier | ExportSpecifier*/) bool {
	return ast.ModuleExportNameIsDefault(e.PropertyNameOrName())
}

func containsDefaultReference(node *ast.Node /*NamedImportBindings | NamedExportBindings*/) bool {
	if node == nil {
		return false
	}
	var elements *ast.NodeList
	switch {
	case ast.IsNamedImports(node):
		elements = node.AsNamedImports().Elements
	case ast.IsNamedExports(node):
		elements = node.AsNamedExports().Elements
	default:
		return false
	}
	return core.Some(elements.Nodes, isNamedDefaultReference)
}

func getExportNeedsImportStarHelper(node *ast.ExportDeclaration) bool {
	return ast.GetNamespaceDeclarationNode(node.AsNode()) != nil
}

func getImportNeedsImportStarHelper(node *ast.ImportDeclaration) bool {
	if ast.GetNamespaceDeclarationNode(node.AsNode()) != nil {
		return true
	}
	if node.ImportClause == nil {
		return false
	}
	bindings := node.ImportClause.AsImportClause().NamedBindings
	if bindings == nil {
		return false
	}
	if !ast.IsNamedImports(bindings) {
		return false
	}
	namedImports := bindings.AsNamedImports()
	defaultRefCount := 0
	for _, binding := range namedImports.Elements.Nodes {
		if isNamedDefaultReference(binding) {
			defaultRefCount++
		}
	}
	// Import star is required if there's default named refs mixed with non-default refs, or if theres non-default refs and it has a default import
	return (defaultRefCount > 0 && defaultRefCount != len(namedImports.Elements.Nodes)) || ((len(namedImports.Elements.Nodes)-defaultRefCount) != 0 && ast.IsDefaultImport(node.AsNode()))
}

func getImportNeedsImportDefaultHelper(node *ast.ImportDeclaration) bool {
	// Import default is needed if there's a default import or a default ref and no other refs (meaning an import star helper wasn't requested)
	return !getImportNeedsImportStarHelper(node) && (ast.IsDefaultImport(node.AsNode()) || (node.ImportClause != nil &&
		ast.IsNamedImports(node.ImportClause.AsImportClause().NamedBindings) &&
		containsDefaultReference(node.ImportClause.AsImportClause().NamedBindings)))
}

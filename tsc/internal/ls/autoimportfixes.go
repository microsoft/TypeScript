package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
)

type Import struct {
	name          string
	kind          ImportKind // ImportKindCommonJS | ImportKindNamespace
	addAsTypeOnly AddAsTypeOnly
	propertyName  string // Use when needing to generate an `ImportSpecifier with a `propertyName`; the name preceding "as" keyword (propertyName = "" when "as" is absent)
}

func (ct *changeTracker) addNamespaceQualifier(sourceFile *ast.SourceFile, qualification *Qualification) {
	ct.insertText(sourceFile, qualification.usagePosition, qualification.namespacePrefix+".")
}

func (ct *changeTracker) doAddExistingFix(
	sourceFile *ast.SourceFile,
	clause *ast.Node, // ImportClause | ObjectBindingPattern,
	defaultImport *Import,
	namedImports []*Import,
	// removeExistingImportSpecifiers *core.Set[ImportSpecifier | BindingElement] // !!! remove imports not implemented
	preferences *UserPreferences,
) {
	switch clause.Kind {
	case ast.KindObjectBindingPattern:
		if clause.Kind == ast.KindObjectBindingPattern {
			// bindingPattern := clause.AsBindingPattern()
			// !!! adding *and* removing imports not implemented
			// if (removeExistingImportSpecifiers && core.Some(bindingPattern.Elements, func(e *ast.Node) bool {
			//     return removeExistingImportSpecifiers.Has(e)
			// })) {
			// If we're both adding and removing elements, just replace and reprint the whole
			// node. The change tracker doesn't understand all the operations and can insert or
			// leave behind stray commas.
			// ct.replaceNode(
			//     sourceFile,
			//     bindingPattern,
			// ct.NodeFactory.NewObjectBindingPattern([
			//     ...bindingPattern.Elements.Filter(func(e *ast.Node) bool {
			//         return !removeExistingImportSpecifiers.Has(e)
			//     }),
			//     ...defaultImport ? [ct.NodeFactory.createBindingElement(/*dotDotDotToken*/ nil, /*propertyName*/ "default", defaultImport.name)] : emptyArray,
			//     ...namedImports.map(i => ct.NodeFactory.createBindingElement(/*dotDotDotToken*/ nil, i.propertyName, i.name)),
			// ]),
			// )
			//     return
			// }
			if defaultImport != nil {
				ct.addElementToBindingPattern(sourceFile, clause, defaultImport.name, ptrTo("default"))
			}
			for _, specifier := range namedImports {
				ct.addElementToBindingPattern(sourceFile, clause, specifier.name, &specifier.propertyName)
			}
			return
		}
	case ast.KindImportClause:

		importClause := clause.AsImportClause()

		// promoteFromTypeOnly = true if we need to promote the entire original clause from type only
		promoteFromTypeOnly := importClause.IsTypeOnly() && core.Some(append(namedImports, defaultImport), func(i *Import) bool {
			if i == nil {
				return false
			}
			return i.addAsTypeOnly == AddAsTypeOnlyNotAllowed
		})

		existingSpecifiers := []*ast.Node{} // []*ast.ImportSpecifier
		if importClause.NamedBindings != nil && importClause.NamedBindings.Kind == ast.KindNamedImports {
			existingSpecifiers = importClause.NamedBindings.Elements()
		}

		if defaultImport != nil {
			debug.Assert(clause.Name() == nil, "Cannot add a default import to an import clause that already has one")
			ct.insertNodeAt(sourceFile, core.TextPos(astnav.GetStartOfNode(clause, sourceFile, false)), ct.NodeFactory.NewIdentifier(defaultImport.name), changeNodeOptions{suffix: ", "})
		}

		if len(namedImports) > 0 {
			// !!! OrganizeImports not yet implemented
			// specifierComparer, isSorted := OrganizeImports.getNamedImportSpecifierComparerWithDetection(importClause.Parent, preferences, sourceFile);
			newSpecifiers := core.Map(namedImports, func(namedImport *Import) *ast.Node {
				var identifier *ast.Node
				if namedImport.propertyName != "" {
					identifier = ct.NodeFactory.NewIdentifier(namedImport.propertyName).AsIdentifier().AsNode()
				}
				return ct.NodeFactory.NewImportSpecifier(
					(!importClause.IsTypeOnly() || promoteFromTypeOnly) && shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),
					identifier,
					ct.NodeFactory.NewIdentifier(namedImport.name),
				)
			}) // !!! sort with specifierComparer

			// !!! remove imports not implemented
			// if (removeExistingImportSpecifiers) {
			//     // If we're both adding and removing specifiers, just replace and reprint the whole
			//     // node. The change tracker doesn't understand all the operations and can insert or
			//     // leave behind stray commas.
			//     ct.replaceNode(
			//         sourceFile,
			//         importClause.NamedBindings,
			//         ct.NodeFactory.updateNamedImports(
			//             importClause.NamedBindings.AsNamedImports(),
			//             append(core.Filter(existingSpecifiers, func (s *ast.ImportSpecifier) bool {return !removeExistingImportSpecifiers.Has(s)}), newSpecifiers...), // !!! sort with specifierComparer
			//         ),
			//     );
			// } else if (len(existingSpecifiers) > 0 && isSorted != false) {
			// 	!!! OrganizeImports not implemented
			// 	The sorting preference computed earlier may or may not have validated that these particular
			// 	import specifiers are sorted. If they aren't, `getImportSpecifierInsertionIndex` will return
			// 	nonsense. So if there are existing specifiers, even if we know the sorting preference, we
			// 	need to ensure that the existing specifiers are sorted according to the preference in order
			// 	to do a sorted insertion.
			// 	changed to check if existing specifiers are sorted
			//     if we're promoting the clause from type-only, we need to transform the existing imports before attempting to insert the new named imports
			//     transformedExistingSpecifiers := existingSpecifiers
			// 	if promoteFromTypeOnly && existingSpecifiers {
			// 		transformedExistingSpecifiers = ct.NodeFactory.updateNamedImports(
			// 			importClause.NamedBindings.AsNamedImports(),
			// 			core.SameMap(existingSpecifiers, func(e *ast.ImportSpecifier) *ast.ImportSpecifier {
			// 				return ct.NodeFactory.updateImportSpecifier(e, /*isTypeOnly*/ true, e.propertyName, e.name)
			// 			}),
			// 		).elements
			// 	}
			//     for _, spec := range newSpecifiers {
			//         insertionIndex := OrganizeImports.getImportSpecifierInsertionIndex(transformedExistingSpecifiers, spec, specifierComparer);
			//         ct.insertImportSpecifierAtIndex(sourceFile, spec, importClause.namedBindings as NamedImports, insertionIndex);
			//     }
			// } else
			if len(existingSpecifiers) > 0 {
				for _, spec := range newSpecifiers {
					ct.insertNodeInListAfter(sourceFile, existingSpecifiers[len(existingSpecifiers)-1], spec.AsNode(), existingSpecifiers)
				}
			} else {
				if len(newSpecifiers) > 0 {
					namedImports := ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(newSpecifiers))
					if importClause.NamedBindings != nil {
						ct.replaceNode(sourceFile, importClause.NamedBindings, namedImports, nil)
					} else {
						if clause.Name() == nil {
							panic("Import clause must have either named imports or a default import")
						}
						ct.insertNodeAfter(sourceFile, clause.Name(), namedImports)
					}
				}
			}
		}

		if promoteFromTypeOnly {
			// !!! promote type-only imports not implemented

			// ct.delete(sourceFile, getTypeKeywordOfTypeOnlyImport(clause, sourceFile));
			// if (existingSpecifiers) {
			//     // We used to convert existing specifiers to type-only only if compiler options indicated that
			//     // would be meaningful (see the `importNameElisionDisabled` utility function), but user
			//     // feedback indicated a preference for preserving the type-onlyness of existing specifiers
			//     // regardless of whether it would make a difference in emit.
			//     for _, specifier := range existingSpecifiers {
			//         ct.insertModifierBefore(sourceFile, SyntaxKind.TypeKeyword, specifier);
			//     }
			// }
		}
	default:
		panic("Unsupported clause kind: " + clause.Kind.String() + "for doAddExistingFix")
	}
}

func (ct *changeTracker) addElementToBindingPattern(sourceFile *ast.SourceFile, bindingPattern *ast.Node, name string, propertyName *string) {
	element := ct.newBindingElementFromNameAndPropertyName(name, propertyName)
	if len(bindingPattern.Elements()) > 0 {
		ct.insertNodeInListAfter(sourceFile, bindingPattern.Elements()[len(bindingPattern.Elements())-1], element, nil)
	} else {
		ct.replaceNode(sourceFile, bindingPattern, ct.NodeFactory.NewBindingPattern(
			ast.KindObjectBindingPattern,
			ct.NodeFactory.NewNodeList([]*ast.Node{element}),
		), nil)
	}
}

func (ct *changeTracker) newBindingElementFromNameAndPropertyName(name string, propertyName *string) *ast.Node {
	var newPropertyNameIdentifier *ast.Node
	if propertyName != nil {
		newPropertyNameIdentifier = ct.NodeFactory.NewIdentifier(*propertyName)
	}
	return ct.NodeFactory.NewBindingElement(
		nil, /*dotDotDotToken*/
		newPropertyNameIdentifier,
		ct.NodeFactory.NewIdentifier(name),
		nil, /* initializer */
	)
}

func (ct *changeTracker) insertImports(sourceFile *ast.SourceFile, imports []*ast.Statement, blankLineBetween bool, preferences *UserPreferences) {
	var existingImportStatements []*ast.Statement

	if imports[0].Kind == ast.KindVariableStatement {
		existingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsRequireVariableStatement)
	} else {
		existingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsAnyImportSyntax)
	}
	// !!! OrganizeImports
	//  { comparer, isSorted } := OrganizeImports.getOrganizeImportsStringComparerWithDetection(existingImportStatements, preferences);
	//  sortedNewImports := isArray(imports) ? toSorted(imports, (a, b) => OrganizeImports.compareImportsOrRequireStatements(a, b, comparer)) : [imports];
	sortedNewImports := imports
	// !!! FutureSourceFile
	// if !isFullSourceFile(sourceFile) {
	//     for _, newImport := range sortedNewImports {
	//         // Insert one at a time to send correct original source file for accurate text reuse
	//         // when some imports are cloned from existing ones in other files.
	//         ct.insertStatementsInNewFile(sourceFile.fileName, []*ast.Node{newImport}, ast.GetSourceFileOfNode(getOriginalNode(newImport)))
	//     }
	// return;
	// }

	// if len(existingImportStatements) > 0 && isSorted {
	//     for _, newImport := range sortedNewImports {
	//         insertionIndex := OrganizeImports.getImportDeclarationInsertionIndex(existingImportStatements, newImport, comparer)
	//         if insertionIndex == 0 {
	//             // If the first import is top-of-file, insert after the leading comment which is likely the header.
	//             options := existingImportStatements[0] == sourceFile.statements[0] ? { leadingTriviaOption: textchanges.LeadingTriviaOption.Exclude } : {};
	//             ct.insertNodeBefore(sourceFile, existingImportStatements[0], newImport, /*blankLineBetween*/ false, options);
	//         } else {
	//             prevImport := existingImportStatements[insertionIndex - 1]
	//             ct.insertNodeAfter(sourceFile, prevImport, newImport);
	//         }
	//     }
	// 	return
	// }

	if len(existingImportStatements) > 0 {
		ct.insertNodesAfter(sourceFile, existingImportStatements[len(existingImportStatements)-1], sortedNewImports)
	} else {
		ct.insertAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween)
	}
}

func (ct *changeTracker) makeImport(defaultImport *ast.IdentifierNode, namedImports []*ast.Node, moduleSpecifier *ast.Expression, isTypeOnly bool) *ast.Statement {
	var newNamedImports *ast.Node
	if len(namedImports) > 0 {
		newNamedImports = ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(namedImports))
	}
	var importClause *ast.Node
	if defaultImport != nil || newNamedImports != nil {
		importClause = ct.NodeFactory.NewImportClause(core.IfElse(isTypeOnly, ast.KindTypeKeyword, ast.KindUnknown), defaultImport, newNamedImports)
	}
	return ct.NodeFactory.NewImportDeclaration( /*modifiers*/ nil, importClause, moduleSpecifier, nil /*attributes*/)
}

func (ct *changeTracker) getNewImports(
	moduleSpecifier string,
	// quotePreference quotePreference, // !!! quotePreference
	defaultImport *Import,
	namedImports []*Import,
	namespaceLikeImport *Import, // { importKind: ImportKind.CommonJS | ImportKind.Namespace; }
	compilerOptions *core.CompilerOptions,
	preferences *UserPreferences,
) []*ast.Statement {
	moduleSpecifierStringLiteral := ct.NodeFactory.NewStringLiteral(moduleSpecifier)
	var statements []*ast.Statement // []AnyImportSyntax
	if defaultImport != nil || len(namedImports) > 0 {
		// `verbatimModuleSyntax` should prefer top-level `import type` -
		// even though it's not an error, it would add unnecessary runtime emit.
		topLevelTypeOnly := (defaultImport == nil || needsTypeOnly(defaultImport.addAsTypeOnly)) &&
			core.Every(namedImports, func(i *Import) bool { return needsTypeOnly(i.addAsTypeOnly) }) ||
			(compilerOptions.VerbatimModuleSyntax.IsTrue() || preferences.PreferTypeOnlyAutoImports) &&
				defaultImport != nil && defaultImport.addAsTypeOnly != AddAsTypeOnlyNotAllowed && !core.Some(namedImports, func(i *Import) bool { return i.addAsTypeOnly == AddAsTypeOnlyNotAllowed })

		var defaultImportNode *ast.Node
		if defaultImport != nil {
			defaultImportNode = ct.NodeFactory.NewIdentifier(defaultImport.name)
		}

		statements = append(statements, ct.makeImport(defaultImportNode, core.Map(namedImports, func(namedImport *Import) *ast.Node {
			var namedImportPropertyName *ast.Node
			if namedImport.propertyName != "" {
				namedImportPropertyName = ct.NodeFactory.NewIdentifier(namedImport.propertyName)
			}
			return ct.NodeFactory.NewImportSpecifier(
				!topLevelTypeOnly && shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),
				namedImportPropertyName,
				ct.NodeFactory.NewIdentifier(namedImport.name),
			)
		}), moduleSpecifierStringLiteral, topLevelTypeOnly))
	}

	if namespaceLikeImport != nil {
		var declaration *ast.Statement
		if namespaceLikeImport.kind == ImportKindCommonJS {
			declaration = ct.NodeFactory.NewImportEqualsDeclaration(
				/*modifiers*/ nil,
				shouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences),
				ct.NodeFactory.NewIdentifier(namespaceLikeImport.name),
				ct.NodeFactory.NewExternalModuleReference(moduleSpecifierStringLiteral),
			)
		} else {
			declaration = ct.NodeFactory.NewImportDeclaration(
				/*modifiers*/ nil,
				ct.NodeFactory.NewImportClause(
					/*phaseModifier*/ core.IfElse(shouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences), ast.KindTypeKeyword, ast.KindUnknown),
					/*name*/ nil,
					ct.NodeFactory.NewNamespaceImport(ct.NodeFactory.NewIdentifier(namespaceLikeImport.name)),
				),
				moduleSpecifierStringLiteral,
				/*attributes*/ nil,
			)
		}
		statements = append(statements, declaration)
	}
	if len(statements) == 0 {
		panic("No statements to insert for new imports")
	}
	return statements
}

func needsTypeOnly(addAsTypeOnly AddAsTypeOnly) bool {
	return addAsTypeOnly == AddAsTypeOnlyRequired
}

func shouldUseTypeOnly(addAsTypeOnly AddAsTypeOnly, preferences *UserPreferences) bool {
	return needsTypeOnly(addAsTypeOnly) || addAsTypeOnly != AddAsTypeOnlyNotAllowed && preferences.PreferTypeOnlyAutoImports
}

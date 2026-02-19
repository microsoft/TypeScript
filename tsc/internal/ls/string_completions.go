package ls

import (
	"cmp"
	"context"
	"fmt"
	"iter"
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type completionsFromTypes struct {
	types           []*checker.StringLiteralType
	isNewIdentifier bool
}

type completionsFromProperties struct {
	symbols           []*ast.Symbol
	hasIndexSignature bool
}

type pathCompletion struct {
	name      string
	kind      lsutil.ScriptElementKind
	extension string
	textRange *core.TextRange
}

type stringLiteralCompletions struct {
	fromTypes      *completionsFromTypes
	fromProperties *completionsFromProperties
	fromPaths      []*pathCompletion
}

func (l *LanguageService) getStringLiteralCompletions(
	ctx context.Context,
	file *ast.SourceFile,
	position int,
	contextToken *ast.Node,
	checker *checker.Checker,
	compilerOptions *core.CompilerOptions,
) *lsproto.CompletionList {
	if isInReferenceComment(file, position) {
		entries := l.getTripleSlashReferenceCompletions(file, position, l.GetProgram(), checker)
		return l.convertPathCompletions(ctx, entries, file, position)
	}
	if IsInString(file, position, contextToken) {
		if contextToken == nil || !ast.IsStringLiteralLike(contextToken) {
			return nil
		}
		entries := l.getStringLiteralCompletionEntries(
			ctx,
			file,
			contextToken,
			position,
			checker,
		)
		return l.convertStringLiteralCompletions(
			ctx,
			entries,
			contextToken,
			file,
			position,
			checker,
			compilerOptions,
		)
	}
	return nil
}

func (l *LanguageService) convertStringLiteralCompletions(
	ctx context.Context,
	completion *stringLiteralCompletions,
	contextToken *ast.StringLiteralLike,
	file *ast.SourceFile,
	position int,
	typeChecker *checker.Checker,
	options *core.CompilerOptions,
) *lsproto.CompletionList {
	if completion == nil {
		return nil
	}

	optionalReplacementRange := l.createRangeFromStringLiteralLikeContent(file, contextToken, position)
	switch {
	case completion.fromPaths != nil:
		completion := completion.fromPaths
		return l.convertPathCompletions(ctx, completion, file, position)
	case completion.fromProperties != nil:
		completion := completion.fromProperties
		data := &completionDataData{
			symbols:                 completion.symbols,
			completionKind:          CompletionKindString,
			isNewIdentifierLocation: completion.hasIndexSignature,
			location:                file.AsNode(),
			contextToken:            contextToken,
		}
		_, items := l.getCompletionEntriesFromSymbols(
			ctx,
			typeChecker,
			data,
			contextToken, /*replacementToken*/
			position,
			file,
			options,
		)
		defaultCommitCharacters := getDefaultCommitCharacters(completion.hasIndexSignature)
		itemDefaults := l.setItemDefaults(
			ctx,
			position,
			file,
			items,
			&defaultCommitCharacters,
			optionalReplacementRange,
		)
		return &lsproto.CompletionList{
			IsIncomplete: false,
			ItemDefaults: itemDefaults,
			Items:        items,
		}
	case completion.fromTypes != nil:
		completion := completion.fromTypes
		var quoteChar printer.QuoteChar
		if contextToken.Kind == ast.KindNoSubstitutionTemplateLiteral {
			quoteChar = printer.QuoteCharBacktick
		} else if strings.HasPrefix(contextToken.Text(), "'") {
			quoteChar = printer.QuoteCharSingleQuote
		} else {
			quoteChar = printer.QuoteCharDoubleQuote
		}
		items := core.Map(completion.types, func(t *checker.StringLiteralType) *lsproto.CompletionItem {
			name := printer.EscapeString(t.AsLiteralType().Value().(string), quoteChar)
			return l.createLSPCompletionItem(
				ctx,
				name,
				"", /*insertText*/
				"", /*filterText*/
				SortTextLocationPriority,
				lsutil.ScriptElementKindString,
				collections.Set[lsutil.ScriptElementKindModifier]{},
				l.getReplacementRangeForContextToken(file, contextToken, position),
				nil, /*commitCharacters*/
				nil, /*labelDetails*/
				file,
				position,
				false, /*isMemberCompletion*/
				false, /*isSnippet*/
				false, /*hasAction*/
				false, /*preselect*/
				"",    /*source*/
				nil,   /*autoImportEntryData*/
				nil,   /*detail*/
			)
		})
		defaultCommitCharacters := getDefaultCommitCharacters(completion.isNewIdentifier)
		itemDefaults := l.setItemDefaults(
			ctx,
			position,
			file,
			items,
			&defaultCommitCharacters,
			nil, /*optionalReplacementSpan*/
		)
		return &lsproto.CompletionList{
			IsIncomplete: false,
			ItemDefaults: itemDefaults,
			Items:        items,
		}
	default:
		return nil
	}
}

func (l *LanguageService) convertPathCompletions(
	ctx context.Context,
	pathCompletions []*pathCompletion,
	file *ast.SourceFile,
	position int,
) *lsproto.CompletionList {
	isNewIdentifierLocation := true // The user may type in a path that doesn't yet exist, creating a "new identifier" with respect to the collection of identifiers the server is aware of.
	defaultCommitCharacters := getDefaultCommitCharacters(isNewIdentifierLocation)
	items := core.Map(pathCompletions, func(pathCompletion *pathCompletion) *lsproto.CompletionItem {
		var replacementSpan *lsproto.Range
		if pathCompletion.textRange != nil {
			replacementSpan = l.createLspRangeFromBounds(pathCompletion.textRange.Pos(), pathCompletion.textRange.End(), file)
		}
		detail := pathCompletion.name
		if !strings.HasSuffix(pathCompletion.name, pathCompletion.extension) {
			detail += pathCompletion.extension
		}
		return l.createLSPCompletionItem(
			ctx,
			pathCompletion.name,
			"", /*insertText*/
			"", /*filterText*/
			SortTextLocationPriority,
			pathCompletion.kind,
			*collections.NewSetFromItems(kindModifiersFromExtension(pathCompletion.extension)),
			replacementSpan,
			nil, /*commitCharacters*/
			nil, /*labelDetails*/
			file,
			position,
			false, /*isMemberCompletion*/
			false, /*isSnippet*/
			false, /*hasAction*/
			false, /*preselect*/
			"",    /*source*/
			nil,   /*autoImportEntryData*/
			&detail,
		)
	})
	itemDefaults := l.setItemDefaults(
		ctx,
		position,
		file,
		items,
		&defaultCommitCharacters,
		nil, /*optionalReplacementSpan*/
	)
	return &lsproto.CompletionList{
		IsIncomplete: false,
		ItemDefaults: itemDefaults,
		Items:        items,
	}
}

func (l *LanguageService) getStringLiteralCompletionEntries(
	ctx context.Context,
	file *ast.SourceFile,
	node *ast.StringLiteralLike,
	position int,
	typeChecker *checker.Checker,
) *stringLiteralCompletions {
	parent := walkUpParentheses(node.Parent)
	switch parent.Kind {
	case ast.KindLiteralType:
		grandparent := walkUpParentheses(parent.Parent)
		if grandparent.Kind == ast.KindImportType {
			return l.getStringLiteralCompletionsFromModuleNames(
				file,
				node,
				l.GetProgram(),
				typeChecker,
			)
		}
		return fromUnionableLiteralType(grandparent, parent, position, typeChecker)
	case ast.KindPropertyAssignment:
		if ast.IsObjectLiteralExpression(parent.Parent) && parent.Name() == node {
			// Get quoted name of properties of the object literal expression
			// i.e. interface ConfigFiles {
			//          'jspm:dev': string
			//      }
			//      let files: ConfigFiles = {
			//          '/*completion position*/'
			//      }
			//
			//      function foo(c: ConfigFiles) {}
			//      foo({
			//          '/*completion position*/'
			//      });
			return &stringLiteralCompletions{
				fromProperties: stringLiteralCompletionsForObjectLiteral(typeChecker, parent.Parent),
			}
		}
		if ast.FindAncestor(parent.Parent, ast.IsCallLikeExpression) != nil {
			uniques := &collections.Set[string]{}
			stringLiteralTypes := append(
				getStringLiteralTypes(typeChecker.GetContextualType(node, checker.ContextFlagsNone), uniques, typeChecker),
				getStringLiteralTypes(typeChecker.GetContextualType(node, checker.ContextFlagsIgnoreNodeInferences), uniques, typeChecker)...,
			)
			return toStringLiteralCompletionsFromTypes(stringLiteralTypes)
		}
		return &stringLiteralCompletions{
			fromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),
		}
	case ast.KindElementAccessExpression:
		expression := parent.Expression()
		argumentExpression := parent.AsElementAccessExpression().ArgumentExpression
		if node == ast.SkipParentheses(argumentExpression) {
			// Get all names of properties on the expression
			// i.e. interface A {
			//      'prop1': string
			// }
			// let a: A;
			// a['/*completion position*/']
			t := typeChecker.GetTypeAtLocation(expression)
			return &stringLiteralCompletions{
				fromProperties: stringLiteralCompletionsFromProperties(t, typeChecker),
			}
		}
		return nil
	case ast.KindCallExpression, ast.KindNewExpression, ast.KindJsxAttribute:
		if !isRequireCallArgument(node) && !ast.IsImportCall(parent) {
			var argumentNode *ast.Node
			if parent.Kind == ast.KindJsxAttribute {
				argumentNode = parent.Parent
			} else {
				argumentNode = node
			}
			argumentInfo := getArgumentInfoForCompletions(argumentNode, position, file, typeChecker)
			// Get string literal completions from specialized signatures of the target
			// i.e. declare function f(a: 'A');
			// f("/*completion position*/")
			if argumentInfo == nil {
				return nil
			}

			result := getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, typeChecker)
			if result != nil {
				return &stringLiteralCompletions{
					fromTypes: result,
				}
			}
			return &stringLiteralCompletions{
				fromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),
			}
		}
		fallthrough // is `require("")` or `require(""` or `import("")`
	case ast.KindImportDeclaration, ast.KindExportDeclaration, ast.KindExternalModuleReference, ast.KindJSDocImportTag:
		// Get all known external module names or complete a path to a module
		// i.e. import * as ns from "/*completion position*/";
		//      var y = import("/*completion position*/");
		//      import x = require("/*completion position*/");
		//      var y = require("/*completion position*/");
		//      export * from "/*completion position*/";
		return l.getStringLiteralCompletionsFromModuleNames(file, node, l.GetProgram(), typeChecker)
	case ast.KindCaseClause:
		tracker := newCaseClauseTracker(typeChecker, parent.Parent.AsCaseBlock().Clauses.Nodes)
		contextualTypes := fromContextualType(checker.ContextFlagsIgnoreNodeInferences, node, typeChecker)
		if contextualTypes == nil {
			return nil
		}
		literals := core.Filter(contextualTypes.types, func(t *checker.StringLiteralType) bool {
			return !tracker.hasValue(t.AsLiteralType().Value())
		})
		return &stringLiteralCompletions{
			fromTypes: &completionsFromTypes{
				types:           literals,
				isNewIdentifier: false,
			},
		}
	case ast.KindImportSpecifier, ast.KindExportSpecifier:
		// Complete string aliases in `import { "|" } from` and `export { "|" } from`
		specifier := parent
		if propertyName := specifier.PropertyName(); propertyName != nil && node != propertyName {
			return nil // Don't complete in `export { "..." as "|" } from`
		}
		namedImportsOrExports := specifier.Parent
		var moduleSpecifier *ast.Node
		if namedImportsOrExports.Kind == ast.KindNamedImports {
			moduleSpecifier = namedImportsOrExports.Parent.Parent
		} else {
			moduleSpecifier = namedImportsOrExports.Parent
		}
		if moduleSpecifier == nil {
			return nil
		}
		moduleSpecifierSymbol := typeChecker.GetSymbolAtLocation(moduleSpecifier)
		if moduleSpecifierSymbol == nil {
			return nil
		}
		exports := typeChecker.GetExportsAndPropertiesOfModule(moduleSpecifierSymbol)
		existing := collections.NewSetFromItems(core.Map(namedImportsOrExports.Elements(), func(n *ast.Node) string {
			return n.PropertyNameOrName().Text()
		})...)
		uniques := core.Filter(exports, func(e *ast.Symbol) bool {
			return e.Name != ast.InternalSymbolNameDefault && !existing.Has(e.Name)
		})
		return &stringLiteralCompletions{
			fromProperties: &completionsFromProperties{
				symbols:           uniques,
				hasIndexSignature: false,
			},
		}
	case ast.KindBinaryExpression:
		if parent.AsBinaryExpression().OperatorToken.Kind == ast.KindInKeyword {
			t := typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Right)
			properties := getPropertiesForCompletion(t, typeChecker)
			return &stringLiteralCompletions{
				fromProperties: &completionsFromProperties{
					symbols: core.Filter(properties, func(s *ast.Symbol) bool {
						return s.ValueDeclaration == nil || !ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration)
					}),
					hasIndexSignature: false,
				},
			}
		}
		return &stringLiteralCompletions{
			fromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),
		}
	default:
		result := fromContextualType(checker.ContextFlagsIgnoreNodeInferences, node, typeChecker)
		if result != nil {
			return &stringLiteralCompletions{
				fromTypes: result,
			}
		}
		return &stringLiteralCompletions{
			fromTypes: fromContextualType(checker.ContextFlagsNone, node, typeChecker),
		}
	}
}

func fromContextualType(contextFlags checker.ContextFlags, node *ast.Node, typeChecker *checker.Checker) *completionsFromTypes {
	// Get completion for string literal from string literal type
	// i.e. var x: "hi" | "hello" = "/*completion position*/"
	return toCompletionsFromTypes(getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags), nil, typeChecker))
}

func toCompletionsFromTypes(types []*checker.StringLiteralType) *completionsFromTypes {
	if len(types) == 0 {
		return nil
	}
	return &completionsFromTypes{
		types:           types,
		isNewIdentifier: false,
	}
}

func toStringLiteralCompletionsFromTypes(types []*checker.StringLiteralType) *stringLiteralCompletions {
	result := toCompletionsFromTypes(types)
	if result == nil {
		return nil
	}
	return &stringLiteralCompletions{
		fromTypes: result,
	}
}

func fromUnionableLiteralType(
	grandparent *ast.Node,
	parent *ast.Node,
	position int,
	typeChecker *checker.Checker,
) *stringLiteralCompletions {
	switch grandparent.Kind {
	case ast.KindCallExpression,
		ast.KindExpressionWithTypeArguments,
		ast.KindJsxOpeningElement,
		ast.KindJsxSelfClosingElement,
		ast.KindNewExpression,
		ast.KindTaggedTemplateExpression,
		ast.KindTypeReference:
		typeArgument := ast.FindAncestor(parent, func(n *ast.Node) bool { return n.Parent == grandparent })
		if typeArgument != nil {
			t := typeChecker.GetTypeArgumentConstraint(typeArgument)
			return &stringLiteralCompletions{
				fromTypes: &completionsFromTypes{
					types:           getStringLiteralTypes(t, nil, typeChecker),
					isNewIdentifier: false,
				},
			}
		}
		return nil
	case ast.KindIndexedAccessType:
		// Get all apparent property names
		// i.e. interface Foo {
		//          foo: string;
		//          bar: string;
		//      }
		//      let x: Foo["/*completion position*/"]
		indexType := grandparent.AsIndexedAccessTypeNode().IndexType
		objectType := grandparent.AsIndexedAccessTypeNode().ObjectType
		if !indexType.Loc.ContainsInclusive(position) {
			return nil
		}
		t := typeChecker.GetTypeFromTypeNode(objectType)
		return &stringLiteralCompletions{
			fromProperties: stringLiteralCompletionsFromProperties(t, typeChecker),
		}
	case ast.KindUnionType:
		result := fromUnionableLiteralType(
			walkUpParentheses(grandparent.Parent),
			parent,
			position,
			typeChecker)
		if result == nil {
			return nil
		}
		alreadyUsedTypes := getAlreadyUsedTypesInStringLiteralUnion(grandparent, parent)
		switch {
		case result.fromProperties != nil:
			result := result.fromProperties
			return &stringLiteralCompletions{
				fromProperties: &completionsFromProperties{
					symbols: core.Filter(
						result.symbols,
						func(s *ast.Symbol) bool { return !slices.Contains(alreadyUsedTypes, s.Name) },
					),
					hasIndexSignature: result.hasIndexSignature,
				},
			}
		case result.fromTypes != nil:
			result := result.fromTypes
			return &stringLiteralCompletions{
				fromTypes: &completionsFromTypes{
					types: core.Filter(result.types, func(t *checker.StringLiteralType) bool {
						return !slices.Contains(alreadyUsedTypes, t.AsLiteralType().Value().(string))
					}),
					isNewIdentifier: false,
				},
			}
		default:
			return nil
		}
	case ast.KindPropertySignature:
		return &stringLiteralCompletions{
			fromTypes: &completionsFromTypes{
				types:           getStringLiteralTypes(getConstraintOfTypeArgumentProperty(grandparent, typeChecker), nil, typeChecker),
				isNewIdentifier: false,
			},
		}
	default:
		return nil
	}
}

func stringLiteralCompletionsForObjectLiteral(
	typeChecker *checker.Checker,
	objectLiteralExpression *ast.ObjectLiteralExpressionNode,
) *completionsFromProperties {
	contextualType := typeChecker.GetContextualType(objectLiteralExpression, checker.ContextFlagsNone)
	if contextualType == nil {
		return nil
	}

	completionsType := typeChecker.GetContextualType(objectLiteralExpression, checker.ContextFlagsIgnoreNodeInferences)
	symbols := getPropertiesForObjectExpression(
		contextualType,
		completionsType,
		objectLiteralExpression,
		typeChecker)

	return &completionsFromProperties{
		symbols:           symbols,
		hasIndexSignature: hasIndexSignature(contextualType, typeChecker),
	}
}

func stringLiteralCompletionsFromProperties(t *checker.Type, typeChecker *checker.Checker) *completionsFromProperties {
	return &completionsFromProperties{
		symbols: core.Filter(typeChecker.GetApparentProperties(t), func(s *ast.Symbol) bool {
			return !(s.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration))
		}),
		hasIndexSignature: hasIndexSignature(t, typeChecker),
	}
}

func (l *LanguageService) getStringLiteralCompletionsFromModuleNames(
	file *ast.SourceFile,
	node *ast.LiteralExpression,
	program *compiler.Program,
	checker *checker.Checker,
) *stringLiteralCompletions {
	nameAndKinds := l.getStringLiteralCompletionsFromModuleNamesWorker(
		file,
		node,
		program,
		checker,
	)
	textStart := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/) + 1
	return &stringLiteralCompletions{
		fromPaths: addReplacementSpans(node.Text(), textStart, nameAndKinds),
	}
}

func addReplacementSpans(text string, textStart int, names []moduleCompletionNameAndKind) []*pathCompletion {
	textRange := getDirectoryFragmentRange(text, textStart)
	return core.Map(names, func(nameAndKind moduleCompletionNameAndKind) *pathCompletion {
		return &pathCompletion{
			name:      nameAndKind.name,
			kind:      moduletToScriptElementKind(nameAndKind.kind),
			extension: nameAndKind.extension,
			textRange: textRange,
		}
	})
}

func moduletToScriptElementKind(kind moduleCompletionKind) lsutil.ScriptElementKind {
	switch kind {
	case moduleCompletionKindDirectory:
		return lsutil.ScriptElementKindDirectory
	case moduleCompletionKindFile:
		return lsutil.ScriptElementKindScriptElement
	case moduleCompletionKindExternalModuleName:
		return lsutil.ScriptElementKindExternalModuleName
	}
	panic(fmt.Sprintf("Unknown moduleCompletionKind: %d", kind))
}

func isAnyDirectorySeparator(r rune) bool {
	return r == '/' || r == '\\'
}

// Replace everything after the last directory separator that appears
func getDirectoryFragmentRange(text string, textStart int) *core.TextRange {
	index := strings.LastIndexFunc(text, isAnyDirectorySeparator)
	var offset int
	if index != -1 {
		offset = index + 1
	}
	length := len(text) - offset
	if length == 0 {
		return nil
	}
	return new(core.NewTextRange(textStart+offset, textStart+offset+length))
}

func (l *LanguageService) getStringLiteralCompletionsFromModuleNamesWorker(
	file *ast.SourceFile,
	node *ast.LiteralExpression,
	program *compiler.Program,
	checker *checker.Checker,
) []moduleCompletionNameAndKind {
	literalValue := tspath.NormalizeSlashes(node.Text())
	var mode core.ResolutionMode
	if ast.IsStringLiteralLike(node) {
		mode = program.GetModeForUsageLocation(file, node)
	}

	scriptPath := file.Path()
	scriptDirectory := scriptPath.GetDirectoryPath()
	options := program.Options()
	extensionOptions := l.getExtensionOptions(options, referenceKindModuleSpecifier, file, mode, checker)

	if isPathRelativeToScript(literalValue) ||
		(options.Paths.Size() == 0 && (tspath.IsRootedDiskPath(literalValue) || tspath.IsUrl(literalValue))) {
		return l.getCompletionEntriesForRelativeModules(
			literalValue,
			string(scriptDirectory),
			program,
			scriptPath,
			extensionOptions,
		)
	} else {
		return l.getCompletionEntriesForNonRelativeModules(
			literalValue,
			string(scriptDirectory),
			mode,
			program,
			checker,
			extensionOptions,
		)
	}
}

// Check all of the declared modules and those in node modules. Possible sources of modules:
//
//	Modules that are found by the type checker
//	Modules found via patterns from "paths" compiler option
//	Modules from node_modules (i.e. those listed in package.json)
//	    This includes all files that are found in node_modules/moduleName/ with acceptable file extensions
func (l *LanguageService) getCompletionEntriesForNonRelativeModules(
	fragment string,
	scriptPath string,
	mode core.ResolutionMode,
	program *compiler.Program,
	typeChecker *checker.Checker,
	extensionOptions *extensionOptions,
) []moduleCompletionNameAndKind {
	compilerOptions := program.Options()
	paths := compilerOptions.Paths

	result := &moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}}
	moduleResolution := compilerOptions.GetModuleResolutionKind()

	if paths != nil && paths.Size() > 0 {
		absolute := compilerOptions.GetPathsBasePath(program.GetCurrentDirectory())
		l.addCompletionEntriesFromPaths(result, program, fragment, absolute, extensionOptions, paths)
	}

	fragmentDirectory := getFragmentDirectory(fragment)
	for _, ambientName := range getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker) {
		result.add(moduleCompletionNameAndKind{
			name: ambientName,
			kind: moduleCompletionKindExternalModuleName,
		})
	}

	l.getCompletionEntriesFromTypings(program, scriptPath, fragmentDirectory, extensionOptions, result)

	if moduleResolutionUsesNodeModules(moduleResolution) {
		// If looking for a global package name, don't just include everything in `node_modules` because that includes dependencies' own dependencies.
		// (But do if we didn't find anything, e.g. 'package.json' missing.)
		foundGlobal := false
		if fragmentDirectory == "" {
			for _, moduleName := range l.enumerateNodeModulesVisibleToScript(scriptPath) {
				moduleResult := moduleCompletionNameAndKind{
					name: moduleName,
					kind: moduleCompletionKindExternalModuleName,
				}
				if _, has := result.names[moduleResult.name]; !has {
					foundGlobal = true
					result.add(moduleResult)
				}
			}
		}
		if !foundGlobal {
			resolvePackageJsonExports := compilerOptions.GetResolvePackageJsonExports()
			resolvePackageJsonImports := compilerOptions.GetResolvePackageJsonImports()
			seenPackageScope := false
			conditions := module.GetConditions(compilerOptions, mode)

			// Returns true if the search should stop.
			exportsOrImportsLookup := func(lookupTable *packagejson.ExportsOrImports, fragment string, baseDirectory string, isExports bool, isImports bool) bool {
				if lookupTable == nil || lookupTable.Type != packagejson.JSONValueTypeObject {
					return lookupTable != nil && lookupTable.Type != packagejson.JSONValueTypeNotPresent
				}
				keys := lookupTable.AsObject().Keys()
				l.addCompletionEntriesFromPathsOrExportsOrImports(
					result,
					program,
					isExports,
					isImports,
					fragment,
					baseDirectory,
					extensionOptions,
					keys,
					func(key string) []string {
						keyValue, ok := lookupTable.AsObject().Get(key)
						if !ok {
							return nil
						}
						pattern := getPatternFromFirstMatchingCondition(&keyValue, conditions)
						if pattern == "" {
							return nil
						}
						if strings.HasSuffix(key, "/") && strings.HasSuffix(pattern, "/") {
							return []string{pattern + "*"}
						}
						return []string{pattern}
					},
					module.ComparePatternKeys,
				)
				return true
			}

			importsLookup := func(directory string) {
				if resolvePackageJsonImports && !seenPackageScope {
					packageFile := tspath.CombinePaths(directory, "package.json")
					packageJsonInfo := program.GetPackageJsonInfo(packageFile)
					if packageJsonInfo != nil && packageJsonInfo.Exists() {
						seenPackageScope = true
						exportsOrImportsLookup(&packageJsonInfo.Contents.Imports, fragment, directory, false /*isExports*/, true /*isImports*/)
					}
				}
			}

			ancestorLookup := func(ancestor string) (any, bool) {
				nodeModules := tspath.CombinePaths(ancestor, "node_modules")
				if l.host.DirectoryExists(nodeModules) {
					l.getCompletionEntriesForDirectoryFragment(
						fragment,
						nodeModules,
						extensionOptions,
						program,
						false, /* moduleSpecifierIsRelative */
						"",
						result,
					)
				}
				importsLookup(ancestor)
				return nil, false
			}

			if fragmentDirectory != "" && resolvePackageJsonExports {
				nodeModulesDirectoryOrImportsLookup := ancestorLookup
				ancestorLookup = func(ancestor string) (any, bool) {
					components := tspath.GetPathComponents(fragment, "")
					components = components[1:] // shift off empty root
					if len(components) == 0 {
						nodeModulesDirectoryOrImportsLookup(ancestor)
						return nil, false
					}
					packagePath := components[0]
					components = components[1:]
					if strings.HasPrefix(packagePath, "@") {
						if len(components) == 0 {
							nodeModulesDirectoryOrImportsLookup(ancestor)
							return nil, false
						}
						subName := components[0]
						components = components[1:]
						packagePath = tspath.CombinePaths(packagePath, subName)
					}
					if resolvePackageJsonImports && strings.HasPrefix(packagePath, "#") {
						importsLookup(ancestor)
						return nil, false
					}
					packageDirectory := tspath.CombinePaths(ancestor, "node_modules", packagePath)
					packageFile := tspath.CombinePaths(packageDirectory, "package.json")
					packageJsonInfo := program.GetPackageJsonInfo(packageFile)
					if packageJsonInfo != nil && packageJsonInfo.Exists() {
						fragmentSubpath := strings.Join(components, "/")
						if len(components) > 0 && tspath.HasTrailingDirectorySeparator(fragment) {
							fragmentSubpath += "/"
						}
						if exportsOrImportsLookup(
							&packageJsonInfo.Contents.Exports,
							fragmentSubpath,
							packageDirectory,
							true,  /*isExports*/
							false, /*isImports*/
						) {
							return nil, false
						}
					}
					nodeModulesDirectoryOrImportsLookup(ancestor)
					return nil, false
				}
			}

			globalCacheLocation := program.GetGlobalTypingsCacheLocation()
			tspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, ancestorLookup)
		}
	}

	return slices.Collect(maps.Values(result.names))
}

func getFragmentDirectory(fragment string) string {
	if !containsSlash(fragment) {
		return ""
	}
	if tspath.HasTrailingDirectorySeparator(fragment) {
		return fragment
	}
	return tspath.GetDirectoryPath(fragment)
}

func getPatternFromFirstMatchingCondition(target *packagejson.ExportsOrImports, conditions []string) string {
	if target.Type == packagejson.JSONValueTypeString {
		return target.AsString()
	}
	if target.Type == packagejson.JSONValueTypeObject {
		obj := target.AsObject()
		for condition := range obj.Keys() {
			if condition == "default" || slices.Contains(conditions, condition) ||
				(slices.Contains(conditions, "types") && module.IsApplicableVersionedTypesKey(condition)) {
				pattern, ok := obj.Get(condition)
				if ok {
					return getPatternFromFirstMatchingCondition(&pattern, conditions)
				}
			}
		}
	}
	return ""
}

func getAmbientModuleCompletions(fragment string, fragmentDirectory string, typeChecker *checker.Checker) []string {
	ambientModules := typeChecker.GetAmbientModules()
	var nonRelativeModuleNames []string
	for _, sym := range ambientModules {
		moduleName := stringutil.StripQuotes(sym.Name)
		if strings.HasPrefix(moduleName, fragment) && !strings.Contains(moduleName, "*") {
			nonRelativeModuleNames = append(nonRelativeModuleNames, moduleName)
		}
	}

	if fragmentDirectory != "" {
		moduleNameWithSeparator := tspath.EnsureTrailingDirectorySeparator(fragmentDirectory)
		for i, moduleName := range nonRelativeModuleNames {
			nonRelativeModuleNames[i] = strings.TrimPrefix(moduleName, moduleNameWithSeparator)
		}
	}
	return nonRelativeModuleNames
}

func (l *LanguageService) getCompletionEntriesFromTypings(
	program *compiler.Program,
	scriptPath string,
	fragmentDirectory string,
	extensionOptions *extensionOptions,
	result *moduleCompletionNameAndKindSet,
) {
	options := program.Options()
	seen := make(map[string]bool)

	typeRoots, _ := options.GetEffectiveTypeRoots(program.GetCurrentDirectory())

	for _, root := range typeRoots {
		l.getCompletionEntriesFromTypingsDirectories(root, options, fragmentDirectory, extensionOptions, program, seen, result)
	}

	globalCacheLocation := program.GetGlobalTypingsCacheLocation()
	tspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, func(directory string) (any, bool) {
		typesDir := tspath.CombinePaths(directory, "node_modules/@types")
		l.getCompletionEntriesFromTypingsDirectories(typesDir, options, fragmentDirectory, extensionOptions, program, seen, result)
		return nil, false
	})
}

func (l *LanguageService) getCompletionEntriesFromTypingsDirectories(
	directory string,
	options *core.CompilerOptions,
	fragmentDirectory string,
	extensionOptions *extensionOptions,
	program *compiler.Program,
	seen map[string]bool,
	result *moduleCompletionNameAndKindSet,
) {
	if !l.host.DirectoryExists(directory) {
		return
	}

	for _, typeDirectoryName := range l.GetDirectories(directory) {
		packageName := module.UnmangleScopedPackageName(typeDirectoryName)
		if len(options.Types) > 0 && !slices.Contains(options.Types, packageName) {
			continue
		}

		if fragmentDirectory == "" {
			if !seen[packageName] {
				result.add(moduleCompletionNameAndKind{
					name: packageName,
					kind: moduleCompletionKindExternalModuleName,
				})
				seen[packageName] = true
			}
		} else {
			baseDirectory := tspath.CombinePaths(directory, typeDirectoryName)
			remainingFragment := tryRemoveDirectoryPrefix(fragmentDirectory, packageName, program.UseCaseSensitiveFileNames())
			if remainingFragment != nil {
				l.getCompletionEntriesForDirectoryFragment(
					*remainingFragment,
					baseDirectory,
					extensionOptions,
					program,
					false,
					"",
					result,
				)
			}
		}
	}
}

func tryRemoveDirectoryPrefix(path string, prefix string, useCaseSensitiveFileNames bool) *string {
	canonicalPath := tspath.GetCanonicalFileName(path, useCaseSensitiveFileNames)
	canonicalPrefix := tspath.GetCanonicalFileName(prefix, useCaseSensitiveFileNames)
	if strings.HasPrefix(canonicalPath, canonicalPrefix) {
		withoutPrefix := path[len(prefix):]
		if strings.HasPrefix(withoutPrefix, "/") || strings.HasPrefix(withoutPrefix, "\\") {
			withoutPrefix = withoutPrefix[1:]
		}
		return &withoutPrefix
	}
	return nil
}

func (l *LanguageService) enumerateNodeModulesVisibleToScript(scriptPath string) []string {
	var result []string
	globalCacheLocation := l.program.GetGlobalTypingsCacheLocation()

	tspath.ForEachAncestorDirectoryStoppingAtGlobalCache(globalCacheLocation, scriptPath, func(directory string) (any, bool) {
		packageJsonPath := tspath.CombinePaths(directory, "package.json")
		packageJsonInfo := l.program.GetPackageJsonInfo(packageJsonPath)
		if packageJsonInfo != nil && packageJsonInfo.Exists() && packageJsonInfo.Contents != nil {
			packageJsonInfo.Contents.RangeDependencies(func(name, version, dependencyField string) bool {
				if !strings.HasPrefix(name, "@types/") {
					result = append(result, name)
				}
				return true
			})
		}
		return nil, false
	})

	return result
}

func (l *LanguageService) getExtensionOptions(
	options *core.CompilerOptions,
	referenceKind referenceKind,
	file *ast.SourceFile,
	mode core.ResolutionMode,
	checker *checker.Checker,
) *extensionOptions {
	extensionsToSearch := getSupportedExtensionsForModuleResolution(options, checker)

	return &extensionOptions{
		extensionsToSearch:  extensionsToSearch,
		referenceKind:       referenceKind,
		importingSourceFile: file,
		endingPreference:    l.UserPreferences().ImportModuleSpecifierEnding,
		resolutionMode:      mode,
	}
}

func getSupportedExtensionsForModuleResolution(options *core.CompilerOptions, checker *checker.Checker) []string {
	/** file extensions from ambient modules declarations e.g. *.css */
	var extensions []string
	if checker != nil {
		ambientModules := checker.GetAmbientModules()
		for _, module := range ambientModules {
			name := stringutil.StripQuotes(module.Name)
			if !strings.HasPrefix(name, "*.") || strings.Contains(name, "/") {
				continue
			}
			extensions = append(extensions, name[1:])
		}
	}
	supportedExtensions := tsoptions.GetSupportedExtensions(options, nil /*extraFileExtensions*/)
	for _, ext := range supportedExtensions {
		extensions = append(extensions, ext...)
	}
	moduleResolution := options.GetModuleResolutionKind()
	if moduleResolutionUsesNodeModules(moduleResolution) {
		return core.Flatten(tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(options, [][]string{extensions}))
	}
	return extensions
}

func moduleResolutionUsesNodeModules(moduleResolution core.ModuleResolutionKind) bool {
	return moduleResolution >= core.ModuleResolutionKindNode16 && moduleResolution <= core.ModuleResolutionKindNodeNext ||
		moduleResolution == core.ModuleResolutionKindBundler
}

// Returns true if the path is explicitly relative (i.e. relative to . or ..)
func isPathRelativeToScript(path string) bool {
	return strings.HasPrefix(path, "./") || strings.HasPrefix(path, "../")
}

func (l *LanguageService) getCompletionEntriesForRelativeModules(
	literalValue string,
	scriptDirectory string,
	program *compiler.Program,
	scriptPath tspath.Path,
	extensionOptions *extensionOptions,
) []moduleCompletionNameAndKind {
	options := program.Options()
	if len(options.RootDirs) > 0 {
		return l.getCompletionEntriesForDirectoryFragmentWithRootDirs(
			options.RootDirs,
			literalValue,
			scriptDirectory,
			program,
			string(scriptPath),
			extensionOptions,
		)
	} else {
		result := l.getCompletionEntriesForDirectoryFragment(
			literalValue,
			scriptDirectory,
			extensionOptions,
			program,
			true, /*moduleSpecifierIsRelative*/
			string(scriptPath),
			&moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}},
		)
		return slices.Collect(maps.Values(result.names))
	}
}

func (l *LanguageService) getCompletionEntriesForDirectoryFragmentWithRootDirs(
	rootDirs []string,
	fragment string,
	scriptDirectory string,
	program *compiler.Program,
	exclude string,
	extensionOptions *extensionOptions,
) []moduleCompletionNameAndKind {
	options := program.Options()
	var basePath string
	if options.Project != "" {
		basePath = options.Project
	} else {
		basePath = program.GetCurrentDirectory()
	}
	ignoreCase := !program.UseCaseSensitiveFileNames()
	baseDirectories := getBaseDirectoriesFromRootDirs(rootDirs, basePath, scriptDirectory, ignoreCase)

	var allCompletions []moduleCompletionNameAndKind
	for _, baseDirectory := range baseDirectories {
		result := l.getCompletionEntriesForDirectoryFragment(
			fragment,
			baseDirectory,
			extensionOptions,
			program,
			true, /*moduleSpecifierIsRelative*/
			exclude,
			&moduleCompletionNameAndKindSet{names: map[string]moduleCompletionNameAndKind{}},
		)
		for _, entry := range result.names {
			allCompletions = append(allCompletions, entry)
		}
	}

	// Deduplicate based on name, kind, and extension
	return deduplicateModuleCompletions(allCompletions)
}

// getBaseDirectoriesFromRootDirs takes a script path and returns paths for all potential folders
// that could be merged with its containing folder via the "rootDirs" compiler option.
func getBaseDirectoriesFromRootDirs(rootDirs []string, basePath string, scriptDirectory string, ignoreCase bool) []string {
	// Make all paths absolute/normalized if they are not already
	normalizedRootDirs := make([]string, len(rootDirs))
	for i, rootDirectory := range rootDirs {
		var normalizedPath string
		if tspath.IsRootedDiskPath(rootDirectory) {
			normalizedPath = rootDirectory
		} else {
			normalizedPath = tspath.CombinePaths(basePath, rootDirectory)
		}
		normalizedRootDirs[i] = tspath.EnsureTrailingDirectorySeparator(tspath.NormalizePath(normalizedPath))
	}

	// Determine the path to the directory containing the script relative to the root directory it is contained within
	var relativeDirectory string
	comparePathsOptions := tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: !ignoreCase,
		CurrentDirectory:          basePath,
	}
	for _, rootDirectory := range normalizedRootDirs {
		if tspath.ContainsPath(rootDirectory, scriptDirectory, comparePathsOptions) {
			if len(rootDirectory) > len(scriptDirectory) {
				relativeDirectory = ""
			} else {
				relativeDirectory = scriptDirectory[len(rootDirectory):]
			}
			break
		}
	}

	// Now find a path for each potential directory that is to be merged with the one containing the script
	var directories []string
	for _, rootDirectory := range normalizedRootDirs {
		directories = append(directories, tspath.RemoveTrailingDirectorySeparator(tspath.CombinePaths(rootDirectory, relativeDirectory)))
	}
	directories = append(directories, tspath.RemoveTrailingDirectorySeparator(scriptDirectory))

	return deduplicateStrings(directories)
}

func deduplicateStrings(slice []string) []string {
	if len(slice) <= 1 {
		return slice
	}
	seen := make(map[string]bool)
	var result []string
	for _, s := range slice {
		if !seen[s] {
			seen[s] = true
			result = append(result, s)
		}
	}
	return result
}

func deduplicateModuleCompletions(completions []moduleCompletionNameAndKind) []moduleCompletionNameAndKind {
	if len(completions) <= 1 {
		return completions
	}
	type key struct {
		name      string
		kind      moduleCompletionKind
		extension string
	}
	seen := make(map[key]bool)
	var result []moduleCompletionNameAndKind
	for _, c := range completions {
		k := key{name: c.name, kind: c.kind, extension: c.extension}
		if !seen[k] {
			seen[k] = true
			result = append(result, c)
		}
	}
	return result
}

type moduleCompletionKind int

const (
	moduleCompletionKindDirectory moduleCompletionKind = iota
	moduleCompletionKindFile
	moduleCompletionKindExternalModuleName
)

type moduleCompletionNameAndKind struct {
	name      string
	kind      moduleCompletionKind
	extension string
}

type moduleCompletionNameAndKindSet struct {
	names map[string]moduleCompletionNameAndKind
}

func (s *moduleCompletionNameAndKindSet) add(entry moduleCompletionNameAndKind) {
	existing, ok := s.names[entry.name]
	if !ok || existing.kind < entry.kind {
		s.names[entry.name] = entry
	}
}

type extensionOptions struct {
	extensionsToSearch  []string
	referenceKind       referenceKind
	importingSourceFile *ast.SourceFile
	endingPreference    modulespecifiers.ImportModuleSpecifierEndingPreference
	resolutionMode      core.ResolutionMode
}

type referenceKind int

const (
	referenceKindFileName referenceKind = iota
	referenceKindModuleSpecifier
)

// Given a path ending at a directory, gets the completions for the path.
func (l *LanguageService) getCompletionEntriesForDirectoryFragment(
	fragment string,
	scriptDirectory string,
	extensionOptions *extensionOptions,
	program *compiler.Program,
	moduleSpecifierIsRelative bool,
	exclude string,
	result *moduleCompletionNameAndKindSet,
) *moduleCompletionNameAndKindSet {
	fragment = tspath.NormalizeSlashes(fragment)

	// Remove the basename from the path.
	// We don't use the basename to filter completions: the client is responsible for that filtering.
	if !tspath.HasTrailingDirectorySeparator(fragment) {
		fragment = tspath.GetDirectoryPath(fragment)
	}

	if fragment == "" {
		fragment = "."
	}

	fragment = tspath.EnsureTrailingDirectorySeparator(fragment)

	baseDirectory := tspath.ResolvePath(scriptDirectory, fragment)
	if !moduleSpecifierIsRelative {
		// Check for a version redirect.
		packageJsonDirectory := program.GetNearestAncestorDirectoryWithPackageJson(baseDirectory)
		if packageJsonDirectory != "" {
			packageJsonPath := tspath.CombinePaths(packageJsonDirectory, "package.json")
			packageJsonInfo := program.GetPackageJsonInfo(packageJsonPath)
			if packageJsonInfo != nil && packageJsonInfo.Contents != nil &&
				packageJsonInfo.Contents.TypesVersions.Type == packagejson.JSONValueTypeObject {
				versionPaths := packageJsonInfo.Contents.GetVersionPaths(nil)
				paths := versionPaths.GetPaths()
				if paths.Size() > 0 {
					pathInPackage := baseDirectory[len(tspath.EnsureTrailingDirectorySeparator(packageJsonDirectory)):]
					if l.addCompletionEntriesFromPaths(result, program, pathInPackage, packageJsonDirectory, extensionOptions, paths) {
						// One of the `versionPaths` was matched, which will block relative resolution
						// to files and folders from here.
						// All reachable paths given the pattern match are already added.
						return result
					}
				}
			}
		}
	}

	if !l.host.DirectoryExists(baseDirectory) {
		return result
	}

	// Enumerate all available files.
	files := l.ReadDirectory(
		baseDirectory,
		extensionOptions.extensionsToSearch,
		[]string{"./*"}, /*include*/
	)

	for _, filePath := range files {
		if tspath.ComparePaths(exclude, filePath, tspath.ComparePathsOptions{
			UseCaseSensitiveFileNames: program.UseCaseSensitiveFileNames(),
			CurrentDirectory:          program.GetCurrentDirectory(),
		}) == 0 {
			continue // Avoid self-imports
		}

		name, extension := getFilenameWithExtensionOption(
			tspath.GetBaseFileName(filePath),
			program,
			extensionOptions,
			false, /*isExportsOrImportsWildcard*/
		)
		result.add(
			moduleCompletionNameAndKind{
				name:      name,
				kind:      moduleCompletionKindFile,
				extension: extension,
			},
		)
	}

	// Get folder completion as well.
	directories := l.GetDirectories(baseDirectory)

	for _, directory := range directories {
		directoryName := tspath.GetBaseFileName(directory)
		if directoryName != "@types" {
			result.add(
				moduleCompletionNameAndKind{
					name: directoryName,
					kind: moduleCompletionKindDirectory,
				},
			)
		}
	}

	return result
}

// Returns true if `fragment` was a match for any `paths`
// (which should indicate whether any other path completions should be offered).
func (l *LanguageService) addCompletionEntriesFromPaths(
	result *moduleCompletionNameAndKindSet,
	program *compiler.Program,
	fragment string,
	baseDirectory string,
	extensionOptions *extensionOptions,
	paths *collections.OrderedMap[string, []string],
) bool {
	getPatternsForKeys := func(key string) []string {
		return paths.GetOrZero(key)
	}
	comparePaths := func(a, b string) stringutil.Comparison {
		patternA := core.TryParsePattern(a)
		patternB := core.TryParsePattern(b)
		lengthA := len(a)
		if patternA.StarIndex != -1 {
			lengthA = patternA.StarIndex
		}
		lengthB := len(b)
		if patternB.StarIndex != -1 {
			lengthB = patternB.StarIndex
		}
		return cmp.Compare(lengthB, lengthA)
	}
	return l.addCompletionEntriesFromPathsOrExportsOrImports(
		result,
		program,
		false, /*isExports*/
		false, /*isImports*/
		fragment,
		baseDirectory,
		extensionOptions,
		paths.Keys(),
		getPatternsForKeys,
		comparePaths,
	)
}

// Returns true if `fragment` was a match for any `paths`
// (which should indicate whether any other path completions should be offered).
func (l *LanguageService) addCompletionEntriesFromPathsOrExportsOrImports(
	result *moduleCompletionNameAndKindSet,
	program *compiler.Program,
	isExports bool,
	isImports bool,
	fragment string,
	baseDirectory string,
	extensionOptions *extensionOptions,
	keys iter.Seq[string],
	getPatternsForKey func(key string) []string,
	comparePaths func(a, b string) stringutil.Comparison,
) bool {
	type pathResult struct {
		results []moduleCompletionNameAndKind
		matched bool
	}
	var pathResults []pathResult
	var matchedPath *string
	for key := range keys {
		if key == "." {
			continue
		}
		normalizedKey := strings.TrimPrefix(key, "./")               // Remove leading "./"
		if (isExports || isImports) && strings.HasSuffix(key, "/") { // Normalize trailing "/" to "/*"
			normalizedKey = normalizedKey + "*"
		}
		patterns := getPatternsForKey(key)
		if len(patterns) > 0 {
			pathPattern := core.TryParsePattern(normalizedKey)
			if !pathPattern.IsValid() {
				continue
			}
			isMatch := pathPattern.Matches(fragment)
			var isLongestMatch bool
			if isMatch {
				if matchedPath == nil {
					isLongestMatch = true
				} else {
					isLongestMatch = comparePaths(normalizedKey, *matchedPath) == stringutil.ComparisonLessThan
				}
			}
			if isLongestMatch {
				// If this is a higher priority match than anything we've seen so far, previous results from matches are invalid, e.g.
				// for `import {} from "some-package/|"` with a typesVersions:
				// {
				//   "bar/*": ["bar/*"], // <-- 1. We add 'bar', but 'bar/*' doesn't match yet.
				//   "*": ["dist/*"],    // <-- 2. We match here and add files from dist. 'bar' is still ok because it didn't come from a match.
				//   "foo/*": ["foo/*"]  // <-- 3. We matched '*' earlier and added results from dist, but if 'foo/*' also matched,
				// }                               results in dist would not be visible. 'bar' still stands because it didn't come from a match.
				//                                 This is especially important if `dist/foo` is a folder, because if we fail to clear results
				//                                 added by the '*' match, after typing `"some-package/foo/|"` we would get file results from both
				//                                 ./dist/foo and ./foo, when only the latter will actually be resolvable.
				//                                 See pathCompletionsTypesVersionsWildcard6.ts.
				matchedPath = &normalizedKey
				pathResults = core.Filter(pathResults, func(pr pathResult) bool {
					return !pr.matched
				})
			}
			if pathPattern.StarIndex == -1 ||
				matchedPath == nil ||
				comparePaths(normalizedKey, *matchedPath) != stringutil.ComparisonGreaterThan {
				pathResults = append(pathResults, pathResult{
					matched: isMatch,
					results: l.getCompletionsForPathMapping(
						normalizedKey,
						patterns,
						fragment,
						baseDirectory,
						isExports,
						isImports,
						extensionOptions,
						program,
					),
				})
			}
		}
	}

	for _, pr := range pathResults {
		for _, res := range pr.results {
			result.add(res)
		}
	}

	return matchedPath != nil
}

func (l *LanguageService) getCompletionsForPathMapping(
	path string,
	patterns []string,
	fragment string,
	packageDirectory string,
	isExports bool,
	isImports bool,
	extensionOptions *extensionOptions,
	program *compiler.Program,
) []moduleCompletionNameAndKind {
	justPathMappingName := func(name string, kind moduleCompletionKind, extension string) []moduleCompletionNameAndKind {
		if strings.HasPrefix(name, fragment) {
			return []moduleCompletionNameAndKind{{
				name:      tspath.RemoveTrailingDirectorySeparator(name),
				kind:      kind,
				extension: extension,
			}}
		}
		return nil
	}

	parsedPath := core.TryParsePattern(path)
	if !parsedPath.IsValid() {
		return nil
	}
	// No stars in the pattern.
	if parsedPath.StarIndex == -1 {
		// For a path mapping "foo": ["/x/y/z.ts"], add "foo" itself as a completion.
		pattern := core.FirstOrNil(patterns)
		extension := getFileExtension(pattern)
		return justPathMappingName(path, moduleCompletionKindFile, extension)
	}

	pathPrefix := parsedPath.Text[:parsedPath.StarIndex]
	pathSuffix := parsedPath.Text[parsedPath.StarIndex+1:]
	fragmentDirectory := getFragmentDirectory(fragment)
	if fragmentDirectory != "" {
		fragmentDirectory = tspath.EnsureTrailingDirectorySeparator(fragmentDirectory)
	}
	if !strings.HasPrefix(fragment, pathPrefix) {
		// Fragment doesn't match the path mapping prefix at all:
		// we cannot extend it via this path.
		if !strings.HasPrefix(pathPrefix, fragment) {
			return nil
		}
		starIsFullPathComponent := strings.HasSuffix(path, "/*")
		if starIsFullPathComponent {
			return justPathMappingName(pathPrefix, moduleCompletionKindDirectory, "" /*extension*/)
		}
		// If path is e.g. `foo/bar/*`, and fragment is `foo/b`, then remaining directory prefix is `bar/`,
		remainingDirectoryPrefix := pathPrefix[len(fragmentDirectory):]
		var completions []moduleCompletionNameAndKind
		for _, pattern := range patterns {
			modules := l.getModulesForPathsPattern(
				"", /*fragment*/
				packageDirectory,
				pattern,
				isExports,
				isImports,
				extensionOptions,
				program,
			)
			for i := range modules {
				modules[i].name = remainingDirectoryPrefix + modules[i].name + core.IfElse(modules[i].kind == moduleCompletionKindFile, pathSuffix, "")
			}
			completions = append(completions, modules...)
		}
		return completions
	}
	remainingFragment := fragment[len(pathPrefix):]
	var remainingDirectoryFragment string
	if !strings.HasPrefix(fragmentDirectory, pathPrefix) {
		remainingDirectoryFragment = pathPrefix[len(fragmentDirectory):]
	}
	return core.FlatMap(
		patterns,
		func(pattern string) []moduleCompletionNameAndKind {
			modules := l.getModulesForPathsPattern(
				remainingFragment,
				packageDirectory,
				pattern,
				isExports,
				isImports,
				extensionOptions,
				program,
			)
			for i := range modules {
				modules[i].name = remainingDirectoryFragment + modules[i].name + core.IfElse(modules[i].kind == moduleCompletionKindFile, pathSuffix, "")
			}
			return modules
		},
	)
}

func getFileExtension(fileName string) string {
	extension := tspath.TryGetExtensionFromPath(fileName)
	if extension == "" {
		extension = tspath.GetAnyExtensionFromPath(fileName, nil /*extensions*/, false /*ignoreCase*/)
	}
	return extension
}

// The input fragment is relative to the path pattern's prefix:
// e.g. if path = "bar/_*/baz", and fragment = "bar/_dir", then fragment is "dir".
// The names are relative to the path pattern's prefix and fragment directory :
// e.g. if path = "bar/_*/baz", and fragment = "bar/_dir/a", and we find result "abd",
// the result should be interpreted as "bar/_dir/abd".
func (l *LanguageService) getModulesForPathsPattern(
	fragment string,
	packageDirectory string,
	pattern string,
	isExports bool,
	isImports bool,
	extensionOptions *extensionOptions,
	program *compiler.Program,
) []moduleCompletionNameAndKind {
	parsed := core.TryParsePattern(pattern)
	if !parsed.IsValid() || parsed.StarIndex == -1 {
		return nil
	}

	prefix := parsed.Text[:parsed.StarIndex]
	suffix := parsed.Text[parsed.StarIndex+1:]

	// The prefix has two effective parts: the directory path and the base component after the filepath that is not a
	// full directory component. For example: directory/path/of/prefix/base*
	normalizedPrefix := tspath.ResolvePath(prefix)
	var normalizedPrefixDirectory string
	var normalizedPrefixBase string
	if tspath.HasTrailingDirectorySeparator(prefix) {
		normalizedPrefixDirectory = normalizedPrefix
		normalizedPrefixBase = ""
	} else {
		normalizedPrefixDirectory = tspath.GetDirectoryPath(normalizedPrefix)
		normalizedPrefixBase = tspath.GetBaseFileName(normalizedPrefix)
	}

	fragmentHasPath := containsSlash(fragment)
	var fragmentDirectory string
	if fragmentHasPath {
		if tspath.HasTrailingDirectorySeparator(fragment) {
			fragmentDirectory = fragment
		} else {
			fragmentDirectory = tspath.GetDirectoryPath(fragment)
		}
	}

	options := program.Options()
	ignoreCase := !program.UseCaseSensitiveFileNames()
	outDir := options.OutDir
	declarationDir := options.DeclarationDir

	// Try and expand the prefix to include any path from the fragment so that we can limit the readDirectory call
	var expandedPrefixDirectory string
	if fragmentHasPath {
		expandedPrefixDirectory = tspath.CombinePaths(normalizedPrefixDirectory, normalizedPrefixBase+fragmentDirectory)
	} else {
		expandedPrefixDirectory = normalizedPrefixDirectory
	}
	// Need to normalize after combining: If we combinePaths("a", "../b"), we want "b" and not "a/../b".
	baseDirectory := tspath.NormalizePath(tspath.CombinePaths(packageDirectory, expandedPrefixDirectory))

	var possibleInputBaseDirectoryForOutDir string
	var possibleInputBaseDirectoryForDeclarationDir string
	if isImports {
		if outDir != "" {
			possibleInputBaseDirectoryForOutDir = getPossibleOriginalInputPathWithoutChangingExt(
				baseDirectory,
				ignoreCase,
				outDir,
				program.CommonSourceDirectory,
			)
		}
		if declarationDir != "" {
			possibleInputBaseDirectoryForDeclarationDir = getPossibleOriginalInputPathWithoutChangingExt(
				baseDirectory,
				ignoreCase,
				declarationDir,
				program.CommonSourceDirectory,
			)
		}
	}

	normalizedSuffix := tspath.NormalizePath(suffix)

	var declarationExtension string
	var inputExtensions []string
	if normalizedSuffix != "" {
		declarationExtension = tspath.GetDeclarationEmitExtensionForPath("_" + normalizedSuffix)
		inputExtensions = tspath.GetPossibleOriginalInputExtensionForExtension("_" + normalizedSuffix)
	}

	var matchingSuffixes []string
	if declarationExtension != "" {
		matchingSuffixes = append(matchingSuffixes, tspath.ChangeExtension(normalizedSuffix, declarationExtension))
	}
	for _, ext := range inputExtensions {
		matchingSuffixes = append(matchingSuffixes, tspath.ChangeExtension(normalizedSuffix, ext))
	}
	matchingSuffixes = append(matchingSuffixes, normalizedSuffix)

	// If we have a suffix, then we read the directory all the way down to avoid returning completions for
	// directories that don't contain files that would match the suffix. A previous comment here was concerned
	// about the case where `normalizedSuffix` includes a `?` character, which should be interpreted literally,
	// but will match any single character as part of the `include` pattern in `tryReadDirectory`. This is not
	// a problem, because (in the extremely unusual circumstance where the suffix has a `?` in it) a `?`
	// interpreted as "any character" can only return *too many* results as compared to the literal
	// interpretation, so we can filter those superfluous results out via `trimPrefixAndSuffix` as we've always
	// done.
	var includeGlobs []string
	if normalizedSuffix != "" {
		for _, suffix := range matchingSuffixes {
			includeGlobs = append(includeGlobs, "**/*"+suffix)
		}
	} else {
		includeGlobs = []string{"./*"}
	}

	isExportsOrImportsWildcard := (isExports || isImports) && strings.HasSuffix(pattern, "/*")

	trimPrefixAndSuffix := func(path string, prefixStr string) string {
		for _, suffix := range matchingSuffixes {
			inner := withoutStartAndEnd(tspath.NormalizePath(path), prefixStr, suffix)
			if inner == nil {
				continue
			}
			return removeLeadingDirectorySeparator(*inner)
		}
		return ""
	}

	getMatchesWithPrefix := func(directory string) []moduleCompletionNameAndKind {
		var completePrefix string
		if fragmentHasPath {
			completePrefix = directory
		} else {
			completePrefix = tspath.EnsureTrailingDirectorySeparator(directory) + normalizedPrefixBase
		}

		matches := l.ReadDirectory(
			directory,
			extensionOptions.extensionsToSearch,
			includeGlobs,
		)

		var result []moduleCompletionNameAndKind
		for _, match := range matches {
			trimmedWithPattern := trimPrefixAndSuffix(match, completePrefix)
			if trimmedWithPattern != "" {
				if containsSlash(trimmedWithPattern) {
					pathComponents := tspath.GetPathComponents(removeLeadingDirectorySeparator(trimmedWithPattern), "")
					if len(pathComponents) > 1 {
						result = append(result, moduleCompletionNameAndKind{
							name: pathComponents[1],
							kind: moduleCompletionKindDirectory,
						})
					}
				} else {
					name, extension := getFilenameWithExtensionOption(
						trimmedWithPattern,
						program,
						extensionOptions,
						isExportsOrImportsWildcard,
					)
					if extension == "" {
						extension = getFileExtension(match)
					}
					result = append(result, moduleCompletionNameAndKind{
						name:      name,
						kind:      moduleCompletionKindFile,
						extension: extension,
					})
				}
			}
		}
		return result
	}

	getDirectoryMatches := func(directoryName string) []moduleCompletionNameAndKind {
		directories := l.GetDirectories(directoryName)
		var result []moduleCompletionNameAndKind
		for _, dir := range directories {
			if dir != "node_modules" {
				result = append(result, moduleCompletionNameAndKind{
					name: dir,
					kind: moduleCompletionKindDirectory,
				})
			}
		}
		return result
	}

	var matches []moduleCompletionNameAndKind
	matches = append(matches, getMatchesWithPrefix(baseDirectory)...)

	if possibleInputBaseDirectoryForOutDir != "" {
		matches = append(matches, getMatchesWithPrefix(possibleInputBaseDirectoryForOutDir)...)
	}
	if possibleInputBaseDirectoryForDeclarationDir != "" {
		matches = append(matches, getMatchesWithPrefix(possibleInputBaseDirectoryForDeclarationDir)...)
	}

	// If we had a suffix, we already recursively searched for all possible files that could match
	// it and returned the directories leading to those files. Otherwise, assume any directory could
	// have something valid to import.
	if normalizedSuffix == "" {
		matches = append(matches, getDirectoryMatches(baseDirectory)...)
		if possibleInputBaseDirectoryForOutDir != "" {
			matches = append(matches, getDirectoryMatches(possibleInputBaseDirectoryForOutDir)...)
		}
		if possibleInputBaseDirectoryForDeclarationDir != "" {
			matches = append(matches, getDirectoryMatches(possibleInputBaseDirectoryForDeclarationDir)...)
		}
	}

	return matches
}

func containsSlash(fragment string) bool {
	return strings.Contains(fragment, string(tspath.DirectorySeparator))
}

func withoutStartAndEnd(s string, start string, end string) *string {
	if strings.HasPrefix(s, start) && strings.HasSuffix(s, end) && len(s) >= len(start)+len(end) {
		s = s[len(start) : len(s)-len(end)]
		return &s
	}
	return nil
}

func removeLeadingDirectorySeparator(path string) string {
	return strings.TrimPrefix(path, string(tspath.DirectorySeparator))
}

func getPossibleOriginalInputPathWithoutChangingExt(
	filePath string,
	ignoreCase bool,
	outputDir string,
	getCommonSourceDirectory func() string,
) string {
	if outputDir != "" {
		return tspath.ResolvePath(
			getCommonSourceDirectory(),
			tspath.GetRelativePathFromDirectory(outputDir, filePath, tspath.ComparePathsOptions{
				UseCaseSensitiveFileNames: !ignoreCase,
			}),
		)
	}
	return filePath
}

func getFilenameWithExtensionOption(
	name string,
	program *compiler.Program,
	extensionOptions *extensionOptions,
	isExportsOrImportsWildcard bool,
) (string, string) {
	nonJSResult := tryGetRealFileNameForNonJSDeclarationFileName(name)
	if nonJSResult != "" {
		return nonJSResult, tspath.TryGetExtensionFromPath(nonJSResult)
	}
	if extensionOptions.referenceKind == referenceKindFileName {
		return name, tspath.TryGetExtensionFromPath(name)
	}

	allowedEndings := modulespecifiers.GetAllowedEndingsInPreferredOrder(
		modulespecifiers.UserPreferences{ImportModuleSpecifierEnding: extensionOptions.endingPreference},
		program,
		program.Options(),
		extensionOptions.importingSourceFile,
		"", /*oldImportSpecifier*/
		extensionOptions.resolutionMode,
	)

	if isExportsOrImportsWildcard {
		// If we're completing `import {} from "foo/|"` and subpaths are available via `"exports": { "./*": "./src/*" }`,
		// the completion must be a (potentially extension-swapped) file name. Dropping extensions and index files is not allowed.
		allowedEndings = core.Filter(allowedEndings, func(e modulespecifiers.ModuleSpecifierEnding) bool {
			return e != modulespecifiers.ModuleSpecifierEndingMinimal && e != modulespecifiers.ModuleSpecifierEndingIndex
		})
	}

	if len(allowedEndings) > 0 && allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingTsExtension {
		if tspath.FileExtensionIsOneOf(name, tspath.SupportedTSImplementationExtensions) {
			return name, tspath.TryGetExtensionFromPath(name)
		}
		outputExtension := module.TryGetJSExtensionForFile(name, program.Options())
		if outputExtension != "" {
			return tspath.ChangeExtension(name, outputExtension), outputExtension
		}
		return name, tspath.TryGetExtensionFromPath(name)
	}

	if !isExportsOrImportsWildcard &&
		len(allowedEndings) > 0 &&
		(allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingMinimal || allowedEndings[0] == modulespecifiers.ModuleSpecifierEndingIndex) &&
		tspath.FileExtensionIsOneOf(name, []string{tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionDts}) {
		return tspath.RemoveFileExtension(name), tspath.TryGetExtensionFromPath(name)
	}

	outputExtension := module.TryGetJSExtensionForFile(name, program.Options())
	if outputExtension != "" {
		return tspath.ChangeExtension(name, outputExtension), outputExtension
	}
	return name, tspath.TryGetExtensionFromPath(name)
}

// Remaps files like `foo.d.json.ts` back to `foo.json`.
func tryGetRealFileNameForNonJSDeclarationFileName(fileName string) string {
	baseName := tspath.GetBaseFileName(fileName)
	// Ends with .ts, contains ".d.", and is NOT a standard .d.ts file
	if !strings.HasSuffix(fileName, tspath.ExtensionTs) ||
		!strings.Contains(baseName, ".d.") ||
		strings.HasSuffix(baseName, tspath.ExtensionDts) {
		return ""
	}
	noExtension := tspath.RemoveExtension(fileName, tspath.ExtensionTs)
	lastDotIndex := strings.LastIndex(noExtension, ".")
	ext := noExtension[lastDotIndex:]
	before, _, _ := strings.Cut(noExtension, ".d.")
	return before + ext
}

func walkUpParentheses(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindParenthesizedType:
		return ast.WalkUpParenthesizedTypes(node)
	case ast.KindParenthesizedExpression:
		return ast.WalkUpParenthesizedExpressions(node)
	default:
		return node
	}
}

func getStringLiteralTypes(t *checker.Type, uniques *collections.Set[string], typeChecker *checker.Checker) []*checker.StringLiteralType {
	if t == nil {
		return nil
	}
	if uniques == nil {
		uniques = &collections.Set[string]{}
	}
	t = skipConstraint(t, typeChecker)
	if t.IsUnion() {
		var types []*checker.StringLiteralType
		for _, elementType := range t.Types() {
			types = append(types, getStringLiteralTypes(elementType, uniques, typeChecker)...)
		}
		return types
	}
	if t.IsStringLiteral() && !t.IsEnumLiteral() && uniques.AddIfAbsent(t.AsLiteralType().Value().(string)) {
		return []*checker.StringLiteralType{t}
	}
	return nil
}

func getAlreadyUsedTypesInStringLiteralUnion(union *ast.UnionType, current *ast.LiteralType) []string {
	typesList := union.AsUnionTypeNode().Types
	if typesList == nil {
		return nil
	}
	var values []string
	for _, typeNode := range typesList.Nodes {
		if typeNode != current && ast.IsLiteralTypeNode(typeNode) &&
			ast.IsStringLiteral(typeNode.AsLiteralTypeNode().Literal) {
			values = append(values, typeNode.AsLiteralTypeNode().Literal.Text())
		}
	}
	return values
}

func hasIndexSignature(t *checker.Type, typeChecker *checker.Checker) bool {
	return typeChecker.GetStringIndexType(t) != nil || typeChecker.GetNumberIndexType(t) != nil
}

// Matches
//
//	require(""
//	require("")
func isRequireCallArgument(node *ast.Node) bool {
	return ast.IsCallExpression(node.Parent) && len(node.Parent.Arguments()) > 0 && node.Parent.Arguments()[0] == node &&
		ast.IsIdentifier(node.Parent.Expression()) && node.Parent.Expression().Text() == "require"
}

func kindModifiersFromExtension(extension string) lsutil.ScriptElementKindModifier {
	switch extension {
	case tspath.ExtensionDts:
		return lsutil.ScriptElementKindModifierDts
	case tspath.ExtensionJs:
		return lsutil.ScriptElementKindModifierJs
	case tspath.ExtensionJson:
		return lsutil.ScriptElementKindModifierJson
	case tspath.ExtensionJsx:
		return lsutil.ScriptElementKindModifierJsx
	case tspath.ExtensionTs:
		return lsutil.ScriptElementKindModifierTs
	case tspath.ExtensionTsx:
		return lsutil.ScriptElementKindModifierTsx
	case tspath.ExtensionDmts:
		return lsutil.ScriptElementKindModifierDmts
	case tspath.ExtensionMjs:
		return lsutil.ScriptElementKindModifierMjs
	case tspath.ExtensionMts:
		return lsutil.ScriptElementKindModifierMts
	case tspath.ExtensionDcts:
		return lsutil.ScriptElementKindModifierDcts
	case tspath.ExtensionCjs:
		return lsutil.ScriptElementKindModifierCjs
	case tspath.ExtensionCts:
		return lsutil.ScriptElementKindModifierCts
	case tspath.ExtensionTsBuildInfo:
		panic(fmt.Sprintf("Extension %v is unsupported.", tspath.ExtensionTsBuildInfo))
	default:
		return lsutil.ScriptElementKindModifierNone
	}
}

func getStringLiteralCompletionsFromSignature(
	call *ast.CallLikeExpression,
	arg *ast.StringLiteralLike,
	argumentInfo *argumentInfoForCompletions,
	typeChecker *checker.Checker,
) *completionsFromTypes {
	isNewIdentifier := false
	uniques := collections.Set[string]{}
	var editingArgument *ast.Node
	if ast.IsJsxOpeningLikeElement(call) {
		editingArgument = ast.FindAncestor(arg.Parent, ast.IsJsxAttribute)
		if editingArgument == nil {
			panic("Expected jsx opening-like element to have a jsx attribute as ancestor.")
		}
	} else {
		editingArgument = arg
	}
	candidates := typeChecker.GetCandidateSignaturesForStringLiteralCompletions(call, editingArgument)
	var types []*checker.StringLiteralType
	for _, candidate := range candidates {
		if !candidate.HasRestParameter() && argumentInfo.argumentCount > len(candidate.Parameters()) {
			continue
		}
		t := typeChecker.GetTypeParameterAtPosition(candidate, argumentInfo.argumentIndex)
		if ast.IsJsxOpeningLikeElement(call) {
			propType := typeChecker.GetTypeOfPropertyOfType(t, editingArgument.AsJsxAttribute().Name().Text())
			if propType != nil {
				t = propType
			}
		}
		isNewIdentifier = isNewIdentifier || t.IsString()
		types = append(types, getStringLiteralTypes(t, &uniques, typeChecker)...)
	}
	if len(types) > 0 {
		return &completionsFromTypes{
			types:           types,
			isNewIdentifier: isNewIdentifier,
		}
	}
	return nil
}

func (l *LanguageService) getStringLiteralCompletionDetails(
	ctx context.Context,
	checker *checker.Checker,
	item *lsproto.CompletionItem,
	name string,
	file *ast.SourceFile,
	position int,
	contextToken *ast.Node,
	docFormat lsproto.MarkupKind,
) *lsproto.CompletionItem {
	if contextToken == nil || !ast.IsStringLiteralLike(contextToken) {
		return item
	}
	completions := l.getStringLiteralCompletionEntries(
		ctx,
		file,
		contextToken,
		position,
		checker,
	)
	if completions == nil {
		return item
	}
	return l.stringLiteralCompletionDetails(item, name, contextToken, completions, file, checker, docFormat)
}

func (l *LanguageService) stringLiteralCompletionDetails(
	item *lsproto.CompletionItem,
	name string,
	location *ast.Node,
	completion *stringLiteralCompletions,
	file *ast.SourceFile,
	checker *checker.Checker,
	docFormat lsproto.MarkupKind,
) *lsproto.CompletionItem {
	switch {
	case completion.fromPaths != nil:
		// Path completions have eagerly-resolved details so the client can show an accurate icon
		// for items of file kind based on the file extension provided in the item detail.
		return item
	case completion.fromProperties != nil:
		properties := completion.fromProperties
		for _, symbol := range properties.symbols {
			if symbol.Name == name {
				return l.createCompletionDetailsForSymbol(item, symbol, checker, location, docFormat)
			}
		}
	case completion.fromTypes != nil:
		types := completion.fromTypes
		for _, t := range types.types {
			if t.AsLiteralType().Value().(string) == name {
				return createCompletionDetails(item, name, "" /*documentation*/, docFormat)
			}
		}
	}
	return item
}

func isInReferenceComment(file *ast.SourceFile, position int) bool {
	commentRange := isInComment(file, position, astnav.GetTokenAtPosition(file, position))
	if commentRange == nil {
		return false
	}
	commentText := file.Text()[commentRange.Pos():commentRange.End()]
	return hasTripleSlashPrefix(commentText)
}

func hasTripleSlashPrefix(commentText string) bool {
	return strings.HasPrefix(commentText, "///") && strings.HasPrefix(strings.TrimSpace(commentText[3:]), "<")
}

// Matches a triple slash reference directive with an incomplete string literal for its path.
// Used to determine if the caret is currently within the string literal and capture the literal
// fragment for completions.
// For example, this matches
//
// /// <reference path="fragment
//
// but not
//
// /// <reference path="fragment"

// Returns (prefix, kind, toComplete, ok) where:
//   - prefix is everything up to and including the opening quote
//   - kind is either "path" or "types"
//   - toComplete is the fragment after the opening quote
//   - ok indicates whether the match was successful
func parseTripleSlashDirectiveFragment(text string) (prefix string, kind string, toComplete string, ok bool) {
	rest := text
	if !strings.HasPrefix(rest, "///") {
		return "", "", "", false
	}

	rest = rest[len("///"):]
	rest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)

	// <reference
	if !strings.HasPrefix(rest, "<reference") {
		return "", "", "", false
	}
	rest = rest[len("<reference"):]

	if len(rest) == 0 || !stringutil.IsWhiteSpaceLike(rune(rest[0])) {
		return "", "", "", false
	}
	rest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)

	// path or types
	if strings.HasPrefix(rest, "path") {
		kind = "path"
		rest = rest[len("path"):]
	} else if strings.HasPrefix(rest, "types") {
		kind = "types"
		rest = rest[len("types"):]
	} else {
		return "", "", "", false
	}

	// Skip optional whitespace, then must have "="
	rest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)
	if !strings.HasPrefix(rest, "=") {
		return "", "", "", false
	}
	rest = rest[1:]

	// Skip optional whitespace, then must have opening quote (' or ")
	rest = strings.TrimLeftFunc(rest, stringutil.IsWhiteSpaceLike)
	if len(rest) == 0 || (rest[0] != '\'' && rest[0] != '"') {
		return "", "", "", false
	}
	rest = rest[1:]

	// The toComplete part is everything after the opening quote
	if strings.ContainsAny(rest, `'"`) {
		return "", "", "", false
	}
	toComplete = rest
	prefix = text[:len(text)-len(toComplete)]
	return prefix, kind, toComplete, true
}

func (l *LanguageService) getTripleSlashReferenceCompletions(
	file *ast.SourceFile,
	position int,
	program *compiler.Program,
	checker *checker.Checker,
) []*pathCompletion {
	compilerOptions := program.Options()
	token := astnav.GetTokenAtPosition(file, position)
	commentRanges := slices.Collect(scanner.GetLeadingCommentRanges(&ast.NodeFactory{}, file.Text(), token.Pos()))

	var foundRange *ast.CommentRange
	for i := range commentRanges {
		commentRange := &commentRanges[i]
		if position >= commentRange.Pos() && position <= commentRange.End() {
			foundRange = commentRange
			break
		}
	}
	if foundRange == nil {
		return nil
	}

	text := file.Text()[foundRange.Pos():position]
	prefix, kind, toComplete, ok := parseTripleSlashDirectiveFragment(text)
	if !ok {
		return nil
	}

	scriptPath := tspath.GetDirectoryPath(string(file.Path()))

	var names []moduleCompletionNameAndKind
	switch kind {
	case "path":
		extensionOptions := l.getExtensionOptions(compilerOptions, referenceKindFileName, file, core.ResolutionModeNone, nil /*checker*/)
		result := l.getCompletionEntriesForDirectoryFragment(
			toComplete,
			scriptPath,
			extensionOptions,
			program,
			true, /*moduleSpecifierIsRelative*/
			string(file.Path()),
			&moduleCompletionNameAndKindSet{names: make(map[string]moduleCompletionNameAndKind)},
		)
		names = slices.Collect(maps.Values(result.names))
	case "types":
		extensionOptions := l.getExtensionOptions(compilerOptions, referenceKindModuleSpecifier, file, core.ResolutionModeNone, nil /*checker*/)
		result := &moduleCompletionNameAndKindSet{names: make(map[string]moduleCompletionNameAndKind)}
		l.getCompletionEntriesFromTypings(program, scriptPath, getFragmentDirectory(toComplete), extensionOptions, result)
		names = slices.Collect(maps.Values(result.names))
	}

	return addReplacementSpans(toComplete, foundRange.Pos()+len(prefix), names)
}

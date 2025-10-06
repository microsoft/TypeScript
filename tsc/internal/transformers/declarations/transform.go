package declarations

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type ReferencedFilePair struct {
	file *ast.SourceFile
	ref  *ast.FileReference
}

type OutputPaths interface {
	DeclarationFilePath() string
	JsFilePath() string
}

// Used to be passed in the TransformationContext, which is now just an EmitContext
type DeclarationEmitHost interface {
	modulespecifiers.ModuleSpecifierGenerationHost
	GetCurrentDirectory() string
	UseCaseSensitiveFileNames() bool
	GetSourceFileFromReference(origin *ast.SourceFile, ref *ast.FileReference) *ast.SourceFile

	GetOutputPathsFor(file *ast.SourceFile, forceDtsPaths bool) OutputPaths
	GetResolutionModeOverride(node *ast.Node) core.ResolutionMode
	GetEffectiveDeclarationFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags
	GetEmitResolver() printer.EmitResolver
}

type DeclarationTransformer struct {
	transformers.Transformer
	host                DeclarationEmitHost
	compilerOptions     *core.CompilerOptions
	tracker             *SymbolTrackerImpl
	state               *SymbolTrackerSharedState
	resolver            printer.EmitResolver
	declarationFilePath string
	declarationMapPath  string

	isBundledEmit                    bool
	needsDeclare                     bool
	needsScopeFixMarker              bool
	resultHasScopeMarker             bool
	enclosingDeclaration             *ast.Node
	resultHasExternalModuleIndicator bool
	suppressNewDiagnosticContexts    bool
	lateStatementReplacementMap      map[ast.NodeId]*ast.Node
	rawReferencedFiles               []ReferencedFilePair
	rawTypeReferenceDirectives       []*ast.FileReference
	rawLibReferenceDirectives        []*ast.FileReference
}

// TODO: Convert to transformers.TransformerFactory signature to allow more automatic composition with other transforms
func NewDeclarationTransformer(host DeclarationEmitHost, context *printer.EmitContext, compilerOptions *core.CompilerOptions, declarationFilePath string, declarationMapPath string) *DeclarationTransformer {
	resolver := host.GetEmitResolver()
	state := &SymbolTrackerSharedState{isolatedDeclarations: compilerOptions.IsolatedDeclarations.IsTrue(), resolver: resolver}
	tracker := NewSymbolTracker(host, resolver, state)
	// TODO: Use new host GetOutputPathsFor method instead of passing in entrypoint paths (which will also better support bundled emit)
	tx := &DeclarationTransformer{
		host:                host,
		compilerOptions:     compilerOptions,
		tracker:             tracker,
		state:               state,
		resolver:            resolver,
		declarationFilePath: declarationFilePath,
		declarationMapPath:  declarationMapPath,
	}
	tx.NewTransformer(tx.visit, context)
	return tx
}

func (tx *DeclarationTransformer) GetDiagnostics() []*ast.Diagnostic {
	return tx.state.diagnostics
}

const declarationEmitNodeBuilderFlags = nodebuilder.FlagsMultilineObjectLiterals |
	nodebuilder.FlagsWriteClassExpressionAsTypeLiteral |
	nodebuilder.FlagsUseTypeOfFunction |
	nodebuilder.FlagsUseStructuralFallback |
	nodebuilder.FlagsAllowEmptyTuple |
	nodebuilder.FlagsGenerateNamesForShadowedTypeParams |
	nodebuilder.FlagsNoTruncation

const declarationEmitInternalNodeBuilderFlags = nodebuilder.InternalFlagsAllowUnresolvedNames

// functions as both `visitDeclarationStatements` and `transformRoot`, utilitzing SyntaxList nodes
func (tx *DeclarationTransformer) visit(node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}
	// !!! TODO: Bundle support?
	switch node.Kind {
	case ast.KindSourceFile:
		return tx.visitSourceFile(node.AsSourceFile())
	// statements we keep but do something to
	case ast.KindFunctionDeclaration,
		ast.KindModuleDeclaration,
		ast.KindImportEqualsDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindClassDeclaration,
		ast.KindJSTypeAliasDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindEnumDeclaration,
		ast.KindVariableStatement,
		ast.KindImportDeclaration,
		ast.KindJSImportDeclaration,
		ast.KindExportDeclaration,
		ast.KindJSExportAssignment,
		ast.KindExportAssignment:
		return tx.visitDeclarationStatements(node)
	// statements we elide
	case ast.KindBreakStatement,
		ast.KindContinueStatement,
		ast.KindDebuggerStatement,
		ast.KindDoStatement,
		ast.KindExpressionStatement,
		ast.KindEmptyStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindForStatement,
		ast.KindIfStatement,
		ast.KindLabeledStatement,
		ast.KindReturnStatement,
		ast.KindSwitchStatement,
		ast.KindThrowStatement,
		ast.KindTryStatement,
		ast.KindWhileStatement,
		ast.KindWithStatement,
		ast.KindNotEmittedStatement,
		ast.KindBlock,
		ast.KindMissingDeclaration:
		return nil
	// parts of things, things we just visit children of
	default:
		return tx.visitDeclarationSubtree(node)
	}
}

func throwDiagnostic(result printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
	panic("Diagnostic emitted without context")
}

func (tx *DeclarationTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile {
		return node.AsNode()
	}

	tx.isBundledEmit = false
	tx.needsDeclare = true
	tx.needsScopeFixMarker = false
	tx.resultHasScopeMarker = false
	tx.enclosingDeclaration = node.AsNode()
	tx.state.getSymbolAccessibilityDiagnostic = throwDiagnostic
	tx.resultHasExternalModuleIndicator = false
	tx.suppressNewDiagnosticContexts = false
	tx.state.lateMarkedStatements = make([]*ast.Node, 0)
	tx.lateStatementReplacementMap = make(map[ast.NodeId]*ast.Node)
	tx.rawReferencedFiles = make([]ReferencedFilePair, 0)
	tx.rawTypeReferenceDirectives = make([]*ast.FileReference, 0)
	tx.rawLibReferenceDirectives = make([]*ast.FileReference, 0)
	tx.state.currentSourceFile = node
	tx.collectFileReferences(node)
	tx.resolver.PrecalculateDeclarationEmitVisibility(node)
	updated := tx.transformSourceFile(node)
	tx.state.currentSourceFile = nil
	return updated
}

func (tx *DeclarationTransformer) collectFileReferences(sourceFile *ast.SourceFile) {
	tx.rawReferencedFiles = append(tx.rawReferencedFiles, core.Map(sourceFile.ReferencedFiles, func(ref *ast.FileReference) ReferencedFilePair { return ReferencedFilePair{file: sourceFile, ref: ref} })...)
	tx.rawTypeReferenceDirectives = append(tx.rawTypeReferenceDirectives, sourceFile.TypeReferenceDirectives...)
	tx.rawLibReferenceDirectives = append(tx.rawLibReferenceDirectives, sourceFile.LibReferenceDirectives...)
}

func (tx *DeclarationTransformer) transformSourceFile(node *ast.SourceFile) *ast.Node {
	var combinedStatements *ast.StatementList
	statements := tx.Visitor().VisitNodes(node.Statements)
	combinedStatements = tx.transformAndReplaceLatePaintedStatements(statements)
	combinedStatements.Loc = statements.Loc // setTextRange
	if ast.IsExternalOrCommonJSModule(node) && (!tx.resultHasExternalModuleIndicator || (tx.needsScopeFixMarker && !tx.resultHasScopeMarker)) {
		marker := createEmptyExports(tx.Factory().AsNodeFactory())
		newList := append(combinedStatements.Nodes, marker)
		withMarker := tx.Factory().NewNodeList(newList)
		withMarker.Loc = combinedStatements.Loc
		combinedStatements = withMarker
	}
	outputFilePath := tspath.GetDirectoryPath(tspath.NormalizeSlashes(tx.declarationFilePath))
	result := tx.Factory().UpdateSourceFile(node, combinedStatements, node.EndOfFileToken)
	result.AsSourceFile().LibReferenceDirectives = tx.getLibReferences()
	result.AsSourceFile().TypeReferenceDirectives = tx.getTypeReferences()
	result.AsSourceFile().IsDeclarationFile = true
	result.AsSourceFile().ReferencedFiles = tx.getReferencedFiles(outputFilePath)
	return result.AsNode()
}

func createEmptyExports(factory *ast.NodeFactory) *ast.Node {
	return factory.NewExportDeclaration(nil /*isTypeOnly*/, false, factory.NewNamedExports(factory.NewNodeList([]*ast.Node{})), nil, nil)
}

func (tx *DeclarationTransformer) transformAndReplaceLatePaintedStatements(statements *ast.StatementList) *ast.StatementList {
	// This is a `while` loop because `handleSymbolAccessibilityError` can see additional import aliases marked as visible during
	// error handling which must now be included in the output and themselves checked for errors.
	// For example:
	// ```
	// module A {
	//   export module Q {}
	//   import B = Q;
	//   import C = B;
	//   export import D = C;
	// }
	// ```
	// In such a scenario, only Q and D are initially visible, but we don't consider imports as private names - instead we say they if they are referenced they must
	// be recorded. So while checking D's visibility we mark C as visible, then we must check C which in turn marks B, completing the chain of
	// dependent imports and allowing a valid declaration file output. Today, this dependent alias marking only happens for internal import aliases.
	for true {
		if len(tx.state.lateMarkedStatements) == 0 {
			break
		}

		next := tx.state.lateMarkedStatements[0]
		tx.state.lateMarkedStatements = tx.state.lateMarkedStatements[1:]

		priorNeedsDeclare := tx.needsDeclare
		tx.needsDeclare = next.Parent != nil && ast.IsSourceFile(next.Parent) && !(ast.IsExternalModule(next.Parent.AsSourceFile()) && tx.isBundledEmit)

		result := tx.transformTopLevelDeclaration(next)

		tx.needsDeclare = priorNeedsDeclare
		original := tx.EmitContext().MostOriginal(next)
		id := ast.GetNodeId(original)
		tx.lateStatementReplacementMap[id] = result
	}

	// And lastly, we need to get the final form of all those indetermine import declarations from before and add them to the output list
	// (and remove them from the set to examine for outter declarations)
	results := make([]*ast.Node, 0, len(statements.Nodes))
	for _, statement := range statements.Nodes {
		if !ast.IsLateVisibilityPaintedStatement(statement) {
			results = append(results, statement)
			continue
		}
		original := tx.EmitContext().MostOriginal(statement)
		id := ast.GetNodeId(original)
		replacement, ok := tx.lateStatementReplacementMap[id]
		if !ok {
			results = append(results, statement)
			continue // not replaced
		}
		if replacement == nil {
			continue // deleted
		}
		if replacement.Kind == ast.KindSyntaxList {
			if !tx.needsScopeFixMarker || !tx.resultHasExternalModuleIndicator {
				for _, elem := range replacement.AsSyntaxList().Children {
					if needsScopeMarker(elem) {
						tx.needsScopeFixMarker = true
					}
					if ast.IsSourceFile(statement.Parent) && ast.IsExternalModuleIndicator(replacement) {
						tx.resultHasExternalModuleIndicator = true
					}
				}
			}
			results = append(results, replacement.AsSyntaxList().Children...)
		} else {
			if needsScopeMarker(replacement) {
				tx.needsScopeFixMarker = true
			}
			if ast.IsSourceFile(statement.Parent) && ast.IsExternalModuleIndicator(replacement) {
				tx.resultHasExternalModuleIndicator = true
			}
			results = append(results, replacement)
		}
	}

	return tx.Factory().NewNodeList(results)
}

func (tx *DeclarationTransformer) getReferencedFiles(outputFilePath string) (results []*ast.FileReference) {
	// Handle path rewrites for triple slash ref comments
	for _, pair := range tx.rawReferencedFiles {
		sourceFile := pair.file
		ref := pair.ref

		if !ref.Preserve {
			continue
		}

		file := tx.host.GetSourceFileFromReference(sourceFile, ref)
		if file == nil {
			continue
		}

		var declFileName string
		if file.IsDeclarationFile {
			declFileName = file.FileName()
		} else {
			// !!! bundled emit support, omit bundled refs
			// if (tx.isBundledEmit && contains((node as Bundle).sourceFiles, file)) continue
			paths := tx.host.GetOutputPathsFor(file, true)
			// Try to use output path for referenced file, or output js path if that doesn't exist, or the input path if all else fails
			declFileName = paths.DeclarationFilePath()
			if len(declFileName) == 0 {
				declFileName = paths.JsFilePath()
			}
			if len(declFileName) == 0 {
				declFileName = file.FileName()
			}
		}
		// Should only be missing if the source file is missing a fileName (at which point we can't name a reference to it anyway)
		// TODO: Shouldn't this be a crash or assert instead of a silent continue?
		if len(declFileName) == 0 {
			continue
		}

		fileName := tspath.GetRelativePathToDirectoryOrUrl(
			outputFilePath,
			declFileName,
			false, // TODO: Probably unsafe to assume this isn't a URL, but that's what strada does
			tspath.ComparePathsOptions{
				CurrentDirectory:          tx.host.GetCurrentDirectory(),
				UseCaseSensitiveFileNames: tx.host.UseCaseSensitiveFileNames(),
			},
		)

		results = append(results, &ast.FileReference{
			TextRange:      core.NewTextRange(-1, -1),
			FileName:       fileName,
			ResolutionMode: ref.ResolutionMode,
			Preserve:       ref.Preserve,
		})
	}
	return results
}

func (tx *DeclarationTransformer) getLibReferences() (result []*ast.FileReference) {
	// clone retained references
	for _, ref := range tx.rawLibReferenceDirectives {
		if !ref.Preserve {
			continue
		}
		result = append(result, &ast.FileReference{
			TextRange:      core.NewTextRange(-1, -1),
			FileName:       ref.FileName,
			ResolutionMode: ref.ResolutionMode,
			Preserve:       ref.Preserve,
		})
	}
	return result
}

func (tx *DeclarationTransformer) getTypeReferences() (result []*ast.FileReference) {
	// clone retained references
	for _, ref := range tx.rawTypeReferenceDirectives {
		if !ref.Preserve {
			continue
		}
		result = append(result, &ast.FileReference{
			TextRange:      core.NewTextRange(-1, -1),
			FileName:       ref.FileName,
			ResolutionMode: ref.ResolutionMode,
			Preserve:       ref.Preserve,
		})
	}
	return result
}

func (tx *DeclarationTransformer) visitDeclarationSubtree(input *ast.Node) *ast.Node {
	// !!! TODO: stripInternal support?
	// if (shouldStripInternal(input)) return nil
	if ast.IsDeclaration(input) {
		if isDeclarationAndNotVisible(tx.EmitContext(), tx.resolver, input) {
			return nil
		}
		if ast.HasDynamicName(input) {
			if tx.state.isolatedDeclarations {
				// Classes and object literals usually elide properties with computed names that are not of a literal type
				// In isolated declarations TSC needs to error on these as we don't know the type in a DTE.
				if !tx.resolver.IsDefinitelyReferenceToGlobalSymbolObject(input.Name().Expression()) {
					if ast.IsClassDeclaration(input.Parent) || ast.IsObjectLiteralExpression(input.Parent) {
						// !!! TODO: isolatedDeclarations diagnostics
						// context.addDiagnostic(createDiagnosticForNode(input, diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations))
						return nil
					} else if (ast.IsInterfaceDeclaration(input.Parent) || ast.IsTypeLiteralNode(input.Parent)) && !ast.IsEntityNameExpression(input.Name().Expression()) {
						// Type declarations just need to double-check that the input computed name is an entity name expression
						// !!! TODO: isolatedDeclarations diagnostics
						// context.addDiagnostic(createDiagnosticForNode(input, diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations))
						return nil
					}
				}
			} else if !tx.resolver.IsLateBound(tx.EmitContext().ParseNode(input)) || !ast.IsEntityNameExpression(input.Name().AsComputedPropertyName().Expression) {
				return nil
			}
		}
	}

	// Elide implementation signatures from overload sets
	if ast.IsFunctionLike(input) && tx.resolver.IsImplementationOfOverload(input) {
		return nil
	}

	if input.Kind == ast.KindSemicolonClassElement {
		return nil
	}

	previousEnclosingDeclaration := tx.enclosingDeclaration
	if isEnclosingDeclaration(input) {
		tx.enclosingDeclaration = input
	}

	canProdiceDiagnostic := canProduceDiagnostics(input)
	oldWithinObjectLiteralType := tx.suppressNewDiagnosticContexts
	shouldEnterSuppressNewDiagnosticsContextContext := (input.Kind == ast.KindTypeLiteral || input.Kind == ast.KindMappedType) && !(input.Parent.Kind == ast.KindTypeAliasDeclaration || input.Parent.Kind == ast.KindJSTypeAliasDeclaration)

	oldDiag := tx.state.getSymbolAccessibilityDiagnostic
	if canProdiceDiagnostic && !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input)
	}
	oldName := tx.state.errorNameNode

	if shouldEnterSuppressNewDiagnosticsContextContext {
		tx.suppressNewDiagnosticContexts = true
	}

	var result *ast.Node

	switch input.Kind {
	case ast.KindMappedType:
		result = tx.transformMappedTypeNode(input.AsMappedTypeNode())
	case ast.KindHeritageClause:
		result = tx.transformHeritageClause(input.AsHeritageClause())
	case ast.KindMethodSignature:
		result = tx.transformMethodSignatureDeclaration(input.AsMethodSignatureDeclaration())
	case ast.KindMethodDeclaration:
		result = tx.transformMethodDeclaration(input.AsMethodDeclaration())
	case ast.KindConstructSignature:
		result = tx.transformConstructSignatureDeclaration(input.AsConstructSignatureDeclaration())
	case ast.KindConstructor:
		result = tx.transformConstructorDeclaration(input.AsConstructorDeclaration())
	case ast.KindGetAccessor:
		result = tx.transformGetAccesorDeclaration(input.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		result = tx.transformSetAccessorDeclaration(input.AsSetAccessorDeclaration())
	case ast.KindPropertyDeclaration:
		result = tx.transformPropertyDeclaration(input.AsPropertyDeclaration())
	case ast.KindPropertySignature:
		result = tx.transformPropertySignatureDeclaration(input.AsPropertySignatureDeclaration())
	case ast.KindCallSignature:
		result = tx.transformCallSignatureDeclaration(input.AsCallSignatureDeclaration())
	case ast.KindIndexSignature:
		result = tx.transformIndexSignatureDeclaration(input.AsIndexSignatureDeclaration())
	case ast.KindVariableDeclaration:
		result = tx.transformVariableDeclaration(input.AsVariableDeclaration())
	case ast.KindTypeParameter:
		result = tx.transformTypeParameterDeclaration(input.AsTypeParameter())
	case ast.KindExpressionWithTypeArguments:
		result = tx.transformExpressionWithTypeArguments(input.AsExpressionWithTypeArguments())
	case ast.KindTypeReference:
		result = tx.transformTypeReference(input.AsTypeReference())
	case ast.KindConditionalType:
		result = tx.transformConditionalTypeNode(input.AsConditionalTypeNode())
	case ast.KindFunctionType:
		result = tx.transformFunctionTypeNode(input.AsFunctionTypeNode())
	case ast.KindConstructorType:
		result = tx.transformConstructorTypeNode(input.AsConstructorTypeNode())
	case ast.KindImportType:
		result = tx.transformImportTypeNode(input.AsImportTypeNode())
	case ast.KindTypeQuery:
		tx.checkEntityNameVisibility(input.AsTypeQueryNode().ExprName, tx.enclosingDeclaration)
		result = tx.Visitor().VisitEachChild(input)
	case ast.KindTupleType:
		result = tx.Visitor().VisitEachChild(input)
		if result != nil {
			if transformers.IsOriginalNodeSingleLine(tx.EmitContext(), input) {
				tx.EmitContext().AddEmitFlags(result, printer.EFSingleLine)
			}
		}
	case ast.KindJSDocTypeExpression:
		result = tx.transformJSDocTypeExpression(input.AsJSDocTypeExpression())
	case ast.KindJSDocTypeLiteral:
		result = tx.transformJSDocTypeLiteral(input.AsJSDocTypeLiteral())
	case ast.KindJSDocPropertyTag:
		result = tx.transformJSDocPropertyTag(input.AsJSDocParameterOrPropertyTag())
	case ast.KindJSDocAllType:
		result = tx.transformJSDocAllType(input.AsJSDocAllType())
	case ast.KindJSDocNullableType:
		result = tx.transformJSDocNullableType(input.AsJSDocNullableType())
	case ast.KindJSDocNonNullableType:
		result = tx.transformJSDocNonNullableType(input.AsJSDocNonNullableType())
	case ast.KindJSDocOptionalType:
		result = tx.transformJSDocOptionalType(input.AsJSDocOptionalType())
	case ast.KindJSDocVariadicType:
		result = tx.transformJSDocVariadicType(input.AsJSDocVariadicType())
	default:
		result = tx.Visitor().VisitEachChild(input)
	}

	if result != nil && canProdiceDiagnostic && ast.HasDynamicName(input) {
		tx.checkName(input)
	}

	tx.enclosingDeclaration = previousEnclosingDeclaration
	tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	tx.state.errorNameNode = oldName
	tx.suppressNewDiagnosticContexts = oldWithinObjectLiteralType
	return result
}

func (tx *DeclarationTransformer) checkName(node *ast.Node) {
	oldDiag := tx.state.getSymbolAccessibilityDiagnostic
	if !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node)
	}
	tx.state.errorNameNode = node.Name()
	debug.Assert(ast.HasDynamicName(node)) // Should only be called with dynamic names
	entityName := node.Name().AsComputedPropertyName().Expression
	tx.checkEntityNameVisibility(entityName, tx.enclosingDeclaration)
	if !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	}
	tx.state.errorNameNode = nil
}

func (tx *DeclarationTransformer) transformMappedTypeNode(input *ast.MappedTypeNode) *ast.Node {
	// handle missing template type nodes, since the printer does not
	var typeNode *ast.Node
	if input.Type == nil {
		typeNode = tx.Factory().NewKeywordTypeNode(ast.KindAnyKeyword)
	} else {
		typeNode = tx.Visitor().Visit(input.Type)
	}
	return tx.Factory().UpdateMappedTypeNode(
		input,
		input.ReadonlyToken,
		tx.Visitor().Visit(input.TypeParameter),
		tx.Visitor().Visit(input.NameType),
		input.QuestionToken,
		typeNode,
		nil,
	)
}

func (tx *DeclarationTransformer) transformHeritageClause(clause *ast.HeritageClause) *ast.Node {
	retainedClauses := core.Filter(clause.Types.Nodes, func(t *ast.Node) bool {
		return ast.IsEntityNameExpression(t.AsExpressionWithTypeArguments().Expression) ||
			(clause.Token == ast.KindExtendsKeyword && t.Expression().Kind == ast.KindNullKeyword)
	})
	if len(retainedClauses) == 0 {
		return nil // elide empty clause
	}
	if len(retainedClauses) == len(clause.Types.Nodes) {
		return tx.Visitor().VisitEachChild(clause.AsNode())
	}
	return tx.Factory().UpdateHeritageClause(
		clause,
		tx.Visitor().VisitNodes(tx.Factory().NewNodeList(retainedClauses)),
	)
}

func (tx *DeclarationTransformer) transformImportTypeNode(input *ast.ImportTypeNode) *ast.Node {
	if !ast.IsLiteralImportTypeNode(input.AsNode()) {
		return input.AsNode()
	}
	return tx.Factory().UpdateImportTypeNode(
		input,
		input.IsTypeOf,
		tx.Factory().UpdateLiteralTypeNode(
			input.Argument.AsLiteralTypeNode(),
			tx.rewriteModuleSpecifier(input.AsNode(), input.Argument.AsLiteralTypeNode().Literal),
		),
		input.Attributes,
		input.Qualifier,
		tx.Visitor().VisitNodes(input.TypeArguments),
	)
}

func (tx *DeclarationTransformer) transformConstructorTypeNode(input *ast.ConstructorTypeNode) *ast.Node {
	return tx.Factory().UpdateConstructorTypeNode(
		input,
		tx.ensureModifiers(input.AsNode()),
		tx.Visitor().VisitNodes(input.TypeParameters),
		tx.updateParamList(input.AsNode(), input.Parameters),
		tx.Visitor().Visit(input.Type),
	)
}

func (tx *DeclarationTransformer) transformFunctionTypeNode(input *ast.FunctionTypeNode) *ast.Node {
	return tx.Factory().UpdateFunctionTypeNode(
		input,
		tx.Visitor().VisitNodes(input.TypeParameters),
		tx.updateParamList(input.AsNode(), input.Parameters),
		tx.Visitor().Visit(input.Type),
	)
}

func (tx *DeclarationTransformer) transformConditionalTypeNode(input *ast.ConditionalTypeNode) *ast.Node {
	checkType := tx.Visitor().Visit(input.CheckType)
	extendsType := tx.Visitor().Visit(input.ExtendsType)
	oldEnclosingDecl := tx.enclosingDeclaration
	tx.enclosingDeclaration = input.TrueType
	trueType := tx.Visitor().Visit(input.TrueType)
	tx.enclosingDeclaration = oldEnclosingDecl
	falseType := tx.Visitor().Visit(input.FalseType)

	return tx.Factory().UpdateConditionalTypeNode(
		input,
		checkType,
		extendsType,
		trueType,
		falseType,
	)
}

func (tx *DeclarationTransformer) transformTypeReference(input *ast.TypeReferenceNode) *ast.Node {
	tx.checkEntityNameVisibility(input.TypeName, tx.enclosingDeclaration)
	return tx.Visitor().VisitEachChild(input.AsNode())
}

func (tx *DeclarationTransformer) transformExpressionWithTypeArguments(input *ast.ExpressionWithTypeArguments) *ast.Node {
	if ast.IsEntityName(input.Expression) || ast.IsEntityNameExpression(input.Expression) {
		tx.checkEntityNameVisibility(input.Expression, tx.enclosingDeclaration)
	}
	return tx.Visitor().VisitEachChild(input.AsNode())
}

func (tx *DeclarationTransformer) transformTypeParameterDeclaration(input *ast.TypeParameterDeclaration) *ast.Node {
	if isPrivateMethodTypeParameter(tx.host, input) && (input.DefaultType != nil || input.Constraint != nil) {
		return tx.Factory().UpdateTypeParameterDeclaration(
			input,
			input.Modifiers(),
			input.Name(),
			nil,
			nil,
		)
	}
	return tx.Visitor().VisitEachChild(input.AsNode())
}

func (tx *DeclarationTransformer) transformVariableDeclaration(input *ast.VariableDeclaration) *ast.Node {
	if ast.IsBindingPattern(input.Name()) {
		return tx.recreateBindingPattern(input.Name().AsBindingPattern())
	}
	// Variable declaration types also suppress new diagnostic contexts, provided the contexts wouldn't be made for binding pattern types
	tx.suppressNewDiagnosticContexts = true
	return tx.Factory().UpdateVariableDeclaration(
		input,
		input.Name(),
		nil,
		tx.ensureType(input.AsNode(), false),
		tx.ensureNoInitializer(input.AsNode()),
	)
}

func (tx *DeclarationTransformer) recreateBindingPattern(input *ast.BindingPattern) *ast.Node {
	var results []*ast.Node
	for _, elem := range input.Elements.Nodes {
		result := tx.recreateBindingElement(elem.AsBindingElement())
		if result == nil {
			continue
		}
		if result.Kind == ast.KindSyntaxList {
			results = append(results, result.AsSyntaxList().Children...)
		} else {
			results = append(results, result)
		}
	}
	if len(results) == 0 {
		return nil
	}
	if len(results) == 1 {
		return results[0]
	}
	return tx.Factory().NewSyntaxList(results)
}

func (tx *DeclarationTransformer) recreateBindingElement(e *ast.BindingElement) *ast.Node {
	if e.Name() == nil {
		return nil
	}
	if !getBindingNameVisible(tx.resolver, e.AsNode()) {
		return nil
	}
	if ast.IsBindingPattern(e.Name()) {
		return tx.recreateBindingPattern(e.Name().AsBindingPattern())
	}
	return tx.Factory().NewVariableDeclaration(
		e.Name(),
		nil,
		tx.ensureType(e.AsNode(), false),
		nil, // TODO: possible strada bug - not emitting const initialized binding pattern elements?
	)
}

func (tx *DeclarationTransformer) transformIndexSignatureDeclaration(input *ast.IndexSignatureDeclaration) *ast.Node {
	t := tx.Visitor().Visit(input.Type)
	if t == nil {
		t = tx.Factory().NewKeywordTypeNode(ast.KindAnyKeyword)
	}
	return tx.Factory().UpdateIndexSignatureDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		tx.updateParamList(input.AsNode(), input.Parameters),
		t,
	)
}

func (tx *DeclarationTransformer) transformCallSignatureDeclaration(input *ast.CallSignatureDeclaration) *ast.Node {
	return tx.Factory().UpdateCallSignatureDeclaration(
		input,
		tx.ensureTypeParams(input.AsNode(), input.TypeParameters),
		tx.updateParamList(input.AsNode(), input.Parameters),
		tx.ensureType(input.AsNode(), false),
	)
}

func (tx *DeclarationTransformer) transformPropertySignatureDeclaration(input *ast.PropertySignatureDeclaration) *ast.Node {
	if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	}
	return tx.Factory().UpdatePropertySignatureDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		input.PostfixToken,
		tx.ensureType(input.AsNode(), false),
		tx.ensureNoInitializer(input.AsNode()), // TODO: possible strada bug (fixed here) - const property signatures never initialized
	)
}

func (tx *DeclarationTransformer) transformPropertyDeclaration(input *ast.PropertyDeclaration) *ast.Node {
	if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	}
	// Remove definite assignment assertion (!) from declaration files
	postfixToken := input.PostfixToken
	if postfixToken != nil && postfixToken.Kind == ast.KindExclamationToken {
		postfixToken = nil
	}
	return tx.Factory().UpdatePropertyDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		postfixToken,
		tx.ensureType(input.AsNode(), false),
		tx.ensureNoInitializer(input.AsNode()),
	)
}

func (tx *DeclarationTransformer) transformSetAccessorDeclaration(input *ast.SetAccessorDeclaration) *ast.Node {
	if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	}

	return tx.Factory().UpdateSetAccessorDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		nil, // accessors shouldn't have type params
		tx.updateAccessorParamList(input.AsNode(), tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(input.AsNode()), ast.ModifierFlagsPrivate) != 0),
		nil,
		nil,
		nil,
	)
}

func (tx *DeclarationTransformer) transformGetAccesorDeclaration(input *ast.GetAccessorDeclaration) *ast.Node {
	if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	}
	return tx.Factory().UpdateGetAccessorDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		nil, // accessors shouldn't have type params
		tx.updateAccessorParamList(input.AsNode(), tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(input.AsNode()), ast.ModifierFlagsPrivate) != 0),
		tx.ensureType(input.AsNode(), false),
		nil,
		nil,
	)
}

const defaultModifierFlagsMask = ast.ModifierFlagsAll ^ ast.ModifierFlagsPublic

func (tx *DeclarationTransformer) updateAccessorParamList(input *ast.Node, isPrivate bool) *ast.ParameterList {
	var newParams []*ast.Node
	if !isPrivate {
		thisParam := ast.GetThisParameter(input)
		if thisParam != nil {
			newParams = append(newParams, tx.ensureParameter(thisParam.AsParameterDeclaration()))
		}
	}
	if ast.IsSetAccessorDeclaration(input) {
		var valueParam *ast.Node
		if !isPrivate {
			if len(newParams) == 1 && len(input.AsSetAccessorDeclaration().Parameters.Nodes) >= 2 {
				valueParam = tx.ensureParameter(input.AsSetAccessorDeclaration().Parameters.Nodes[1].AsParameterDeclaration())
			} else if len(newParams) == 0 && len(input.AsSetAccessorDeclaration().Parameters.Nodes) >= 1 {
				valueParam = tx.ensureParameter(input.AsSetAccessorDeclaration().Parameters.Nodes[0].AsParameterDeclaration())
			}
		}
		if valueParam == nil {
			// TODO: strada bug - no type printed on set accessor missing arg as though private
			var t *ast.Node
			if !isPrivate {
				t = tx.Factory().NewKeywordExpression(ast.KindAnyKeyword)
			}
			valueParam = tx.Factory().NewParameterDeclaration(
				nil,
				nil,
				tx.Factory().NewIdentifier("value"),
				nil,
				t,
				nil,
			)
		}
		newParams = append(newParams, valueParam)
	}
	return tx.Factory().NewNodeList(newParams)
}

func (tx *DeclarationTransformer) transformConstructorDeclaration(input *ast.ConstructorDeclaration) *ast.Node {
	// A constructor declaration may not have a type annotation
	return tx.Factory().UpdateConstructorDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		nil, // no type params
		tx.updateParamList(input.AsNode(), input.Parameters),
		nil, // no return type
		nil,
		nil,
	)
}

func (tx *DeclarationTransformer) transformConstructSignatureDeclaration(input *ast.ConstructSignatureDeclaration) *ast.Node {
	return tx.Factory().UpdateConstructSignatureDeclaration(
		input,
		tx.ensureTypeParams(input.AsNode(), input.TypeParameters),
		tx.updateParamList(input.AsNode(), input.Parameters),
		tx.ensureType(input.AsNode(), false),
	)
}

func (tx *DeclarationTransformer) omitPrivateMethodType(input *ast.Node) *ast.Node {
	if input.Symbol() != nil && len(input.Symbol().Declarations) > 0 && input.Symbol().Declarations[0] != input {
		return nil
	} else {
		return tx.Factory().NewPropertyDeclaration(
			tx.ensureModifiers(input),
			input.Name(),
			nil,
			nil,
			nil,
		)
	}
}

func (tx *DeclarationTransformer) transformMethodSignatureDeclaration(input *ast.MethodSignatureDeclaration) *ast.Node {
	if tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(input.AsNode()), ast.ModifierFlagsPrivate) != 0 {
		return tx.omitPrivateMethodType(input.AsNode())
	} else if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	} else {
		return tx.Factory().UpdateMethodSignatureDeclaration(
			input,
			tx.ensureModifiers(input.AsNode()),
			input.Name(),
			input.PostfixToken,
			tx.ensureTypeParams(input.AsNode(), input.TypeParameters),
			tx.updateParamList(input.AsNode(), input.Parameters),
			tx.ensureType(input.AsNode(), false),
		)
	}
}

func (tx *DeclarationTransformer) transformMethodDeclaration(input *ast.MethodDeclaration) *ast.Node {
	if tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(input.AsNode()), ast.ModifierFlagsPrivate) != 0 {
		return tx.omitPrivateMethodType(input.AsNode())
	} else if ast.IsPrivateIdentifier(input.Name()) {
		return nil
	} else {
		return tx.Factory().UpdateMethodDeclaration(
			input,
			tx.ensureModifiers(input.AsNode()),
			nil,
			input.Name(),
			input.PostfixToken,
			tx.ensureTypeParams(input.AsNode(), input.TypeParameters),
			tx.updateParamList(input.AsNode(), input.Parameters),
			tx.ensureType(input.AsNode(), false),
			nil,
			nil,
		)
	}
}

func (tx *DeclarationTransformer) visitDeclarationStatements(input *ast.Node) *ast.Node {
	// !!! TODO: stripInternal support?
	// if (shouldStripInternal(input)) return nil
	switch input.Kind {
	case ast.KindExportDeclaration:
		if ast.IsSourceFile(input.Parent) {
			tx.resultHasExternalModuleIndicator = true
		}
		tx.resultHasScopeMarker = true
		// Rewrite external module names if necessary
		return tx.Factory().UpdateExportDeclaration(
			input.AsExportDeclaration(),
			input.Modifiers(),
			input.IsTypeOnly(),
			input.AsExportDeclaration().ExportClause,
			tx.rewriteModuleSpecifier(input, input.AsExportDeclaration().ModuleSpecifier),
			tx.tryGetResolutionModeOverride(input.AsExportDeclaration().Attributes),
		)
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		if ast.IsSourceFile(input.Parent) {
			tx.resultHasExternalModuleIndicator = true
		}
		tx.resultHasScopeMarker = true
		if input.AsExportAssignment().Expression.Kind == ast.KindIdentifier {
			return input
		}
		// expression is non-identifier, create _default typed variable to reference
		newId := tx.Factory().NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
		tx.state.getSymbolAccessibilityDiagnostic = func(_ printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
			return &SymbolAccessibilityDiagnostic{
				diagnosticMessage: diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
				errorNode:         input,
			}
		}
		tx.tracker.PushErrorFallbackNode(input)
		type_ := tx.ensureType(input, false)
		varDecl := tx.Factory().NewVariableDeclaration(newId, nil, type_, nil)
		tx.tracker.PopErrorFallbackNode()
		var modList *ast.ModifierList
		if tx.needsDeclare {
			modList = tx.Factory().NewModifierList([]*ast.Node{tx.Factory().NewModifier(ast.KindDeclareKeyword)})
		} else {
			modList = tx.Factory().NewModifierList([]*ast.Node{})
		}
		statement := tx.Factory().NewVariableStatement(modList, tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList([]*ast.Node{varDecl})))

		assignment := tx.Factory().UpdateExportAssignment(input.AsExportAssignment(), input.Modifiers(), input.Type(), newId)
		// Remove comments from the export declaration and copy them onto the synthetic _default declaration
		tx.preserveJsDoc(statement, input)
		tx.removeAllComments(assignment)
		return tx.Factory().NewSyntaxList([]*ast.Node{statement, assignment})
	default:
		result := tx.transformTopLevelDeclaration(input)
		// Don't actually transform yet; just leave as original node - will be elided/swapped by late pass
		original := tx.EmitContext().MostOriginal(input)
		id := ast.GetNodeId(original)
		tx.lateStatementReplacementMap[id] = result
		return input
	}
}

func (tx *DeclarationTransformer) rewriteModuleSpecifier(parent *ast.Node, input *ast.Node) *ast.Node {
	if input == nil {
		return nil
	}
	tx.resultHasExternalModuleIndicator = tx.resultHasExternalModuleIndicator || (parent.Kind != ast.KindModuleDeclaration && parent.Kind != ast.KindImportType)
	if ast.IsStringLiteralLike(input) {
		if tx.isBundledEmit {
			// !!! TODO: support bundled emit specifier rewriting
		}
	}
	return input
}

func (tx *DeclarationTransformer) tryGetResolutionModeOverride(node *ast.Node) *ast.Node {
	if node == nil {
		return node
	}
	mode := tx.host.GetResolutionModeOverride(node)
	if mode != core.ResolutionModeNone {
		return node
	}
	return nil
}

func (tx *DeclarationTransformer) preserveJsDoc(updated *ast.Node, original *ast.Node) {
	// !!! TODO: JSDoc comment support
	// if (hasJSDocNodes(updated) && hasJSDocNodes(original)) {
	// 	updated.jsDoc = original.jsDoc;
	// }
	// return setCommentRange(updated, getCommentRange(original));
}

func (tx *DeclarationTransformer) removeAllComments(node *ast.Node) {
	tx.EmitContext().AddEmitFlags(node, printer.EFNoComments)
	// !!! TODO: Also remove synthetic trailing/leading comments added by transforms
	// emitNode.leadingComments = undefined;
	// emitNode.trailingComments = undefined;
}

func (tx *DeclarationTransformer) ensureType(node *ast.Node, ignorePrivate bool) *ast.Node {
	if !ignorePrivate && tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(node), ast.ModifierFlagsPrivate) != 0 {
		// Private nodes emit no types (except private parameter properties, whose parameter types are actually visible)
		return nil
	}

	if tx.shouldPrintWithInitializer(node) {
		// Literal const declarations will have an initializer ensured rather than a type
		return nil
	}

	// Should be removed createTypeOfDeclaration will actually now reuse the existing annotation so there is no real need to duplicate type walking
	// Left in for now to minimize diff during syntactic type node builder refactor
	if !ast.IsExportAssignment(node) && !ast.IsBindingElement(node) && node.Type() != nil && (!ast.IsParameter(node) || !tx.resolver.RequiresAddingImplicitUndefined(node, nil, tx.enclosingDeclaration)) {
		return tx.Visitor().Visit(node.Type())
	}

	oldErrorNameNode := tx.state.errorNameNode
	tx.state.errorNameNode = node.Name()
	var oldDiag GetSymbolAccessibilityDiagnostic
	if !tx.suppressNewDiagnosticContexts {
		oldDiag = tx.state.getSymbolAccessibilityDiagnostic
		if canProduceDiagnostics(node) {
			tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node)
		}
	}
	var typeNode *ast.Node

	if hasInferredType(node) {
		typeNode = tx.resolver.CreateTypeOfDeclaration(tx.EmitContext(), node, tx.enclosingDeclaration, declarationEmitNodeBuilderFlags, declarationEmitInternalNodeBuilderFlags, tx.tracker)
	} else if ast.IsFunctionLike(node) {
		typeNode = tx.resolver.CreateReturnTypeOfSignatureDeclaration(tx.EmitContext(), node, tx.enclosingDeclaration, declarationEmitNodeBuilderFlags, declarationEmitInternalNodeBuilderFlags, tx.tracker)
	} else {
		debug.AssertNever(node)
	}

	tx.state.errorNameNode = oldErrorNameNode
	if !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	}
	if typeNode == nil {
		return tx.Factory().NewKeywordTypeNode(ast.KindAnyKeyword)
	}
	return typeNode
}

func (tx *DeclarationTransformer) shouldPrintWithInitializer(node *ast.Node) bool {
	return canHaveLiteralInitializer(tx.host, node) && node.Initializer() != nil && tx.resolver.IsLiteralConstDeclaration(tx.EmitContext().MostOriginal(node))
}

func (tx *DeclarationTransformer) checkEntityNameVisibility(entityName *ast.Node, enclosingDeclaration *ast.Node) {
	visibilityResult := tx.resolver.IsEntityNameVisible(entityName, enclosingDeclaration)
	tx.tracker.handleSymbolAccessibilityError(visibilityResult)
}

// Transforms the direct child of a source file into zero or more replacement statements
func (tx *DeclarationTransformer) transformTopLevelDeclaration(input *ast.Node) *ast.Node {
	if len(tx.state.lateMarkedStatements) > 0 {
		// Remove duplicates of the current statement from the deferred work queue (this was done via orderedRemoveItem in strada - why? to ensure the same backing array? microop?)
		tx.state.lateMarkedStatements = core.Filter(tx.state.lateMarkedStatements, func(node *ast.Node) bool { return node != input })
	}
	// !!! TODO: stripInternal support?
	// if (shouldStripInternal(input)) return;
	if input.Kind == ast.KindImportEqualsDeclaration {
		return tx.transformImportEqualsDeclaration(input.AsImportEqualsDeclaration())
	}
	if input.Kind == ast.KindImportDeclaration || input.Kind == ast.KindJSImportDeclaration {
		res := tx.transformImportDeclaration(input.AsImportDeclaration())
		if res != nil && res.Kind != ast.KindImportDeclaration {
			res := res.Clone(tx.Factory())
			res.Kind = ast.KindImportDeclaration
			return res
		}
		return res
	}
	if ast.IsDeclaration(input) && isDeclarationAndNotVisible(tx.EmitContext(), tx.resolver, input) {
		return nil
	}

	// !!! TODO: JSDoc support
	// if (isJSDocImportTag(input)) return;

	// Elide implementation signatures from overload sets
	if ast.IsFunctionLike(input) && tx.resolver.IsImplementationOfOverload(input) {
		return nil
	}
	previousEnclosingDeclaration := tx.enclosingDeclaration
	if isEnclosingDeclaration(input) {
		tx.enclosingDeclaration = input
	}

	canProdiceDiagnostic := canProduceDiagnostics(input)
	oldDiag := tx.state.getSymbolAccessibilityDiagnostic
	oldName := tx.state.errorNameNode
	if canProdiceDiagnostic {
		tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input)
	}
	previousNeedsDeclare := tx.needsDeclare

	var result *ast.Node
	switch input.Kind {
	case ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration:
		result = tx.transformTypeAliasDeclaration(input.AsTypeAliasDeclaration())
	case ast.KindInterfaceDeclaration:
		result = tx.transformInterfaceDeclaration(input.AsInterfaceDeclaration())
	case ast.KindFunctionDeclaration:
		result = tx.transformFunctionDeclaration(input.AsFunctionDeclaration())
	case ast.KindModuleDeclaration:
		result = tx.transformModuleDeclaration(input.AsModuleDeclaration())
	case ast.KindClassDeclaration:
		result = tx.transformClassDeclaration(input.AsClassDeclaration())
	case ast.KindVariableStatement:
		result = tx.transformVariableStatement(input.AsVariableStatement())
	case ast.KindEnumDeclaration:
		result = tx.transformEnumDeclaration(input.AsEnumDeclaration())
	default:
		// Anything left unhandled is an error, so this should be unreachable
		panic(fmt.Sprintf("Unhandled top-level node in declaration emit: %q", input.Kind))
	}

	tx.enclosingDeclaration = previousEnclosingDeclaration
	tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	tx.needsDeclare = previousNeedsDeclare
	tx.state.errorNameNode = oldName
	return result
}

func (tx *DeclarationTransformer) transformTypeAliasDeclaration(input *ast.TypeAliasDeclaration) *ast.Node {
	tx.needsDeclare = false
	return tx.Factory().UpdateTypeAliasDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		tx.Visitor().VisitNodes(input.TypeParameters),
		tx.Visitor().Visit(input.Type),
	)
}

func (tx *DeclarationTransformer) transformInterfaceDeclaration(input *ast.InterfaceDeclaration) *ast.Node {
	return tx.Factory().UpdateInterfaceDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		tx.Visitor().VisitNodes(input.TypeParameters),
		tx.Visitor().VisitNodes(input.HeritageClauses),
		tx.Visitor().VisitNodes(input.Members),
	)
}

func (tx *DeclarationTransformer) transformFunctionDeclaration(input *ast.FunctionDeclaration) *ast.Node {
	updated := tx.Factory().UpdateFunctionDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		nil,
		input.Name(),
		tx.ensureTypeParams(input.AsNode(), input.TypeParameters),
		tx.updateParamList(input.AsNode(), input.Parameters),
		tx.ensureType(input.AsNode(), false),
		nil, /*fullSignature*/
		nil,
	)
	if updated == nil || !tx.resolver.IsExpandoFunctionDeclaration(input.AsNode()) || !shouldEmitFunctionProperties(input) {
		return updated
	}
	// Add expando function properties to result

	// !!! TODO: expando function support
	// props := tx.resolver.GetPropertiesOfContainerFunction(input)
	// if tx.state.isolatedDeclarations {
	// 	tx.state.reportExpandoFunctionErrors(input.AsNode())
	// }
	return updated // !!!
}

func (tx *DeclarationTransformer) transformModuleDeclaration(input *ast.ModuleDeclaration) *ast.Node {
	// !!! TODO: module declarations are now parsed into nested module objects with export modifiers
	// It'd be good to collapse those back in the declaration output, but the AST can't represent the
	// `namespace a.b.c` shape for the printer (without using invalid identifier names).
	mods := tx.ensureModifiers(input.AsNode())
	oldNeedsDeclare := tx.needsDeclare
	tx.needsDeclare = false
	inner := input.Body
	keyword := input.Keyword
	if keyword != ast.KindGlobalKeyword && (input.Name() == nil || !ast.IsStringLiteral(input.Name())) {
		keyword = ast.KindNamespaceKeyword
	}

	if inner != nil && inner.Kind == ast.KindModuleBlock {
		oldNeedsScopeFix := tx.needsScopeFixMarker
		oldHasScopeFix := tx.resultHasScopeMarker
		tx.resultHasScopeMarker = false
		tx.needsScopeFixMarker = false
		statements := tx.Visitor().VisitNodes(inner.AsModuleBlock().Statements)
		lateStatements := tx.transformAndReplaceLatePaintedStatements(statements)
		if input.Flags&ast.NodeFlagsAmbient != 0 {
			tx.needsScopeFixMarker = false // If it was `declare`'d everything is implicitly exported already, ignore late printed "privates"
		}
		// With the final list of statements, there are 3 possibilities:
		// 1. There's an export assignment or export declaration in the namespace - do nothing
		// 2. Everything is exported and there are no export assignments or export declarations - strip all export modifiers
		// 3. Some things are exported, some are not, and there's no marker - add an empty marker
		if !ast.IsGlobalScopeAugmentation(input.AsNode()) && !tx.resultHasScopeMarker && !hasScopeMarker(lateStatements) {
			if tx.needsScopeFixMarker {
				lateStatements = tx.Factory().NewNodeList(append(lateStatements.Nodes, createEmptyExports(tx.Factory().AsNodeFactory())))
			} else {
				lateStatements = tx.EmitContext().NewNodeVisitor(tx.stripExportModifiers).VisitNodes(lateStatements)
			}
		}

		body := tx.Factory().UpdateModuleBlock(inner.AsModuleBlock(), lateStatements)
		tx.needsDeclare = oldNeedsDeclare
		tx.needsScopeFixMarker = oldNeedsScopeFix
		tx.resultHasScopeMarker = oldHasScopeFix

		return tx.Factory().UpdateModuleDeclaration(
			input,
			mods,
			keyword,
			input.Name(),
			body,
		)
	}
	if inner != nil {
		// trigger visit. ignore result (is deferred, so is just inner unless elided)
		tx.Visitor().Visit(inner)
		// eagerly transform nested namespaces (the nesting doesn't need any elision or painting done)
		original := tx.EmitContext().MostOriginal(inner)
		id := ast.GetNodeId(original)
		body, _ := tx.lateStatementReplacementMap[id]
		delete(tx.lateStatementReplacementMap, id)
		return tx.Factory().UpdateModuleDeclaration(
			input,
			mods,
			keyword,
			input.Name(),
			body,
		)
	}
	return tx.Factory().UpdateModuleDeclaration(
		input,
		mods,
		keyword,
		input.Name(),
		nil,
	)
}

func (tx *DeclarationTransformer) stripExportModifiers(statement *ast.Node) *ast.Node {
	if statement == nil {
		return nil
	}
	if ast.IsImportEqualsDeclaration(statement) || tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(statement), ast.ModifierFlagsDefault) != 0 || !ast.CanHaveModifiers(statement) {
		// `export import` statements should remain as-is, as imports are _not_ implicitly exported in an ambient namespace
		// Likewise, `export default` classes and the like and just be `default`, so we preserve their `export` modifiers, too
		return statement
	}

	oldFlags := ast.GetCombinedModifierFlags(statement)
	if oldFlags&ast.ModifierFlagsExport == 0 {
		return statement
	}
	newFlags := oldFlags & (ast.ModifierFlagsAll ^ ast.ModifierFlagsExport)
	modifiers := ast.CreateModifiersFromModifierFlags(newFlags, tx.Factory().NewModifier)
	return ast.ReplaceModifiers(tx.Factory().AsNodeFactory(), statement, tx.Factory().NewModifierList(modifiers))
}

func (tx *DeclarationTransformer) transformClassDeclaration(input *ast.ClassDeclaration) *ast.Node {
	tx.state.errorNameNode = input.Name()
	tx.tracker.PushErrorFallbackNode(input.AsNode())
	defer tx.tracker.PopErrorFallbackNode()

	modifiers := tx.ensureModifiers(input.AsNode())
	typeParameters := tx.ensureTypeParams(input.AsNode(), input.TypeParameters)
	ctor := getFirstConstructorWithBody(input.AsNode())
	var parameterProperties []*ast.Node
	if ctor != nil {
		oldDiag := tx.state.getSymbolAccessibilityDiagnostic
		for _, param := range ctor.AsConstructorDeclaration().Parameters.Nodes {
			if !ast.HasSyntacticModifier(param, ast.ModifierFlagsParameterPropertyModifier) {
				continue
			}
			// !!! TODO: stripInternal support?
			// if (shouldStripInternal(param)) { continue }
			tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param)
			if param.Name().Kind == ast.KindIdentifier {
				updated := tx.Factory().NewPropertyDeclaration(
					tx.ensureModifiers(param),
					param.Name(),
					param.AsParameterDeclaration().QuestionToken,
					tx.ensureType(param, false),
					tx.ensureNoInitializer(param),
				)
				tx.preserveJsDoc(updated, param)
				parameterProperties = append(parameterProperties, updated)
			} else {
				// Pattern - this is currently an error, but we emit declarations for it somewhat correctly
				// !!! is this worth reimplementing? We never made it not-an-error
			}
		}
		tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	}

	// When the class has at least one private identifier, create a unique constant identifier to retain the nominal typing behavior
	// Prevents other classes with the same public members from being used in place of the current class
	var privateIdentifier *ast.Node
	if core.Some(input.Members.Nodes, func(member *ast.Node) bool { return member.Name() != nil && ast.IsPrivateIdentifier(member.Name()) }) {
		privateIdentifier = tx.Factory().NewPropertyDeclaration(
			nil,
			tx.Factory().NewPrivateIdentifier("#private"),
			nil,
			nil,
			nil,
		)
	}

	lateIndexes := tx.resolver.CreateLateBoundIndexSignatures(
		tx.EmitContext(),
		input.AsNode(),
		tx.enclosingDeclaration,
		declarationEmitNodeBuilderFlags,
		declarationEmitInternalNodeBuilderFlags,
		tx.tracker,
	)

	memberNodes := make([]*ast.Node, 0, len(input.Members.Nodes))
	if privateIdentifier != nil {
		memberNodes = append(memberNodes, privateIdentifier)
	}
	memberNodes = append(memberNodes, lateIndexes...)
	memberNodes = append(memberNodes, parameterProperties...)
	visitResult := tx.Visitor().VisitNodes(input.Members)
	if visitResult != nil && len(visitResult.Nodes) > 0 {
		memberNodes = append(memberNodes, visitResult.Nodes...)
	}
	members := tx.Factory().NewNodeList(memberNodes)

	extendsClause := getEffectiveBaseTypeNode(input.AsNode())

	if extendsClause != nil && !ast.IsEntityNameExpression(extendsClause.AsExpressionWithTypeArguments().Expression) && extendsClause.AsExpressionWithTypeArguments().Expression.Kind != ast.KindNullKeyword {
		oldId := "default"
		if ast.NodeIsPresent(input.Name()) && ast.IsIdentifier(input.Name()) && len(input.Name().AsIdentifier().Text) > 0 {
			oldId = input.Name().AsIdentifier().Text
		}
		newId := tx.Factory().NewUniqueNameEx(oldId+"_base", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
		tx.state.getSymbolAccessibilityDiagnostic = func(_ printer.SymbolAccessibilityResult) *SymbolAccessibilityDiagnostic {
			return &SymbolAccessibilityDiagnostic{
				diagnosticMessage: diagnostics.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
				errorNode:         extendsClause,
				typeName:          input.Name(),
			}
		}

		varDecl := tx.Factory().NewVariableDeclaration(
			newId,
			nil,
			tx.resolver.CreateTypeOfExpression(tx.EmitContext(), extendsClause.Expression(), input.AsNode(), declarationEmitNodeBuilderFlags, declarationEmitInternalNodeBuilderFlags, tx.tracker),
			nil,
		)
		var mods *ast.ModifierList
		if tx.needsDeclare {
			mods = tx.Factory().NewModifierList([]*ast.Node{tx.Factory().NewModifier(ast.KindDeclareKeyword)})
		}
		statement := tx.Factory().NewVariableStatement(
			mods,
			tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList([]*ast.Node{varDecl})),
		)
		newHeritageClause := tx.Factory().UpdateHeritageClause(
			extendsClause.Parent.AsHeritageClause(),
			tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().UpdateExpressionWithTypeArguments(
					extendsClause.AsExpressionWithTypeArguments(),
					newId,
					tx.Visitor().VisitNodes(extendsClause.AsExpressionWithTypeArguments().TypeArguments),
				),
			}),
		)
		retainedHeritageClauses := tx.Visitor().VisitNodes(input.HeritageClauses) // should just be `implements`
		heritageList := []*ast.Node{
			newHeritageClause,
		}
		if retainedHeritageClauses != nil && len(retainedHeritageClauses.Nodes) > 0 {
			heritageList = append(heritageList, retainedHeritageClauses.Nodes...)
		}
		heritageClauses := tx.Factory().NewNodeList(heritageList)

		return tx.Factory().NewSyntaxList([]*ast.Node{
			statement,
			tx.Factory().UpdateClassDeclaration(
				input,
				modifiers,
				input.Name(),
				typeParameters,
				heritageClauses,
				members,
			),
		})
	}

	return tx.Factory().UpdateClassDeclaration(
		input,
		modifiers,
		input.Name(),
		typeParameters,
		tx.Visitor().VisitNodes(input.HeritageClauses),
		members,
	)
}

func (tx *DeclarationTransformer) transformVariableStatement(input *ast.VariableStatement) *ast.Node {
	visible := false
	for _, decl := range input.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
		visible = getBindingNameVisible(tx.resolver, decl)
		if visible {
			break
		}
	}
	if !visible {
		return nil
	}

	nodes := tx.Visitor().VisitNodes(input.DeclarationList.AsVariableDeclarationList().Declarations)
	if nodes != nil && len(nodes.Nodes) == 0 {
		return nil
	}

	modifiers := tx.ensureModifiers(input.AsNode())

	var declList *ast.Node
	if ast.IsVarUsing(input.DeclarationList) || ast.IsVarAwaitUsing(input.DeclarationList) {
		declList = tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, nodes)
		tx.EmitContext().SetOriginal(declList, input.DeclarationList)
		tx.EmitContext().SetCommentRange(declList, input.DeclarationList.Loc)
		declList.Loc = input.DeclarationList.Loc
	} else {
		declList = tx.Factory().UpdateVariableDeclarationList(input.DeclarationList.AsVariableDeclarationList(), nodes)
	}
	return tx.Factory().UpdateVariableStatement(input, modifiers, declList)
}

func (tx *DeclarationTransformer) transformEnumDeclaration(input *ast.EnumDeclaration) *ast.Node {
	return tx.Factory().UpdateEnumDeclaration(
		input,
		tx.ensureModifiers(input.AsNode()),
		input.Name(),
		tx.Factory().NewNodeList(core.MapNonNil(input.Members.Nodes, func(m *ast.Node) *ast.Node {
			// !!! TODO: stripInternal support?
			// if (shouldStripInternal(m)) return;

			// !!! TODO: isolatedDeclarations support
			// if (
			// 	isolatedDeclarations && m.initializer && enumValue?.hasExternalReferences &&
			// 	// This will be its own compiler error instead, so don't report.
			// 	!isComputedPropertyName(m.name)
			// ) {
			// 	context.addDiagnostic(createDiagnosticForNode(m, Diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations));
			// }

			// Rewrite enum values to their constants, if available
			enumValue := tx.resolver.GetEnumMemberValue(m)
			var newInitializer *ast.Node
			switch value := enumValue.Value.(type) {
			case jsnum.Number:
				if value >= 0 {
					newInitializer = tx.Factory().NewNumericLiteral(value.String())
				} else {
					newInitializer = tx.Factory().NewPrefixUnaryExpression(
						ast.KindMinusToken,
						tx.Factory().NewNumericLiteral((-value).String()),
					)
				}
			case string:
				newInitializer = tx.Factory().NewStringLiteral(value)
			default:
				// nil
				newInitializer = nil
			}
			result := tx.Factory().UpdateEnumMember(m.AsEnumMember(), m.Name(), newInitializer)
			tx.preserveJsDoc(result, m)
			return result
		})),
	)
}

func (tx *DeclarationTransformer) ensureModifiers(node *ast.Node) *ast.ModifierList {
	currentFlags := tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(node), ast.ModifierFlagsAll)
	newFlags := tx.ensureModifierFlags(node)
	if currentFlags == newFlags {
		// Elide decorators
		mods := node.Modifiers()
		if mods == nil {
			return mods
		}
		return tx.Factory().NewModifierList(core.Filter(mods.Nodes, ast.IsModifier))
	}
	result := ast.CreateModifiersFromModifierFlags(newFlags, tx.Factory().NewModifier)
	if len(result) == 0 {
		return nil
	}
	return tx.Factory().NewModifierList(result)
}

func (tx *DeclarationTransformer) ensureModifierFlags(node *ast.Node) ast.ModifierFlags {
	mask := ast.ModifierFlagsAll ^ (ast.ModifierFlagsPublic | ast.ModifierFlagsAsync | ast.ModifierFlagsOverride) // No async and override modifiers in declaration files
	additions := ast.ModifierFlagsNone
	if tx.needsDeclare && !isAlwaysType(node) {
		additions = ast.ModifierFlagsAmbient
	}
	parentIsFile := node.Parent.Kind == ast.KindSourceFile
	if !parentIsFile || (tx.isBundledEmit && parentIsFile && ast.IsExternalModule(node.Parent.AsSourceFile())) {
		mask ^= ast.ModifierFlagsAmbient
		additions = ast.ModifierFlagsNone
	}
	return maskModifierFlags(tx.host, node, mask, additions)
}

func (tx *DeclarationTransformer) ensureTypeParams(node *ast.Node, params *ast.TypeParameterList) *ast.TypeParameterList {
	if tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(node), ast.ModifierFlagsPrivate) != 0 {
		return nil
	}
	var typeParameters *ast.TypeParameterList
	if typeParameters = tx.Visitor().VisitNodes(params); typeParameters != nil {
		return typeParameters
	}
	oldErrorNameNode := tx.state.errorNameNode
	tx.state.errorNameNode = node.Name()
	var oldDiag GetSymbolAccessibilityDiagnostic
	if !tx.suppressNewDiagnosticContexts {
		oldDiag = tx.state.getSymbolAccessibilityDiagnostic
		if canProduceDiagnostics(node) {
			tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node)
		}
	}

	if data := node.FunctionLikeData(); data != nil && data.FullSignature != nil {
		if nodes := tx.resolver.CreateTypeParametersOfSignatureDeclaration(tx.EmitContext(), node, tx.enclosingDeclaration, declarationEmitNodeBuilderFlags, declarationEmitInternalNodeBuilderFlags, tx.tracker); nodes != nil {
			typeParameters = &ast.TypeParameterList{
				Loc:   node.Loc,
				Nodes: nodes,
			}
		}
	}

	tx.state.errorNameNode = oldErrorNameNode
	if !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	}
	return typeParameters
}

func (tx *DeclarationTransformer) updateParamList(node *ast.Node, params *ast.ParameterList) *ast.ParameterList {
	if tx.host.GetEffectiveDeclarationFlags(tx.EmitContext().ParseNode(node), ast.ModifierFlagsPrivate) != 0 || len(params.Nodes) == 0 {
		return tx.Factory().NewNodeList([]*ast.Node{})
	}
	results := make([]*ast.Node, len(params.Nodes))
	for i, p := range params.Nodes {
		results[i] = tx.ensureParameter(p.AsParameterDeclaration())
	}
	return tx.Factory().NewNodeList(results)
}

func (tx *DeclarationTransformer) ensureParameter(p *ast.ParameterDeclaration) *ast.Node {
	oldDiag := tx.state.getSymbolAccessibilityDiagnostic
	if !tx.suppressNewDiagnosticContexts {
		tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p.AsNode())
	}
	var questionToken *ast.TokenNode
	if tx.resolver.IsOptionalParameter(p.AsNode()) {
		if p.QuestionToken != nil {
			questionToken = p.QuestionToken
		} else {
			questionToken = tx.Factory().NewToken(ast.KindQuestionToken)
		}
	}
	result := tx.Factory().UpdateParameterDeclaration(
		p,
		nil,
		p.DotDotDotToken,
		tx.filterBindingPatternInitializers(p.Name()),
		questionToken,
		tx.ensureType(p.AsNode(), true),
		tx.ensureNoInitializer(p.AsNode()),
	)
	tx.state.getSymbolAccessibilityDiagnostic = oldDiag
	return result
}

func (tx *DeclarationTransformer) ensureNoInitializer(node *ast.Node) *ast.Node {
	if tx.shouldPrintWithInitializer(node) {
		unwrappedInitializer := unwrapParenthesizedExpression(node.Initializer())
		if !isPrimitiveLiteralValue(unwrappedInitializer, true) {
			tx.tracker.ReportInferenceFallback(node)
		}
		return tx.resolver.CreateLiteralConstValue(tx.EmitContext(), tx.EmitContext().ParseNode(node), tx.tracker)
	}
	return nil
}

func (tx *DeclarationTransformer) filterBindingPatternInitializers(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindIdentifier {
		return node
	} else {
		// TODO: visitor to avoid always making new nodes?
		elements := make([]*ast.Node, 0, len(node.AsBindingPattern().Elements.Nodes))
		for _, elem := range node.AsBindingPattern().Elements.Nodes {
			if elem.Kind == ast.KindOmittedExpression {
				elements = append(elements, elem)
				continue
			}
			if elem.PropertyName() != nil && ast.IsComputedPropertyName(elem.PropertyName()) && ast.IsEntityNameExpression(elem.PropertyName().Expression()) {
				tx.checkEntityNameVisibility(elem.PropertyName().Expression(), tx.enclosingDeclaration)
			}
			if elem.Name() == nil {
				elements = append(elements, elem)
				continue
			}

			elements = append(elements, tx.Factory().UpdateBindingElement(
				elem.AsBindingElement(),
				elem.AsBindingElement().DotDotDotToken,
				elem.PropertyName(),
				tx.filterBindingPatternInitializers(elem.Name()),
				nil,
			))
		}
		elemList := tx.Factory().NewNodeList(elements)
		return tx.Factory().UpdateBindingPattern(node.AsBindingPattern(), elemList)
	}
}

func (tx *DeclarationTransformer) transformImportEqualsDeclaration(decl *ast.ImportEqualsDeclaration) *ast.Node {
	if !tx.resolver.IsDeclarationVisible(decl.AsNode()) {
		return nil
	}
	if decl.ModuleReference.Kind == ast.KindExternalModuleReference {
		// Rewrite external module names if necessary
		specifier := ast.GetExternalModuleImportEqualsDeclarationExpression(decl.AsNode())
		return tx.Factory().UpdateImportEqualsDeclaration(
			decl,
			decl.Modifiers(),
			decl.IsTypeOnly,
			decl.Name(),
			tx.Factory().UpdateExternalModuleReference(decl.ModuleReference.AsExternalModuleReference(), tx.rewriteModuleSpecifier(decl.AsNode(), specifier)),
		)
	} else {
		oldDiag := tx.state.getSymbolAccessibilityDiagnostic
		tx.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl.AsNode())
		tx.checkEntityNameVisibility(decl.ModuleReference, tx.enclosingDeclaration)
		tx.state.getSymbolAccessibilityDiagnostic = oldDiag
		return decl.AsNode()
	}
}

func (tx *DeclarationTransformer) transformImportDeclaration(decl *ast.ImportDeclaration) *ast.Node {
	if decl.ImportClause == nil {
		// import "mod" - possibly needed for side effects? (global interface patches, module augmentations, etc)
		return tx.Factory().UpdateImportDeclaration(
			decl,
			decl.Modifiers(),
			decl.ImportClause,
			tx.rewriteModuleSpecifier(decl.AsNode(), decl.ModuleSpecifier),
			tx.tryGetResolutionModeOverride(decl.Attributes),
		)
	}
	phaseModifier := decl.ImportClause.AsImportClause().PhaseModifier
	if phaseModifier == ast.KindDeferKeyword {
		phaseModifier = ast.KindUnknown
	}
	// The `importClause` visibility corresponds to the default's visibility.
	var visibleDefaultBinding *ast.Node
	if decl.ImportClause != nil && decl.ImportClause.Name() != nil && tx.resolver.IsDeclarationVisible(decl.ImportClause) {
		visibleDefaultBinding = decl.ImportClause.Name()
	}
	if decl.ImportClause.AsImportClause().NamedBindings == nil {
		// No named bindings (either namespace or list), meaning the import is just default or should be elided
		if visibleDefaultBinding == nil {
			return nil
		}
		return tx.Factory().UpdateImportDeclaration(
			decl,
			decl.Modifiers(),
			tx.Factory().UpdateImportClause(
				decl.ImportClause.AsImportClause(),
				phaseModifier,
				visibleDefaultBinding,
				/*namedBindings*/ nil,
			),
			tx.rewriteModuleSpecifier(decl.AsNode(), decl.ModuleSpecifier),
			tx.tryGetResolutionModeOverride(decl.Attributes),
		)
	}
	if decl.ImportClause.AsImportClause().NamedBindings.Kind == ast.KindNamespaceImport {
		// Namespace import (optionally with visible default)
		var namedBindings *ast.Node
		if tx.resolver.IsDeclarationVisible(decl.ImportClause.AsImportClause().NamedBindings) {
			namedBindings = decl.ImportClause.AsImportClause().NamedBindings
		}
		if visibleDefaultBinding == nil && namedBindings == nil {
			return nil
		}
		return tx.Factory().UpdateImportDeclaration(
			decl,
			decl.Modifiers(),
			tx.Factory().UpdateImportClause(
				decl.ImportClause.AsImportClause(),
				phaseModifier,
				visibleDefaultBinding,
				namedBindings,
			),
			tx.rewriteModuleSpecifier(decl.AsNode(), decl.ModuleSpecifier),
			tx.tryGetResolutionModeOverride(decl.Attributes),
		)
	}
	// Named imports (optionally with visible default)
	bindingList := core.Filter(
		decl.ImportClause.AsImportClause().NamedBindings.AsNamedImports().Elements.Nodes,
		func(b *ast.Node) bool {
			return tx.resolver.IsDeclarationVisible(b)
		},
	)
	if len(bindingList) > 0 || visibleDefaultBinding != nil {
		var namedImports *ast.Node
		if len(bindingList) > 0 {
			namedImports = tx.Factory().UpdateNamedImports(
				decl.ImportClause.AsImportClause().NamedBindings.AsNamedImports(),
				tx.Factory().NewNodeList(bindingList),
			)
		}
		return tx.Factory().UpdateImportDeclaration(
			decl,
			decl.Modifiers(),
			tx.Factory().UpdateImportClause(
				decl.ImportClause.AsImportClause(),
				phaseModifier,
				visibleDefaultBinding,
				namedImports,
			),
			tx.rewriteModuleSpecifier(decl.AsNode(), decl.ModuleSpecifier),
			tx.tryGetResolutionModeOverride(decl.Attributes),
		)
	}
	// Augmentation of export depends on import
	if tx.resolver.IsImportRequiredByAugmentation(decl) {
		// IsolatedDeclarations support
		// if (isolatedDeclarations) {
		// 	context.addDiagnostic(createDiagnosticForNode(decl, Diagnostics.Declaration_emit_for_this_file_requires_preserving_this_import_for_augmentations_This_is_not_supported_with_isolatedDeclarations));
		// }
		return tx.Factory().UpdateImportDeclaration(
			decl,
			decl.Modifiers(),
			/*importClause*/ nil,
			tx.rewriteModuleSpecifier(decl.AsNode(), decl.ModuleSpecifier),
			tx.tryGetResolutionModeOverride(decl.Attributes),
		)
	}
	// Nothing visible
	return nil
}

func (tx *DeclarationTransformer) transformJSDocTypeExpression(input *ast.JSDocTypeExpression) *ast.Node {
	return tx.Visitor().Visit(input.Type)
}

func (tx *DeclarationTransformer) transformJSDocTypeLiteral(input *ast.JSDocTypeLiteral) *ast.Node {
	members, _ := tx.Visitor().VisitSlice(input.JSDocPropertyTags)
	replacement := tx.Factory().NewTypeLiteralNode(tx.Factory().NewNodeList(members))
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

func (tx *DeclarationTransformer) transformJSDocPropertyTag(input *ast.JSDocPropertyTag) *ast.Node {
	replacement := tx.Factory().NewPropertySignatureDeclaration(
		nil,
		tx.Visitor().Visit(input.TagName),
		nil,
		tx.Visitor().Visit(input.TypeExpression),
		nil,
	)
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

func (tx *DeclarationTransformer) transformJSDocAllType(input *ast.JSDocAllType) *ast.Node {
	replacement := tx.Factory().NewKeywordTypeNode(ast.KindAnyKeyword)
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

func (tx *DeclarationTransformer) transformJSDocNullableType(input *ast.JSDocNullableType) *ast.Node {
	replacement := tx.Factory().NewUnionTypeNode(tx.Factory().NewNodeList([]*ast.Node{
		tx.Visitor().Visit(input.Type),
		tx.Factory().NewLiteralTypeNode(tx.Factory().NewKeywordExpression(ast.KindNullKeyword)),
	}))
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

func (tx *DeclarationTransformer) transformJSDocNonNullableType(input *ast.JSDocNonNullableType) *ast.Node {
	return tx.Visitor().Visit(input.Type)
}

func (tx *DeclarationTransformer) transformJSDocVariadicType(input *ast.JSDocVariadicType) *ast.Node {
	replacement := tx.Factory().NewArrayTypeNode(tx.Visitor().Visit(input.Type))
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

func (tx *DeclarationTransformer) transformJSDocOptionalType(input *ast.JSDocOptionalType) *ast.Node {
	replacement := tx.Factory().NewUnionTypeNode(tx.Factory().NewNodeList([]*ast.Node{
		tx.Visitor().Visit(input.Type),
		tx.Factory().NewKeywordTypeNode(ast.KindUndefinedKeyword),
	}))
	tx.EmitContext().SetOriginal(replacement, input.AsNode())
	return replacement
}

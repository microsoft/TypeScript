package ls

import (
	"context"
	"strconv"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

var isolatedDeclarationsFixErrorCodes = []int32{
	diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations.Code(),
	diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations.Code(),
	diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations.Code(),
	diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations.Code(),
	diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations.Code(),
	diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations.Code(),
	diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function.Code(),
	diagnostics.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_supported_with_isolatedDeclarations.Code(),
	diagnostics.Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations.Code(),
	diagnostics.Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit.Code(),
}

const fixMissingTypeAnnotationOnExportsFixID = "fixMissingTypeAnnotationOnExports"

// IsolatedDeclarationsFixProvider is the CodeFixProvider for isolatedDeclarations-related type annotation fixes.
var IsolatedDeclarationsFixProvider = &CodeFixProvider{
	ErrorCodes:        isolatedDeclarationsFixErrorCodes,
	GetCodeActions:    getIsolatedDeclarationsCodeActions,
	FixIds:            []string{fixMissingTypeAnnotationOnExportsFixID},
	GetAllCodeActions: getAllIsolatedDeclarationsCodeActions,
}

// canHaveTypeAnnotationKinds are the node kinds that can have type annotations added.
var canHaveTypeAnnotationKinds = map[ast.Kind]bool{
	ast.KindGetAccessor:          true,
	ast.KindMethodDeclaration:    true,
	ast.KindPropertyDeclaration:  true,
	ast.KindFunctionDeclaration:  true,
	ast.KindFunctionExpression:   true,
	ast.KindArrowFunction:        true,
	ast.KindVariableDeclaration:  true,
	ast.KindParameter:            true,
	ast.KindExportAssignment:     true,
	ast.KindClassDeclaration:     true,
	ast.KindObjectBindingPattern: true,
	ast.KindArrayBindingPattern:  true,
}

// declarationEmitNodeBuilderFlags are the node builder flags used for declaration emit.
var declarationEmitNodeBuilderFlags = nodebuilder.FlagsMultilineObjectLiterals |
	nodebuilder.FlagsWriteClassExpressionAsTypeLiteral |
	nodebuilder.FlagsUseTypeOfFunction |
	nodebuilder.FlagsUseStructuralFallback |
	nodebuilder.FlagsAllowEmptyTuple |
	nodebuilder.FlagsGenerateNamesForShadowedTypeParams |
	nodebuilder.FlagsNoTruncation

type typePrintMode int

const (
	typePrintModeFull     typePrintMode = iota
	typePrintModeRelative               // typeof X
	typePrintModeWidened                // widened literal type
)

func getIsolatedDeclarationsCodeActions(ctx context.Context, fixContext *CodeFixContext) ([]CodeAction, error) {
	ch, done := fixContext.Program.GetTypeCheckerForFile(ctx, fixContext.SourceFile)
	defer done()

	var fixes []CodeAction

	// Match TS ordering: Full annotation, Relative annotation, Widened annotation,
	// Full inline, Relative inline, Widened inline, Full extract
	modes := []typePrintMode{typePrintModeFull, typePrintModeRelative, typePrintModeWidened}

	for _, mode := range modes {
		if action := tryCodeAction(ctx, fixContext, ch, func(f *isolatedDeclarationsFixer) string {
			f.typePrintMode = mode
			return f.addTypeAnnotation(fixContext.Span)
		}); action != nil {
			fixes = append(fixes, *action)
		}
	}

	for _, mode := range modes {
		if action := tryCodeAction(ctx, fixContext, ch, func(f *isolatedDeclarationsFixer) string {
			f.typePrintMode = mode
			return f.addInlineAssertion(fixContext.Span)
		}); action != nil {
			fixes = append(fixes, *action)
		}
	}

	// extractAsVariable only in Full mode
	if action := tryCodeAction(ctx, fixContext, ch, func(f *isolatedDeclarationsFixer) string {
		f.typePrintMode = typePrintModeFull
		return f.extractAsVariable(fixContext.Span)
	}); action != nil {
		fixes = append(fixes, *action)
	}

	return fixes, nil
}

func getAllIsolatedDeclarationsCodeActions(ctx context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error) {
	ch, done := fixContext.Program.GetTypeCheckerForFile(ctx, fixContext.SourceFile)
	defer done()

	changeTracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)

	fixer := &isolatedDeclarationsFixer{
		sourceFile:    fixContext.SourceFile,
		program:       fixContext.Program,
		checker:       ch,
		changeTracker: changeTracker,
		locale:        locale.FromContext(ctx),
		fixedNodes:    make(map[*ast.Node]bool),
		typePrintMode: typePrintModeFull,
	}

	allDiags := getAllDiagnostics(ctx, fixContext.Program, fixContext.SourceFile)
	for _, diag := range allDiags {
		if containsErrorCode(isolatedDeclarationsFixErrorCodes, diag.Code()) {
			span := core.NewTextRange(diag.Loc().Pos(), diag.Loc().End())
			fixer.addTypeAnnotation(span)
		}
	}

	for _, sym := range fixer.symbolsToImport {
		fixer.addSymbolToExistingImport(sym)
	}

	changes := changeTracker.GetChanges()
	fileChanges := changes[fixContext.SourceFile.FileName()]
	if len(fileChanges) == 0 {
		return nil, nil
	}

	return &CombinedCodeActions{
		Description: diagnostics.Add_all_missing_type_annotations.Localize(locale.FromContext(ctx)),
		Changes:     fileChanges,
	}, nil
}

func tryCodeAction(ctx context.Context, fixContext *CodeFixContext, ch *checker.Checker, fn func(*isolatedDeclarationsFixer) string) *CodeAction {
	changeTracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)

	var importAdder autoimport.ImportAdder
	// importAdder may be nil if the auto-import registry is not available;
	// type node transformation still works without it, just without adding imports.

	fixer := &isolatedDeclarationsFixer{
		sourceFile:    fixContext.SourceFile,
		program:       fixContext.Program,
		checker:       ch,
		changeTracker: changeTracker,
		importAdder:   importAdder,
		locale:        locale.FromContext(ctx),
		fixedNodes:    make(map[*ast.Node]bool),
	}

	description := fn(fixer)
	if description == "" {
		return nil
	}

	// Add any symbols that need to be imported to existing import declarations
	for _, sym := range fixer.symbolsToImport {
		fixer.addSymbolToExistingImport(sym)
	}

	changes := changeTracker.GetChanges()
	fileChanges := changes[fixContext.SourceFile.FileName()]

	// Add import edits if import adder has fixes
	if importAdder != nil && importAdder.HasFixes() {
		fileChanges = append(fileChanges, importAdder.Edits()...)
	}

	if len(fileChanges) == 0 {
		return nil
	}

	return &CodeAction{
		Description:       description,
		Changes:           fileChanges,
		FixID:             fixMissingTypeAnnotationOnExportsFixID,
		FixAllDescription: diagnostics.Add_all_missing_type_annotations.Localize(locale.FromContext(ctx)),
	}
}

// isolatedDeclarationsFixer encapsulates the state for fixing isolated declarations errors.
type isolatedDeclarationsFixer struct {
	sourceFile      *ast.SourceFile
	program         *compiler.Program
	checker         *checker.Checker
	changeTracker   *change.Tracker
	importAdder     autoimport.ImportAdder
	locale          locale.Locale
	fixedNodes      map[*ast.Node]bool
	typePrintMode   typePrintMode
	symbolsToImport []*ast.Symbol
	mutatedTarget   bool // set by inferType/relativeType when the target was mutated (e.g., spread decomposition)
}

func (f *isolatedDeclarationsFixer) addTypeAnnotation(span core.TextRange) string {
	nodeWithDiag := astnav.GetTokenAtPosition(f.sourceFile, span.Pos())

	expandoFunction := findExpandoFunction(f.checker, nodeWithDiag)
	if expandoFunction != nil {
		if ast.IsFunctionDeclaration(expandoFunction) {
			return f.createNamespaceForExpandoProperties(expandoFunction)
		}
		return f.fixIsolatedDeclarationError(expandoFunction)
	}

	nodeMissingType := findAncestorWithMissingType(nodeWithDiag)
	if nodeMissingType != nil {
		return f.fixIsolatedDeclarationError(nodeMissingType)
	}
	return ""
}

func (f *isolatedDeclarationsFixer) createNamespaceForExpandoProperties(expandoFunc *ast.Node) string {
	funcDecl := expandoFunc.AsFunctionDeclaration()
	if funcDecl.Name() == nil {
		return ""
	}

	t := f.checker.GetTypeAtLocation(expandoFunc)
	elements := f.checker.GetPropertiesOfType(t)
	if len(elements) == 0 {
		return ""
	}

	factory := f.changeTracker.NodeFactory

	var newProperties []*ast.Node
	for _, symbol := range elements {
		if !scanner.IsIdentifierText(symbol.Name, core.LanguageVariantStandard) {
			continue
		}
		// skip symbols that already have a variable declaration
		if symbol.ValueDeclaration != nil && ast.IsVariableDeclaration(symbol.ValueDeclaration) {
			continue
		}

		symType := f.checker.GetTypeOfSymbol(symbol)
		typeNode := f.typeToMinimizedReferenceType(symType, expandoFunc, declarationEmitNodeBuilderFlags)
		if typeNode == nil {
			continue
		}

		varDecl := factory.NewVariableDeclaration(factory.NewIdentifier(symbol.Name), nil, typeNode, nil)
		exportToken := factory.NewToken(ast.KindExportKeyword)
		varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsNone)
		varStmt := factory.NewVariableStatement(factory.NewModifierList([]*ast.Node{exportToken}), varDeclList)
		newProperties = append(newProperties, varStmt)
	}

	if len(newProperties) == 0 {
		return ""
	}

	var modifiers []*ast.Node
	if ast.HasSyntacticModifier(expandoFunc, ast.ModifierFlagsExport) {
		modifiers = append(modifiers, factory.NewToken(ast.KindExportKeyword))
	}
	modifiers = append(modifiers, factory.NewToken(ast.KindDeclareKeyword))

	namespace := factory.NewModuleDeclaration(
		factory.NewModifierList(modifiers),
		ast.KindNamespaceKeyword,
		factory.NewIdentifier(funcDecl.Name().Text()),
		factory.NewModuleBlock(factory.NewNodeList(newProperties)),
	)
	// Set the flags for namespace
	namespace.Flags = ast.NodeFlagsAmbient | ast.NodeFlagsExportContext | ast.NodeFlagsContextFlags

	f.changeTracker.InsertNodeAfter(f.sourceFile, expandoFunc, namespace)
	return diagnostics.Annotate_types_of_properties_expando_function_in_a_namespace.Localize(f.locale)
}

// needsParenthesizedExpressionForAssertion checks if an expression needs parentheses for an assertion.
func needsParenthesizedExpressionForAssertion(node *ast.Node) bool {
	return !ast.IsEntityNameExpression(node) && !ast.IsCallExpression(node) && !ast.IsObjectLiteralExpression(node) && !ast.IsArrayLiteralExpression(node)
}

// createAsExpression creates an `expr as Type` expression, parenthesizing if needed.
func createAsExpression(factory *ast.NodeFactory, node *ast.Node, typeNode *ast.Node) *ast.Node {
	if needsParenthesizedExpressionForAssertion(node) {
		node = factory.NewParenthesizedExpression(node)
	}
	return factory.NewAsExpression(node, typeNode)
}

func (f *isolatedDeclarationsFixer) addInlineAssertion(span core.TextRange) string {
	nodeWithDiag := astnav.GetTokenAtPosition(f.sourceFile, span.Pos())

	// No inline assertions for expando members
	expandoFunction := findExpandoFunction(f.checker, nodeWithDiag)
	if expandoFunction != nil {
		return ""
	}

	targetNode := findBestFittingNode(nodeWithDiag, span)
	if targetNode == nil || isValueSignatureDeclaration(targetNode) || isValueSignatureDeclaration(targetNode.Parent) {
		return ""
	}

	isExpressionTarget := ast.IsExpression(targetNode)
	isShorthandPropertyAssignmentTarget := ast.IsShorthandPropertyAssignment(targetNode)

	// Go's IsDeclaration is broader than TS's isDeclaration (e.g. CallExpression has DeclarationData
	// in Go but is not a declaration kind in TS). Use isNamedDeclarationKind to match TS behavior.
	if !isShorthandPropertyAssignmentTarget && isNamedDeclarationKind(targetNode) {
		return ""
	}
	// No inline assertions on binding patterns
	if ast.FindAncestor(targetNode, ast.IsBindingPattern) != nil {
		return ""
	}
	// No inline assertions on enum members
	if ast.FindAncestor(targetNode, ast.IsEnumMember) != nil {
		return ""
	}
	// No support for typeof in extends clauses
	if isExpressionTarget && (ast.FindAncestorKind(targetNode, ast.KindHeritageClause) != nil || ast.FindAncestor(targetNode, ast.IsTypeNode) != nil) {
		return ""
	}
	// Can't inline type spread elements
	if ast.IsSpreadElement(targetNode) {
		return ""
	}

	variableDeclaration := ast.FindAncestorKind(targetNode, ast.KindVariableDeclaration)
	var variableType *checker.Type
	if variableDeclaration != nil {
		variableType = f.checker.GetTypeAtLocation(variableDeclaration)
	}
	// Can't use typeof on unique symbols
	if variableType != nil && variableType.Flags()&checker.TypeFlagsUniqueESSymbol != 0 {
		return ""
	}

	if !isExpressionTarget && !isShorthandPropertyAssignmentTarget {
		return ""
	}

	typeNode := f.inferType(targetNode, variableType)
	if typeNode == nil || f.mutatedTarget {
		return ""
	}

	factory := f.changeTracker.NodeFactory

	if isShorthandPropertyAssignmentTarget {
		// Insert `: expr as Type` after the shorthand property name
		clonedName := factory.DeepCloneNode(targetNode.AsShorthandPropertyAssignment().Name())
		asExpr := createAsExpression(factory, clonedName, typeNode)
		f.changeTracker.InsertNodeAt(f.sourceFile, core.TextPos(targetNode.End()), asExpr, change.NodeOptions{Prefix: ": "})
	} else if isExpressionTarget {
		// Replace expression with `(expression) satisfies Type as Type` or `expression satisfies Type as Type`
		clonedTarget := factory.DeepCloneNode(targetNode)
		if needsParenthesizedExpressionForAssertion(targetNode) {
			clonedTarget = factory.NewParenthesizedExpression(clonedTarget)
		}
		clonedType := factory.DeepCloneNode(typeNode)
		satisfiesAsExpr := factory.NewAsExpression(
			factory.NewSatisfiesExpression(clonedTarget, clonedType),
			typeNode,
		)
		f.changeTracker.ReplaceNode(f.sourceFile, targetNode, satisfiesAsExpr, nil)
	} else {
		return ""
	}

	return diagnostics.Add_satisfies_and_an_inline_type_assertion_with_0.Localize(f.locale, typeToStringForDiag(typeNode, f.sourceFile, f.changeTracker))
}

func (f *isolatedDeclarationsFixer) extractAsVariable(span core.TextRange) string {
	nodeWithDiag := astnav.GetTokenAtPosition(f.sourceFile, span.Pos())
	targetNode := findBestFittingNode(nodeWithDiag, span)
	if targetNode == nil || isValueSignatureDeclaration(targetNode) || isValueSignatureDeclaration(targetNode.Parent) {
		return ""
	}

	if !ast.IsExpression(targetNode) {
		return ""
	}

	factory := f.changeTracker.NodeFactory

	// Array literals should be marked as const
	if ast.IsArrayLiteralExpression(targetNode) {
		constRef := factory.NewTypeReferenceNode(factory.NewIdentifier("const"), nil)
		cloned := factory.DeepCloneNode(targetNode)
		f.changeTracker.ReplaceNode(f.sourceFile, targetNode, createAsExpression(factory, cloned, constRef), nil)
		return diagnostics.Mark_array_literal_as_const.Localize(f.locale)
	}

	parentPropertyAssignment := ast.FindAncestorKind(targetNode, ast.KindPropertyAssignment)
	if parentPropertyAssignment != nil {
		// Identifiers or entity names can already be typeof-ed
		if parentPropertyAssignment == targetNode.Parent && ast.IsEntityNameExpression(targetNode) {
			return ""
		}

		tempName := f.changeTracker.EmitContext.Factory.NewUniqueNameEx(getIdentifierNameForNode(targetNode), printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})

		replacementTarget := targetNode
		initializationNode := targetNode

		// Handle spread elements: walk up to the spread's parent and handle const assertions
		if ast.IsSpreadElement(replacementTarget) {
			replacementTarget = ast.WalkUpParenthesizedExpressions(replacementTarget.Parent)
			if isConstAssertion(replacementTarget.Parent) {
				replacementTarget = replacementTarget.Parent
				initializationNode = replacementTarget
			} else {
				constRef := factory.NewTypeReferenceNode(factory.NewIdentifier("const"), nil)
				initializationNode = createAsExpression(factory, factory.DeepCloneNode(replacementTarget), constRef)
			}
		}

		if ast.IsEntityNameExpression(replacementTarget) {
			return ""
		}

		clonedInit := factory.DeepCloneNode(initializationNode)
		varDecl := factory.NewVariableDeclaration(tempName.AsNode(), nil, nil, clonedInit)
		varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
		varStmt := factory.NewVariableStatement(nil, varDeclList)

		statement := ast.FindAncestor(targetNode, ast.IsStatement)
		if statement == nil {
			return ""
		}
		f.changeTracker.InsertNodeBefore(f.sourceFile, statement, varStmt, false, change.LeadingTriviaOptionNone)

		typeQuery := factory.NewTypeQueryNode(tempName.AsNode(), nil)
		asExpr := factory.NewAsExpression(tempName.AsNode(), typeQuery)
		f.changeTracker.ReplaceNode(f.sourceFile, replacementTarget, asExpr, nil)

		idText := typeToStringForDiag(tempName.AsNode(), f.sourceFile, f.changeTracker)
		return diagnostics.Extract_to_variable_and_replace_with_0_as_typeof_0.Localize(f.locale, idText)
	}

	return ""
}

// findExpandoFunction finds the function declaration that has expando properties assigned to it.
// isExpandoPropertyDeclarationForFix matches TS's isExpandoPropertyDeclaration which includes
// PropertyAccessExpression, ElementAccessExpression, and BinaryExpression. The shared
// ast.IsExpandoPropertyDeclaration was narrowed to BinaryExpression only for checker purposes.
func isExpandoPropertyDeclarationForFix(node *ast.Node) bool {
	return node != nil && (ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node) || ast.IsBinaryExpression(node))
}

func findExpandoFunction(ch *checker.Checker, node *ast.Node) *ast.Node {
	expandoDeclaration := ast.FindAncestorOrQuit(node, func(n *ast.Node) ast.FindAncestorResult {
		if ast.IsStatement(n) {
			return ast.FindAncestorQuit
		}
		if isExpandoPropertyDeclarationForFix(n) {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	})

	if expandoDeclaration == nil || !isExpandoPropertyDeclarationForFix(expandoDeclaration) {
		return nil
	}

	assignmentTarget := expandoDeclaration
	// Some late bound expando members use the whole expression as the declaration.
	if ast.IsBinaryExpression(assignmentTarget) {
		assignmentTarget = assignmentTarget.AsBinaryExpression().Left
		if !isExpandoPropertyDeclarationForFix(assignmentTarget) {
			return nil
		}
	}

	var expression *ast.Node
	if ast.IsPropertyAccessExpression(assignmentTarget) {
		expression = assignmentTarget.AsPropertyAccessExpression().Expression
	} else if ast.IsElementAccessExpression(assignmentTarget) {
		expression = assignmentTarget.AsElementAccessExpression().Expression
	} else {
		return nil
	}

	targetType := ch.GetTypeAtLocation(expression)
	if targetType == nil {
		return nil
	}

	properties := ch.GetPropertiesOfType(targetType)
	found := false
	for _, p := range properties {
		if p.ValueDeclaration == expandoDeclaration || p.ValueDeclaration == expandoDeclaration.Parent {
			found = true
			break
		}
	}
	if !found {
		return nil
	}

	symbol := targetType.Symbol()
	if symbol == nil || symbol.ValueDeclaration == nil {
		return nil
	}

	fn := symbol.ValueDeclaration
	if (ast.IsFunctionExpression(fn) || ast.IsArrowFunction(fn)) && ast.IsVariableDeclaration(fn.Parent) {
		return fn.Parent
	}
	if ast.IsFunctionDeclaration(fn) {
		return fn
	}

	return nil
}

func (f *isolatedDeclarationsFixer) fixIsolatedDeclarationError(node *ast.Node) string {
	// Avoid creating duplicate fixes for the same node
	if f.fixedNodes[node] {
		return ""
	}
	f.fixedNodes[node] = true

	switch node.Kind {
	case ast.KindParameter, ast.KindPropertyDeclaration, ast.KindVariableDeclaration:
		return f.addTypeToVariableLike(node)
	case ast.KindArrowFunction, ast.KindFunctionExpression, ast.KindFunctionDeclaration,
		ast.KindMethodDeclaration, ast.KindGetAccessor:
		return f.addTypeToSignatureDeclaration(node)
	case ast.KindExportAssignment:
		return f.transformExportAssignment(node)
	case ast.KindClassDeclaration:
		return f.transformExtendsClauseWithExpression(node)
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		return f.transformDestructuringPatterns(node)
	default:
		return ""
	}
}

func (f *isolatedDeclarationsFixer) addTypeToSignatureDeclaration(funcNode *ast.Node) string {
	if funcNode.Type() != nil {
		return ""
	}
	typeNode := f.inferType(funcNode, nil)
	if typeNode == nil {
		return ""
	}
	f.changeTracker.TryInsertTypeAnnotation(f.sourceFile, funcNode, typeNode)
	return diagnostics.Add_return_type_0.Localize(f.locale, typeToStringForDiag(typeNode, f.sourceFile, f.changeTracker))
}

func (f *isolatedDeclarationsFixer) transformExportAssignment(defaultExport *ast.Node) string {
	exportAssignment := defaultExport.AsExportAssignment()
	if exportAssignment.IsExportEquals {
		return ""
	}

	expression := exportAssignment.Expression
	typeNode := f.inferType(expression, nil)
	if typeNode == nil {
		return ""
	}

	factory := f.changeTracker.NodeFactory

	defaultIdentifier := f.changeTracker.EmitContext.Factory.NewUniqueName("_default")

	// Deep clone the expression so synthesized nodes don't reference original source positions
	clonedExpression := factory.DeepCloneNode(expression)

	varDecl := factory.NewVariableDeclaration(defaultIdentifier.AsNode(), nil, typeNode, clonedExpression)
	varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
	varStmt := factory.NewVariableStatement(nil, varDeclList)

	newExport := factory.UpdateExportAssignment(defaultExport.AsExportAssignment(), defaultExport.Modifiers(), false, nil, defaultIdentifier.AsNode())

	f.changeTracker.ReplaceNodeWithNodes(f.sourceFile, defaultExport, []*ast.Node{varStmt, newExport}, nil)
	return diagnostics.Extract_default_export_to_variable.Localize(f.locale)
}

func (f *isolatedDeclarationsFixer) transformExtendsClauseWithExpression(classDecl *ast.Node) string {
	cd := classDecl.AsClassDeclaration()
	var extendsClause *ast.Node
	if cd.HeritageClauses != nil {
		for _, clause := range cd.HeritageClauses.Nodes {
			if clause.AsHeritageClause().Token == ast.KindExtendsKeyword {
				extendsClause = clause
				break
			}
		}
	}
	if extendsClause == nil {
		return ""
	}

	heritageTypes := extendsClause.AsHeritageClause().Types
	if heritageTypes == nil || len(heritageTypes.Nodes) == 0 {
		return ""
	}
	heritageExpression := heritageTypes.Nodes[0]
	expression := heritageExpression.AsExpressionWithTypeArguments().Expression

	heritageTypeNode := f.inferType(expression, nil)
	if heritageTypeNode == nil {
		return ""
	}

	factory := f.changeTracker.NodeFactory

	baseName := "Anonymous"
	if cd.Name() != nil {
		baseName = cd.Name().Text() + "Base"
	}
	baseClassName := f.changeTracker.EmitContext.Factory.NewUniqueNameEx(baseName, printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})

	// Create: const <BaseName>: <type> = <expression>;
	clonedExpression := factory.DeepCloneNode(expression)
	varDecl := factory.NewVariableDeclaration(baseClassName.AsNode(), nil, heritageTypeNode, clonedExpression)
	varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
	varStmt := factory.NewVariableStatement(nil, varDeclList)

	f.changeTracker.InsertNodeBefore(f.sourceFile, classDecl, varStmt, false, change.LeadingTriviaOptionNone)

	// Replace the heritage expression with the base class name
	f.changeTracker.ReplaceNode(f.sourceFile, heritageExpression, factory.NewExpressionWithTypeArguments(baseClassName.AsNode(), nil), nil)

	return diagnostics.Extract_base_class_to_variable.Localize(f.locale)
}

func (f *isolatedDeclarationsFixer) transformDestructuringPatterns(bindingPattern *ast.Node) string {
	enclosingVariableDeclaration := bindingPattern.Parent
	if !ast.IsVariableDeclaration(enclosingVariableDeclaration) {
		return ""
	}
	enclosingVarStmt := enclosingVariableDeclaration.Parent.Parent
	if !ast.IsVariableStatement(enclosingVarStmt) {
		return ""
	}

	initializer := enclosingVariableDeclaration.Initializer()
	if initializer == nil {
		return ""
	}

	factory := f.changeTracker.NodeFactory
	var newNodes []*ast.Node

	var baseExprNode *ast.Node
	if !ast.IsIdentifier(initializer) {
		// Create a temporary variable for complex expressions
		tempName := f.changeTracker.EmitContext.Factory.NewUniqueNameEx("dest", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
		clonedInitializer := factory.DeepCloneNode(initializer)
		varDecl := factory.NewVariableDeclaration(tempName.AsNode(), nil, nil, clonedInitializer)
		varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
		varStmt := factory.NewVariableStatement(nil, varDeclList)
		newNodes = append(newNodes, varStmt)
		baseExprNode = tempName.AsNode()
	} else {
		// Use a new identifier to avoid referencing original source positions
		baseExprNode = factory.NewIdentifier(initializer.Text())
	}

	// Extract each binding element as a separate variable with type annotation
	f.extractBindingElements(bindingPattern, baseExprNode, &newNodes, enclosingVarStmt)

	if len(newNodes) == 0 {
		return ""
	}

	// If the enclosing variable statement has multiple declarations, preserve the non-destructuring ones
	declList := enclosingVarStmt.AsVariableStatement().DeclarationList.AsVariableDeclarationList()
	if len(declList.Declarations.Nodes) > 1 {
		var remainingDecls []*ast.Node
		for _, d := range declList.Declarations.Nodes {
			if d != enclosingVariableDeclaration {
				remainingDecls = append(remainingDecls, d)
			}
		}
		if len(remainingDecls) > 0 {
			newNodes = append(newNodes, factory.UpdateVariableStatement(
				enclosingVarStmt.AsVariableStatement(),
				enclosingVarStmt.AsVariableStatement().Modifiers(),
				factory.UpdateVariableDeclarationList(
					declList,
					factory.NewNodeList(remainingDecls),
					declList.Flags,
				),
			))
		}
	}

	f.changeTracker.ReplaceNodeWithNodes(f.sourceFile, enclosingVarStmt, newNodes, nil)
	return diagnostics.Extract_binding_expressions_to_variable.Localize(f.locale)
}

func (f *isolatedDeclarationsFixer) extractBindingElements(
	bindingPattern *ast.Node,
	baseExpr *ast.Node,
	newNodes *[]*ast.Node,
	enclosingVarStmt *ast.Node,
) {
	factory := f.changeTracker.NodeFactory

	if ast.IsObjectBindingPattern(bindingPattern) {
		for _, element := range bindingPattern.AsBindingPattern().Elements.Nodes {
			if ast.IsOmittedExpression(element) {
				continue
			}
			be := element.AsBindingElement()
			name := be.Name()
			if name == nil {
				continue
			}

			// Build property access expression
			var accessExpr *ast.Node
			if be.PropertyName != nil && ast.IsComputedPropertyName(be.PropertyName) {
				// Handle computed property names: create a temp variable for the computed expression
				computedExpression := be.PropertyName.AsComputedPropertyName().Expression
				identifierForComputedProperty := f.changeTracker.EmitContext.Factory.NewGeneratedNameForNode(computedExpression)
				compVarDecl := factory.NewVariableDeclaration(identifierForComputedProperty.AsNode(), nil, nil, computedExpression)
				compVarDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{compVarDecl}), ast.NodeFlagsConst)
				compVarStmt := factory.NewVariableStatement(nil, compVarDeclList)
				*newNodes = append(*newNodes, compVarStmt)
				accessExpr = factory.NewElementAccessExpression(baseExpr, nil, identifierForComputedProperty.AsNode(), ast.NodeFlagsNone)
			} else if be.PropertyName != nil {
				// Use property name text (handles identifiers, string literals, numeric literals)
				propText := be.PropertyName.Text()
				accessExpr = factory.NewPropertyAccessExpression(baseExpr, nil, factory.NewIdentifier(propText), ast.NodeFlagsNone)
			} else if ast.IsIdentifier(name) {
				accessExpr = factory.NewPropertyAccessExpression(baseExpr, nil, factory.NewIdentifier(name.Text()), ast.NodeFlagsNone)
			} else {
				continue
			}

			if ast.IsBindingPattern(name) {
				f.extractBindingElements(name, accessExpr, newNodes, enclosingVarStmt)
			} else {
				f.emitBindingElementVariable(factory, name, be, accessExpr, newNodes, enclosingVarStmt)
			}
		}
	} else if ast.IsArrayBindingPattern(bindingPattern) {
		for i, element := range bindingPattern.AsBindingPattern().Elements.Nodes {
			if ast.IsOmittedExpression(element) {
				continue
			}
			be := element.AsBindingElement()
			name := be.Name()
			if name == nil {
				continue
			}

			accessExpr := factory.NewElementAccessExpression(baseExpr, nil, factory.NewNumericLiteral(strconv.Itoa(i), ast.TokenFlagsNone), ast.NodeFlagsNone)

			if ast.IsBindingPattern(name) {
				f.extractBindingElements(name, accessExpr, newNodes, enclosingVarStmt)
			} else {
				f.emitBindingElementVariable(factory, name, be, accessExpr, newNodes, enclosingVarStmt)
			}
		}
	}
}

// emitBindingElementVariable creates a variable declaration for a single binding element,
// handling default initializers by creating a ternary `temp === undefined ? default : temp`.
func (f *isolatedDeclarationsFixer) emitBindingElementVariable(
	factory *ast.NodeFactory,
	name *ast.Node,
	be *ast.BindingElement,
	accessExpr *ast.Node,
	newNodes *[]*ast.Node,
	enclosingVarStmt *ast.Node,
) {
	typeNode := f.inferType(name, nil)
	variableInitializer := accessExpr

	if be.Initializer != nil {
		// Create a temp variable to hold the accessed value, then use a conditional expression
		// to apply the default: temp === undefined ? defaultValue : temp
		propName := be.PropertyName
		tempBaseName := "temp"
		if propName != nil && ast.IsIdentifier(propName) {
			tempBaseName = propName.Text()
		}
		tempName := f.changeTracker.EmitContext.Factory.NewUniqueNameEx(tempBaseName, printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
		tempVarDecl := factory.NewVariableDeclaration(tempName.AsNode(), nil, nil, variableInitializer)
		tempVarDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{tempVarDecl}), ast.NodeFlagsConst)
		tempVarStmt := factory.NewVariableStatement(nil, tempVarDeclList)
		*newNodes = append(*newNodes, tempVarStmt)

		variableInitializer = factory.NewConditionalExpression(
			factory.NewBinaryExpression(
				nil,
				tempName.AsNode(),
				nil,
				factory.NewToken(ast.KindEqualsEqualsEqualsToken),
				factory.NewIdentifier("undefined"),
			),
			factory.NewToken(ast.KindQuestionToken),
			be.Initializer,
			factory.NewToken(ast.KindColonToken),
			variableInitializer,
		)
	}

	exportModifier := f.getExportModifier(enclosingVarStmt)
	varDecl := factory.NewVariableDeclaration(factory.NewIdentifier(name.Text()), nil, typeNode, variableInitializer)
	varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
	varStmt := factory.NewVariableStatement(exportModifier, varDeclList)
	*newNodes = append(*newNodes, varStmt)
}

func (f *isolatedDeclarationsFixer) getExportModifier(enclosingVarStmt *ast.Node) *ast.ModifierList {
	if ast.HasSyntacticModifier(enclosingVarStmt, ast.ModifierFlagsExport) {
		exportToken := f.changeTracker.NodeFactory.NewToken(ast.KindExportKeyword)
		return f.changeTracker.NodeFactory.NewModifierList([]*ast.Node{exportToken})
	}
	return nil
}

func (f *isolatedDeclarationsFixer) inferType(node *ast.Node, variableType *checker.Type) *ast.TypeNode {
	f.mutatedTarget = false

	// Handle Relative mode first: return typeof X for identifiers
	if f.typePrintMode == typePrintModeRelative {
		return f.relativeType(node)
	}

	var t *checker.Type

	if isValueSignatureDeclaration(node) {
		signature := f.checker.GetSignatureFromDeclaration(node)
		if signature != nil {
			typePredicate := f.checker.GetTypePredicateOfSignature(signature)
			if typePredicate != nil {
				if typePredicate.Type() == nil {
					return nil
				}
				enclosingDecl := ast.FindAncestor(node, ast.IsDeclaration)
				if enclosingDecl == nil {
					enclosingDecl = f.sourceFile.AsNode()
				}
				flags := declarationEmitNodeBuilderFlags
				if typePredicate.Type().Flags()&checker.TypeFlagsUniqueESSymbol != 0 {
					flags |= nodebuilder.FlagsAllowUniqueESSymbolType
				}
				result := f.checker.TypePredicateToTypePredicateNode(typePredicate, enclosingDecl, flags, nil)
				if result != nil {
					return result.AsNode()
				}
				return nil
			}
			t = f.checker.GetReturnTypeOfSignature(signature)
		}
	} else {
		t = f.checker.GetTypeAtLocation(node)
	}

	if t == nil {
		return nil
	}

	// Handle Widened mode: return widened literal type if different
	if f.typePrintMode == typePrintModeWidened {
		if variableType != nil {
			t = variableType
		}
		widenedType := f.checker.GetWidenedLiteralType(t)
		if f.checker.IsTypeAssignableTo(widenedType, t) {
			return nil // widened type is same, no fix needed
		}
		t = widenedType
	}

	enclosingDecl := ast.FindAncestor(node, ast.IsDeclaration)
	if enclosingDecl == nil {
		enclosingDecl = f.sourceFile.AsNode()
	}

	flags := declarationEmitNodeBuilderFlags | f.getExtraFlags(node, t)

	// For parameters that require adding implicit undefined, add it to the type
	if ast.IsParameterDeclaration(node) && f.checker.RequiresAddingImplicitUndefined(node) {
		t = f.checker.GetUnionTypeEx([]*checker.Type{f.checker.GetUndefinedType(), t}, checker.UnionReductionNone)
	}

	typeNode := f.typeToMinimizedReferenceType(t, enclosingDecl, flags)
	return typeNode
}

func (f *isolatedDeclarationsFixer) getExtraFlags(node *ast.Node, t *checker.Type) nodebuilder.Flags {
	if (ast.IsVariableDeclaration(node) ||
		(ast.IsPropertyDeclaration(node) && ast.HasSyntacticModifier(node, ast.ModifierFlagsStatic|ast.ModifierFlagsReadonly))) &&
		t.Flags()&checker.TypeFlagsUniqueESSymbol != 0 {
		return nodebuilder.FlagsAllowUniqueESSymbolType
	}
	return nodebuilder.FlagsNone
}

// createTypeOfFromEntityNameExpression creates a `typeof X` type query node.
func (f *isolatedDeclarationsFixer) createTypeOfFromEntityNameExpression(node *ast.Node) *ast.TypeNode {
	return f.changeTracker.NodeFactory.NewTypeQueryNode(
		f.changeTracker.NodeFactory.DeepCloneNode(node), nil)
}

// typeFromArraySpreadElements decomposes an array literal with spread elements into
// separate variables, returning a tuple type of typeof references.
func (f *isolatedDeclarationsFixer) typeFromArraySpreadElements(node *ast.ArrayLiteralExpression, name string) *ast.TypeNode {
	isInConstContext := ast.FindAncestor(node.AsNode(), isConstAssertion) != nil
	if !isInConstContext {
		return nil
	}
	if name == "" {
		name = "temp"
	}
	factory := f.changeTracker.NodeFactory
	return f.typeFromSpreads(
		node.AsNode(),
		name,
		isInConstContext,
		func(n *ast.Node) []*ast.Node {
			return n.AsArrayLiteralExpression().Elements.Nodes
		},
		ast.IsSpreadElement,
		func(expr *ast.Node) *ast.Node {
			return factory.NewSpreadElement(expr)
		},
		func(elements []*ast.Node) *ast.Node {
			return factory.NewArrayLiteralExpression(factory.NewNodeList(elements), true)
		},
		func(types []*ast.TypeNode) *ast.TypeNode {
			restTypes := make([]*ast.TypeNode, len(types))
			for i, t := range types {
				restTypes[i] = factory.NewRestTypeNode(t)
			}
			return factory.NewTupleTypeNode(factory.NewNodeList(restTypes))
		},
	)
}

// typeFromObjectSpreadAssignment decomposes an object literal with spread assignments into
// separate variables, returning an intersection type of typeof references.
func (f *isolatedDeclarationsFixer) typeFromObjectSpreadAssignment(node *ast.ObjectLiteralExpression, name string) *ast.TypeNode {
	isInConstContext := ast.FindAncestor(node.AsNode(), isConstAssertion) != nil
	if name == "" {
		name = "temp"
	}
	factory := f.changeTracker.NodeFactory
	return f.typeFromSpreads(
		node.AsNode(),
		name,
		isInConstContext,
		func(n *ast.Node) []*ast.Node {
			if n.AsObjectLiteralExpression().Properties != nil {
				return n.AsObjectLiteralExpression().Properties.Nodes
			}
			return nil
		},
		ast.IsSpreadAssignment,
		func(expr *ast.Node) *ast.Node {
			return factory.NewSpreadAssignment(expr)
		},
		func(elements []*ast.Node) *ast.Node {
			return factory.NewObjectLiteralExpression(factory.NewNodeList(elements), true)
		},
		func(types []*ast.TypeNode) *ast.TypeNode {
			return factory.NewIntersectionTypeNode(factory.NewNodeList(types))
		},
	)
}

// typeFromSpreads is the generic spread decomposition function, ported from TS's typeFromSpreads.
// It splits a literal with spread elements into separate const variables and returns a composed type.
func (f *isolatedDeclarationsFixer) typeFromSpreads(
	node *ast.Node,
	name string,
	isInConstContext bool,
	getChildren func(*ast.Node) []*ast.Node,
	isSpread func(*ast.Node) bool,
	createSpread func(*ast.Node) *ast.Node,
	makeNodeOfKind func([]*ast.Node) *ast.Node,
	finalType func([]*ast.TypeNode) *ast.TypeNode,
) *ast.TypeNode {
	factory := f.changeTracker.NodeFactory
	var intersectionTypes []*ast.TypeNode
	var newSpreads []*ast.Node
	var currentVariableProperties []*ast.Node

	statement := ast.FindAncestor(node, ast.IsStatement)

	children := getChildren(node)
	for _, prop := range children {
		if isSpread(prop) {
			f.finalizesVariablePart(factory, name, isInConstContext, statement, makeNodeOfKind, createSpread, &currentVariableProperties, &intersectionTypes, &newSpreads)
			if ast.IsEntityNameExpression(prop.Expression()) {
				intersectionTypes = append(intersectionTypes, f.createTypeOfFromEntityNameExpression(prop.Expression()))
				newSpreads = append(newSpreads, prop)
			} else {
				f.makeSpreadVariable(factory, name, isInConstContext, statement, createSpread, prop.Expression(), &intersectionTypes, &newSpreads)
			}
		} else {
			currentVariableProperties = append(currentVariableProperties, prop)
		}
	}

	if len(newSpreads) == 0 {
		return nil
	}

	f.finalizesVariablePart(factory, name, isInConstContext, statement, makeNodeOfKind, createSpread, &currentVariableProperties, &intersectionTypes, &newSpreads)

	f.changeTracker.ReplaceNode(f.sourceFile, node, makeNodeOfKind(newSpreads), nil)
	f.mutatedTarget = true

	return finalType(intersectionTypes)
}

// makeSpreadVariable creates a const variable for a spread expression and adds it to the decomposition.
func (f *isolatedDeclarationsFixer) makeSpreadVariable(
	factory *ast.NodeFactory,
	name string,
	isInConstContext bool,
	statement *ast.Node,
	createSpread func(*ast.Node) *ast.Node,
	expression *ast.Node,
	intersectionTypes *[]*ast.TypeNode,
	newSpreads *[]*ast.Node,
) {
	tempName := f.changeTracker.EmitContext.Factory.NewUniqueNameEx(
		name+"_Part"+strconv.Itoa(len(*newSpreads)+1),
		printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic},
	).AsNode()

	var initializer *ast.Node
	if !isInConstContext {
		initializer = factory.DeepCloneNode(expression)
	} else {
		constRef := factory.NewTypeReferenceNode(factory.NewIdentifier("const"), nil)
		initializer = factory.NewAsExpression(factory.DeepCloneNode(expression), constRef)
	}

	varDecl := factory.NewVariableDeclaration(tempName, nil, nil, initializer)
	varDeclList := factory.NewVariableDeclarationList(factory.NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsConst)
	varStmt := factory.NewVariableStatement(nil, varDeclList)

	if statement != nil {
		f.changeTracker.InsertNodeBefore(f.sourceFile, statement, varStmt, false, change.LeadingTriviaOptionNone)
	}

	*intersectionTypes = append(*intersectionTypes, f.createTypeOfFromEntityNameExpression(tempName))
	*newSpreads = append(*newSpreads, createSpread(tempName))
}

// finalizesVariablePart finalizes accumulated non-spread properties into a variable.
func (f *isolatedDeclarationsFixer) finalizesVariablePart(
	factory *ast.NodeFactory,
	name string,
	isInConstContext bool,
	statement *ast.Node,
	makeNodeOfKind func([]*ast.Node) *ast.Node,
	createSpread func(*ast.Node) *ast.Node,
	currentVariableProperties *[]*ast.Node,
	intersectionTypes *[]*ast.TypeNode,
	newSpreads *[]*ast.Node,
) {
	if len(*currentVariableProperties) > 0 {
		f.makeSpreadVariable(factory, name, isInConstContext, statement, createSpread, makeNodeOfKind(*currentVariableProperties), intersectionTypes, newSpreads)
		*currentVariableProperties = nil
	}
}

// isConstAssertion checks if a node is an `as const` or `<const>` assertion.
func isConstAssertion(node *ast.Node) bool {
	if ast.IsAssertionExpression(node) {
		typeNode := node.Type()
		return ast.IsConstTypeReference(typeNode)
	}
	return false
}

// relativeType creates a typeof expression for a node, used in TypePrintMode.Relative.
// Instead of spelling out the full type, returns `typeof X` for identifiers.
// For object/array literals with spreads, decomposes into separate variables.
func (f *isolatedDeclarationsFixer) relativeType(node *ast.Node) *ast.TypeNode {
	if ast.IsParameterDeclaration(node) {
		return nil
	}
	if ast.IsShorthandPropertyAssignment(node) {
		return f.createTypeOfFromEntityNameExpression(node.AsShorthandPropertyAssignment().Name())
	}
	if ast.IsEntityNameExpression(node) {
		return f.createTypeOfFromEntityNameExpression(node)
	}
	if isConstAssertion(node) {
		return f.relativeType(node.Expression())
	}
	if ast.IsArrayLiteralExpression(node) {
		varDecl := ast.FindAncestorKind(node, ast.KindVariableDeclaration)
		partName := ""
		if varDecl != nil && ast.IsIdentifier(varDecl.Name()) {
			partName = varDecl.Name().AsIdentifier().Text
		}
		return f.typeFromArraySpreadElements(node.AsArrayLiteralExpression(), partName)
	}
	if ast.IsObjectLiteralExpression(node) {
		varDecl := ast.FindAncestorKind(node, ast.KindVariableDeclaration)
		partName := ""
		if varDecl != nil && ast.IsIdentifier(varDecl.Name()) {
			partName = varDecl.Name().AsIdentifier().Text
		}
		return f.typeFromObjectSpreadAssignment(node.AsObjectLiteralExpression(), partName)
	}
	if ast.IsVariableDeclaration(node) && node.Initializer() != nil {
		return f.relativeType(node.Initializer())
	}
	if ast.IsConditionalExpression(node) {
		cond := node.AsConditionalExpression()
		trueType := f.relativeType(cond.WhenTrue)
		if trueType == nil {
			return nil
		}
		trueMutated := f.mutatedTarget
		falseType := f.relativeType(cond.WhenFalse)
		if falseType == nil {
			return nil
		}
		f.mutatedTarget = trueMutated || f.mutatedTarget
		factory := f.changeTracker.NodeFactory
		return factory.NewUnionTypeNode(factory.NewNodeList([]*ast.Node{trueType, falseType}))
	}
	return nil
}

// typeToMinimizedReferenceType converts a type to a type node, then trims trailing
// type arguments that match their defaults. Ported from TS's
// services/codefixes/helpers.ts typeToMinimizedReferenceType.
func (f *isolatedDeclarationsFixer) typeToMinimizedReferenceType(t *checker.Type, enclosingDecl *ast.Node, flags nodebuilder.Flags) *ast.TypeNode {
	idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
	// !!! When truncation tracking is supported, check if the type was truncated
	// and return factory.NewKeywordTypeNode(ast.KindAnyKeyword) instead of the truncated node.
	typeNode := f.checker.TypeToTypeNodeEx(t, enclosingDecl, flags, nodebuilder.InternalFlagsWriteComputedProps, idToSymbol)
	if typeNode == nil {
		return nil
	}
	if ast.IsTypeReferenceNode(typeNode) && t.ObjectFlags()&checker.ObjectFlagsReference != 0 {
		typeArgs := f.checker.GetTypeArguments(t)
		nodeTypeArgs := typeNode.TypeArguments()
		if len(typeArgs) > 0 && len(nodeTypeArgs) > 0 {
			cutoff := endOfRequiredTypeParameters(f.checker, t)
			if cutoff < len(nodeTypeArgs) {
				// Trim trailing default type arguments
				trimmedArgs := f.changeTracker.NodeFactory.NewNodeList(nodeTypeArgs[:cutoff])
				typeNode = f.changeTracker.NodeFactory.UpdateTypeReferenceNode(
					typeNode.AsTypeReferenceNode(),
					typeNode.AsTypeReferenceNode().TypeName,
					trimmedArgs,
				)
			}
		}
	}
	// Convert import type references (e.g. import("./path").Name) to simple type references
	// and collect symbols that need to be imported
	referenceTypeNode, importableSymbols := autoimport.TryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol)
	if referenceTypeNode != nil {
		typeNode = referenceTypeNode
		f.symbolsToImport = append(f.symbolsToImport, importableSymbols...)
	}
	return typeNode
}

// endOfRequiredTypeParameters finds the number of type arguments that are
// actually required (i.e., differ from their defaults). Ported from TS's
// services/codefixes/helpers.ts endOfRequiredTypeParameters.
func endOfRequiredTypeParameters(ch *checker.Checker, t *checker.Type) int {
	typeArgs := ch.GetTypeArguments(t)
	if len(typeArgs) == 0 {
		return 0
	}
	target := t.Target()
	if target == nil || target.AsInterfaceType() == nil {
		return len(typeArgs)
	}
	typeParams := target.AsInterfaceType().TypeParameters()
	localTypeParams := target.AsInterfaceType().LocalTypeParameters()
	outerCount := len(typeParams) - len(localTypeParams)
	for cutoff := range typeArgs {
		// Skip cutoff positions where the local type parameter has no default.
		// This matches TS's check for constraint === undefined on localTypeParameters,
		// which in practice skips type parameters without defaults (e.g. Set<T>
		// where T has no default should not have <unknown> elided).
		localIdx := cutoff - outerCount
		if localIdx < 0 || localIdx >= len(localTypeParams) || !typeParamHasDefault(localTypeParams[localIdx]) {
			continue
		}
		filledIn := ch.FillMissingTypeArguments(typeArgs[:cutoff], typeParams, cutoff, false)
		allMatch := true
		for i, fill := range filledIn {
			if fill != typeArgs[i] {
				allMatch = false
				break
			}
		}
		if allMatch {
			return cutoff
		}
	}
	return len(typeArgs)
}

// typeParamHasDefault checks if a type parameter has a default type declaration.
func typeParamHasDefault(tp *checker.Type) bool {
	sym := tp.Symbol()
	if sym == nil {
		return false
	}
	for _, decl := range sym.Declarations {
		if ast.IsTypeParameterDeclaration(decl) && decl.AsTypeParameterDeclaration().DefaultType != nil {
			return true
		}
	}
	return false
}

func (f *isolatedDeclarationsFixer) addTypeToVariableLike(decl *ast.Node) string {
	typeNode := f.inferType(decl, nil)
	if typeNode == nil {
		return ""
	}
	if decl.Type() != nil {
		f.changeTracker.ReplaceNode(f.sourceFile, decl.Type(), typeNode, nil)
	} else {
		f.changeTracker.TryInsertTypeAnnotation(f.sourceFile, decl, typeNode)
		// Parenthesize paren-less arrow function parameters (`x => ...`) so the inserted `: T`
		// produces `(x: T) => ...` instead of the invalid `x: T => ...`. Queued after the type
		// annotation so that the `)` edit at param.End() sorts after the annotation insertion.
		if ast.IsParameterDeclaration(decl) && decl.Parent != nil && ast.IsArrowFunction(decl.Parent) {
			f.changeTracker.ParenthesizeArrowParameters(f.sourceFile, decl.Parent)
		}
	}
	return diagnostics.Add_annotation_of_type_0.Localize(f.locale, typeToStringForDiag(typeNode, f.sourceFile, f.changeTracker))
}

// typeToStringForDiag converts a type node to a string for use in diagnostic descriptions.
// It reuses the change tracker's EmitContext so that generated identifier names are resolved
// consistently with the actual code edits, and passes the source file so that the printer's
// name generator can check for conflicts with existing file-level identifiers.
func typeToStringForDiag(typeNode *ast.Node, sourceFile *ast.SourceFile, ct *change.Tracker) string {
	savedFlags := ct.EmitContext.EmitFlags(typeNode)
	ct.EmitContext.SetEmitFlags(typeNode, savedFlags|printer.EFSingleLine)
	p := printer.NewPrinter(
		printer.PrinterOptions{
			NewLine: core.NewLineKindLF,
		},
		printer.PrintHandlers{},
		ct.EmitContext,
	)
	writer, release := printer.GetSingleLineStringWriter()
	defer release()
	p.Write(typeNode, sourceFile, writer, nil)
	ct.EmitContext.SetEmitFlags(typeNode, savedFlags)
	result := writer.String()
	if len(result) > 160 {
		return result[:157] + "..."
	}
	return result
}

// findAncestorWithMissingType walks up the ancestor chain to find a node that
// can have a type annotation and is missing one.
func findAncestorWithMissingType(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node, func(n *ast.Node) bool {
		if !canHaveTypeAnnotationKinds[n.Kind] {
			return false
		}
		if ast.IsObjectBindingPattern(n) || ast.IsArrayBindingPattern(n) {
			return ast.IsVariableDeclaration(n.Parent)
		}
		return true
	})
}

// findBestFittingNode walks up from the token to find the node that best fits the diagnostic span.
func findBestFittingNode(node *ast.Node, span core.TextRange) *ast.Node {
	if node == nil {
		return nil
	}
	for node != nil && node.End() < span.Pos()+span.Len() {
		node = node.Parent
	}
	for node.Parent != nil && node.Parent.Pos() == node.Pos() && node.Parent.End() == node.End() {
		node = node.Parent
	}
	if ast.IsIdentifier(node) && ast.HasInitializer(node.Parent) && node.Parent.Initializer() != nil {
		return node.Parent.Initializer()
	}
	if ast.IsIdentifier(node) && ast.IsShorthandPropertyAssignment(node.Parent) {
		return node.Parent
	}
	return node
}

// isNamedDeclarationKind matches TS's isDeclarationKind, which is narrower than Go's IsDeclaration.
// Go's IsDeclaration returns true for any node with DeclarationData (including CallExpression),
// while TS's isDeclaration only returns true for specific named declaration kinds.
func isNamedDeclarationKind(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBindingElement, ast.KindClassDeclaration, ast.KindClassExpression,
		ast.KindClassStaticBlockDeclaration, ast.KindConstructor, ast.KindEnumDeclaration, ast.KindEnumMember,
		ast.KindExportSpecifier, ast.KindFunctionDeclaration, ast.KindFunctionExpression,
		ast.KindGetAccessor, ast.KindImportClause, ast.KindImportEqualsDeclaration,
		ast.KindImportSpecifier, ast.KindInterfaceDeclaration, ast.KindJsxAttribute,
		ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindModuleDeclaration,
		ast.KindNamespaceExportDeclaration, ast.KindNamespaceImport, ast.KindNamespaceExport,
		ast.KindParameter, ast.KindPropertyAssignment, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindSetAccessor, ast.KindShorthandPropertyAssignment,
		ast.KindTypeAliasDeclaration, ast.KindTypeParameter, ast.KindVariableDeclaration,
		ast.KindJSDocTypedefTag, ast.KindJSDocCallbackTag, ast.KindJSDocPropertyTag,
		ast.KindNamedTupleMember:
		return true
	}
	return false
}

// isValueSignatureDeclaration checks if a node is a function-like declaration that produces a value.
func isValueSignatureDeclaration(node *ast.Node) bool {
	return ast.IsFunctionExpression(node) || ast.IsArrowFunction(node) || ast.IsMethodDeclaration(node) ||
		ast.IsAccessor(node) || ast.IsFunctionDeclaration(node) || ast.IsConstructorDeclaration(node)
}

// getIdentifierNameForNode derives a meaningful variable name from a node expression.
// For property access expressions like `obj.foo`, returns "foo". Otherwise returns "newLocal".
// Ported from TS's getIdentifierForNode in services/refactors/helpers.ts.
func getIdentifierNameForNode(node *ast.Node) string {
	if ast.IsPropertyAccessExpression(node) {
		name := node.AsPropertyAccessExpression().Name()
		if ast.IsIdentifier(name) && !ast.IsPrivateIdentifier(name) && scanner.IdentifierToKeywordKind(name.AsIdentifier()) == ast.KindUnknown {
			return name.Text()
		}
	}
	return "newLocal"
}

// addSymbolToExistingImport finds the existing import declaration for the symbol's module
// and adds the symbol name to the named imports.
func (f *isolatedDeclarationsFixer) addSymbolToExistingImport(sym *ast.Symbol) {
	if sym == nil || sym.Parent == nil {
		return
	}

	// Find the module specifier for this symbol
	moduleSymbol := sym.Parent
	symbolName := sym.Name

	// Walk the source file's import declarations to find the one importing from the same module
	for _, stmt := range f.sourceFile.Statements.Nodes {
		if !ast.IsImportDeclaration(stmt) {
			continue
		}
		importDecl := stmt.AsImportDeclaration()
		if importDecl.ImportClause == nil {
			continue
		}

		// Check if this import is from the same module
		importModuleSymbol := f.checker.GetSymbolAtLocation(importDecl.ModuleSpecifier)
		if importModuleSymbol == nil || f.checker.GetMergedSymbol(importModuleSymbol) != f.checker.GetMergedSymbol(moduleSymbol) {
			continue
		}

		// Found the matching import - add the symbol to named imports
		importClause := importDecl.ImportClause.AsImportClause()
		if importClause.NamedBindings != nil && ast.IsNamedImports(importClause.NamedBindings) {
			// Add to existing named imports
			existingElements := importClause.NamedBindings.AsNamedImports().Elements.Nodes
			factory := f.changeTracker.NodeFactory
			newSpecifier := factory.NewImportSpecifier(false, nil, factory.NewIdentifier(symbolName))
			newElements := append(existingElements, newSpecifier.AsNode())
			newNamedImports := factory.NewNamedImports(factory.NewNodeList(newElements))
			newImportClause := factory.UpdateImportClause(importClause, importClause.PhaseModifier, importClause.Name(), newNamedImports)
			newImportDecl := factory.UpdateImportDeclaration(importDecl, importDecl.Modifiers(), newImportClause, importDecl.ModuleSpecifier, importDecl.Attributes)
			f.changeTracker.ReplaceNode(f.sourceFile, stmt, newImportDecl.AsNode(), nil)
		}
		return
	}
}

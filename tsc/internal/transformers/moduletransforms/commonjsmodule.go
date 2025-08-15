package moduletransforms

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type CommonJSModuleTransformer struct {
	transformers.Transformer
	topLevelVisitor           *ast.NodeVisitor // visits statements at top level of a module
	topLevelNestedVisitor     *ast.NodeVisitor // visits nested statements at top level of a module
	discardedValueVisitor     *ast.NodeVisitor // visits expressions whose values would be discarded at runtime
	assignmentPatternVisitor  *ast.NodeVisitor // visits assignment patterns in a destructuring assignment
	compilerOptions           *core.CompilerOptions
	resolver                  binder.ReferenceResolver
	getEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind
	moduleKind                core.ModuleKind
	languageVersion           core.ScriptTarget
	currentSourceFile         *ast.SourceFile
	currentModuleInfo         *externalModuleInfo
	parentNode                *ast.Node // used for ancestor tracking via pushNode/popNode to detect expression identifiers
	currentNode               *ast.Node // used for ancestor tracking via pushNode/popNode to detect expression identifiers
}

func NewCommonJSModuleTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opts.CompilerOptions
	emitContext := opts.Context
	resolver := opts.Resolver
	if resolver == nil {
		resolver = binder.NewReferenceResolver(compilerOptions, binder.ReferenceResolverHooks{})
	}
	tx := &CommonJSModuleTransformer{compilerOptions: compilerOptions, resolver: resolver, getEmitModuleFormatOfFile: opts.GetEmitModuleFormatOfFile}
	tx.topLevelVisitor = emitContext.NewNodeVisitor(tx.visitTopLevel)
	tx.topLevelNestedVisitor = emitContext.NewNodeVisitor(tx.visitTopLevelNested)
	tx.discardedValueVisitor = emitContext.NewNodeVisitor(tx.visitDiscardedValue)
	tx.assignmentPatternVisitor = emitContext.NewNodeVisitor(tx.visitAssignmentPattern)
	tx.languageVersion = compilerOptions.GetEmitScriptTarget()
	tx.moduleKind = compilerOptions.GetEmitModuleKind()
	return tx.NewTransformer(tx.visit, emitContext)
}

// Pushes a new child node onto the ancestor tracking stack, returning the grandparent node to be restored later via `popNode`.
func (tx *CommonJSModuleTransformer) pushNode(node *ast.Node) (grandparentNode *ast.Node) {
	grandparentNode = tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = node
	return
}

// Pops the last child node off the ancestor tracking stack, restoring the grandparent node.
func (tx *CommonJSModuleTransformer) popNode(grandparentNode *ast.Node) {
	tx.currentNode = tx.parentNode
	tx.parentNode = grandparentNode
}

// Visits a node at the top level of the source file.
func (tx *CommonJSModuleTransformer) visitTopLevel(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	switch node.Kind {
	case ast.KindImportDeclaration:
		node = tx.visitTopLevelImportDeclaration(node.AsImportDeclaration())
	case ast.KindImportEqualsDeclaration:
		node = tx.visitTopLevelImportEqualsDeclaration(node.AsImportEqualsDeclaration())
	case ast.KindExportDeclaration:
		node = tx.visitTopLevelExportDeclaration(node.AsExportDeclaration())
	case ast.KindExportAssignment:
		node = tx.visitTopLevelExportAssignment(node.AsExportAssignment())
	case ast.KindFunctionDeclaration:
		node = tx.visitTopLevelFunctionDeclaration(node.AsFunctionDeclaration())
	case ast.KindClassDeclaration:
		node = tx.visitTopLevelClassDeclaration(node.AsClassDeclaration())
	case ast.KindVariableStatement:
		node = tx.visitTopLevelVariableStatement(node.AsVariableStatement())
	default:
		node = tx.visitTopLevelNestedNoStack(node)
	}
	return node
}

// Visits nested elements at the top-level of a module.
func (tx *CommonJSModuleTransformer) visitTopLevelNested(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	return tx.visitTopLevelNestedNoStack(node)
}

// Visits nested elements at the top-level of a module without ancestor tracking.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedNoStack(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindVariableStatement:
		node = tx.visitTopLevelNestedVariableStatement(node.AsVariableStatement())
	case ast.KindForStatement:
		node = tx.visitTopLevelNestedForStatement(node.AsForStatement())
	case ast.KindForInStatement, ast.KindForOfStatement:
		node = tx.visitTopLevelNestedForInOrOfStatement(node.AsForInOrOfStatement())
	case ast.KindDoStatement:
		node = tx.visitTopLevelNestedDoStatement(node.AsDoStatement())
	case ast.KindWhileStatement:
		node = tx.visitTopLevelNestedWhileStatement(node.AsWhileStatement())
	case ast.KindLabeledStatement:
		node = tx.visitTopLevelNestedLabeledStatement(node.AsLabeledStatement())
	case ast.KindWithStatement:
		node = tx.visitTopLevelNestedWithStatement(node.AsWithStatement())
	case ast.KindIfStatement:
		node = tx.visitTopLevelNestedIfStatement(node.AsIfStatement())
	case ast.KindSwitchStatement:
		node = tx.visitTopLevelNestedSwitchStatement(node.AsSwitchStatement())
	case ast.KindCaseBlock:
		node = tx.visitTopLevelNestedCaseBlock(node.AsCaseBlock())
	case ast.KindCaseClause, ast.KindDefaultClause:
		node = tx.visitTopLevelNestedCaseOrDefaultClause(node.AsCaseOrDefaultClause())
	case ast.KindTryStatement:
		node = tx.visitTopLevelNestedTryStatement(node.AsTryStatement())
	case ast.KindCatchClause:
		node = tx.visitTopLevelNestedCatchClause(node.AsCatchClause())
	case ast.KindBlock:
		node = tx.visitTopLevelNestedBlock(node.AsBlock())
	default:
		node = tx.visitNoStack(node, false /*resultIsDiscarded*/)
	}
	return node
}

// Visits source elements that are not top-level or top-level nested statements.
func (tx *CommonJSModuleTransformer) visit(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	return tx.visitNoStack(node, false /*resultIsDiscarded*/)
}

// Visits source elements that are not top-level or top-level nested statements without ancestor tracking.
func (tx *CommonJSModuleTransformer) visitNoStack(node *ast.Node, resultIsDiscarded bool) *ast.Node {
	// This visitor does not need to descend into the tree if there are no dynamic imports or identifiers in the subtree
	if !ast.IsSourceFile(node) && node.SubtreeFacts()&(ast.SubtreeContainsDynamicImport|ast.SubtreeContainsIdentifier) == 0 {
		return node
	}

	switch node.Kind {
	case ast.KindSourceFile:
		node = tx.visitSourceFile(node.AsSourceFile())
	case ast.KindForStatement:
		node = tx.visitForStatement(node.AsForStatement())
	case ast.KindForInStatement, ast.KindForOfStatement:
		node = tx.visitForInOrOfStatement(node.AsForInOrOfStatement())
	case ast.KindExpressionStatement:
		node = tx.visitExpressionStatement(node.AsExpressionStatement())
	case ast.KindVoidExpression:
		node = tx.visitVoidExpression(node.AsVoidExpression())
	case ast.KindParenthesizedExpression:
		node = tx.visitParenthesizedExpression(node.AsParenthesizedExpression(), resultIsDiscarded)
	case ast.KindPartiallyEmittedExpression:
		node = tx.visitPartiallyEmittedExpression(node.AsPartiallyEmittedExpression(), resultIsDiscarded)
	case ast.KindCallExpression:
		node = tx.visitCallExpression(node.AsCallExpression())
	case ast.KindTaggedTemplateExpression:
		node = tx.visitTaggedTemplateExpression(node.AsTaggedTemplateExpression())
	case ast.KindBinaryExpression:
		node = tx.visitBinaryExpression(node.AsBinaryExpression(), resultIsDiscarded)
	case ast.KindPrefixUnaryExpression:
		node = tx.visitPrefixUnaryExpression(node.AsPrefixUnaryExpression(), resultIsDiscarded)
	case ast.KindPostfixUnaryExpression:
		node = tx.visitPostfixUnaryExpression(node.AsPostfixUnaryExpression(), resultIsDiscarded)
	case ast.KindShorthandPropertyAssignment:
		node = tx.visitShorthandPropertyAssignment(node.AsShorthandPropertyAssignment())
	case ast.KindIdentifier:
		node = tx.visitIdentifier(node)
	default:
		node = tx.Visitor().VisitEachChild(node)
	}

	return node
}

// Visits source elements whose value is discarded if they are expressions.
func (tx *CommonJSModuleTransformer) visitDiscardedValue(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	return tx.visitNoStack(node, true /*resultIsDiscarded*/)
}

func (tx *CommonJSModuleTransformer) visitAssignmentPattern(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	return tx.visitAssignmentPatternNoStack(node)
}

func (tx *CommonJSModuleTransformer) visitAssignmentPatternNoStack(node *ast.Node) *ast.Node {
	switch node.Kind {
	// AssignmentPattern
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression:
		node = tx.assignmentPatternVisitor.VisitEachChild(node)

	// AssignmentProperty
	case ast.KindPropertyAssignment:
		node = tx.visitAssignmentProperty(node.AsPropertyAssignment())
	case ast.KindShorthandPropertyAssignment:
		node = tx.visitShorthandAssignmentProperty(node.AsShorthandPropertyAssignment())

	// AssignmentRestProperty
	case ast.KindSpreadAssignment:
		node = tx.visitAssignmentRestProperty(node.AsSpreadAssignment())

	// AssignmentRestElement
	case ast.KindSpreadElement:
		node = tx.visitAssignmentRestElement(node.AsSpreadElement())

	// AssignmentElement
	default:
		if ast.IsExpression(node) {
			node = tx.visitAssignmentElement(node)
			break
		}

		node = tx.visitNoStack(node, false /*resultIsDiscarded*/)
	}
	return node
}

func (tx *CommonJSModuleTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile ||
		!(ast.IsEffectiveExternalModule(node, tx.compilerOptions) ||
			node.SubtreeFacts()&ast.SubtreeContainsDynamicImport != 0) {
		return node.AsNode()
	}

	tx.currentSourceFile = node
	tx.currentModuleInfo = collectExternalModuleInfo(node, tx.compilerOptions, tx.EmitContext(), tx.resolver)
	updated := tx.transformCommonJSModule(node)
	tx.currentSourceFile = nil
	tx.currentModuleInfo = nil
	return updated
}

func (tx *CommonJSModuleTransformer) shouldEmitUnderscoreUnderscoreESModule() bool {
	if tspath.FileExtensionIsOneOf(tx.currentSourceFile.FileName(), tspath.SupportedJSExtensionsFlat) &&
		tx.currentSourceFile.CommonJSModuleIndicator != nil &&
		(tx.currentSourceFile.ExternalModuleIndicator == nil /*|| tx.currentSourceFile.ExternalModuleIndicator == true*/) { // !!!
		return false
	}
	if tx.currentModuleInfo.exportEquals == nil && ast.IsExternalModule(tx.currentSourceFile) {
		return true
	}
	return false
}

func (tx *CommonJSModuleTransformer) createUnderscoreUnderscoreESModule() *ast.Statement {
	statement := tx.Factory().NewExpressionStatement(
		tx.Factory().NewCallExpression(
			tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewIdentifier("Object"),
				nil, /*questionDotToken*/
				tx.Factory().NewIdentifier("defineProperty"),
				ast.NodeFlagsNone,
			),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewIdentifier("exports"),
				tx.Factory().NewStringLiteral("__esModule"),
				tx.Factory().NewObjectLiteralExpression(
					tx.Factory().NewNodeList([]*ast.Node{
						tx.Factory().NewPropertyAssignment(
							nil, /*modifiers*/
							tx.Factory().NewIdentifier("value"),
							nil, /*postfixToken*/
							nil, /*typeNode*/
							tx.Factory().NewTrueExpression(),
						),
					}),
					false, /*multiLine*/
				),
			}),
			ast.NodeFlagsNone,
		),
	)
	tx.EmitContext().SetEmitFlags(statement, printer.EFCustomPrologue)
	return statement
}

func (tx *CommonJSModuleTransformer) transformCommonJSModule(node *ast.SourceFile) *ast.Node {
	tx.EmitContext().StartVariableEnvironment()

	// emit standard prologue directives (e.g. "use strict")
	prologue, rest := tx.Factory().SplitStandardPrologue(node.Statements.Nodes)
	statements := slices.Clone(prologue)

	// ensure "use strict" if not present
	if ast.IsExternalModule(tx.currentSourceFile) ||
		tx.compilerOptions.AlwaysStrict.DefaultIfUnknown(tx.compilerOptions.Strict).IsTrue() {
		statements = tx.Factory().EnsureUseStrict(statements)
	}

	// emit custom prologues from other transformations
	custom, rest := tx.Factory().SplitCustomPrologue(rest)
	statements = append(statements, core.FirstResult(tx.topLevelVisitor.VisitSlice(custom))...)

	// emits `Object.defineProperty(exports, "__esModule", { value: true });` at the top of the file
	if tx.shouldEmitUnderscoreUnderscoreESModule() {
		statements = append(statements, tx.createUnderscoreUnderscoreESModule())
	}

	// initialize all exports to `undefined`, e.g.:
	//  exports.a = exports.b = void 0;
	if len(tx.currentModuleInfo.exportedNames) > 0 {
		const chunkSize = 50
		l := len(tx.currentModuleInfo.exportedNames)
		for i := 0; i < l; i += chunkSize {
			right := tx.Factory().NewVoidZeroExpression()
			for _, nextId := range tx.currentModuleInfo.exportedNames[i:min(i+chunkSize, l)] {
				var left *ast.Expression
				if nextId.Kind == ast.KindStringLiteral {
					left = tx.Factory().NewElementAccessExpression(
						tx.Factory().NewIdentifier("exports"),
						nil, /*questionDotToken*/
						tx.Factory().NewStringLiteralFromNode(nextId),
						ast.NodeFlagsNone,
					)
				} else {
					name := nextId.Clone(tx.Factory())
					tx.EmitContext().SetEmitFlags(name, printer.EFNoSourceMap) // TODO: Strada emits comments here, but shouldn't
					left = tx.Factory().NewPropertyAccessExpression(
						tx.Factory().NewIdentifier("exports"),
						nil, /*questionDotToken*/
						name,
						ast.NodeFlagsNone,
					)
				}
				right = tx.Factory().NewAssignmentExpression(left, right)
			}
			statement := tx.Factory().NewExpressionStatement(right)
			tx.EmitContext().AddEmitFlags(statement, printer.EFCustomPrologue)
			statements = append(statements, statement)
		}
	}

	// initialize exports for function declarations, e.g.:
	//  exports.f = f;
	//  function f() {}
	for f := range tx.currentModuleInfo.exportedFunctions.Values() {
		statements = tx.appendExportsOfClassOrFunctionDeclaration(statements, f.AsNode())
	}

	// visit the remaining statements in the source file
	rest, _ = tx.topLevelVisitor.VisitSlice(rest)
	statements = append(statements, rest...)

	// emit `module.exports = ...` if needd
	statements = tx.appendExportEqualsIfNeeded(statements)

	// merge temp variables into the statement list
	statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)

	statementList := tx.Factory().NewNodeList(statements)
	statementList.Loc = node.Statements.Loc
	result := tx.Factory().UpdateSourceFile(node, statementList, node.EndOfFileToken).AsSourceFile()
	tx.EmitContext().AddEmitHelper(result.AsNode(), tx.EmitContext().ReadEmitHelpers()...)

	externalHelpersImportDeclaration := createExternalHelpersImportDeclarationIfNeeded(tx.EmitContext(), result, tx.compilerOptions, tx.getEmitModuleFormatOfFile(node), false /*hasExportStarsToExportValues*/, false /*hasImportStar*/, false /*hasImportDefault*/)
	if externalHelpersImportDeclaration != nil {
		prologue, rest := tx.Factory().SplitStandardPrologue(result.Statements.Nodes)
		custom, rest := tx.Factory().SplitCustomPrologue(rest)
		statements := slices.Clone(prologue)
		statements = append(statements, custom...)
		statements = append(statements, tx.topLevelVisitor.VisitNode(externalHelpersImportDeclaration))
		statements = append(statements, rest...)
		statementList := tx.Factory().NewNodeList(statements)
		statementList.Loc = result.Statements.Loc
		result = tx.Factory().UpdateSourceFile(result, statementList, node.EndOfFileToken).AsSourceFile()
	}

	return result.AsNode()
}

// Adds the down-level representation of `export=` to the statement list if one exists in the source file.
//
// - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
func (tx *CommonJSModuleTransformer) appendExportEqualsIfNeeded(statements []*ast.Statement) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil {
		expressionResult := tx.Visitor().VisitNode(tx.currentModuleInfo.exportEquals.Expression)
		if expressionResult != nil {
			statement := tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(
					tx.Factory().NewPropertyAccessExpression(
						tx.Factory().NewIdentifier("module"),
						nil, /*questionDotToken*/
						tx.Factory().NewIdentifier("exports"),
						ast.NodeFlagsNone,
					),
					expressionResult,
				),
			)

			tx.EmitContext().AssignCommentAndSourceMapRanges(statement, tx.currentModuleInfo.exportEquals.AsNode())
			tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
			statements = append(statements, statement)
		}
	}
	return statements
}

// Appends the exports of an ImportDeclaration to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `decl` parameter is the declaration whose exports are to be recorded.
func (tx *CommonJSModuleTransformer) appendExportsOfImportDeclaration(statements []*ast.Statement, decl *ast.ImportDeclaration) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil {
		return statements
	}

	importClause := decl.ImportClause
	if importClause == nil {
		return statements
	}

	seen := &collections.Set[string]{}
	if importClause.Name() != nil {
		statements = tx.appendExportsOfDeclaration(statements, importClause, seen, false /*liveBinding*/)
	}

	namedBindings := importClause.AsImportClause().NamedBindings
	if namedBindings != nil {
		switch namedBindings.Kind {
		case ast.KindNamespaceImport:
			statements = tx.appendExportsOfDeclaration(statements, namedBindings, seen, false /*liveBinding*/)

		case ast.KindNamedImports:
			for _, importBinding := range namedBindings.AsNamedImports().Elements.Nodes {
				statements = tx.appendExportsOfDeclaration(statements, importBinding, seen, true /*liveBinding*/)
			}
		}
	}

	return statements
}

// Appends the exports of a VariableStatement to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `node` parameter is the VariableStatement whose exports are to be recorded.
func (tx *CommonJSModuleTransformer) appendExportsOfVariableStatement(statements []*ast.Statement, node *ast.VariableStatement) []*ast.Statement {
	return tx.appendExportsOfVariableDeclarationList(statements, node.DeclarationList.AsVariableDeclarationList() /*isForInOrOfInitializer*/, false)
}

// Appends the exports of a VariableDeclarationList to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `node` parameter is the VariableDeclarationList whose exports are to be recorded.
func (tx *CommonJSModuleTransformer) appendExportsOfVariableDeclarationList(statements []*ast.Statement, node *ast.VariableDeclarationList, isForInOrOfInitializer bool) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil {
		return statements
	}

	for _, decl := range node.Declarations.Nodes {
		statements = tx.appendExportsOfBindingElement(statements, decl, isForInOrOfInitializer)
	}

	return statements
}

// Appends the exports of a VariableDeclaration or BindingElement to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `decl` parameter is the declaration whose exports are to be recorded.
func (tx *CommonJSModuleTransformer) appendExportsOfBindingElement(statements []*ast.Statement, decl *ast.Node /*VariableDeclaration | BindingElement*/, isForInOrOfInitializer bool) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil || decl.Name() == nil {
		return statements
	}

	if ast.IsBindingPattern(decl.Name()) {
		for _, element := range decl.Name().AsBindingPattern().Elements.Nodes {
			e := element.AsBindingElement()
			if e.DotDotDotToken == nil && e.Name() == nil {
				statements = tx.appendExportsOfBindingElement(statements, element, isForInOrOfInitializer)
			}
		}
	} else if !transformers.IsGeneratedIdentifier(tx.EmitContext(), decl.Name()) &&
		(!ast.IsVariableDeclaration(decl) || decl.Initializer() != nil || isForInOrOfInitializer) {
		statements = tx.appendExportsOfDeclaration(statements, decl, nil /*seen*/, false /*liveBinding*/)
	}

	return statements
}

// Appends the exports of a ClassDeclaration or FunctionDeclaration to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `decl` parameter is the declaration whose exports are to be recorded.
func (tx *CommonJSModuleTransformer) appendExportsOfClassOrFunctionDeclaration(statements []*ast.Statement, decl *ast.Declaration) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil {
		return statements
	}

	seen := &collections.Set[string]{}
	if ast.HasSyntacticModifier(decl, ast.ModifierFlagsExport) {
		var exportName *ast.IdentifierNode
		if ast.HasSyntacticModifier(decl, ast.ModifierFlagsDefault) {
			exportName = tx.Factory().NewIdentifier("default")
		} else {
			exportName = tx.Factory().GetDeclarationName(decl)
		}

		exportValue := tx.Factory().GetLocalName(decl)
		statements = tx.appendExportStatement(statements, seen, exportName, exportValue, &decl.Loc, false /*allowComments*/, false /*liveBinding*/)
	}

	if decl.Name() != nil {
		return tx.appendExportsOfDeclaration(statements, decl, seen, false /*liveBinding*/)
	}

	return statements
}

// Appends the exports of a declaration to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `decl` parameter is the declaration to export.
func (tx *CommonJSModuleTransformer) appendExportsOfDeclaration(statements []*ast.Statement, decl *ast.Declaration, seen *collections.Set[string], liveBinding bool) []*ast.Statement {
	if tx.currentModuleInfo.exportEquals != nil {
		return statements
	}

	if seen == nil {
		seen = &collections.Set[string]{}
	}

	if name := decl.Name(); tx.currentModuleInfo.exportSpecifiers.Len() > 0 && name != nil && ast.IsIdentifier(name) {
		name = tx.Factory().GetDeclarationName(decl)
		exportSpecifiers := tx.currentModuleInfo.exportSpecifiers.Get(name.Text())
		if len(exportSpecifiers) > 0 {
			exportValue := tx.visitExpressionIdentifier(name)
			for _, exportSpecifier := range exportSpecifiers {
				statements = tx.appendExportStatement(statements, seen, exportSpecifier.Name(), exportValue, &exportSpecifier.Name().Loc /*location*/, false /*allowComments*/, liveBinding)
			}
		}
	}

	return statements
}

// Appends the down-level representation of an export to a statement list, returning the statement list.
//
//   - The `statements` parameter is a statement list to which the down-level export statements are to be appended.
//   - The `exportName` parameter is the name of the export.
//   - The `expression` parameter is the expression to export.
//   - The `location` parameter is the location to use for source maps and comments for the export.
//   - The `allowComments` parameter indicates whether to allow comments on the export.
func (tx *CommonJSModuleTransformer) appendExportStatement(statements []*ast.Statement, seen *collections.Set[string], exportName *ast.ModuleExportName, expression *ast.Expression, location *core.TextRange, allowComments bool, liveBinding bool) []*ast.Statement {
	if exportName.Kind != ast.KindStringLiteral {
		if seen.Has(exportName.Text()) {
			return statements
		}
		seen.Add(exportName.Text())
	}
	statements = append(statements, tx.createExportStatement(exportName, expression, location, allowComments, liveBinding))
	return statements
}

// Creates a call to the current file's export function to export a value.
//
//   - The `name` parameter is the bound name of the export.
//   - The `value` parameter is the exported value.
//   - The `location` parameter is the location to use for source maps and comments for the export.
//   - The `allowComments` parameter indicates whether to emit comments for the statement.
func (tx *CommonJSModuleTransformer) createExportStatement(name *ast.ModuleExportName, value *ast.Expression, location *core.TextRange, allowComments bool, liveBinding bool) *ast.Statement {
	statement := tx.Factory().NewExpressionStatement(tx.createExportExpression(name, value, nil /*location*/, liveBinding))
	if location != nil {
		tx.EmitContext().SetCommentRange(statement, *location)
	}
	tx.EmitContext().AddEmitFlags(statement, printer.EFStartOnNewLine)
	if !allowComments {
		tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
	}
	return statement
}

// Creates a call to the current file's export function to export a value.
//
//   - The `name` parameter is the bound name of the export.
//   - The `value` parameter is the exported value.
//   - The `location` parameter is the location to use for source maps and comments for the export.
func (tx *CommonJSModuleTransformer) createExportExpression(name *ast.ModuleExportName, value *ast.Expression, location *core.TextRange, liveBinding bool) *ast.Expression {
	var expression *ast.Expression
	if liveBinding {
		// For a live binding we emit a getter on `exports` that returns the value:
		//  Object.defineProperty(exports, "<name>", { enumerable: true, get: function () { return <value>; } });
		expression = tx.Factory().NewCallExpression(
			tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewIdentifier("Object"),
				nil, /*questionDotToken*/
				tx.Factory().NewIdentifier("defineProperty"),
				ast.NodeFlagsNone,
			),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewIdentifier("exports"),
				tx.Factory().NewStringLiteralFromNode(name),
				tx.Factory().NewObjectLiteralExpression(
					tx.Factory().NewNodeList([]*ast.Node{
						tx.Factory().NewPropertyAssignment(
							nil, /*modifiers*/
							tx.Factory().NewIdentifier("enumerable"),
							nil, /*postfixToken*/
							nil, /*typeNode*/
							tx.Factory().NewTrueExpression(),
						),
						tx.Factory().NewPropertyAssignment(
							nil, /*modifiers*/
							tx.Factory().NewIdentifier("get"),
							nil, /*postfixToken*/
							nil, /*typeNode*/
							tx.Factory().NewFunctionExpression(
								nil, /*modifiers*/
								nil, /*asteriskToken*/
								nil, /*name*/
								nil, /*typeParameters*/
								tx.Factory().NewNodeList([]*ast.Node{}),
								nil, /*type*/
								nil, /*fullSignature*/
								tx.Factory().NewBlock(
									tx.Factory().NewNodeList([]*ast.Node{
										tx.Factory().NewReturnStatement(value),
									}),
									false, /*multiLine*/
								),
							),
						),
					}),
					false, /*multiLine*/
				),
			}),
			ast.NodeFlagsNone,
		)
	} else {
		// Otherwise, we emit a simple property assignment.
		var left *ast.Expression
		if name.Kind == ast.KindStringLiteral {
			// emits:
			//  exports["<name>"] = <value>;
			left = tx.Factory().NewElementAccessExpression(
				tx.Factory().NewIdentifier("exports"),
				nil, /*questionDotToken*/
				tx.Factory().NewStringLiteralFromNode(name),
				ast.NodeFlagsNone,
			)
		} else {
			// emits:
			//  exports.<name> = <value>;
			left = tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewIdentifier("exports"),
				nil, /*questionDotToken*/
				name.Clone(tx.Factory()),
				ast.NodeFlagsNone,
			)
		}
		expression = tx.Factory().NewAssignmentExpression(left, value)
	}
	if location != nil {
		tx.EmitContext().SetCommentRange(expression, *location)
	}
	return expression
}

// Creates a `require()` call to import an external module.
func (tx *CommonJSModuleTransformer) createRequireCall(node *ast.Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration*/) *ast.Node {
	var args []*ast.Expression
	moduleName := getExternalModuleNameLiteral(tx.Factory(), node, tx.currentSourceFile, nil /*host*/, nil /*resolver*/, tx.compilerOptions)
	if moduleName != nil {
		args = append(args, rewriteModuleSpecifier(tx.EmitContext(), moduleName, tx.compilerOptions))
	}
	return tx.Factory().NewCallExpression(
		tx.Factory().NewIdentifier("require"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.Factory().NewNodeList(args),
		ast.NodeFlagsNone)
}

func (tx *CommonJSModuleTransformer) getHelperExpressionForExport(node *ast.ExportDeclaration, innerExpr *ast.Expression) *ast.Expression {
	if !tx.compilerOptions.GetESModuleInterop() || tx.EmitContext().EmitFlags(node.AsNode())&printer.EFNeverApplyImportHelper != 0 {
		return innerExpr
	}
	if getExportNeedsImportStarHelper(node) {
		return tx.Visitor().VisitNode(tx.Factory().NewImportStarHelper(innerExpr))
	}
	return innerExpr
}

func (tx *CommonJSModuleTransformer) getHelperExpressionForImport(node *ast.ImportDeclaration, innerExpr *ast.Expression) *ast.Expression {
	if !tx.compilerOptions.GetESModuleInterop() || tx.EmitContext().EmitFlags(node.AsNode())&printer.EFNeverApplyImportHelper != 0 {
		return innerExpr
	}
	if getImportNeedsImportStarHelper(node) {
		return tx.Visitor().VisitNode(tx.Factory().NewImportStarHelper(innerExpr))
	}
	if getImportNeedsImportDefaultHelper(node) {
		return tx.Visitor().VisitNode(tx.Factory().NewImportDefaultHelper(innerExpr))
	}
	return innerExpr
}

func (tx *CommonJSModuleTransformer) visitTopLevelImportDeclaration(node *ast.ImportDeclaration) *ast.Node {
	if node.ImportClause == nil {
		// import "mod";
		statement := tx.Factory().NewExpressionStatement(tx.createRequireCall(node.AsNode()))
		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
		return statement
	}

	var statements []*ast.Statement
	var variables []*ast.VariableDeclarationNode
	namespaceDeclaration := ast.GetNamespaceDeclarationNode(node.AsNode())
	if namespaceDeclaration != nil && !ast.IsDefaultImport(node.AsNode()) {
		// import * as n from "mod";
		variables = append(variables,
			tx.Factory().NewVariableDeclaration(
				namespaceDeclaration.Name().Clone(tx.Factory()),
				nil, /*exclamationToken*/
				nil, /*type*/
				tx.getHelperExpressionForImport(node, tx.createRequireCall(node.AsNode())),
			),
		)
	} else {
		// import d from "mod";
		// import { x, y } from "mod";
		// import d, { x, y } from "mod";
		// import d, * as n from "mod";
		variables = append(variables,
			tx.Factory().NewVariableDeclaration(
				tx.Factory().NewGeneratedNameForNode(node.AsNode()),
				nil, /*exclamationToken*/
				nil, /*type*/
				tx.getHelperExpressionForImport(node, tx.createRequireCall(node.AsNode())),
			),
		)

		if namespaceDeclaration != nil && ast.IsDefaultImport(node.AsNode()) {
			variables = append(variables,
				tx.Factory().NewVariableDeclaration(
					namespaceDeclaration.Name().Clone(tx.Factory()),
					nil, /*exclamationToken*/
					nil, /*type*/
					tx.Factory().NewGeneratedNameForNode(node.AsNode()),
				),
			)
		}
	}

	varStatement := tx.Factory().NewVariableStatement(
		nil, /*modifiers*/
		tx.Factory().NewVariableDeclarationList(
			ast.NodeFlagsConst,
			tx.Factory().NewNodeList(variables),
		),
	)

	tx.EmitContext().SetOriginal(varStatement, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(varStatement, node.AsNode())
	statements = append(statements, varStatement)
	statements = tx.appendExportsOfImportDeclaration(statements, node)
	return transformers.SingleOrMany(statements, tx.Factory())
}

func (tx *CommonJSModuleTransformer) visitTopLevelImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) *ast.Node {
	if !ast.IsExternalModuleImportEqualsDeclaration(node.AsNode()) {
		// import m = n;
		panic("import= for internal module references should be handled in an earlier transformer.")
	}

	var statements []*ast.Statement
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		// export import m = require("mod");
		statement := tx.Factory().NewExpressionStatement(
			tx.createExportExpression(
				node.Name(),
				tx.createRequireCall(node.AsNode()),
				&node.Loc,
				false, /*liveBinding*/
			),
		)

		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
		statements = append(statements, statement)
	} else {
		// import m = require("mod");
		statement := tx.Factory().NewVariableStatement(
			nil, /*modifiers*/
			tx.Factory().NewVariableDeclarationList(
				ast.NodeFlagsConst,
				tx.Factory().NewNodeList([]*ast.VariableDeclarationNode{
					tx.Factory().NewVariableDeclaration(
						node.Name().Clone(tx.Factory()),
						nil, /*exclamationToken*/
						nil, /*typeNode*/
						tx.createRequireCall(node.AsNode()),
					),
				}),
			),
		)
		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
		statements = append(statements, statement)
	}

	statements = tx.appendExportsOfDeclaration(statements, node.AsNode(), nil /*seen*/, false /*liveBinding*/)
	return transformers.SingleOrMany(statements, tx.Factory())
}

func (tx *CommonJSModuleTransformer) visitTopLevelExportDeclaration(node *ast.ExportDeclaration) *ast.Node {
	if node.ModuleSpecifier == nil {
		// Elide export declarations with no module specifier as they are handled
		// elsewhere.
		return nil
	}

	generatedName := tx.Factory().NewGeneratedNameForNode(node.AsNode())
	if node.ExportClause != nil && ast.IsNamedExports(node.ExportClause) {
		// export { x, y } from "mod";
		var statements []*ast.Statement
		varStatement := tx.Factory().NewVariableStatement(
			nil, /*modifiers*/
			tx.Factory().NewVariableDeclarationList(
				ast.NodeFlagsConst,
				tx.Factory().NewNodeList([]*ast.VariableDeclarationNode{
					tx.Factory().NewVariableDeclaration(
						generatedName,
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.createRequireCall(node.AsNode()),
					),
				}),
			),
		)
		tx.EmitContext().SetOriginal(varStatement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(varStatement, node.AsNode())
		statements = append(statements, varStatement)

		for _, specifier := range node.ExportClause.AsNamedExports().Elements.Nodes {
			specifierName := specifier.PropertyNameOrName()
			exportNeedsImportDefault := tx.compilerOptions.GetESModuleInterop() &&
				tx.EmitContext().EmitFlags(node.AsNode())&printer.EFNeverApplyImportHelper == 0 &&
				ast.ModuleExportNameIsDefault(specifierName)

			var target *ast.Node
			if exportNeedsImportDefault {
				target = tx.Factory().NewImportDefaultHelper(generatedName)
			} else {
				target = generatedName
			}

			var exportName *ast.Node
			if ast.IsStringLiteral(specifier.Name()) {
				exportName = tx.Factory().NewStringLiteralFromNode(specifier.Name())
			} else {
				exportName = tx.Factory().GetExportName(specifier.AsNode())
			}

			var exportedValue *ast.Node
			if ast.IsStringLiteral(specifierName) {
				exportedValue = tx.Factory().NewElementAccessExpression(target, nil /*questionDotToken*/, specifierName, ast.NodeFlagsNone)
			} else {
				exportedValue = tx.Factory().NewPropertyAccessExpression(target, nil /*questionDotToken*/, specifierName, ast.NodeFlagsNone)
			}
			statement := tx.Factory().NewExpressionStatement(
				tx.createExportExpression(
					exportName,
					exportedValue,
					nil,  /*location*/
					true, /*liveBinding*/
				),
			)
			tx.EmitContext().SetOriginal(statement, specifier.AsNode())
			tx.EmitContext().AssignCommentAndSourceMapRanges(statement, specifier.AsNode())
			statements = append(statements, statement)
		}

		return transformers.SingleOrMany(statements, tx.Factory())
	}

	if node.ExportClause != nil {
		// export * as ns from "mod";
		// export * as default from "mod";
		var exportName *ast.Node
		if ast.IsStringLiteral(node.ExportClause.Name()) {
			exportName = tx.Factory().NewStringLiteralFromNode(node.ExportClause.Name())
		} else {
			exportName = node.ExportClause.Name().Clone(tx.Factory())
		}
		statement := tx.Factory().NewExpressionStatement(
			tx.createExportExpression(
				exportName,
				tx.getHelperExpressionForExport(
					node,
					tx.createRequireCall(node.AsNode()),
				),
				nil,   /*location*/
				false, /*liveBinding*/
			),
		)
		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
		return statement
	}

	// export * from "mod";
	statement := tx.Factory().NewExpressionStatement(
		tx.Visitor().VisitNode(tx.Factory().NewExportStarHelper(tx.createRequireCall(node.AsNode()), tx.Factory().NewIdentifier("exports"))),
	)
	tx.EmitContext().SetOriginal(statement, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
	return statement
}

func (tx *CommonJSModuleTransformer) visitTopLevelExportAssignment(node *ast.ExportAssignment) *ast.Node {
	if node.IsExportEquals {
		return nil
	}

	return tx.createExportStatement(
		tx.Factory().NewIdentifier("default"),
		tx.Visitor().VisitNode(node.Expression),
		&node.Loc, /*location*/
		true,      /*allowComments*/
		false,     /*liveBinding*/
	)
}

func (tx *CommonJSModuleTransformer) visitTopLevelFunctionDeclaration(node *ast.FunctionDeclaration) *ast.Node {
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		return tx.Factory().UpdateFunctionDeclaration(
			node,
			transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault),
			node.AsteriskToken,
			tx.Factory().GetDeclarationName(node.AsNode()),
			nil, /*typeParameters*/
			tx.Visitor().VisitNodes(node.Parameters),
			nil, /*type*/
			nil, /*fullSignature*/
			tx.Visitor().VisitNode(node.Body),
		)
	} else {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}
}

func (tx *CommonJSModuleTransformer) visitTopLevelClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	var statements []*ast.Statement
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		statements = append(statements, tx.Factory().UpdateClassDeclaration(
			node,
			tx.Visitor().VisitModifiers(transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault)),
			tx.Factory().GetDeclarationName(node.AsNode()),
			nil, /*typeParameters*/
			tx.Visitor().VisitNodes(node.HeritageClauses),
			tx.Visitor().VisitNodes(node.Members),
		))
	} else {
		statements = append(statements, tx.Visitor().VisitEachChild(node.AsNode()))
	}
	statements = tx.appendExportsOfClassOrFunctionDeclaration(statements, node.AsNode())
	return transformers.SingleOrMany(statements, tx.Factory())
}

func (tx *CommonJSModuleTransformer) visitTopLevelVariableStatement(node *ast.VariableStatement) *ast.Node {
	var statements []*ast.Statement
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		// export var a = b;
		var variables []*ast.VariableDeclarationNode
		var expressions []*ast.Expression
		var modifiers *ast.ModifierList

		commitPendingVariables := func() {
			if len(variables) > 0 {
				variableList := tx.Factory().NewNodeList(variables)
				variableList.Loc = node.DeclarationList.AsVariableDeclarationList().Declarations.Loc
				statement := tx.Factory().UpdateVariableStatement(
					node,
					modifiers,
					tx.Factory().UpdateVariableDeclarationList(
						node.DeclarationList.AsVariableDeclarationList(),
						variableList,
					),
				)
				if len(statements) > 0 {
					tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
				}
				statements = append(statements, statement)
				variables = nil
			}
		}

		commitPendingExpressions := func() {
			if len(expressions) > 0 {
				statement := tx.Factory().NewExpressionStatement(tx.Factory().InlineExpressions(expressions))
				tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())
				if len(statements) > 0 {
					tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
				}
				statements = append(statements, statement)
				expressions = nil
			}
		}

		pushVariable := func(variable *ast.VariableDeclarationNode) {
			commitPendingExpressions()
			variables = append(variables, variable)
		}

		pushExpression := func(expression *ast.Expression) {
			commitPendingVariables()
			expressions = append(expressions, expression)
		}

		// If we're exporting these variables, then these just become assignments to 'exports.x'.
		for _, variable := range node.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			v := variable.AsVariableDeclaration()

			if ast.IsIdentifier(v.Name()) && transformers.IsLocalName(tx.EmitContext(), v.Name()) {
				// A "local name" generally means a variable declaration that *shouldn't* be
				// converted to `exports.x = ...`, even if the declaration is exported. This
				// usually indicates a class or function declaration that was converted into
				// a variable declaration, as most references to the declaration will remain
				// untransformed (i.e., `new C` rather than `new exports.C`). In these cases,
				// an `export { x }` declaration will follow.

				if modifiers == nil {
					modifiers = transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault)
				}

				if v.Initializer != nil {
					variable = tx.Factory().UpdateVariableDeclaration(
						v,
						v.Name(),
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.createExportExpression(
							v.Name(),
							tx.Visitor().VisitNode(v.Initializer),
							nil,
							false, /*liveBinding*/
						),
					)
				}

				pushVariable(variable)
			} else if v.Initializer != nil && !ast.IsBindingPattern(v.Name()) && (ast.IsArrowFunction(v.Initializer) || (ast.IsFunctionExpression(v.Initializer) || ast.IsClassExpression(v.Initializer)) && v.Initializer.Name() == nil) {
				// preserve variable declarations for functions and classes to assign names

				pushVariable(tx.Factory().NewVariableDeclaration(
					v.Name(),
					v.ExclamationToken,
					v.Type,
					tx.Visitor().VisitNode(v.Initializer),
				))

				propertyAccess := tx.Factory().NewPropertyAccessExpression(
					tx.Factory().NewIdentifier("exports"),
					nil, /*questionDotToken*/
					v.Name(),
					ast.NodeFlagsNone,
				)
				tx.EmitContext().AssignCommentAndSourceMapRanges(propertyAccess, v.Name())

				pushExpression(tx.Factory().NewAssignmentExpression(
					propertyAccess,
					v.Name().Clone(tx.Factory()),
				))
			} else {
				expression := transformers.ConvertVariableDeclarationToAssignmentExpression(tx.EmitContext(), v)
				if expression != nil {
					pushExpression(tx.Visitor().VisitNode(expression))
				}
			}
		}

		commitPendingVariables()
		commitPendingExpressions()
		statements = tx.appendExportsOfVariableStatement(statements, node)
		return transformers.SingleOrMany(statements, tx.Factory())
	}
	return tx.visitTopLevelNestedVariableStatement(node)
}

// Visits a top-level nested variable statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedVariableStatement(node *ast.VariableStatement) *ast.Node {
	var statements []*ast.Statement
	statements = append(statements, tx.Visitor().VisitEachChild(node.AsNode()))
	statements = tx.appendExportsOfVariableStatement(statements, node)
	return transformers.SingleOrMany(statements, tx.Factory())
}

// Visits a top-level nested `for` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedForStatement(node *ast.ForStatement) *ast.Node {
	if node.Initializer != nil && ast.IsVariableDeclarationList(node.Initializer) && node.Initializer.Flags&ast.NodeFlagsBlockScoped == 0 {
		exportStatements := tx.appendExportsOfVariableDeclarationList(nil /*statements*/, node.Initializer.AsVariableDeclarationList(), false /*isForInOrOfInitializer*/)
		if len(exportStatements) > 0 {
			// given:
			//   export { x }
			//   for (var x = 0; ;) { }
			// emits:
			//   var x = 0;
			//   exports.x = x;
			//   for (; ;) { }

			var statements []*ast.Statement
			varDeclList := tx.discardedValueVisitor.VisitNode(node.Initializer)
			varStatement := tx.Factory().NewVariableStatement(nil /*modifiers*/, varDeclList)
			statements = append(statements, varStatement)
			statements = append(statements, exportStatements...)

			condition := tx.Visitor().VisitNode(node.Condition)
			incrementor := tx.discardedValueVisitor.VisitNode(node.Incrementor)
			body := tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor)
			statements = append(statements, tx.Factory().UpdateForStatement(
				node,
				nil, /*initializer*/
				condition,
				incrementor,
				body,
			))
			return transformers.SingleOrMany(statements, tx.Factory())
		}
	}
	return tx.Factory().UpdateForStatement(
		node,
		tx.discardedValueVisitor.VisitNode(node.Initializer),
		tx.Visitor().VisitNode(node.Condition),
		tx.discardedValueVisitor.VisitNode(node.Incrementor),
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
	)
}

// Visits a top-level nested `for..in` or `for..of` statement as it may contain `var` declarations that are hoisted and
// may still be exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedForInOrOfStatement(node *ast.ForInOrOfStatement) *ast.Node {
	if ast.IsVariableDeclarationList(node.Initializer) && node.Initializer.Flags&ast.NodeFlagsBlockScoped == 0 {
		exportStatements := tx.appendExportsOfVariableDeclarationList(nil /*statements*/, node.Initializer.AsVariableDeclarationList(), true /*isForInOrOfInitializer*/)
		if len(exportStatements) > 0 {
			// given:
			//   export { x }
			//   for (var x in y) {
			//     ...
			//   }
			// emits:
			//   for (var x in y) {
			//     exports.x = x;
			//     ...
			//   }

			initializer := tx.discardedValueVisitor.VisitNode(node.Initializer)
			expression := tx.Visitor().VisitNode(node.Expression)
			body := tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor)
			if ast.IsBlock(body) {
				block := body.AsBlock()
				bodyStatements := append(exportStatements, block.Statements.Nodes...)
				bodyStatementList := tx.Factory().NewNodeList(bodyStatements)
				bodyStatementList.Loc = block.Statements.Loc
				body = tx.Factory().UpdateBlock(block, bodyStatementList)
			} else {
				bodyStatements := append(exportStatements, body)
				body = tx.Factory().NewBlock(tx.Factory().NewNodeList(bodyStatements), true /*multiLine*/)
			}
			return tx.Factory().UpdateForInOrOfStatement(node, node.AwaitModifier, initializer, expression, body)
		}
	}
	return tx.Factory().UpdateForInOrOfStatement(
		node,
		node.AwaitModifier,
		tx.discardedValueVisitor.VisitNode(node.Initializer),
		tx.Visitor().VisitNode(node.Expression),
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
	)
}

// Visits a top-level nested `do` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedDoStatement(node *ast.DoStatement) *ast.Node {
	return tx.Factory().UpdateDoStatement(
		node,
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
		tx.Visitor().VisitNode(node.Expression),
	)
}

// Visits a top-level nested `while` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedWhileStatement(node *ast.WhileStatement) *ast.Node {
	return tx.Factory().UpdateWhileStatement(
		node,
		tx.Visitor().VisitNode(node.Expression),
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
	)
}

// Visits a top-level nested labeled statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedLabeledStatement(node *ast.LabeledStatement) *ast.Node {
	return tx.Factory().UpdateLabeledStatement(
		node,
		node.Label,
		tx.topLevelNestedVisitor.VisitEmbeddedStatement(node.Statement),
	)
}

// Visits a top-level nested `with` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedWithStatement(node *ast.WithStatement) *ast.Node {
	return tx.Factory().UpdateWithStatement(
		node,
		tx.Visitor().VisitNode(node.Expression),
		tx.topLevelNestedVisitor.VisitEmbeddedStatement(node.Statement),
	)
}

// Visits a top-level nested `if` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedIfStatement(node *ast.IfStatement) *ast.Node {
	return tx.Factory().UpdateIfStatement(
		node,
		tx.Visitor().VisitNode(node.Expression),
		tx.topLevelNestedVisitor.VisitEmbeddedStatement(node.ThenStatement),
		tx.topLevelNestedVisitor.VisitEmbeddedStatement(node.ElseStatement),
	)
}

// Visits a top-level nested `switch` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedSwitchStatement(node *ast.SwitchStatement) *ast.Node {
	return tx.Factory().UpdateSwitchStatement(
		node,
		tx.Visitor().VisitNode(node.Expression),
		tx.topLevelNestedVisitor.VisitNode(node.CaseBlock),
	)
}

// Visits a top-level nested case block as it may contain `var` declarations that are hoisted and may still be exported
// with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedCaseBlock(node *ast.CaseBlock) *ast.Node {
	return tx.topLevelNestedVisitor.VisitEachChild(node.AsNode())
}

// Visits a top-level nested `case` or `default` clause as it may contain `var` declarations that are hoisted and may
// still be exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedCaseOrDefaultClause(node *ast.CaseOrDefaultClause) *ast.Node {
	return tx.Factory().UpdateCaseOrDefaultClause(
		node,
		tx.Visitor().VisitNode(node.Expression),
		tx.topLevelNestedVisitor.VisitNodes(node.Statements),
	)
}

// Visits a top-level nested `try` statement as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedTryStatement(node *ast.TryStatement) *ast.Node {
	return tx.topLevelNestedVisitor.VisitEachChild(node.AsNode())
}

// Visits a top-level nested `catch` clause as it may contain `var` declarations that are hoisted and may still be
// exported with `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedCatchClause(node *ast.CatchClause) *ast.Node {
	return tx.Factory().UpdateCatchClause(
		node,
		node.VariableDeclaration,
		tx.topLevelNestedVisitor.VisitNode(node.Block),
	)
}

// Visits a top-level nested block as it may contain `var` declarations that are hoisted and may still be exported with
// `export {}`.
func (tx *CommonJSModuleTransformer) visitTopLevelNestedBlock(node *ast.Block) *ast.Node {
	return tx.topLevelNestedVisitor.VisitEachChild(node.AsNode())
}

func (tx *CommonJSModuleTransformer) visitForStatement(node *ast.ForStatement) *ast.Node {
	return tx.Factory().UpdateForStatement(
		node,
		tx.discardedValueVisitor.VisitNode(node.Initializer),
		tx.Visitor().VisitNode(node.Condition),
		tx.discardedValueVisitor.VisitNode(node.Incrementor),
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
	)
}

func (tx *CommonJSModuleTransformer) visitForInOrOfStatement(node *ast.ForInOrOfStatement) *ast.Node {
	return tx.Factory().UpdateForInOrOfStatement(
		node,
		node.AwaitModifier,
		tx.discardedValueVisitor.VisitNode(node.Initializer),
		tx.Visitor().VisitNode(node.Expression),
		tx.EmitContext().VisitIterationBody(node.Statement, tx.topLevelNestedVisitor),
	)
}

// Visits an expression statement whose value will be discarded at runtime.
func (tx *CommonJSModuleTransformer) visitExpressionStatement(node *ast.ExpressionStatement) *ast.Node {
	return tx.discardedValueVisitor.VisitEachChild(node.AsNode())
}

// Visits a `void` expression whose value will be discarded at runtime.
func (tx *CommonJSModuleTransformer) visitVoidExpression(node *ast.VoidExpression) *ast.Node {
	return tx.discardedValueVisitor.VisitEachChild(node.AsNode())
}

// Visits a parenthesized expression whose value may be discarded at runtime.
func (tx *CommonJSModuleTransformer) visitParenthesizedExpression(node *ast.ParenthesizedExpression, resultIsDiscarded bool) *ast.Node {
	expression := core.IfElse(resultIsDiscarded, tx.discardedValueVisitor, tx.Visitor()).VisitNode(node.Expression)
	return tx.Factory().UpdateParenthesizedExpression(node, expression)
}

// Visits a partially emitted expression whose value may be discarded at runtime.
func (tx *CommonJSModuleTransformer) visitPartiallyEmittedExpression(node *ast.PartiallyEmittedExpression, resultIsDiscarded bool) *ast.Node {
	expression := core.IfElse(resultIsDiscarded, tx.discardedValueVisitor, tx.Visitor()).VisitNode(node.Expression)
	return tx.Factory().UpdatePartiallyEmittedExpression(node, expression)
}

// Visits a binary expression whose value may be discarded, or which might contain an assignment to an exported
// identifier.
func (tx *CommonJSModuleTransformer) visitBinaryExpression(node *ast.BinaryExpression, resultIsDiscarded bool) *ast.Node {
	if ast.IsAssignmentExpression(node.AsNode(), false /*excludeCompoundAssignment*/) {
		return tx.visitAssignmentExpression(node)
	}

	if ast.IsCommaExpression(node.AsNode()) {
		return tx.visitCommaExpression(node, resultIsDiscarded)
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *CommonJSModuleTransformer) visitAssignmentExpression(node *ast.BinaryExpression) *ast.Node {
	if ast.IsDestructuringAssignment(node.AsNode()) {
		return tx.visitDestructuringAssignment(node)
	}

	// When we see an assignment expression whose left-hand side is an exported symbol,
	// we should ensure all exports of that symbol are updated with the correct value.
	//
	// - We do not transform generated identifiers unless they are file-level reserved names.
	// - We do not transform identifiers tagged with the LocalName flag.
	// - We only transform identifiers that are exported at the top level.
	if ast.IsIdentifier(node.Left) &&
		(!transformers.IsGeneratedIdentifier(tx.EmitContext(), node.Left) || isFileLevelReservedGeneratedIdentifier(tx.EmitContext(), node.Left)) &&
		!transformers.IsLocalName(tx.EmitContext(), node.Left) {
		exportedNames := tx.getExports(node.Left)
		if len(exportedNames) > 0 {
			// For each additional export of the declaration, apply an export assignment.
			expression := tx.Visitor().VisitEachChild(node.AsNode())
			for _, exportName := range exportedNames {
				expression = tx.createExportExpression(exportName, expression, &node.Loc /*location*/, false /*liveBinding*/)
			}
			return expression
		}
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

// Visits a destructuring assignment which might target an exported identifier.
func (tx *CommonJSModuleTransformer) visitDestructuringAssignment(node *ast.BinaryExpression) *ast.Node {
	return tx.Factory().UpdateBinaryExpression(
		node,
		nil, /*modifiers*/
		tx.assignmentPatternVisitor.VisitNode(node.Left),
		nil, /*typeNode*/
		node.OperatorToken,
		tx.Visitor().VisitNode(node.Right),
	)
}

func (tx *CommonJSModuleTransformer) visitAssignmentProperty(node *ast.PropertyAssignment) *ast.Node {
	return tx.Factory().UpdatePropertyAssignment(
		node,
		nil, /*modifiers*/
		tx.Visitor().VisitNode(node.Name()),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		tx.assignmentPatternVisitor.VisitNode(node.Initializer),
	)
}

func (tx *CommonJSModuleTransformer) visitShorthandAssignmentProperty(node *ast.ShorthandPropertyAssignment) *ast.Node {
	target := tx.visitDestructuringAssignmentTargetNoStack(node.Name())
	if ast.IsIdentifier(target) {
		return tx.Factory().UpdateShorthandPropertyAssignment(
			node,
			nil, /*modifiers*/
			target,
			nil, /*postfixToken*/
			nil, /*typeNode*/
			node.EqualsToken,
			tx.Visitor().VisitNode(node.ObjectAssignmentInitializer),
		)
	}
	if node.ObjectAssignmentInitializer != nil {
		equalsToken := node.EqualsToken
		if equalsToken == nil {
			equalsToken = tx.Factory().NewToken(ast.KindEqualsToken)
		}
		target = tx.Factory().NewBinaryExpression(
			nil, /*modifiers*/
			target,
			nil, /*typeNode*/
			equalsToken,
			tx.Visitor().VisitNode(node.ObjectAssignmentInitializer),
		)
	}
	updated := tx.Factory().NewPropertyAssignment(
		nil, /*modifiers*/
		node.Name(),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		target,
	)
	tx.EmitContext().SetOriginal(updated, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(updated, node.AsNode())
	return updated
}

func (tx *CommonJSModuleTransformer) visitAssignmentRestProperty(node *ast.SpreadAssignment) *ast.Node {
	return tx.Factory().UpdateSpreadAssignment(
		node,
		tx.visitDestructuringAssignmentTarget(node.Expression),
	)
}

func (tx *CommonJSModuleTransformer) visitAssignmentRestElement(node *ast.SpreadElement) *ast.Node {
	return tx.Factory().UpdateSpreadElement(
		node,
		tx.visitDestructuringAssignmentTarget(node.Expression),
	)
}

func (tx *CommonJSModuleTransformer) visitAssignmentElement(node *ast.Node) *ast.Node {
	if ast.IsBinaryExpression(node) {
		n := node.AsBinaryExpression()
		if n.OperatorToken.Kind == ast.KindEqualsToken {
			return tx.Factory().UpdateBinaryExpression(
				n,
				nil, /*modifiers*/
				tx.visitDestructuringAssignmentTarget(n.Left),
				nil, /*typeNode*/
				n.OperatorToken,
				tx.Visitor().VisitNode(n.Right),
			)
		}
	}

	return tx.visitDestructuringAssignmentTargetNoStack(node)
}

func (tx *CommonJSModuleTransformer) visitDestructuringAssignmentTarget(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	switch node.Kind {
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression:
		node = tx.visitAssignmentPatternNoStack(node)
	default:
		node = tx.visitDestructuringAssignmentTargetNoStack(node)
	}
	return node
}

func (tx *CommonJSModuleTransformer) visitDestructuringAssignmentTargetNoStack(node *ast.Node) *ast.Node {
	if ast.IsIdentifier(node) &&
		(!transformers.IsGeneratedIdentifier(tx.EmitContext(), node) || isFileLevelReservedGeneratedIdentifier(tx.EmitContext(), node)) &&
		!transformers.IsLocalName(tx.EmitContext(), node) {
		expression := tx.visitExpressionIdentifier(node)
		exportedNames := tx.getExports(node)
		if len(exportedNames) > 0 {
			// transforms:
			//  var x;
			//  export { x }
			//  { x: x } = y
			// to:
			//  { x: { set value(v) { exports.x = x = v; } }.value } = y

			value := tx.Factory().NewUniqueNameEx("value", printer.AutoGenerateOptions{
				Flags: printer.GeneratedIdentifierFlagsOptimistic,
			})
			expression = tx.Factory().NewAssignmentExpression(expression, value)

			for _, exportName := range exportedNames {
				expression = tx.createExportExpression(exportName, expression, nil /*location*/, false /*liveBinding*/)
			}

			statement := tx.Factory().NewExpressionStatement(expression)
			statementList := tx.Factory().NewNodeList([]*ast.Node{statement})
			param := tx.Factory().NewParameterDeclaration(
				nil, /*modifiers*/
				nil, /*dotDotDotToken*/
				value,
				nil, /*questionToken*/
				nil, /*type*/
				nil, /*initializer*/
			)
			valueSetter := tx.Factory().NewSetAccessorDeclaration(
				nil, /*modifiers*/
				tx.Factory().NewIdentifier("value"),
				nil, /*typeParameters*/
				tx.Factory().NewNodeList([]*ast.Node{param}),
				nil, /*returnType*/
				nil, /*fullSignature*/
				tx.Factory().NewBlock(statementList, false /*multiLine*/),
			)
			propertyList := tx.Factory().NewNodeList([]*ast.Node{valueSetter})
			expression = tx.Factory().NewObjectLiteralExpression(propertyList, false /*multiLine*/)
			expression = tx.Factory().NewPropertyAccessExpression(expression, nil /*questionDotToken*/, tx.Factory().NewIdentifier("value"), ast.NodeFlagsNone)
		}
		return expression
	}

	return tx.visitNoStack(node, false /*resultIsDiscarded*/)
}

// Visits a comma expression whose left-hand value is always discard, and whose right-hand value may be discarded at runtime.
func (tx *CommonJSModuleTransformer) visitCommaExpression(node *ast.BinaryExpression, resultIsDiscarded bool) *ast.Node {
	left := tx.discardedValueVisitor.VisitNode(node.Left)
	right := core.IfElse(resultIsDiscarded, tx.discardedValueVisitor, tx.Visitor()).VisitNode(node.Right)
	return tx.Factory().UpdateBinaryExpression(node, nil /*modifiers*/, left, nil /*typeNode*/, node.OperatorToken, right)
}

// Visits a prefix unary expression that might modify an exported identifier.
func (tx *CommonJSModuleTransformer) visitPrefixUnaryExpression(node *ast.PrefixUnaryExpression, resultIsDiscarded bool) *ast.Node {
	// When we see a prefix increment expression whose operand is an exported
	// symbol, we should ensure all exports of that symbol are updated with the correct
	// value.
	//
	// - We do not transform generated identifiers for any reason.
	// - We do not transform identifiers tagged with the LocalName flag.
	// - We do not transform identifiers that were originally the name of an enum or
	//   namespace due to how they are transformed in TypeScript.
	// - We only transform identifiers that are exported at the top level.
	if (node.Operator == ast.KindPlusPlusToken || node.Operator == ast.KindMinusMinusToken) &&
		ast.IsIdentifier(node.Operand) &&
		!transformers.IsLocalName(tx.EmitContext(), node.Operand) {
		exportedNames := tx.getExports(node.Operand)
		if len(exportedNames) > 0 {
			// given:
			//   var x = 0;
			//   export { x }
			//   ++x;
			// emits:
			//   var x = 0;
			//   exports.x = x;
			//   exports.x = ++x;
			// note:
			//   after the operation, `exports.x` will hold the value of `x` after the increment.

			expression := tx.Factory().UpdatePrefixUnaryExpression(node, tx.Visitor().VisitNode(node.Operand))
			for _, exportName := range exportedNames {
				expression = tx.createExportExpression(exportName, expression, nil /*location*/, false /*liveBinding*/)
				tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())
			}
			return expression
		}
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

// Visits a postfix unary expression that might modify an exported identifier.
func (tx *CommonJSModuleTransformer) visitPostfixUnaryExpression(node *ast.PostfixUnaryExpression, resultIsDiscarded bool) *ast.Node {
	// When we see a postfix increment expression whose operand is an exported
	// symbol, we should ensure all exports of that symbol are updated with the correct
	// value.
	//
	// - We do not transform generated identifiers for any reason.
	// - We do not transform identifiers tagged with the LocalName flag.
	// - We do not transform identifiers that were originally the name of an enum or
	//   namespace due to how they are transformed in TypeScript.
	// - We only transform identifiers that are exported at the top level.
	if (node.Operator == ast.KindPlusPlusToken || node.Operator == ast.KindMinusMinusToken) &&
		ast.IsIdentifier(node.Operand) &&
		!transformers.IsLocalName(tx.EmitContext(), node.Operand) {
		exportedNames := tx.getExports(node.Operand)
		if len(exportedNames) > 0 {
			// given (value is discarded):
			//   var x = 0;
			//   export { x }
			//   x++;
			// emits:
			//   var x = 0, y;
			//   exports.x = x;
			//   exports.x = (x++, x);
			// note:
			//   after the operation, `exports.x` will hold the value of `x` after the increment.
			//
			// given (value is not discarded):
			//   var x = 0, y;
			//   export { x }
			//   y = x++;
			// emits:
			//   var _a;
			//   var x = 0, y;
			//   exports.x = x;
			//   y = (exports.x = (_a = x++, x), _a);
			// note:
			//   after the operation, `exports.x` will hold the value of `x` after the increment, while
			//   `y` will hold the value of `x` before the increment.

			var temp *ast.IdentifierNode
			expression := tx.Factory().UpdatePostfixUnaryExpression(node, tx.Visitor().VisitNode(node.Operand))
			if !resultIsDiscarded {
				temp = tx.Factory().NewTempVariable()
				tx.EmitContext().AddVariableDeclaration(temp)

				expression = tx.Factory().NewAssignmentExpression(temp, expression)
				tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())
			}

			expression = tx.Factory().NewCommaExpression(expression, node.Operand.Clone(tx.Factory()))
			tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())

			for _, exportName := range exportedNames {
				expression = tx.createExportExpression(exportName, expression, nil /*location*/, false /*liveBinding*/)
				tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())
			}

			if temp != nil {
				expression = tx.Factory().NewCommaExpression(expression, temp.AsNode())
				tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())
			}

			return expression
		}
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

// Visits a call expression that might reference an imported symbol and thus require an indirect call, or that might
// be an `import()` or `require()` call that may need to be rewritten.
func (tx *CommonJSModuleTransformer) visitCallExpression(node *ast.CallExpression) *ast.Node {
	needsRewrite := false
	if tx.compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		if ast.IsImportCall(node.AsNode()) && len(node.Arguments.Nodes) > 0 ||
			ast.IsInJSFile(node.AsNode()) && ast.IsRequireCall(node.AsNode(), false /*requireStringLiteralLikeArgument*/) {
			needsRewrite = true
		}
	}
	if ast.IsImportCall(node.AsNode()) && tx.shouldTransformImportCall() {
		return tx.visitImportCallExpression(node, needsRewrite)
	}
	if needsRewrite {
		return tx.shimOrRewriteImportOrRequireCall(node.AsCallExpression())
	}
	if ast.IsIdentifier(node.Expression) &&
		!transformers.IsGeneratedIdentifier(tx.EmitContext(), node.Expression) &&
		!transformers.IsHelperName(tx.EmitContext(), node.Expression) {
		// given:
		//   import { f } from "mod";
		//   f();
		// emits:
		//   const mod_1 = require("mod");
		//   (0, mod_1.f)();
		// note:
		//   the indirect call is applied by the printer by way of the `EFIndirectCall` emit flag.
		expression := tx.visitExpressionIdentifier(node.Expression)
		updated := tx.Factory().UpdateCallExpression(
			node,
			expression,
			node.QuestionDotToken,
			nil, /*typeArguments*/
			tx.Visitor().VisitNodes(node.Arguments),
		)
		if !ast.IsIdentifier(expression) {
			tx.EmitContext().AddEmitFlags(updated, printer.EFIndirectCall)
		}
		return updated
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *CommonJSModuleTransformer) shouldTransformImportCall() bool {
	return ast.ShouldTransformImportCall(tx.currentSourceFile.FileName(), tx.compilerOptions, tx.getEmitModuleFormatOfFile(tx.currentSourceFile))
}

func (tx *CommonJSModuleTransformer) visitImportCallExpression(node *ast.CallExpression, rewriteOrShim bool) *ast.Node {
	if tx.moduleKind == core.ModuleKindNone && tx.languageVersion >= core.ScriptTargetES2020 {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	externalModuleName := getExternalModuleNameLiteral(tx.Factory(), node.AsNode(), tx.currentSourceFile, nil /*host*/, nil /*resolver*/, tx.compilerOptions)
	firstArgument := tx.Visitor().VisitNode(core.FirstOrNil(node.Arguments.Nodes))

	// Only use the external module name if it differs from the first argument. This allows us to preserve the quote style of the argument on output.
	var argument *ast.Expression
	if externalModuleName != nil && (firstArgument == nil || !ast.IsStringLiteral(firstArgument) || firstArgument.Text() != externalModuleName.Text()) {
		argument = externalModuleName
	} else if firstArgument != nil && rewriteOrShim {
		if ast.IsStringLiteral(firstArgument) {
			argument = rewriteModuleSpecifier(tx.EmitContext(), firstArgument, tx.compilerOptions)
		} else {
			argument = tx.Factory().NewRewriteRelativeImportExtensionsHelper(firstArgument, tx.compilerOptions.Jsx == core.JsxEmitPreserve)
		}
	} else {
		argument = firstArgument
	}
	return tx.createImportCallExpressionCommonJS(argument)
}

func (tx *CommonJSModuleTransformer) createImportCallExpressionCommonJS(arg *ast.Expression) *ast.Expression {
	// import(x)
	// emit as
	// Promise.resolve(`${x}`).then((s) => require(s)) /*CommonJS Require*/
	// We have to wrap require in then callback so that require is done in asynchronously
	// if we simply do require in resolve callback in Promise constructor. We will execute the loading immediately
	// If the arg is not inlineable, we have to evaluate and ToString() it in the current scope
	// Otherwise, we inline it in require() so that it's statically analyzable

	needSyncEval := arg != nil && !isSimpleInlineableExpression(arg)

	var promiseResolveArguments []*ast.Expression
	if needSyncEval {
		promiseResolveArguments = []*ast.Expression{
			tx.Factory().NewTemplateExpression(
				tx.Factory().NewTemplateHead("", "", ast.TokenFlagsNone),
				tx.Factory().NewNodeList([]*ast.TemplateSpanNode{
					tx.Factory().NewTemplateSpan(arg, tx.Factory().NewTemplateTail("", "", ast.TokenFlagsNone)),
				}),
			),
		}
	}
	promiseResolveCall := tx.Factory().NewCallExpression(
		tx.Factory().NewPropertyAccessExpression(
			tx.Factory().NewIdentifier("Promise"),
			nil, /*questionDotToken*/
			tx.Factory().NewIdentifier("resolve"),
			ast.NodeFlagsNone,
		),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.Factory().NewNodeList(promiseResolveArguments),
		ast.NodeFlagsNone,
	)

	var requireArguments []*ast.Expression
	if needSyncEval {
		requireArguments = []*ast.Expression{
			tx.Factory().NewIdentifier("s"),
		}
	} else if arg != nil {
		requireArguments = []*ast.Expression{arg}
	}

	requireCall := tx.Factory().NewCallExpression(
		tx.Factory().NewIdentifier("require"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.Factory().NewNodeList(requireArguments),
		ast.NodeFlagsNone,
	)

	if tx.compilerOptions.GetESModuleInterop() {
		requireCall = tx.Factory().NewImportStarHelper(requireCall)
	}

	var parameters []*ast.ParameterDeclarationNode
	if needSyncEval {
		parameters = []*ast.ParameterDeclarationNode{
			tx.Factory().NewParameterDeclaration(
				nil, /*modifiers*/
				nil, /*dotDotDotToken*/
				tx.Factory().NewIdentifier("s"),
				nil, /*questionToken*/
				nil, /*type*/
				nil, /*initializer*/
			),
		}
	}

	function := tx.Factory().NewArrowFunction(
		nil, /*modifiers*/
		nil, /*typeParameters*/
		tx.Factory().NewNodeList(parameters),
		nil, /*type*/
		nil, /*fullSignature*/
		tx.Factory().NewToken(ast.KindEqualsGreaterThanToken), /*equalsGreaterThanToken*/
		requireCall,
	)

	downleveledImport := tx.Factory().NewCallExpression(
		tx.Factory().NewPropertyAccessExpression(
			promiseResolveCall,
			nil, /*questionDotToken*/
			tx.Factory().NewIdentifier("then"),
			ast.NodeFlagsNone,
		),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.Factory().NewNodeList([]*ast.Expression{function}),
		ast.NodeFlagsNone,
	)
	return downleveledImport
}

func (tx *CommonJSModuleTransformer) shimOrRewriteImportOrRequireCall(node *ast.CallExpression) *ast.Node {
	expression := tx.Visitor().VisitNode(node.Expression)
	argumentsList := node.Arguments
	if len(node.Arguments.Nodes) > 0 {
		firstArgument := node.Arguments.Nodes[0]
		firstArgumentChanged := false
		if ast.IsStringLiteralLike(firstArgument) {
			rewritten := rewriteModuleSpecifier(tx.EmitContext(), firstArgument, tx.compilerOptions)
			firstArgumentChanged = rewritten != firstArgument
			firstArgument = rewritten
		} else {
			firstArgument = tx.Factory().NewRewriteRelativeImportExtensionsHelper(firstArgument, tx.compilerOptions.Jsx == core.JsxEmitPreserve)
			firstArgumentChanged = true
		}

		rest, restChanged := tx.Visitor().VisitSlice(node.Arguments.Nodes[1:])
		if firstArgumentChanged || restChanged {
			arguments := append([]*ast.Expression{firstArgument}, rest...)
			argumentsList = tx.Factory().NewNodeList(arguments)
			argumentsList.Loc = node.Arguments.Loc
		}
	}

	return tx.Factory().UpdateCallExpression(
		node,
		expression,
		node.QuestionDotToken,
		nil, /*typeArguments*/
		argumentsList,
	)
}

// Visits a tagged template expression that might reference an imported symbol and thus require an indirect call.
func (tx *CommonJSModuleTransformer) visitTaggedTemplateExpression(node *ast.TaggedTemplateExpression) *ast.Node {
	if ast.IsIdentifier(node.Tag) && !transformers.IsGeneratedIdentifier(tx.EmitContext(), node.Tag) && !transformers.IsHelperName(tx.EmitContext(), node.Tag) {
		// given:
		//   import { f } from "mod";
		//   f``;
		// emits:
		//   const mod_1 = require("mod");
		//   (0, mod_1.f) ``;
		// note:
		//   the indirect call is applied by the printer by way of the `EFIndirectCall` emit flag.

		expression := tx.visitExpressionIdentifier(node.Tag)
		updated := tx.Factory().UpdateTaggedTemplateExpression(
			node,
			expression,
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Visitor().VisitNode(node.Template),
		)
		if !ast.IsIdentifier(expression) {
			tx.EmitContext().AddEmitFlags(updated, printer.EFIndirectCall)
		}
		return updated
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

// Visits a shorthand property assignment that might reference an imported or exported symbol.
func (tx *CommonJSModuleTransformer) visitShorthandPropertyAssignment(node *ast.ShorthandPropertyAssignment) *ast.Node {
	name := node.Name()
	exportedOrImportedName := tx.visitExpressionIdentifier(name)
	if exportedOrImportedName != name {
		// A shorthand property with an assignment initializer is probably part of a
		// destructuring assignment
		expression := exportedOrImportedName
		if node.ObjectAssignmentInitializer != nil {
			expression = tx.Factory().NewAssignmentExpression(
				expression,
				tx.Visitor().VisitNode(node.ObjectAssignmentInitializer),
			)
		}
		assignment := tx.Factory().NewPropertyAssignment(nil /*modifiers*/, name, nil /*postfixToken*/, nil /*typeNode*/, expression)
		assignment.Loc = node.Loc
		tx.EmitContext().AssignCommentAndSourceMapRanges(assignment, node.AsNode())
		return assignment
	}
	return tx.Factory().UpdateShorthandPropertyAssignment(node,
		nil, /*modifiers*/
		exportedOrImportedName,
		nil, /*postfixToken*/
		nil, /*typeNode*/
		node.EqualsToken,
		tx.Visitor().VisitNode(node.ObjectAssignmentInitializer),
	)
}

// Visits an identifier that, if it is in an expression position, might reference an imported or exported symbol.
func (tx *CommonJSModuleTransformer) visitIdentifier(node *ast.IdentifierNode) *ast.Node {
	if transformers.IsIdentifierReference(node, tx.parentNode) {
		return tx.visitExpressionIdentifier(node)
	}
	return node
}

// Visits an identifier in an expression position that might reference an imported or exported symbol.
func (tx *CommonJSModuleTransformer) visitExpressionIdentifier(node *ast.IdentifierNode) *ast.Node {
	if info := tx.EmitContext().GetAutoGenerateInfo(node); !(info != nil && !info.Flags.HasAllowNameSubstitution()) &&
		!transformers.IsHelperName(tx.EmitContext(), node) &&
		!transformers.IsLocalName(tx.EmitContext(), node) &&
		!isDeclarationNameOfEnumOrNamespace(tx.EmitContext(), node) {
		exportContainer := tx.resolver.GetReferencedExportContainer(tx.EmitContext().MostOriginal(node), transformers.IsExportName(tx.EmitContext(), node))
		if exportContainer != nil && ast.IsSourceFile(exportContainer) {
			reference := tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewIdentifier("exports"),
				nil, /*questionDotToken*/
				node.Clone(tx.Factory()),
				ast.NodeFlagsNone,
			)
			tx.EmitContext().AssignCommentAndSourceMapRanges(reference, node)
			reference.Loc = node.Loc
			return reference
		}

		importDeclaration := tx.resolver.GetReferencedImportDeclaration(tx.EmitContext().MostOriginal(node))
		if importDeclaration != nil {
			if ast.IsImportClause(importDeclaration) {
				reference := tx.Factory().NewPropertyAccessExpression(
					tx.Factory().NewGeneratedNameForNode(importDeclaration.Parent),
					nil, /*questionDotToken*/
					tx.Factory().NewIdentifier("default"),
					ast.NodeFlagsNone,
				)
				tx.EmitContext().AssignCommentAndSourceMapRanges(reference, node)
				reference.Loc = node.Loc
				return reference
			}
			if ast.IsImportSpecifier(importDeclaration) {
				name := importDeclaration.AsImportSpecifier().PropertyNameOrName()
				decl := ast.FindAncestor(importDeclaration, ast.IsImportDeclaration)
				target := tx.Factory().NewGeneratedNameForNode(core.Coalesce(decl, importDeclaration))
				var reference *ast.Node
				if ast.IsStringLiteral(name) {
					reference = tx.Factory().NewElementAccessExpression(
						target,
						nil, /*questionDotToken*/
						tx.Factory().NewStringLiteralFromNode(name),
						ast.NodeFlagsNone,
					)
				} else {
					referenceName := name.Clone(tx.Factory())
					tx.EmitContext().AddEmitFlags(referenceName, printer.EFNoSourceMap|printer.EFNoComments)
					reference = tx.Factory().NewPropertyAccessExpression(
						target,
						nil, /*questionDotToken*/
						referenceName,
						ast.NodeFlagsNone,
					)
				}
				tx.EmitContext().AssignCommentAndSourceMapRanges(reference, node)
				reference.Loc = node.Loc
				return reference
			}
		}
	}
	return node
}

// Gets the exported names of an identifier, if it is exported.
func (tx *CommonJSModuleTransformer) getExports(name *ast.IdentifierNode) []*ast.ModuleExportName {
	if !transformers.IsGeneratedIdentifier(tx.EmitContext(), name) {
		importDeclaration := tx.resolver.GetReferencedImportDeclaration(tx.EmitContext().MostOriginal(name))
		if importDeclaration != nil {
			return tx.currentModuleInfo.exportedBindings.Get(importDeclaration)
		}

		// An exported namespace or enum may merge with an ambient declaration, which won't show up in .js emit, so
		// we analyze all value exports of a symbol.
		var bindingsSet collections.Set[*ast.ModuleExportName]
		var bindings []*ast.ModuleExportName
		declarations := tx.resolver.GetReferencedValueDeclarations(tx.EmitContext().MostOriginal(name))
		if declarations != nil {
			for _, declaration := range declarations {
				exportedBindings := tx.currentModuleInfo.exportedBindings.Get(declaration)
				for _, binding := range exportedBindings {
					if !bindingsSet.Has(binding) {
						bindingsSet.Add(binding)
						bindings = append(bindings, binding)
					}
				}
			}
			return bindings
		}
	} else if isFileLevelReservedGeneratedIdentifier(tx.EmitContext(), name) {
		exportSpecifiers := tx.currentModuleInfo.exportSpecifiers.Get(name.Text())
		if exportSpecifiers != nil {
			var exportedNames []*ast.ModuleExportName
			for _, exportSpecifier := range exportSpecifiers {
				exportedNames = append(exportedNames, exportSpecifier.Name())
			}
			return exportedNames
		}
	}
	return nil
}

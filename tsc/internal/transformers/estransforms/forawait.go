package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

// Facts we track as we traverse the tree
type forAwaitHierarchyFacts int

const forAwaitHierarchyFactsNone forAwaitHierarchyFacts = 0

const (
	//
	// Ancestor facts
	//

	forAwaitHierarchyFactsHasLexicalThis forAwaitHierarchyFacts = 1 << iota
	forAwaitHierarchyFactsIterationContainer

	//
	// Ancestor masks
	//

	forAwaitHierarchyFactsAncestorFactsMask = 1<<iota - 1

	forAwaitHierarchyFactsSourceFileExcludes           = forAwaitHierarchyFactsIterationContainer
	forAwaitHierarchyFactsStrictModeSourceFileIncludes = forAwaitHierarchyFactsNone

	forAwaitHierarchyFactsClassOrFunctionIncludes = forAwaitHierarchyFactsHasLexicalThis
	forAwaitHierarchyFactsClassOrFunctionExcludes = forAwaitHierarchyFactsIterationContainer

	forAwaitHierarchyFactsArrowFunctionIncludes = forAwaitHierarchyFactsNone
	forAwaitHierarchyFactsArrowFunctionExcludes = forAwaitHierarchyFactsClassOrFunctionExcludes

	forAwaitHierarchyFactsIterationStatementIncludes = forAwaitHierarchyFactsIterationContainer
	forAwaitHierarchyFactsIterationStatementExcludes = forAwaitHierarchyFactsNone
)

type forawaitTransformer struct {
	transformers.Transformer
	superAccessState
	compilerOptions *core.CompilerOptions

	enclosingFunctionFlags    ast.FunctionFlags
	forAwaitHierarchyFacts    forAwaitHierarchyFacts
	exportedVariableStatement bool

	fallbackNodeVisitor    *ast.NodeVisitor
	noAsyncModifierVisitor *ast.NodeVisitor
}

func newforawaitTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &forawaitTransformer{
		compilerOptions: opts.CompilerOptions,
	}
	result := tx.NewTransformer(tx.visit, opts.Context)
	tx.initSuperAccessVisitor(tx.EmitContext(), tx.Factory())
	tx.fallbackNodeVisitor = tx.EmitContext().NewNodeVisitor(tx.visitFallback)
	tx.noAsyncModifierVisitor = tx.EmitContext().NewNodeVisitor(func(node *ast.Node) *ast.Node {
		if node.Kind == ast.KindAsyncKeyword {
			return nil
		}
		return node
	})
	return result
}

func (tx *forawaitTransformer) affectsSubtree(excludeFacts forAwaitHierarchyFacts, includeFacts forAwaitHierarchyFacts) bool {
	return tx.forAwaitHierarchyFacts != (tx.forAwaitHierarchyFacts&^excludeFacts | includeFacts)
}

// enterSubtree sets the HierarchyFacts for this node prior to visiting this node's subtree,
// returning the facts set prior to modification.
func (tx *forawaitTransformer) enterSubtree(excludeFacts forAwaitHierarchyFacts, includeFacts forAwaitHierarchyFacts) forAwaitHierarchyFacts {
	ancestorFacts := tx.forAwaitHierarchyFacts
	tx.forAwaitHierarchyFacts = (tx.forAwaitHierarchyFacts&^excludeFacts | includeFacts) & forAwaitHierarchyFactsAncestorFactsMask
	return ancestorFacts
}

// exitSubtree restores the HierarchyFacts for this node's ancestor after visiting this node's
// subtree.
func (tx *forawaitTransformer) exitSubtree(ancestorFacts forAwaitHierarchyFacts) {
	tx.forAwaitHierarchyFacts = ancestorFacts
}

func (tx *forawaitTransformer) visitModifiersNoAsync(modifiers *ast.ModifierList) *ast.ModifierList {
	return tx.noAsyncModifierVisitor.VisitModifiers(modifiers)
}

func (tx *forawaitTransformer) doWithHierarchyFacts(cb func(*forawaitTransformer, *ast.Node) *ast.Node, node *ast.Node, excludeFacts forAwaitHierarchyFacts, includeFacts forAwaitHierarchyFacts) *ast.Node {
	if tx.affectsSubtree(excludeFacts, includeFacts) {
		ancestorFacts := tx.enterSubtree(excludeFacts, includeFacts)
		result := cb(tx, node)
		tx.exitSubtree(ancestorFacts)
		return result
	}
	return cb(tx, node)
}

func (tx *forawaitTransformer) visitDefault(node *ast.Node) *ast.Node {
	return tx.Visitor().VisitEachChild(node)
}

func (tx *forawaitTransformer) fallbackVisitor(node *ast.Node) *ast.Node {
	if tx.capturedSuperProperties == nil {
		return node
	}
	switch node.Kind {
	case ast.KindFunctionExpression, ast.KindFunctionDeclaration,
		ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor,
		ast.KindConstructor:
		return node
	}
	tx.trackSuperAccess(node)
	return tx.fallbackNodeVisitor.VisitEachChild(node)
}

func (tx *forawaitTransformer) visitFallback(node *ast.Node) *ast.Node {
	return tx.fallbackVisitor(node)
}

func (tx *forawaitTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsForAwaitOrAsyncGenerator == 0 {
		return tx.fallbackVisitor(node)
	}
	tx.trackSuperAccess(node)
	switch node.Kind {
	case ast.KindSourceFile:
		return tx.visitSourceFile(node.AsSourceFile())
	case ast.KindAwaitExpression:
		return tx.visitAwaitExpression(node.AsAwaitExpression())
	case ast.KindYieldExpression:
		return tx.visitYieldExpression(node.AsYieldExpression())
	case ast.KindReturnStatement:
		return tx.visitReturnStatement(node.AsReturnStatement())
	case ast.KindLabeledStatement:
		return tx.visitLabeledStatement(node.AsLabeledStatement())
	case ast.KindDoStatement, ast.KindWhileStatement, ast.KindForInStatement:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitDefault,
			node,
			forAwaitHierarchyFactsIterationStatementExcludes,
			forAwaitHierarchyFactsIterationStatementIncludes,
		)
	case ast.KindForOfStatement:
		return tx.visitForOfStatement(node.AsForInOrOfStatement(), nil)
	case ast.KindForStatement:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitDefault,
			node,
			forAwaitHierarchyFactsIterationStatementExcludes,
			forAwaitHierarchyFactsIterationStatementIncludes,
		)
	case ast.KindConstructor:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitConstructorDeclaration,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindMethodDeclaration:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitMethodDeclaration,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindGetAccessor:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitGetAccessorDeclaration,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindSetAccessor:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitSetAccessorDeclaration,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindFunctionDeclaration:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitFunctionDeclaration,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindFunctionExpression:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitFunctionExpression,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	case ast.KindArrowFunction:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitArrowFunction,
			node,
			forAwaitHierarchyFactsArrowFunctionExcludes,
			forAwaitHierarchyFactsArrowFunctionIncludes,
		)
	case ast.KindClassDeclaration, ast.KindClassExpression:
		return tx.doWithHierarchyFacts(
			(*forawaitTransformer).visitDefault,
			node,
			forAwaitHierarchyFactsClassOrFunctionExcludes,
			forAwaitHierarchyFactsClassOrFunctionIncludes,
		)
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

func (tx *forawaitTransformer) visitAwaitExpression(node *ast.AwaitExpression) *ast.Node {
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		result := tx.Factory().NewYieldExpression(
			nil, /*asteriskToken*/
			tx.Factory().NewAwaitHelper(tx.Visitor().VisitNode(node.Expression)),
		)
		result.Loc = node.Loc
		tx.EmitContext().SetOriginal(result, node.AsNode())
		return result
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *forawaitTransformer) visitYieldExpression(node *ast.YieldExpression) *ast.Node {
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		if node.AsteriskToken != nil {
			expression := tx.Visitor().VisitNode(node.Expression)

			asyncValuesResult := tx.Factory().NewAsyncValuesHelper(expression)
			asyncValuesResult.Loc = expression.Loc

			asyncDelegatorResult := tx.Factory().NewAsyncDelegatorHelper(asyncValuesResult)
			asyncDelegatorResult.Loc = expression.Loc

			innerYield := tx.Factory().UpdateYieldExpression(
				node,
				node.AsteriskToken,
				asyncDelegatorResult,
			)

			awaitedYield := tx.Factory().NewAwaitHelper(innerYield)

			result := tx.Factory().NewYieldExpression(
				nil, /*asteriskToken*/
				awaitedYield,
			)
			result.Loc = node.Loc
			tx.EmitContext().SetOriginal(result, node.AsNode())
			return result
		}

		var innerExpression *ast.Node
		if node.Expression != nil {
			innerExpression = tx.Visitor().VisitNode(node.Expression)
		} else {
			innerExpression = tx.Factory().NewVoidZeroExpression()
		}

		result := tx.Factory().NewYieldExpression(
			nil, /*asteriskToken*/
			tx.createDownlevelAwait(innerExpression),
		)
		result.Loc = node.Loc
		tx.EmitContext().SetOriginal(result, node.AsNode())
		return result
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *forawaitTransformer) visitReturnStatement(node *ast.ReturnStatement) *ast.Node {
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		var expression *ast.Node
		if node.Expression != nil {
			expression = tx.Visitor().VisitNode(node.Expression)
		} else {
			expression = tx.Factory().NewVoidZeroExpression()
		}
		return tx.Factory().UpdateReturnStatement(
			node,
			tx.createDownlevelAwait(expression),
		)
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *forawaitTransformer) visitLabeledStatement(node *ast.LabeledStatement) *ast.Node {
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 {
		statement := unwrapInnermostStatementOfLabel(node)
		if statement.Kind == ast.KindForOfStatement && statement.AsForInOrOfStatement().AwaitModifier != nil {
			return tx.visitForOfStatement(statement.AsForInOrOfStatement(), node)
		}
		return tx.Factory().RestoreEnclosingLabel(tx.Visitor().VisitNode(statement), node)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

// unwrapInnermostStatementOfLabel follows LabeledStatement chains to find the innermost statement.
func unwrapInnermostStatementOfLabel(node *ast.LabeledStatement) *ast.Node {
	for {
		if node.Statement.Kind != ast.KindLabeledStatement {
			return node.Statement
		}
		node = node.Statement.AsLabeledStatement()
	}
}

func (tx *forawaitTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	ancestorFacts := tx.enterSubtree(
		forAwaitHierarchyFactsSourceFileExcludes,
		forAwaitHierarchyFactsStrictModeSourceFileIncludes,
	)
	tx.exportedVariableStatement = false
	visited := tx.Visitor().VisitEachChild(node.AsNode())
	tx.EmitContext().AddEmitHelper(visited, tx.EmitContext().ReadEmitHelpers()...)
	tx.exitSubtree(ancestorFacts)
	return visited
}

// visitForOfStatement visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
func (tx *forawaitTransformer) visitForOfStatement(node *ast.ForInOrOfStatement, outermostLabeledStatement *ast.LabeledStatement) *ast.Node {
	ancestorFacts := tx.enterSubtree(forAwaitHierarchyFactsIterationStatementExcludes, forAwaitHierarchyFactsIterationStatementIncludes)
	var result *ast.Node
	if node.AwaitModifier != nil {
		result = tx.transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts)
	} else {
		result = tx.Factory().RestoreEnclosingLabel(tx.Visitor().VisitEachChild(node.AsNode()), outermostLabeledStatement)
	}
	tx.exitSubtree(ancestorFacts)
	return result
}

func (tx *forawaitTransformer) convertForOfStatementHead(node *ast.ForInOrOfStatement, boundValue *ast.Node, nonUserCode *ast.Node) *ast.Node {
	f := tx.Factory()
	value := f.NewTempVariable()
	tx.EmitContext().AddVariableDeclaration(value)
	iteratorValueExpression := f.NewAssignmentExpression(value, boundValue)
	iteratorValueStatement := f.NewExpressionStatement(iteratorValueExpression)
	tx.EmitContext().SetSourceMapRange(iteratorValueStatement, node.Expression.Loc)

	exitNonUserCodeExpression := f.NewAssignmentExpression(nonUserCode, f.NewKeywordExpression(ast.KindFalseKeyword))
	exitNonUserCodeStatement := f.NewExpressionStatement(exitNonUserCodeExpression)
	tx.EmitContext().SetSourceMapRange(exitNonUserCodeStatement, node.Expression.Loc)

	statements := []*ast.Node{iteratorValueStatement, exitNonUserCodeStatement}
	binding := tx.Factory().CreateForOfBindingStatement(node.Initializer, value)
	statements = append(statements, tx.Visitor().VisitNode(binding))

	var bodyLocation core.TextRange
	var statementsLocation core.TextRange
	statement := tx.Visitor().VisitEmbeddedStatement(node.Statement)
	if ast.IsBlock(statement) {
		statements = append(statements, statement.Statements()...)
		bodyLocation = statement.Loc
		statementsLocation = statement.StatementList().Loc
	} else {
		statements = append(statements, statement)
	}

	stmtList := f.NewNodeList(statements)
	stmtList.Loc = statementsLocation
	block := f.NewBlock(stmtList, true)
	block.Loc = bodyLocation
	return block
}

func (tx *forawaitTransformer) createDownlevelAwait(expression *ast.Node) *ast.Node {
	if tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		return tx.Factory().NewYieldExpression(
			nil, /*asteriskToken*/
			tx.Factory().NewAwaitHelper(expression),
		)
	}
	return tx.Factory().NewAwaitExpression(expression)
}

func (tx *forawaitTransformer) transformForAwaitOfStatement(node *ast.ForInOrOfStatement, outermostLabeledStatement *ast.LabeledStatement, ancestorFacts forAwaitHierarchyFacts) *ast.Node {
	f := tx.Factory()
	expression := tx.Visitor().VisitNode(node.Expression)

	var iterator *ast.Node
	if ast.IsIdentifier(expression) {
		iterator = f.NewGeneratedNameForNode(expression)
	} else {
		iterator = f.NewTempVariable()
	}

	var result *ast.Node
	if ast.IsIdentifier(expression) {
		result = f.NewGeneratedNameForNode(iterator)
	} else {
		result = f.NewTempVariable()
	}

	nonUserCode := f.NewTempVariable()
	done := f.NewTempVariable()
	tx.EmitContext().AddVariableDeclaration(done)
	errorRecord := f.NewUniqueName("e")
	catchVariable := f.NewGeneratedNameForNode(errorRecord)
	returnMethod := f.NewTempVariable()
	callValues := f.NewAsyncValuesHelper(expression)
	callValues.Loc = node.Expression.Loc
	callNext := f.NewCallExpression(
		f.NewPropertyAccessExpression(iterator, nil, f.NewIdentifier("next"), ast.NodeFlagsNone),
		nil, nil,
		f.NewNodeList([]*ast.Node{}),
		ast.NodeFlagsNone,
	)
	getDone := f.NewPropertyAccessExpression(result, nil, f.NewIdentifier("done"), ast.NodeFlagsNone)
	getValue := f.NewPropertyAccessExpression(result, nil, f.NewIdentifier("value"), ast.NodeFlagsNone)
	callReturn := f.NewFunctionCallCall(returnMethod, iterator, []*ast.Node{})

	tx.EmitContext().AddVariableDeclaration(errorRecord)
	tx.EmitContext().AddVariableDeclaration(returnMethod)

	// if we are enclosed in an outer loop ensure we reset 'errorRecord' per each iteration
	var initializer *ast.Node
	if ancestorFacts&forAwaitHierarchyFactsIterationContainer != 0 {
		initializer = f.InlineExpressions([]*ast.Node{
			f.NewAssignmentExpression(errorRecord, f.NewVoidZeroExpression()),
			callValues,
		})
	} else {
		initializer = callValues
	}

	// Build the for statement
	iteratorDecl := f.NewVariableDeclaration(iterator, nil, nil, initializer)
	iteratorDecl.Loc = node.Expression.Loc
	varDeclList := f.NewVariableDeclarationList(ast.NodeFlagsNone, f.NewNodeList([]*ast.Node{
		f.NewVariableDeclaration(nonUserCode, nil, nil, f.NewKeywordExpression(ast.KindTrueKeyword)),
		iteratorDecl,
		f.NewVariableDeclaration(result, nil, nil, nil),
	}))
	varDeclList.Loc = node.Expression.Loc
	tx.EmitContext().AddEmitFlags(varDeclList, printer.EFNoHoisting)

	condition := f.InlineExpressions([]*ast.Node{
		f.NewAssignmentExpression(result, tx.createDownlevelAwait(callNext)),
		f.NewAssignmentExpression(done, getDone),
		f.NewPrefixUnaryExpression(ast.KindExclamationToken, done),
	})

	incrementor := f.NewAssignmentExpression(nonUserCode, f.NewKeywordExpression(ast.KindTrueKeyword))

	forStatement := f.NewForStatement(
		varDeclList,
		condition,
		incrementor,
		tx.convertForOfStatementHead(node, getValue, nonUserCode),
	)
	forStatement.Loc = node.Loc
	tx.EmitContext().AddEmitFlags(forStatement, printer.EFNoTokenTrailingSourceMaps)
	tx.EmitContext().SetOriginal(forStatement, node.AsNode())

	// Build the try/catch/finally
	tryBlock := f.NewBlock(f.NewNodeList([]*ast.Node{
		f.RestoreEnclosingLabel(forStatement, outermostLabeledStatement),
	}), true)

	// catch clause: { e_1 = { error: e_2 }; }
	catchBody := f.NewBlock(f.NewNodeList([]*ast.Node{
		f.NewExpressionStatement(
			f.NewAssignmentExpression(
				errorRecord,
				f.NewObjectLiteralExpression(f.NewNodeList([]*ast.Node{
					f.NewPropertyAssignment(nil, f.NewIdentifier("error"), nil, nil, catchVariable),
				}), false),
			),
		),
	}), false)
	tx.EmitContext().AddEmitFlags(catchBody, printer.EFSingleLine)
	catchClause := f.NewCatchClause(
		f.NewVariableDeclaration(catchVariable, nil, nil, nil),
		catchBody,
	)

	// finally block
	// inner try: if (!nonUserCode && !done && (returnMethod = iterator.return)) await returnMethod.call(iterator);
	innerIfCondition := f.NewBinaryExpression(
		nil,
		f.NewBinaryExpression(
			nil,
			f.NewPrefixUnaryExpression(ast.KindExclamationToken, nonUserCode),
			nil,
			f.NewToken(ast.KindAmpersandAmpersandToken),
			f.NewPrefixUnaryExpression(ast.KindExclamationToken, done),
		),
		nil,
		f.NewToken(ast.KindAmpersandAmpersandToken),
		f.NewAssignmentExpression(
			returnMethod,
			f.NewPropertyAccessExpression(iterator, nil, f.NewIdentifier("return"), ast.NodeFlagsNone),
		),
	)
	innerIfStatement := f.NewIfStatement(
		innerIfCondition,
		f.NewExpressionStatement(tx.createDownlevelAwait(callReturn)),
		nil,
	)
	tx.EmitContext().AddEmitFlags(innerIfStatement, printer.EFSingleLine)

	innerTryBlock := f.NewBlock(f.NewNodeList([]*ast.Node{innerIfStatement}), false)

	// inner finally: if (errorRecord) throw errorRecord.error;
	innerFinallyIf := f.NewIfStatement(
		errorRecord,
		f.NewThrowStatement(
			f.NewPropertyAccessExpression(errorRecord, nil, f.NewIdentifier("error"), ast.NodeFlagsNone),
		),
		nil,
	)
	tx.EmitContext().AddEmitFlags(innerFinallyIf, printer.EFSingleLine)
	innerFinallyBlock := f.NewBlock(f.NewNodeList([]*ast.Node{innerFinallyIf}), false)
	tx.EmitContext().AddEmitFlags(innerFinallyBlock, printer.EFSingleLine)

	innerTryStatement := f.NewTryStatement(innerTryBlock, nil, innerFinallyBlock)
	finallyBlock := f.NewBlock(f.NewNodeList([]*ast.Node{innerTryStatement}), true)

	return f.NewTryStatement(tryBlock, catchClause, finallyBlock)
}

func (tx *forawaitTransformer) visitConstructorDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsConstructorDeclaration()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)
	updated := tx.Factory().UpdateConstructorDeclaration(
		decl,
		decl.Modifiers(),
		nil, /*typeParameters*/
		tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor()),
		nil, /*returnType*/
		nil, /*fullSignature*/
		tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor()),
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitGetAccessorDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsGetAccessorDeclaration()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)
	updated := tx.Factory().UpdateGetAccessorDeclaration(
		decl,
		decl.Modifiers(),
		tx.Visitor().VisitNode(decl.Name()),
		nil, /*typeParameters*/
		tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor()),
		nil, /*returnType*/
		nil, /*fullSignature*/
		tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor()),
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitSetAccessorDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsSetAccessorDeclaration()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)
	updated := tx.Factory().UpdateSetAccessorDeclaration(
		decl,
		decl.Modifiers(),
		tx.Visitor().VisitNode(decl.Name()),
		nil, /*typeParameters*/
		tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor()),
		nil, /*returnType*/
		nil, /*fullSignature*/
		tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor()),
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitMethodDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsMethodDeclaration()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)

	var modifiers *ast.ModifierList
	if tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		modifiers = tx.visitModifiersNoAsync(decl.Modifiers())
	} else {
		modifiers = decl.Modifiers()
	}

	var asteriskToken *ast.TokenNode
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 {
		asteriskToken = nil
	} else {
		asteriskToken = decl.AsteriskToken
	}

	var parameters *ast.NodeList
	var body *ast.Node
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		parameters = tx.transformAsyncGeneratorFunctionParameterList(node)
		body = tx.transformAsyncGeneratorFunctionBody(node)
	} else {
		parameters = tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor())
		body = tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor())
	}

	updated := tx.Factory().UpdateMethodDeclaration(
		decl,
		modifiers,
		asteriskToken,
		tx.Visitor().VisitNode(decl.Name()),
		nil, /*postfixToken*/
		nil, /*typeParameters*/
		parameters,
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitFunctionDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsFunctionDeclaration()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)

	var modifiers *ast.ModifierList
	if tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		modifiers = tx.visitModifiersNoAsync(decl.Modifiers())
	} else {
		modifiers = decl.Modifiers()
	}

	var asteriskToken *ast.TokenNode
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 {
		asteriskToken = nil
	} else {
		asteriskToken = decl.AsteriskToken
	}

	var parameters *ast.NodeList
	var body *ast.Node
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		parameters = tx.transformAsyncGeneratorFunctionParameterList(node)
		body = tx.transformAsyncGeneratorFunctionBody(node)
	} else {
		parameters = tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor())
		body = tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor())
	}

	updated := tx.Factory().UpdateFunctionDeclaration(
		decl,
		modifiers,
		asteriskToken,
		decl.Name(),
		nil, /*typeParameters*/
		parameters,
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitArrowFunction(node *ast.Node) *ast.Node {
	decl := node.AsArrowFunction()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)
	updated := tx.Factory().UpdateArrowFunction(
		decl,
		decl.Modifiers(),
		nil, /*typeParameters*/
		tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor()),
		nil, /*returnType*/
		nil, /*fullSignature*/
		decl.EqualsGreaterThanToken,
		tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor()),
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) visitFunctionExpression(node *ast.Node) *ast.Node {
	decl := node.AsFunctionExpression()
	savedEnclosingFunctionFlags := tx.enclosingFunctionFlags
	tx.enclosingFunctionFlags = ast.GetFunctionFlags(node)

	var modifiers *ast.ModifierList
	if tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		modifiers = tx.visitModifiersNoAsync(decl.Modifiers())
	} else {
		modifiers = decl.Modifiers()
	}

	var asteriskToken *ast.TokenNode
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 {
		asteriskToken = nil
	} else {
		asteriskToken = decl.AsteriskToken
	}

	var parameters *ast.NodeList
	var body *ast.Node
	if tx.enclosingFunctionFlags&ast.FunctionFlagsAsync != 0 && tx.enclosingFunctionFlags&ast.FunctionFlagsGenerator != 0 {
		parameters = tx.transformAsyncGeneratorFunctionParameterList(node)
		body = tx.transformAsyncGeneratorFunctionBody(node)
	} else {
		parameters = tx.EmitContext().VisitParameters(decl.Parameters, tx.Visitor())
		body = tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor())
	}

	updated := tx.Factory().UpdateFunctionExpression(
		decl,
		modifiers,
		asteriskToken,
		decl.Name(),
		nil, /*typeParameters*/
		parameters,
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
	tx.enclosingFunctionFlags = savedEnclosingFunctionFlags
	return updated
}

func (tx *forawaitTransformer) transformAsyncGeneratorFunctionParameterList(node *ast.Node) *ast.NodeList {
	if isSimpleParameterList(node.Parameters()) {
		return tx.EmitContext().VisitParameters(node.ParameterList(), tx.Visitor())
	}
	// Add fixed parameters to preserve the function's `length` property.
	var newParameters []*ast.Node
	for _, parameter := range node.Parameters() {
		param := parameter.AsParameterDeclaration()
		if param.Initializer != nil || param.DotDotDotToken != nil {
			break
		}
		newParameter := tx.Factory().NewParameterDeclaration(
			nil,
			nil,
			tx.Factory().NewGeneratedNameForNodeEx(param.Name(), printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes}),
			nil,
			nil,
			nil,
		)
		newParameters = append(newParameters, newParameter)
	}
	newParametersArray := tx.Factory().NewNodeList(newParameters)
	newParametersArray.Loc = node.ParameterList().Loc
	return newParametersArray
}

func (tx *forawaitTransformer) transformAsyncGeneratorFunctionBody(node *ast.Node) *ast.Node {
	f := tx.Factory()
	var innerParameters *ast.NodeList
	if !isSimpleParameterList(node.Parameters()) {
		innerParameters = tx.EmitContext().VisitParameters(node.ParameterList(), tx.Visitor())
	}

	savedCapturedSuperProperties := tx.capturedSuperProperties
	savedHasSuperElementAccess := tx.hasSuperElementAccess
	savedHasSuperPropertyAssignment := tx.hasSuperPropertyAssignment
	savedSuperBinding := tx.superBinding
	savedSuperIndexBinding := tx.superIndexBinding
	tx.capturedSuperProperties = &collections.OrderedSet[string]{}
	tx.hasSuperElementAccess = false
	tx.hasSuperPropertyAssignment = false
	tx.superBinding = f.NewUniqueNameEx("_super", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
	tx.superIndexBinding = f.NewUniqueNameEx("_superIndex", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})

	asyncBody := f.UpdateBlock(
		node.Body().AsBlock(),
		tx.Visitor().VisitNodes(node.Body().StatementList()),
	)
	asyncBody = f.UpdateBlock(
		asyncBody.AsBlock(),
		tx.EmitContext().EndAndMergeVariableEnvironmentList(asyncBody.StatementList()),
	)

	// Substitute super property accesses with _super/_superIndex helpers
	emitSuperHelpers := tx.capturedSuperProperties.Size() > 0 || tx.hasSuperElementAccess
	if emitSuperHelpers {
		asyncBody = tx.substituteSuperAccessesInBody(asyncBody)
	}

	var innerParams *ast.NodeList
	if innerParameters != nil {
		innerParams = innerParameters
	} else {
		innerParams = f.NewNodeList([]*ast.Node{})
	}

	var name *ast.Node
	if node.Name() != nil {
		name = f.NewGeneratedNameForNode(node.Name())
	}

	generatorFunc := f.NewFunctionExpression(
		nil, /*modifiers*/
		f.NewToken(ast.KindAsteriskToken),
		name,
		nil, /*typeParameters*/
		innerParams,
		nil, /*returnType*/
		nil, /*fullSignature*/
		asyncBody,
	)

	returnStatement := f.NewReturnStatement(
		f.NewAsyncGeneratorHelper(
			generatorFunc,
			tx.forAwaitHierarchyFacts&forAwaitHierarchyFactsHasLexicalThis != 0,
		),
	)

	tx.EmitContext().StartVariableEnvironment()
	if emitSuperHelpers {
		if tx.capturedSuperProperties.Size() > 0 {
			tx.EmitContext().AddInitializationStatement(tx.createSuperAccessVariableStatement())
		}
	}

	outerStatements := []*ast.Node{returnStatement}

	block := f.UpdateBlock(
		node.Body().AsBlock(),
		tx.EmitContext().EndAndMergeVariableEnvironmentList(f.NewNodeList(outerStatements)),
	)

	if emitSuperHelpers && tx.hasSuperElementAccess {
		if tx.hasSuperPropertyAssignment {
			tx.EmitContext().AddEmitHelper(block, printer.AdvancedAsyncSuperHelper)
		} else {
			tx.EmitContext().AddEmitHelper(block, printer.AsyncSuperHelper)
		}
	}

	tx.capturedSuperProperties = savedCapturedSuperProperties
	tx.hasSuperElementAccess = savedHasSuperElementAccess
	tx.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment
	tx.superBinding = savedSuperBinding
	tx.superIndexBinding = savedSuperIndexBinding

	return block
}

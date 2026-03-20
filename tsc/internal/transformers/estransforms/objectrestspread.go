package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type objectRestSpreadTransformer struct {
	transformers.Transformer
	compilerOptions *core.CompilerOptions

	inExportedVariableStatement bool
	expressionResultIsUnused    bool

	parametersWithPrecedingObjectRestOrSpread map[*ast.Node]struct{}
}

func (ch *objectRestSpreadTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsESObjectRestOrSpread == 0 && ch.parametersWithPrecedingObjectRestOrSpread == nil {
		return node
	}
	// Save the expressionResultIsUnused flag set by the parent for this node,
	// then reset to false for children (the default). Specific cases below override as needed.
	expressionResultIsUnused := ch.expressionResultIsUnused
	ch.expressionResultIsUnused = false
	defer func() { ch.expressionResultIsUnused = expressionResultIsUnused }()
	switch node.Kind {
	case ast.KindSourceFile:
		return ch.visitSourceFile(node.AsSourceFile())
	case ast.KindObjectLiteralExpression:
		return ch.visitObjectLiteralExpression(node.AsObjectLiteralExpression())
	case ast.KindBinaryExpression:
		return ch.visitBinaryExpression(node.AsBinaryExpression(), expressionResultIsUnused)
	case ast.KindExpressionStatement:
		ch.expressionResultIsUnused = true
		return ch.Visitor().VisitEachChild(node)
	case ast.KindParenthesizedExpression:
		ch.expressionResultIsUnused = expressionResultIsUnused
		return ch.Visitor().VisitEachChild(node)
	case ast.KindForOfStatement:
		return ch.visitForOftatement(node.AsForInOrOfStatement())
	case ast.KindVariableStatement:
		return ch.visitVariableStatement(node.AsVariableStatement())
	case ast.KindVariableDeclaration:
		return ch.visitVariableDeclaration(node.AsVariableDeclaration())
	case ast.KindCatchClause:
		return ch.visitCatchClause(node.AsCatchClause())
	case ast.KindParameter:
		return ch.visitParameter(node.AsParameterDeclaration())
	case ast.KindConstructor:
		return ch.visitContructorDeclaration(node.AsConstructorDeclaration())
	case ast.KindGetAccessor:
		return ch.visitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindSetAccessor:
		return ch.visitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	case ast.KindMethodDeclaration:
		return ch.visitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindFunctionDeclaration:
		return ch.visitFunctionDeclaration(node.AsFunctionDeclaration())
	case ast.KindArrowFunction:
		return ch.visitArrowFunction(node.AsArrowFunction())
	case ast.KindFunctionExpression:
		return ch.visitFunctionExpression(node.AsFunctionExpression())
	default:
		return ch.Visitor().VisitEachChild(node)
	}
}

func (ch *objectRestSpreadTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	visited := ch.Visitor().VisitEachChild(node.AsNode())
	ch.EmitContext().AddEmitHelper(visited.AsNode(), ch.EmitContext().ReadEmitHelpers()...)
	return visited
}

func (ch *objectRestSpreadTransformer) visitParameter(node *ast.ParameterDeclaration) *ast.Node {
	if ch.parametersWithPrecedingObjectRestOrSpread != nil {
		if _, ok := ch.parametersWithPrecedingObjectRestOrSpread[node.AsNode()]; ok {
			name := node.Name()
			if ast.IsBindingPattern(name) {
				name = ch.Factory().NewGeneratedNameForNode(node.AsNode())
			}
			return ch.Factory().UpdateParameterDeclaration(
				node,
				nil,
				node.DotDotDotToken,
				name,
				nil,
				nil,
				nil,
			)
		}
	}
	if node.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 {
		// Binding patterns are converted into a generated name and are
		// evaluated inside the function body.
		return ch.Factory().UpdateParameterDeclaration(
			node,
			nil,
			node.DotDotDotToken,
			ch.Factory().NewGeneratedNameForNode(node.AsNode()),
			nil,
			nil,
			ch.Visitor().VisitNode(node.Initializer),
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) collectParametersWithPrecedingObjectRestOrSpread(node *ast.Node) map[*ast.Node]struct{} {
	var result map[*ast.Node]struct{}
	for _, parameter := range node.Parameters() {
		if result != nil {
			result[parameter] = struct{}{}
		} else if parameter.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 {
			result = make(map[*ast.Node]struct{})
		}
	}
	return result
}

type oldParamScope map[*ast.Node]struct{}

func (ch *objectRestSpreadTransformer) enterParameterListContext(node *ast.Node) oldParamScope {
	old := ch.parametersWithPrecedingObjectRestOrSpread
	ch.parametersWithPrecedingObjectRestOrSpread = ch.collectParametersWithPrecedingObjectRestOrSpread(node)
	return oldParamScope(old)
}

func (ch *objectRestSpreadTransformer) exitParameterListContext(scope oldParamScope) {
	ch.parametersWithPrecedingObjectRestOrSpread = map[*ast.Node]struct{}(scope)
}

func (ch *objectRestSpreadTransformer) visitContructorDeclaration(node *ast.ConstructorDeclaration) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateConstructorDeclaration(
		node,
		node.Modifiers(),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitGetAccessorDeclaration(node *ast.GetAccessorDeclaration) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateGetAccessorDeclaration(
		node,
		node.Modifiers(),
		ch.Visitor().VisitNode(node.Name()),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitSetAccessorDeclaration(node *ast.SetAccessorDeclaration) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateSetAccessorDeclaration(
		node,
		node.Modifiers(),
		ch.Visitor().VisitNode(node.Name()),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitMethodDeclaration(node *ast.MethodDeclaration) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateMethodDeclaration(
		node,
		node.Modifiers(),
		node.AsteriskToken,
		ch.Visitor().VisitNode(node.Name()),
		node.PostfixToken,
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitFunctionDeclaration(node *ast.FunctionDeclaration) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateFunctionDeclaration(
		node,
		node.Modifiers(),
		node.AsteriskToken,
		ch.Visitor().VisitNode(node.Name()),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitArrowFunction(node *ast.ArrowFunction) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateArrowFunction(
		node,
		node.Modifiers(),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		node.EqualsGreaterThanToken,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) visitFunctionExpression(node *ast.FunctionExpression) *ast.Node {
	old := ch.enterParameterListContext(node.AsNode())
	defer ch.exitParameterListContext(old)
	return ch.Factory().UpdateFunctionExpression(
		node,
		node.Modifiers(),
		node.AsteriskToken,
		ch.Visitor().VisitNode(node.Name()),
		nil,
		ch.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		ch.transformFunctionBody(node.AsNode()),
	)
}

func (ch *objectRestSpreadTransformer) transformFunctionBody(node *ast.Node) *ast.Node {
	// EmitContext().VisitFunctionBody is not used here because this transformer needs to inject
	// object rest assignments between visiting the body and merging the variable environment.
	ch.EmitContext().StartVariableEnvironment()
	body := ch.Visitor().VisitNode(node.Body())
	extras := ch.EmitContext().EndVariableEnvironment()
	ch.EmitContext().StartVariableEnvironment()
	newStatements := ch.collectObjectRestAssignments(node)
	extras = ch.EmitContext().EndAndMergeVariableEnvironment(extras)
	if len(newStatements) == 0 && len(extras) == 0 {
		return body
	}

	if body == nil {
		body = ch.Factory().NewBlock(ch.Factory().NewNodeList([]*ast.Node{}), true)
	}
	var prefix []*ast.Node
	var suffix []*ast.Node
	if ast.IsBlock(body) {
		custom := false
		for i, statement := range body.Statements() {
			if !custom && ast.IsPrologueDirective(statement) {
				prefix = append(prefix, statement)
			} else if ch.EmitContext().EmitFlags(statement)&printer.EFCustomPrologue != 0 {
				custom = true
				prefix = append(prefix, statement)
			} else {
				suffix = body.Statements()[i:]
				break
			}
		}
	} else {
		ret := ch.Factory().NewReturnStatement(body)
		ret.Loc = body.Loc
		list := ch.Factory().NewNodeList([]*ast.Node{})
		list.Loc = body.Loc
		body = ch.Factory().NewBlock(list, true)
		suffix = append(suffix, ret)
	}

	newStatementList := ch.Factory().NewNodeList(append(append(append(prefix, extras...), newStatements...), suffix...))
	newStatementList.Loc = body.StatementList().Loc
	return ch.Factory().UpdateBlock(body.AsBlock(), newStatementList)
}

func (ch *objectRestSpreadTransformer) collectObjectRestAssignments(node *ast.Node) []*ast.Node {
	containsPrecedingObjectRestOrSpread := false
	var results []*ast.Node
	for _, parameter := range node.Parameters() {
		if containsPrecedingObjectRestOrSpread {
			if ast.IsBindingPattern(parameter.Name()) {
				// In cases where a binding pattern is simply '[]' or '{}',
				// we usually don't want to emit a var declaration; however, in the presence
				// of an initializer, we must emit that expression to preserve side effects.
				if len(parameter.Name().Elements()) > 0 {
					declarations := transformers.FlattenDestructuringBinding(
						&ch.Transformer,
						parameter, ch.Factory().NewGeneratedNameForNode(parameter),
						transformers.FlattenLevelAll, false, false,
					)
					if declarations != nil {
						declarationList := ch.Factory().NewVariableDeclarationList(ast.NodeFlagsNone, ch.Factory().NewNodeList([]*ast.Node{}))
						decls := []*ast.Node{declarations}
						if declarations.Kind == ast.KindSyntaxList {
							decls = declarations.AsSyntaxList().Children
						}
						declarationList.AsVariableDeclarationList().Declarations.Nodes = append(declarationList.AsVariableDeclarationList().Declarations.Nodes, decls...)
						statement := ch.Factory().NewVariableStatement(nil, declarationList)
						ch.EmitContext().AddEmitFlags(statement, printer.EFCustomPrologue)
						results = append(results, statement)
					}
				} else if parameter.Initializer() != nil {
					name := ch.Factory().NewGeneratedNameForNode(parameter)
					initializer := ch.Visitor().VisitNode(parameter.Initializer())
					assignment := ch.Factory().NewAssignmentExpression(name, initializer)
					statement := ch.Factory().NewExpressionStatement(assignment)
					ch.EmitContext().AddEmitFlags(statement, printer.EFCustomPrologue)
					results = append(results, statement)

				}
			} else if parameter.Initializer() != nil {
				// Converts a parameter initializer into a function body statement, i.e.:
				//
				//  function f(x = 1) { }
				//
				// becomes
				//
				//  function f(x) {
				//    if (typeof x === "undefined") { x = 1; }
				//  }
				name := parameter.Name().Clone(ch.Factory())
				name.Loc = parameter.Name().Loc
				ch.EmitContext().AddEmitFlags(name, printer.EFNoSourceMap)

				initializer := ch.Visitor().VisitNode(parameter.Initializer())
				ch.EmitContext().AddEmitFlags(initializer, printer.EFNoSourceMap|printer.EFNoComments)

				assignment := ch.Factory().NewAssignmentExpression(name, initializer)
				assignment.Loc = parameter.Loc
				ch.EmitContext().AddEmitFlags(assignment, printer.EFNoComments)

				block := ch.Factory().NewBlock(ch.Factory().NewNodeList([]*ast.Node{ch.Factory().NewExpressionStatement(assignment)}), false)
				block.Loc = parameter.Loc
				ch.EmitContext().AddEmitFlags(block, printer.EFSingleLine|printer.EFNoTrailingSourceMap|printer.EFNoTokenSourceMaps|printer.EFNoComments)

				typeCheck := ch.Factory().NewTypeCheck(name.Clone(ch.Factory()), "undefined")
				statement := ch.Factory().NewIfStatement(typeCheck, block, nil)
				statement.Loc = parameter.Loc
				ch.EmitContext().AddEmitFlags(statement, printer.EFNoTokenSourceMaps|printer.EFNoTrailingSourceMap|printer.EFCustomPrologue|printer.EFNoComments|printer.EFStartOnNewLine)
				results = append(results, statement)
			}
		} else if parameter.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 {
			containsPrecedingObjectRestOrSpread = true
			declarations := transformers.FlattenDestructuringBinding(
				&ch.Transformer,
				parameter, ch.Factory().NewGeneratedNameForNode(parameter),
				transformers.FlattenLevelObjectRest, false, true,
			)
			if declarations != nil {
				declarationList := ch.Factory().NewVariableDeclarationList(ast.NodeFlagsNone, ch.Factory().NewNodeList([]*ast.Node{}))
				decls := []*ast.Node{declarations}
				if declarations.Kind == ast.KindSyntaxList {
					decls = declarations.AsSyntaxList().Children
				}
				declarationList.AsVariableDeclarationList().Declarations.Nodes = append(declarationList.AsVariableDeclarationList().Declarations.Nodes, decls...)
				statement := ch.Factory().NewVariableStatement(nil, declarationList)
				ch.EmitContext().AddEmitFlags(statement, printer.EFCustomPrologue)
				results = append(results, statement)
			}
		}
	}

	return results
}

func (ch *objectRestSpreadTransformer) visitCatchClause(node *ast.CatchClause) *ast.Node {
	if node.VariableDeclaration != nil && ast.IsBindingPattern(node.VariableDeclaration.Name()) && node.VariableDeclaration.Name().SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 {
		name := ch.Factory().NewGeneratedNameForNode(node.VariableDeclaration.Name())
		updatedDecl := ch.Factory().UpdateVariableDeclaration(node.VariableDeclaration.AsVariableDeclaration(), node.VariableDeclaration.Name(), nil, nil, name)
		visitedBindings := transformers.FlattenDestructuringBinding(
			&ch.Transformer,
			updatedDecl, nil,
			transformers.FlattenLevelObjectRest, false, false,
		)
		block := ch.Visitor().VisitNode(node.Block)
		if visitedBindings != nil {
			var decls []*ast.Node
			if visitedBindings.Kind&ast.KindSyntaxList != 0 {
				decls = visitedBindings.AsSyntaxList().Children
			} else {
				decls = []*ast.Node{visitedBindings}
			}
			newStatement := ch.Factory().NewVariableStatement(nil, ch.Factory().NewVariableDeclarationList(ast.NodeFlagsNone, ch.Factory().NewNodeList(decls)))
			statements := []*ast.Node{newStatement}
			statements = append(statements, block.Statements()...)
			statementList := ch.Factory().NewNodeList(statements)
			statementList.Loc = block.StatementList().Loc

			block = ch.Factory().UpdateBlock(block.AsBlock(), statementList)
		}
		return ch.Factory().UpdateCatchClause(
			node,
			ch.Factory().UpdateVariableDeclaration(node.VariableDeclaration.AsVariableDeclaration(), name, nil, nil, nil),
			block,
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) visitVariableStatement(node *ast.VariableStatement) *ast.Node {
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		oldInExportedVariableStatement := ch.inExportedVariableStatement
		ch.inExportedVariableStatement = true
		result := ch.Visitor().VisitEachChild(node.AsNode())
		ch.inExportedVariableStatement = oldInExportedVariableStatement
		return result
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) visitVariableDeclaration(node *ast.VariableDeclaration) *ast.Node {
	if ch.inExportedVariableStatement {
		ch.inExportedVariableStatement = false
		result := ch.visitVariableDeclarationWorker(node, true)
		ch.inExportedVariableStatement = true
		return result
	}
	return ch.visitVariableDeclarationWorker(node, false)
}

func (ch *objectRestSpreadTransformer) visitVariableDeclarationWorker(node *ast.VariableDeclaration, exported bool) *ast.Node {
	// If we are here it is because the name contains a binding pattern with a rest somewhere in it.
	if ast.IsBindingPattern(node.Name()) && node.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 {
		return transformers.FlattenDestructuringBinding(
			&ch.Transformer,
			node.AsNode(), nil,
			transformers.FlattenLevelObjectRest, exported, false,
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) visitForOftatement(node *ast.ForInOrOfStatement) *ast.Node {
	if node.Initializer.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 || (ast.IsAssignmentPattern(node.Initializer) && ast.ContainsObjectRestOrSpread(node.Initializer)) {
		initializerWithoutParens := ast.SkipParentheses(node.Initializer)
		if ast.IsVariableDeclarationList(initializerWithoutParens) || ast.IsAssignmentPattern(initializerWithoutParens) {
			var bodyLocation core.TextRange
			var statementsLocation core.TextRange
			temp := ch.Factory().NewTempVariable()
			res := ch.Visitor().VisitNode(ch.Factory().CreateForOfBindingStatement(initializerWithoutParens, temp))
			statements := make([]*ast.Node, 0, 1)
			if res != nil {
				statements = append(statements, res)
			}
			if ast.IsBlock(node.Statement) {
				for _, statement := range node.Statement.Statements() {
					visited := ch.Visitor().VisitEachChild(statement)
					if visited != nil {
						statements = append(statements, visited)
					}
				}
				bodyLocation = node.Statement.Loc
				statementsLocation = node.Statement.StatementList().Loc
			} else if node.Statement != nil {
				statements = append(statements, ch.Visitor().VisitEachChild(node.Statement))
				bodyLocation = node.Statement.Loc
				statementsLocation = node.Statement.Loc
			}

			list := ch.Factory().NewVariableDeclarationList(
				ast.NodeFlagsLet,
				ch.Factory().NewNodeList([]*ast.Node{ch.Factory().NewVariableDeclaration(temp, nil, nil, nil)}),
			)
			list.Loc = node.Initializer.Loc

			expr := ch.Visitor().VisitEachChild(node.Expression)

			statementsList := ch.Factory().NewNodeList(statements)
			statementsList.Loc = statementsLocation

			block := ch.Factory().NewBlock(statementsList, true)
			block.Loc = bodyLocation

			return ch.Factory().UpdateForInOrOfStatement(
				node,
				node.AwaitModifier,
				list,
				expr,
				block,
			)
		}
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) visitBinaryExpression(node *ast.BinaryExpression, expressionResultIsUnused bool) *ast.Node {
	if ast.IsDestructuringAssignment(node.AsNode()) && ast.ContainsObjectRestOrSpread(node.Left) {
		return transformers.FlattenDestructuringAssignment(
			&ch.Transformer,
			node.AsNode(), !expressionResultIsUnused,
			transformers.FlattenLevelObjectRest, nil,
		)
	}
	if node.OperatorToken.Kind == ast.KindCommaToken {
		ch.expressionResultIsUnused = true
		left := ch.Visitor().VisitNode(node.Left)
		ch.expressionResultIsUnused = expressionResultIsUnused
		right := ch.Visitor().VisitNode(node.Right)
		return ch.Factory().UpdateBinaryExpression(node, nil, left, nil, node.OperatorToken, right)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) visitObjectLiteralExpression(node *ast.ObjectLiteralExpression) *ast.Node {
	if (node.SubtreeFacts() & ast.SubtreeContainsObjectRestOrSpread) == 0 {
		return ch.Visitor().VisitEachChild(node.AsNode())
	}
	// spread elements emit like so:
	// non-spread elements are chunked together into object literals, and then all are passed to __assign:
	//     { a, ...o, b } => __assign(__assign({a}, o), {b});
	// If the first element is a spread element, then the first argument to __assign is {}:
	//     { ...o, a, b, ...o2 } => __assign(__assign(__assign({}, o), {a, b}), o2)
	//
	// We cannot call __assign with more than two elements, since any element could cause side effects. For
	// example:
	//      var k = { a: 1, b: 2 };
	//      var o = { a: 3, ...k, b: k.a++ };
	//      // expected: { a: 1, b: 1 }
	// If we translate the above to `__assign({ a: 3 }, k, { b: k.a++ })`, the `k.a++` will evaluate before
	// `k` is spread and we end up with `{ a: 2, b: 1 }`.
	//
	// This also occurs for spread elements, not just property assignments:
	//      var k = { a: 1, get b() { l = { z: 9 }; return 2; } };
	//      var l = { c: 3 };
	//      var o = { ...k, ...l };
	//      // expected: { a: 1, b: 2, z: 9 }
	// If we translate the above to `__assign({}, k, l)`, the `l` will evaluate before `k` is spread and we
	// end up with `{ a: 1, b: 2, c: 3 }`

	objects := ch.chunkObjectLiteralElements(node.Properties)
	if len(objects) > 0 && objects[0].Kind != ast.KindObjectLiteralExpression {
		objects = append([]*ast.Node{ch.Factory().NewObjectLiteralExpression(ch.Factory().NewNodeList(nil), false)}, objects...)
	}
	expression := objects[0]
	if len(objects) > 1 {
		for i, obj := range objects {
			if i == 0 {
				continue
			}
			expression = ch.Factory().NewAssignHelper([]*ast.Node{expression, obj}, ch.compilerOptions.GetEmitScriptTarget())
		}
		return expression
	}
	return ch.Factory().NewAssignHelper(objects, ch.compilerOptions.GetEmitScriptTarget())
}

func (ch *objectRestSpreadTransformer) chunkObjectLiteralElements(list *ast.NodeList) []*ast.Node {
	if list == nil || len(list.Nodes) == 0 {
		return nil
	}
	elements := list.Nodes
	var chunkObject []*ast.Node
	objects := make([]*ast.Node, 0, 1)
	for _, e := range elements {
		if e.Kind == ast.KindSpreadAssignment {
			if len(chunkObject) > 0 {
				objects = append(objects, ch.Factory().NewObjectLiteralExpression(ch.Factory().NewNodeList(chunkObject), false))
				chunkObject = nil
			}
			target := e.Expression()
			objects = append(objects, ch.Visitor().VisitNode(target))
		} else {
			var elem *ast.Node
			if e.Kind == ast.KindPropertyAssignment {
				elem = ch.Factory().NewPropertyAssignment(nil, e.Name(), nil, nil, ch.Visitor().VisitNode(e.Initializer()))
			} else {
				elem = ch.Visitor().VisitNode(e)
			}
			chunkObject = append(chunkObject, elem)
		}
	}
	if len(chunkObject) > 0 {
		objects = append(objects, ch.Factory().NewObjectLiteralExpression(ch.Factory().NewNodeList(chunkObject), false))
	}
	return objects
}

func newObjectRestSpreadTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &objectRestSpreadTransformer{compilerOptions: opts.CompilerOptions}
	return tx.NewTransformer(tx.visit, opts.Context)
}

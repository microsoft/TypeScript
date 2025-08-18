package estransforms

import (
	"strconv"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type pendingDecl struct {
	pendingExpressions []*ast.Node
	name               *ast.Node
	value              *ast.Node
	location           core.TextRange
	original           *ast.Node
}

type flattenLevel int

const (
	flattenLevelAll flattenLevel = iota
	flattenLevelObjectRest
)

type flattenContext struct {
	level                                  flattenLevel
	currentExpressions                     []*ast.Node
	currentDeclarations                    []pendingDecl
	hasTransformedPriorElement             bool
	emitBindingOrAssignment                func(t *objectRestSpreadTransformer, target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node)
	createArrayBindingOrAssignmentPattern  func(t *objectRestSpreadTransformer, elements []*ast.Node) *ast.Node
	createObjectBindingOrAssignmentPattern func(t *objectRestSpreadTransformer, elements []*ast.Node) *ast.Node
	createArrayBindingOrAssignmentElement  func(t *objectRestSpreadTransformer, expr *ast.Node) *ast.Node
	hoistTempVariables                     bool
}

type oldFlattenContext flattenContext

type objectRestSpreadTransformer struct {
	transformers.Transformer
	compilerOptions *core.CompilerOptions

	inExportedVariableStatement bool

	ctx                                       flattenContext
	parametersWithPrecedingObjectRestOrSpread map[*ast.Node]struct{}
}

func (ch *objectRestSpreadTransformer) enterFlattenContext(
	level flattenLevel,
	emitBindingOrAssignment func(t *objectRestSpreadTransformer, target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node),
	createArrayBindingOrAssignmentPattern func(t *objectRestSpreadTransformer, elements []*ast.Node) *ast.Node,
	createObjectBindingOrAssignmentPattern func(t *objectRestSpreadTransformer, elements []*ast.Node) *ast.Node,
	createArrayBindingOrAssignmentElement func(t *objectRestSpreadTransformer, expr *ast.Node) *ast.Node,
	hoistTempVariables bool,
) oldFlattenContext {
	old := ch.ctx
	ch.ctx = flattenContext{
		level:                                  level,
		emitBindingOrAssignment:                emitBindingOrAssignment,
		createArrayBindingOrAssignmentPattern:  createArrayBindingOrAssignmentPattern,
		createObjectBindingOrAssignmentPattern: createObjectBindingOrAssignmentPattern,
		createArrayBindingOrAssignmentElement:  createArrayBindingOrAssignmentElement,
		hoistTempVariables:                     hoistTempVariables,
	}
	return oldFlattenContext(old)
}

func (ch *objectRestSpreadTransformer) exitFlattenContext(old oldFlattenContext) {
	ch.ctx = flattenContext(old)
}

func (ch *objectRestSpreadTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsESObjectRestOrSpread == 0 && ch.parametersWithPrecedingObjectRestOrSpread == nil {
		return node
	}
	switch node.Kind {
	case ast.KindSourceFile:
		return ch.visitSourceFile(node.AsSourceFile())
	case ast.KindObjectLiteralExpression:
		return ch.visitObjectLiteralExpression(node.AsObjectLiteralExpression())
	case ast.KindBinaryExpression:
		return ch.visitBinaryExpression(node.AsBinaryExpression())
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
		for i, statement := range body.AsBlock().Statements.Nodes {
			if !custom && ast.IsPrologueDirective(statement) {
				prefix = append(prefix, statement)
			} else if ch.EmitContext().EmitFlags(statement)&printer.EFCustomPrologue != 0 {
				custom = true
				prefix = append(prefix, statement)
			} else {
				suffix = body.AsBlock().Statements.Nodes[i:]
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
	newStatementList.Loc = body.AsBlock().Statements.Loc
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
				if len(parameter.Name().AsBindingPattern().Elements.Nodes) > 0 {
					declarations := ch.flattenDestructuringBinding(flattenLevelAll, parameter, ch.Factory().NewGeneratedNameForNode(parameter), false, false)
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
			declarations := ch.flattenDestructuringBinding(flattenLevelObjectRest, parameter, ch.Factory().NewGeneratedNameForNode(parameter), false, true)
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
		visitedBindings := ch.flattenDestructuringBinding(flattenLevelObjectRest, updatedDecl, nil, false, false)
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
			if block.AsBlock().Statements != nil && len(block.AsBlock().Statements.Nodes) > 0 {
				statements = append(statements, block.AsBlock().Statements.Nodes...)
			}
			statementList := ch.Factory().NewNodeList(statements)
			statementList.Loc = block.AsBlock().Statements.Loc

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
		return ch.flattenDestructuringBinding(
			flattenLevelObjectRest,
			node.AsNode(),
			nil,
			exported,
			false,
		)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *objectRestSpreadTransformer) flattenDestructuringBinding(level flattenLevel, node *ast.Node, rvalue *ast.Node, hoist bool, skipInitializer bool) *ast.Node {
	old := ch.enterFlattenContext(level, (*objectRestSpreadTransformer).emitBinding, (*objectRestSpreadTransformer).createArrayBindingPattern, (*objectRestSpreadTransformer).createObjectBindingPattern, (*objectRestSpreadTransformer).createArrayBindingElement, hoist)
	defer ch.exitFlattenContext(old)

	if ast.IsVariableDeclaration(node) {
		initializer := getInitializerOfBindingOrAssignmentElement(node)
		if initializer != nil && (ast.IsIdentifier(initializer) && bindingOrAssignmentElementAssignsToName(node, initializer.AsIdentifier().Text) || bindingOrAssignmentElementContainsNonLiteralComputedName(node)) {
			// If the right-hand value of the assignment is also an assignment target then
			// we need to cache the right-hand value.
			initializer = ch.ensureIdentifier(ch.Visitor().VisitNode(initializer), false, initializer.Loc)
			node = ch.Factory().UpdateVariableDeclaration(node.AsVariableDeclaration(), node.Name(), nil, nil, initializer)
		}
	}

	ch.flattenBindingOrAssignmentElement(node, rvalue, node.Loc, skipInitializer)

	if len(ch.ctx.currentExpressions) > 0 {
		temp := ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(temp)
		last := &ch.ctx.currentDeclarations[len(ch.ctx.currentDeclarations)-1]
		last.pendingExpressions = append(last.pendingExpressions, ch.Factory().NewAssignmentExpression(temp, last.value))
		last.pendingExpressions = append(last.pendingExpressions, ch.ctx.currentExpressions...)
		last.value = temp
	}
	decls := make([]*ast.Node, 0, len(ch.ctx.currentDeclarations))
	for _, pending := range ch.ctx.currentDeclarations {
		expr := pending.value
		if len(pending.pendingExpressions) > 0 {
			expr = ch.Factory().InlineExpressions(append(pending.pendingExpressions, pending.value))
		}
		decl := ch.Factory().NewVariableDeclaration(
			pending.name,
			nil,
			nil,
			expr,
		)
		decl.Loc = pending.location
		if pending.original != nil {
			ch.EmitContext().SetOriginal(decl, pending.original)
		}
		decls = append(decls, decl)
	}
	if len(decls) == 1 {
		return decls[0]
	}
	if len(decls) == 0 {
		return nil
	}
	return ch.Factory().NewSyntaxList(decls)
}

func (ch *objectRestSpreadTransformer) visitForOftatement(node *ast.ForInOrOfStatement) *ast.Node {
	if node.Initializer.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 || (ast.IsAssignmentPattern(node.Initializer) && ast.ContainsObjectRestOrSpread(node.Initializer)) {
		initializerWithoutParens := ast.SkipParentheses(node.Initializer)
		if ast.IsVariableDeclarationList(initializerWithoutParens) || ast.IsAssignmentPattern(initializerWithoutParens) {
			var bodyLocation core.TextRange
			var statementsLocation core.TextRange
			temp := ch.Factory().NewTempVariable()
			res := ch.Visitor().VisitNode(ch.createForOfBindingStatement(initializerWithoutParens, temp))
			statements := make([]*ast.Node, 0, 1)
			if res != nil {
				statements = append(statements, res)
			}
			if ast.IsBlock(node.Statement) {
				for _, statement := range node.Statement.AsBlock().Statements.Nodes {
					visited := ch.Visitor().VisitEachChild(statement)
					if visited != nil {
						statements = append(statements, visited)
					}
				}
				bodyLocation = node.Statement.Loc
				statementsLocation = node.Statement.AsBlock().Statements.Loc
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

func (ch *objectRestSpreadTransformer) createForOfBindingStatement(node *ast.Node, boundValue *ast.Node) *ast.Node {
	if ast.IsVariableDeclarationList(node) {
		firstDeclaration := node.AsVariableDeclarationList().Declarations.Nodes[0]
		updatedDeclaration := ch.Factory().UpdateVariableDeclaration(
			firstDeclaration.AsVariableDeclaration(),
			firstDeclaration.Name(),
			nil,
			nil,
			boundValue,
		)
		statement := ch.Factory().NewVariableStatement(
			nil,
			ch.Factory().UpdateVariableDeclarationList(
				node.AsVariableDeclarationList(),
				ch.Factory().NewNodeList([]*ast.Node{updatedDeclaration}),
			),
		)
		statement.Loc = node.Loc
		return statement
	} else {
		updatedExpression := ch.Factory().NewAssignmentExpression(node, boundValue)
		updatedExpression.Loc = node.Loc
		statement := ch.Factory().NewExpressionStatement(updatedExpression)
		statement.Loc = node.Loc
		return statement
	}
}

func (ch *objectRestSpreadTransformer) visitBinaryExpression(node *ast.BinaryExpression) *ast.Node {
	if !(ast.IsDestructuringAssignment(node.AsNode()) && ast.ContainsObjectRestOrSpread(node.Left)) {
		return ch.Visitor().VisitEachChild(node.AsNode())
	}
	return ch.flattenDestructuringAssignment(
		node,
	)
}

func (ch *objectRestSpreadTransformer) flattenDestructuringAssignment(node *ast.BinaryExpression) *ast.Node {
	location := node.Loc
	var value *ast.Node
	if ast.IsDestructuringAssignment(node.AsNode()) {
		value = node.Right
		for ast.IsEmptyArrayLiteral(node.Left) || ast.IsEmptyObjectLiteral(node.Left) {
			if ast.IsDestructuringAssignment(value) {
				node = value.AsBinaryExpression()
				location = node.Loc
				value = node.Right
			} else {
				return ch.Visitor().VisitNode(value)
			}
		}
	}
	old := ch.enterFlattenContext(flattenLevelObjectRest, (*objectRestSpreadTransformer).emitAssignment, (*objectRestSpreadTransformer).createArrayAssignmentPattern, (*objectRestSpreadTransformer).createObjectAssignmentPattern, (*objectRestSpreadTransformer).createArrayAssignmentElement, true)
	defer ch.exitFlattenContext(old)

	if value != nil {
		value = ch.Visitor().VisitNode(value)

		if ast.IsIdentifier(value) && bindingOrAssignmentElementAssignsToName(node.AsNode(), value.AsIdentifier().Text) || bindingOrAssignmentElementContainsNonLiteralComputedName(node.AsNode()) {
			// If the right-hand value of the assignment is also an assignment target then
			// we need to cache the right-hand value.
			value = ch.ensureIdentifier(value, false, location)
		} else {
			value = ch.ensureIdentifier(value, true, location)
		}

		if ast.NodeIsSynthesized(node.AsNode()) {
			// Generally, the source map location for a destructuring assignment is the root
			// expression.
			//
			// However, if the root expression is synthesized (as in the case
			// of the initializer when transforming a ForOfStatement), then the source map
			// location should point to the right-hand value of the expression.
			location = value.Loc
		}
	}

	ch.flattenBindingOrAssignmentElement(node.AsNode(), value, location, ast.IsDestructuringAssignment(node.AsNode()))

	res := ch.Factory().InlineExpressions(ch.ctx.currentExpressions)
	if res != nil {
		return res
	}
	return ch.Factory().NewOmittedExpression()
}

func (ch *objectRestSpreadTransformer) flattenBindingOrAssignmentElement(element *ast.Node, value *ast.Node, location core.TextRange, skipInitializer bool) {
	bindingTarget := ast.GetTargetOfBindingOrAssignmentElement(element)
	if !skipInitializer {
		initializer := ch.Visitor().VisitNode(getInitializerOfBindingOrAssignmentElement(element))
		if initializer != nil {
			// Combine value and initializer
			if value != nil {
				value = ch.createDefaultValueCheck(value, initializer, location)
				// If 'value' is not a simple expression, it could contain side-effecting code that should evaluate before an object or array binding pattern.
				if !transformers.IsSimpleCopiableExpression(initializer) && (ast.IsBindingPattern(bindingTarget) || ast.IsAssignmentPattern(bindingTarget)) {
					value = ch.ensureIdentifier(value, true, location)
				}
			} else {
				value = initializer
			}
		} else if value == nil {
			// Use 'void 0' in absence of value and initializer
			value = ch.Factory().NewVoidZeroExpression()
		}
	}

	if isObjectBindingOrAssignmentPattern(bindingTarget) {
		ch.flattenObjectBindingOrAssignmentPattern(element, bindingTarget, value, location)
	} else if isArrayBindingOrAssignmentPattern(bindingTarget) {
		ch.flattenArrayBindingOrAssignmentPattern(element, bindingTarget, value, location)
	} else {
		ch.ctx.emitBindingOrAssignment(ch, bindingTarget, value, location, element)
	}
}

func (ch *objectRestSpreadTransformer) flattenObjectBindingOrAssignmentPattern(parent *ast.Node, pattern *ast.Node, value *ast.Node, location core.TextRange) {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	numElements := len(elements)
	if numElements != 1 {
		// For anything other than a single-element destructuring we need to generate a temporary
		// to ensure value is evaluated exactly once. Additionally, if we have zero elements
		// we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
		// so in that case, we'll intentionally create that temporary.
		reuseIdentifierExpressions := !ast.IsDeclarationBindingElement(parent) || numElements != 0
		value = ch.ensureIdentifier(value, reuseIdentifierExpressions, location)
	}
	var bindingElements []*ast.Node
	var computedTempVariables []*ast.Node
	for i, element := range elements {
		if ast.GetRestIndicatorOfBindingOrAssignmentElement(element) == nil {
			propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
			if ch.ctx.level >= flattenLevelObjectRest && element.SubtreeFacts()&(ast.SubtreeContainsRestOrSpread|ast.SubtreeContainsObjectRestOrSpread) == 0 && ast.GetTargetOfBindingOrAssignmentElement(element).SubtreeFacts()&(ast.SubtreeContainsRestOrSpread|ast.SubtreeContainsObjectRestOrSpread) == 0 && !ast.IsComputedPropertyName(propertyName) {
				bindingElements = append(bindingElements, ch.Visitor().VisitNode(element))
			} else {
				if len(bindingElements) > 0 {
					ch.ctx.emitBindingOrAssignment(ch, ch.ctx.createObjectBindingOrAssignmentPattern(ch, bindingElements), value, location, pattern)
					bindingElements = nil
				}
				rhsValue := ch.createDestructuringPropertyAccess(value, propertyName)
				if ast.IsComputedPropertyName(propertyName) {
					computedTempVariables = append(computedTempVariables, rhsValue.AsElementAccessExpression().ArgumentExpression)
				}
				ch.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
			}
		} else if i == numElements-1 {
			if len(bindingElements) > 0 {
				ch.ctx.emitBindingOrAssignment(ch, ch.ctx.createObjectBindingOrAssignmentPattern(ch, bindingElements), value, location, pattern)
				bindingElements = nil
			}
			rhsValue := ch.Factory().NewRestHelper(value, elements, computedTempVariables, pattern.Loc)
			ch.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		}
	}
	if len(bindingElements) > 0 {
		ch.ctx.emitBindingOrAssignment(ch, ch.ctx.createObjectBindingOrAssignmentPattern(ch, bindingElements), value, location, pattern)
	}
}

type restIdElemPair struct {
	id      *ast.Node
	element *ast.Node
}

func (ch *objectRestSpreadTransformer) flattenArrayBindingOrAssignmentPattern(parent *ast.Node, pattern *ast.Node, value *ast.Node, location core.TextRange) {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	numElements := len(elements)
	if numElements != 1 && (ch.ctx.level < flattenLevelObjectRest || numElements == 0) || core.Every(elements, ast.IsOmittedExpression) {
		// For anything other than a single-element destructuring we need to generate a temporary
		// to ensure value is evaluated exactly once. Additionally, if we have zero elements
		// we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
		// so in that case, we'll intentionally create that temporary.
		// Or all the elements of the binding pattern are omitted expression such as "var [,] = [1,2]",
		// then we will create temporary variable.
		reuseIdentifierExpressions := !ast.IsDeclarationBindingElement(parent) || numElements != 0
		value = ch.ensureIdentifier(value, reuseIdentifierExpressions, location)
	}
	var bindingElements []*ast.Node
	var restContainingElements []restIdElemPair
	for i, element := range elements {
		if ch.ctx.level >= flattenLevelObjectRest {
			// If an array pattern contains an ObjectRest, we must cache the result so that we
			// can perform the ObjectRest destructuring in a different declaration
			if element.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 || ch.ctx.hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element) {
				ch.ctx.hasTransformedPriorElement = true
				temp := ch.Factory().NewTempVariable()
				if ch.ctx.hoistTempVariables {
					ch.EmitContext().AddVariableDeclaration(temp)
				}

				restContainingElements = append(restContainingElements, restIdElemPair{temp, element})
				bindingElements = append(bindingElements, ch.ctx.createArrayBindingOrAssignmentElement(ch, temp))
			} else {
				bindingElements = append(bindingElements, element)
			}
		} else if ast.IsOmittedExpression(element) {
			continue
		} else if ast.GetRestIndicatorOfBindingOrAssignmentElement(element) == nil {
			rhsValue := ch.Factory().NewElementAccessExpression(value, nil, ch.Factory().NewNumericLiteral(strconv.Itoa(i)), ast.NodeFlagsNone)
			ch.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		} else if i == numElements-1 {
			rhsValue := ch.Factory().NewArraySliceCall(value, i)
			ch.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		}
	}
	if len(bindingElements) > 0 {
		ch.ctx.emitBindingOrAssignment(ch, ch.ctx.createArrayBindingOrAssignmentPattern(ch, bindingElements), value, location, pattern)
	}
	if len(restContainingElements) > 0 {
		for _, pair := range restContainingElements {
			ch.flattenBindingOrAssignmentElement(pair.element, pair.id, pair.element.Loc, false)
		}
	}
}

/**
 * Creates either a PropertyAccessExpression or an ElementAccessExpression for the
 * right-hand side of a transformed destructuring assignment.
 *
 * @link https://tc39.github.io/ecma262/#sec-runtime-semantics-keyeddestructuringassignmentevaluation
 *
 * @param flattenContext Options used to control flattening.
 * @param value The RHS value that is the source of the property.
 * @param propertyName The destructuring property name.
 */
func (ch *objectRestSpreadTransformer) createDestructuringPropertyAccess(value *ast.Node, propertyName *ast.Node) *ast.Node {
	if ast.IsComputedPropertyName(propertyName) {
		argumentExpression := ch.ensureIdentifier(ch.Visitor().VisitNode(propertyName.AsComputedPropertyName().Expression), false, propertyName.Loc)
		return ch.Factory().NewElementAccessExpression(
			value,
			nil,
			argumentExpression,
			ast.NodeFlagsNone,
		)
	} else if ast.IsStringOrNumericLiteralLike(propertyName) || ast.IsBigIntLiteral(propertyName) {
		argumentExpression := propertyName.Clone(ch.Factory())
		return ch.Factory().NewElementAccessExpression(
			value,
			nil,
			argumentExpression,
			ast.NodeFlagsNone,
		)
	} else {
		name := ch.Factory().NewIdentifier(propertyName.AsIdentifier().Text)
		return ch.Factory().NewPropertyAccessExpression(
			value,
			nil,
			name,
			ast.NodeFlagsNone,
		)
	}
}

func (ch *objectRestSpreadTransformer) createObjectBindingPattern(elements []*ast.Node) *ast.Node {
	return ch.Factory().NewBindingPattern(ast.KindObjectBindingPattern, ch.Factory().NewNodeList(elements))
}

func (ch *objectRestSpreadTransformer) createArrayBindingPattern(elements []*ast.Node) *ast.Node {
	return ch.Factory().NewBindingPattern(ast.KindArrayBindingPattern, ch.Factory().NewNodeList(elements))
}

func (ch *objectRestSpreadTransformer) createObjectAssignmentPattern(elements []*ast.Node) *ast.Node {
	return ch.Factory().NewObjectLiteralExpression(ch.Factory().NewNodeList(elements), false)
}

func (ch *objectRestSpreadTransformer) createArrayAssignmentPattern(elements []*ast.Node) *ast.Node {
	return ch.Factory().NewArrayLiteralExpression(ch.Factory().NewNodeList(elements), false)
}

func (ch *objectRestSpreadTransformer) createArrayAssignmentElement(expr *ast.Node) *ast.Node {
	return expr
}

func (ch *objectRestSpreadTransformer) createArrayBindingElement(expr *ast.Node) *ast.Node {
	return ch.Factory().NewBindingElement(nil, nil, expr, nil)
}

func (ch *objectRestSpreadTransformer) emitExpression(node *ast.Node) {
	ch.ctx.currentExpressions = append(ch.ctx.currentExpressions, node)
}

func (ch *objectRestSpreadTransformer) emitAssignment(target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node) {
	debug.AssertNode(target, ast.IsExpression)
	expr := ch.Factory().NewAssignmentExpression(ch.Visitor().VisitNode(target), value)
	expr.Loc = location
	ch.EmitContext().SetOriginal(expr, original)
	ch.emitExpression(expr)
}

func isBindingName(node *ast.Node) bool {
	return node.Kind == ast.KindIdentifier || node.Kind == ast.KindArrayBindingPattern || node.Kind == ast.KindObjectBindingPattern
}

func (ch *objectRestSpreadTransformer) emitBinding(target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node) {
	debug.AssertNode(target, isBindingName)
	if len(ch.ctx.currentExpressions) > 0 {
		value = ch.Factory().InlineExpressions(append(ch.ctx.currentExpressions, value))
		ch.ctx.currentExpressions = nil
	}
	ch.ctx.currentDeclarations = append(ch.ctx.currentDeclarations, pendingDecl{
		ch.ctx.currentExpressions,
		target,
		value,
		location,
		original,
	})
}

func (ch *objectRestSpreadTransformer) ensureIdentifier(value *ast.Node, reuseIdentifierExpressions bool, location core.TextRange) *ast.Node {
	if reuseIdentifierExpressions && ast.IsIdentifier(value) {
		return value
	}

	temp := ch.Factory().NewTempVariable()
	if ch.ctx.hoistTempVariables {
		ch.EmitContext().AddVariableDeclaration(temp)
		assign := ch.Factory().NewAssignmentExpression(temp, value)
		assign.Loc = location
		ch.emitExpression(assign)
	} else {
		ch.ctx.emitBindingOrAssignment(ch, temp, value, location, nil)
	}
	return temp
}

func (ch *objectRestSpreadTransformer) createDefaultValueCheck(value *ast.Expression, defaultValue *ast.Expression, location core.TextRange) *ast.Node {
	value = ch.ensureIdentifier(value, true, location)
	return ch.Factory().NewConditionalExpression(
		ch.Factory().NewTypeCheck(value, "undefined"),
		ch.Factory().NewToken(ast.KindQuestionToken),
		defaultValue,
		ch.Factory().NewToken(ast.KindColonToken),
		value,
	)
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

func bindingOrAssignmentElementAssignsToName(element *ast.Node, name string) bool {
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	if target == nil {
		return false
	}
	if ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target) {
		return bindingOrAssignmentPatternAssignsToName(target, name)
	} else if ast.IsIdentifier(target) {
		return target.AsIdentifier().Text == name
	}
	return false
}

func bindingOrAssignmentPatternAssignsToName(pattern *ast.Node, name string) bool {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	for _, element := range elements {
		if bindingOrAssignmentElementAssignsToName(element, name) {
			return true
		}
	}
	return false
}

func bindingOrAssignmentElementContainsNonLiteralComputedName(element *ast.Node) bool {
	propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
	if propertyName != nil && ast.IsComputedPropertyName(propertyName) && !ast.IsLiteralExpression(propertyName.AsComputedPropertyName().Expression) {
		return true
	}
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	return target != nil && (ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target)) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target)
}

func bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern *ast.Node) bool {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	for _, element := range elements {
		if bindingOrAssignmentElementContainsNonLiteralComputedName(element) {
			return true
		}
	}
	return false
}

func getInitializerOfBindingOrAssignmentElement(bindingElement *ast.Node) *ast.Node {
	if ast.IsDeclarationBindingElement(bindingElement) {
		// `1` in `let { a = 1 } = ...`
		// `1` in `let { a: b = 1 } = ...`
		// `1` in `let { a: {b} = 1 } = ...`
		// `1` in `let { a: [b] = 1 } = ...`
		// `1` in `let [a = 1] = ...`
		// `1` in `let [{a} = 1] = ...`
		// `1` in `let [[a] = 1] = ...`
		return bindingElement.Initializer()
	}

	if ast.IsPropertyAssignment(bindingElement) {
		// `1` in `({ a: b = 1 } = ...)`
		// `1` in `({ a: {b} = 1 } = ...)`
		// `1` in `({ a: [b] = 1 } = ...)`
		initializer := bindingElement.Initializer()
		if ast.IsAssignmentExpression(initializer, true) {
			return initializer.AsBinaryExpression().Right
		}
		return nil
	}

	if ast.IsShorthandPropertyAssignment(bindingElement) {
		// `1` in `({ a = 1 } = ...)`
		return bindingElement.AsShorthandPropertyAssignment().ObjectAssignmentInitializer
	}

	if ast.IsAssignmentExpression(bindingElement, true) {
		// `1` in `[a = 1] = ...`
		// `1` in `[{a} = 1] = ...`
		// `1` in `[[a] = 1] = ...`
		return bindingElement.AsBinaryExpression().Right
	}

	if ast.IsSpreadElement(bindingElement) {
		// Recovery consistent with existing emit.
		return getInitializerOfBindingOrAssignmentElement(bindingElement.Expression())
	}
	return nil
}

func isObjectBindingOrAssignmentPattern(node *ast.Node) bool {
	return node.Kind == ast.KindObjectBindingPattern || node.Kind == ast.KindObjectLiteralExpression
}

func isArrayBindingOrAssignmentPattern(node *ast.Node) bool {
	return node.Kind == ast.KindArrayBindingPattern || node.Kind == ast.KindArrayLiteralExpression
}

func isSimpleBindingOrAssignmentElement(element *ast.Node) bool {
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	if target == nil || ast.IsOmittedExpression(target) {
		return true
	}
	propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
	if propertyName != nil && !ast.IsPropertyNameLiteral(propertyName) {
		return false
	}
	initializer := getInitializerOfBindingOrAssignmentElement(element)
	if initializer != nil && !transformers.IsSimpleInlineableExpression(initializer) {
		return false
	}
	if ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target) {
		return core.Every(ast.GetElementsOfBindingOrAssignmentPattern(target), isSimpleBindingOrAssignmentElement)
	}
	return ast.IsIdentifier(target)
}

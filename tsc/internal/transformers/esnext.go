package transformers

import (
	"maps"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type ESNextTransformer struct {
	Transformer

	exportBindings       map[string]*ast.ExportSpecifierNode
	exportVars           []*ast.VariableDeclarationNode
	defaultExportBinding *ast.IdentifierNode
	exportEqualsBinding  *ast.IdentifierNode
}

type usingKind uint

const (
	usingKindNone usingKind = iota
	usingKindSync
	usingKindAsync
)

func NewESNextTransformer(emitContext *printer.EmitContext) *Transformer {
	tx := &ESNextTransformer{}
	return tx.newTransformer(tx.visit, emitContext)
}

func (tx *ESNextTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsESNext == 0 {
		return node
	}

	switch node.Kind {
	case ast.KindSourceFile:
		node = tx.visitSourceFile(node.AsSourceFile())
	case ast.KindBlock:
		node = tx.visitBlock(node.AsBlock())
	case ast.KindForStatement:
		node = tx.visitForStatement(node.AsForStatement())
	case ast.KindForOfStatement:
		node = tx.visitForOfStatement(node.AsForInOrOfStatement())
	case ast.KindSwitchStatement:
		node = tx.visitSwitchStatement(node.AsSwitchStatement())
	default:
		node = tx.visitor.VisitEachChild(node)
	}
	return node
}

func (tx *ESNextTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile {
		return node.AsNode()
	}

	var visited *ast.SourceFileNode
	usingKind := getUsingKindOfStatements(node.Statements.Nodes)
	if usingKind != usingKindNone {
		// Imports and exports must stay at the top level. This means we must hoist all imports, exports, and
		// top-level function declarations and bindings out of the `try` statements we generate. For example:
		//
		// given:
		//
		//  import { w } from "mod";
		//  const x = expr1;
		//  using y = expr2;
		//  const z = expr3;
		//  export function f() {
		//    console.log(z);
		//  }
		//
		// produces:
		//
		//  import { x } from "mod";        // <-- preserved
		//  const x = expr1;                // <-- preserved
		//  var y, z;                       // <-- hoisted
		//  export function f() {           // <-- hoisted
		//    console.log(z);
		//  }
		//  const env_1 = { stack: [], error: void 0, hasError: false };
		//  try {
		//    y = __addDisposableResource(env_1, expr2, false);
		//    z = expr3;
		//  }
		//  catch (e_1) {
		//    env_1.error = e_1;
		//    env_1.hasError = true;
		//  }
		//  finally {
		//    __disposeResource(env_1);
		//  }
		//
		// In this transformation, we hoist `y`, `z`, and `f` to a new outer statement list while moving all other
		// statements in the source file into the `try` block, which is the same approach we use for System module
		// emit. Unlike System module emit, we attempt to preserve all statements prior to the first top-level
		// `using` to isolate the complexity of the transformed output to only where it is necessary.
		tx.emitContext.StartVariableEnvironment()

		tx.exportBindings = make(map[string]*ast.ExportSpecifierNode)
		tx.exportVars = nil

		prologue, rest := tx.factory.SplitStandardPrologue(node.Statements.Nodes)
		var topLevelStatements []*ast.Statement
		topLevelStatements = append(topLevelStatements, core.FirstResult(tx.visitor.VisitSlice(prologue))...)

		// Collect and transform any leading statements up to the first `using` or `await using`. This preserves
		// the original statement order much as is possible.

		pos := 0
		for pos < len(rest) {
			statement := rest[pos]
			if getUsingKind(statement) != usingKindNone {
				if pos > 0 {
					topLevelStatements = append(topLevelStatements, core.FirstResult(tx.visitor.VisitSlice(rest[:pos]))...)
				}
				break
			}
			pos++
		}

		if pos >= len(rest) {
			panic("Should have encountered at least one 'using' statement.")
		}

		// transform the rest of the body
		envBinding := tx.createEnvBinding()
		bodyStatements := tx.transformUsingDeclarations(rest[pos:], envBinding, &topLevelStatements)

		// add `export {}` declarations for any hoisted bindings.
		if len(tx.exportBindings) > 0 {
			topLevelStatements = append(
				topLevelStatements,
				tx.factory.NewExportDeclaration(
					nil,   /*modifiers*/
					false, /*isTypeOnly*/
					tx.factory.NewNamedExports(
						tx.factory.NewNodeList(
							slices.Collect(maps.Values(tx.exportBindings)),
						),
					),
					nil, /*moduleSpecifier*/
					nil, /*attributes*/
				),
			)
		}

		topLevelStatements = tx.emitContext.EndAndMergeVariableEnvironment(topLevelStatements)
		if len(tx.exportVars) > 0 {
			topLevelStatements = append(topLevelStatements, tx.factory.NewVariableStatement(
				tx.factory.NewModifierList([]*ast.Node{
					tx.factory.NewModifier(ast.KindExportKeyword),
				}),
				tx.factory.NewVariableDeclarationList(
					ast.NodeFlagsLet,
					tx.factory.NewNodeList(tx.exportVars),
				),
			))
		}
		topLevelStatements = append(topLevelStatements, tx.createDownlevelUsingStatements(bodyStatements, envBinding, usingKind == usingKindAsync)...)

		if tx.exportEqualsBinding != nil {
			topLevelStatements = append(topLevelStatements, tx.factory.NewExportAssignment(
				nil,  /*modifiers*/
				true, /*isExportEquals*/
				tx.exportEqualsBinding,
			))
		}

		visited = tx.factory.UpdateSourceFile(node, tx.factory.NewNodeList(topLevelStatements))
	} else {
		visited = tx.visitor.VisitEachChild(node.AsNode())
	}
	tx.emitContext.AddEmitHelper(visited, tx.emitContext.ReadEmitHelpers()...)
	tx.exportVars = nil
	tx.exportBindings = nil
	tx.defaultExportBinding = nil
	tx.exportEqualsBinding = nil
	return visited
}

func (tx *ESNextTransformer) visitBlock(node *ast.Block) *ast.Node {
	usingKind := getUsingKindOfStatements(node.Statements.Nodes)
	if usingKind != usingKindNone {
		prologue, rest := tx.factory.SplitStandardPrologue(node.Statements.Nodes)
		envBinding := tx.createEnvBinding()
		statements := make([]*ast.Statement, 0, len(prologue)+2)
		statements = append(statements, core.FirstResult(tx.visitor.VisitSlice(prologue))...)
		statements = append(statements, tx.createDownlevelUsingStatements(
			tx.transformUsingDeclarations(rest, envBinding, nil /*topLevelStatements*/),
			envBinding,
			usingKind == usingKindAsync,
		)...)
		statementList := tx.factory.NewNodeList(statements)
		statementList.Loc = node.Statements.Loc
		return tx.factory.UpdateBlock(node, statementList)
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESNextTransformer) visitForStatement(node *ast.ForStatement) *ast.Node {
	if node.Initializer != nil && isUsingVariableDeclarationList(node.Initializer) {
		// given:
		//
		//  for (using x = expr; cond; incr) { ... }
		//
		// produces a shallow transformation to:
		//
		//  {
		//    using x = expr;
		//    for (; cond; incr) { ... }
		//  }
		//
		// before handing the shallow transformation back to the visitor for an in-depth transformation.
		return tx.visitor.VisitNode(
			tx.factory.NewBlock(tx.factory.NewNodeList([]*ast.Statement{
				tx.factory.NewVariableStatement(nil /*modifiers*/, node.Initializer),
				tx.factory.UpdateForStatement(
					node,
					nil, /*initializer*/
					node.Condition,
					node.Incrementor,
					node.Statement,
				),
			}), false /*multiLine*/),
		)
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESNextTransformer) visitForOfStatement(node *ast.ForInOrOfStatement) *ast.Node {
	if isUsingVariableDeclarationList(node.Initializer) {
		// given:
		//
		//  for (using x of y) { ... }
		//
		// produces a shallow transformation to:
		//
		//  for (const x_1 of y) {
		//    using x = x;
		//    ...
		//  }
		//
		// before handing the shallow transformation back to the visitor for an in-depth transformation.
		forInitializer := node.Initializer.AsVariableDeclarationList()
		forDecl := core.FirstOrNil(forInitializer.Declarations.Nodes)
		if forDecl == nil {
			forDecl = tx.factory.NewVariableDeclaration(tx.factory.NewTempVariable(), nil, nil, nil)
		}

		isAwaitUsing := getUsingKindOfVariableDeclarationList(forInitializer) == usingKindAsync
		temp := tx.factory.NewGeneratedNameForNode(forDecl.Name())
		usingVar := tx.factory.UpdateVariableDeclaration(forDecl.AsVariableDeclaration(), forDecl.Name(), nil /*exclamationToken*/, nil /*type*/, temp)
		usingVarList := tx.factory.NewVariableDeclarationList(
			core.IfElse(isAwaitUsing, ast.NodeFlagsAwaitUsing, ast.NodeFlagsUsing),
			tx.factory.NewNodeList([]*ast.Node{usingVar}),
		)
		usingVarStatement := tx.factory.NewVariableStatement(nil /*modifiers*/, usingVarList)
		var statement *ast.Statement
		if ast.IsBlock(node.Statement) {
			statements := make([]*ast.Statement, 0, len(node.Statement.AsBlock().Statements.Nodes)+1)
			statements = append(statements, usingVarStatement)
			statements = append(statements, node.Statement.AsBlock().Statements.Nodes...)
			statement = tx.factory.UpdateBlock(
				node.Statement.AsBlock(),
				tx.factory.NewNodeList(statements),
			)
		} else {
			statement = tx.factory.NewBlock(
				tx.factory.NewNodeList([]*ast.Statement{
					usingVarStatement,
					node.Statement,
				}),
				true, /*multiLine*/
			)
		}
		return tx.visitor.VisitNode(
			tx.factory.UpdateForInOrOfStatement(
				node,
				node.AwaitModifier,
				tx.factory.NewVariableDeclarationList(
					ast.NodeFlagsConst,
					tx.factory.NewNodeList([]*ast.VariableDeclarationNode{
						tx.factory.NewVariableDeclaration(temp, nil /*exclamationToken*/, nil /*type*/, nil),
					}),
				),
				node.Expression,
				statement,
			),
		)
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESNextTransformer) visitCaseOrDefaultClause(node *ast.CaseOrDefaultClause, envBinding *ast.IdentifierNode) *ast.Node {
	if getUsingKindOfStatements(node.Statements.Nodes) != usingKindNone {
		return tx.factory.UpdateCaseOrDefaultClause(
			node,
			tx.visitor.VisitNode(node.Expression),
			tx.factory.NewNodeList(tx.transformUsingDeclarations(node.Statements.Nodes, envBinding, nil /*topLevelStatements*/)),
		)
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESNextTransformer) visitSwitchStatement(node *ast.SwitchStatement) *ast.Node {
	// given:
	//
	//  switch (expr) {
	//    case expr:
	//      using res = expr;
	//  }
	//
	// produces:
	//
	//  const env_1 = { stack: [], error: void 0, hasError: false };
	//  try {
	//    switch(expr) {
	//      case expr:
	//        const res = __addDisposableResource(env_1, expr, false);
	//    }
	//  }
	//  catch (e_1) {
	//    env_1.error = e_1;
	//    env_1.hasError = true;
	//  }
	//  finally {
	//     __disposeResources(env_1);
	//  }
	//
	usingKind := getUsingKindOfCaseOrDefaultClauses(node.CaseBlock.AsCaseBlock().Clauses.Nodes)
	if usingKind != usingKindNone {
		envBinding := tx.createEnvBinding()
		return singleOrMany(tx.createDownlevelUsingStatements(
			[]*ast.Statement{
				tx.factory.UpdateSwitchStatement(
					node,
					tx.visitor.VisitNode(node.Expression),
					tx.factory.UpdateCaseBlock(
						node.CaseBlock.AsCaseBlock(),
						tx.factory.NewNodeList(
							core.Map(node.CaseBlock.AsCaseBlock().Clauses.Nodes, func(clause *ast.CaseOrDefaultClauseNode) *ast.CaseOrDefaultClauseNode {
								return tx.visitCaseOrDefaultClause(clause.AsCaseOrDefaultClause(), envBinding)
							}),
						),
					),
				),
			},
			envBinding,
			usingKind == usingKindAsync,
		), tx.factory)
	}

	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESNextTransformer) transformUsingDeclarations(statementsIn []*ast.Statement, envBinding *ast.IdentifierNode, topLevelStatements *[]*ast.Statement) []*ast.Node {
	var statements []*ast.Statement

	hoist := func(node *ast.Statement) *ast.Statement {
		if topLevelStatements == nil {
			return node
		}

		switch node.Kind {
		case ast.KindImportDeclaration,
			ast.KindImportEqualsDeclaration,
			ast.KindExportDeclaration,
			ast.KindFunctionDeclaration:
			tx.hoistImportOrExportOrHoistedDeclaration(node, topLevelStatements)
			return nil
		case ast.KindExportAssignment:
			return tx.hoistExportAssignment(node.AsExportAssignment())
		case ast.KindClassDeclaration:
			return tx.hoistClassDeclaration(node.AsClassDeclaration())
		case ast.KindVariableStatement:
			return tx.hoistVariableStatement(node.AsVariableStatement())
		}

		return node
	}

	hoistOrAppendNode := func(node *ast.Node) {
		node = hoist(node)
		if node != nil {
			statements = append(statements, node)
		}
	}

	for _, statement := range statementsIn {
		usingKind := getUsingKind(statement)
		if usingKind != usingKindNone {
			varStatement := statement.AsVariableStatement()
			declarationList := varStatement.DeclarationList
			var declarations []*ast.VariableDeclarationNode
			for _, declaration := range declarationList.AsVariableDeclarationList().Declarations.Nodes {
				if !ast.IsIdentifier(declaration.Name()) {
					// Since binding patterns are a grammar error, we reset `declarations` so we don't process this as a `using`.
					declarations = nil
					break
				}

				// perform a shallow transform for any named evaluation
				if isNamedEvaluation(tx.emitContext, declaration) {
					declaration = transformNamedEvaluation(tx.emitContext, declaration, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
				}

				initializer := tx.visitor.VisitNode(declaration.Initializer())
				if initializer == nil {
					initializer = tx.factory.NewVoidZeroExpression()
				}
				declarations = append(declarations, tx.factory.UpdateVariableDeclaration(
					declaration.AsVariableDeclaration(),
					declaration.Name(),
					nil, /*exclamationToken*/
					nil, /*type*/
					tx.factory.NewAddDisposableResourceHelper(
						envBinding,
						initializer,
						usingKind == usingKindAsync,
					),
				))
			}

			// Only replace the statement if it was valid.
			if len(declarations) > 0 {
				varList := tx.factory.NewVariableDeclarationList(ast.NodeFlagsConst, tx.factory.NewNodeList(declarations))
				tx.emitContext.SetOriginal(varList, declarationList)
				varList.Loc = declarationList.Loc
				hoistOrAppendNode(tx.factory.UpdateVariableStatement(varStatement, nil /*modifiers*/, varList))
				continue
			}
		}

		if result := tx.visit(statement); result != nil {
			if result.Kind == ast.KindSyntaxList {
				for _, node := range result.AsSyntaxList().Children {
					hoistOrAppendNode(node)
				}
			} else {
				hoistOrAppendNode(result)
			}
		}
	}
	return statements
}

func (tx *ESNextTransformer) hoistImportOrExportOrHoistedDeclaration(node *ast.Statement, topLevelStatements *[]*ast.Statement) {
	// NOTE: `node` has already been visited
	*topLevelStatements = append(*topLevelStatements, node)
}

func (tx *ESNextTransformer) hoistExportAssignment(node *ast.ExportAssignment) *ast.Statement {
	if node.IsExportEquals {
		return tx.hoistExportEquals(node)
	} else {
		return tx.hoistExportDefault(node)
	}
}

func (tx *ESNextTransformer) hoistExportDefault(node *ast.ExportAssignment) *ast.Statement {
	// NOTE: `node` has already been visited
	if tx.defaultExportBinding != nil {
		// invalid case of multiple `export default` declarations. Don't assert here, just pass it through
		return node.AsNode()
	}

	// given:
	//
	//   export default expr;
	//
	// produces:
	//
	//   // top level
	//   var default_1;
	//   export { default_1 as default };
	//
	//   // body
	//   default_1 = expr;

	tx.defaultExportBinding = tx.factory.NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
	tx.hoistBindingIdentifier(tx.defaultExportBinding /*isExport*/, true, tx.factory.NewIdentifier("default"), node.AsNode())

	// give a class or function expression an assigned name, if needed.
	expression := node.Expression
	innerExpression := ast.SkipOuterExpressions(expression, ast.OEKAll)
	if isNamedEvaluation(tx.emitContext, innerExpression) {
		innerExpression = transformNamedEvaluation(tx.emitContext, innerExpression /*ignoreEmptyStringLiteral*/, false, "default")
		expression = tx.factory.RestoreOuterExpressions(expression, innerExpression, ast.OEKAll)
	}

	assignment := tx.factory.NewAssignmentExpression(tx.defaultExportBinding, expression)
	return tx.factory.NewExpressionStatement(assignment)
}

func (tx *ESNextTransformer) hoistExportEquals(node *ast.ExportAssignment) *ast.Statement {
	// NOTE: `node` has already been visited
	if tx.exportEqualsBinding != nil {
		// invalid case of multiple `export default` declarations. Don't assert here, just pass it through
		return node.AsNode()
	}

	// given:
	//
	//   export = expr;
	//
	// produces:
	//
	//   // top level
	//   var default_1;
	//
	//   try {
	//       // body
	//       default_1 = expr;
	//   } ...
	//
	//   // top level suffix
	//   export = default_1;

	tx.exportEqualsBinding = tx.factory.NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
	tx.emitContext.AddVariableDeclaration(tx.exportEqualsBinding)

	// give a class or function expression an assigned name, if needed.
	assignment := tx.factory.NewAssignmentExpression(tx.exportEqualsBinding, node.Expression)
	return tx.factory.NewExpressionStatement(assignment)
}

func (tx *ESNextTransformer) hoistClassDeclaration(node *ast.ClassDeclaration) *ast.Statement {
	// NOTE: `node` has already been visited
	if node.Name() == nil && tx.defaultExportBinding != nil {
		// invalid case of multiple `export default` declarations. Don't assert here, just pass it through
		return node.AsNode()
	}

	isExported := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport)
	isDefault := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsDefault)

	// When hoisting a class declaration at the top level of a file containing a top-level `using` statement, we
	// must first convert it to a class expression so that we can hoist the binding outside of the `try`.
	expression := convertClassDeclarationToClassExpression(tx.emitContext, node)
	if node.Name() != nil {
		// given:
		//
		//  using x = expr;
		//  class C {}
		//
		// produces:
		//
		//  var x, C;
		//  const env_1 = { ... };
		//  try {
		//    x = __addDisposableResource(env_1, expr, false);
		//    C = class {};
		//  }
		//  catch (e_1) {
		//    env_1.error = e_1;
		//    env_1.hasError = true;
		//  }
		//  finally {
		//    __disposeResources(env_1);
		//  }
		//
		// If the class is exported, we also produce an `export { C };`
		tx.hoistBindingIdentifier(tx.factory.GetLocalName(node.AsNode()), isExported && !isDefault, nil /*exportAlias*/, node.AsNode())
		expression = tx.factory.NewAssignmentExpression(tx.factory.GetDeclarationName(node.AsNode()), expression)
		tx.emitContext.SetOriginal(expression, node.AsNode())
		tx.emitContext.SetSourceMapRange(expression, node.Loc)
		tx.emitContext.SetCommentRange(expression, node.Loc)
		if isNamedEvaluation(tx.emitContext, expression) {
			expression = transformNamedEvaluation(tx.emitContext, expression, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
		}
	}

	if isDefault && tx.defaultExportBinding == nil {
		// In the case of a default export, we create a temporary variable that we export as the default and then
		// assign to that variable.
		//
		// given:
		//
		//  using x = expr;
		//  export default class C {}
		//
		// produces:
		//
		//  export { default_1 as default };
		//  var x, C, default_1;
		//  const env_1 = { ... };
		//  try {
		//    x = __addDisposableResource(env_1, expr, false);
		//    default_1 = C = class {};
		//  }
		//  catch (e_1) {
		//    env_1.error = e_1;
		//    env_1.hasError = true;
		//  }
		//  finally {
		//    __disposeResources(env_1);
		//  }
		//
		// Though we will never reassign `default_1`, this most closely matches the specified runtime semantics.
		tx.defaultExportBinding = tx.factory.NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
		tx.hoistBindingIdentifier(tx.defaultExportBinding /*isExport*/, true, tx.factory.NewIdentifier("default"), node.AsNode())
		expression = tx.factory.NewAssignmentExpression(tx.defaultExportBinding, expression)
		tx.emitContext.SetOriginal(expression, node.AsNode())
		if isNamedEvaluation(tx.emitContext, expression) {
			expression = transformNamedEvaluation(tx.emitContext, expression /*ignoreEmptyStringLiteral*/, false, "default")
		}
	}

	return tx.factory.NewExpressionStatement(expression)
}

func (tx *ESNextTransformer) hoistVariableStatement(node *ast.VariableStatement) *ast.Statement {
	// NOTE: `node` has already been visited
	var expressions []*ast.Expression
	isExported := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport)
	for _, variable := range node.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
		tx.hoistBindingElement(variable, isExported, variable)
		if variable.Initializer() != nil {
			expressions = append(expressions, tx.hoistInitializedVariable(variable.AsVariableDeclaration()))
		}
	}
	if len(expressions) > 0 {
		statement := tx.factory.NewExpressionStatement(tx.factory.InlineExpressions(expressions))
		tx.emitContext.SetOriginal(statement, node.AsNode())
		tx.emitContext.SetCommentRange(statement, node.Loc)
		tx.emitContext.SetSourceMapRange(statement, node.Loc)
		return statement
	}
	return nil
}

func (tx *ESNextTransformer) hoistInitializedVariable(node *ast.VariableDeclaration) *ast.Expression {
	// NOTE: `node` has already been visited
	if node.Initializer == nil {
		panic("Expected initializer")
	}
	var target *ast.Expression
	if ast.IsIdentifier(node.Name()) {
		target = node.Name().Clone(tx.factory)
		tx.emitContext.SetEmitFlags(target, tx.emitContext.EmitFlags(target) & ^(printer.EFLocalName|printer.EFExportName|printer.EFInternalName))
	} else {
		target = convertBindingPatternToAssignmentPattern(tx.emitContext, node.Name().AsBindingPattern())
	}

	assignment := tx.factory.NewAssignmentExpression(target, node.Initializer)
	tx.emitContext.SetOriginal(assignment, node.AsNode())
	tx.emitContext.SetCommentRange(assignment, node.Loc)
	tx.emitContext.SetSourceMapRange(assignment, node.Loc)
	return assignment
}

func (tx *ESNextTransformer) hoistBindingElement(node *ast.Node /*VariableDeclaration|BindingElement*/, isExportedDeclaration bool, original *ast.Node) {
	// NOTE: `node` has already been visited
	if ast.IsBindingPattern(node.Name()) {
		for _, element := range node.Name().AsBindingPattern().Elements.Nodes {
			if element.Name() != nil {
				tx.hoistBindingElement(element, isExportedDeclaration, original)
			}
		}
	} else {
		tx.hoistBindingIdentifier(node.Name(), isExportedDeclaration, nil /*exportAlias*/, original)
	}
}

func (tx *ESNextTransformer) hoistBindingIdentifier(node *ast.IdentifierNode, isExport bool, exportAlias *ast.IdentifierNode, original *ast.Node) {
	// NOTE: `node` has already been visited
	name := node
	if !isGeneratedIdentifier(tx.emitContext, node) {
		name = name.Clone(tx.factory)
	}
	if isExport {
		if exportAlias == nil && !isLocalName(tx.emitContext, name) {
			varDecl := tx.factory.NewVariableDeclaration(name, nil /*exclamationToken*/, nil /*type*/, nil /*initializer*/)
			if original != nil {
				tx.emitContext.SetOriginal(varDecl, original)
			}
			tx.exportVars = append(tx.exportVars, varDecl)
			return
		}

		var localName *ast.ModuleExportName
		var exportName *ast.ModuleExportName
		if exportAlias != nil {
			localName = name
			exportName = exportAlias
		} else {
			exportName = name
		}
		specifier := tx.factory.NewExportSpecifier( /*isTypeOnly*/ false, localName, exportName)
		if original != nil {
			tx.emitContext.SetOriginal(specifier, original)
		}
		if tx.exportBindings == nil {
			tx.exportBindings = make(map[string]*ast.ExportSpecifierNode)
		}
		tx.exportBindings[name.Text()] = specifier
	}
	tx.emitContext.AddVariableDeclaration(name)
}

func (tx *ESNextTransformer) createEnvBinding() *ast.IdentifierNode {
	return tx.factory.NewUniqueName("env")
}

func (tx *ESNextTransformer) createDownlevelUsingStatements(bodyStatements []*ast.Node, envBinding *ast.IdentifierNode, async bool) []*ast.Statement {
	statements := make([]*ast.Statement, 0, 2)

	// produces:
	//
	//  const env_1 = { stack: [], error: void 0, hasError: false };
	//
	envObject := tx.factory.NewObjectLiteralExpression(tx.factory.NewNodeList([]*ast.Expression{
		tx.factory.NewPropertyAssignment(nil /*modifiers*/, tx.factory.NewIdentifier("stack"), nil /*postfixToken*/, tx.factory.NewArrayLiteralExpression(nil, false /*multiLine*/)),
		tx.factory.NewPropertyAssignment(nil /*modifiers*/, tx.factory.NewIdentifier("error"), nil /*postfixToken*/, tx.factory.NewVoidZeroExpression()),
		tx.factory.NewPropertyAssignment(nil /*modifiers*/, tx.factory.NewIdentifier("hasError"), nil /*postfixToken*/, tx.factory.NewFalseExpression()),
	}), false /*multiLine*/)
	envVar := tx.factory.NewVariableDeclaration(envBinding, nil /*exclamationToken*/, nil /*typeNode*/, envObject)
	envVarList := tx.factory.NewVariableDeclarationList(ast.NodeFlagsConst, tx.factory.NewNodeList([]*ast.VariableDeclarationNode{envVar}))
	envVarStatement := tx.factory.NewVariableStatement(nil /*modifiers*/, envVarList)
	statements = append(statements, envVarStatement)

	// when `async` is `false`, produces:
	//
	//  try {
	//    <bodyStatements>
	//  }
	//  catch (e_1) {
	//      env_1.error = e_1;
	//      env_1.hasError = true;
	//  }
	//  finally {
	//    __disposeResources(env_1);
	//  }

	// when `async` is `true`, produces:
	//
	//  try {
	//    <bodyStatements>
	//  }
	//  catch (e_1) {
	//      env_1.error = e_1;
	//      env_1.hasError = true;
	//  }
	//  finally {
	//    const result_1 = __disposeResources(env_1);
	//    if (result_1) {
	//      await result_1;
	//    }
	//  }

	// Unfortunately, it is necessary to use two properties to indicate an error because `throw undefined` is legal
	// JavaScript.
	tryBlock := tx.factory.NewBlock(tx.factory.NewNodeList(bodyStatements), true /*multiLine*/)
	bodyCatchBinding := tx.factory.NewUniqueName("e")
	catchClause := tx.factory.NewCatchClause(
		tx.factory.NewVariableDeclaration(
			bodyCatchBinding,
			nil, /*exclamationToken*/
			nil, /*type*/
			nil, /*initializer*/
		),
		tx.factory.NewBlock(tx.factory.NewNodeList([]*ast.Statement{
			tx.factory.NewExpressionStatement(
				tx.factory.NewAssignmentExpression(
					tx.factory.NewPropertyAccessExpression(envBinding, nil, tx.factory.NewIdentifier("error"), ast.NodeFlagsNone),
					bodyCatchBinding,
				),
			),
			tx.factory.NewExpressionStatement(
				tx.factory.NewAssignmentExpression(
					tx.factory.NewPropertyAccessExpression(envBinding, nil, tx.factory.NewIdentifier("hasError"), ast.NodeFlagsNone),
					tx.factory.NewTrueExpression(),
				),
			),
		}), true /*multiLine*/),
	)

	var finallyBlock *ast.BlockNode
	if async {
		result := tx.factory.NewUniqueName("result")
		finallyBlock = tx.factory.NewBlock(tx.factory.NewNodeList([]*ast.Statement{
			tx.factory.NewVariableStatement(
				nil, /*modifiers*/
				tx.factory.NewVariableDeclarationList(ast.NodeFlagsConst, tx.factory.NewNodeList([]*ast.VariableDeclarationNode{
					tx.factory.NewVariableDeclaration(
						result,
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.factory.NewDisposeResourcesHelper(envBinding),
					),
				})),
			),
			tx.factory.NewIfStatement(result, tx.factory.NewExpressionStatement(tx.factory.NewAwaitExpression(result)), nil /*elseStatement*/),
		}), true /*multiLine*/)
	} else {
		finallyBlock = tx.factory.NewBlock(tx.factory.NewNodeList([]*ast.Statement{
			tx.factory.NewExpressionStatement(
				tx.factory.NewDisposeResourcesHelper(envBinding),
			),
		}), true /*multiLine*/)
	}

	tryStatement := tx.factory.NewTryStatement(tryBlock, catchClause, finallyBlock)
	statements = append(statements, tryStatement)
	return statements
}

func isUsingVariableDeclarationList(node *ast.ForInitializer) bool {
	return ast.IsVariableDeclarationList(node) && getUsingKindOfVariableDeclarationList(node.AsVariableDeclarationList()) != usingKindNone
}

func getUsingKindOfVariableDeclarationList(node *ast.VariableDeclarationList) usingKind {
	switch node.Flags & ast.NodeFlagsBlockScoped {
	case ast.NodeFlagsAwaitUsing:
		return usingKindAsync
	case ast.NodeFlagsUsing:
		return usingKindSync
	default:
		return usingKindNone
	}
}

func getUsingKindOfVariableStatement(node *ast.VariableStatement) usingKind {
	return getUsingKindOfVariableDeclarationList(node.DeclarationList.AsVariableDeclarationList())
}

func getUsingKind(statement *ast.Node) usingKind {
	if ast.IsVariableStatement(statement) {
		return getUsingKindOfVariableStatement(statement.AsVariableStatement())
	}
	return usingKindNone
}

func getUsingKindOfStatements(statements []*ast.Node) usingKind {
	result := usingKindNone
	for _, statement := range statements {
		usingKind := getUsingKind(statement)
		if usingKind == usingKindAsync {
			return usingKindAsync
		}
		if usingKind > result {
			result = usingKind
		}
	}
	return result
}

func getUsingKindOfCaseOrDefaultClauses(clauses []*ast.CaseOrDefaultClauseNode) usingKind {
	result := usingKindNone
	for _, clause := range clauses {
		usingKind := getUsingKindOfStatements(clause.AsCaseOrDefaultClause().Statements.Nodes)
		if usingKind == usingKindAsync {
			return usingKindAsync
		}
		if usingKind > result {
			result = usingKind
		}
	}
	return result
}

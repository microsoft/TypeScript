package estransforms

import (
	"maps"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type usingDeclarationTransformer struct {
	transformers.Transformer

	exportBindings       map[string]*ast.ExportSpecifierNode
	exportVars           []*ast.VariableDeclarationNode
	defaultExportBinding *ast.IdentifierNode
	exportEqualsBinding  *ast.IdentifierNode
}

func newUsingDeclarationTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &usingDeclarationTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}

type usingKind uint

const (
	usingKindNone usingKind = iota
	usingKindSync
	usingKindAsync
)

func (tx *usingDeclarationTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsUsing == 0 {
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
		node = tx.Visitor().VisitEachChild(node)
	}
	return node
}

func (tx *usingDeclarationTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
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
		tx.EmitContext().StartVariableEnvironment()

		tx.exportBindings = make(map[string]*ast.ExportSpecifierNode)
		tx.exportVars = nil

		prologue, rest := tx.Factory().SplitStandardPrologue(node.Statements.Nodes)
		var topLevelStatements []*ast.Statement
		topLevelStatements = append(topLevelStatements, core.FirstResult(tx.Visitor().VisitSlice(prologue))...)

		// Collect and transform any leading statements up to the first `using` or `await using`. This preserves
		// the original statement order much as is possible.

		pos := 0
		for pos < len(rest) {
			statement := rest[pos]
			if getUsingKind(statement) != usingKindNone {
				if pos > 0 {
					topLevelStatements = append(topLevelStatements, core.FirstResult(tx.Visitor().VisitSlice(rest[:pos]))...)
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
				tx.Factory().NewExportDeclaration(
					nil,   /*modifiers*/
					false, /*isTypeOnly*/
					tx.Factory().NewNamedExports(
						tx.Factory().NewNodeList(
							slices.Collect(maps.Values(tx.exportBindings)),
						),
					),
					nil, /*moduleSpecifier*/
					nil, /*attributes*/
				),
			)
		}

		topLevelStatements = tx.EmitContext().EndAndMergeVariableEnvironment(topLevelStatements)
		if len(tx.exportVars) > 0 {
			topLevelStatements = append(topLevelStatements, tx.Factory().NewVariableStatement(
				tx.Factory().NewModifierList([]*ast.Node{
					tx.Factory().NewModifier(ast.KindExportKeyword),
				}),
				tx.Factory().NewVariableDeclarationList(
					ast.NodeFlagsLet,
					tx.Factory().NewNodeList(tx.exportVars),
				),
			))
		}
		topLevelStatements = append(topLevelStatements, tx.createDownlevelUsingStatements(bodyStatements, envBinding, usingKind == usingKindAsync)...)

		if tx.exportEqualsBinding != nil {
			topLevelStatements = append(topLevelStatements, tx.Factory().NewExportAssignment(
				nil,  /*modifiers*/
				true, /*isExportEquals*/
				nil,  /*typeNode*/
				tx.exportEqualsBinding,
			))
		}

		visited = tx.Factory().UpdateSourceFile(node, tx.Factory().NewNodeList(topLevelStatements), node.EndOfFileToken)
	} else {
		visited = tx.Visitor().VisitEachChild(node.AsNode())
	}
	tx.EmitContext().AddEmitHelper(visited, tx.EmitContext().ReadEmitHelpers()...)
	tx.exportVars = nil
	tx.exportBindings = nil
	tx.defaultExportBinding = nil
	tx.exportEqualsBinding = nil
	return visited
}

func (tx *usingDeclarationTransformer) visitBlock(node *ast.Block) *ast.Node {
	usingKind := getUsingKindOfStatements(node.Statements.Nodes)
	if usingKind != usingKindNone {
		prologue, rest := tx.Factory().SplitStandardPrologue(node.Statements.Nodes)
		envBinding := tx.createEnvBinding()
		statements := make([]*ast.Statement, 0, len(prologue)+2)
		statements = append(statements, core.FirstResult(tx.Visitor().VisitSlice(prologue))...)
		statements = append(statements, tx.createDownlevelUsingStatements(
			tx.transformUsingDeclarations(rest, envBinding, nil /*topLevelStatements*/),
			envBinding,
			usingKind == usingKindAsync,
		)...)
		statementList := tx.Factory().NewNodeList(statements)
		statementList.Loc = node.Statements.Loc
		return tx.Factory().UpdateBlock(node, statementList)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *usingDeclarationTransformer) visitForStatement(node *ast.ForStatement) *ast.Node {
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
		return tx.Visitor().VisitNode(
			tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Statement{
				tx.Factory().NewVariableStatement(nil /*modifiers*/, node.Initializer),
				tx.Factory().UpdateForStatement(
					node,
					nil, /*initializer*/
					node.Condition,
					node.Incrementor,
					node.Statement,
				),
			}), false /*multiLine*/),
		)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *usingDeclarationTransformer) visitForOfStatement(node *ast.ForInOrOfStatement) *ast.Node {
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
			forDecl = tx.Factory().NewVariableDeclaration(tx.Factory().NewTempVariable(), nil, nil, nil)
		}

		isAwaitUsing := getUsingKindOfVariableDeclarationList(forInitializer) == usingKindAsync
		temp := tx.Factory().NewGeneratedNameForNode(forDecl.Name())
		usingVar := tx.Factory().UpdateVariableDeclaration(forDecl.AsVariableDeclaration(), forDecl.Name(), nil /*exclamationToken*/, nil /*type*/, temp)
		usingVarList := tx.Factory().NewVariableDeclarationList(
			core.IfElse(isAwaitUsing, ast.NodeFlagsAwaitUsing, ast.NodeFlagsUsing),
			tx.Factory().NewNodeList([]*ast.Node{usingVar}),
		)
		usingVarStatement := tx.Factory().NewVariableStatement(nil /*modifiers*/, usingVarList)
		var statement *ast.Statement
		if ast.IsBlock(node.Statement) {
			statements := make([]*ast.Statement, 0, len(node.Statement.AsBlock().Statements.Nodes)+1)
			statements = append(statements, usingVarStatement)
			statements = append(statements, node.Statement.AsBlock().Statements.Nodes...)
			statement = tx.Factory().UpdateBlock(
				node.Statement.AsBlock(),
				tx.Factory().NewNodeList(statements),
			)
		} else {
			statement = tx.Factory().NewBlock(
				tx.Factory().NewNodeList([]*ast.Statement{
					usingVarStatement,
					node.Statement,
				}),
				true, /*multiLine*/
			)
		}
		return tx.Visitor().VisitNode(
			tx.Factory().UpdateForInOrOfStatement(
				node,
				node.AwaitModifier,
				tx.Factory().NewVariableDeclarationList(
					ast.NodeFlagsConst,
					tx.Factory().NewNodeList([]*ast.VariableDeclarationNode{
						tx.Factory().NewVariableDeclaration(temp, nil /*exclamationToken*/, nil /*type*/, nil),
					}),
				),
				node.Expression,
				statement,
			),
		)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *usingDeclarationTransformer) visitCaseOrDefaultClause(node *ast.CaseOrDefaultClause, envBinding *ast.IdentifierNode) *ast.Node {
	if getUsingKindOfStatements(node.Statements.Nodes) != usingKindNone {
		return tx.Factory().UpdateCaseOrDefaultClause(
			node,
			tx.Visitor().VisitNode(node.Expression),
			tx.Factory().NewNodeList(tx.transformUsingDeclarations(node.Statements.Nodes, envBinding, nil /*topLevelStatements*/)),
		)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *usingDeclarationTransformer) visitSwitchStatement(node *ast.SwitchStatement) *ast.Node {
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
		return transformers.SingleOrMany(tx.createDownlevelUsingStatements(
			[]*ast.Statement{
				tx.Factory().UpdateSwitchStatement(
					node,
					tx.Visitor().VisitNode(node.Expression),
					tx.Factory().UpdateCaseBlock(
						node.CaseBlock.AsCaseBlock(),
						tx.Factory().NewNodeList(
							core.Map(node.CaseBlock.AsCaseBlock().Clauses.Nodes, func(clause *ast.CaseOrDefaultClauseNode) *ast.CaseOrDefaultClauseNode {
								return tx.visitCaseOrDefaultClause(clause.AsCaseOrDefaultClause(), envBinding)
							}),
						),
					),
				),
			},
			envBinding,
			usingKind == usingKindAsync,
		), tx.Factory())
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *usingDeclarationTransformer) transformUsingDeclarations(statementsIn []*ast.Statement, envBinding *ast.IdentifierNode, topLevelStatements *[]*ast.Statement) []*ast.Node {
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
				if isNamedEvaluation(tx.EmitContext(), declaration) {
					declaration = transformNamedEvaluation(tx.EmitContext(), declaration, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
				}

				initializer := tx.Visitor().VisitNode(declaration.Initializer())
				if initializer == nil {
					initializer = tx.Factory().NewVoidZeroExpression()
				}
				declarations = append(declarations, tx.Factory().UpdateVariableDeclaration(
					declaration.AsVariableDeclaration(),
					declaration.Name(),
					nil, /*exclamationToken*/
					nil, /*type*/
					tx.Factory().NewAddDisposableResourceHelper(
						envBinding,
						initializer,
						usingKind == usingKindAsync,
					),
				))
			}

			// Only replace the statement if it was valid.
			if len(declarations) > 0 {
				varList := tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList(declarations))
				tx.EmitContext().SetOriginal(varList, declarationList)
				varList.Loc = declarationList.Loc
				hoistOrAppendNode(tx.Factory().UpdateVariableStatement(varStatement, nil /*modifiers*/, varList))
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

func (tx *usingDeclarationTransformer) hoistImportOrExportOrHoistedDeclaration(node *ast.Statement, topLevelStatements *[]*ast.Statement) {
	// NOTE: `node` has already been visited
	*topLevelStatements = append(*topLevelStatements, node)
}

func (tx *usingDeclarationTransformer) hoistExportAssignment(node *ast.ExportAssignment) *ast.Statement {
	if node.IsExportEquals {
		return tx.hoistExportEquals(node)
	} else {
		return tx.hoistExportDefault(node)
	}
}

func (tx *usingDeclarationTransformer) hoistExportDefault(node *ast.ExportAssignment) *ast.Statement {
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

	tx.defaultExportBinding = tx.Factory().NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
	tx.hoistBindingIdentifier(tx.defaultExportBinding /*isExport*/, true, tx.Factory().NewIdentifier("default"), node.AsNode())

	// give a class or function expression an assigned name, if needed.
	expression := node.Expression
	innerExpression := ast.SkipOuterExpressions(expression, ast.OEKAll)
	if isNamedEvaluation(tx.EmitContext(), innerExpression) {
		innerExpression = transformNamedEvaluation(tx.EmitContext(), innerExpression /*ignoreEmptyStringLiteral*/, false, "default")
		expression = tx.Factory().RestoreOuterExpressions(expression, innerExpression, ast.OEKAll)
	}

	assignment := tx.Factory().NewAssignmentExpression(tx.defaultExportBinding, expression)
	return tx.Factory().NewExpressionStatement(assignment)
}

func (tx *usingDeclarationTransformer) hoistExportEquals(node *ast.ExportAssignment) *ast.Statement {
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

	tx.exportEqualsBinding = tx.Factory().NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
	tx.EmitContext().AddVariableDeclaration(tx.exportEqualsBinding)

	// give a class or function expression an assigned name, if needed.
	assignment := tx.Factory().NewAssignmentExpression(tx.exportEqualsBinding, node.Expression)
	return tx.Factory().NewExpressionStatement(assignment)
}

func (tx *usingDeclarationTransformer) hoistClassDeclaration(node *ast.ClassDeclaration) *ast.Statement {
	// NOTE: `node` has already been visited
	if node.Name() == nil && tx.defaultExportBinding != nil {
		// invalid case of multiple `export default` declarations. Don't assert here, just pass it through
		return node.AsNode()
	}

	isExported := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport)
	isDefault := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsDefault)

	// When hoisting a class declaration at the top level of a file containing a top-level `using` statement, we
	// must first convert it to a class expression so that we can hoist the binding outside of the `try`.
	expression := convertClassDeclarationToClassExpression(tx.EmitContext(), node)
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
		tx.hoistBindingIdentifier(tx.Factory().GetLocalName(node.AsNode()), isExported && !isDefault, nil /*exportAlias*/, node.AsNode())
		expression = tx.Factory().NewAssignmentExpression(tx.Factory().GetDeclarationName(node.AsNode()), expression)
		tx.EmitContext().SetOriginal(expression, node.AsNode())
		tx.EmitContext().SetSourceMapRange(expression, node.Loc)
		tx.EmitContext().SetCommentRange(expression, node.Loc)
		if isNamedEvaluation(tx.EmitContext(), expression) {
			expression = transformNamedEvaluation(tx.EmitContext(), expression, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
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
		tx.defaultExportBinding = tx.Factory().NewUniqueNameEx("_default", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsOptimistic})
		tx.hoistBindingIdentifier(tx.defaultExportBinding /*isExport*/, true, tx.Factory().NewIdentifier("default"), node.AsNode())
		expression = tx.Factory().NewAssignmentExpression(tx.defaultExportBinding, expression)
		tx.EmitContext().SetOriginal(expression, node.AsNode())
		if isNamedEvaluation(tx.EmitContext(), expression) {
			expression = transformNamedEvaluation(tx.EmitContext(), expression /*ignoreEmptyStringLiteral*/, false, "default")
		}
	}

	return tx.Factory().NewExpressionStatement(expression)
}

func (tx *usingDeclarationTransformer) hoistVariableStatement(node *ast.VariableStatement) *ast.Statement {
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
		statement := tx.Factory().NewExpressionStatement(tx.Factory().InlineExpressions(expressions))
		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().SetCommentRange(statement, node.Loc)
		tx.EmitContext().SetSourceMapRange(statement, node.Loc)
		return statement
	}
	return nil
}

func (tx *usingDeclarationTransformer) hoistInitializedVariable(node *ast.VariableDeclaration) *ast.Expression {
	// NOTE: `node` has already been visited
	if node.Initializer == nil {
		panic("Expected initializer")
	}
	var target *ast.Expression
	if ast.IsIdentifier(node.Name()) {
		target = node.Name().Clone(tx.Factory())
		tx.EmitContext().SetEmitFlags(target, tx.EmitContext().EmitFlags(target) & ^(printer.EFLocalName|printer.EFExportName|printer.EFInternalName))
	} else {
		target = transformers.ConvertBindingPatternToAssignmentPattern(tx.EmitContext(), node.Name().AsBindingPattern())
	}

	assignment := tx.Factory().NewAssignmentExpression(target, node.Initializer)
	tx.EmitContext().SetOriginal(assignment, node.AsNode())
	tx.EmitContext().SetCommentRange(assignment, node.Loc)
	tx.EmitContext().SetSourceMapRange(assignment, node.Loc)
	return assignment
}

func (tx *usingDeclarationTransformer) hoistBindingElement(node *ast.Node /*VariableDeclaration|BindingElement*/, isExportedDeclaration bool, original *ast.Node) {
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

func (tx *usingDeclarationTransformer) hoistBindingIdentifier(node *ast.IdentifierNode, isExport bool, exportAlias *ast.IdentifierNode, original *ast.Node) {
	// NOTE: `node` has already been visited
	name := node
	if !transformers.IsGeneratedIdentifier(tx.EmitContext(), node) {
		name = name.Clone(tx.Factory())
	}
	if isExport {
		if exportAlias == nil && !transformers.IsLocalName(tx.EmitContext(), name) {
			varDecl := tx.Factory().NewVariableDeclaration(name, nil /*exclamationToken*/, nil /*type*/, nil /*initializer*/)
			if original != nil {
				tx.EmitContext().SetOriginal(varDecl, original)
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
		specifier := tx.Factory().NewExportSpecifier( /*isTypeOnly*/ false, localName, exportName)
		if original != nil {
			tx.EmitContext().SetOriginal(specifier, original)
		}
		if tx.exportBindings == nil {
			tx.exportBindings = make(map[string]*ast.ExportSpecifierNode)
		}
		tx.exportBindings[name.Text()] = specifier
	}
	tx.EmitContext().AddVariableDeclaration(name)
}

func (tx *usingDeclarationTransformer) createEnvBinding() *ast.IdentifierNode {
	return tx.Factory().NewUniqueName("env")
}

func (tx *usingDeclarationTransformer) createDownlevelUsingStatements(bodyStatements []*ast.Node, envBinding *ast.IdentifierNode, async bool) []*ast.Statement {
	statements := make([]*ast.Statement, 0, 2)

	// produces:
	//
	//  const env_1 = { stack: [], error: void 0, hasError: false };
	//
	envObject := tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Expression{
		tx.Factory().NewPropertyAssignment(nil /*modifiers*/, tx.Factory().NewIdentifier("stack"), nil /*postfixToken*/, nil /*typeNode*/, tx.Factory().NewArrayLiteralExpression(nil, false /*multiLine*/)),
		tx.Factory().NewPropertyAssignment(nil /*modifiers*/, tx.Factory().NewIdentifier("error"), nil /*postfixToken*/, nil /*typeNode*/, tx.Factory().NewVoidZeroExpression()),
		tx.Factory().NewPropertyAssignment(nil /*modifiers*/, tx.Factory().NewIdentifier("hasError"), nil /*postfixToken*/, nil /*typeNode*/, tx.Factory().NewFalseExpression()),
	}), false /*multiLine*/)
	envVar := tx.Factory().NewVariableDeclaration(envBinding, nil /*exclamationToken*/, nil /*typeNode*/, envObject)
	envVarList := tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList([]*ast.VariableDeclarationNode{envVar}))
	envVarStatement := tx.Factory().NewVariableStatement(nil /*modifiers*/, envVarList)
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
	tryBlock := tx.Factory().NewBlock(tx.Factory().NewNodeList(bodyStatements), true /*multiLine*/)
	bodyCatchBinding := tx.Factory().NewUniqueName("e")
	catchClause := tx.Factory().NewCatchClause(
		tx.Factory().NewVariableDeclaration(
			bodyCatchBinding,
			nil, /*exclamationToken*/
			nil, /*type*/
			nil, /*initializer*/
		),
		tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Statement{
			tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(
					tx.Factory().NewPropertyAccessExpression(envBinding, nil, tx.Factory().NewIdentifier("error"), ast.NodeFlagsNone),
					bodyCatchBinding,
				),
			),
			tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(
					tx.Factory().NewPropertyAccessExpression(envBinding, nil, tx.Factory().NewIdentifier("hasError"), ast.NodeFlagsNone),
					tx.Factory().NewTrueExpression(),
				),
			),
		}), true /*multiLine*/),
	)

	var finallyBlock *ast.BlockNode
	if async {
		result := tx.Factory().NewUniqueName("result")
		finallyBlock = tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Statement{
			tx.Factory().NewVariableStatement(
				nil, /*modifiers*/
				tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList([]*ast.VariableDeclarationNode{
					tx.Factory().NewVariableDeclaration(
						result,
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.Factory().NewDisposeResourcesHelper(envBinding),
					),
				})),
			),
			tx.Factory().NewIfStatement(result, tx.Factory().NewExpressionStatement(tx.Factory().NewAwaitExpression(result)), nil /*elseStatement*/),
		}), true /*multiLine*/)
	} else {
		finallyBlock = tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Statement{
			tx.Factory().NewExpressionStatement(
				tx.Factory().NewDisposeResourcesHelper(envBinding),
			),
		}), true /*multiLine*/)
	}

	tryStatement := tx.Factory().NewTryStatement(tryBlock, catchClause, finallyBlock)
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

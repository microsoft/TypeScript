package transformers

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

type ESModuleTransformer struct {
	Transformer
	compilerOptions         *core.CompilerOptions
	resolver                binder.ReferenceResolver
	currentSourceFile       *ast.SourceFile
	importRequireStatements *importRequireStatements
	helperNameSubstitutions map[string]*ast.IdentifierNode
}

type importRequireStatements struct {
	statements        []*ast.Statement
	requireHelperName *ast.IdentifierNode
}

func NewESModuleTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions, resolver binder.ReferenceResolver) *Transformer {
	if resolver == nil {
		resolver = binder.NewReferenceResolver(binder.ReferenceResolverHooks{})
	}
	tx := &ESModuleTransformer{compilerOptions: compilerOptions, resolver: resolver}
	return tx.newTransformer(tx.visit, emitContext)
}

// Visits source elements that are not top-level or top-level nested statements.
func (tx *ESModuleTransformer) visit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindSourceFile:
		node = tx.visitSourceFile(node.AsSourceFile())
	case ast.KindImportDeclaration:
		node = tx.visitImportDeclaration(node.AsImportDeclaration())
	case ast.KindImportEqualsDeclaration:
		node = tx.visitImportEqualsDeclaration(node.AsImportEqualsDeclaration())
	case ast.KindExportAssignment:
		node = tx.visitExportAssignment(node.AsExportAssignment())
	case ast.KindExportDeclaration:
		node = tx.visitExportDeclaration(node.AsExportDeclaration())
	case ast.KindCallExpression:
		node = tx.visitCallExpression(node.AsCallExpression())
	default:
		node = tx.visitor.VisitEachChild(node)
	}
	return node
}

func (tx *ESModuleTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile ||
		!(ast.IsExternalModule(node) || tx.compilerOptions.GetIsolatedModules()) {
		return node.AsNode()
	}

	tx.currentSourceFile = node
	tx.importRequireStatements = nil

	result := tx.visitor.VisitEachChild(node.AsNode()).AsSourceFile()
	tx.emitContext.AddEmitHelper(result.AsNode(), tx.emitContext.ReadEmitHelpers()...)

	externalHelpersImportDeclaration := createExternalHelpersImportDeclarationIfNeeded(tx.emitContext, result, tx.compilerOptions, false /*hasExportStarsToExportValues*/, false /*hasImportStar*/, false /*hasImportDefault*/)
	if externalHelpersImportDeclaration != nil || tx.importRequireStatements != nil {
		prologue, rest := tx.emitContext.SplitStandardPrologue(result.Statements.Nodes)
		statements := slices.Clone(prologue)
		if externalHelpersImportDeclaration != nil {
			statements = append(statements, externalHelpersImportDeclaration)
		}
		if tx.importRequireStatements != nil {
			statements = append(statements, tx.importRequireStatements.statements...)
		}
		statements = append(statements, rest...)
		statementList := tx.factory.NewNodeList(statements)
		statementList.Loc = result.Statements.Loc
		result = tx.factory.UpdateSourceFile(result, statementList).AsSourceFile()
	}

	if ast.IsExternalModule(result) &&
		tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindPreserve &&
		!core.Some(result.Statements.Nodes, ast.IsExternalModuleIndicator) {
		statements := slices.Clone(result.Statements.Nodes)
		statements = append(statements, createEmptyImports(tx.factory))
		statementList := tx.factory.NewNodeList(statements)
		statementList.Loc = result.Statements.Loc
		result = tx.factory.UpdateSourceFile(result, statementList).AsSourceFile()
	}

	tx.importRequireStatements = nil
	tx.currentSourceFile = nil
	return result.AsNode()
}

func (tx *ESModuleTransformer) visitImportDeclaration(node *ast.ImportDeclaration) *ast.Node {
	if !tx.compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		return node.AsNode()
	}
	updatedModuleSpecifier := rewriteModuleSpecifier(tx.emitContext, node.ModuleSpecifier, tx.compilerOptions)
	return tx.factory.UpdateImportDeclaration(
		node,
		nil, /*modifiers*/
		tx.visitor.VisitNode(node.ImportClause),
		updatedModuleSpecifier,
		tx.visitor.VisitNode(node.Attributes),
	)
}

func (tx *ESModuleTransformer) visitImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) *ast.Node {
	// Though an error in es2020 modules, in node-flavor es2020 modules, we can helpfully transform this to a synthetic `require` call
	// To give easy access to a synchronous `require` in node-flavor esm. We do the transform even in scenarios where we error, but `import.meta.url`
	// is available, just because the output is reasonable for a node-like runtime.
	if tx.compilerOptions.GetEmitModuleKind() < core.ModuleKindNode16 {
		return nil
	}

	if !ast.IsExternalModuleImportEqualsDeclaration(node.AsNode()) {
		panic("import= for internal module references should be handled in an earlier transformer.")
	}

	varStatement := tx.factory.NewVariableStatement(
		nil, /*modifiers*/
		tx.factory.NewVariableDeclarationList(
			ast.NodeFlagsConst,
			tx.factory.NewNodeList([]*ast.Node{
				tx.factory.NewVariableDeclaration(
					node.Name().Clone(tx.factory),
					nil, /*exclamationToken*/
					nil, /*type*/
					tx.createRequireCall(node.AsNode()),
				),
			}),
		),
	)
	tx.emitContext.SetOriginal(varStatement, node.AsNode())
	tx.emitContext.AssignCommentAndSourceMapRanges(varStatement, node.AsNode())

	var statements []*ast.Statement
	statements = append(statements, varStatement)
	statements = tx.appendExportsOfImportEqualsDeclaration(statements, node)
	return singleOrMany(statements, tx.factory)
}

func (tx *ESModuleTransformer) appendExportsOfImportEqualsDeclaration(statements []*ast.Statement, node *ast.ImportEqualsDeclaration) []*ast.Statement {
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		statements = append(statements, tx.factory.NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.factory.NewNamedExports(
				tx.factory.NewNodeList([]*ast.Node{
					tx.factory.NewExportSpecifier(
						false, /*isTypeOnly*/
						nil,   /*propertyName*/
						node.Name().Clone(tx.factory),
					),
				}),
			),
			nil, /*moduleSpecifier*/
			nil, /*attributes*/
		))
	}
	return statements
}

func (tx *ESModuleTransformer) visitExportAssignment(node *ast.ExportAssignment) *ast.Node {
	if !node.IsExportEquals {
		return tx.visitor.VisitEachChild(node.AsNode())
	}
	if tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindPreserve {
		// Elide `export=` as it is not legal with --module ES6
		return nil
	}
	statement := tx.factory.NewExpressionStatement(
		tx.factory.NewBinaryExpression(
			tx.factory.NewPropertyAccessExpression(
				tx.factory.NewIdentifier("module"),
				nil, /*questionDotToken*/
				tx.factory.NewIdentifier("exports"),
				ast.NodeFlagsNone,
			),
			tx.factory.NewToken(ast.KindEqualsToken),
			tx.visitor.VisitNode(node.Expression),
		),
	)
	tx.emitContext.SetOriginal(statement, node.AsNode())
	return statement
}

func (tx *ESModuleTransformer) visitExportDeclaration(node *ast.ExportDeclaration) *ast.Node {
	if node.ModuleSpecifier == nil {
		return node.AsNode()
	}

	updatedModuleSpecifier := rewriteModuleSpecifier(tx.emitContext, node.ModuleSpecifier, tx.compilerOptions)
	if tx.compilerOptions.ModuleKind > core.ModuleKindES2015 || node.ExportClause == nil || !ast.IsNamespaceExport(node.ExportClause) {
		// Either ill-formed or don't need to be transformed.
		return tx.factory.UpdateExportDeclaration(
			node,
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			node.ExportClause,
			updatedModuleSpecifier,
			tx.visitor.VisitNode(node.Attributes),
		)
	}

	oldIdentifier := node.ExportClause.Name()
	synthName := tx.emitContext.NewGeneratedNameForNode(oldIdentifier, printer.AutoGenerateOptions{})
	importDecl := tx.factory.NewImportDeclaration(
		nil, /*modifiers*/
		tx.factory.NewImportClause(
			false, /*isTypeOnly*/
			nil,   /*name*/
			tx.factory.NewNamespaceImport(synthName),
		),
		updatedModuleSpecifier,
		tx.visitor.VisitNode(node.Attributes),
	)
	tx.emitContext.SetOriginal(importDecl, node.ExportClause)

	var exportDecl *ast.Node
	if ast.IsExportNamespaceAsDefaultDeclaration(node.AsNode()) {
		exportDecl = tx.factory.NewExportAssignment(nil /*modifiers*/, false /*isExportEquals*/, synthName)
	} else {
		exportDecl = tx.factory.NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.factory.NewNamedExports(
				tx.factory.NewNodeList([]*ast.Node{
					tx.factory.NewExportSpecifier(false /*isTypeOnly*/, synthName, oldIdentifier),
				}),
			),
			nil, /*moduleSpecifier*/
			nil, /*attributes*/
		)
	}
	tx.emitContext.SetOriginal(exportDecl, node.AsNode())
	return singleOrMany([]*ast.Statement{importDecl, exportDecl}, tx.factory)
}

func (tx *ESModuleTransformer) visitCallExpression(node *ast.CallExpression) *ast.Node {
	if tx.compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		if ast.IsImportCall(node.AsNode()) && len(node.Arguments.Nodes) > 0 ||
			ast.IsInJSFile(node.AsNode()) && ast.IsRequireCall(node.AsNode(), false /*requireStringLiteralLikeArgument*/) {
			return tx.visitImportOrRequireCall(node)
		}
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *ESModuleTransformer) visitImportOrRequireCall(node *ast.CallExpression) *ast.Node {
	if len(node.Arguments.Nodes) == 0 {
		return tx.visitor.VisitEachChild(node.AsNode())
	}

	expression := tx.visitor.VisitNode(node.Expression)

	var argument *ast.Expression
	if ast.IsStringLiteralLike(node.Arguments.Nodes[0]) {
		argument = rewriteModuleSpecifier(tx.emitContext, node.Arguments.Nodes[0], tx.compilerOptions)
	} else {
		argument = tx.emitContext.NewRewriteRelativeImportExtensionsHelper(node.Arguments.Nodes[0], tx.compilerOptions.Jsx == core.JsxEmitPreserve)
	}

	var arguments []*ast.Expression
	arguments = append(arguments, argument)

	rest := core.FirstResult(tx.visitor.VisitSlice(node.Arguments.Nodes[1:]))
	arguments = append(arguments, rest...)

	argumentList := tx.factory.NewNodeList(arguments)
	argumentList.Loc = node.Arguments.Loc
	return tx.factory.UpdateCallExpression(
		node,
		expression,
		node.QuestionDotToken,
		nil, /*typeArguments*/
		argumentList,
	)
}

func (tx *ESModuleTransformer) createRequireCall(node *ast.Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration*/) *ast.Expression {
	moduleName := getExternalModuleNameLiteral(tx.factory, node, tx.currentSourceFile, nil /*host*/, nil /*emitResolver*/, tx.compilerOptions)

	var args []*ast.Expression
	if moduleName != nil {
		args = append(args, rewriteModuleSpecifier(tx.emitContext, moduleName, tx.compilerOptions))
	}

	if tx.compilerOptions.GetEmitModuleKind() == core.ModuleKindPreserve {
		return tx.factory.NewCallExpression(
			tx.factory.NewIdentifier("require"),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.factory.NewNodeList(args),
			ast.NodeFlagsNone,
		)
	}

	if tx.importRequireStatements == nil {
		createRequireName := tx.emitContext.NewUniqueName("_createRequire", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
		importStatement := tx.factory.NewImportDeclaration(
			nil, /*modifiers*/
			tx.factory.NewImportClause(
				false, /*isTypeOnly*/
				nil,   /*name*/
				tx.factory.NewNamedImports(
					tx.factory.NewNodeList([]*ast.Node{
						tx.factory.NewImportSpecifier(
							false, /*isTypeOnly*/
							tx.factory.NewIdentifier("createRequire"),
							createRequireName,
						),
					}),
				),
			),
			tx.factory.NewStringLiteral("module"),
			nil, /*attributes*/
		)
		tx.emitContext.AddEmitFlags(importStatement, printer.EFCustomPrologue)

		requireHelperName := tx.emitContext.NewUniqueName("__require", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
		requireStatement := tx.factory.NewVariableStatement(
			nil, /*modifiers*/
			tx.factory.NewVariableDeclarationList(
				ast.NodeFlagsConst,
				tx.factory.NewNodeList([]*ast.Node{
					tx.factory.NewVariableDeclaration(
						requireHelperName,
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.factory.NewCallExpression(
							createRequireName.Clone(tx.factory),
							nil, /*questionDotToken*/
							nil, /*typeArguments*/
							tx.factory.NewNodeList([]*ast.Expression{
								tx.factory.NewPropertyAccessExpression(
									tx.factory.NewMetaProperty(ast.KindImportKeyword, tx.factory.NewIdentifier("meta")),
									nil, /*questionDotToken*/
									tx.factory.NewIdentifier("url"),
									ast.NodeFlagsNone,
								),
							}),
							ast.NodeFlagsNone,
						),
					),
				}),
			),
		)
		tx.emitContext.AddEmitFlags(requireStatement, printer.EFCustomPrologue)
		tx.importRequireStatements = &importRequireStatements{
			statements:        []*ast.Statement{importStatement, requireStatement},
			requireHelperName: requireHelperName,
		}
	}

	return tx.factory.NewCallExpression(
		tx.importRequireStatements.requireHelperName.Clone(tx.factory),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.factory.NewNodeList(args),
		ast.NodeFlagsNone,
	)
}

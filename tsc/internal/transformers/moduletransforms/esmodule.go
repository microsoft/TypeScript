package moduletransforms

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type ESModuleTransformer struct {
	transformers.Transformer
	compilerOptions           *core.CompilerOptions
	resolver                  binder.ReferenceResolver
	getEmitModuleFormatOfFile func(file ast.HasFileName) core.ModuleKind
	currentSourceFile         *ast.SourceFile
	importRequireStatements   *importRequireStatements
	helperNameSubstitutions   map[string]*ast.IdentifierNode
}

type importRequireStatements struct {
	statements        []*ast.Statement
	requireHelperName *ast.IdentifierNode
}

func NewESModuleTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opts.CompilerOptions
	resolver := opts.Resolver
	if resolver == nil {
		resolver = binder.NewReferenceResolver(compilerOptions, binder.ReferenceResolverHooks{})
	}
	tx := &ESModuleTransformer{compilerOptions: compilerOptions, resolver: resolver, getEmitModuleFormatOfFile: opts.GetEmitModuleFormatOfFile}
	return tx.NewTransformer(tx.visit, opts.Context)
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
		node = tx.Visitor().VisitEachChild(node)
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

	result := tx.Visitor().VisitEachChild(node.AsNode()).AsSourceFile()
	tx.EmitContext().AddEmitHelper(result.AsNode(), tx.EmitContext().ReadEmitHelpers()...)

	externalHelpersImportDeclaration := createExternalHelpersImportDeclarationIfNeeded(tx.EmitContext(), result, tx.compilerOptions, tx.getEmitModuleFormatOfFile(node), false /*hasExportStarsToExportValues*/, false /*hasImportStar*/, false /*hasImportDefault*/)
	if externalHelpersImportDeclaration != nil || tx.importRequireStatements != nil {
		prologue, rest := tx.Factory().SplitStandardPrologue(result.Statements.Nodes)
		statements := slices.Clone(prologue)
		if externalHelpersImportDeclaration != nil {
			statements = append(statements, externalHelpersImportDeclaration)
		}
		if tx.importRequireStatements != nil {
			statements = append(statements, tx.importRequireStatements.statements...)
		}
		statements = append(statements, rest...)
		statementList := tx.Factory().NewNodeList(statements)
		statementList.Loc = result.Statements.Loc
		result = tx.Factory().UpdateSourceFile(result, statementList, node.EndOfFileToken).AsSourceFile()
	}

	if ast.IsExternalModule(result) &&
		tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindPreserve &&
		!core.Some(result.Statements.Nodes, ast.IsExternalModuleIndicator) {
		statements := slices.Clone(result.Statements.Nodes)
		statements = append(statements, createEmptyImports(tx.Factory()))
		statementList := tx.Factory().NewNodeList(statements)
		statementList.Loc = result.Statements.Loc
		result = tx.Factory().UpdateSourceFile(result, statementList, node.EndOfFileToken).AsSourceFile()
	}

	tx.importRequireStatements = nil
	tx.currentSourceFile = nil
	return result.AsNode()
}

func (tx *ESModuleTransformer) visitImportDeclaration(node *ast.ImportDeclaration) *ast.Node {
	if !tx.compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		return node.AsNode()
	}
	updatedModuleSpecifier := rewriteModuleSpecifier(tx.EmitContext(), node.ModuleSpecifier, tx.compilerOptions)
	return tx.Factory().UpdateImportDeclaration(
		node,
		nil, /*modifiers*/
		tx.Visitor().VisitNode(node.ImportClause),
		updatedModuleSpecifier,
		tx.Visitor().VisitNode(node.Attributes),
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

	varStatement := tx.Factory().NewVariableStatement(
		nil, /*modifiers*/
		tx.Factory().NewVariableDeclarationList(
			ast.NodeFlagsConst,
			tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewVariableDeclaration(
					node.Name().Clone(tx.Factory()),
					nil, /*exclamationToken*/
					nil, /*type*/
					tx.createRequireCall(node.AsNode()),
				),
			}),
		),
	)
	tx.EmitContext().SetOriginal(varStatement, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(varStatement, node.AsNode())

	var statements []*ast.Statement
	statements = append(statements, varStatement)
	statements = tx.appendExportsOfImportEqualsDeclaration(statements, node)
	return transformers.SingleOrMany(statements, tx.Factory())
}

func (tx *ESModuleTransformer) appendExportsOfImportEqualsDeclaration(statements []*ast.Statement, node *ast.ImportEqualsDeclaration) []*ast.Statement {
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport) {
		statements = append(statements, tx.Factory().NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.Factory().NewNamedExports(
				tx.Factory().NewNodeList([]*ast.Node{
					tx.Factory().NewExportSpecifier(
						false, /*isTypeOnly*/
						nil,   /*propertyName*/
						node.Name().Clone(tx.Factory()),
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
		return tx.Visitor().VisitEachChild(node.AsNode())
	}
	if tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindPreserve {
		// Elide `export=` as it is not legal with --module ES6
		return nil
	}
	statement := tx.Factory().NewExpressionStatement(
		tx.Factory().NewAssignmentExpression(
			tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewIdentifier("module"),
				nil, /*questionDotToken*/
				tx.Factory().NewIdentifier("exports"),
				ast.NodeFlagsNone,
			),
			tx.Visitor().VisitNode(node.Expression),
		),
	)
	tx.EmitContext().SetOriginal(statement, node.AsNode())
	return statement
}

func (tx *ESModuleTransformer) visitExportDeclaration(node *ast.ExportDeclaration) *ast.Node {
	if node.ModuleSpecifier == nil {
		return node.AsNode()
	}

	updatedModuleSpecifier := rewriteModuleSpecifier(tx.EmitContext(), node.ModuleSpecifier, tx.compilerOptions)
	if tx.compilerOptions.Module > core.ModuleKindES2015 || node.ExportClause == nil || !ast.IsNamespaceExport(node.ExportClause) {
		// Either ill-formed or don't need to be transformed.
		return tx.Factory().UpdateExportDeclaration(
			node,
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			node.ExportClause,
			updatedModuleSpecifier,
			tx.Visitor().VisitNode(node.Attributes),
		)
	}

	oldIdentifier := node.ExportClause.Name()
	synthName := tx.Factory().NewGeneratedNameForNode(oldIdentifier)
	importDecl := tx.Factory().NewImportDeclaration(
		nil, /*modifiers*/
		tx.Factory().NewImportClause(
			ast.KindUnknown, /*phaseModifier*/
			nil,             /*name*/
			tx.Factory().NewNamespaceImport(synthName),
		),
		updatedModuleSpecifier,
		tx.Visitor().VisitNode(node.Attributes),
	)
	tx.EmitContext().SetOriginal(importDecl, node.ExportClause)

	var exportDecl *ast.Node
	if ast.IsExportNamespaceAsDefaultDeclaration(node.AsNode()) {
		exportDecl = tx.Factory().NewExportAssignment(nil /*modifiers*/, false /*isExportEquals*/, nil /*typeNode*/, synthName)
	} else {
		exportDecl = tx.Factory().NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.Factory().NewNamedExports(
				tx.Factory().NewNodeList([]*ast.Node{
					tx.Factory().NewExportSpecifier(false /*isTypeOnly*/, synthName, oldIdentifier),
				}),
			),
			nil, /*moduleSpecifier*/
			nil, /*attributes*/
		)
	}
	tx.EmitContext().SetOriginal(exportDecl, node.AsNode())
	return transformers.SingleOrMany([]*ast.Statement{importDecl, exportDecl}, tx.Factory())
}

func (tx *ESModuleTransformer) visitCallExpression(node *ast.CallExpression) *ast.Node {
	if tx.compilerOptions.RewriteRelativeImportExtensions.IsTrue() {
		if ast.IsImportCall(node.AsNode()) && len(node.Arguments.Nodes) > 0 ||
			ast.IsInJSFile(node.AsNode()) && ast.IsRequireCall(node.AsNode(), false /*requireStringLiteralLikeArgument*/) {
			return tx.visitImportOrRequireCall(node)
		}
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *ESModuleTransformer) visitImportOrRequireCall(node *ast.CallExpression) *ast.Node {
	if len(node.Arguments.Nodes) == 0 {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	expression := tx.Visitor().VisitNode(node.Expression)

	var argument *ast.Expression
	if ast.IsStringLiteralLike(node.Arguments.Nodes[0]) {
		argument = rewriteModuleSpecifier(tx.EmitContext(), node.Arguments.Nodes[0], tx.compilerOptions)
	} else {
		argument = tx.Factory().NewRewriteRelativeImportExtensionsHelper(node.Arguments.Nodes[0], tx.compilerOptions.Jsx == core.JsxEmitPreserve)
	}

	var arguments []*ast.Expression
	arguments = append(arguments, argument)

	rest := core.FirstResult(tx.Visitor().VisitSlice(node.Arguments.Nodes[1:]))
	arguments = append(arguments, rest...)

	argumentList := tx.Factory().NewNodeList(arguments)
	argumentList.Loc = node.Arguments.Loc
	return tx.Factory().UpdateCallExpression(
		node,
		expression,
		node.QuestionDotToken,
		nil, /*typeArguments*/
		argumentList,
	)
}

func (tx *ESModuleTransformer) createRequireCall(node *ast.Node /*ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration*/) *ast.Expression {
	moduleName := getExternalModuleNameLiteral(tx.Factory(), node, tx.currentSourceFile, nil /*host*/, nil /*emitResolver*/, tx.compilerOptions)

	var args []*ast.Expression
	if moduleName != nil {
		args = append(args, rewriteModuleSpecifier(tx.EmitContext(), moduleName, tx.compilerOptions))
	}

	if tx.compilerOptions.GetEmitModuleKind() == core.ModuleKindPreserve {
		return tx.Factory().NewCallExpression(
			tx.Factory().NewIdentifier("require"),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Factory().NewNodeList(args),
			ast.NodeFlagsNone,
		)
	}

	if tx.importRequireStatements == nil {
		createRequireName := tx.Factory().NewUniqueNameEx("_createRequire", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
		importStatement := tx.Factory().NewImportDeclaration(
			nil, /*modifiers*/
			tx.Factory().NewImportClause(
				ast.KindUnknown, /*phaseModifier*/
				nil,             /*name*/
				tx.Factory().NewNamedImports(
					tx.Factory().NewNodeList([]*ast.Node{
						tx.Factory().NewImportSpecifier(
							false, /*isTypeOnly*/
							tx.Factory().NewIdentifier("createRequire"),
							createRequireName,
						),
					}),
				),
			),
			tx.Factory().NewStringLiteral("module"),
			nil, /*attributes*/
		)
		tx.EmitContext().AddEmitFlags(importStatement, printer.EFCustomPrologue)

		requireHelperName := tx.Factory().NewUniqueNameEx("__require", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
		requireStatement := tx.Factory().NewVariableStatement(
			nil, /*modifiers*/
			tx.Factory().NewVariableDeclarationList(
				ast.NodeFlagsConst,
				tx.Factory().NewNodeList([]*ast.Node{
					tx.Factory().NewVariableDeclaration(
						requireHelperName,
						nil, /*exclamationToken*/
						nil, /*type*/
						tx.Factory().NewCallExpression(
							createRequireName.Clone(tx.Factory()),
							nil, /*questionDotToken*/
							nil, /*typeArguments*/
							tx.Factory().NewNodeList([]*ast.Expression{
								tx.Factory().NewPropertyAccessExpression(
									tx.Factory().NewMetaProperty(ast.KindImportKeyword, tx.Factory().NewIdentifier("meta")),
									nil, /*questionDotToken*/
									tx.Factory().NewIdentifier("url"),
									ast.NodeFlagsNone,
								),
							}),
							ast.NodeFlagsNone,
						),
					),
				}),
			),
		)
		tx.EmitContext().AddEmitFlags(requireStatement, printer.EFCustomPrologue)
		tx.importRequireStatements = &importRequireStatements{
			statements:        []*ast.Statement{importStatement, requireStatement},
			requireHelperName: requireHelperName,
		}
	}

	return tx.Factory().NewCallExpression(
		tx.importRequireStatements.requireHelperName.Clone(tx.Factory()),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		tx.Factory().NewNodeList(args),
		ast.NodeFlagsNone,
	)
}

package transformers

// !!! Unqualified enum member references across merged enum declarations are not currently supported (e.g `enum E {A}; enum E {B=A}`)
// !!! Unqualified namespace member references across merged namespace declarations are not currently supported (e.g `namespace N { export var x = 1; }; namespace N { x; }`).
// !!! SourceMaps and Comments need to be validated

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/evaluator"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/printer"
)

// Transforms TypeScript-specific runtime syntax into JavaScript-compatible syntax.
type RuntimeSyntaxTransformer struct {
	Transformer
	compilerOptions                     *core.CompilerOptions
	parentNode                          *ast.Node
	currentNode                         *ast.Node
	currentSourceFile                   *ast.Node
	currentScope                        *ast.Node // SourceFile | Block | ModuleBlock | CaseBlock
	currentScopeFirstDeclarationsOfName map[string]*ast.Node
	currentEnum                         *ast.EnumDeclarationNode
	currentNamespace                    *ast.ModuleDeclarationNode
	resolver                            binder.ReferenceResolver
	evaluator                           evaluator.Evaluator
	enumMemberCache                     map[*ast.EnumDeclarationNode]map[string]evaluator.Result
}

func NewRuntimeSyntaxTransformer(emitContext *printer.EmitContext, compilerOptions *core.CompilerOptions, resolver binder.ReferenceResolver) *Transformer {
	tx := &RuntimeSyntaxTransformer{compilerOptions: compilerOptions, resolver: resolver}
	return tx.newTransformer(tx.visit, emitContext)
}

// Pushes a new child node onto the ancestor tracking stack, returning the grandparent node to be restored later via `popNode`.
func (tx *RuntimeSyntaxTransformer) pushNode(node *ast.Node) (grandparentNode *ast.Node) {
	grandparentNode = tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = node
	return
}

// Pops the last child node off the ancestor tracking stack, restoring the grandparent node.
func (tx *RuntimeSyntaxTransformer) popNode(grandparentNode *ast.Node) {
	tx.currentNode = tx.parentNode
	tx.parentNode = grandparentNode
}

func (tx *RuntimeSyntaxTransformer) pushScope(node *ast.Node) (savedCurrentScope *ast.Node, savedCurrentScopeFirstDeclarationsOfName map[string]*ast.Node) {
	savedCurrentScope = tx.currentScope
	savedCurrentScopeFirstDeclarationsOfName = tx.currentScopeFirstDeclarationsOfName
	switch node.Kind {
	case ast.KindSourceFile:
		tx.currentScope = node
		tx.currentSourceFile = node
		tx.currentScopeFirstDeclarationsOfName = nil
	case ast.KindCaseBlock, ast.KindModuleBlock, ast.KindBlock:
		tx.currentScope = node
		tx.currentScopeFirstDeclarationsOfName = nil
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindEnumDeclaration, ast.KindModuleDeclaration, ast.KindVariableStatement:
		tx.recordDeclarationInScope(node)
	}
	return savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName
}

func (tx *RuntimeSyntaxTransformer) popScope(savedCurrentScope *ast.Node, savedCurrentScopeFirstDeclarationsOfName map[string]*ast.Node) {
	if tx.currentScope != savedCurrentScope {
		// only reset the first declaration for a name if we are exiting the scope in which it was declared
		tx.currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName
	}

	tx.currentScope = savedCurrentScope
}

// Visits each node in the AST
func (tx *RuntimeSyntaxTransformer) visit(node *ast.Node) *ast.Node {
	grandparentNode := tx.pushNode(node)
	defer tx.popNode(grandparentNode)

	savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName := tx.pushScope(node)
	defer tx.popScope(savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName)

	if node.SubtreeFacts()&ast.SubtreeContainsTypeScript == 0 && (tx.currentNamespace == nil && tx.currentEnum == nil || node.SubtreeFacts()&ast.SubtreeContainsIdentifier == 0) {
		return node
	}

	switch node.Kind {
	// TypeScript parameter property modifiers are elided
	case ast.KindPublicKeyword,
		ast.KindPrivateKeyword,
		ast.KindProtectedKeyword,
		ast.KindReadonlyKeyword,
		ast.KindOverrideKeyword:
		node = nil
	case ast.KindEnumDeclaration:
		node = tx.visitEnumDeclaration(node.AsEnumDeclaration())
	case ast.KindModuleDeclaration:
		node = tx.visitModuleDeclaration(node.AsModuleDeclaration())
	case ast.KindClassDeclaration:
		node = tx.visitClassDeclaration(node.AsClassDeclaration())
	case ast.KindClassExpression:
		node = tx.visitClassExpression(node.AsClassExpression())
	case ast.KindConstructor:
		node = tx.visitConstructorDeclaration(node.AsConstructorDeclaration())
	case ast.KindFunctionDeclaration:
		node = tx.visitFunctionDeclaration(node.AsFunctionDeclaration())
	case ast.KindVariableStatement:
		node = tx.visitVariableStatement(node.AsVariableStatement())
	case ast.KindImportEqualsDeclaration:
		node = tx.visitImportEqualsDeclaration(node.AsImportEqualsDeclaration())
	case ast.KindIdentifier:
		node = tx.visitIdentifier(node)
	case ast.KindShorthandPropertyAssignment:
		node = tx.visitShorthandPropertyAssignment(node.AsShorthandPropertyAssignment())
	default:
		node = tx.visitor.VisitEachChild(node)
	}
	return node
}

// Records that a declaration was emitted in the current scope, if it was the first declaration for the provided symbol.
func (tx *RuntimeSyntaxTransformer) recordDeclarationInScope(node *ast.Node) {
	switch node.Kind {
	case ast.KindVariableStatement:
		tx.recordDeclarationInScope(node.AsVariableStatement().DeclarationList)
		return
	case ast.KindVariableDeclarationList:
		for _, decl := range node.AsVariableDeclarationList().Declarations.Nodes {
			tx.recordDeclarationInScope(decl)
		}
		return
	case ast.KindArrayBindingPattern, ast.KindObjectBindingPattern:
		for _, element := range node.AsBindingPattern().Elements.Nodes {
			tx.recordDeclarationInScope(element)
		}
		return
	}
	name := node.Name()
	if name != nil {
		if ast.IsIdentifier(name) {
			if tx.currentScopeFirstDeclarationsOfName == nil {
				tx.currentScopeFirstDeclarationsOfName = make(map[string]*ast.Node)
			}
			text := name.Text()
			if _, found := tx.currentScopeFirstDeclarationsOfName[text]; !found {
				tx.currentScopeFirstDeclarationsOfName[text] = node
			}
		} else if ast.IsBindingPattern(name) {
			tx.recordDeclarationInScope(name)
		}
	}
}

// Determines whether a declaration is the first declaration with the same name emitted in the current scope.
func (tx *RuntimeSyntaxTransformer) isFirstDeclarationInScope(node *ast.Node) bool {
	name := node.Name()
	if name != nil && ast.IsIdentifier(name) {
		text := name.Text()
		if firstDeclaration, found := tx.currentScopeFirstDeclarationsOfName[text]; found {
			return firstDeclaration == node
		}
	}
	return false
}

func (tx *RuntimeSyntaxTransformer) isExportOfNamespace(node *ast.Node) bool {
	return tx.currentNamespace != nil && node.ModifierFlags()&ast.ModifierFlagsExport != 0
}

func (tx *RuntimeSyntaxTransformer) isExportOfExternalModule(node *ast.Node) bool {
	return tx.currentNamespace == nil && node.ModifierFlags()&ast.ModifierFlagsExport != 0
}

// Gets an expression that represents a property name, such as `"foo"` for the identifier `foo`.
func (tx *RuntimeSyntaxTransformer) getExpressionForPropertyName(member *ast.EnumMember) *ast.Expression {
	name := member.Name()
	switch name.Kind {
	case ast.KindPrivateIdentifier:
		return tx.factory.NewIdentifier("")
	case ast.KindComputedPropertyName:
		n := name.AsComputedPropertyName()
		// enums don't support computed properties so we always generate the 'expression' part of the name as-is.
		return tx.visitor.VisitNode(n.Expression)
	case ast.KindIdentifier:
		return tx.emitContext.NewStringLiteralFromNode(name)
	case ast.KindStringLiteral:
		return tx.factory.NewStringLiteral(name.AsStringLiteral().Text)
	case ast.KindNumericLiteral:
		return tx.factory.NewNumericLiteral(name.AsNumericLiteral().Text)
	default:
		return name
	}
}

// Gets an expression like `E.A` or `E["A"]` that references an enum member.
func (tx *RuntimeSyntaxTransformer) getEnumQualifiedReference(enum *ast.EnumDeclaration, member *ast.EnumMember) *ast.Expression {
	if ast.IsIdentifier(member.Name()) {
		return tx.getEnumQualifiedProperty(enum, member)
	} else {
		return tx.getEnumQualifiedElement(enum, member)
	}
}

// Gets an expression like `E.A` that references an enum member.
func (tx *RuntimeSyntaxTransformer) getEnumQualifiedProperty(enum *ast.EnumDeclaration, member *ast.EnumMember) *ast.Expression {
	prop := tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(enum.AsNode()), member.Name().Clone(tx.factory))
	tx.emitContext.AddEmitFlags(prop, printer.EFNoComments|printer.EFNoNestedComments|printer.EFNoSourceMap|printer.EFNoNestedSourceMaps)
	return prop
}

// Gets an expression like `E["A"]` that references an enum member.
func (tx *RuntimeSyntaxTransformer) getEnumQualifiedElement(enum *ast.EnumDeclaration, member *ast.EnumMember) *ast.Expression {
	prop := tx.getNamespaceQualifiedElement(tx.getNamespaceContainerName(enum.AsNode()), tx.getExpressionForPropertyName(member))
	tx.emitContext.AddEmitFlags(prop, printer.EFNoComments|printer.EFNoNestedComments|printer.EFNoSourceMap|printer.EFNoNestedSourceMaps)
	return prop
}

// Gets an expression used to refer to a namespace or enum from within the body of its declaration.
func (tx *RuntimeSyntaxTransformer) getNamespaceContainerName(node *ast.Node) *ast.IdentifierNode {
	return tx.emitContext.NewGeneratedNameForNode(node, printer.AutoGenerateOptions{})
}

// Gets an expression used to refer to an export of a namespace or a member of an enum by property name.
func (tx *RuntimeSyntaxTransformer) getNamespaceQualifiedProperty(ns *ast.IdentifierNode, name *ast.IdentifierNode) *ast.Expression {
	return getNamespaceMemberName(tx.emitContext, ns, name, nameOptions{allowSourceMaps: true})
}

// Gets an expression used to refer to an export of a namespace or a member of an enum by indexed access.
func (tx *RuntimeSyntaxTransformer) getNamespaceQualifiedElement(ns *ast.IdentifierNode, expression *ast.Expression) *ast.Expression {
	qualifiedName := tx.emitContext.Factory.NewElementAccessExpression(ns, nil /*questionDotToken*/, expression, ast.NodeFlagsNone)
	tx.emitContext.AssignCommentAndSourceMapRanges(qualifiedName, expression)
	return qualifiedName
}

// Gets an expression used within the provided node's container for any exported references.
func (tx *RuntimeSyntaxTransformer) getExportQualifiedReferenceToDeclaration(node *ast.Declaration) *ast.Expression {
	exportName := getDeclarationName(tx.emitContext, node.AsNode(), nameOptions{allowSourceMaps: true})
	if tx.isExportOfNamespace(node.AsNode()) {
		return tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(tx.currentNamespace), exportName)
	}
	return exportName
}

func (tx *RuntimeSyntaxTransformer) addVarForDeclaration(statements []*ast.Statement, node *ast.Declaration) ([]*ast.Statement, bool) {
	tx.recordDeclarationInScope(node)
	if !tx.isFirstDeclarationInScope(node) {
		return statements, false
	}

	if tx.isExportOfExternalModule(node) {
		// export { name };
		statements = append(statements, tx.factory.NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.factory.NewNamedExports(tx.factory.NewNodeList([]*ast.Node{
				tx.factory.NewExportSpecifier(
					false, /*isTypeOnly*/
					nil,   /*propertyName*/
					node.Name().Clone(tx.factory),
				),
			})),
			nil, /*moduleSpecifier*/
			nil, /*attributes*/
		))
	}

	// var name;
	name := getLocalName(tx.emitContext, node, assignedNameOptions{allowSourceMaps: true})
	varDecl := tx.factory.NewVariableDeclaration(name, nil, nil, nil)
	varFlags := core.IfElse(tx.currentScope == tx.currentSourceFile, ast.NodeFlagsNone, ast.NodeFlagsLet)
	varDecls := tx.factory.NewVariableDeclarationList(varFlags, tx.factory.NewNodeList([]*ast.Node{varDecl}))
	varStatement := tx.factory.NewVariableStatement(nil /*modifiers*/, varDecls)

	tx.emitContext.SetOriginal(varDecl, node)
	// !!! synthetic comments
	tx.emitContext.SetOriginal(varStatement, node)

	// Adjust the source map emit to match the old emitter.
	tx.emitContext.SetSourceMapRange(varDecls, node.Loc)

	// Trailing comments for enum declaration should be emitted after the function closure
	// instead of the variable statement:
	//
	//     /** Leading comment*/
	//     enum E {
	//         A
	//     } // trailing comment
	//
	// Should emit:
	//
	//     /** Leading comment*/
	//     var E;
	//     (function (E) {
	//         E[E["A"] = 0] = "A";
	//     })(E || (E = {})); // trailing comment
	//
	tx.emitContext.SetCommentRange(varStatement, node.Loc)
	tx.emitContext.AddEmitFlags(varStatement, printer.EFNoTrailingComments)
	statements = append(statements, varStatement)

	return statements, true
}

func (tx *RuntimeSyntaxTransformer) visitEnumDeclaration(node *ast.EnumDeclaration) *ast.Node {
	statements := []*ast.Statement{}

	// If needed, we should emit a variable declaration for the enum:
	//  var name;
	statements, varAdded := tx.addVarForDeclaration(statements, node.AsNode())

	// If we emit a leading variable declaration, we should not emit leading comments for the enum body, but we should
	// still emit the comments if we are emitting to a System module.
	emitFlags := printer.EFNone
	if varAdded && (tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindSystem || tx.currentScope != tx.currentSourceFile) {
		emitFlags |= printer.EFNoLeadingComments
	}

	//  x || (x = {})
	//  exports.x || (exports.x = {})
	enumArg := tx.factory.NewBinaryExpression(
		tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
		tx.factory.NewToken(ast.KindBarBarToken),
		tx.factory.NewBinaryExpression(
			tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
			tx.factory.NewToken(ast.KindEqualsToken),
			tx.factory.NewObjectLiteralExpression(tx.factory.NewNodeList([]*ast.Node{}), false),
		),
	)

	if tx.isExportOfNamespace(node.AsNode()) {
		// `localName` is the expression used within this node's containing scope for any local references.
		localName := getLocalName(tx.emitContext, node.AsNode(), assignedNameOptions{allowSourceMaps: true})

		//  x = (exports.x || (exports.x = {}))
		enumArg = tx.factory.NewBinaryExpression(
			localName,
			tx.factory.NewToken(ast.KindEqualsToken),
			enumArg,
		)
	}

	// (function (name) { ... })(name || (name = {}))
	enumParamName := tx.emitContext.NewGeneratedNameForNode(node.AsNode(), printer.AutoGenerateOptions{})
	tx.emitContext.SetSourceMapRange(enumParamName, node.Name().Loc)

	enumParam := tx.factory.NewParameterDeclaration(nil, nil, enumParamName, nil, nil, nil)
	enumBody := tx.transformEnumBody(node)
	enumFunc := tx.factory.NewFunctionExpression(nil, nil, nil, nil, tx.factory.NewNodeList([]*ast.Node{enumParam}), nil, enumBody)
	enumCall := tx.factory.NewCallExpression(tx.factory.NewParenthesizedExpression(enumFunc), nil, nil, tx.factory.NewNodeList([]*ast.Node{enumArg}), ast.NodeFlagsNone)
	enumStatement := tx.factory.NewExpressionStatement(enumCall)
	tx.emitContext.SetOriginal(enumStatement, node.AsNode())
	tx.emitContext.AssignCommentAndSourceMapRanges(enumStatement, node.AsNode())
	tx.emitContext.AddEmitFlags(enumStatement, emitFlags)
	return tx.factory.NewSyntaxList(append(statements, enumStatement))
}

// Transforms the body of an enum declaration.
func (tx *RuntimeSyntaxTransformer) transformEnumBody(node *ast.EnumDeclaration) *ast.BlockNode {
	savedCurrentEnum := tx.currentEnum
	tx.currentEnum = node.AsNode()

	// visit the children of `node` in advance to capture any references to enum members
	node = tx.visitor.VisitEachChild(node.AsNode()).AsEnumDeclaration()

	statements := []*ast.Statement{}
	if len(node.Members.Nodes) > 0 {
		tx.emitContext.StartVariableEnvironment()

		var autoValue jsnum.Number
		var autoVar *ast.IdentifierNode
		var useAutoVar bool
		for i := range len(node.Members.Nodes) {
			//  E[E["A"] = 0] = "A";
			statements = tx.transformEnumMember(
				statements,
				node,
				i,
				&autoValue,
				&autoVar,
				&useAutoVar,
			)
			autoValue++
		}

		statements = tx.emitContext.EndAndMergeVariableEnvironment(statements)
	}

	statementList := tx.factory.NewNodeList(statements)
	statementList.Loc = node.Members.Loc

	tx.currentEnum = savedCurrentEnum
	return tx.factory.NewBlock(statementList, true /*multiline*/)
}

// Transforms an enum member into a statement. It is expected that `enum` has already been visited.
func (tx *RuntimeSyntaxTransformer) transformEnumMember(
	statements []*ast.Statement,
	enum *ast.EnumDeclaration,
	index int,
	autoValue *jsnum.Number,
	autoVar **ast.IdentifierNode,
	useAutoVar *bool,
) []*ast.Statement {
	memberNode := enum.Members.Nodes[index]
	member := memberNode.AsEnumMember()

	var memberName string
	if ast.IsIdentifier(member.Name()) || ast.IsStringLiteralLike(member.Name()) {
		memberName = member.Name().Text()
	}

	savedParent := tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = memberNode

	//  E[E["A"] = x] = "A";
	//             ^
	expression := member.Initializer // NOTE: already visited

	var useConditionalReverseMapping bool
	var useExplicitReverseMapping bool
	if expression == nil {
		// Enum members without an initializer are auto-numbered. We will use constant values if there was no preceding
		// initialized member, or if the preceding initialized member was a numeric literal.
		if *useAutoVar {
			// If you are using an auto-numbered member following a non-numeric literal, we assume the previous member
			// produced a valid numeric value. This assumption is intended to be validated by the type checker prior to
			// emit.
			//  E[E["A"] = ++auto] = "A";
			//             ^^^^^^
			expression = tx.factory.NewPrefixUnaryExpression(ast.KindPlusPlusToken, *autoVar)
			useExplicitReverseMapping = true
		} else {
			// If the preceding auto value is a finite number, we can emit a numeric literal for the member initializer:
			//  E[E["A"] = 0] = "A";
			//             ^
			// If not, we cannot emit a valid numeric literal for the member initializer and emit `void 0` instead:
			//  E["A"] = void 0;
			//           ^^^^^^
			expression = constantExpression(*autoValue, tx.factory)
			if expression != nil {
				useExplicitReverseMapping = true
				if len(memberName) > 0 {
					tx.cacheEnumMemberValue(enum.AsNode(), memberName, evaluator.NewResult(*autoValue, false, false, false))
				}
			} else {
				expression = tx.factory.NewVoidExpression(tx.factory.NewNumericLiteral("0"))
			}
		}
	} else {
		// Enum members with an initializer may restore auto-numbering if the initializer is a numeric literal. If we
		// cannot syntactically determine the initializer value and the following enum member is auto-numbered, we will
		// use an `auto` variable to perform the remaining auto-numbering at runtime.
		if tx.evaluator == nil {
			tx.evaluator = evaluator.NewEvaluator(tx.evaluateEntity, ast.OEKAll)
		}

		var hasNumericInitializer, hasStringInitializer bool
		result := tx.evaluator(expression, enum.AsNode())
		switch value := result.Value.(type) {
		case jsnum.Number:
			hasNumericInitializer = true
			*autoValue = value
			expression = core.Coalesce(constantExpression(value, tx.factory), expression) // TODO: preserve original expression after Strada migration
			tx.cacheEnumMemberValue(enum.AsNode(), memberName, result)
		case string:
			hasStringInitializer = true
			*autoValue = jsnum.NaN()
			expression = core.Coalesce(constantExpression(value, tx.factory), expression) // TODO: preserve original expression after Strada migration
			tx.cacheEnumMemberValue(enum.AsNode(), memberName, result)
		default:
			*autoValue = jsnum.NaN()
		}

		nextIsAuto := index+1 < len(enum.Members.Nodes) && enum.Members.Nodes[index+1].AsEnumMember().Initializer == nil
		useExplicitReverseMapping = hasNumericInitializer || !hasStringInitializer && nextIsAuto
		useConditionalReverseMapping = !hasNumericInitializer && !hasStringInitializer && !nextIsAuto
		if *useAutoVar = nextIsAuto && !hasNumericInitializer && !hasStringInitializer; *useAutoVar {
			//  E[E["A"] = auto = x] = "A";
			//             ^^^^^^^^
			if *autoVar == nil {
				*autoVar = tx.emitContext.NewUniqueName("auto", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
				tx.emitContext.AddVariableDeclaration(*autoVar)
			}
			expression = tx.factory.NewBinaryExpression(*autoVar, tx.factory.NewToken(ast.KindEqualsToken), expression)
		}
	}

	// Define the enum member property:
	//  E[E["A"] = ++auto] = "A";
	//    ^^^^^^^^--_____
	expression = tx.factory.NewBinaryExpression(
		tx.getEnumQualifiedElement(enum, member),
		tx.factory.NewToken(ast.KindEqualsToken),
		expression,
	)

	// If this is syntactically a numeric literal initializer, or is auto numbered, then we unconditionally define the
	// reverse mapping for the enum member.
	if useExplicitReverseMapping {
		//  E[E["A"] = A = ++auto] = "A";
		//  ^^-------------------^^^^^^^
		expression = tx.factory.NewBinaryExpression(
			tx.factory.NewElementAccessExpression(
				tx.getNamespaceContainerName(enum.AsNode()),
				nil, /*questionDotToken*/
				expression,
				ast.NodeFlagsNone,
			),
			tx.factory.NewToken(ast.KindEqualsToken),
			tx.getExpressionForPropertyName(member),
		)
	}

	memberStatement := tx.factory.NewExpressionStatement(expression)
	tx.emitContext.AssignCommentAndSourceMapRanges(expression, member.AsNode())
	tx.emitContext.AssignCommentAndSourceMapRanges(memberStatement, member.AsNode())
	statements = append(statements, memberStatement)

	// If this is not auto numbered and is not syntactically a string or numeric literal initializer, then we
	// conditionally define the reverse mapping for the enum member.
	if useConditionalReverseMapping {
		//  E["A"] = x;
		//  if (typeof E.A !== "string") E.A = "A";
		//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

		ifStatement := tx.factory.NewIfStatement(
			tx.factory.NewBinaryExpression(
				tx.factory.NewTypeOfExpression(tx.getEnumQualifiedReference(enum, member)),
				tx.factory.NewToken(ast.KindExclamationEqualsEqualsToken),
				tx.factory.NewStringLiteral("string"),
			),
			tx.factory.NewExpressionStatement(
				tx.factory.NewBinaryExpression(
					tx.factory.NewElementAccessExpression(
						tx.getNamespaceContainerName(enum.AsNode()),
						nil, /*questionDotToken*/
						tx.getEnumQualifiedReference(enum, member),
						ast.NodeFlagsNone,
					),
					tx.factory.NewToken(ast.KindEqualsToken),
					tx.getExpressionForPropertyName(member),
				),
			),
			nil,
		)

		tx.emitContext.AddEmitFlags(ifStatement, printer.EFSingleLine)
		tx.emitContext.AssignSourceMapRange(ifStatement, member.Initializer)
		statements = append(statements, ifStatement)
	}

	tx.currentNode = tx.parentNode
	tx.parentNode = savedParent
	return statements
}

func (tx *RuntimeSyntaxTransformer) visitModuleDeclaration(node *ast.ModuleDeclaration) *ast.Node {
	statements := []*ast.Statement{}

	// If needed, we should emit a variable declaration for the module:
	//  var name;
	statements, varAdded := tx.addVarForDeclaration(statements, node.AsNode())

	// If we emit a leading variable declaration, we should not emit leading comments for the module body, but we should
	// still emit the comments if we are emitting to a System module.
	emitFlags := printer.EFNone
	if varAdded && (tx.compilerOptions.GetEmitModuleKind() != core.ModuleKindSystem || tx.currentScope != tx.currentSourceFile) {
		emitFlags |= printer.EFNoLeadingComments
	}

	//  x || (x = {})
	//  exports.x || (exports.x = {})
	moduleArg := tx.factory.NewBinaryExpression(
		tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
		tx.factory.NewToken(ast.KindBarBarToken),
		tx.factory.NewBinaryExpression(
			tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
			tx.factory.NewToken(ast.KindEqualsToken),
			tx.factory.NewObjectLiteralExpression(tx.factory.NewNodeList([]*ast.Node{}), false),
		),
	)

	if tx.isExportOfNamespace(node.AsNode()) {
		// `localName` is the expression used within this node's containing scope for any local references.
		localName := getLocalName(tx.emitContext, node.AsNode(), assignedNameOptions{allowSourceMaps: true})

		//  x = (exports.x || (exports.x = {}))
		moduleArg = tx.factory.NewBinaryExpression(
			localName,
			tx.factory.NewToken(ast.KindEqualsToken),
			moduleArg,
		)
	}

	// (function (name) { ... })(name || (name = {}))
	moduleParamName := tx.emitContext.NewGeneratedNameForNode(node.AsNode(), printer.AutoGenerateOptions{})
	tx.emitContext.SetSourceMapRange(moduleParamName, node.Name().Loc)

	moduleParam := tx.factory.NewParameterDeclaration(nil, nil, moduleParamName, nil, nil, nil)
	moduleBody := tx.transformModuleBody(node, tx.getNamespaceContainerName(node.AsNode()))
	moduleFunc := tx.factory.NewFunctionExpression(nil, nil, nil, nil, tx.factory.NewNodeList([]*ast.Node{moduleParam}), nil, moduleBody)
	moduleCall := tx.factory.NewCallExpression(tx.factory.NewParenthesizedExpression(moduleFunc), nil, nil, tx.factory.NewNodeList([]*ast.Node{moduleArg}), ast.NodeFlagsNone)
	moduleStatement := tx.factory.NewExpressionStatement(moduleCall)
	tx.emitContext.SetOriginal(moduleStatement, node.AsNode())
	tx.emitContext.AssignCommentAndSourceMapRanges(moduleStatement, node.AsNode())
	tx.emitContext.AddEmitFlags(moduleStatement, emitFlags)
	return tx.factory.NewSyntaxList(append(statements, moduleStatement))
}

func (tx *RuntimeSyntaxTransformer) transformModuleBody(node *ast.ModuleDeclaration, namespaceLocalName *ast.IdentifierNode) *ast.BlockNode {
	savedCurrentNamespace := tx.currentNamespace
	savedCurrentScope := tx.currentScope
	savedCurrentScopeFirstDeclarationsOfName := tx.currentScopeFirstDeclarationsOfName

	tx.currentNamespace = node.AsNode()
	tx.currentScopeFirstDeclarationsOfName = nil

	var statements []*ast.Statement
	tx.emitContext.StartVariableEnvironment()

	var statementsLocation core.TextRange
	var blockLocation core.TextRange
	if node.Body != nil {
		if node.Body.Kind == ast.KindModuleBlock {
			// visit the children of `node` in advance to capture any references to namespace members
			node = tx.visitor.VisitEachChild(node.AsNode()).AsModuleDeclaration()
			body := node.Body.AsModuleBlock()
			statements = body.Statements.Nodes
			statementsLocation = body.Statements.Loc
			blockLocation = body.Loc
		} else { // node.Body.Kind == ast.KindModuleDeclaration
			tx.currentScope = node.AsNode()
			statements, _ = tx.visitor.VisitSlice([]*ast.Node{node.Body})
			moduleBlock := getInnermostModuleDeclarationFromDottedModule(node).Body.AsModuleBlock()
			statementsLocation = moduleBlock.Statements.Loc.WithPos(-1)
		}
	}

	tx.currentNamespace = savedCurrentNamespace
	tx.currentScope = savedCurrentScope
	tx.currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName

	statements = tx.emitContext.EndAndMergeVariableEnvironment(statements)
	statementList := tx.factory.NewNodeList(statements)
	statementList.Loc = statementsLocation
	block := tx.factory.NewBlock(statementList, true /*multiline*/)
	block.Loc = blockLocation

	//  namespace hello.hi.world {
	//       function foo() {}
	//
	//       // TODO, blah
	//  }
	//
	// should be emitted as
	//
	//  var hello;
	//  (function (hello) {
	//      var hi;
	//      (function (hi) {
	//          var world;
	//          (function (world) {
	//              function foo() { }
	//              // TODO, blah
	//          })(world = hi.world || (hi.world = {}));
	//      })(hi = hello.hi || (hello.hi = {}));
	//  })(hello || (hello = {}));
	//
	// We only want to emit comment on the namespace which contains block body itself, not the containing namespaces.
	if node.Body == nil || node.Body.Kind != ast.KindModuleBlock {
		tx.emitContext.AddEmitFlags(block, printer.EFNoComments)
	}
	return block
}

func (tx *RuntimeSyntaxTransformer) visitImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) *ast.Node {
	if node.ModuleReference.Kind == ast.KindExternalModuleReference {
		return tx.visitor.VisitEachChild(node.AsNode())
	}

	moduleReference := convertEntityNameToExpression(tx.emitContext, node.ModuleReference)
	tx.emitContext.SetEmitFlags(moduleReference, printer.EFNoComments|printer.EFNoNestedSourceMaps)
	if !tx.isExportOfNamespace(node.AsNode()) {
		//  export var ${name} = ${moduleReference};
		//  var ${name} = ${moduleReference};
		varDecl := tx.factory.NewVariableDeclaration(node.Name(), nil /*exclamationToken*/, nil /*type*/, moduleReference)
		tx.emitContext.SetOriginal(varDecl, node.AsNode())
		varList := tx.factory.NewVariableDeclarationList(ast.NodeFlagsNone, tx.factory.NewNodeList([]*ast.Node{varDecl}))
		varModifiers := extractModifiers(tx.emitContext, node.Modifiers(), ast.ModifierFlagsExport)
		varStatement := tx.factory.NewVariableStatement(varModifiers, varList)
		tx.emitContext.SetOriginal(varStatement, node.AsNode())
		tx.emitContext.AssignCommentAndSourceMapRanges(varStatement, node.AsNode())
		return varStatement
	} else {
		// exports.${name} = ${moduleReference};
		return tx.createExportStatement(node.Name(), moduleReference, node.Loc, node.Loc, node.AsNode())
	}
}

func (tx *RuntimeSyntaxTransformer) visitVariableStatement(node *ast.VariableStatement) *ast.Node {
	if tx.isExportOfNamespace(node.AsNode()) {
		expressions := []*ast.Expression{}
		for _, declaration := range node.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			expression := convertVariableDeclarationToAssignmentExpression(tx.emitContext, declaration.AsVariableDeclaration())
			if expression != nil {
				expressions = append(expressions, expression)
			}
		}
		if len(expressions) == 0 {
			return nil
		}
		expression := inlineExpressions(expressions, tx.factory)
		statement := tx.factory.NewExpressionStatement(expression)
		tx.emitContext.SetOriginal(statement, node.AsNode())
		tx.emitContext.AssignCommentAndSourceMapRanges(statement, node.AsNode())

		// re-visit as the new node
		savedCurrent := tx.currentNode
		tx.currentNode = statement
		statement = tx.visitor.VisitEachChild(statement)
		tx.currentNode = savedCurrent
		return statement
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *RuntimeSyntaxTransformer) visitFunctionDeclaration(node *ast.FunctionDeclaration) *ast.Node {
	if tx.isExportOfNamespace(node.AsNode()) {
		updated := tx.factory.UpdateFunctionDeclaration(
			node,
			tx.visitor.VisitModifiers(extractModifiers(tx.emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault)),
			node.AsteriskToken,
			tx.visitor.VisitNode(node.Name()),
			nil, /*typeParameters*/
			tx.visitor.VisitNodes(node.Parameters),
			nil, /*returnType*/
			tx.visitor.VisitNode(node.Body),
		)
		export := tx.createExportStatementForDeclaration(node.AsNode())
		if export != nil {
			return tx.factory.NewSyntaxList([]*ast.Node{updated, export})
		}
		return updated
	}
	return tx.visitor.VisitEachChild(node.AsNode())
}

func (tx *RuntimeSyntaxTransformer) getParameterProperties(constructor *ast.Node) []*ast.ParameterDeclaration {
	var parameterProperties []*ast.ParameterDeclaration
	if constructor != nil {
		for _, parameter := range constructor.Parameters() {
			if ast.IsParameterPropertyDeclaration(parameter, constructor) {
				parameterProperties = append(parameterProperties, parameter.AsParameterDeclaration())
			}
		}
	}
	return parameterProperties
}

func (tx *RuntimeSyntaxTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	exported := tx.isExportOfNamespace(node.AsNode())
	var modifiers *ast.ModifierList
	if exported {
		modifiers = tx.visitor.VisitModifiers(extractModifiers(tx.emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault))
	} else {
		modifiers = tx.visitor.VisitModifiers(node.Modifiers())
	}

	name := tx.visitor.VisitNode(node.Name())
	heritageClauses := tx.visitor.VisitNodes(node.HeritageClauses)
	members := tx.visitor.VisitNodes(node.Members)
	parameterProperties := tx.getParameterProperties(core.Find(node.Members.Nodes, ast.IsConstructorDeclaration))

	if len(parameterProperties) > 0 {
		var newMembers []*ast.ClassElement
		for _, parameter := range parameterProperties {
			if ast.IsIdentifier(parameter.Name()) {
				parameterProperty := tx.factory.NewPropertyDeclaration(
					nil, /*modifiers*/
					parameter.Name().Clone(tx.factory),
					nil, /*questionOrExclamationToken*/
					nil, /*type*/
					nil, /*initializer*/
				)
				tx.emitContext.SetOriginal(parameterProperty, parameter.AsNode())
				newMembers = append(newMembers, parameterProperty)
			}
		}
		if len(newMembers) > 0 {
			newMembers = append(newMembers, members.Nodes...)
			members = tx.factory.NewNodeList(newMembers)
			members.Loc = node.Members.Loc
		}
	}

	updated := tx.factory.UpdateClassDeclaration(node, modifiers, name, nil /*typeParameters*/, heritageClauses, members)
	if exported {
		export := tx.createExportStatementForDeclaration(node.AsNode())
		if export != nil {
			return tx.factory.NewSyntaxList([]*ast.Node{updated, export})
		}
	}
	return updated
}

func (tx *RuntimeSyntaxTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	modifiers := tx.visitor.VisitModifiers(extractModifiers(tx.emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault))
	name := tx.visitor.VisitNode(node.Name())
	heritageClauses := tx.visitor.VisitNodes(node.HeritageClauses)
	members := tx.visitor.VisitNodes(node.Members)
	parameterProperties := tx.getParameterProperties(core.Find(node.Members.Nodes, ast.IsConstructorDeclaration))

	if len(parameterProperties) > 0 {
		var newMembers []*ast.ClassElement
		for _, parameter := range parameterProperties {
			if ast.IsIdentifier(parameter.Name()) {
				parameterProperty := tx.factory.NewPropertyDeclaration(
					nil, /*modifiers*/
					parameter.Name().Clone(tx.factory),
					nil, /*questionOrExclamationToken*/
					nil, /*type*/
					nil, /*initializer*/
				)
				tx.emitContext.SetOriginal(parameterProperty, parameter.AsNode())
				newMembers = append(newMembers, parameterProperty)
			}
		}
		if len(newMembers) > 0 {
			newMembers = append(newMembers, members.Nodes...)
			members = tx.factory.NewNodeList(newMembers)
			members.Loc = node.Members.Loc
		}
	}

	return tx.factory.UpdateClassExpression(node, modifiers, name, nil /*typeParameters*/, heritageClauses, members)
}

func (tx *RuntimeSyntaxTransformer) visitConstructorDeclaration(node *ast.ConstructorDeclaration) *ast.Node {
	modifiers := tx.visitor.VisitModifiers(node.Modifiers())
	parameters := tx.emitContext.VisitParameters(node.ParameterList(), tx.visitor)
	body := tx.visitConstructorBody(node.Body.AsBlock(), node.AsNode())
	return tx.factory.UpdateConstructorDeclaration(node, modifiers, nil /*typeParameters*/, parameters, nil /*returnType*/, body)
}

func (tx *RuntimeSyntaxTransformer) visitConstructorBody(body *ast.Block, constructor *ast.Node) *ast.Node {
	parameterProperties := tx.getParameterProperties(constructor)
	if len(parameterProperties) == 0 {
		return tx.emitContext.VisitFunctionBody(body.AsNode(), tx.visitor)
	}

	grandparentOfBody := tx.pushNode(body.AsNode())
	savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName := tx.pushScope(body.AsNode())

	tx.emitContext.StartVariableEnvironment()
	prologue, rest := tx.emitContext.SplitStandardPrologue(body.Statements.Nodes)
	statements := slices.Clone(prologue)

	// Transform parameters into property assignments. Transforms this:
	//
	//  constructor (public x, public y) {
	//  }
	//
	// Into this:
	//
	//  constructor (x, y) {
	//      this.x = x;
	//      this.y = y;
	//  }
	//

	var parameterPropertyAssignments []*ast.Statement
	for _, parameter := range parameterProperties {
		if ast.IsIdentifier(parameter.Name()) {
			propertyName := parameter.Name().Clone(tx.factory)
			tx.emitContext.AddEmitFlags(propertyName, printer.EFNoComments|printer.EFNoSourceMap)

			localName := parameter.Name().Clone(tx.factory)
			tx.emitContext.AddEmitFlags(localName, printer.EFNoComments)

			parameterProperty := tx.factory.NewExpressionStatement(
				tx.factory.NewBinaryExpression(
					tx.factory.NewPropertyAccessExpression(
						tx.factory.NewKeywordExpression(ast.KindThisKeyword),
						nil, /*questionDotToken*/
						propertyName,
						ast.NodeFlagsNone,
					),
					tx.factory.NewToken(ast.KindEqualsToken),
					localName,
				),
			)
			tx.emitContext.SetOriginal(parameterProperty, parameter.AsNode())
			tx.emitContext.AddEmitFlags(parameterProperty, printer.EFStartOnNewLine)
			parameterPropertyAssignments = append(parameterPropertyAssignments, parameterProperty)
		}
	}

	var superPath []int
	if ast.IsClassLike(grandparentOfBody) && ast.GetExtendsHeritageClauseElement(grandparentOfBody) != nil {
		superPath = findSuperStatementIndexPath(rest, 0)
	}

	if len(superPath) > 0 {
		statements = append(statements, tx.transformConstructorBodyWorker(rest, superPath, parameterPropertyAssignments)...)
	} else {
		statements = append(statements, parameterPropertyAssignments...)
		statements = append(statements, core.FirstResult(tx.visitor.VisitSlice(rest))...)
	}

	statements = tx.emitContext.EndAndMergeVariableEnvironment(statements)
	statementList := tx.factory.NewNodeList(statements)
	statementList.Loc = body.Statements.Loc

	tx.popScope(savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName)
	tx.popNode(grandparentOfBody)
	updated := tx.factory.NewBlock(statementList /*multiline*/, true)
	tx.emitContext.SetOriginal(updated, body.AsNode())
	updated.Loc = body.Loc
	return updated
}

// finds a path to a statement containing a `super` call, descending through `try` blocks
func findSuperStatementIndexPath(statements []*ast.Statement, start int) []int {
	for i := start; i < len(statements); i++ {
		statement := statements[i]
		if getSuperCallFromStatement(statement) != nil {
			indices := make([]int, 1, 2)
			indices[0] = i
			return indices
		} else if ast.IsTryStatement(statement) {
			return slices.Insert(findSuperStatementIndexPath(statement.AsTryStatement().TryBlock.AsBlock().Statements.Nodes, 0), 0, i)
		}
	}
	return nil
}

func getSuperCallFromStatement(statement *ast.Statement) *ast.Node {
	if !ast.IsExpressionStatement(statement) {
		return nil
	}

	expression := ast.SkipParentheses(statement.Expression())
	if ast.IsSuperCall(expression) {
		return expression
	}
	return nil
}

func (tx *RuntimeSyntaxTransformer) transformConstructorBodyWorker(statementsIn []*ast.Statement, superPath []int, initializerStatements []*ast.Statement) []*ast.Statement {
	var statementsOut []*ast.Statement
	superStatementIndex := superPath[0]
	superStatement := statementsIn[superStatementIndex]

	// visit up to the statement containing `super`
	statementsOut = append(statementsOut, core.FirstResult(tx.visitor.VisitSlice(statementsIn[:superStatementIndex]))...)

	// if the statement containing `super` is a `try` statement, transform the body of the `try` block
	if ast.IsTryStatement(superStatement) {
		tryStatement := superStatement.AsTryStatement()
		tryBlock := tryStatement.TryBlock.AsBlock()

		// keep track of hierarchy as we descend
		grandparentOfTryStatement := tx.pushNode(tryStatement.AsNode())
		grandparentOfTryBlock := tx.pushNode(tryBlock.AsNode())
		savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName := tx.pushScope(tryBlock.AsNode())

		// visit the `try` block
		tryBlockStatements := tx.transformConstructorBodyWorker(
			tryBlock.Statements.Nodes,
			superPath[1:],
			initializerStatements,
		)

		// restore hierarchy as we ascend to the `try` statement
		tx.popScope(savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName)
		tx.popNode(grandparentOfTryBlock)

		tryBlockStatementList := tx.factory.NewNodeList(tryBlockStatements)
		tryBlockStatementList.Loc = tryBlock.Statements.Loc
		statementsOut = append(statementsOut, tx.factory.UpdateTryStatement(
			tryStatement,
			tx.factory.UpdateBlock(tryBlock, tryBlockStatementList),
			tx.visitor.VisitNode(tryStatement.CatchClause),
			tx.visitor.VisitNode(tryStatement.FinallyBlock),
		))

		// restore hierarchy as we ascend to the parent of the `try` statement
		tx.popNode(grandparentOfTryStatement)
	} else {
		// visit the statement containing `super`
		statementsOut = append(statementsOut, core.FirstResult(tx.visitor.VisitSlice(statementsIn[superStatementIndex:superStatementIndex+1]))...)

		// insert the initializer statements
		statementsOut = append(statementsOut, initializerStatements...)
	}

	// visit the statements after `super`
	statementsOut = append(statementsOut, core.FirstResult(tx.visitor.VisitSlice(statementsIn[superStatementIndex+1:]))...)
	return statementsOut
}

func (tx *RuntimeSyntaxTransformer) visitShorthandPropertyAssignment(node *ast.ShorthandPropertyAssignment) *ast.Node {
	name := node.Name()
	exportedOrImportedName := tx.visitExpressionIdentifier(name)
	if exportedOrImportedName != name {
		expression := exportedOrImportedName
		if node.ObjectAssignmentInitializer != nil {
			equalsToken := node.EqualsToken
			if equalsToken == nil {
				equalsToken = tx.factory.NewToken(ast.KindEqualsToken)
			}
			expression = tx.factory.NewBinaryExpression(
				expression,
				equalsToken,
				tx.visitor.VisitNode(node.ObjectAssignmentInitializer),
			)
		}

		updated := tx.factory.NewPropertyAssignment(nil /*modifiers*/, node.Name(), nil /*postfixToken*/, expression)
		updated.Loc = node.Loc
		tx.emitContext.SetOriginal(updated, node.AsNode())
		tx.emitContext.AssignCommentAndSourceMapRanges(updated, node.AsNode())
		return updated
	}
	return tx.factory.UpdateShorthandPropertyAssignment(node,
		nil, /*modifiers*/
		exportedOrImportedName,
		nil, /*postfixToken*/
		node.EqualsToken,
		tx.visitor.VisitNode(node.ObjectAssignmentInitializer),
	)
}

func (tx *RuntimeSyntaxTransformer) visitIdentifier(node *ast.IdentifierNode) *ast.Node {
	if isIdentifierReference(node, tx.parentNode) {
		return tx.visitExpressionIdentifier(node)
	}
	return node
}

func (tx *RuntimeSyntaxTransformer) visitExpressionIdentifier(node *ast.IdentifierNode) *ast.Node {
	if (tx.currentEnum != nil || tx.currentNamespace != nil) && !isGeneratedIdentifier(tx.emitContext, node) && !isLocalName(tx.emitContext, node) {
		location := tx.emitContext.MostOriginal(node.AsNode())
		if tx.resolver == nil {
			tx.resolver = binder.NewReferenceResolver(tx.compilerOptions, binder.ReferenceResolverHooks{})
		}
		container := tx.resolver.GetReferencedExportContainer(location, false /*prefixLocals*/)
		if container != nil && (ast.IsEnumDeclaration(container) || ast.IsModuleDeclaration(container)) && container.Contains(location) {
			containerName := tx.getNamespaceContainerName(container)

			memberName := node.Clone(tx.factory)
			tx.emitContext.SetEmitFlags(memberName, printer.EFNoComments|printer.EFNoSourceMap)

			expression := getNamespaceMemberName(tx.emitContext, containerName, memberName, nameOptions{allowSourceMaps: true})
			tx.emitContext.AssignCommentAndSourceMapRanges(expression, node.AsNode())
			return expression
		}
	}
	return node
}

func (tx *RuntimeSyntaxTransformer) createExportStatementForDeclaration(node *ast.Declaration) *ast.Statement {
	name := node.Name()
	if name == nil {
		return nil
	}

	localName := getLocalName(tx.emitContext, node, assignedNameOptions{})
	exportAssignmentSourceMapRange := node.Loc
	if node.Name() != nil {
		exportAssignmentSourceMapRange = exportAssignmentSourceMapRange.WithPos(name.Pos())
	}
	exportStatementSourceMapRange := node.Loc.WithPos(-1)
	return tx.createExportStatement(name, localName, exportAssignmentSourceMapRange, exportStatementSourceMapRange, node)
}

func (tx *RuntimeSyntaxTransformer) createExportAssignment(name *ast.IdentifierNode, expression *ast.Expression, exportAssignmentSourceMapRange core.TextRange, original *ast.Node) *ast.Expression {
	exportName := tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(tx.currentNamespace), name)
	exportAssignment := tx.factory.NewBinaryExpression(exportName, tx.factory.NewToken(ast.KindEqualsToken), expression)
	tx.emitContext.SetOriginal(exportAssignment, original)
	tx.emitContext.SetSourceMapRange(exportAssignment, exportAssignmentSourceMapRange)
	return exportAssignment
}

func (tx *RuntimeSyntaxTransformer) createExportStatement(name *ast.IdentifierNode, expression *ast.Expression, exportAssignmentSourceMapRange core.TextRange, exportStatementSourceMapRange core.TextRange, original *ast.Node) *ast.Statement {
	exportStatement := tx.factory.NewExpressionStatement(tx.createExportAssignment(name, expression, exportAssignmentSourceMapRange, original))
	tx.emitContext.SetOriginal(exportStatement, original)
	tx.emitContext.SetSourceMapRange(exportStatement, exportStatementSourceMapRange)
	return exportStatement
}

func (tx *RuntimeSyntaxTransformer) cacheEnumMemberValue(enum *ast.EnumDeclarationNode, memberName string, result evaluator.Result) {
	if tx.enumMemberCache == nil {
		tx.enumMemberCache = make(map[*ast.EnumDeclarationNode]map[string]evaluator.Result)
	}
	memberCache := tx.enumMemberCache[enum]
	if memberCache == nil {
		memberCache = make(map[string]evaluator.Result)
		tx.enumMemberCache[enum] = memberCache
	}
	memberCache[memberName] = result
}

func (tx *RuntimeSyntaxTransformer) isReferenceToEnum(reference *ast.IdentifierNode, enum *ast.EnumDeclarationNode) bool {
	if isGeneratedIdentifier(tx.emitContext, reference) {
		originalEnum := tx.emitContext.MostOriginal(enum)
		return tx.emitContext.GetNodeForGeneratedName(reference) == originalEnum
	}
	return reference.Text() == enum.Name().Text()
}

func (tx *RuntimeSyntaxTransformer) evaluateEntity(node *ast.Node, location *ast.Node) evaluator.Result {
	var result evaluator.Result
	if ast.IsEnumDeclaration(location) {
		memberCache := tx.enumMemberCache[location]
		if memberCache != nil {
			switch {
			case ast.IsIdentifier(node):
				result = memberCache[node.Text()]
			case ast.IsPropertyAccessExpression(node):
				access := node.AsPropertyAccessExpression()
				expression := access.Expression
				if ast.IsIdentifier(expression) && tx.isReferenceToEnum(expression, location) {
					result = memberCache[access.Name().Text()]
				}
			case ast.IsElementAccessExpression(node):
				access := node.AsElementAccessExpression()
				expression := access.Expression
				if ast.IsIdentifier(expression) && tx.isReferenceToEnum(expression, location) && ast.IsStringLiteralLike(access.ArgumentExpression) {
					result = memberCache[access.ArgumentExpression.Text()]
				}
			}
		}
	}
	return result
}

func getInnermostModuleDeclarationFromDottedModule(moduleDeclaration *ast.ModuleDeclaration) *ast.ModuleDeclaration {
	for moduleDeclaration.Body != nil && moduleDeclaration.Body.Kind == ast.KindModuleDeclaration {
		moduleDeclaration = moduleDeclaration.Body.AsModuleDeclaration()
	}
	return moduleDeclaration
}

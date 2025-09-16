package tstransforms

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
	"github.com/microsoft/typescript-go/internal/transformers"
)

// Transforms TypeScript-specific runtime syntax into JavaScript-compatible syntax.
type RuntimeSyntaxTransformer struct {
	transformers.Transformer
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

func NewRuntimeSyntaxTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opt.CompilerOptions
	emitContext := opt.Context
	tx := &RuntimeSyntaxTransformer{compilerOptions: compilerOptions, resolver: opt.Resolver}
	return tx.NewTransformer(tx.visit, emitContext)
}

// Pushes a new child node onto the ancestor tracking stack, returning the grandparent node to be restored later via `popNode`.
func (tx *RuntimeSyntaxTransformer) pushNode(node *ast.Node) (grandparentNode *ast.Node) {
	grandparentNode = tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = node
	return grandparentNode
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
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindVariableStatement:
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
		node = tx.Visitor().VisitEachChild(node)
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
		return tx.Factory().NewIdentifier("")
	case ast.KindComputedPropertyName:
		n := name.AsComputedPropertyName()
		// enums don't support computed properties so we always generate the 'expression' part of the name as-is.
		return tx.Visitor().VisitNode(n.Expression)
	case ast.KindIdentifier:
		return tx.Factory().NewStringLiteralFromNode(name)
	case ast.KindStringLiteral:
		return tx.Factory().NewStringLiteral(name.AsStringLiteral().Text)
	case ast.KindNumericLiteral:
		return tx.Factory().NewNumericLiteral(name.AsNumericLiteral().Text)
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
	prop := tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(enum.AsNode()), member.Name().Clone(tx.Factory()))
	tx.EmitContext().AddEmitFlags(prop, printer.EFNoComments|printer.EFNoNestedComments|printer.EFNoSourceMap|printer.EFNoNestedSourceMaps)
	return prop
}

// Gets an expression like `E["A"]` that references an enum member.
func (tx *RuntimeSyntaxTransformer) getEnumQualifiedElement(enum *ast.EnumDeclaration, member *ast.EnumMember) *ast.Expression {
	prop := tx.getNamespaceQualifiedElement(tx.getNamespaceContainerName(enum.AsNode()), tx.getExpressionForPropertyName(member))
	tx.EmitContext().AddEmitFlags(prop, printer.EFNoComments|printer.EFNoNestedComments|printer.EFNoSourceMap|printer.EFNoNestedSourceMaps)
	return prop
}

// Gets an expression used to refer to a namespace or enum from within the body of its declaration.
func (tx *RuntimeSyntaxTransformer) getNamespaceContainerName(node *ast.Node) *ast.IdentifierNode {
	return tx.Factory().NewGeneratedNameForNode(node)
}

// Gets an expression used to refer to an export of a namespace or a member of an enum by property name.
func (tx *RuntimeSyntaxTransformer) getNamespaceQualifiedProperty(ns *ast.IdentifierNode, name *ast.IdentifierNode) *ast.Expression {
	return tx.Factory().GetNamespaceMemberName(ns, name, printer.NameOptions{AllowSourceMaps: true})
}

// Gets an expression used to refer to an export of a namespace or a member of an enum by indexed access.
func (tx *RuntimeSyntaxTransformer) getNamespaceQualifiedElement(ns *ast.IdentifierNode, expression *ast.Expression) *ast.Expression {
	qualifiedName := tx.EmitContext().Factory.NewElementAccessExpression(ns, nil /*questionDotToken*/, expression, ast.NodeFlagsNone)
	tx.EmitContext().AssignCommentAndSourceMapRanges(qualifiedName, expression)
	return qualifiedName
}

// Gets an expression used within the provided node's container for any exported references.
func (tx *RuntimeSyntaxTransformer) getExportQualifiedReferenceToDeclaration(node *ast.Declaration) *ast.Expression {
	exportName := tx.Factory().GetDeclarationNameEx(node.AsNode(), printer.NameOptions{AllowSourceMaps: true})
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
		statements = append(statements, tx.Factory().NewExportDeclaration(
			nil,   /*modifiers*/
			false, /*isTypeOnly*/
			tx.Factory().NewNamedExports(tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewExportSpecifier(
					false, /*isTypeOnly*/
					nil,   /*propertyName*/
					node.Name().Clone(tx.Factory()),
				),
			})),
			nil, /*moduleSpecifier*/
			nil, /*attributes*/
		))
	}

	// var name;
	name := tx.Factory().GetLocalNameEx(node, printer.AssignedNameOptions{AllowSourceMaps: true})
	varDecl := tx.Factory().NewVariableDeclaration(name, nil, nil, nil)
	varFlags := core.IfElse(tx.currentScope == tx.currentSourceFile, ast.NodeFlagsNone, ast.NodeFlagsLet)
	varDecls := tx.Factory().NewVariableDeclarationList(varFlags, tx.Factory().NewNodeList([]*ast.Node{varDecl}))
	varStatement := tx.Factory().NewVariableStatement(nil /*modifiers*/, varDecls)

	tx.EmitContext().SetOriginal(varDecl, node)
	// !!! synthetic comments
	tx.EmitContext().SetOriginal(varStatement, node)

	// Adjust the source map emit to match the old emitter.
	tx.EmitContext().SetSourceMapRange(varDecls, node.Loc)

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
	tx.EmitContext().SetCommentRange(varStatement, node.Loc)
	tx.EmitContext().AddEmitFlags(varStatement, printer.EFNoTrailingComments)
	statements = append(statements, varStatement)

	return statements, true
}

func (tx *RuntimeSyntaxTransformer) visitEnumDeclaration(node *ast.EnumDeclaration) *ast.Node {
	if !tx.shouldEmitEnumDeclaration(node) {
		return tx.EmitContext().NewNotEmittedStatement(node.AsNode())
	}

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
	enumArg := tx.Factory().NewLogicalORExpression(
		tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
		tx.Factory().NewAssignmentExpression(
			tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
			tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{}), false),
		),
	)

	if tx.isExportOfNamespace(node.AsNode()) {
		// `localName` is the expression used within this node's containing scope for any local references.
		localName := tx.Factory().GetLocalNameEx(node.AsNode(), printer.AssignedNameOptions{AllowSourceMaps: true})

		//  x = (exports.x || (exports.x = {}))
		enumArg = tx.Factory().NewAssignmentExpression(localName, enumArg)
	}

	// (function (name) { ... })(name || (name = {}))
	enumParamName := tx.Factory().NewGeneratedNameForNode(node.AsNode())
	tx.EmitContext().SetSourceMapRange(enumParamName, node.Name().Loc)

	enumParam := tx.Factory().NewParameterDeclaration(nil, nil, enumParamName, nil, nil, nil)
	enumBody := tx.transformEnumBody(node)
	enumFunc := tx.Factory().NewFunctionExpression(nil, nil, nil, nil, tx.Factory().NewNodeList([]*ast.Node{enumParam}), nil, nil, enumBody)
	enumCall := tx.Factory().NewCallExpression(tx.Factory().NewParenthesizedExpression(enumFunc), nil, nil, tx.Factory().NewNodeList([]*ast.Node{enumArg}), ast.NodeFlagsNone)
	enumStatement := tx.Factory().NewExpressionStatement(enumCall)
	tx.EmitContext().SetOriginal(enumStatement, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(enumStatement, node.AsNode())
	tx.EmitContext().AddEmitFlags(enumStatement, emitFlags)
	return tx.Factory().NewSyntaxList(append(statements, enumStatement))
}

// Transforms the body of an enum declaration.
func (tx *RuntimeSyntaxTransformer) transformEnumBody(node *ast.EnumDeclaration) *ast.BlockNode {
	savedCurrentEnum := tx.currentEnum
	tx.currentEnum = node.AsNode()

	// visit the children of `node` in advance to capture any references to enum members
	node = tx.Visitor().VisitEachChild(node.AsNode()).AsEnumDeclaration()

	statements := []*ast.Statement{}
	if len(node.Members.Nodes) > 0 {
		tx.EmitContext().StartVariableEnvironment()

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

		statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)
	}

	statementList := tx.Factory().NewNodeList(statements)
	statementList.Loc = node.Members.Loc

	tx.currentEnum = savedCurrentEnum
	return tx.Factory().NewBlock(statementList, true /*multiline*/)
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
			expression = tx.Factory().NewPrefixUnaryExpression(ast.KindPlusPlusToken, *autoVar)
			useExplicitReverseMapping = true
		} else {
			// If the preceding auto value is a finite number, we can emit a numeric literal for the member initializer:
			//  E[E["A"] = 0] = "A";
			//             ^
			// If not, we cannot emit a valid numeric literal for the member initializer and emit `void 0` instead:
			//  E["A"] = void 0;
			//           ^^^^^^
			expression = constantExpression(*autoValue, tx.Factory())
			if expression != nil {
				useExplicitReverseMapping = true
				if len(memberName) > 0 {
					tx.cacheEnumMemberValue(enum.AsNode(), memberName, evaluator.NewResult(*autoValue, false, false, false))
				}
			} else {
				expression = tx.Factory().NewVoidZeroExpression()
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
			expression = core.Coalesce(constantExpression(value, tx.Factory()), expression) // TODO: preserve original expression after Strada migration
			tx.cacheEnumMemberValue(enum.AsNode(), memberName, result)
		case string:
			hasStringInitializer = true
			*autoValue = jsnum.NaN()
			expression = core.Coalesce(constantExpression(value, tx.Factory()), expression) // TODO: preserve original expression after Strada migration
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
				*autoVar = tx.Factory().NewUniqueNameEx("auto", printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic})
				tx.EmitContext().AddVariableDeclaration(*autoVar)
			}
			expression = tx.Factory().NewAssignmentExpression(*autoVar, expression)
		}
	}

	// Define the enum member property:
	//  E[E["A"] = ++auto] = "A";
	//    ^^^^^^^^--_____
	expression = tx.Factory().NewAssignmentExpression(
		tx.getEnumQualifiedElement(enum, member),
		expression,
	)

	// If this is syntactically a numeric literal initializer, or is auto numbered, then we unconditionally define the
	// reverse mapping for the enum member.
	if useExplicitReverseMapping {
		//  E[E["A"] = A = ++auto] = "A";
		//  ^^-------------------^^^^^^^
		expression = tx.Factory().NewAssignmentExpression(
			tx.Factory().NewElementAccessExpression(
				tx.getNamespaceContainerName(enum.AsNode()),
				nil, /*questionDotToken*/
				expression,
				ast.NodeFlagsNone,
			),
			tx.getExpressionForPropertyName(member),
		)
	}

	memberStatement := tx.Factory().NewExpressionStatement(expression)
	tx.EmitContext().AssignCommentAndSourceMapRanges(expression, member.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(memberStatement, member.AsNode())
	statements = append(statements, memberStatement)

	// If this is not auto numbered and is not syntactically a string or numeric literal initializer, then we
	// conditionally define the reverse mapping for the enum member.
	if useConditionalReverseMapping {
		//  E["A"] = x;
		//  if (typeof E.A !== "string") E.A = "A";
		//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

		ifStatement := tx.Factory().NewIfStatement(
			tx.Factory().NewStrictInequalityExpression(
				tx.Factory().NewTypeOfExpression(tx.getEnumQualifiedReference(enum, member)),
				tx.Factory().NewStringLiteral("string"),
			),
			tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(
					tx.Factory().NewElementAccessExpression(
						tx.getNamespaceContainerName(enum.AsNode()),
						nil, /*questionDotToken*/
						tx.getEnumQualifiedReference(enum, member),
						ast.NodeFlagsNone,
					),
					tx.getExpressionForPropertyName(member),
				),
			),
			nil,
		)

		tx.EmitContext().AddEmitFlags(ifStatement, printer.EFSingleLine)
		tx.EmitContext().AssignSourceMapRange(ifStatement, member.Initializer)
		statements = append(statements, ifStatement)
	}

	tx.currentNode = tx.parentNode
	tx.parentNode = savedParent
	return statements
}

func (tx *RuntimeSyntaxTransformer) visitModuleDeclaration(node *ast.ModuleDeclaration) *ast.Node {
	if !tx.shouldEmitModuleDeclaration(node) {
		return tx.EmitContext().NewNotEmittedStatement(node.AsNode())
	}

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
	moduleArg := tx.Factory().NewLogicalORExpression(
		tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
		tx.Factory().NewAssignmentExpression(
			tx.getExportQualifiedReferenceToDeclaration(node.AsNode()),
			tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{}), false),
		),
	)

	if tx.isExportOfNamespace(node.AsNode()) {
		// `localName` is the expression used within this node's containing scope for any local references.
		localName := tx.Factory().GetLocalNameEx(node.AsNode(), printer.AssignedNameOptions{AllowSourceMaps: true})

		//  x = (exports.x || (exports.x = {}))
		moduleArg = tx.Factory().NewAssignmentExpression(localName, moduleArg)
	}

	// (function (name) { ... })(name || (name = {}))
	moduleParamName := tx.Factory().NewGeneratedNameForNode(node.AsNode())
	tx.EmitContext().SetSourceMapRange(moduleParamName, node.Name().Loc)

	moduleParam := tx.Factory().NewParameterDeclaration(nil, nil, moduleParamName, nil, nil, nil)
	moduleBody := tx.transformModuleBody(node, tx.getNamespaceContainerName(node.AsNode()))
	moduleFunc := tx.Factory().NewFunctionExpression(nil, nil, nil, nil, tx.Factory().NewNodeList([]*ast.Node{moduleParam}), nil, nil, moduleBody)
	moduleCall := tx.Factory().NewCallExpression(tx.Factory().NewParenthesizedExpression(moduleFunc), nil, nil, tx.Factory().NewNodeList([]*ast.Node{moduleArg}), ast.NodeFlagsNone)
	moduleStatement := tx.Factory().NewExpressionStatement(moduleCall)
	tx.EmitContext().SetOriginal(moduleStatement, node.AsNode())
	tx.EmitContext().AssignCommentAndSourceMapRanges(moduleStatement, node.AsNode())
	tx.EmitContext().AddEmitFlags(moduleStatement, emitFlags)
	return tx.Factory().NewSyntaxList(append(statements, moduleStatement))
}

func (tx *RuntimeSyntaxTransformer) transformModuleBody(node *ast.ModuleDeclaration, namespaceLocalName *ast.IdentifierNode) *ast.BlockNode {
	savedCurrentNamespace := tx.currentNamespace
	savedCurrentScope := tx.currentScope
	savedCurrentScopeFirstDeclarationsOfName := tx.currentScopeFirstDeclarationsOfName

	tx.currentNamespace = node.AsNode()
	tx.currentScopeFirstDeclarationsOfName = nil

	var statements []*ast.Statement
	tx.EmitContext().StartVariableEnvironment()

	var statementsLocation core.TextRange
	var blockLocation core.TextRange
	if node.Body != nil {
		if node.Body.Kind == ast.KindModuleBlock {
			// visit the children of `node` in advance to capture any references to namespace members
			node = tx.Visitor().VisitEachChild(node.AsNode()).AsModuleDeclaration()
			body := node.Body.AsModuleBlock()
			statements = body.Statements.Nodes
			statementsLocation = body.Statements.Loc
			blockLocation = body.Loc
		} else { // node.Body.Kind == ast.KindModuleDeclaration
			tx.currentScope = node.AsNode()
			statements, _ = tx.Visitor().VisitSlice([]*ast.Node{node.Body})
			moduleBlock := getInnermostModuleDeclarationFromDottedModule(node).Body.AsModuleBlock()
			statementsLocation = moduleBlock.Statements.Loc.WithPos(-1)
		}
	}

	tx.currentNamespace = savedCurrentNamespace
	tx.currentScope = savedCurrentScope
	tx.currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName

	statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)
	statementList := tx.Factory().NewNodeList(statements)
	statementList.Loc = statementsLocation
	block := tx.Factory().NewBlock(statementList, true /*multiline*/)
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
		tx.EmitContext().AddEmitFlags(block, printer.EFNoComments)
	}
	return block
}

func (tx *RuntimeSyntaxTransformer) visitImportEqualsDeclaration(node *ast.ImportEqualsDeclaration) *ast.Node {
	if node.ModuleReference.Kind == ast.KindExternalModuleReference {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	moduleReference := convertEntityNameToExpression(tx.EmitContext(), node.ModuleReference)
	tx.EmitContext().SetEmitFlags(moduleReference, printer.EFNoComments|printer.EFNoNestedSourceMaps)
	if !tx.isExportOfNamespace(node.AsNode()) {
		//  export var ${name} = ${moduleReference};
		//  var ${name} = ${moduleReference};
		varDecl := tx.Factory().NewVariableDeclaration(node.Name(), nil /*exclamationToken*/, nil /*type*/, moduleReference)
		tx.EmitContext().SetOriginal(varDecl, node.AsNode())
		varList := tx.Factory().NewVariableDeclarationList(ast.NodeFlagsNone, tx.Factory().NewNodeList([]*ast.Node{varDecl}))
		varModifiers := transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ast.ModifierFlagsExport)
		varStatement := tx.Factory().NewVariableStatement(varModifiers, varList)
		tx.EmitContext().SetOriginal(varStatement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(varStatement, node.AsNode())
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
			expression := transformers.ConvertVariableDeclarationToAssignmentExpression(tx.EmitContext(), declaration.AsVariableDeclaration())
			if expression != nil {
				expressions = append(expressions, expression)
			}
		}
		if len(expressions) == 0 {
			return nil
		}
		expression := tx.Factory().InlineExpressions(expressions)
		statement := tx.Factory().NewExpressionStatement(expression)
		tx.EmitContext().SetOriginal(statement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(statement, node.AsNode())

		// re-visit as the new node
		savedCurrent := tx.currentNode
		tx.currentNode = statement
		statement = tx.Visitor().VisitEachChild(statement)
		tx.currentNode = savedCurrent
		return statement
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *RuntimeSyntaxTransformer) visitFunctionDeclaration(node *ast.FunctionDeclaration) *ast.Node {
	if tx.isExportOfNamespace(node.AsNode()) {
		updated := tx.Factory().UpdateFunctionDeclaration(
			node,
			tx.Visitor().VisitModifiers(transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault)),
			node.AsteriskToken,
			tx.Visitor().VisitNode(node.Name()),
			nil, /*typeParameters*/
			tx.Visitor().VisitNodes(node.Parameters),
			nil, /*returnType*/
			nil, /*fullSignature*/
			tx.Visitor().VisitNode(node.Body),
		)
		export := tx.createExportStatementForDeclaration(node.AsNode())
		if export != nil {
			return tx.Factory().NewSyntaxList([]*ast.Node{updated, export})
		}
		return updated
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
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
		modifiers = tx.Visitor().VisitModifiers(transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault))
	} else {
		modifiers = tx.Visitor().VisitModifiers(node.Modifiers())
	}

	name := tx.Visitor().VisitNode(node.Name())
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	members := tx.Visitor().VisitNodes(node.Members)
	parameterProperties := tx.getParameterProperties(core.Find(node.Members.Nodes, ast.IsConstructorDeclaration))

	if len(parameterProperties) > 0 {
		var newMembers []*ast.ClassElement
		for _, parameter := range parameterProperties {
			if ast.IsIdentifier(parameter.Name()) {
				parameterProperty := tx.Factory().NewPropertyDeclaration(
					nil, /*modifiers*/
					parameter.Name().Clone(tx.Factory()),
					nil, /*questionOrExclamationToken*/
					nil, /*type*/
					nil, /*initializer*/
				)
				tx.EmitContext().SetOriginal(parameterProperty, parameter.AsNode())
				newMembers = append(newMembers, parameterProperty)
			}
		}
		if len(newMembers) > 0 {
			newMembers = append(newMembers, members.Nodes...)
			members = tx.Factory().NewNodeList(newMembers)
			members.Loc = node.Members.Loc
		}
	}

	updated := tx.Factory().UpdateClassDeclaration(node, modifiers, name, nil /*typeParameters*/, heritageClauses, members)
	if exported {
		export := tx.createExportStatementForDeclaration(node.AsNode())
		if export != nil {
			return tx.Factory().NewSyntaxList([]*ast.Node{updated, export})
		}
	}
	return updated
}

func (tx *RuntimeSyntaxTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	modifiers := tx.Visitor().VisitModifiers(transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExportDefault))
	name := tx.Visitor().VisitNode(node.Name())
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	members := tx.Visitor().VisitNodes(node.Members)
	parameterProperties := tx.getParameterProperties(core.Find(node.Members.Nodes, ast.IsConstructorDeclaration))

	if len(parameterProperties) > 0 {
		var newMembers []*ast.ClassElement
		for _, parameter := range parameterProperties {
			if ast.IsIdentifier(parameter.Name()) {
				parameterProperty := tx.Factory().NewPropertyDeclaration(
					nil, /*modifiers*/
					parameter.Name().Clone(tx.Factory()),
					nil, /*questionOrExclamationToken*/
					nil, /*type*/
					nil, /*initializer*/
				)
				tx.EmitContext().SetOriginal(parameterProperty, parameter.AsNode())
				newMembers = append(newMembers, parameterProperty)
			}
		}
		if len(newMembers) > 0 {
			newMembers = append(newMembers, members.Nodes...)
			members = tx.Factory().NewNodeList(newMembers)
			members.Loc = node.Members.Loc
		}
	}

	return tx.Factory().UpdateClassExpression(node, modifiers, name, nil /*typeParameters*/, heritageClauses, members)
}

func (tx *RuntimeSyntaxTransformer) visitConstructorDeclaration(node *ast.ConstructorDeclaration) *ast.Node {
	modifiers := tx.Visitor().VisitModifiers(node.Modifiers())
	parameters := tx.EmitContext().VisitParameters(node.ParameterList(), tx.Visitor())
	body := tx.visitConstructorBody(node.Body.AsBlock(), node.AsNode())
	return tx.Factory().UpdateConstructorDeclaration(node, modifiers, nil /*typeParameters*/, parameters, nil /*returnType*/, nil /*fullSignature*/, body)
}

func (tx *RuntimeSyntaxTransformer) visitConstructorBody(body *ast.Block, constructor *ast.Node) *ast.Node {
	parameterProperties := tx.getParameterProperties(constructor)
	if len(parameterProperties) == 0 {
		return tx.EmitContext().VisitFunctionBody(body.AsNode(), tx.Visitor())
	}

	grandparentOfBody := tx.pushNode(body.AsNode())
	savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName := tx.pushScope(body.AsNode())

	tx.EmitContext().StartVariableEnvironment()
	prologue, rest := tx.Factory().SplitStandardPrologue(body.Statements.Nodes)
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
			propertyName := parameter.Name().Clone(tx.Factory())
			tx.EmitContext().AddEmitFlags(propertyName, printer.EFNoComments|printer.EFNoSourceMap)

			localName := parameter.Name().Clone(tx.Factory())
			tx.EmitContext().AddEmitFlags(localName, printer.EFNoComments)

			parameterProperty := tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(
					tx.Factory().NewPropertyAccessExpression(
						tx.Factory().NewThisExpression(),
						nil, /*questionDotToken*/
						propertyName,
						ast.NodeFlagsNone,
					),
					localName,
				),
			)
			tx.EmitContext().SetOriginal(parameterProperty, parameter.AsNode())
			tx.EmitContext().AddEmitFlags(parameterProperty, printer.EFStartOnNewLine)
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
		statements = append(statements, core.FirstResult(tx.Visitor().VisitSlice(rest))...)
	}

	statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)
	statementList := tx.Factory().NewNodeList(statements)
	statementList.Loc = body.Statements.Loc

	tx.popScope(savedCurrentScope, savedCurrentScopeFirstDeclarationsOfName)
	tx.popNode(grandparentOfBody)
	updated := tx.Factory().NewBlock(statementList /*multiline*/, true)
	tx.EmitContext().SetOriginal(updated, body.AsNode())
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
	statementsOut = append(statementsOut, core.FirstResult(tx.Visitor().VisitSlice(statementsIn[:superStatementIndex]))...)

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

		tryBlockStatementList := tx.Factory().NewNodeList(tryBlockStatements)
		tryBlockStatementList.Loc = tryBlock.Statements.Loc
		statementsOut = append(statementsOut, tx.Factory().UpdateTryStatement(
			tryStatement,
			tx.Factory().UpdateBlock(tryBlock, tryBlockStatementList),
			tx.Visitor().VisitNode(tryStatement.CatchClause),
			tx.Visitor().VisitNode(tryStatement.FinallyBlock),
		))

		// restore hierarchy as we ascend to the parent of the `try` statement
		tx.popNode(grandparentOfTryStatement)
	} else {
		// visit the statement containing `super`
		statementsOut = append(statementsOut, core.FirstResult(tx.Visitor().VisitSlice(statementsIn[superStatementIndex:superStatementIndex+1]))...)

		// insert the initializer statements
		statementsOut = append(statementsOut, initializerStatements...)
	}

	// visit the statements after `super`
	statementsOut = append(statementsOut, core.FirstResult(tx.Visitor().VisitSlice(statementsIn[superStatementIndex+1:]))...)
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
				equalsToken = tx.Factory().NewToken(ast.KindEqualsToken)
			}
			expression = tx.Factory().NewBinaryExpression(
				nil, /*modifiers*/
				expression,
				nil, /*typeNode*/
				equalsToken,
				tx.Visitor().VisitNode(node.ObjectAssignmentInitializer),
			)
		}

		updated := tx.Factory().NewPropertyAssignment(nil /*modifiers*/, node.Name(), nil /*postfixToken*/, nil /*typeNode*/, expression)
		updated.Loc = node.Loc
		tx.EmitContext().SetOriginal(updated, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(updated, node.AsNode())
		return updated
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

func (tx *RuntimeSyntaxTransformer) visitIdentifier(node *ast.IdentifierNode) *ast.Node {
	if transformers.IsIdentifierReference(node, tx.parentNode) {
		return tx.visitExpressionIdentifier(node)
	}
	return node
}

func (tx *RuntimeSyntaxTransformer) visitExpressionIdentifier(node *ast.IdentifierNode) *ast.Node {
	if (tx.currentEnum != nil || tx.currentNamespace != nil) && !transformers.IsGeneratedIdentifier(tx.EmitContext(), node) && !transformers.IsLocalName(tx.EmitContext(), node) {
		location := tx.EmitContext().MostOriginal(node.AsNode())
		if tx.resolver == nil {
			tx.resolver = binder.NewReferenceResolver(tx.compilerOptions, binder.ReferenceResolverHooks{})
		}
		container := tx.resolver.GetReferencedExportContainer(location, false /*prefixLocals*/)
		if container != nil && (ast.IsEnumDeclaration(container) || ast.IsModuleDeclaration(container)) && container.Contains(location) {
			containerName := tx.getNamespaceContainerName(container)

			memberName := node.Clone(tx.Factory())
			tx.EmitContext().SetEmitFlags(memberName, printer.EFNoComments|printer.EFNoSourceMap)

			expression := tx.Factory().GetNamespaceMemberName(containerName, memberName, printer.NameOptions{AllowSourceMaps: true})
			tx.EmitContext().AssignCommentAndSourceMapRanges(expression, node.AsNode())
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

	localName := tx.Factory().GetLocalName(node)
	exportAssignmentSourceMapRange := node.Loc
	if node.Name() != nil {
		exportAssignmentSourceMapRange = exportAssignmentSourceMapRange.WithPos(name.Pos())
	}
	exportStatementSourceMapRange := node.Loc.WithPos(-1)
	return tx.createExportStatement(name, localName, exportAssignmentSourceMapRange, exportStatementSourceMapRange, node)
}

func (tx *RuntimeSyntaxTransformer) createExportAssignment(name *ast.IdentifierNode, expression *ast.Expression, exportAssignmentSourceMapRange core.TextRange, original *ast.Node) *ast.Expression {
	exportName := tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(tx.currentNamespace), name)
	exportAssignment := tx.Factory().NewAssignmentExpression(exportName, expression)
	tx.EmitContext().SetOriginal(exportAssignment, original)
	tx.EmitContext().SetSourceMapRange(exportAssignment, exportAssignmentSourceMapRange)
	return exportAssignment
}

func (tx *RuntimeSyntaxTransformer) createExportStatement(name *ast.IdentifierNode, expression *ast.Expression, exportAssignmentSourceMapRange core.TextRange, exportStatementSourceMapRange core.TextRange, original *ast.Node) *ast.Statement {
	exportStatement := tx.Factory().NewExpressionStatement(tx.createExportAssignment(name, expression, exportAssignmentSourceMapRange, original))
	tx.EmitContext().SetOriginal(exportStatement, original)
	tx.EmitContext().SetSourceMapRange(exportStatement, exportStatementSourceMapRange)
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
	if transformers.IsGeneratedIdentifier(tx.EmitContext(), reference) {
		originalEnum := tx.EmitContext().MostOriginal(enum)
		return tx.EmitContext().GetNodeForGeneratedName(reference) == originalEnum
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

func (tx *RuntimeSyntaxTransformer) shouldEmitEnumDeclaration(node *ast.EnumDeclaration) bool {
	return !ast.IsEnumConst(node.AsNode()) || tx.compilerOptions.ShouldPreserveConstEnums()
}

func (tx *RuntimeSyntaxTransformer) shouldEmitModuleDeclaration(node *ast.ModuleDeclaration) bool {
	pn := tx.EmitContext().ParseNode(node.AsNode())
	if pn == nil {
		// If we can't find a parse tree node, assume the node is instantiated.
		return true
	}
	return isInstantiatedModule(node.AsNode(), tx.compilerOptions.ShouldPreserveConstEnums())
}

func getInnermostModuleDeclarationFromDottedModule(moduleDeclaration *ast.ModuleDeclaration) *ast.ModuleDeclaration {
	for moduleDeclaration.Body != nil && moduleDeclaration.Body.Kind == ast.KindModuleDeclaration {
		moduleDeclaration = moduleDeclaration.Body.AsModuleDeclaration()
	}
	return moduleDeclaration
}

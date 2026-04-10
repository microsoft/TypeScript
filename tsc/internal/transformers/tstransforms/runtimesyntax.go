package tstransforms

// !!! SourceMaps and Comments need to be validated

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
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
	emitResolver                        printer.EmitResolver
}

func NewRuntimeSyntaxTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opt.CompilerOptions
	emitContext := opt.Context
	tx := &RuntimeSyntaxTransformer{compilerOptions: compilerOptions, resolver: opt.Resolver, emitResolver: opt.EmitResolver}
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
	case ast.KindExportDeclaration, ast.KindImportDeclaration, ast.KindImportClause:
		if tx.currentNamespace != nil && tx.currentScope != nil && tx.currentScope.Kind != ast.KindBlock {
			// do not emit ES6 imports and exports since they are illegal inside a namespace
			node = nil
		} else {
			node = tx.Visitor().VisitEachChild(node)
		}
	case ast.KindImportEqualsDeclaration:
		if tx.currentNamespace != nil && tx.currentScope != nil && tx.currentScope.Kind != ast.KindBlock && node.AsImportEqualsDeclaration().ModuleReference.Kind == ast.KindExternalModuleReference {
			// do not emit ES6 imports and exports since they are illegal inside a namespace
			node = nil
		} else if tx.currentNamespace != nil && tx.currentScope != nil && tx.currentScope.Kind == ast.KindBlock && node.AsImportEqualsDeclaration().ModuleReference.Kind != ast.KindExternalModuleReference {
			// inside a block within a namespace, elide internal import aliases
			node = nil
		} else {
			node = tx.visitImportEqualsDeclaration(node.AsImportEqualsDeclaration())
		}
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
		for _, element := range node.Elements() {
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
	return tx.currentNamespace != nil && (tx.currentScope == nil || tx.currentScope.Kind != ast.KindBlock) && node.ModifierFlags()&ast.ModifierFlagsExport != 0
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
	case ast.KindStringLiteral: // !!! propagate token flags (will produce new diffs)
		return tx.Factory().NewStringLiteral(name.Text(), ast.TokenFlagsNone)
	case ast.KindNumericLiteral:
		return tx.Factory().NewNumericLiteral(name.Text(), ast.TokenFlagsNone)
	default:
		return name
	}
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
	if tx.isExportOfNamespace(node.AsNode()) {
		return tx.Factory().GetExternalModuleOrNamespaceExportName(tx.getNamespaceContainerName(tx.currentNamespace), node, false /*allowComments*/, true /*allowSourceMaps*/)
	}
	return tx.Factory().GetDeclarationNameEx(node.AsNode(), printer.NameOptions{AllowSourceMaps: true})
}

func (tx *RuntimeSyntaxTransformer) addVarForDeclaration(statements []*ast.Statement, node *ast.Declaration) ([]*ast.Statement, bool) {
	tx.recordDeclarationInScope(node)
	if !tx.isFirstDeclarationInScope(node) {
		return statements, false
	}

	// var name;
	name := tx.Factory().GetLocalNameEx(node, printer.AssignedNameOptions{AllowSourceMaps: true})
	varDecl := tx.Factory().NewVariableDeclaration(name, nil, nil, nil)
	varFlags := core.IfElse(tx.currentScope == tx.currentSourceFile, ast.NodeFlagsNone, ast.NodeFlagsLet)
	varDecls := tx.Factory().NewVariableDeclarationList(tx.Factory().NewNodeList([]*ast.Node{varDecl}), varFlags)
	// Replicate modifierVisitor: strip decorators, TypeScript modifiers, and export when in namespace.
	modifierMask := ^(ast.ModifierFlagsTypeScriptModifier | ast.ModifierFlagsDecorator)
	if tx.currentNamespace != nil {
		modifierMask &^= ast.ModifierFlagsExport
	}
	modifiers := transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), modifierMask)
	varStatement := tx.Factory().NewVariableStatement(modifiers, varDecls)

	tx.EmitContext().SetOriginal(varDecl, node)
	// !!! synthetic comments
	tx.EmitContext().SetOriginal(varStatement, node)

	// Adjust the source map emit to match the old emitter.
	if ast.IsEnumDeclaration(node) {
		tx.EmitContext().SetSourceMapRange(varDecls, node.Loc)
	} else {
		tx.EmitContext().SetSourceMapRange(varStatement, node.Loc)
	}

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
	for i := range len(node.Members.Nodes) {
		//  E[E["A"] = 0] = "A";
		statements = tx.transformEnumMember(
			statements,
			node,
			i,
		)
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
) []*ast.Statement {
	memberNode := enum.Members.Nodes[index]
	member := memberNode.AsEnumMember()

	savedParent := tx.parentNode
	tx.parentNode = tx.currentNode
	tx.currentNode = memberNode

	//  E[E["A"] = x] = "A";
	//             ^
	expression := member.Initializer // NOTE: already visited

	var useExplicitReverseMapping bool

	parseNode := tx.EmitContext().ParseNode(memberNode)
	result := tx.emitResolver.GetEnumMemberValue(parseNode)
	switch value := result.Value.(type) {
	case jsnum.Number:
		expression = core.Coalesce(constantExpression(value, tx.Factory()), expression)
		useExplicitReverseMapping = true
	case string:
		expression = core.Coalesce(constantExpression(value, tx.Factory()), expression)
	default:
		if expression == nil {
			expression = tx.Factory().NewVoidZeroExpression()
		}
		useExplicitReverseMapping = !result.IsSyntacticallyString
	}

	// Define the enum member property:
	//  E[E["A"] = 0] = "A";
	//    ^^^^^^^^--_____
	expression = tx.Factory().NewAssignmentExpression(
		tx.getEnumQualifiedElement(enum, member),
		expression,
	)

	if useExplicitReverseMapping {
		//  E[E["A"] = 0] = "A";
		//  ^^--------------^^^^^
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
			// !!! Strada didn't do this; why?
			// tx.currentScope = node.AsNode()
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

	moduleReference := tx.Factory().CreateExpressionFromEntityName(node.ModuleReference)
	tx.EmitContext().SetEmitFlags(moduleReference, printer.EFNoComments|printer.EFNoNestedComments)
	if !tx.isExportOfNamespace(node.AsNode()) {
		//  export var ${name} = ${moduleReference};
		//  var ${name} = ${moduleReference};
		varDecl := tx.Factory().NewVariableDeclaration(node.Name(), nil /*exclamationToken*/, nil /*type*/, moduleReference)
		tx.EmitContext().SetOriginal(varDecl, node.AsNode())
		varList := tx.Factory().NewVariableDeclarationList(tx.Factory().NewNodeList([]*ast.Node{varDecl}), ast.NodeFlagsNone)
		varModifiers := transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ast.ModifierFlagsExport)
		varStatement := tx.Factory().NewVariableStatement(varModifiers, varList)
		tx.EmitContext().SetOriginal(varStatement, node.AsNode())
		tx.EmitContext().AssignCommentAndSourceMapRanges(varStatement, node.AsNode())
		return varStatement
	} else {
		// exports.${name} = ${moduleReference};
		statement := tx.createExportStatement(node.Name(), moduleReference, node.Loc, node.Loc, node.AsNode())
		statement.Loc = node.Loc
		return statement
	}
}

func (tx *RuntimeSyntaxTransformer) visitVariableStatement(node *ast.VariableStatement) *ast.Node {
	if tx.isExportOfNamespace(node.AsNode()) {
		expressions := []*ast.Expression{}
		for _, declaration := range node.DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			v := declaration.AsVariableDeclaration()
			if v.Initializer == nil {
				continue
			}
			if ast.IsBindingPattern(v.Name()) {
				expression := transformers.FlattenDestructuringAssignment(
					&tx.Transformer,
					tx.Visitor().VisitNode(declaration),
					false, /*needsValue*/
					transformers.FlattenLevelAll,
					tx.createNamespaceExportExpression,
				)
				if expression != nil {
					expressions = append(expressions, expression)
				}
			} else {
				expression := transformers.ConvertVariableDeclarationToAssignmentExpression(tx.EmitContext(), v)
				if expression != nil {
					expressions = append(expressions, expression)
				}
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

// createNamespaceExportExpression creates an assignment to a namespace member for use as a
// callback during destructuring flattening.
func (tx *RuntimeSyntaxTransformer) createNamespaceExportExpression(exportName *ast.IdentifierNode, exportValue *ast.Expression, location *core.TextRange) *ast.Expression {
	memberName := tx.getNamespaceQualifiedProperty(tx.getNamespaceContainerName(tx.currentNamespace), exportName)
	expression := tx.Factory().NewAssignmentExpression(memberName, exportValue)
	if location != nil {
		expression.Loc = *location
	}
	return expression
}

func (tx *RuntimeSyntaxTransformer) visitFunctionDeclaration(node *ast.FunctionDeclaration) *ast.Node {
	if tx.isExportOfNamespace(node.AsNode()) {
		updated := tx.Factory().UpdateFunctionDeclaration(
			node,
			tx.Visitor().VisitModifiers(transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^ast.ModifierFlagsExport)),
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
	if exported && name == nil {
		name = tx.Factory().NewGeneratedNameForNode(node.AsNode())
	}
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
			propertyName.Parent = parameter.AsNode() //nolint:customlint // .Parent set to get node to printback using text from original file instead of processed text; TODO: this should be achievable via EmitFlags instead
			tx.EmitContext().AddEmitFlags(propertyName, printer.EFNoComments|printer.EFNoSourceMap)

			localName := parameter.Name().Clone(tx.Factory())
			localName.Parent = parameter.AsNode() //nolint:customlint // .Parent set to get node to printback using text from original file instead of processed text; TODO: this should be achievable via EmitFlags instead
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

	superPath := transformers.FindSuperStatementIndexPath(rest, 0)

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
			tx.Factory().UpdateBlock(tryBlock, tryBlockStatementList, tryBlock.MultiLine),
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
		container := tx.resolver.GetReferencedExportContainer(location, false /*prefixLocals*/)
		if container != nil && (ast.IsEnumDeclaration(container) || ast.IsModuleDeclaration(container)) {
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
	exportName := tx.Factory().GetExternalModuleOrNamespaceExportName(tx.getNamespaceContainerName(tx.currentNamespace), node, false /*allowComments*/, true /*allowSourceMaps*/)
	localName := tx.Factory().GetLocalName(node)
	expression := tx.Factory().NewAssignmentExpression(exportName, localName)
	exportAssignmentSourceMapRange := node.Loc
	if node.Name() != nil {
		exportAssignmentSourceMapRange = exportAssignmentSourceMapRange.WithPos(node.Name().Pos())
	}
	tx.EmitContext().SetSourceMapRange(expression, exportAssignmentSourceMapRange)

	statement := tx.Factory().NewExpressionStatement(expression)
	exportStatementSourceMapRange := node.Loc.WithPos(-1)
	tx.EmitContext().SetSourceMapRange(statement, exportStatementSourceMapRange)
	return statement
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

func (tx *RuntimeSyntaxTransformer) shouldEmitEnumDeclaration(node *ast.EnumDeclaration) bool {
	return !ast.IsEnumConst(node.AsNode()) || tx.compilerOptions.ShouldPreserveConstEnums()
}

func (tx *RuntimeSyntaxTransformer) shouldEmitModuleDeclaration(node *ast.ModuleDeclaration) bool {
	pn := tx.EmitContext().ParseNode(node.AsNode())
	if pn == nil {
		// If we can't find a parse tree node, assume the node is instantiated.
		return true
	}
	return ast.IsInstantiatedModule(pn, tx.compilerOptions.ShouldPreserveConstEnums())
}

func getInnermostModuleDeclarationFromDottedModule(moduleDeclaration *ast.ModuleDeclaration) *ast.ModuleDeclaration {
	for moduleDeclaration.Body != nil && moduleDeclaration.Body.Kind == ast.KindModuleDeclaration {
		moduleDeclaration = moduleDeclaration.Body.AsModuleDeclaration()
	}
	return moduleDeclaration
}

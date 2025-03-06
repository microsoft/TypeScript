package printer

import (
	"fmt"
	"maps"
	"slices"
	"strings"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
)

// Stores side-table information used during transformation that can be read by the printer to customize emit
//
// NOTE: EmitContext is not guaranteed to be thread-safe.
type EmitContext struct {
	Factory       *ast.NodeFactory // Required. The NodeFactory to use to create new nodes
	autoGenerate  map[*ast.MemberName]*AutoGenerateInfo
	textSource    map[*ast.StringLiteralNode]*ast.Node
	original      map[*ast.Node]*ast.Node
	emitNodes     core.LinkStore[*ast.Node, emitNode]
	varScopeStack core.Stack[*varScope]
	letScopeStack core.Stack[*varScope]
	emitHelpers   collections.OrderedSet[*EmitHelper]

	isCustomPrologue           func(node *ast.Statement) bool
	isHoistedFunction          func(node *ast.Statement) bool
	isHoistedVariableStatement func(node *ast.Statement) bool
}

type varScope struct {
	variables []*ast.VariableDeclarationNode
	functions []*ast.FunctionDeclarationNode
}

func NewEmitContext() *EmitContext {
	c := &EmitContext{}
	c.Factory = ast.NewNodeFactory(ast.NodeFactoryHooks{
		OnCreate: c.onCreate,
		OnUpdate: c.onUpdate,
		OnClone:  c.onClone,
	})
	c.isCustomPrologue = c.isCustomPrologueWorker
	c.isHoistedFunction = c.isHoistedFunctionWorker
	c.isHoistedVariableStatement = c.isHoistedVariableStatementWorker
	return c
}

func (c *EmitContext) onCreate(node *ast.Node) {
	node.Flags |= ast.NodeFlagsSynthesized
}

func (c *EmitContext) onUpdate(updated *ast.Node, original *ast.Node) {
	c.SetOriginal(updated, original)
}

func (c *EmitContext) onClone(updated *ast.Node, original *ast.Node) {
	if ast.IsIdentifier(updated) || ast.IsPrivateIdentifier(updated) {
		if autoGenerate := c.autoGenerate[original]; autoGenerate != nil {
			autoGenerateCopy := *autoGenerate
			c.autoGenerate[updated] = &autoGenerateCopy
		}
	}
}

// Creates a new NodeVisitor attached to this EmitContext
func (c *EmitContext) NewNodeVisitor(visit func(node *ast.Node) *ast.Node) *ast.NodeVisitor {
	return ast.NewNodeVisitor(visit, c.Factory, ast.NodeVisitorHooks{
		VisitParameters:         c.VisitParameters,
		VisitFunctionBody:       c.VisitFunctionBody,
		VisitIterationBody:      c.VisitIterationBody,
		VisitTopLevelStatements: c.VisitVariableEnvironment,
	})
}

//
// Environment tracking
//

// Starts a new VariableEnvironment used to track hoisted `var` statements and function declarations.
//
// see: https://tc39.es/ecma262/#table-additional-state-components-for-ecmascript-code-execution-contexts
//
// NOTE: This is the equivalent of `transformContext.startLexicalEnvironment` in Strada.
func (c *EmitContext) StartVariableEnvironment() {
	c.varScopeStack.Push(&varScope{})
	c.StartLexicalEnvironment()
}

// Ends the current VariableEnvironment, returning a list of statements that should be emitted at the start of the current scope.
//
// NOTE: This is the equivalent of `transformContext.endLexicalEnvironment` in Strada.
func (c *EmitContext) EndVariableEnvironment() []*ast.Statement {
	scope := c.varScopeStack.Pop()
	var statements []*ast.Statement
	if len(scope.variables) > 0 {
		varDeclList := c.Factory.NewVariableDeclarationList(ast.NodeFlagsNone, c.Factory.NewNodeList(scope.variables))
		varStatement := c.Factory.NewVariableStatement(nil /*modifiers*/, varDeclList)
		c.SetEmitFlags(varStatement, EFCustomPrologue)
		statements = append(statements, varStatement)
	}
	return append(statements, c.EndLexicalEnvironment()...)
}

// Invokes c.EndVariableEnvironment() and merges the results into `statements`
func (c *EmitContext) EndAndMergeVariableEnvironmentList(statements *ast.StatementList) *ast.StatementList {
	var nodes []*ast.Statement
	if statements != nil {
		nodes = statements.Nodes
	}

	if result, changed := c.endAndMergeVariableEnvironment(nodes); changed {
		list := c.Factory.NewNodeList(result)
		list.Loc = statements.Loc
		return list
	}

	return statements
}

// Invokes c.EndVariableEnvironment() and merges the results into `statements`
func (c *EmitContext) EndAndMergeVariableEnvironment(statements []*ast.Statement) []*ast.Statement {
	result, _ := c.endAndMergeVariableEnvironment(statements)
	return result
}

func (c *EmitContext) endAndMergeVariableEnvironment(statements []*ast.Statement) ([]*ast.Statement, bool) {
	return c.mergeEnvironment(statements, c.EndVariableEnvironment())
}

// Adds a `var` declaration to the current VariableEnvironment
//
// NOTE: This is the equivalent of `transformContext.hoistVariableDeclaration` in Strada.
func (c *EmitContext) AddVariableDeclaration(name *ast.IdentifierNode) {
	varDecl := c.Factory.NewVariableDeclaration(name, nil /*exclamationToken*/, nil /*typeNode*/, nil /*initializer*/)
	c.SetEmitFlags(varDecl, EFNoNestedSourceMaps)
	scope := c.varScopeStack.Peek()
	scope.variables = append(scope.variables, varDecl)
}

// Adds a hoisted function declaration to the current VariableEnvironment
//
// NOTE: This is the equivalent of `transformContext.hoistFunctionDeclaration` in Strada.
func (c *EmitContext) AddHoistedFunctionDeclaration(node *ast.FunctionDeclarationNode) {
	c.SetEmitFlags(node, EFCustomPrologue)
	scope := c.varScopeStack.Peek()
	scope.functions = append(scope.functions, node)
}

// Starts a new LexicalEnvironment used to track block-scoped `let`, `const`, and `using` declarations.
//
// see: https://tc39.es/ecma262/#table-additional-state-components-for-ecmascript-code-execution-contexts
//
// NOTE: This is the equivalent of `transformContext.startBlockScope` in Strada.
// NOTE: This is *not* the same as `startLexicalEnvironment` in Strada as that method is incorrectly named.
func (c *EmitContext) StartLexicalEnvironment() {
	c.letScopeStack.Push(&varScope{})
}

// Ends the current EndLexicalEnvironment, returning a list of statements that should be emitted at the start of the current scope.
//
// NOTE: This is the equivalent of `transformContext.endLexicalEnvironment` in Strada.
// NOTE: This is *not* the same as `endLexicalEnvironment` in Strada as that method is incorrectly named.
func (c *EmitContext) EndLexicalEnvironment() []*ast.Statement {
	scope := c.letScopeStack.Pop()
	var statements []*ast.Statement
	if len(scope.variables) > 0 {
		varDeclList := c.Factory.NewVariableDeclarationList(ast.NodeFlagsLet, c.Factory.NewNodeList(scope.variables))
		varStatement := c.Factory.NewVariableStatement(nil /*modifiers*/, varDeclList)
		c.SetEmitFlags(varStatement, EFCustomPrologue)
		statements = append(statements, varStatement)
	}
	return statements
}

// Invokes c.EndLexicalEnvironment() and merges the results into `statements`
func (c *EmitContext) EndAndMergeLexicalEnvironmentList(statements *ast.StatementList) *ast.StatementList {
	var nodes []*ast.Statement
	if statements != nil {
		nodes = statements.Nodes
	}

	if result, changed := c.endAndMergeLexicalEnvironment(nodes); changed {
		list := c.Factory.NewNodeList(result)
		list.Loc = statements.Loc
		return list
	}

	return statements
}

// Invokes c.EndLexicalEnvironment() and merges the results into `statements`
func (c *EmitContext) EndAndMergeLexicalEnvironment(statements []*ast.Statement) []*ast.Statement {
	result, _ := c.endAndMergeLexicalEnvironment(statements)
	return result
}

// Invokes c.EndLexicalEnvironment() and merges the results into `statements`
func (c *EmitContext) endAndMergeLexicalEnvironment(statements []*ast.Statement) ([]*ast.Statement, bool) {
	return c.mergeEnvironment(statements, c.EndLexicalEnvironment())
}

// Adds a `let` declaration to the current LexicalEnvironment.
func (c *EmitContext) AddLexicalDeclaration(name *ast.IdentifierNode) {
	varDecl := c.Factory.NewVariableDeclaration(name, nil /*exclamationToken*/, nil /*typeNode*/, nil /*initializer*/)
	c.SetEmitFlags(varDecl, EFNoNestedSourceMaps)
	scope := c.letScopeStack.Peek()
	scope.variables = append(scope.variables, varDecl)
}

// Merges declarations produced by c.EndVariableEnvironment() or c.EndLexicalEnvironment() into a statement list
func (c *EmitContext) MergeEnvironmentList(statements *ast.StatementList, declarations []*ast.Statement) *ast.StatementList {
	if result, changed := c.mergeEnvironment(statements.Nodes, declarations); changed {
		list := c.Factory.NewNodeList(result)
		list.Loc = statements.Loc
		return list
	}
	return statements
}

// Merges declarations produced by c.EndVariableEnvironment() or c.EndLexicalEnvironment() into a slice of statements
func (c *EmitContext) MergeEnvironment(statements []*ast.Statement, declarations []*ast.Statement) []*ast.Statement {
	result, _ := c.mergeEnvironment(statements, declarations)
	return result
}

func (c *EmitContext) mergeEnvironment(statements []*ast.Statement, declarations []*ast.Statement) ([]*ast.Statement, bool) {
	if len(declarations) == 0 {
		return statements, false
	}

	// When we merge new lexical statements into an existing statement list, we merge them in the following manner:
	//
	// Given:
	//
	// | Left                               | Right                               |
	// |------------------------------------|-------------------------------------|
	// | [standard prologues (left)]        | [standard prologues (right)]        |
	// | [hoisted functions (left)]         | [hoisted functions (right)]         |
	// | [hoisted variables (left)]         | [hoisted variables (right)]         |
	// | [lexical init statements (left)]   | [lexical init statements (right)]   |
	// | [other statements (left)]          |                                     |
	//
	// The resulting statement list will be:
	//
	// | Result                              |
	// |-------------------------------------|
	// | [standard prologues (right)]        |
	// | [standard prologues (left)]         |
	// | [hoisted functions (right)]         |
	// | [hoisted functions (left)]          |
	// | [hoisted variables (right)]         |
	// | [hoisted variables (left)]          |
	// | [lexical init statements (right)]   |
	// | [lexical init statements (left)]    |
	// | [other statements (left)]           |
	//
	// NOTE: It is expected that new lexical init statements must be evaluated before existing lexical init statements,
	// as the prior transformation may depend on the evaluation of the lexical init statements to be in the correct state.

	changed := false

	// find standard prologues on left in the following order: standard directives, hoisted functions, hoisted variables, other custom
	leftStandardPrologueEnd := findSpanEnd(statements, ast.IsPrologueDirective, 0)
	leftHoistedFunctionsEnd := findSpanEnd(statements, c.isHoistedFunction, leftStandardPrologueEnd)
	leftHoistedVariablesEnd := findSpanEnd(statements, c.isHoistedVariableStatement, leftHoistedFunctionsEnd)

	// find standard prologues on right in the following order: standard directives, hoisted functions, hoisted variables, other custom
	rightStandardPrologueEnd := findSpanEnd(declarations, ast.IsPrologueDirective, 0)
	rightHoistedFunctionsEnd := findSpanEnd(declarations, c.isHoistedFunction, rightStandardPrologueEnd)
	rightHoistedVariablesEnd := findSpanEnd(declarations, c.isHoistedVariableStatement, rightHoistedFunctionsEnd)
	rightCustomPrologueEnd := findSpanEnd(declarations, c.isCustomPrologue, rightHoistedVariablesEnd)
	if rightCustomPrologueEnd != len(declarations) {
		panic("Expected declarations to be valid standard or custom prologues")
	}

	left := statements

	// splice other custom prologues from right into left
	if rightCustomPrologueEnd > rightHoistedVariablesEnd {
		left = core.Splice(left, leftHoistedVariablesEnd, 0, declarations[rightHoistedVariablesEnd:rightCustomPrologueEnd]...)
		changed = true
	}

	// splice hoisted variables from right into left
	if rightHoistedVariablesEnd > rightHoistedFunctionsEnd {
		left = core.Splice(left, leftHoistedFunctionsEnd, 0, declarations[rightHoistedFunctionsEnd:rightHoistedVariablesEnd]...)
		changed = true
	}

	// splice hoisted functions from right into left
	if rightHoistedFunctionsEnd > rightStandardPrologueEnd {
		left = core.Splice(left, leftStandardPrologueEnd, 0, declarations[rightStandardPrologueEnd:rightHoistedFunctionsEnd]...)
		changed = true
	}

	// splice standard prologues from right into left (that are not already in left)
	if rightStandardPrologueEnd > 0 {
		if leftStandardPrologueEnd == 0 {
			left = core.Splice(left, 0, 0, declarations[:rightStandardPrologueEnd]...)
			changed = true
		} else {
			var leftPrologues core.Set[string]
			for i := range leftStandardPrologueEnd {
				leftPrologue := statements[i]
				leftPrologues.Add(leftPrologue.Expression().Text())
			}
			for i := rightStandardPrologueEnd - 1; i >= 0; i-- {
				rightPrologue := declarations[i]
				if !leftPrologues.Has(rightPrologue.Expression().Text()) {
					left = core.Concatenate([]*ast.Statement{rightPrologue}, left)
					changed = true
				}
			}
		}
	}

	return left, changed
}

func (c *EmitContext) isCustomPrologueWorker(node *ast.Statement) bool {
	return c.EmitFlags(node)&EFCustomPrologue != 0
}

func (c *EmitContext) isHoistedFunctionWorker(node *ast.Statement) bool {
	return c.isCustomPrologueWorker(node) && ast.IsFunctionDeclaration(node)
}

func isHoistedVariable(node *ast.VariableDeclarationNode) bool {
	return ast.IsIdentifier(node.Name()) && node.Initializer() == nil
}

func (c *EmitContext) isHoistedVariableStatementWorker(node *ast.Statement) bool {
	return c.isCustomPrologueWorker(node) &&
		ast.IsVariableStatement(node) &&
		core.Every(node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes, isHoistedVariable)
}

// Ensures `"use strict"` is the first statement of a slice of statements.
func (c *EmitContext) EnsureUseStrict(statements []*ast.Statement) []*ast.Statement {
	foundUseStrict := false
	for _, statement := range statements {
		if ast.IsPrologueDirective(statement) && statement.AsExpressionStatement().Expression.Text() == "use strict" {
			foundUseStrict = true
		} else {
			break
		}
	}
	if !foundUseStrict {
		useStrictPrologue := c.Factory.NewExpressionStatement(c.Factory.NewStringLiteral("use strict"))
		statements = append([]*ast.Statement{useStrictPrologue}, statements...)
	}
	return statements
}

// Splits a slice of statements into two parts: standard prologue statements and the rest of the statements
func (c *EmitContext) SplitStandardPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
	for i, statement := range source {
		if !ast.IsPrologueDirective(statement) {
			return source[:i], source[i:]
		}
	}
	return nil, source
}

// Splits a slice of statements into two parts: custom prologue statements (e.g., with `EFCustomPrologue` set) and the rest of the statements
func (c *EmitContext) SplitCustomPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
	for i, statement := range source {
		if ast.IsPrologueDirective(statement) || c.EmitFlags(statement)&EFCustomPrologue == 0 {
			return source[:i], source[i:]
		}
	}
	return nil, source
}

//
// Name Generation
//

func (c *EmitContext) newGeneratedIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	id := AutoGenerateId(nextAutoGenerateId.Add(1))

	if len(text) == 0 {
		switch {
		case node == nil:
			text = fmt.Sprintf("(auto@%d)", id)
		case ast.IsMemberName(node):
			text = node.Text()
		default:
			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(node))
		}
		text = FormatGeneratedName(false /*privateName*/, options.Prefix, text, options.Suffix)
	}

	name := c.Factory.NewIdentifier(text)
	autoGenerate := &AutoGenerateInfo{
		Id:     id,
		Flags:  kind | (options.Flags & ^GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
		Node:   node,
	}
	if c.autoGenerate == nil {
		c.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
	}
	c.autoGenerate[name] = autoGenerate
	return name
}

// Allocates a new temp variable name, but does not record it in the environment. It is recommended to pass this to either
// `AddVariableDeclaration` or `AddLexicalDeclaration` to ensure it is properly tracked, if you are not otherwise handling
// it yourself.
func (c *EmitContext) NewTempVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	return c.newGeneratedIdentifier(GeneratedIdentifierFlagsAuto, "", nil /*node*/, options)
}

// Allocates a new loop variable name.
func (c *EmitContext) NewLoopVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	return c.newGeneratedIdentifier(GeneratedIdentifierFlagsLoop, "", nil /*node*/, options)
}

// Allocates a new unique name based on the provided text.
func (c *EmitContext) NewUniqueName(text string, options AutoGenerateOptions) *ast.IdentifierNode {
	return c.newGeneratedIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node*/, options)
}

// Allocates a new unique name based on the provided node.
func (c *EmitContext) NewGeneratedNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	return c.newGeneratedIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
}

func (c *EmitContext) newGeneratedPrivateIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	id := AutoGenerateId(nextAutoGenerateId.Add(1))

	if len(text) == 0 {
		switch {
		case node == nil:
			text = fmt.Sprintf("(auto@%d)", id)
		case ast.IsMemberName(node):
			text = node.Text()
		default:
			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(node))
		}
		text = FormatGeneratedName(true /*privateName*/, options.Prefix, text, options.Suffix)
	} else if !strings.HasPrefix(text, "#") {
		panic("First character of private identifier must be #: " + text)
	}

	name := c.Factory.NewPrivateIdentifier(text)
	autoGenerate := &AutoGenerateInfo{
		Id:     id,
		Flags:  kind | (options.Flags &^ GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
		Node:   node,
	}
	if c.autoGenerate == nil {
		c.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
	}
	c.autoGenerate[name] = autoGenerate
	return name
}

// Allocates a new unique private name based on the provided text.
func (c *EmitContext) NewUniquePrivateName(text string, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	return c.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node*/, options)
}

// Allocates a new unique private name based on the provided node.
func (c *EmitContext) NewGeneratedPrivateNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	return c.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
}

// Gets whether a given name has an associated AutoGenerateInfo entry.
func (c *EmitContext) HasAutoGenerateInfo(node *ast.MemberName) bool {
	if node != nil {
		_, ok := c.autoGenerate[node]
		return ok
	}
	return false
}

// Gets the associated AutoGenerateInfo entry for a given name.
func (c *EmitContext) GetAutoGenerateInfo(name *ast.MemberName) *AutoGenerateInfo {
	if name == nil {
		return nil
	}
	return c.autoGenerate[name]
}

// Walks the associated AutoGenerateInfo entries of a name to find the root Nopde from which the name should be generated.
func (c *EmitContext) GetNodeForGeneratedName(name *ast.MemberName) *ast.Node {
	node := name
	if autoGenerate := c.autoGenerate[name]; autoGenerate != nil && autoGenerate.Flags.IsNode() {
		autoGenerateId := autoGenerate.Id
		source := autoGenerate.Node
		for source != nil {
			node = source
			if !ast.IsMemberName(node) {
				break
			}

			// if "node" is a different generated name (having a different "autoGenerateId"), use it and stop traversing.
			autoGenerate := c.autoGenerate[node]
			if autoGenerate == nil || !autoGenerate.Flags.IsNode() || autoGenerate.Id != autoGenerateId {
				break
			}

			source = autoGenerate.Node
		}
	}
	return node
}

type AutoGenerateOptions struct {
	Flags  GeneratedIdentifierFlags
	Prefix string
	Suffix string
}

var nextAutoGenerateId atomic.Uint32

type AutoGenerateId uint32

type AutoGenerateInfo struct {
	Flags  GeneratedIdentifierFlags // Specifies whether to auto-generate the text for an identifier.
	Id     AutoGenerateId           // Ensures unique generated identifiers get unique names, but clones get the same name.
	Prefix string                   // Optional prefix to apply to the start of the generated name
	Suffix string                   // Optional suffix to apply to the end of the generated name
	Node   *ast.Node                // For a GeneratedIdentifierFlagsNode, the node from which to generate an identifier
}

//
// Factory Utilities
//

// Allocates a new StringLiteral whose source text is derived from the provided node. This is often used to create a
// string representation of an Identifier or NumericLiteral.
func (c *EmitContext) NewStringLiteralFromNode(textSourceNode *ast.Node) *ast.Node {
	var text string
	if ast.IsMemberName(textSourceNode) || ast.IsJsxNamespacedName(textSourceNode) {
		text = textSourceNode.Text()
	}
	node := c.Factory.NewStringLiteral(text)
	if c.textSource == nil {
		c.textSource = make(map[*ast.StringLiteralNode]*ast.Node)
	}
	c.textSource[node] = textSourceNode
	return node
}

// Allocates a new Identifier representing a reference to a helper function.
func (c *EmitContext) NewUnscopedHelperName(name string) *ast.IdentifierNode {
	node := c.Factory.NewIdentifier(name)
	c.SetEmitFlags(node, EFHelperName)
	return node
}

// Allocates a new Call expression to the `__importDefault` helper.
func (c *EmitContext) NewImportDefaultHelper(expression *ast.Expression) *ast.Expression {
	c.RequestEmitHelper(importDefaultHelper)
	return c.Factory.NewCallExpression(
		c.NewUnscopedHelperName("__importDefault"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		c.Factory.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__importStar` helper.
func (c *EmitContext) NewImportStarHelper(expression *ast.Expression) *ast.Expression {
	c.RequestEmitHelper(importStarHelper)
	return c.Factory.NewCallExpression(
		c.NewUnscopedHelperName("__importStar"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		c.Factory.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__exportStar` helper.
func (c *EmitContext) NewExportStarHelper(moduleExpression *ast.Expression, exportsExpression *ast.Expression) *ast.Expression {
	c.RequestEmitHelper(exportStarHelper)
	c.RequestEmitHelper(createBindingHelper)
	return c.Factory.NewCallExpression(
		c.NewUnscopedHelperName("__exportStar"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		c.Factory.NewNodeList([]*ast.Expression{moduleExpression, exportsExpression}),
		ast.NodeFlagsNone,
	)
}

//
// Original Node Tracking
//

// Sets the original node for a given node.
//
// NOTE: This is the equivalent to `setOriginalNode` in Strada.
func (c *EmitContext) SetOriginal(node *ast.Node, original *ast.Node) {
	if original == nil {
		panic("Original cannot be nil.")
	}

	if c.original == nil {
		c.original = make(map[*ast.Node]*ast.Node)
	}

	existing, ok := c.original[node]
	if !ok {
		c.original[node] = original
		if emitNode := c.emitNodes.TryGet(node); emitNode != nil {
			c.emitNodes.Get(node).copyFrom(emitNode)
		}
	} else if existing != original {
		panic("Original node already set.")
	}
}

// Gets the original node for a given node.
//
// NOTE: This is the equivalent to reading `node.original` in Strada.
func (c *EmitContext) Original(node *ast.Node) *ast.Node {
	return c.original[node]
}

// Gets the most original node associated with this node by walking Original pointers.
//
// NOTE: This method is analogous to `getOriginalNode` in the old compiler, but the name has changed to avoid accidental
// conflation with `SetOriginal`/`Original`
func (c *EmitContext) MostOriginal(node *ast.Node) *ast.Node {
	if node != nil {
		original := c.Original(node)
		for original != nil {
			node = original
			original = c.Original(node)
		}
	}
	return node
}

// Gets the original parse tree node for a given node.
//
// NOTE: This is the equivalent to `getParseTreeNode` in Strada.
func (c *EmitContext) ParseNode(node *ast.Node) *ast.Node {
	node = c.MostOriginal(node)
	if node != nil && ast.IsParseTreeNode(node) {
		return node
	}
	return nil
}

//
// Emit-related Data
//

type emitNodeFlags uint32

const (
	hasCommentRange emitNodeFlags = 1 << iota
	hasSourceMapRange
)

type emitNode struct {
	flags                     emitNodeFlags
	emitFlags                 EmitFlags
	commentRange              core.TextRange
	sourceMapRange            core.TextRange
	tokenSourceMapRanges      map[ast.Kind]core.TextRange
	helpers                   []*EmitHelper
	externalHelpersModuleName *ast.IdentifierNode
}

// NOTE: This method is not guaranteed to be thread-safe
func (e *emitNode) copyFrom(source *emitNode) {
	e.flags = source.flags
	e.emitFlags = source.emitFlags
	e.commentRange = source.commentRange
	e.sourceMapRange = source.sourceMapRange
	e.tokenSourceMapRanges = maps.Clone(source.tokenSourceMapRanges)
	e.helpers = slices.Clone(source.helpers)
	e.externalHelpersModuleName = source.externalHelpersModuleName
}

func (c *EmitContext) EmitFlags(node *ast.Node) EmitFlags {
	if emitNode := c.emitNodes.TryGet(node); emitNode != nil {
		return emitNode.emitFlags
	}
	return EFNone
}

func (c *EmitContext) SetEmitFlags(node *ast.Node, flags EmitFlags) {
	c.emitNodes.Get(node).emitFlags = flags
}

func (c *EmitContext) AddEmitFlags(node *ast.Node, flags EmitFlags) {
	c.emitNodes.Get(node).emitFlags |= flags
}

// Gets the range to use for a node when emitting comments.
func (c *EmitContext) CommentRange(node *ast.Node) core.TextRange {
	if emitNode := c.emitNodes.TryGet(node); emitNode != nil && emitNode.flags&hasCommentRange != 0 {
		return emitNode.commentRange
	}
	return node.Loc
}

// Sets the range to use for a node when emitting comments.
func (c *EmitContext) SetCommentRange(node *ast.Node, loc core.TextRange) {
	emitNode := c.emitNodes.Get(node)
	emitNode.commentRange = loc
	emitNode.flags |= hasCommentRange
}

// Sets the range to use for a node when emitting comments.
func (c *EmitContext) AssignCommentRange(to *ast.Node, from *ast.Node) {
	c.SetCommentRange(to, c.CommentRange(from))
}

// Gets the range to use for a node when emitting source maps.
func (c *EmitContext) SourceMapRange(node *ast.Node) core.TextRange {
	if emitNode := c.emitNodes.TryGet(node); emitNode != nil && emitNode.flags&hasSourceMapRange != 0 {
		return emitNode.sourceMapRange
	}
	return node.Loc
}

// Sets the range to use for a node when emitting source maps.
func (c *EmitContext) SetSourceMapRange(node *ast.Node, loc core.TextRange) {
	emitNode := c.emitNodes.Get(node)
	emitNode.sourceMapRange = loc
	emitNode.flags |= hasSourceMapRange
}

// Sets the range to use for a node when emitting source maps.
func (c *EmitContext) AssignSourceMapRange(to *ast.Node, from *ast.Node) {
	c.SetSourceMapRange(to, c.SourceMapRange(from))
}

// Sets the range to use for a node when emitting comments and source maps.
func (c *EmitContext) AssignCommentAndSourceMapRanges(to *ast.Node, from *ast.Node) {
	emitNode := c.emitNodes.Get(to)
	commentRange := c.CommentRange(from)
	sourceMapRange := c.SourceMapRange(from)
	emitNode.commentRange = commentRange
	emitNode.sourceMapRange = sourceMapRange
	emitNode.flags |= hasCommentRange | hasSourceMapRange
}

// Gets the range for a token of a node when emitting source maps.
func (c *EmitContext) TokenSourceMapRange(node *ast.Node, kind ast.Kind) (core.TextRange, bool) {
	if emitNode := c.emitNodes.TryGet(node); emitNode != nil && emitNode.tokenSourceMapRanges != nil {
		if loc, ok := emitNode.tokenSourceMapRanges[kind]; ok {
			return loc, true
		}
	}
	return core.TextRange{}, false
}

// Sets the range for a token of a node when emitting source maps.
func (c *EmitContext) SetTokenSourceMapRange(node *ast.Node, kind ast.Kind, loc core.TextRange) {
	emitNode := c.emitNodes.Get(node)
	if emitNode.tokenSourceMapRanges == nil {
		emitNode.tokenSourceMapRanges = make(map[ast.Kind]core.TextRange)
	}
	emitNode.tokenSourceMapRanges[kind] = loc
}

func (c *EmitContext) RequestEmitHelper(helper *EmitHelper) {
	if helper.Scoped {
		panic("Cannot request a scoped emit helper")
	}
	for _, h := range helper.Dependencies {
		c.RequestEmitHelper(h)
	}
	c.emitHelpers.Add(helper)
}

func (c *EmitContext) ReadEmitHelpers() []*EmitHelper {
	helpers := slices.Collect(c.emitHelpers.Values())
	c.emitHelpers.Clear()
	return helpers
}

func (c *EmitContext) AddEmitHelper(node *ast.Node, helper ...*EmitHelper) {
	emitNode := c.emitNodes.Get(node)
	emitNode.helpers = append(emitNode.helpers, helper...)
}

func (c *EmitContext) MoveEmitHelpers(source *ast.Node, target *ast.Node, predicate func(helper *EmitHelper) bool) {
	sourceEmitNode := c.emitNodes.TryGet(source)
	if sourceEmitNode == nil {
		return
	}
	sourceEmitHelpers := sourceEmitNode.helpers
	if len(sourceEmitHelpers) == 0 {
		return
	}

	targetEmitNode := c.emitNodes.Get(target)
	helpersRemoved := 0
	for i := range sourceEmitHelpers {
		helper := sourceEmitHelpers[i]
		if predicate(helper) {
			helpersRemoved++
			targetEmitNode.helpers = core.AppendIfUnique(targetEmitNode.helpers, helper)
		} else if helpersRemoved > 0 {
			sourceEmitHelpers[i-helpersRemoved] = helper
		}
	}

	if helpersRemoved > 0 {
		sourceEmitHelpers = sourceEmitHelpers[:len(sourceEmitHelpers)-helpersRemoved]
		sourceEmitNode.helpers = sourceEmitHelpers
	}
}

func (c *EmitContext) GetEmitHelpers(node *ast.Node) []*EmitHelper {
	emitNode := c.emitNodes.TryGet(node)
	if emitNode != nil {
		return emitNode.helpers
	}
	return nil
}

func (c *EmitContext) GetExternalHelpersModuleName(node *ast.SourceFile) *ast.IdentifierNode {
	if parseNode := c.ParseNode(node.AsNode()); parseNode != nil {
		if emitNode := c.emitNodes.TryGet(parseNode); emitNode != nil {
			return emitNode.externalHelpersModuleName
		}
	}
	return nil
}

func (c *EmitContext) SetExternalHelpersModuleName(node *ast.SourceFile, name *ast.IdentifierNode) {
	parseNode := c.ParseNode(node.AsNode())
	if parseNode == nil {
		panic("Node must be a parse tree node or have an Original pointer to a parse tree node.")
	}

	emitNode := c.emitNodes.Get(parseNode)
	emitNode.externalHelpersModuleName = name
}

func (c *EmitContext) HasRecordedExternalHelpers(node *ast.SourceFile) bool {
	if parseNode := c.ParseNode(node.AsNode()); parseNode != nil {
		emitNode := c.emitNodes.TryGet(parseNode)
		return emitNode != nil && (emitNode.externalHelpersModuleName != nil || emitNode.emitFlags&EFExternalHelpers != 0)
	}
	return false
}

//
// Visitor Hooks
//

func (c *EmitContext) VisitVariableEnvironment(nodes *ast.StatementList, visitor *ast.NodeVisitor) *ast.StatementList {
	c.StartVariableEnvironment()
	return c.EndAndMergeVariableEnvironmentList(visitor.VisitNodes(nodes))
}

func (c *EmitContext) VisitParameters(nodes *ast.ParameterList, visitor *ast.NodeVisitor) *ast.ParameterList {
	c.StartVariableEnvironment()
	nodes = visitor.VisitNodes(nodes)
	// !!! c.suspendVariableEnvironment()
	return nodes
}

func (c *EmitContext) VisitFunctionBody(node *ast.BlockOrExpression, visitor *ast.NodeVisitor) *ast.BlockOrExpression {
	// !!! c.resumeVariableEnvironment()
	updated := visitor.VisitNode(node)
	declarations := c.EndVariableEnvironment()
	if len(declarations) == 0 {
		return updated
	}

	if updated == nil {
		return c.Factory.NewBlock(c.Factory.NewNodeList(declarations), true /*multiLine*/)
	}

	if !ast.IsBlock(updated) {
		statements := c.MergeEnvironment([]*ast.Statement{c.Factory.NewReturnStatement(updated)}, declarations)
		return c.Factory.NewBlock(c.Factory.NewNodeList(statements), true /*multiLine*/)
	}

	return c.Factory.UpdateBlock(
		updated.AsBlock(),
		c.MergeEnvironmentList(updated.AsBlock().Statements, declarations),
	)
}

func (c *EmitContext) VisitIterationBody(body *ast.Statement, visitor *ast.NodeVisitor) *ast.Statement {
	if body == nil {
		return nil
	}

	c.StartLexicalEnvironment()
	updated := visitor.VisitEmbeddedStatement(body)
	if updated == nil {
		panic("Expected visitor to return a statement.")
	}

	statements := c.EndLexicalEnvironment()
	if len(statements) > 0 {
		if ast.IsBlock(updated) {
			statements = append(statements, updated.AsBlock().Statements.Nodes...)
			statementsList := c.Factory.NewNodeList(statements)
			statementsList.Loc = updated.AsBlock().Statements.Loc
			return c.Factory.UpdateBlock(updated.AsBlock(), statementsList)
		}
		statements = append(statements, updated)
		return c.Factory.NewBlock(c.Factory.NewNodeList(statements), true /*multiLine*/)
	}

	return updated
}

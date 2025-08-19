package printer

import (
	"maps"
	"slices"
	"sync"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
)

// Stores side-table information used during transformation that can be read by the printer to customize emit
//
// NOTE: EmitContext is not guaranteed to be thread-safe.
type EmitContext struct {
	Factory       *NodeFactory // Required. The NodeFactory to use to create new nodes
	autoGenerate  map[*ast.MemberName]*AutoGenerateInfo
	textSource    map[*ast.StringLiteralNode]*ast.Node
	original      map[*ast.Node]*ast.Node
	emitNodes     core.LinkStore[*ast.Node, emitNode]
	assignedName  map[*ast.Node]*ast.Expression
	classThis     map[*ast.Node]*ast.IdentifierNode
	varScopeStack core.Stack[*varScope]
	letScopeStack core.Stack[*varScope]
	emitHelpers   collections.OrderedSet[*EmitHelper]
}

type environmentFlags int

const (
	environmentFlagsNone                         environmentFlags = 0
	environmentFlagsInParameters                 environmentFlags = 1 << 0 // currently visiting a parameter list
	environmentFlagsVariablesHoistedInParameters environmentFlags = 1 << 1 // a temp variable was hoisted while visiting a parameter list
)

type varScope struct {
	variables                []*ast.VariableDeclarationNode
	functions                []*ast.FunctionDeclarationNode
	flags                    environmentFlags
	initializationStatements []*ast.Node
}

func NewEmitContext() *EmitContext {
	c := &EmitContext{}
	c.Factory = NewNodeFactory(c)
	return c
}

var emitContextPool = sync.Pool{
	New: func() any {
		return NewEmitContext()
	},
}

func GetEmitContext() (*EmitContext, func()) {
	c := emitContextPool.Get().(*EmitContext)
	return c, func() {
		c.Reset()
		emitContextPool.Put(c)
	}
}

func (c *EmitContext) Reset() {
	*c = EmitContext{
		Factory: c.Factory,
	}
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
	return ast.NewNodeVisitor(visit, c.Factory.AsNodeFactory(), ast.NodeVisitorHooks{
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
	if len(scope.functions) > 0 {
		statements = slices.Clone(scope.functions)
	}
	if len(scope.variables) > 0 {
		varDeclList := c.Factory.NewVariableDeclarationList(ast.NodeFlagsNone, c.Factory.NewNodeList(scope.variables))
		varStatement := c.Factory.NewVariableStatement(nil /*modifiers*/, varDeclList)
		c.SetEmitFlags(varStatement, EFCustomPrologue)
		statements = append(statements, varStatement)
	}
	if len(scope.initializationStatements) > 0 {
		statements = append(statements, scope.initializationStatements...)
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
	if scope.flags&environmentFlagsInParameters != 0 {
		scope.flags |= environmentFlagsVariablesHoistedInParameters
	}
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
	leftHoistedFunctionsEnd := findSpanEndWithEmitContext(c, statements, (*EmitContext).isHoistedFunction, leftStandardPrologueEnd)
	leftHoistedVariablesEnd := findSpanEndWithEmitContext(c, statements, (*EmitContext).isHoistedVariableStatement, leftHoistedFunctionsEnd)

	// find standard prologues on right in the following order: standard directives, hoisted functions, hoisted variables, other custom
	rightStandardPrologueEnd := findSpanEnd(declarations, ast.IsPrologueDirective, 0)
	rightHoistedFunctionsEnd := findSpanEndWithEmitContext(c, declarations, (*EmitContext).isHoistedFunction, rightStandardPrologueEnd)
	rightHoistedVariablesEnd := findSpanEndWithEmitContext(c, declarations, (*EmitContext).isHoistedVariableStatement, rightHoistedFunctionsEnd)
	rightCustomPrologueEnd := findSpanEndWithEmitContext(c, declarations, (*EmitContext).isCustomPrologue, rightHoistedVariablesEnd)
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
			var leftPrologues collections.Set[string]
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

func (c *EmitContext) isCustomPrologue(node *ast.Statement) bool {
	return c.EmitFlags(node)&EFCustomPrologue != 0
}

func (c *EmitContext) isHoistedFunction(node *ast.Statement) bool {
	return c.isCustomPrologue(node) && ast.IsFunctionDeclaration(node)
}

func isHoistedVariable(node *ast.VariableDeclarationNode) bool {
	return ast.IsIdentifier(node.Name()) && node.Initializer() == nil
}

func (c *EmitContext) isHoistedVariableStatement(node *ast.Statement) bool {
	return c.isCustomPrologue(node) &&
		ast.IsVariableStatement(node) &&
		core.Every(node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes, isHoistedVariable)
}

//
// Name Generation
//

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
	if autoGenerate := c.autoGenerate[name]; autoGenerate != nil && autoGenerate.Flags.IsNode() {
		return c.getNodeForGeneratedNameWorker(autoGenerate.Node, autoGenerate.Id)
	}
	return name
}

func (c *EmitContext) getNodeForGeneratedNameWorker(node *ast.Node, autoGenerateId AutoGenerateId) *ast.Node {
	original := c.Original(node)
	for original != nil {
		node = original
		if ast.IsMemberName(node) {
			// if "node" is a different generated name (having a different "autoGenerateId"), use it and stop traversing.
			autoGenerate := c.autoGenerate[node]
			if autoGenerate == nil || autoGenerate.Flags.IsNode() && autoGenerate.Id != autoGenerateId {
				break
			}
			if autoGenerate.Flags.IsNode() {
				original = autoGenerate.Node
				continue
			}
		}
		original = c.Original(node)
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
// Original Node Tracking
//

// Sets the original node for a given node.
//
// NOTE: This is the equivalent to `setOriginalNode` in Strada.
func (c *EmitContext) SetOriginal(node *ast.Node, original *ast.Node) {
	c.SetOriginalEx(node, original, false)
}

func (c *EmitContext) SetOriginalEx(node *ast.Node, original *ast.Node, allowOverwrite bool) {
	if original == nil {
		panic("Original cannot be nil.")
	}

	if c.original == nil {
		c.original = make(map[*ast.Node]*ast.Node)
	}

	existing, ok := c.original[node]
	if !ok {
		c.original[node] = original
		if emitNode := c.emitNodes.TryGet(original); emitNode != nil {
			c.emitNodes.Get(node).copyFrom(emitNode)
		}
	} else if !allowOverwrite && existing != original {
		panic("Original node already set.")
	} else if allowOverwrite {
		c.original[node] = original
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

type SynthesizedComment struct {
	Kind               ast.Kind
	Loc                core.TextRange
	HasLeadingNewLine  bool
	HasTrailingNewLine bool
	Text               string
}

type emitNode struct {
	flags                     emitNodeFlags
	emitFlags                 EmitFlags
	commentRange              core.TextRange
	sourceMapRange            core.TextRange
	tokenSourceMapRanges      map[ast.Kind]core.TextRange
	helpers                   []*EmitHelper
	externalHelpersModuleName *ast.IdentifierNode
	leadingComments           []SynthesizedComment
	trailingComments          []SynthesizedComment
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

func (c *EmitContext) AssignedName(node *ast.Node) *ast.Expression {
	return c.assignedName[node]
}

func (c *EmitContext) SetAssignedName(node *ast.Node, name *ast.Expression) {
	if c.assignedName == nil {
		c.assignedName = make(map[*ast.Node]*ast.Expression)
	}
	c.assignedName[node] = name
}

func (c *EmitContext) ClassThis(node *ast.Node) *ast.Expression {
	return c.classThis[node]
}

func (c *EmitContext) SetClassThis(node *ast.Node, classThis *ast.IdentifierNode) {
	if c.classThis == nil {
		c.classThis = make(map[*ast.Node]*ast.Expression)
	}
	c.classThis[node] = classThis
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

func (c *EmitContext) IsCallToHelper(firstSegment *ast.Expression, helperName string) bool {
	return ast.IsCallExpression(firstSegment) &&
		ast.IsIdentifier(firstSegment.Expression()) &&
		(c.EmitFlags(firstSegment.Expression())&EFHelperName) != 0 &&
		firstSegment.Expression().Text() == helperName
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
	scope := c.varScopeStack.Peek()
	oldFlags := scope.flags
	scope.flags |= environmentFlagsInParameters
	nodes = visitor.VisitNodes(nodes)

	// As of ES2015, any runtime execution of that occurs in for a parameter (such as evaluating an
	// initializer or a binding pattern), occurs in its own lexical scope. As a result, any expression
	// that we might transform that introduces a temporary variable would fail as the temporary variable
	// exists in a different lexical scope. To address this, we move any binding patterns and initializers
	// in a parameter list to the body if we detect a variable being hoisted while visiting a parameter list
	// when the emit target is greater than ES2015. (Which is now all targets.)
	if scope.flags&environmentFlagsVariablesHoistedInParameters != 0 {
		nodes = c.addDefaultValueAssignmentsIfNeeded(nodes)
	}
	scope.flags = oldFlags
	// !!! c.suspendVariableEnvironment()
	return nodes
}

func (c *EmitContext) addDefaultValueAssignmentsIfNeeded(nodeList *ast.ParameterList) *ast.ParameterList {
	if nodeList == nil {
		return nodeList
	}
	var result []*ast.Node
	nodes := nodeList.Nodes
	for i, parameter := range nodes {
		updated := c.addDefaultValueAssignmentIfNeeded(parameter.AsParameterDeclaration())
		if updated != parameter {
			if result == nil {
				result = slices.Clone(nodes)
			}
			result[i] = updated
		}
	}
	if result != nil {
		res := c.Factory.NewNodeList(result)
		res.Loc = nodeList.Loc
		return res
	}
	return nodeList
}

func (c *EmitContext) addDefaultValueAssignmentIfNeeded(parameter *ast.ParameterDeclaration) *ast.Node {
	// A rest parameter cannot have a binding pattern or an initializer,
	// so let's just ignore it.
	if parameter.DotDotDotToken != nil {
		return parameter.AsNode()
	} else if ast.IsBindingPattern(parameter.Name()) {
		return c.addDefaultValueAssignmentForBindingPattern(parameter)
	} else if parameter.Initializer != nil {
		return c.addDefaultValueAssignmentForInitializer(parameter, parameter.Name(), parameter.Initializer)
	}
	return parameter.AsNode()
}

func (c *EmitContext) addDefaultValueAssignmentForBindingPattern(parameter *ast.ParameterDeclaration) *ast.Node {
	var initNode *ast.Node
	if parameter.Initializer != nil {
		initNode = c.Factory.NewConditionalExpression(
			c.Factory.NewStrictEqualityExpression(
				c.Factory.NewGeneratedNameForNode(parameter.AsNode()),
				c.Factory.NewVoidZeroExpression(),
			),
			c.Factory.NewToken(ast.KindQuestionToken),
			parameter.Initializer,
			c.Factory.NewToken(ast.KindColonToken),
			c.Factory.NewGeneratedNameForNode(parameter.AsNode()),
		)
	} else {
		initNode = c.Factory.NewGeneratedNameForNode(parameter.AsNode())
	}
	c.AddInitializationStatement(c.Factory.NewVariableStatement(
		nil,
		c.Factory.NewVariableDeclarationList(ast.NodeFlagsNone, c.Factory.NewNodeList([]*ast.Node{c.Factory.NewVariableDeclaration(
			parameter.Name(),
			nil,
			parameter.Type,
			initNode,
		)})),
	))
	return c.Factory.UpdateParameterDeclaration(
		parameter,
		parameter.Modifiers(),
		parameter.DotDotDotToken,
		c.Factory.NewGeneratedNameForNode(parameter.AsNode()),
		parameter.QuestionToken,
		parameter.Type,
		nil,
	)
}

func (c *EmitContext) addDefaultValueAssignmentForInitializer(parameter *ast.ParameterDeclaration, name *ast.Node, initializer *ast.Node) *ast.Node {
	c.AddEmitFlags(initializer, EFNoSourceMap|EFNoComments)
	nameClone := name.Clone(c.Factory)
	c.AddEmitFlags(nameClone, EFNoSourceMap)
	initAssignment := c.Factory.NewAssignmentExpression(
		nameClone,
		initializer,
	)
	initAssignment.Loc = parameter.Loc
	c.AddEmitFlags(initAssignment, EFNoComments)
	initBlock := c.Factory.NewBlock(c.Factory.NewNodeList([]*ast.Node{c.Factory.NewExpressionStatement(initAssignment)}), false)
	initBlock.Loc = parameter.Loc
	c.AddEmitFlags(initBlock, EFSingleLine|EFNoTrailingSourceMap|EFNoTokenSourceMaps|EFNoComments)
	c.AddInitializationStatement(c.Factory.NewIfStatement(
		c.Factory.NewTypeCheck(name.Clone(c.Factory), "undefined"),
		initBlock,
		nil,
	))
	return c.Factory.UpdateParameterDeclaration(
		parameter,
		parameter.Modifiers(),
		parameter.DotDotDotToken,
		parameter.Name(),
		parameter.QuestionToken,
		parameter.Type,
		nil,
	)
}

func (c *EmitContext) AddInitializationStatement(node *ast.Node) {
	scope := c.varScopeStack.Peek()
	if scope == nil {
		panic("Tried to add an initialization statement without a surrounding variable scope")
	}
	c.AddEmitFlags(node, EFCustomPrologue)
	scope.initializationStatements = append(scope.initializationStatements, node)
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

func (c *EmitContext) SetSyntheticLeadingComments(node *ast.Node, comments []SynthesizedComment) *ast.Node {
	c.emitNodes.Get(node).leadingComments = comments
	return node
}

func (c *EmitContext) AddSyntheticLeadingComment(node *ast.Node, kind ast.Kind, text string, hasTrailingNewLine bool) *ast.Node {
	c.emitNodes.Get(node).leadingComments = append(c.emitNodes.Get(node).leadingComments, SynthesizedComment{Kind: kind, Loc: core.NewTextRange(-1, -1), HasTrailingNewLine: hasTrailingNewLine, Text: text})
	return node
}

func (c *EmitContext) GetSyntheticLeadingComments(node *ast.Node) []SynthesizedComment {
	if c.emitNodes.Has(node) {
		return c.emitNodes.Get(node).leadingComments
	}
	return nil
}

func (c *EmitContext) SetSyntheticTrailingComments(node *ast.Node, comments []SynthesizedComment) *ast.Node {
	c.emitNodes.Get(node).trailingComments = comments
	return node
}

func (c *EmitContext) AddSyntheticTrailingComment(node *ast.Node, kind ast.Kind, text string, hasTrailingNewLine bool) *ast.Node {
	c.emitNodes.Get(node).trailingComments = append(c.emitNodes.Get(node).trailingComments, SynthesizedComment{Kind: kind, Loc: core.NewTextRange(-1, -1), HasTrailingNewLine: hasTrailingNewLine, Text: text})
	return node
}

func (c *EmitContext) GetSyntheticTrailingComments(node *ast.Node) []SynthesizedComment {
	if c.emitNodes.Has(node) {
		return c.emitNodes.Get(node).trailingComments
	}
	return nil
}

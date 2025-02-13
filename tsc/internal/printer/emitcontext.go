package printer

import (
	"fmt"
	"maps"
	"strings"
	"sync/atomic"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

// Stores side-table information used during transformation that can be read by the printer to customize emit
//
// NOTE: EmitContext is not guaranteed to be thread-safe.
type EmitContext struct {
	Factory       *ast.NodeFactory // Required. The NodeFactory to use to create new nodes
	autoGenerate  map[*ast.MemberName]*autoGenerateInfo
	textSource    map[*ast.StringLiteralNode]*ast.Node
	original      map[*ast.Node]*ast.Node
	emitNodes     core.LinkStore[*ast.Node, emitNode]
	varScopeStack core.Stack[*varScope]

	isCustomPrologue           func(node *ast.Statement) bool
	isHoistedFunction          func(node *ast.Statement) bool
	isHoistedVariableStatement func(node *ast.Statement) bool
}

type varScope struct {
	hoistedVars []*ast.VariableDeclarationNode
}

func NewEmitContext() *EmitContext {
	c := &EmitContext{Factory: &ast.NodeFactory{}}
	c.isCustomPrologue = c.isCustomPrologueWorker
	c.isHoistedFunction = c.isHoistedFunctionWorker
	c.isHoistedVariableStatement = c.isHoistedVariableStatementWorker
	return c
}

func (c *EmitContext) StartVarEnvironment() {
	c.varScopeStack.Push(&varScope{})
}

func (c *EmitContext) EndVarEnvironment() []*ast.Statement {
	scope := c.varScopeStack.Pop()
	var statements []*ast.Statement
	if len(scope.hoistedVars) > 0 {
		varDeclList := c.Factory.NewVariableDeclarationList(ast.NodeFlagsNone, c.Factory.NewNodeList(scope.hoistedVars))
		varStatement := c.Factory.NewVariableStatement(nil /*modifiers*/, varDeclList)
		c.SetEmitFlags(varStatement, EFCustomPrologue)
		statements = append(statements, varStatement)
	}
	return statements
}

// Invokes c.EndVarEnvironment() and merges the results into `statements`
func (c *EmitContext) EndAndMergeVarEnvironment(statements []*ast.Statement) []*ast.Statement {
	return c.MergeEnvironment(statements, c.EndVarEnvironment())
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

func findSpanEnd[T any](array []T, test func(value T) bool, start int) int {
	i := start
	for i < len(array) && test(array[i]) {
		i++
	}
	return i
}

// Merges declarations produced by c.EndVarEnvironment() into a statement list
func (c *EmitContext) MergeEnvironmentList(statements *ast.StatementList, declarations []*ast.Statement) *ast.StatementList {
	if result, changed := c.mergeEnvironment(statements.Nodes, declarations); changed {
		list := c.Factory.NewNodeList(result)
		list.Loc = statements.Loc
		return list
	}
	return statements
}

// Merges declarations produced by c.EndVarEnvironment() into a statement list
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

func (c *EmitContext) HoistVariable(name *ast.IdentifierNode) {
	c.HoistInitializedVariable(name, nil /*initializer*/)
}

func (c *EmitContext) HoistInitializedVariable(name *ast.IdentifierNode, initializer *ast.Expression) {
	varDecl := c.Factory.NewVariableDeclaration(name, nil /*exclamationToken*/, nil /*typeNode*/, initializer)
	c.SetEmitFlags(varDecl, EFNoNestedSourceMaps)
	scope := c.varScopeStack.Peek()
	scope.hoistedVars = append(scope.hoistedVars, varDecl)
}

type AutoGenerateOptions struct {
	Flags  GeneratedIdentifierFlags
	Prefix string
	Suffix string
}

func (c *EmitContext) newGeneratedIdentifier(kind GeneratedIdentifierFlags, text string, options AutoGenerateOptions) (*ast.IdentifierNode, *autoGenerateInfo) {
	name := c.Factory.NewIdentifier(text)
	autoGenerate := &autoGenerateInfo{
		Id:     autoGenerateId(nextAutoGenerateId.Add(1)),
		Flags:  kind | (options.Flags & ^GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
	}
	if c.autoGenerate == nil {
		c.autoGenerate = make(map[*ast.MemberName]*autoGenerateInfo)
	}
	c.autoGenerate[name] = autoGenerate
	return name, autoGenerate
}

func (c *EmitContext) NewTempVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := c.newGeneratedIdentifier(GeneratedIdentifierFlagsAuto, "", options)
	return name
}

func (c *EmitContext) NewLoopVariable(options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := c.newGeneratedIdentifier(GeneratedIdentifierFlagsLoop, "", options)
	return name
}

func (c *EmitContext) NewUniqueName(text string, options AutoGenerateOptions) *ast.IdentifierNode {
	name, _ := c.newGeneratedIdentifier(GeneratedIdentifierFlagsUnique, text, options)
	return name
}

func (c *EmitContext) NewGeneratedNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	// For debugging purposes, set the `text` of the identifier to a reasonable value
	var text string
	switch {
	case node == nil:
		text = formatGeneratedName(false /*privateName*/, options.Prefix, "" /*base*/, options.Suffix)
	case ast.IsMemberName(node):
		text = formatGeneratedName(false, options.Prefix, node.Text(), options.Suffix)
	default:
		text = fmt.Sprintf("generated@%v", ast.GetNodeId(node))
	}

	name, autoGenerate := c.newGeneratedIdentifier(GeneratedIdentifierFlagsNode, text, options)
	autoGenerate.Node = node
	return name
}

func (c *EmitContext) newGeneratedPrivateIdentifier(kind GeneratedIdentifierFlags, text string, options AutoGenerateOptions) (*ast.PrivateIdentifierNode, *autoGenerateInfo) {
	if !strings.HasPrefix(text, "#") {
		panic("First character of private identifier must be #: " + text)
	}

	name := c.Factory.NewPrivateIdentifier(text)
	autoGenerate := &autoGenerateInfo{
		Id:     autoGenerateId(nextAutoGenerateId.Add(1)),
		Flags:  kind | (options.Flags &^ GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
	}
	if c.autoGenerate == nil {
		c.autoGenerate = make(map[*ast.MemberName]*autoGenerateInfo)
	}
	c.autoGenerate[name] = autoGenerate
	return name, autoGenerate
}

func (c *EmitContext) NewUniquePrivateName(text string, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	name, _ := c.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsUnique, text, options)
	return name
}

func (c *EmitContext) NewGeneratedPrivateNameForNode(node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	var text string
	switch {
	case node == nil:
		text = formatGeneratedName(true /*privateName*/, options.Prefix, "" /*base*/, options.Suffix)
	case ast.IsMemberName(node):
		text = formatGeneratedName(true /*privateName*/, options.Prefix, node.Text(), options.Suffix)
	default:
		text = fmt.Sprintf("#generated@%v", ast.GetNodeId(node))
	}

	name, autoGenerate := c.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsNode, text, options)
	autoGenerate.Node = node
	return name
}

func (c *EmitContext) HasAutoGenerateInfo(node *ast.MemberName) bool {
	if node != nil {
		_, ok := c.autoGenerate[node]
		return ok
	}
	return false
}

var nextAutoGenerateId atomic.Uint32

type autoGenerateId uint32

type autoGenerateInfo struct {
	Flags  GeneratedIdentifierFlags // Specifies whether to auto-generate the text for an identifier.
	Id     autoGenerateId           // Ensures unique generated identifiers get unique names, but clones get the same name.
	Prefix string                   // Optional prefix to apply to the start of the generated name
	Suffix string                   // Optional suffix to apply to the end of the generated name
	Node   *ast.Node                // For a GeneratedIdentifierFlagsNode, the node from which to generate an identifier
}

func (info *autoGenerateInfo) Kind() GeneratedIdentifierFlags {
	return info.Flags & GeneratedIdentifierFlagsKindMask
}

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

func (c *EmitContext) Original(node *ast.Node) *ast.Node {
	return c.original[node]
}

// Gets the most original node associated with this node by walking Original pointers.
//
// This method is analogous to `getOriginalNode` in the old compiler, but the name has changed to avoid accidental
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

type emitNodeFlags uint32

const (
	hasCommentRange emitNodeFlags = 1 << iota
	hasSourceMapRange
)

type emitNode struct {
	flags                emitNodeFlags
	emitFlags            EmitFlags
	commentRange         core.TextRange
	sourceMapRange       core.TextRange
	tokenSourceMapRanges map[ast.Kind]core.TextRange
}

// NOTE: This method is not guaranteed to be thread-safe
func (e *emitNode) copyFrom(source *emitNode) {
	e.flags = source.flags
	e.emitFlags = source.emitFlags
	e.commentRange = source.commentRange
	e.sourceMapRange = source.sourceMapRange
	e.tokenSourceMapRanges = maps.Clone(source.tokenSourceMapRanges)
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
func (c *EmitContext) CopyCommentRange(to *ast.Node, from *ast.Node) {
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
func (c *EmitContext) CopySourceMapRange(to *ast.Node, from *ast.Node) {
	c.SetSourceMapRange(to, c.SourceMapRange(from))
}

// Sets the range to use for a node when emitting comments and source maps.
func (c *EmitContext) CopyCommentAndSourceMapRangesTo(to *ast.Node, from *ast.Node) {
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

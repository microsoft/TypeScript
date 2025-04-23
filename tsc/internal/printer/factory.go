package printer

import (
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
)

type NodeFactory struct {
	ast.NodeFactory
	emitContext *EmitContext
}

func NewNodeFactory(context *EmitContext) *NodeFactory {
	return &NodeFactory{
		NodeFactory: *ast.NewNodeFactory(ast.NodeFactoryHooks{
			OnCreate: context.onCreate,
			OnUpdate: context.onUpdate,
			OnClone:  context.onClone,
		}),
		emitContext: context,
	}
}

func (f *NodeFactory) newGeneratedIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	id := AutoGenerateId(nextAutoGenerateId.Add(1))

	if len(text) == 0 {
		switch {
		case node == nil:
			text = fmt.Sprintf("(auto@%d)", id)
		case ast.IsMemberName(node):
			text = node.Text()
		default:
			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(f.emitContext.getNodeForGeneratedNameWorker(node, id)))
		}
		text = FormatGeneratedName(false /*privateName*/, options.Prefix, text, options.Suffix)
	}

	name := f.NewIdentifier(text)
	autoGenerate := &AutoGenerateInfo{
		Id:     id,
		Flags:  kind | (options.Flags & ^GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
		Node:   node,
	}
	if f.emitContext.autoGenerate == nil {
		f.emitContext.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
	}
	f.emitContext.autoGenerate[name] = autoGenerate
	return name
}

// Allocates a new temp variable name, but does not record it in the environment. It is recommended to pass this to either
// `AddVariableDeclaration` or `AddLexicalDeclaration` to ensure it is properly tracked, if you are not otherwise handling
// it yourself.
func (f *NodeFactory) NewTempVariable() *ast.IdentifierNode {
	return f.NewTempVariableEx(AutoGenerateOptions{})
}

// Allocates a new temp variable name, but does not record it in the environment. It is recommended to pass this to either
// `AddVariableDeclaration` or `AddLexicalDeclaration` to ensure it is properly tracked, if you are not otherwise handling
// it yourself.
func (f *NodeFactory) NewTempVariableEx(options AutoGenerateOptions) *ast.IdentifierNode {
	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsAuto, "", nil /*node*/, options)
}

// Allocates a new loop variable name.
func (f *NodeFactory) NewLoopVariable() *ast.IdentifierNode {
	return f.NewLoopVariableEx(AutoGenerateOptions{})
}

// Allocates a new loop variable name.
func (f *NodeFactory) NewLoopVariableEx(options AutoGenerateOptions) *ast.IdentifierNode {
	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsLoop, "", nil /*node*/, options)
}

// Allocates a new unique name based on the provided text.
func (f *NodeFactory) NewUniqueName(text string) *ast.IdentifierNode {
	return f.NewUniqueNameEx(text, AutoGenerateOptions{})
}

// Allocates a new unique name based on the provided text.
func (f *NodeFactory) NewUniqueNameEx(text string, options AutoGenerateOptions) *ast.IdentifierNode {
	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node*/, options)
}

// Allocates a new unique name based on the provided node.
func (f *NodeFactory) NewGeneratedNameForNode(node *ast.Node) *ast.IdentifierNode {
	return f.NewGeneratedNameForNodeEx(node, AutoGenerateOptions{})
}

// Allocates a new unique name based on the provided node.
func (f *NodeFactory) NewGeneratedNameForNodeEx(node *ast.Node, options AutoGenerateOptions) *ast.IdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	return f.newGeneratedIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
}

func (f *NodeFactory) newGeneratedPrivateIdentifier(kind GeneratedIdentifierFlags, text string, node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	id := AutoGenerateId(nextAutoGenerateId.Add(1))

	if len(text) == 0 {
		switch {
		case node == nil:
			text = fmt.Sprintf("(auto@%d)", id)
		case ast.IsMemberName(node):
			text = node.Text()
		default:
			text = fmt.Sprintf("(generated@%v)", ast.GetNodeId(f.emitContext.getNodeForGeneratedNameWorker(node, id)))
		}
		text = FormatGeneratedName(true /*privateName*/, options.Prefix, text, options.Suffix)
	} else if !strings.HasPrefix(text, "#") {
		panic("First character of private identifier must be #: " + text)
	}

	name := f.NewPrivateIdentifier(text)
	autoGenerate := &AutoGenerateInfo{
		Id:     id,
		Flags:  kind | (options.Flags &^ GeneratedIdentifierFlagsKindMask),
		Prefix: options.Prefix,
		Suffix: options.Suffix,
		Node:   node,
	}
	if f.emitContext.autoGenerate == nil {
		f.emitContext.autoGenerate = make(map[*ast.MemberName]*AutoGenerateInfo)
	}
	f.emitContext.autoGenerate[name] = autoGenerate
	return name
}

// Allocates a new unique private name based on the provided text.
func (f *NodeFactory) NewUniquePrivateName(text string) *ast.PrivateIdentifierNode {
	return f.NewUniquePrivateNameEx(text, AutoGenerateOptions{})
}

// Allocates a new unique private name based on the provided text.
func (f *NodeFactory) NewUniquePrivateNameEx(text string, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	return f.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsUnique, text, nil /*node*/, options)
}

// Allocates a new unique private name based on the provided node.
func (f *NodeFactory) NewGeneratedPrivateNameForNode(node *ast.Node) *ast.PrivateIdentifierNode {
	return f.NewGeneratedPrivateNameForNodeEx(node, AutoGenerateOptions{})
}

// Allocates a new unique private name based on the provided node.
func (f *NodeFactory) NewGeneratedPrivateNameForNodeEx(node *ast.Node, options AutoGenerateOptions) *ast.PrivateIdentifierNode {
	if len(options.Prefix) > 0 || len(options.Suffix) > 0 {
		options.Flags |= GeneratedIdentifierFlagsOptimistic
	}

	return f.newGeneratedPrivateIdentifier(GeneratedIdentifierFlagsNode, "", node, options)
}

// Allocates a new StringLiteral whose source text is derived from the provided node. This is often used to create a
// string representation of an Identifier or NumericLiteral.
func (f *NodeFactory) NewStringLiteralFromNode(textSourceNode *ast.Node) *ast.Node {
	var text string
	switch textSourceNode.Kind {
	case ast.KindIdentifier,
		ast.KindPrivateIdentifier,
		ast.KindJsxNamespacedName,
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindNoSubstitutionTemplateLiteral,
		ast.KindTemplateHead,
		ast.KindTemplateMiddle,
		ast.KindTemplateTail,
		ast.KindRegularExpressionLiteral:
		text = textSourceNode.Text()
	}
	node := f.NewStringLiteral(text)
	if f.emitContext.textSource == nil {
		f.emitContext.textSource = make(map[*ast.StringLiteralNode]*ast.Node)
	}
	f.emitContext.textSource[node] = textSourceNode
	return node
}

//
// Common Tokens
//

func (f *NodeFactory) NewThisExpression() *ast.Expression {
	return f.NewKeywordExpression(ast.KindThisKeyword)
}

func (f *NodeFactory) NewTrueExpression() *ast.Expression {
	return f.NewKeywordExpression(ast.KindTrueKeyword)
}

func (f *NodeFactory) NewFalseExpression() *ast.Expression {
	return f.NewKeywordExpression(ast.KindFalseKeyword)
}

//
// Common Operators
//

func (f *NodeFactory) NewCommaExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(left, f.NewToken(ast.KindCommaToken), right)
}

func (f *NodeFactory) NewAssignmentExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(left, f.NewToken(ast.KindEqualsToken), right)
}

func (f *NodeFactory) NewLogicalORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(left, f.NewToken(ast.KindBarBarToken), right)
}

// func (f *NodeFactory) NewLogicalANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseXORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewStrictEqualityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression

func (f *NodeFactory) NewStrictInequalityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(left, f.NewToken(ast.KindExclamationEqualsEqualsToken), right)
}

//
// Compound Nodes
//

func (f *NodeFactory) NewVoidZeroExpression() *ast.Expression {
	return f.NewVoidExpression(f.NewNumericLiteral("0"))
}

func flattenCommaElement(node *ast.Expression, expressions []*ast.Expression) []*ast.Expression {
	if ast.IsBinaryExpression(node) && ast.NodeIsSynthesized(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
		expressions = flattenCommaElement(node.AsBinaryExpression().Left, expressions)
		expressions = flattenCommaElement(node.AsBinaryExpression().Right, expressions)
	} else {
		expressions = append(expressions, node)
	}
	return expressions
}

func flattenCommaElements(expressions []*ast.Expression) []*ast.Expression {
	var result []*ast.Expression
	for _, expression := range expressions {
		result = flattenCommaElement(expression, result)
	}
	return result
}

// Converts a slice of expressions into a single comma-delimited expression. Returns nil if expressions is nil or empty.
// NOTE: Unlike Strada, the Corsa implementation does not currently use `ast.KindCommaListExpression`.
func (f *NodeFactory) InlineExpressions(expressions []*ast.Expression) *ast.Expression {
	if len(expressions) == 0 {
		return nil
	}
	if len(expressions) == 1 {
		return expressions[0]
	}
	expressions = flattenCommaElements(expressions)
	expression := expressions[0]
	for _, next := range expressions[1:] {
		expression = f.NewCommaExpression(expression, next)
	}
	return expression
}

//
// Utilities
//

// Ensures `"use strict"` is the first statement of a slice of statements.
func (f *NodeFactory) EnsureUseStrict(statements []*ast.Statement) []*ast.Statement {
	for _, statement := range statements {
		if ast.IsPrologueDirective(statement) && statement.AsExpressionStatement().Expression.Text() == "use strict" {
			return statements
		} else {
			break
		}
	}
	useStrictPrologue := f.NewExpressionStatement(f.NewStringLiteral("use strict"))
	statements = append([]*ast.Statement{useStrictPrologue}, statements...)
	return statements
}

// Splits a slice of statements into two parts: standard prologue statements and the rest of the statements
func (f *NodeFactory) SplitStandardPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
	for i, statement := range source {
		if !ast.IsPrologueDirective(statement) {
			return source[:i], source[i:]
		}
	}
	return nil, source
}

// Splits a slice of statements into two parts: custom prologue statements (e.g., with `EFCustomPrologue` set) and the rest of the statements
func (f *NodeFactory) SplitCustomPrologue(source []*ast.Statement) (prologue []*ast.Statement, rest []*ast.Statement) {
	for i, statement := range source {
		if ast.IsPrologueDirective(statement) || f.emitContext.EmitFlags(statement)&EFCustomPrologue == 0 {
			return source[:i], source[i:]
		}
	}
	return nil, source
}

//
// Declaration Names
//

type NameOptions struct {
	AllowComments   bool // indicates whether comments may be emitted for the name.
	AllowSourceMaps bool // indicates whether source maps may be emitted for the name.
}

type AssignedNameOptions struct {
	AllowComments      bool // indicates whether comments may be emitted for the name.
	AllowSourceMaps    bool // indicates whether source maps may be emitted for the name.
	IgnoreAssignedName bool // indicates whether the assigned name of a declaration shouldn't be considered.
}

func (f *NodeFactory) getName(node *ast.Declaration, emitFlags EmitFlags, opts AssignedNameOptions) *ast.IdentifierNode {
	var nodeName *ast.IdentifierNode
	if node != nil {
		if opts.IgnoreAssignedName {
			nodeName = ast.GetNonAssignedNameOfDeclaration(node)
		} else {
			nodeName = ast.GetNameOfDeclaration(node)
		}
	}

	if nodeName != nil {
		name := nodeName.Clone(f)
		if !opts.AllowComments {
			emitFlags |= EFNoComments
		}
		if !opts.AllowSourceMaps {
			emitFlags |= EFNoSourceMap
		}
		f.emitContext.AddEmitFlags(name, emitFlags)
		return name
	}

	return f.NewGeneratedNameForNode(node)
}

// Gets the local name of a declaration. This is primarily used for declarations that can be referred to by name in the
// declaration's immediate scope (classes, enums, namespaces). A local name will *never* be prefixed with a module or
// namespace export modifier like "exports." when emitted as an expression.
func (f *NodeFactory) GetLocalName(node *ast.Declaration) *ast.IdentifierNode {
	return f.GetLocalNameEx(node, AssignedNameOptions{})
}

// Gets the local name of a declaration. This is primarily used for declarations that can be referred to by name in the
// declaration's immediate scope (classes, enums, namespaces). A local name will *never* be prefixed with a module or
// namespace export modifier like "exports." when emitted as an expression.
func (f *NodeFactory) GetLocalNameEx(node *ast.Declaration, opts AssignedNameOptions) *ast.IdentifierNode {
	return f.getName(node, EFLocalName, opts)
}

// Gets the export name of a declaration. This is primarily used for declarations that can be
// referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
// export name will *always* be prefixed with an module or namespace export modifier like
// `"exports."` when emitted as an expression if the name points to an exported symbol.
func (f *NodeFactory) GetExportName(node *ast.Declaration) *ast.IdentifierNode {
	return f.GetExportNameEx(node, AssignedNameOptions{})
}

// Gets the export name of a declaration. This is primarily used for declarations that can be
// referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
// export name will *always* be prefixed with an module or namespace export modifier like
// `"exports."` when emitted as an expression if the name points to an exported symbol.
func (f *NodeFactory) GetExportNameEx(node *ast.Declaration, opts AssignedNameOptions) *ast.IdentifierNode {
	return f.getName(node, EFExportName, opts)
}

// Gets the name of a declaration to use during emit.
func (f *NodeFactory) GetDeclarationName(node *ast.Declaration) *ast.IdentifierNode {
	return f.GetDeclarationNameEx(node, NameOptions{})
}

// Gets the name of a declaration to use during emit.
func (f *NodeFactory) GetDeclarationNameEx(node *ast.Declaration, opts NameOptions) *ast.IdentifierNode {
	return f.getName(node, EFNone, AssignedNameOptions{AllowComments: opts.AllowComments, AllowSourceMaps: opts.AllowSourceMaps})
}

func (f *NodeFactory) GetNamespaceMemberName(ns *ast.IdentifierNode, name *ast.IdentifierNode, opts NameOptions) *ast.IdentifierNode {
	if !f.emitContext.HasAutoGenerateInfo(name) {
		name = name.Clone(f)
	}
	qualifiedName := f.NewPropertyAccessExpression(ns, nil /*questionDotToken*/, name, ast.NodeFlagsNone)
	f.emitContext.AssignCommentAndSourceMapRanges(qualifiedName, name)
	if !opts.AllowComments {
		f.emitContext.AddEmitFlags(qualifiedName, EFNoComments)
	}
	if !opts.AllowSourceMaps {
		f.emitContext.AddEmitFlags(qualifiedName, EFNoSourceMap)
	}
	return qualifiedName
}

//
// Emit Helpers
//

// Allocates a new Identifier representing a reference to a helper function.
func (f *NodeFactory) NewUnscopedHelperName(name string) *ast.IdentifierNode {
	node := f.NewIdentifier(name)
	f.emitContext.SetEmitFlags(node, EFHelperName)
	return node
}

// Allocates a new Call expression to the `__importDefault` helper.
func (f *NodeFactory) NewImportDefaultHelper(expression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(importDefaultHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__importDefault"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__importStar` helper.
func (f *NodeFactory) NewImportStarHelper(expression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(importStarHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__importStar"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__exportStar` helper.
func (f *NodeFactory) NewExportStarHelper(moduleExpression *ast.Expression, exportsExpression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(exportStarHelper)
	f.emitContext.RequestEmitHelper(createBindingHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__exportStar"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{moduleExpression, exportsExpression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__rewriteRelativeImportExtension` helper.
func (f *NodeFactory) NewRewriteRelativeImportExtensionsHelper(firstArgument *ast.Node, preserveJsx bool) *ast.Expression {
	f.emitContext.RequestEmitHelper(rewriteRelativeImportExtensionsHelper)
	var arguments []*ast.Expression
	if preserveJsx {
		arguments = []*ast.Expression{firstArgument, f.NewToken(ast.KindTrueKeyword)}
	} else {
		arguments = []*ast.Expression{firstArgument}
	}
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__rewriteRelativeImportExtension"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(arguments),
		ast.NodeFlagsNone,
	)
}

package printer

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
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
		ast.KindStringLiteral,
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindNoSubstitutionTemplateLiteral,
		ast.KindTemplateHead,
		ast.KindTemplateMiddle,
		ast.KindTemplateTail,
		ast.KindRegularExpressionLiteral:
		text = textSourceNode.Text()
	}
	node := f.NewStringLiteral(text, ast.TokenFlagsNone)
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
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindCommaToken), right)
}

func (f *NodeFactory) NewAssignmentExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindEqualsToken), right)
}

func (f *NodeFactory) NewLogicalORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindBarBarToken), right)
}

func (f *NodeFactory) NewLogicalANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindAmpersandAmpersandToken), right)
}

// func (f *NodeFactory) NewLogicalANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseXORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
// func (f *NodeFactory) NewBitwiseANDExpression(left *ast.Expression, right *ast.Expression) *ast.Expression
func (f *NodeFactory) NewStrictEqualityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindEqualsEqualsEqualsToken), right)
}

func (f *NodeFactory) NewStrictInequalityExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindExclamationEqualsEqualsToken), right)
}

//
// Compound Nodes
//

func (f *NodeFactory) NewVoidZeroExpression() *ast.Expression {
	return f.NewVoidExpression(f.NewNumericLiteral("0", ast.TokenFlagsNone))
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

func (f *NodeFactory) CreateExpressionFromEntityName(node *ast.Node) *ast.Expression {
	if ast.IsQualifiedName(node) {
		left := f.CreateExpressionFromEntityName(node.AsQualifiedName().Left)
		right := node.AsQualifiedName().Right.Clone(f.AsNodeFactory())
		right.Loc = node.AsQualifiedName().Right.Loc
		// TODO(rbuckton): Does this need to be parented?
		right.Parent = node.AsQualifiedName().Right.Parent
		propAccess := f.NewPropertyAccessExpression(left, nil, right, ast.NodeFlagsNone)
		propAccess.Loc = node.Loc
		return propAccess
	}
	res := node.Clone(f.AsNodeFactory())
	res.Loc = node.Loc
	// TODO(rbuckton): Does this need to be parented?
	res.Parent = node.Parent
	return res
}

func (f *NodeFactory) RestoreEnclosingLabel(node *ast.Node, outermostLabeledStatement *ast.LabeledStatement) *ast.Node {
	if outermostLabeledStatement == nil {
		return node
	}
	innerLabel := node
	if ast.IsLabeledStatement(outermostLabeledStatement.Statement) {
		innerLabel = f.RestoreEnclosingLabel(node, outermostLabeledStatement.Statement.AsLabeledStatement())
	}
	return f.UpdateLabeledStatement(
		outermostLabeledStatement,
		outermostLabeledStatement.Label,
		innerLabel,
	)
}

// CreateForOfBindingStatement creates a statement to bind the iteration value.
func (f *NodeFactory) CreateForOfBindingStatement(node *ast.Node, boundValue *ast.Node) *ast.Node {
	if ast.IsVariableDeclarationList(node) {
		firstDeclaration := node.AsVariableDeclarationList().Declarations.Nodes[0]
		updatedDeclaration := f.UpdateVariableDeclaration(
			firstDeclaration.AsVariableDeclaration(),
			firstDeclaration.Name(),
			nil, /*exclamationToken*/
			nil, /*type*/
			boundValue,
		)
		statement := f.NewVariableStatement(
			nil,
			f.UpdateVariableDeclarationList(
				node.AsVariableDeclarationList(),
				f.NewNodeList([]*ast.Node{updatedDeclaration}),
				node.AsVariableDeclarationList().Flags,
			),
		)
		statement.Loc = node.Loc
		return statement
	}
	updatedExpression := f.NewAssignmentExpression(node, boundValue)
	updatedExpression.Loc = node.Loc
	statement := f.NewExpressionStatement(updatedExpression)
	statement.Loc = node.Loc
	return statement
}

func (f *NodeFactory) NewTypeCheck(value *ast.Node, tag string) *ast.Node {
	if tag == "null" {
		return f.NewStrictEqualityExpression(value, f.NewKeywordExpression(ast.KindNullKeyword))
	} else if tag == "undefined" {
		return f.NewStrictEqualityExpression(value, f.NewVoidZeroExpression())
	} else {
		return f.NewStrictEqualityExpression(f.NewTypeOfExpression(value), f.NewStringLiteral(tag, ast.TokenFlagsNone))
	}
}

func (f *NodeFactory) NewMethodCall(object *ast.Node, methodName *ast.Node, argumentsList []*ast.Node) *ast.Node {
	// Preserve the optionality of `object`.
	if ast.IsCallExpression(object) && (object.Flags&ast.NodeFlagsOptionalChain != 0) {
		return f.NewCallExpression(
			f.NewPropertyAccessExpression(object, nil, methodName, ast.NodeFlagsNone),
			nil,
			nil,
			f.NewNodeList(argumentsList),
			ast.NodeFlagsOptionalChain,
		)
	}
	return f.NewCallExpression(
		f.NewPropertyAccessExpression(object, nil, methodName, ast.NodeFlagsNone),
		nil,
		nil,
		f.NewNodeList(argumentsList),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewGlobalMethodCall(globalObjectName string, methodName string, argumentsList []*ast.Node) *ast.Node {
	return f.NewMethodCall(f.NewIdentifier(globalObjectName), f.NewIdentifier(methodName), argumentsList)
}

func (f *NodeFactory) NewFunctionCallCall(target *ast.Expression, thisArg *ast.Expression, argumentsList []*ast.Node) *ast.Node {
	if thisArg == nil {
		panic("Attempted to construct function call call without this argument expression")
	}
	args := append([]*ast.Expression{thisArg}, argumentsList...)
	return f.NewMethodCall(target, f.NewIdentifier("call"), args)
}

func (f *NodeFactory) NewArraySliceCall(array *ast.Expression, start int) *ast.Node {
	var args []*ast.Node
	if start != 0 {
		args = append(args, f.NewNumericLiteral(strconv.Itoa(start), ast.TokenFlagsNone))
	}
	return f.NewMethodCall(array, f.NewIdentifier("slice"), args)
}

// Determines whether a node is a parenthesized expression that can be ignored when recreating outer expressions.
//
// A parenthesized expression can be ignored when all of the following are true:
//
// - It's `pos` and `end` are not -1
// - It does not have a custom source map range
// - It does not have a custom comment range
// - It does not have synthetic leading or trailing comments
//
// If an outermost parenthesized expression is ignored, but the containing expression requires a parentheses around
// the expression to maintain precedence, a new parenthesized expression should be created automatically when
// the containing expression is created/updated.
func (f *NodeFactory) isIgnorableParen(node *ast.Expression) bool {
	return ast.IsParenthesizedExpression(node) &&
		ast.NodeIsSynthesized(node) &&
		ast.RangeIsSynthesized(f.emitContext.SourceMapRange(node)) &&
		ast.RangeIsSynthesized(f.emitContext.CommentRange(node)) // &&
	// len(emitContext.SyntheticLeadingComments(node)) == 0 &&
	// len(emitContext.SyntheticTrailingComments(node)) == 0
}

func (f *NodeFactory) updateOuterExpression(outerExpression *ast.Expression /*OuterExpression*/, expression *ast.Expression) *ast.Expression {
	switch outerExpression.Kind {
	case ast.KindParenthesizedExpression:
		return f.UpdateParenthesizedExpression(outerExpression.AsParenthesizedExpression(), expression)
	case ast.KindTypeAssertionExpression:
		return f.UpdateTypeAssertion(outerExpression.AsTypeAssertion(), outerExpression.Type(), expression)
	case ast.KindAsExpression:
		return f.UpdateAsExpression(outerExpression.AsAsExpression(), expression, outerExpression.Type())
	case ast.KindSatisfiesExpression:
		return f.UpdateSatisfiesExpression(outerExpression.AsSatisfiesExpression(), expression, outerExpression.Type())
	case ast.KindNonNullExpression:
		return f.UpdateNonNullExpression(outerExpression.AsNonNullExpression(), expression, outerExpression.Flags)
	case ast.KindExpressionWithTypeArguments:
		return f.UpdateExpressionWithTypeArguments(outerExpression.AsExpressionWithTypeArguments(), expression, outerExpression.TypeArgumentList())
	case ast.KindPartiallyEmittedExpression:
		return f.UpdatePartiallyEmittedExpression(outerExpression.AsPartiallyEmittedExpression(), expression)
	default:
		panic(fmt.Sprintf("Unexpected outer expression kind: %s", outerExpression.Kind))
	}
}

func (f *NodeFactory) RestoreOuterExpressions(outerExpression *ast.Expression, innerExpression *ast.Expression, kinds ast.OuterExpressionKinds) *ast.Expression {
	if outerExpression != nil && ast.IsOuterExpression(outerExpression, kinds) && !f.isIgnorableParen(outerExpression) {
		return f.updateOuterExpression(
			outerExpression,
			f.RestoreOuterExpressions(outerExpression.Expression(), innerExpression, ast.OEKAll),
		)
	}
	return innerExpression
}

// Ensures `"use strict"` is the first statement of a slice of statements.
func (f *NodeFactory) EnsureUseStrict(statements []*ast.Statement) []*ast.Statement {
	for _, statement := range statements {
		if ast.IsPrologueDirective(statement) && statement.Expression().Text() == "use strict" {
			return statements
		} else {
			break
		}
	}
	useStrictPrologue := f.NewExpressionStatement(f.NewStringLiteral("use strict", ast.TokenFlagsNone))
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
	return source, nil
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

// Gets the export name of a declaration for use in expressions.
//
// An export name will *always* be prefixed with a module or namespace export modifier like
// `"exports."` when emitted as an expression if the name points to an exported symbol.
func (f *NodeFactory) GetExternalModuleOrNamespaceExportName(ns *ast.IdentifierNode, node *ast.Declaration, allowComments bool, allowSourceMaps bool) *ast.Node {
	if ns != nil && ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
		nameOpts := NameOptions{AllowComments: allowComments, AllowSourceMaps: allowSourceMaps}
		return f.GetNamespaceMemberName(ns, f.GetDeclarationNameEx(node, nameOpts), nameOpts)
	}
	return f.GetExportNameEx(node, AssignedNameOptions{AllowComments: allowComments, AllowSourceMaps: allowSourceMaps})
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

// TypeScript Helpers

func (f *NodeFactory) NewDecorateHelper(decoratorExpressions []*ast.Node, target *ast.Node, memberName *ast.Node, descriptor *ast.Node) *ast.Expression {
	f.emitContext.RequestEmitHelper(decorateHelper)

	var argumentsArray []*ast.Node
	argumentsArray = append(argumentsArray, f.NewArrayLiteralExpression(f.NewNodeList(decoratorExpressions), true))
	argumentsArray = append(argumentsArray, target)
	if memberName != nil {
		argumentsArray = append(argumentsArray, memberName)
		if descriptor != nil {
			argumentsArray = append(argumentsArray, descriptor)
		}
	}

	return f.NewCallExpression(
		f.NewUnscopedHelperName("__decorate"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(argumentsArray),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewMetadataHelper(metadataKey string, metadataValue *ast.Node) *ast.Node {
	f.emitContext.RequestEmitHelper(metadataHelper)

	return f.NewCallExpression(
		f.NewUnscopedHelperName("__metadata"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Node{
			f.NewStringLiteral(metadataKey, ast.TokenFlagsNone),
			metadataValue,
		}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewParamHelper(expression *ast.Node, parameterOffset int, location core.TextRange) *ast.Expression {
	f.emitContext.RequestEmitHelper(paramHelper)
	helper := f.NewCallExpression(
		f.NewUnscopedHelperName("__param"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{f.NewNumericLiteral(strconv.Itoa(parameterOffset), ast.TokenFlagsNone), expression}),
		ast.NodeFlagsNone,
	)
	helper.Loc = location
	return helper
}

// ESNext Helpers

func (f *NodeFactory) NewAddDisposableResourceHelper(envBinding *ast.Expression, value *ast.Expression, async bool) *ast.Expression {
	f.emitContext.RequestEmitHelper(addDisposableResourceHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__addDisposableResource"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{envBinding, value, f.NewKeywordExpression(core.IfElse(async, ast.KindTrueKeyword, ast.KindFalseKeyword))}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewDisposeResourcesHelper(envBinding *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(disposeResourcesHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__disposeResources"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{envBinding}),
		ast.NodeFlagsNone,
	)
}

// Class Fields Helpers

type PrivateIdentifierKind string

const (
	PrivateIdentifierKindField         PrivateIdentifierKind = "f"
	PrivateIdentifierKindMethod        PrivateIdentifierKind = "m"
	PrivateIdentifierKindAccessor      PrivateIdentifierKind = "a"
	PrivateIdentifierKindUntransformed PrivateIdentifierKind = "untransformed"
)

func (f *NodeFactory) NewClassPrivateFieldGetHelper(receiver *ast.Expression, state *ast.IdentifierNode, kind PrivateIdentifierKind, fn *ast.IdentifierNode) *ast.Expression {
	f.emitContext.RequestEmitHelper(classPrivateFieldGetHelper)
	var args []*ast.Node
	if fn == nil {
		args = []*ast.Node{receiver, state, f.NewStringLiteral(string(kind), ast.TokenFlagsNone)}
	} else {
		args = []*ast.Node{receiver, state, f.NewStringLiteral(string(kind), ast.TokenFlagsNone), fn}
	}
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__classPrivateFieldGet"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(args),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewClassPrivateFieldSetHelper(receiver *ast.Expression, state *ast.IdentifierNode, value *ast.Expression, kind PrivateIdentifierKind, fn *ast.IdentifierNode) *ast.Expression {
	f.emitContext.RequestEmitHelper(classPrivateFieldSetHelper)
	var args []*ast.Node
	if fn == nil {
		args = []*ast.Node{receiver, state, value, f.NewStringLiteral(string(kind), ast.TokenFlagsNone)}
	} else {
		args = []*ast.Node{receiver, state, value, f.NewStringLiteral(string(kind), ast.TokenFlagsNone), fn}
	}
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__classPrivateFieldSet"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(args),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewClassPrivateFieldInHelper(state *ast.IdentifierNode, receiver *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(classPrivateFieldInHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__classPrivateFieldIn"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{state, receiver}),
		ast.NodeFlagsNone,
	)
}

// Creates `Object.defineProperty(target, name, descriptor)`.
func (f *NodeFactory) NewObjectDefinePropertyCall(target *ast.Expression, name *ast.Expression, descriptor *ast.Expression) *ast.Expression {
	return f.NewCallExpression(
		f.NewPropertyAccessExpression(
			f.NewIdentifier("Object"),
			nil,
			f.NewIdentifier("defineProperty"),
			ast.NodeFlagsNone,
		),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{target, name, descriptor}),
		ast.NodeFlagsNone,
	)
}

// Creates `Reflect.get(target, propertyKey, receiver)`.
func (f *NodeFactory) NewReflectGetCall(target *ast.Expression, propertyKey *ast.Expression, receiver *ast.Expression) *ast.Expression {
	return f.NewCallExpression(
		f.NewPropertyAccessExpression(
			f.NewIdentifier("Reflect"),
			nil,
			f.NewIdentifier("get"),
			ast.NodeFlagsNone,
		),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{target, propertyKey, receiver}),
		ast.NodeFlagsNone,
	)
}

// Creates `Reflect.set(target, propertyKey, value, receiver)`.
func (f *NodeFactory) NewReflectSetCall(target *ast.Expression, propertyKey *ast.Expression, value *ast.Expression, receiver *ast.Expression) *ast.Expression {
	return f.NewCallExpression(
		f.NewPropertyAccessExpression(
			f.NewIdentifier("Reflect"),
			nil,
			f.NewIdentifier("set"),
			ast.NodeFlagsNone,
		),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{target, propertyKey, value, receiver}),
		ast.NodeFlagsNone,
	)
}

// Creates `target.bind(thisArg, ...args)`.
func (f *NodeFactory) NewFunctionBindCall(target *ast.Expression, thisArg *ast.Expression, argumentsList []*ast.Node) *ast.Expression {
	args := make([]*ast.Node, 0, 1+len(argumentsList))
	args = append(args, thisArg)
	args = append(args, argumentsList...)
	return f.NewMethodCall(target, f.NewIdentifier("bind"), args)
}

// Creates `(() => { ...statements })()` — an immediately invoked arrow function.
func (f *NodeFactory) NewImmediatelyInvokedArrowFunction(statements []*ast.Statement) *ast.Expression {
	arrow := f.NewArrowFunction(
		nil,                          /*modifiers*/
		nil,                          /*typeParameters*/
		f.NewNodeList([]*ast.Node{}), /*parameters*/
		nil,                          /*returnType*/
		nil,                          /*fullSignature*/
		f.NewToken(ast.KindEqualsGreaterThanToken), /*equalsGreaterThanToken*/
		f.NewBlock(f.NewNodeList(statements), true),
	)
	return f.NewCallExpression(
		f.NewParenthesizedExpression(arrow),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Node{}),
		ast.NodeFlagsNone,
	)
}

// Creates `export default <expression>;`.
func (f *NodeFactory) NewExportDefault(expression *ast.Expression) *ast.Statement {
	return f.NewExportAssignment(nil, false, nil, expression)
}

// Creates `export { <name> };`.
func (f *NodeFactory) NewExternalModuleExport(name *ast.IdentifierNode) *ast.Statement {
	specifier := f.NewExportSpecifier(false, nil, name)
	namedExports := f.NewNamedExports(f.NewNodeList([]*ast.Node{specifier}))
	return f.NewExportDeclaration(nil, false, namedExports, nil, nil)
}

// ES2018 Helpers
// Chains a sequence of expressions using the __assign helper or Object.assign if available in the target
func (f *NodeFactory) NewAssignHelper(attributesSegments []*ast.Expression, scriptTarget core.ScriptTarget) *ast.Expression {
	return f.NewCallExpression(f.NewPropertyAccessExpression(f.NewIdentifier("Object"), nil, f.NewIdentifier("assign"), ast.NodeFlagsNone), nil, nil, f.NewNodeList(attributesSegments), ast.NodeFlagsNone)
}

// ES2018 Destructuring Helpers

func (f *NodeFactory) NewRestHelper(value *ast.Expression, elements []*ast.Node, computedTempVariables []*ast.Node, location core.TextRange) *ast.Expression {
	f.emitContext.RequestEmitHelper(restHelper)
	var propertyNames []*ast.Node
	computedTempVariableOffset := 0
	for i, element := range elements {
		if i == len(elements)-1 {
			break
		}
		propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
		if propertyName != nil {
			if ast.IsComputedPropertyName(propertyName) {
				debug.Assert(computedTempVariables != nil, "Encountered computed property name but 'computedTempVariables' argument was not provided.")
				temp := computedTempVariables[computedTempVariableOffset]
				computedTempVariableOffset++
				// typeof _tmp === "symbol" ? _tmp : _tmp + ""
				propertyNames = append(propertyNames, f.NewConditionalExpression(
					f.NewTypeCheck(temp, "symbol"),
					f.NewToken(ast.KindQuestionToken),
					temp,
					f.NewToken(ast.KindColonToken),
					f.NewBinaryExpression(nil, temp, nil, f.NewToken(ast.KindPlusToken), f.NewStringLiteral("", ast.TokenFlagsNone)),
				))
			} else {
				propertyNames = append(propertyNames, f.NewStringLiteralFromNode(propertyName))
			}
		}
	}
	propNames := f.NewArrayLiteralExpression(f.NewNodeList(propertyNames), false)
	propNames.Loc = location
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__rest"),
		nil,
		nil,
		f.NewNodeList([]*ast.Node{
			value,
			propNames,
		}),
		ast.NodeFlagsNone,
	)
}

// ES2018 Helpers

// Allocates a new Call expression to the `__await` helper.
func (f *NodeFactory) NewAwaitHelper(expression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(awaitHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__await"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__asyncGenerator` helper.
func (f *NodeFactory) NewAsyncGeneratorHelper(
	generatorFunc *ast.Expression,
	hasLexicalThis bool,
) *ast.Expression {
	f.emitContext.RequestEmitHelper(awaitHelper)
	f.emitContext.RequestEmitHelper(asyncGeneratorHelper)

	// Mark this node as originally an async function body
	f.emitContext.AddEmitFlags(generatorFunc, EFAsyncFunctionBody|EFReuseTempVariableScope)

	var thisArg *ast.Expression
	if hasLexicalThis {
		thisArg = f.NewKeywordExpression(ast.KindThisKeyword)
	} else {
		thisArg = f.NewVoidZeroExpression()
	}

	return f.NewCallExpression(
		f.NewUnscopedHelperName("__asyncGenerator"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{
			thisArg,
			f.NewIdentifier("arguments"),
			generatorFunc,
		}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__asyncDelegator` helper.
func (f *NodeFactory) NewAsyncDelegatorHelper(expression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(awaitHelper)
	f.emitContext.RequestEmitHelper(asyncDelegatorHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__asyncDelegator"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// Allocates a new Call expression to the `__asyncValues` helper.
func (f *NodeFactory) NewAsyncValuesHelper(expression *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(asyncValuesHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__asyncValues"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expression}),
		ast.NodeFlagsNone,
	)
}

// !!! ES2017 Helpers

// Allocates a new Call expression to the `__awaiter` helper.
func (f *NodeFactory) NewAwaiterHelper(
	hasLexicalThis bool,
	argumentsExpression *ast.Expression,
	parameters *ast.NodeList,
	body *ast.BlockNode,
) *ast.Expression {
	f.emitContext.RequestEmitHelper(awaiterHelper)

	var params *ast.NodeList
	if parameters != nil {
		params = parameters
	} else {
		params = f.NewNodeList([]*ast.Node{})
	}

	generatorFunc := f.NewFunctionExpression(
		nil, /*modifiers*/
		f.NewToken(ast.KindAsteriskToken),
		nil, /*name*/
		nil, /*typeParameters*/
		params,
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)

	// Mark this node as originally an async function body
	f.emitContext.AddEmitFlags(generatorFunc, EFAsyncFunctionBody|EFReuseTempVariableScope)

	var thisArg *ast.Expression
	if hasLexicalThis {
		thisArg = f.NewKeywordExpression(ast.KindThisKeyword)
	} else {
		thisArg = f.NewVoidZeroExpression()
	}

	var argsArg *ast.Expression
	if argumentsExpression != nil {
		argsArg = argumentsExpression
	} else {
		argsArg = f.NewVoidZeroExpression()
	}

	return f.NewCallExpression(
		f.NewUnscopedHelperName("__awaiter"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{
			thisArg,
			argsArg,
			f.NewVoidZeroExpression(),
			generatorFunc,
		}),
		ast.NodeFlagsNone,
	)
}

// ES Decorator Helpers

func (f *NodeFactory) NewESDecorateClassContextObject(nameExpr *ast.Expression, metadata *ast.IdentifierNode) *ast.Expression {
	props := []*ast.Node{
		f.NewPropertyAssignment(nil, f.NewIdentifier("kind"), nil, nil, f.NewStringLiteral("class", 0)),
		f.NewPropertyAssignment(nil, f.NewIdentifier("name"), nil, nil, nameExpr),
		f.NewPropertyAssignment(nil, f.NewIdentifier("metadata"), nil, nil, metadata),
	}
	return f.NewObjectLiteralExpression(f.NewNodeList(props), false)
}

func (f *NodeFactory) NewESDecorateClassElementAccessGetMethod(
	nameComputed bool,
	nameExpr *ast.Expression,
) *ast.Node {
	var accessor *ast.Expression
	if nameComputed {
		accessor = f.NewElementAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
	} else {
		accessor = f.NewPropertyAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
	}

	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)

	arrow := f.NewArrowFunction(
		nil, nil,
		f.NewNodeList([]*ast.Node{objParam}),
		nil, nil,
		f.NewToken(ast.KindEqualsGreaterThanToken),
		accessor,
	)

	return f.NewPropertyAssignment(nil, f.NewIdentifier("get"), nil, nil, arrow)
}

func (f *NodeFactory) NewESDecorateClassElementAccessSetMethod(
	nameComputed bool,
	nameExpr *ast.Expression,
) *ast.Node {
	var accessor *ast.Expression
	if nameComputed {
		accessor = f.NewElementAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
	} else {
		accessor = f.NewPropertyAccessExpression(f.NewIdentifier("obj"), nil, nameExpr, ast.NodeFlagsNone)
	}

	assignment := f.NewAssignmentExpression(accessor, f.NewIdentifier("value"))
	stmt := f.NewExpressionStatement(assignment)
	body := f.NewBlock(f.NewNodeList([]*ast.Node{stmt}), false)

	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)
	valueParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("value"), nil, nil, nil)

	arrow := f.NewArrowFunction(
		nil, nil,
		f.NewNodeList([]*ast.Node{objParam, valueParam}),
		nil, nil,
		f.NewToken(ast.KindEqualsGreaterThanToken),
		body,
	)

	return f.NewPropertyAssignment(nil, f.NewIdentifier("set"), nil, nil, arrow)
}

func (f *NodeFactory) NewESDecorateClassElementAccessHasMethod(
	nameComputed bool,
	nameExpr *ast.Expression,
) *ast.Node {
	// The property name for the "in" expression
	var propertyName *ast.Expression
	if !nameComputed && nameExpr != nil && ast.IsIdentifier(nameExpr) {
		propertyName = f.NewStringLiteralFromNode(nameExpr)
	} else {
		propertyName = nameExpr
	}

	objParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("obj"), nil, nil, nil)
	inExpr := f.NewBinaryExpression(nil, propertyName, nil, f.NewToken(ast.KindInKeyword), f.NewIdentifier("obj"))

	arrow := f.NewArrowFunction(
		nil, nil,
		f.NewNodeList([]*ast.Node{objParam}),
		nil, nil,
		f.NewToken(ast.KindEqualsGreaterThanToken),
		inExpr,
	)

	return f.NewPropertyAssignment(nil, f.NewIdentifier("has"), nil, nil, arrow)
}

// Creates the "access" object for a class element decorator context.
//
// 15.7.3 CreateDecoratorAccessObject (kind, name)
//
//  2. If _kind_ is ~field~, ~method~, ~accessor~, or ~getter~, then
//     a. Let _getAccess_ be a new Abstract Closure with parameters (_object_) that captures _kind_ and _name_ ...
//     b. Perform ! CreateDataPropertyOrThrow(_access_, "get", _getAccess_).
//  3. If _kind_ is ~field~, ~accessor~, or ~setter~, then
//     a. Let _setAccess_ be a new Abstract Closure with parameters (_object_, _value_) that captures _kind_ and _name_ ...
//     b. Perform ! CreateDataPropertyOrThrow(_access_, "set", _setAccess_).
func (f *NodeFactory) NewESDecorateClassElementAccessObject(
	nameComputed bool,
	nameExpr *ast.Expression,
	hasGet bool,
	hasSet bool,
) *ast.Expression {
	accessProps := []*ast.Node{}

	// "has" method: obj => name in obj
	accessProps = append(accessProps, f.NewESDecorateClassElementAccessHasMethod(nameComputed, nameExpr))

	// "get" method: obj => obj.name or obj => obj[name]
	if hasGet {
		accessProps = append(accessProps, f.NewESDecorateClassElementAccessGetMethod(nameComputed, nameExpr))
	}

	// "set" method: (obj, value) => { obj.name = value; } or (obj, value) => { obj[name] = value; }
	if hasSet {
		accessProps = append(accessProps, f.NewESDecorateClassElementAccessSetMethod(nameComputed, nameExpr))
	}

	return f.NewObjectLiteralExpression(f.NewNodeList(accessProps), false)
}

func (f *NodeFactory) NewESDecorateClassElementContextObject(
	kind string,
	nameComputed bool,
	nameExpr *ast.Expression,
	isStatic bool,
	isPrivate bool,
	hasGet bool,
	hasSet bool,
	metadata *ast.IdentifierNode,
) *ast.Expression {
	// Build the name value for the context's "name" property
	var nameValue *ast.Expression
	if !nameComputed && nameExpr != nil && (ast.IsPrivateIdentifier(nameExpr) || ast.IsIdentifier(nameExpr)) {
		nameValue = f.NewStringLiteralFromNode(nameExpr)
	} else {
		nameValue = nameExpr
	}

	// Build the access object with has/get/set arrow functions
	accessObj := f.NewESDecorateClassElementAccessObject(nameComputed, nameExpr, hasGet, hasSet)

	var staticExpr *ast.Node
	if isStatic {
		staticExpr = f.NewTrueExpression()
	} else {
		staticExpr = f.NewFalseExpression()
	}

	var privateExpr *ast.Node
	if isPrivate {
		privateExpr = f.NewTrueExpression()
	} else {
		privateExpr = f.NewFalseExpression()
	}

	props := []*ast.Node{
		f.NewPropertyAssignment(nil, f.NewIdentifier("kind"), nil, nil, f.NewStringLiteral(kind, 0)),
		f.NewPropertyAssignment(nil, f.NewIdentifier("name"), nil, nil, nameValue),
		f.NewPropertyAssignment(nil, f.NewIdentifier("static"), nil, nil, staticExpr),
		f.NewPropertyAssignment(nil, f.NewIdentifier("private"), nil, nil, privateExpr),
		f.NewPropertyAssignment(nil, f.NewIdentifier("access"), nil, nil, accessObj),
		f.NewPropertyAssignment(nil, f.NewIdentifier("metadata"), nil, nil, metadata),
	}
	return f.NewObjectLiteralExpression(f.NewNodeList(props), false)
}

func (f *NodeFactory) NewESDecorateHelper(ctor *ast.Expression, descriptorIn *ast.Expression, decorators *ast.Expression, contextIn *ast.Expression, initializers *ast.Expression, extraInitializers *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(esDecorateHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__esDecorate"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewRunInitializersHelper(thisArg *ast.Expression, initializers *ast.Expression, value *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(runInitializersHelper)
	var arguments []*ast.Expression
	if value != nil {
		arguments = []*ast.Expression{thisArg, initializers, value}
	} else {
		arguments = []*ast.Expression{thisArg, initializers}
	}
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__runInitializers"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(arguments),
		ast.NodeFlagsNone,
	)
}

// ES2015 Helpers

func (f *NodeFactory) NewTemplateObjectHelper(cookedArray *ast.Expression, rawArray *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(makeTemplateObjectHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__makeTemplateObject"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{cookedArray, rawArray}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewPropKeyHelper(expr *ast.Expression) *ast.Expression {
	f.emitContext.RequestEmitHelper(propKeyHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__propKey"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{expr}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewSetFunctionNameHelper(fn *ast.Expression, name *ast.Expression, prefix string) *ast.Expression {
	f.emitContext.RequestEmitHelper(setFunctionNameHelper)
	var arguments []*ast.Expression
	if len(prefix) > 0 {
		arguments = []*ast.Expression{fn, name, f.NewStringLiteral(prefix, ast.TokenFlagsNone)}
	} else {
		arguments = []*ast.Expression{fn, name}
	}
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__setFunctionName"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList(arguments),
		ast.NodeFlagsNone,
	)
}

// ES Module Helpers

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
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__exportStar"),
		nil, /*questionDotToken*/
		nil, /*typeArguments*/
		f.NewNodeList([]*ast.Expression{moduleExpression, exportsExpression}),
		ast.NodeFlagsNone,
	)
}

func (f *NodeFactory) NewAssignmentTargetWrapper(paramName *ast.IdentifierNode, expression *ast.Expression) *ast.Node {
	setAccessor := f.NewSetAccessorDeclaration(
		nil, /*modifiers*/
		f.NewIdentifier("value"),
		nil, /*typeParameters*/
		f.NewNodeList([]*ast.Node{
			f.NewParameterDeclaration(nil, nil, paramName, nil, nil, nil),
		}),
		nil, /*returnType*/
		nil, /*fullSignature*/
		f.NewBlock(f.NewNodeList([]*ast.Node{
			f.NewExpressionStatement(expression),
		}), false),
	)
	objLiteral := f.NewObjectLiteralExpression(f.NewNodeList([]*ast.Node{setAccessor}), false)
	// Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
	return f.NewPropertyAccessExpression(
		f.NewParenthesizedExpression(objLiteral),
		nil, /*questionDotToken*/
		f.NewIdentifier("value"),
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

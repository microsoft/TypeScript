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
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindCommaToken), right)
}

func (f *NodeFactory) NewAssignmentExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindEqualsToken), right)
}

func (f *NodeFactory) NewLogicalORExpression(left *ast.Expression, right *ast.Expression) *ast.Expression {
	return f.NewBinaryExpression(nil /*modifiers*/, left, nil /*typeNode*/, f.NewToken(ast.KindBarBarToken), right)
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

func (f *NodeFactory) NewTypeCheck(value *ast.Node, tag string) *ast.Node {
	if tag == "null" {
		return f.NewStrictEqualityExpression(value, f.NewKeywordExpression(ast.KindNullKeyword))
	} else if tag == "undefined" {
		return f.NewStrictEqualityExpression(value, f.NewVoidZeroExpression())
	} else {
		return f.NewStrictEqualityExpression(f.NewTypeOfExpression(value), f.NewStringLiteral(tag))
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
		args = append(args, f.NewNumericLiteral(strconv.Itoa(start)))
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
		return f.UpdateNonNullExpression(outerExpression.AsNonNullExpression(), expression)
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

// !!! TypeScript Helpers

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

// !!! Class Fields Helpers
// !!! ES2018 Helpers
// Chains a sequence of expressions using the __assign helper or Object.assign if available in the target
func (f *NodeFactory) NewAssignHelper(attributesSegments []*ast.Expression, scriptTarget core.ScriptTarget) *ast.Expression {
	if scriptTarget >= core.ScriptTargetES2015 {
		return f.NewCallExpression(f.NewPropertyAccessExpression(f.NewIdentifier("Object"), nil, f.NewIdentifier("assign"), ast.NodeFlagsNone), nil, nil, f.NewNodeList(attributesSegments), ast.NodeFlagsNone)
	}
	f.emitContext.RequestEmitHelper(assignHelper)
	return f.NewCallExpression(
		f.NewUnscopedHelperName("__assign"),
		nil,
		nil,
		f.NewNodeList(attributesSegments),
		ast.NodeFlagsNone,
	)
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
				debug.AssertIsDefined(computedTempVariables, "Encountered computed property name but 'computedTempVariables' argument was not provided.")
				temp := computedTempVariables[computedTempVariableOffset]
				computedTempVariableOffset++
				// typeof _tmp === "symbol" ? _tmp : _tmp + ""
				propertyNames = append(propertyNames, f.NewConditionalExpression(
					f.NewTypeCheck(temp, "symbol"),
					f.NewToken(ast.KindQuestionToken),
					temp,
					f.NewToken(ast.KindColonToken),
					f.NewBinaryExpression(nil, temp, nil, f.NewToken(ast.KindPlusToken), f.NewStringLiteral("")),
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

// !!! ES2017 Helpers

// ES2015 Helpers

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
		arguments = []*ast.Expression{fn, name, f.NewStringLiteral(prefix)}
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

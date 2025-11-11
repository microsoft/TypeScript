package estransforms

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
)

/**
 * Gets whether a node is a `static {}` block containing only a single call to the `__setFunctionName` helper where that
 * call's second argument is the value stored in the `assignedName` property of the block's `EmitNode`.
 * @internal
 */
func isClassNamedEvaluationHelperBlock(emitContext *printer.EmitContext, node *ast.Node) bool {
	if !ast.IsClassStaticBlockDeclaration(node) || len(node.AsClassStaticBlockDeclaration().Body.Statements()) != 1 {
		return false
	}

	statement := node.AsClassStaticBlockDeclaration().Body.Statements()[0]
	if ast.IsExpressionStatement(statement) {
		expression := statement.Expression()
		if emitContext.IsCallToHelper(expression, "__setFunctionName") {
			arguments := expression.AsCallExpression().Arguments
			return len(arguments.Nodes) >= 2 &&
				arguments.Nodes[1] == emitContext.AssignedName(node.AsNode())
		}
	}
	return false
}

/**
 * Gets whether a `ClassLikeDeclaration` has a `static {}` block containing only a single call to the
 * `__setFunctionName` helper.
 * @internal
 */
func classHasExplicitlyAssignedName(emitContext *printer.EmitContext, node *ast.ClassLikeDeclaration) bool {
	if assignedName := emitContext.AssignedName(node); assignedName != nil {
		for _, member := range node.Members() {
			if isClassNamedEvaluationHelperBlock(emitContext, member) {
				return true
			}
		}
	}
	return false
}

/**
 * Gets whether a `ClassLikeDeclaration` has a declared name or contains a `static {}` block containing only a single
 * call to the `__setFunctionName` helper.
 * @internal
 */
func classHasDeclaredOrExplicitlyAssignedName(emitContext *printer.EmitContext, node *ast.ClassLikeDeclaration) bool {
	return node.Name() != nil || classHasExplicitlyAssignedName(emitContext, node)
}

// Indicates whether a property name is the special `__proto__` property.
// Per the ECMA-262 spec, this only matters for property assignments whose name is
// the Identifier `__proto__`, or the string literal `"__proto__"`, but not for
// computed property names.
func isProtoSetter(node *ast.PropertyName) bool {
	return ast.IsIdentifier(node) || ast.IsStringLiteral(node) && node.Text() == "__proto__"
}

type anonymousFunctionDefinition = ast.Node // ClassExpression | FunctionExpression | ArrowFunction

// Indicates whether an expression is an anonymous function definition.
//
// See https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
func isAnonymousFunctionDefinition(emitContext *printer.EmitContext, node *ast.Expression, cb func(*anonymousFunctionDefinition) bool) bool {
	node = ast.SkipOuterExpressions(node, ast.OEKAll)
	switch node.Kind {
	case ast.KindClassExpression:
		if classHasDeclaredOrExplicitlyAssignedName(emitContext, node) {
			return false
		}
		break
	case ast.KindFunctionExpression:
		if node.AsFunctionExpression().Name() != nil {
			return false
		}
		break
	case ast.KindArrowFunction:
		break
	default:
		return false
	}
	if cb != nil {
		return cb(node)
	}
	return true
}

// Indicates whether a node is a potential source of an assigned name for a class, function, or arrow function.
func isNamedEvaluationSource(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindPropertyAssignment:
		return !isProtoSetter(node.AsPropertyAssignment().Name())
	case ast.KindShorthandPropertyAssignment:
		return node.AsShorthandPropertyAssignment().ObjectAssignmentInitializer != nil
	case ast.KindVariableDeclaration:
		return ast.IsIdentifier(node.AsVariableDeclaration().Name()) && node.Initializer() != nil
	case ast.KindParameter:
		return ast.IsIdentifier(node.AsParameterDeclaration().Name()) && node.Initializer() != nil && node.AsParameterDeclaration().DotDotDotToken == nil
	case ast.KindBindingElement:
		return ast.IsIdentifier(node.AsBindingElement().Name()) && node.Initializer() != nil && node.AsBindingElement().DotDotDotToken == nil
	case ast.KindPropertyDeclaration:
		return node.Initializer() != nil
	case ast.KindBinaryExpression:
		switch node.AsBinaryExpression().OperatorToken.Kind {
		case ast.KindEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindBarBarEqualsToken, ast.KindQuestionQuestionEqualsToken:
			return ast.IsIdentifier(node.AsBinaryExpression().Left)
		}
		break
	case ast.KindExportAssignment:
		return true
	}
	return false
}

func isNamedEvaluation(emitContext *printer.EmitContext, node *ast.Node) bool {
	return isNamedEvaluationAnd(emitContext, node, nil)
}

func isNamedEvaluationAnd(emitContext *printer.EmitContext, node *ast.Node, cb func(*anonymousFunctionDefinition) bool) bool {
	if !isNamedEvaluationSource(node) {
		return false
	}
	switch node.Kind {
	case ast.KindShorthandPropertyAssignment:
		return isAnonymousFunctionDefinition(emitContext, node.AsShorthandPropertyAssignment().ObjectAssignmentInitializer, cb)
	case ast.KindPropertyAssignment, ast.KindVariableDeclaration, ast.KindParameter, ast.KindBindingElement, ast.KindPropertyDeclaration:
		return isAnonymousFunctionDefinition(emitContext, node.Initializer(), cb)
	case ast.KindBinaryExpression:
		return isAnonymousFunctionDefinition(emitContext, node.AsBinaryExpression().Right, cb)
	case ast.KindExportAssignment:
		return isAnonymousFunctionDefinition(emitContext, node.Expression(), cb)
	default:
		panic("Unhandled case in isNamedEvaluation")
	}
}

// Gets a string literal to use as the assigned name of an anonymous class or function declaration.
func getAssignedNameOfIdentifier(emitContext *printer.EmitContext, name *ast.IdentifierNode, expression *ast.Node /*WrappedExpression<AnonymousFunctionDefinition>*/) *ast.StringLiteralNode {
	original := emitContext.MostOriginal(ast.SkipOuterExpressions(expression, ast.OEKAll))
	if (ast.IsClassDeclaration(original) || ast.IsFunctionDeclaration(original)) &&
		original.Name() == nil && ast.HasSyntacticModifier(original, ast.ModifierFlagsDefault) {
		return emitContext.Factory.NewStringLiteral("default")
	}
	return emitContext.Factory.NewStringLiteralFromNode(name)
}

func getAssignedNameOfPropertyName(emitContext *printer.EmitContext, name *ast.PropertyName, assignedNameText string) (assignedName *ast.Expression, updatedName *ast.PropertyName) {
	factory := emitContext.Factory
	if len(assignedNameText) > 0 {
		assignedName := factory.NewStringLiteral(assignedNameText)
		return assignedName, name
	}

	if ast.IsPropertyNameLiteral(name) || ast.IsPrivateIdentifier(name) {
		assignedName := factory.NewStringLiteralFromNode(name)
		return assignedName, name
	}

	expression := name.Expression()
	if ast.IsPropertyNameLiteral(expression) && !ast.IsIdentifier(expression) {
		assignedName := factory.NewStringLiteralFromNode(expression)
		return assignedName, name
	}

	if !ast.IsComputedPropertyName(expression) {
		panic("Expected computed property name")
	}

	assignedName = factory.NewGeneratedNameForNode(name)
	emitContext.AddVariableDeclaration(assignedName)

	key := factory.NewPropKeyHelper(expression)
	assignment := factory.NewAssignmentExpression(assignedName, key)
	updatedName = factory.UpdateComputedPropertyName(name.AsComputedPropertyName(), assignment)
	return assignedName, updatedName
}

// Creates a class `static {}` block used to dynamically set the name of a class.
//
// The assignedName parameter is the expression used to resolve the assigned name at runtime. This expression should not produce
// side effects.
// The thisExpression parameter overrides the expression to use for the actual `this` reference. This can be used to provide an
// expression that has already had its `EmitFlags` set or may have been tracked to prevent substitution.
func createClassNamedEvaluationHelperBlock(emitContext *printer.EmitContext, assignedName *ast.Expression, thisExpression *ast.Expression) *ast.Node {
	// produces:
	//
	//  static { __setFunctionName(this, "C"); }
	//

	if thisExpression == nil {
		thisExpression = emitContext.Factory.NewThisExpression()
	}

	factory := emitContext.Factory
	expression := factory.NewSetFunctionNameHelper(thisExpression, assignedName, "" /*prefix*/)
	statement := factory.NewExpressionStatement(expression)
	body := factory.NewBlock(factory.NewNodeList([]*ast.Statement{statement}), false /*multiLine*/)
	block := factory.NewClassStaticBlockDeclaration(nil /*modifiers*/, body)

	// We use `emitNode.assignedName` to indicate this is a NamedEvaluation helper block
	// and to stash the expression used to resolve the assigned name.
	emitContext.SetAssignedName(block, assignedName)
	return block.AsNode()
}

// Injects a class `static {}` block used to dynamically set the name of a class, if one does not already exist.
func injectClassNamedEvaluationHelperBlockIfMissing(
	emitContext *printer.EmitContext,
	node *ast.ClassLikeDeclaration,
	assignedName *ast.Expression,
	thisExpression *ast.Expression,
) *ast.ClassLikeDeclaration {
	// given:
	//
	//  let C = class {
	//  };
	//
	// produces:
	//
	//  let C = class {
	//      static { __setFunctionName(this, "C"); }
	//  };

	// NOTE: If the class has a `_classThis` assignment block, this helper will be injected after that block.

	if classHasExplicitlyAssignedName(emitContext, node) {
		return node
	}

	factory := emitContext.Factory
	namedEvaluationBlock := createClassNamedEvaluationHelperBlock(emitContext, assignedName, thisExpression)
	if node.Name() != nil {
		emitContext.SetSourceMapRange(namedEvaluationBlock.Body().Statements()[0], node.Name().Loc)
	}

	insertionIndex := slices.IndexFunc(node.Members(), func(n *ast.Node) bool {
		return isClassThisAssignmentBlock(emitContext, n)
	}) + 1
	leading := slices.Clone(node.Members()[:insertionIndex])
	trailing := slices.Clone(node.Members()[insertionIndex:])

	var members []*ast.ClassElement
	members = append(members, leading...)
	members = append(members, namedEvaluationBlock)
	members = append(members, trailing...)
	membersList := factory.NewNodeList(members)
	membersList.Loc = node.MemberList().Loc

	if ast.IsClassDeclaration(node) {
		node = factory.UpdateClassDeclaration(
			node.AsClassDeclaration(),
			node.Modifiers(),
			node.Name(),
			node.TypeParameterList(),
			node.AsClassDeclaration().HeritageClauses,
			membersList,
		)
	} else {
		node = factory.UpdateClassExpression(
			node.AsClassExpression(),
			node.Modifiers(),
			node.Name(),
			node.TypeParameterList(),
			node.AsClassExpression().HeritageClauses,
			membersList,
		)
	}

	emitContext.SetAssignedName(node, assignedName)
	return node
}

func finishTransformNamedEvaluation(
	emitContext *printer.EmitContext,
	expression *ast.Node, // WrappedExpression<AnonymousFunctionDefinition>,
	assignedName *ast.Expression,
	ignoreEmptyStringLiteral bool,
) *ast.Expression {
	if ignoreEmptyStringLiteral && ast.IsStringLiteral(assignedName) && len(assignedName.Text()) == 0 {
		return expression
	}

	factory := emitContext.Factory
	innerExpression := ast.SkipOuterExpressions(expression, ast.OEKAll)

	var updatedExpression *ast.Expression
	if ast.IsClassExpression(innerExpression) {
		updatedExpression = injectClassNamedEvaluationHelperBlockIfMissing(emitContext, innerExpression, assignedName, nil /*thisExpression*/)
	} else {
		updatedExpression = factory.NewSetFunctionNameHelper(innerExpression, assignedName, "" /*prefix*/)
	}

	return factory.RestoreOuterExpressions(expression, updatedExpression, ast.OEKAll)
}

func transformNamedEvaluationOfPropertyAssignment(context *printer.EmitContext, node *ast.PropertyAssignment /*NamedEvaluation & PropertyAssignment*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 13.2.5.5 RS: PropertyDefinitionEvaluation
	//   PropertyAssignment : PropertyName `:` AssignmentExpression
	//     ...
	//     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
	//        a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
	//     ...

	factory := context.Factory
	assignedName, name := getAssignedNameOfPropertyName(context, node.Name(), assignedNameText)
	initializer := finishTransformNamedEvaluation(context, node.Initializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdatePropertyAssignment(node, nil /*modifiers*/, name, nil /*postfixToken*/, nil /*typeNode*/, initializer)
}

func transformNamedEvaluationOfShorthandAssignmentProperty(emitContext *printer.EmitContext, node *ast.ShorthandPropertyAssignment /*NamedEvaluation & ShorthandPropertyAssignment*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
	//   AssignmentProperty : IdentifierReference Initializer?
	//     ...
	//     4. If |Initializer?| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
	//     ...

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = getAssignedNameOfIdentifier(emitContext, node.Name(), node.ObjectAssignmentInitializer)
	}
	objectAssignmentInitializer := finishTransformNamedEvaluation(emitContext, node.ObjectAssignmentInitializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateShorthandPropertyAssignment(
		node,
		nil, /*modifiers*/
		node.Name(),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		node.EqualsToken,
		objectAssignmentInitializer,
	)
}

func transformNamedEvaluationOfVariableDeclaration(emitContext *printer.EmitContext, node *ast.VariableDeclaration /*NamedEvaluation & VariableDeclaration*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 14.3.1.2 RS: Evaluation
	//   LexicalBinding : BindingIdentifier Initializer
	//     ...
	//     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...
	//
	// 14.3.2.1 RS: Evaluation
	//   VariableDeclaration : BindingIdentifier Initializer
	//     ...
	//     3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = getAssignedNameOfIdentifier(emitContext, node.Name(), node.Initializer)
	}
	initializer := finishTransformNamedEvaluation(emitContext, node.Initializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateVariableDeclaration(
		node,
		node.Name(),
		nil, /*exclamationToken*/
		nil, /*typeNode*/
		initializer,
	)
}

func transformNamedEvaluationOfParameterDeclaration(emitContext *printer.EmitContext, node *ast.ParameterDeclaration /*NamedEvaluation & ParameterDeclaration*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 8.6.3 RS: IteratorBindingInitialization
	//   SingleNameBinding : BindingIdentifier Initializer?
	//     ...
	//     5. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...
	//
	// 14.3.3.3 RS: KeyedBindingInitialization
	//   SingleNameBinding : BindingIdentifier Initializer?
	//     ...
	//     4. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = getAssignedNameOfIdentifier(emitContext, node.Name(), node.Initializer)
	}
	initializer := finishTransformNamedEvaluation(emitContext, node.Initializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateParameterDeclaration(
		node,
		nil, /*modifiers*/
		node.DotDotDotToken,
		node.Name(),
		nil, /*questionToken*/
		nil, /*typeNode*/
		initializer,
	)
}

func transformNamedEvaluationOfBindingElement(emitContext *printer.EmitContext, node *ast.BindingElement /*NamedEvaluation & BindingElement*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 8.6.3 RS: IteratorBindingInitialization
	//   SingleNameBinding : BindingIdentifier Initializer?
	//     ...
	//     5. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...
	//
	// 14.3.3.3 RS: KeyedBindingInitialization
	//   SingleNameBinding : BindingIdentifier Initializer?
	//     ...
	//     4. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
	//     ...

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = getAssignedNameOfIdentifier(emitContext, node.Name(), node.Initializer)
	}
	initializer := finishTransformNamedEvaluation(emitContext, node.Initializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateBindingElement(
		node,
		node.DotDotDotToken,
		node.PropertyName,
		node.Name(),
		initializer,
	)
}

func transformNamedEvaluationOfPropertyDeclaration(emitContext *printer.EmitContext, node *ast.PropertyDeclaration /*NamedEvaluation & PropertyDeclaration*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 10.2.1.3 RS: EvaluateBody
	//   Initializer : `=` AssignmentExpression
	//     ...
	//     3. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _functionObject_.[[ClassFieldInitializerName]].
	//     ...

	factory := emitContext.Factory
	assignedName, name := getAssignedNameOfPropertyName(emitContext, node.Name(), assignedNameText)
	initializer := finishTransformNamedEvaluation(emitContext, node.Initializer, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdatePropertyDeclaration(
		node,
		node.Modifiers(),
		name,
		nil, /*postfixToken*/
		nil, /*typeNode*/
		initializer,
	)
}

func transformNamedEvaluationOfAssignmentExpression(emitContext *printer.EmitContext, node *ast.BinaryExpression /*NamedEvaluation & BinaryExpression*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 13.15.2 RS: Evaluation
	//   AssignmentExpression : LeftHandSideExpression `=` AssignmentExpression
	//     1. If |LeftHandSideExpression| is neither an |ObjectLiteral| nor an |ArrayLiteral|, then
	//        a. Let _lref_ be ? Evaluation of |LeftHandSideExpression|.
	//        b. If IsAnonymousFunctionDefinition(|AssignmentExpression|) and IsIdentifierRef of |LeftHandSideExpression| are both *true*, then
	//           i. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
	//     ...
	//
	//   AssignmentExpression : LeftHandSideExpression `&&=` AssignmentExpression
	//     ...
	//     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
	//        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
	//     ...
	//
	//   AssignmentExpression : LeftHandSideExpression `||=` AssignmentExpression
	//     ...
	//     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
	//        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
	//     ...
	//
	//   AssignmentExpression : LeftHandSideExpression `??=` AssignmentExpression
	//     ...
	//     4. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and IsIdentifierRef of |LeftHandSideExpression| is *true*, then
	//        a. Let _rval_ be ? NamedEvaluation of |AssignmentExpression| with argument _lref_.[[ReferencedName]].
	//     ...

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = getAssignedNameOfIdentifier(emitContext, node.Left, node.Right)
	}
	right := finishTransformNamedEvaluation(emitContext, node.Right, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateBinaryExpression(
		node,
		nil, /*modifiers*/
		node.Left,
		nil, /*typeNode*/
		node.OperatorToken,
		right,
	)
}

func transformNamedEvaluationOfExportAssignment(emitContext *printer.EmitContext, node *ast.ExportAssignment /*NamedEvaluation & ExportAssignment*/, ignoreEmptyStringLiteral bool, assignedNameText string) *ast.Expression {
	// 16.2.3.7 RS: Evaluation
	//   ExportDeclaration : `export` `default` AssignmentExpression `;`
	//     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
	//     ...

	// NOTE: Since emit for `export =` translates to `module.exports = ...`, the assigned name of the class or function
	// is `""`.

	factory := emitContext.Factory
	var assignedName *ast.Expression
	if len(assignedNameText) > 0 {
		assignedName = factory.NewStringLiteral(assignedNameText)
	} else {
		assignedName = factory.NewStringLiteral("")
	}
	expression := finishTransformNamedEvaluation(emitContext, node.Expression, assignedName, ignoreEmptyStringLiteral)
	return factory.UpdateExportAssignment(
		node,
		nil, /*modifiers*/
		nil, /*typeNode*/
		expression,
	)
}

// Performs a shallow transformation of a `NamedEvaluation` node, such that a valid name will be assigned.
func transformNamedEvaluation(context *printer.EmitContext, node *ast.Node /*NamedEvaluation*/, ignoreEmptyStringLiteral bool, assignedName string) *ast.Expression {
	switch node.Kind {
	case ast.KindPropertyAssignment:
		return transformNamedEvaluationOfPropertyAssignment(context, node.AsPropertyAssignment(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindShorthandPropertyAssignment:
		return transformNamedEvaluationOfShorthandAssignmentProperty(context, node.AsShorthandPropertyAssignment(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindVariableDeclaration:
		return transformNamedEvaluationOfVariableDeclaration(context, node.AsVariableDeclaration(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindParameter:
		return transformNamedEvaluationOfParameterDeclaration(context, node.AsParameterDeclaration(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindBindingElement:
		return transformNamedEvaluationOfBindingElement(context, node.AsBindingElement(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindPropertyDeclaration:
		return transformNamedEvaluationOfPropertyDeclaration(context, node.AsPropertyDeclaration(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindBinaryExpression:
		return transformNamedEvaluationOfAssignmentExpression(context, node.AsBinaryExpression(), ignoreEmptyStringLiteral, assignedName)
	case ast.KindExportAssignment:
		return transformNamedEvaluationOfExportAssignment(context, node.AsExportAssignment(), ignoreEmptyStringLiteral, assignedName)
	default:
		panic("Unhandled case in transformNamedEvaluation")
	}
}

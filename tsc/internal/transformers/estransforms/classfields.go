package estransforms

import (
	"iter"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/transformers"
)

// classFacts tracks various facts about a class being transformed.
type classFacts int

const (
	classFactsNone                                       classFacts = 0
	classFactsClassWasDecorated                          classFacts = 1 << 0
	classFactsNeedsClassConstructorReference             classFacts = 1 << 1
	classFactsNeedsClassSuperReference                   classFacts = 1 << 2
	classFactsNeedsSubstitutionForThisInClassStaticField classFacts = 1 << 3
	classFactsWillHoistInitializersToConstructor         classFacts = 1 << 4
)

// privateIdentifierKind represents the kind of private identifier declaration.
// privateIdentifierInfo stores information about a private identifier during transformation.
type privateIdentifierInfo struct {
	kind printer.PrivateIdentifierKind
	// brandCheckIdentifier can contain:
	//  - For instance field: The WeakMap that will be the storage for the field.
	//  - For instance methods or accessors: The WeakSet that will be used for brand checking.
	//  - For static members: The constructor that will be used for brand checking.
	brandCheckIdentifier *ast.IdentifierNode
	// isStatic stores if the identifier is static or not.
	isStatic bool
	// isValid stores if the identifier declaration is valid or not. Reserved names (e.g. #constructor)
	// or duplicate identifiers are considered invalid.
	isValid bool
	// variableName contains the variable that will serve as the storage for a static field.
	variableName *ast.IdentifierNode
	// methodName is the identifier for a variable that will contain the private method implementation.
	methodName *ast.IdentifierNode
	// getterName is the identifier for a variable that will contain the private get accessor implementation, if any.
	getterName *ast.IdentifierNode
	// setterName is the identifier for a variable that will contain the private set accessor implementation, if any.
	setterName *ast.IdentifierNode
}

// privateEnvironmentData stores class-scoped environment data for private identifiers.
type privateEnvironmentData struct {
	// className is used for prefixing generated variable names.
	className *ast.IdentifierNode
	// weakSetName is used for brand check on private methods.
	weakSetName *ast.IdentifierNode
}

// privateEnvironment stores a map of private identifier names to their transform info.
// Like Strada, it uses two separate maps: one for non-generated identifiers (keyed by text)
// and one for generated identifiers (keyed by original AST node). This prevents collisions
// when different auto-accessors produce generated backing field names with the same text.
type privateEnvironment struct {
	data                 privateEnvironmentData
	members              map[string]*privateIdentifierInfo
	generatedIdentifiers map[*ast.Node]*privateIdentifierInfo
}

// classLexicalEnvironment stores information about the lexical environment of a class.
type classLexicalEnvironment struct {
	facts classFacts
	// classConstructor is used for brand checks on static members, and `this` references in static initializers.
	classConstructor *ast.IdentifierNode
	classThis        *ast.IdentifierNode
	// superClassReference is used for `super` references in static initializers.
	superClassReference *ast.IdentifierNode
}

// classLexicalEnv is a linked list of class lexical environments.
type classLexicalEnv struct {
	previous   *classLexicalEnv
	data       *classLexicalEnvironment
	privateEnv *privateEnvironment
}

type classFieldsTransformer struct {
	transformers.Transformer
	compilerOptions *core.CompilerOptions
	resolver        binder.ReferenceResolver

	// Computed configuration flags
	shouldTransformInitializersUsingSet               bool
	shouldTransformInitializersUsingDefine            bool
	shouldTransformInitializers                       bool
	shouldTransformPrivateElementsOrClassStaticBlocks bool
	shouldTransformAutoAccessors                      bool
	shouldTransformThisInStaticInitializers           bool
	shouldTransformSuperInStaticInitializers          bool
	shouldTransformPrivateStaticElementsInFile        bool
	legacyDecorators                                  bool

	// pendingExpressions tracks what computed name expressions originating from elided names
	// must be inlined at the next execution site, in document order.
	pendingExpressions []*ast.Expression
	// pendingStatements tracks what computed name expression statements and static property
	// initializers must be emitted at the next execution site, in document order (for decorated classes).
	pendingStatements     []*ast.Statement
	lexicalEnvironment    *classLexicalEnv
	currentClassContainer *ast.ClassLikeDeclaration
	currentClassElement   *ast.ClassElement
	// classAliases maps class declarations to alias identifiers for substituting class name
	// references in static initializers. Replaces Strada's onSubstituteNode/trySubstituteClassAlias.
	classAliases               map[*ast.Node]*ast.IdentifierNode
	enclosingClassDeclarations collections.Set[*ast.Node]
	inIterationStatement       bool
	// insideComputedPropertyName replaces Strada's onEmitNode for ComputedPropertyName, which
	// switches to the outer lexical environment. Used by visitThisExpression() to apply
	// the outer environment's substitution without requiring currentClassElement to be static.
	insideComputedPropertyName bool

	// Visitors
	modifierVisitor                *ast.NodeVisitor
	discardedValueVisitor          *ast.NodeVisitor
	heritageClauseVisitor          *ast.NodeVisitor
	assignmentTargetVisitor        *ast.NodeVisitor
	classElementVisitor            *ast.NodeVisitor
	accessorFieldResultVisitor     *ast.NodeVisitor
	arrayAssignmentElementVisitor  *ast.NodeVisitor
	objectAssignmentElementVisitor *ast.NodeVisitor
	substitutionVisitor            *ast.NodeVisitor

	// Pre-bound callbacks to avoid repeated closure allocation.
	isAnonymousClassNeedingAssignedName func(*anonymousFunctionDefinition) bool
}

func newClassFieldsTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	languageVersion := opts.CompilerOptions.GetEmitScriptTarget()
	useDefineForClassFields := opts.CompilerOptions.GetUseDefineForClassFields()

	// When targeting ESNext+ with useDefineForClassFields (the default), there are no class
	// field transformations to perform and no prior transform sets EFTransformPrivateStaticElements,
	// so every node would be returned unchanged. Skip entirely.
	if languageVersion >= core.ScriptTargetESNext && useDefineForClassFields {
		return nil
	}

	tx := &classFieldsTransformer{
		compilerOptions:  opts.CompilerOptions,
		resolver:         opts.Resolver,
		legacyDecorators: opts.CompilerOptions.ExperimentalDecorators.IsTrue(),
	}

	// Always transform field initializers using Set semantics when `useDefineForClassFields: false`.
	tx.shouldTransformInitializersUsingSet = !useDefineForClassFields

	// Transform field initializers using Define semantics when `useDefineForClassFields: true` and target < ES2022.
	tx.shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < core.ScriptTargetES2022

	tx.shouldTransformInitializers = tx.shouldTransformInitializersUsingSet || tx.shouldTransformInitializersUsingDefine

	// We need to transform private members and class static blocks when target < ES2022.
	tx.shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < core.ScriptTargetES2022

	// We need to transform `accessor` fields when target < ESNext.
	// We may need to transform `accessor` fields when `useDefineForClassFields: false`
	tx.shouldTransformAutoAccessors = languageVersion < core.ScriptTargetESNext

	// We need to transform `this` in a static initializer into a reference to the class
	// when target < ES2022 since the assignment will be moved outside of the class body.
	tx.shouldTransformThisInStaticInitializers = languageVersion < core.ScriptTargetES2022

	// Since target is always >= ES2015, this is always the same as
	// shouldTransformThisInStaticInitializers.
	tx.shouldTransformSuperInStaticInitializers = tx.shouldTransformThisInStaticInitializers

	result := tx.NewTransformer(tx.visit, opts.Context)
	tx.modifierVisitor = tx.EmitContext().NewNodeVisitor(tx.visitModifier)
	tx.discardedValueVisitor = tx.EmitContext().NewNodeVisitor(tx.visitDiscardedValue)
	tx.heritageClauseVisitor = tx.EmitContext().NewNodeVisitor(tx.visitHeritageClause)
	tx.assignmentTargetVisitor = tx.EmitContext().NewNodeVisitor(tx.visitAssignmentTarget)
	tx.classElementVisitor = tx.EmitContext().NewNodeVisitor(tx.visitClassElement)
	tx.accessorFieldResultVisitor = tx.EmitContext().NewNodeVisitor(tx.visitAccessorFieldResult)
	tx.arrayAssignmentElementVisitor = tx.EmitContext().NewNodeVisitor(tx.visitArrayAssignmentElement)
	tx.objectAssignmentElementVisitor = tx.EmitContext().NewNodeVisitor(tx.visitObjectAssignmentElement)
	tx.substitutionVisitor = tx.EmitContext().NewNodeVisitor(tx.visitForSubstitution)
	tx.isAnonymousClassNeedingAssignedName = tx.isAnonymousClassNeedingAssignedNameWorker

	return result
}

// requiresBlockScopedVar returns true when private field temp variables should be
// declared as block-scoped (let) rather than function-scoped (var). This occurs when
// a class expression is directly inside a loop body.
// Replaces Strada's resolver.hasNodeCheckFlag(node, NodeCheckFlags.BlockScopedBindingInLoop).
func (tx *classFieldsTransformer) requiresBlockScopedVar() bool {
	return tx.inIterationStatement && tx.currentClassContainer != nil && ast.IsClassExpression(tx.currentClassContainer)
}

// classExpressionNeedsBlockScopedTemp returns true when the class expression's temp variable
// must be block-scoped. This is more specific than requiresBlockScopedVar: the class temp only
// needs to be block-scoped when the class expression has a non-static property with a computed
// property name inside a loop (matching the checker's BlockScopedBindingInLoop on the class node).
func (tx *classFieldsTransformer) classExpressionNeedsBlockScopedTemp() bool {
	if !tx.requiresBlockScopedVar() {
		return false
	}
	for _, member := range tx.currentClassContainer.Members() {
		if ast.IsPropertyDeclaration(member) && !ast.HasStaticModifier(member) &&
			member.Name() != nil && ast.IsComputedPropertyName(member.Name()) {
			return true
		}
	}
	return false
}

func (tx *classFieldsTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	if node.IsDeclarationFile {
		return node.AsNode()
	}
	tx.lexicalEnvironment = nil
	tx.shouldTransformPrivateStaticElementsInFile = tx.EmitContext().EmitFlags(node.AsNode())&printer.EFTransformPrivateStaticElements != 0
	tx.classAliases = make(map[*ast.Node]*ast.IdentifierNode)
	tx.enclosingClassDeclarations.Clear()
	visited := tx.Visitor().VisitEachChild(node.AsNode())
	tx.EmitContext().AddEmitHelper(visited, tx.EmitContext().ReadEmitHelpers()...)
	tx.classAliases = nil
	tx.enclosingClassDeclarations.Clear()
	return visited
}

func (tx *classFieldsTransformer) visitModifier(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindAccessorKeyword {
		if tx.shouldTransformAutoAccessorsInCurrentClass() {
			return nil
		}
		return node
	}
	if ast.IsModifier(node) {
		return node
	}
	return nil
}

// visitForSubstitution visits nodes solely for class alias substitution in subtrees
// that don't contain class field or lexical this/super transforms. It substitutes
// identifiers that reference class declarations with their aliases, while skipping
// the .Name() of PropertyAccessExpressions since Strada's onSubstituteNode only
// fires for EmitHint.Expression, which excludes property access names.
func (tx *classFieldsTransformer) visitForSubstitution(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindIdentifier {
		return tx.visitIdentifier(node.AsIdentifier())
	}
	if node.Kind == ast.KindPropertyAccessExpression && ast.IsIdentifier(node.AsPropertyAccessExpression().Name()) {
		return tx.visitPropertyAccessExpressionForSubstitution(node.AsPropertyAccessExpression())
	}
	return tx.substitutionVisitor.VisitEachChild(node)
}

// visit is the main visitor.
func (tx *classFieldsTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&(ast.SubtreeContainsClassFields|ast.SubtreeContainsLexicalThisOrSuper) == 0 {
		if tx.currentClassContainer != nil && len(tx.classAliases) > 0 {
			// Continue visiting for alias substitution even in non-class-field subtrees.
			return tx.visitForSubstitution(node)
		}
		return node
	}

	switch node.Kind {
	case ast.KindSourceFile:
		return tx.visitSourceFile(node.AsSourceFile())
	case ast.KindClassDeclaration:
		return tx.visitClassDeclaration(node.AsClassDeclaration())
	case ast.KindClassExpression:
		return tx.visitClassExpression(node.AsClassExpression())
	case ast.KindClassStaticBlockDeclaration, ast.KindPropertyDeclaration:
		panic("Use `classElementVisitor` instead.")
	case ast.KindPropertyAssignment:
		return tx.visitPropertyAssignment(node.AsPropertyAssignment())
	case ast.KindVariableStatement:
		return tx.visitVariableStatement(node.AsVariableStatement())
	case ast.KindVariableDeclaration:
		return tx.visitVariableDeclaration(node.AsVariableDeclaration())
	case ast.KindParameter:
		return tx.visitParameterDeclaration(node.AsParameterDeclaration())
	case ast.KindBindingElement:
		return tx.visitBindingElement(node.AsBindingElement())
	case ast.KindExportAssignment:
		return tx.visitExportAssignment(node.AsExportAssignment())
	case ast.KindPrivateIdentifier:
		return tx.visitPrivateIdentifier(node)
	case ast.KindPropertyAccessExpression:
		return tx.visitPropertyAccessExpression(node.AsPropertyAccessExpression())
	case ast.KindElementAccessExpression:
		return tx.visitElementAccessExpression(node.AsElementAccessExpression())
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return tx.visitPreOrPostfixUnaryExpression(node, false /*discarded*/)
	case ast.KindBinaryExpression:
		return tx.visitBinaryExpression(node.AsBinaryExpression(), false /*discarded*/)
	case ast.KindParenthesizedExpression:
		return tx.visitParenthesizedExpression(node.AsParenthesizedExpression(), false /*discarded*/)
	case ast.KindCallExpression:
		return tx.visitCallExpression(node.AsCallExpression())
	case ast.KindExpressionStatement:
		return tx.visitExpressionStatement(node.AsExpressionStatement())
	case ast.KindTaggedTemplateExpression:
		return tx.visitTaggedTemplateExpression(node.AsTaggedTemplateExpression())
	case ast.KindForStatement:
		return tx.visitForStatement(node.AsForStatement())
	case ast.KindForInStatement, ast.KindForOfStatement, ast.KindDoStatement, ast.KindWhileStatement:
		return tx.setInIterationStatementAnd(true, (*classFieldsTransformer).visitEachChildOfNode, node)
	case ast.KindThisKeyword:
		return tx.visitThisExpression(node)
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		return tx.setInIterationStatementAnd(false, (*classFieldsTransformer).visitFunctionExpressionOrDeclaration, node)
	case ast.KindConstructor, ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
		return tx.setInIterationStatementAnd(false, (*classFieldsTransformer).setClassElementAndVisitEachChild, node)
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

// visitDiscardedValue visits a node in an expression whose result is discarded.
func (tx *classFieldsTransformer) visitDiscardedValue(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return tx.visitPreOrPostfixUnaryExpression(node, true /*discarded*/)
	case ast.KindBinaryExpression:
		return tx.visitBinaryExpression(node.AsBinaryExpression(), true /*discarded*/)
	case ast.KindParenthesizedExpression:
		return tx.visitParenthesizedExpression(node.AsParenthesizedExpression(), true /*discarded*/)
	default:
		return tx.visit(node)
	}
}

// visitHeritageClause visits a node in a HeritageClause.
func (tx *classFieldsTransformer) visitHeritageClause(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindHeritageClause:
		return tx.heritageClauseVisitor.VisitEachChild(node)
	case ast.KindExpressionWithTypeArguments:
		return tx.visitExpressionWithTypeArgumentsInHeritageClause(node.AsExpressionWithTypeArguments())
	default:
		return tx.visit(node)
	}
}

// visitAssignmentTarget visits the assignment target of a destructuring assignment.
func (tx *classFieldsTransformer) visitAssignmentTarget(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression:
		return tx.visitAssignmentPattern(node)
	default:
		return tx.visit(node)
	}
}

func (tx *classFieldsTransformer) visitDestructuringAssignmentTarget(node *ast.Node) *ast.Node {
	if ast.IsObjectLiteralExpression(node) || ast.IsArrayLiteralExpression(node) {
		return tx.visitAssignmentPattern(node)
	}
	if ast.IsPropertyAccessExpression(node) && ast.IsPrivateIdentifier(node.AsPropertyAccessExpression().Name()) {
		return tx.wrapPrivateIdentifierForDestructuringTarget(node)
	}
	if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
		ast.IsSuperProperty(node) &&
		isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		data := tx.lexicalEnvironment.data
		if data.facts&classFactsClassWasDecorated != 0 {
			return tx.visitInvalidSuperProperty(node)
		}
		if data.classConstructor != nil && data.superClassReference != nil {
			var name *ast.Expression
			if ast.IsElementAccessExpression(node) {
				name = tx.Visitor().VisitNode(node.AsElementAccessExpression().ArgumentExpression)
			} else if ast.IsPropertyAccessExpression(node) && ast.IsIdentifier(node.AsPropertyAccessExpression().Name()) {
				name = tx.Factory().NewStringLiteralFromNode(node.AsPropertyAccessExpression().Name())
			}
			if name != nil {
				temp := tx.Factory().NewTempVariable()
				setExpr := tx.Factory().NewReflectSetCall(
					data.superClassReference,
					name,
					temp,
					data.classConstructor,
				)
				return tx.Factory().NewAssignmentTargetWrapper(temp, setExpr)
			}
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

// visitClassElement visits a member of a class.
func (tx *classFieldsTransformer) visitClassElement(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindConstructor:
		return tx.setCurrentClassElementAnd(node, (*classFieldsTransformer).visitConstructorDeclaration, node)
	case ast.KindGetAccessor, ast.KindSetAccessor, ast.KindMethodDeclaration:
		return tx.setCurrentClassElementAnd(node, (*classFieldsTransformer).visitMethodOrAccessorDeclaration, node)
	case ast.KindPropertyDeclaration:
		return tx.setCurrentClassElementAnd(node, (*classFieldsTransformer).visitPropertyDeclaration, node)
	case ast.KindClassStaticBlockDeclaration:
		return tx.setCurrentClassElementAnd(node, (*classFieldsTransformer).visitClassStaticBlockDeclaration, node)
	case ast.KindComputedPropertyName:
		return tx.visitComputedPropertyName(node.AsComputedPropertyName())
	case ast.KindSemicolonClassElement:
		return node
	default:
		if ast.IsModifierLike(node) {
			return tx.visitModifier(node)
		}
		return tx.visit(node)
	}
}

// visitPropertyName visits a property name of a class member.
func (tx *classFieldsTransformer) visitPropertyName(name *ast.PropertyName) *ast.PropertyName {
	if ast.IsComputedPropertyName(name) {
		return tx.visitComputedPropertyName(name.AsComputedPropertyName())
	}
	return tx.Visitor().VisitNode(name)
}

// visitAccessorFieldResult visits the results of an auto-accessor field transformation in a second pass.
func (tx *classFieldsTransformer) visitAccessorFieldResult(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyDeclaration:
		return tx.transformFieldInitializer(node.AsPropertyDeclaration())
	case ast.KindGetAccessor, ast.KindSetAccessor:
		return tx.visitClassElement(node)
	default:
		debug.FailBadSyntaxKind(node, "Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration")
		return nil
	}
}

// visitIdentifier replaces Strada's onSubstituteNode/trySubstituteClassAlias. Instead of
// substituting at emit time using NodeCheckFlags.ConstructorReference, we resolve the
// identifier to its declaration and check if that declaration has a registered alias.
func (tx *classFieldsTransformer) visitIdentifier(node *ast.Identifier) *ast.Node {
	declaration := tx.resolver.GetReferencedValueDeclaration(tx.EmitContext().MostOriginal(node.AsNode()))
	if declaration != nil {
		if alias, ok := tx.classAliases[declaration]; ok && tx.enclosingClassDeclarations.Has(declaration) {
			clone := alias.Clone(tx.Factory())
			tx.EmitContext().SetSourceMapRange(clone, node.Loc)
			tx.EmitContext().SetCommentRange(clone, node.Loc)
			return clone
		}
	}
	return node.AsNode()
}

// visitPrivateIdentifier handles an undeclared private name. Replace it with an empty
// identifier to indicate a problem with the code.
// Note: private identifiers in statement position (e.g., `#;`) are intercepted earlier
// by visitExpressionStatement, which preserves them so the runtime throws a SyntaxError.
func (tx *classFieldsTransformer) visitPrivateIdentifier(node *ast.Node) *ast.Node {
	if !tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		return node
	}
	result := tx.Factory().NewIdentifier("")
	tx.EmitContext().SetOriginal(result, node)
	return result
}

// transformPrivateIdentifierInInExpression visits `#id in expr`.
func (tx *classFieldsTransformer) transformPrivateIdentifierInInExpression(node *ast.BinaryExpression) *ast.Node {
	info := tx.accessPrivateIdentifier(node.Left)
	if info != nil {
		receiver := tx.Visitor().VisitNode(node.Right)
		result := tx.Factory().NewClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver)
		tx.EmitContext().SetOriginal(result, node.AsNode())
		return result
	}
	// Private name has not been declared. Subsequent transformers will handle this error
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitPropertyAssignment(node *ast.PropertyAssignment) *ast.Node {
	// 13.2.5.5 RS: PropertyDefinitionEvaluation
	//   PropertyAssignment : PropertyName `:` AssignmentExpression
	//     ...
	//     5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
	//        a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
	//     ...

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/).AsPropertyAssignment()
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitVariableStatement(node *ast.VariableStatement) *ast.Node {
	savedPendingStatements := tx.pendingStatements
	tx.pendingStatements = nil

	visitedNode := tx.Visitor().VisitEachChild(node.AsNode())

	if len(tx.pendingStatements) > 0 {
		result := make([]*ast.Node, 0, 1+len(tx.pendingStatements))
		result = append(result, visitedNode)
		result = append(result, tx.pendingStatements...)
		tx.pendingStatements = savedPendingStatements
		return tx.Factory().NewSyntaxList(result)
	}

	tx.pendingStatements = savedPendingStatements
	return visitedNode
}

func (tx *classFieldsTransformer) visitVariableDeclaration(node *ast.VariableDeclaration) *ast.Node {
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

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false, "").AsVariableDeclaration()
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitParameterDeclaration(node *ast.ParameterDeclaration) *ast.Node {
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

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false, "").AsParameterDeclaration()
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitBindingElement(node *ast.BindingElement) *ast.Node {
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

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false, "").AsBindingElement()
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitExportAssignment(node *ast.ExportAssignment) *ast.Node {
	// 16.2.3.7 RS: Evaluation
	//   ExportDeclaration : `export` `default` AssignmentExpression `;`
	//     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
	//     ...

	// NOTE: Since emit for `export =` translates to `module.exports = ...`, the assigned nameof the class
	// is `""`.

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		assignedName := ""
		if !node.IsExportEquals {
			assignedName = "default"
		}
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), true /*ignoreEmptyStringLiteral*/, assignedName).AsExportAssignment()
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) injectPendingExpressions(expression *ast.Expression) *ast.Expression {
	if len(tx.pendingExpressions) > 0 {
		if ast.IsParenthesizedExpression(expression) {
			tx.pendingExpressions = append(tx.pendingExpressions, expression.Expression())
			expression = tx.Factory().UpdateParenthesizedExpression(
				expression.AsParenthesizedExpression(),
				tx.Factory().InlineExpressions(tx.pendingExpressions),
			)
		} else {
			exprs := append(tx.pendingExpressions, expression)
			expression = tx.Factory().InlineExpressions(exprs)
		}
		tx.pendingExpressions = nil
	}
	return expression
}

func (tx *classFieldsTransformer) visitComputedPropertyName(node *ast.ComputedPropertyName) *ast.Node {
	// Computed property names are evaluated in the enclosing scope, not the current class.
	// Replaces Strada's onEmitNode for ComputedPropertyName which switches to
	// lexicalEnvironment?.previous. We do this explicitly during transformation.
	savedLexicalEnvironment := tx.lexicalEnvironment
	savedInsideComputedPropertyName := tx.insideComputedPropertyName
	tx.insideComputedPropertyName = true
	if tx.lexicalEnvironment != nil && tx.lexicalEnvironment.previous != nil {
		tx.lexicalEnvironment = tx.lexicalEnvironment.previous
	}
	expression := tx.Visitor().VisitNode(node.Expression)
	tx.lexicalEnvironment = savedLexicalEnvironment
	tx.insideComputedPropertyName = savedInsideComputedPropertyName
	return tx.Factory().UpdateComputedPropertyName(node, tx.injectPendingExpressions(expression))
}

func (tx *classFieldsTransformer) visitConstructorDeclaration(node *ast.Node) *ast.Node {
	if tx.currentClassContainer != nil {
		return tx.transformConstructor(node.AsConstructorDeclaration(), tx.currentClassContainer)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) shouldTransformClassElementToWeakMap(node *ast.Node) bool {
	if tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		return true
	}
	return tx.shouldAlwaysTransformPrivateStaticElements(node)
}

func (tx *classFieldsTransformer) shouldAlwaysTransformPrivateStaticElements(node *ast.Node) bool {
	return ast.HasStaticModifier(node) && tx.EmitContext().EmitFlags(node)&printer.EFTransformPrivateStaticElements != 0
}

// nodeHasTransformPrivateStaticElementsFlag checks the emit flag on a class node (not a member).
// Unlike shouldAlwaysTransformPrivateStaticElements, this does not check HasStaticModifier,
// since class nodes themselves don't have a static modifier.
func (tx *classFieldsTransformer) nodeHasTransformPrivateStaticElementsFlag(node *ast.Node) bool {
	return tx.EmitContext().EmitFlags(node)&printer.EFTransformPrivateStaticElements != 0
}

func (tx *classFieldsTransformer) visitMethodOrAccessorDeclaration(node *ast.Node) *ast.Node {
	debug.Assert(!ast.HasDecorators(node))

	if !ast.IsPrivateIdentifierClassElementDeclaration(node) || !tx.shouldTransformClassElementToWeakMap(node) {
		return tx.classElementVisitor.VisitEachChild(node)
	}

	// leave invalid code untransformed
	info := tx.accessPrivateIdentifier(node.Name())
	debug.Assert(info != nil, "Undeclared private name for property declaration.")
	if !info.isValid {
		return node
	}

	functionName := tx.getHoistedFunctionName(node)
	if functionName != nil {
		modifiers := tx.extractNonStaticNonAccessorModifiers(node)
		tx.EmitContext().StartVariableEnvironment()
		saved := tx.inIterationStatement
		tx.inIterationStatement = false
		body := tx.EmitContext().VisitFunctionBody(node.Body(), tx.Visitor())
		params := tx.Visitor().VisitNodes(node.ParameterList())
		tx.inIterationStatement = saved

		funcExpr := tx.Factory().NewFunctionExpression(modifiers, node.BodyData().AsteriskToken, functionName, nil, params, nil, nil, body)
		assignment := tx.Factory().NewAssignmentExpression(functionName, funcExpr)
		tx.addPendingExpressions(assignment)
	}

	// remove method declaration from class
	return nil
}

func (tx *classFieldsTransformer) extractNonStaticNonAccessorModifiers(node *ast.Node) *ast.ModifierList {
	return transformers.ExtractModifiers(tx.EmitContext(), node.Modifiers(), ^(ast.ModifierFlagsStatic | ast.ModifierFlagsAccessor))
}

func (tx *classFieldsTransformer) setCurrentClassElementAnd(classElement *ast.ClassElement, visitor func(tx *classFieldsTransformer, node *ast.Node) *ast.Node, node *ast.Node) *ast.Node {
	if classElement != tx.currentClassElement {
		saved := tx.currentClassElement
		tx.currentClassElement = classElement
		result := visitor(tx, node)
		tx.currentClassElement = saved
		return result
	}
	return visitor(tx, node)
}

// visitEachChildOfNode just calls Visitor.VisitEachChild, but is necessary to avoid repeated closure allocations when passing as a callback.
func (tx *classFieldsTransformer) visitEachChildOfNode(node *ast.Node) *ast.Node {
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) setInIterationStatementAnd(inIteration bool, visitor func(tx *classFieldsTransformer, node *ast.Node) *ast.Node, node *ast.Node) *ast.Node {
	if tx.inIterationStatement != inIteration {
		saved := tx.inIterationStatement
		tx.inIterationStatement = inIteration
		result := visitor(tx, node)
		tx.inIterationStatement = saved
		return result
	}
	return visitor(tx, node)
}

func (tx *classFieldsTransformer) clearClassElementAndVisitEachChild(node *ast.Node) *ast.Node {
	return tx.setCurrentClassElementAnd(nil, (*classFieldsTransformer).visitEachChildOfNode, node)
}

// visitFunctionExpressionOrDeclaration handles lexical environment scoping for function
// expressions and declarations, mirroring Strada's onEmitNode behavior.
//
// In Strada, onEmitNode checks whether a FunctionExpression has been registered in
// lexicalEnvironmentMap (via its original node). If found, the lexical environment is
// restored; otherwise it is cleared (since regular functions create a new `this` scope).
//
// Since Corsa performs substitution eagerly (no emit-time hooks), we replicate this by
// preserving currentClassElement for function expressions whose original node is a class
// member of the current class. This allows visitThisExpression to correctly substitute
// `this` -> `_classThis` inside synthesized functions (e.g., ES decorator descriptor
// methods for static private auto-accessors).
func (tx *classFieldsTransformer) visitFunctionExpressionOrDeclaration(node *ast.Node) *ast.Node {
	if tx.currentClassElement != nil {
		original := tx.EmitContext().MostOriginal(node)
		if original != node && tx.currentClassContainer != nil {
			for _, member := range tx.currentClassContainer.Members() {
				if tx.EmitContext().MostOriginal(member) == original && ast.IsStatic(member) {
					// The function expression originates from a static class member (e.g., a
					// descriptor method synthesized by the ES decorator transformer for a
					// static private auto-accessor). Preserve the current class element so
					// that visitThisExpression can substitute `this` with `_classThis`.
					// Non-static members must NOT preserve the class element because `this`
					// inside their descriptor functions should remain dynamic.
					return tx.visitEachChildOfNode(node)
				}
			}
		}
	}
	return tx.setCurrentClassElementAnd(nil, (*classFieldsTransformer).visitEachChildOfNode, node)
}

func (tx *classFieldsTransformer) setClassElementAndVisitEachChild(node *ast.Node) *ast.Node {
	return tx.setCurrentClassElementAnd(node, (*classFieldsTransformer).visitEachChildOfNode, node)
}

func (tx *classFieldsTransformer) getHoistedFunctionName(node *ast.Node) *ast.IdentifierNode {
	debug.Assert(node.Name() != nil && ast.IsPrivateIdentifier(node.Name()))
	info := tx.accessPrivateIdentifier(node.Name())
	debug.Assert(info != nil, "Undeclared private name for property declaration.")
	if info.kind == printer.PrivateIdentifierKindMethod {
		return info.methodName
	}
	if info.kind == printer.PrivateIdentifierKindAccessor {
		if ast.IsGetAccessorDeclaration(node) {
			return info.getterName
		}
		if ast.IsSetAccessorDeclaration(node) {
			return info.setterName
		}
	}
	return nil
}

func (tx *classFieldsTransformer) tryGetClassThis() *ast.Expression {
	if classThis := tx.tryGetClassThisNoContainer(); classThis != nil {
		return classThis
	}
	if tx.currentClassContainer != nil {
		return tx.currentClassContainer.Name()
	}
	return nil
}

func (tx *classFieldsTransformer) tryGetClassThisNoContainer() *ast.Expression {
	lex := tx.getClassLexicalEnvironment()
	if lex.classThis != nil {
		return lex.classThis
	}
	if lex.classConstructor != nil {
		return lex.classConstructor
	}
	return nil
}

// transformAutoAccessor transforms an auto-accessor property:
//
//	accessor x = 1;
//
// into:
//
//	#x = 1;
//	get x() { return this.#x; }
//	set x(value) { this.#x = value; }
func (tx *classFieldsTransformer) transformAutoAccessor(node *ast.PropertyDeclaration) *ast.Node {
	commentRange := tx.EmitContext().CommentRange(node.AsNode())
	sourceMapRange := tx.EmitContext().SourceMapRange(node.AsNode())

	// Since we're creating two declarations where there was previously one, cache
	// the expression for any computed property names.
	name := node.Name()
	getterName := name
	setterName := name
	if ast.IsComputedPropertyName(name) && !transformers.IsSimpleInlineableExpression(name.Expression()) {
		cacheAssignment := findComputedPropertyNameCacheAssignment(tx.EmitContext(), name)
		if cacheAssignment != nil {
			getterName = tx.Factory().UpdateComputedPropertyName(name.AsComputedPropertyName(), tx.Visitor().VisitNode(name.Expression()))
			setterName = tx.Factory().UpdateComputedPropertyName(name.AsComputedPropertyName(), cacheAssignment.Left)
		} else {
			temp := tx.Factory().NewTempVariable()
			tx.EmitContext().SetSourceMapRange(temp, name.Expression().Loc)
			tx.EmitContext().AddVariableDeclaration(temp)
			expression := tx.Visitor().VisitNode(name.Expression())
			assignment := tx.Factory().NewAssignmentExpression(temp, expression)
			tx.EmitContext().SetSourceMapRange(assignment, name.Expression().Loc)
			getterName = tx.Factory().UpdateComputedPropertyName(name.AsComputedPropertyName(), assignment)
			setterName = tx.Factory().UpdateComputedPropertyName(name.AsComputedPropertyName(), temp)
		}
	}

	modifiers := tx.modifierVisitor.VisitModifiers(node.Modifiers())
	backingField := createAccessorPropertyBackingField(tx.Factory(), node, modifiers, node.Initializer)
	tx.EmitContext().SetOriginal(backingField, node.AsNode())
	tx.EmitContext().AddEmitFlags(backingField, printer.EFNoComments)
	tx.EmitContext().SetSourceMapRange(backingField, sourceMapRange)

	var receiver *ast.Expression
	if ast.IsStatic(node.AsNode()) {
		receiver = tx.tryGetClassThis()
		if receiver == nil {
			receiver = tx.Factory().NewThisExpression()
		}
	} else {
		receiver = tx.Factory().NewThisExpression()
	}

	getter := tx.createAccessorPropertyGetRedirector(node, modifiers, getterName, receiver)
	tx.EmitContext().SetOriginal(getter, node.AsNode())
	tx.EmitContext().SetCommentRange(getter, commentRange)
	tx.EmitContext().SetSourceMapRange(getter, sourceMapRange)

	// create a fresh copy of the modifiers so that we don't duplicate comments
	var setterModifiers *ast.ModifierList
	if modifiers != nil {
		setterModifiers = tx.Factory().NewModifierList(ast.CreateModifiersFromModifierFlags(modifiers.ModifierFlags, tx.Factory().NewModifier))
	}
	setter := tx.createAccessorPropertySetRedirector(node, setterModifiers, setterName, receiver)
	tx.EmitContext().SetOriginal(setter, node.AsNode())
	tx.EmitContext().AddEmitFlags(setter, printer.EFNoComments)
	tx.EmitContext().SetSourceMapRange(setter, sourceMapRange)

	// Visit the results in a second pass
	visited, _ := tx.accessorFieldResultVisitor.VisitSlice([]*ast.Node{backingField, getter, setter})
	return tx.Factory().NewSyntaxList(visited)
}

func (tx *classFieldsTransformer) transformPrivateFieldInitializer(node *ast.PropertyDeclaration) *ast.Node {
	if tx.shouldTransformClassElementToWeakMap(node.AsNode()) {
		// If we are transforming private elements into WeakMap/WeakSet, we should elide the node.
		info := tx.accessPrivateIdentifier(node.Name())
		debug.Assert(info != nil, "Undeclared private name for property declaration.")

		// Leave invalid code untransformed
		if !info.isValid {
			return node.AsNode()
		}

		// If we encounter a valid private static field and we're not transforming
		// class static blocks, convert to a static block initializer.
		if info.isStatic && !tx.shouldTransformPrivateElementsOrClassStaticBlocks {
			// TODO: fix
			statement := tx.transformPropertyOrClassStaticBlock(node.AsNode(), tx.Factory().NewThisExpression())
			if statement != nil {
				return tx.Factory().NewClassStaticBlockDeclaration(
					nil, /*modifiers*/
					tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{statement}), true /*multiLine*/),
				)
			}
		}

		return nil
	}

	if tx.shouldTransformInitializersUsingSet && !ast.HasStaticModifier(node.AsNode()) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil &&
		tx.lexicalEnvironment.data.facts&classFactsWillHoistInitializersToConstructor != 0 {
		return tx.Factory().UpdatePropertyDeclaration(
			node,
			tx.Visitor().VisitModifiers(node.Modifiers()),
			node.Name(),
			nil, /*postfixToken*/
			nil, /*typeNode*/
			nil, /*initializer*/
		)
	}

	if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false, "").AsPropertyDeclaration()
	}

	return tx.Factory().UpdatePropertyDeclaration(
		node,
		tx.modifierVisitor.VisitModifiers(node.Modifiers()),
		tx.visitPropertyName(node.Name()),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		tx.Visitor().VisitNode(node.Initializer),
	)
}

func (tx *classFieldsTransformer) transformPublicFieldInitializer(node *ast.PropertyDeclaration) *ast.Node {
	if tx.shouldTransformInitializers && !ast.IsAutoAccessorPropertyDeclaration(node.AsNode()) {
		// Elide the property declaration; the initializer will be moved to the constructor.
		// For computed property names, we still need to emit the expression.
		expr := tx.getPropertyNameExpressionIfNeeded(node.Name(), node.Initializer != nil || tx.compilerOptions.GetUseDefineForClassFields())
		if expr != nil {
			for e := range flattenCommaList(expr) {
				tx.addPendingExpressions(e)
			}
		}

		// When target >= ES2022 (i.e., !shouldTransformPrivateElementsOrClassStaticBlocks) and we
		// still need to transform initializers (useDefineForClassFields: false), static property
		// initializers must be converted into `static { this.x = ...; }` blocks so that `this`
		// refers to the class constructor inside the static block.
		if ast.IsStatic(node.AsNode()) && !tx.shouldTransformPrivateElementsOrClassStaticBlocks {
			initializerStatement := tx.transformPropertyOrClassStaticBlock(node.AsNode(), tx.Factory().NewThisExpression())
			if initializerStatement != nil {
				staticBlock := tx.Factory().NewClassStaticBlockDeclaration(
					nil, /*modifiers*/
					tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{initializerStatement}), false),
				)

				tx.EmitContext().SetOriginal(staticBlock, node.AsNode())
				tx.EmitContext().SetCommentRange(staticBlock, node.Loc)

				tx.EmitContext().AddEmitFlags(initializerStatement, printer.EFNoComments)
				return staticBlock
			}
		}

		return nil
	}

	return tx.Factory().UpdatePropertyDeclaration(
		node,
		tx.modifierVisitor.VisitModifiers(node.Modifiers()),
		tx.visitPropertyName(node.Name()),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		tx.Visitor().VisitNode(node.Initializer),
	)
}

func (tx *classFieldsTransformer) transformFieldInitializer(node *ast.PropertyDeclaration) *ast.Node {
	debug.Assert(!ast.HasDecorators(node.AsNode()), "Decorators should already have been transformed and elided.")
	if ast.IsPrivateIdentifierClassElementDeclaration(node.AsNode()) {
		return tx.transformPrivateFieldInitializer(node)
	}
	return tx.transformPublicFieldInitializer(node)
}

func (tx *classFieldsTransformer) shouldTransformAutoAccessorsInCurrentClass() bool {
	if tx.shouldTransformAutoAccessors {
		return true
	}
	// When targeting ESNext with useDefineForClassFields: false, auto-accessors are only
	// transformed if the current class will hoist initializers to the constructor.
	return tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil &&
		tx.lexicalEnvironment.data.facts&classFactsWillHoistInitializersToConstructor != 0
}

func (tx *classFieldsTransformer) visitPropertyDeclaration(node *ast.Node) *ast.Node {
	// If this is an auto-accessor, we defer to `transformAutoAccessor`. That function
	// will in turn call `transformFieldInitializer` as needed.
	propDecl := node.AsPropertyDeclaration()
	if ast.IsAutoAccessorPropertyDeclaration(node) && (tx.shouldTransformAutoAccessorsInCurrentClass() ||
		ast.HasStaticModifier(node) && tx.shouldAlwaysTransformPrivateStaticElements(node)) {
		return tx.transformAutoAccessor(propDecl)
	}
	return tx.transformFieldInitializer(propDecl)
}

func (tx *classFieldsTransformer) createPrivateIdentifierAccess(info *privateIdentifierInfo, receiver *ast.Expression) *ast.Expression {
	receiver = tx.Visitor().VisitNode(receiver)
	return tx.createPrivateIdentifierAccessHelper(info, receiver)
}

func (tx *classFieldsTransformer) createPrivateIdentifierAccessHelper(info *privateIdentifierInfo, receiver *ast.Expression) *ast.Expression {
	tx.EmitContext().SetCommentRange(receiver, core.NewTextRange(-1, receiver.End()))

	switch info.kind {
	case printer.PrivateIdentifierKindAccessor:
		return tx.Factory().NewClassPrivateFieldGetHelper(
			receiver,
			info.brandCheckIdentifier,
			info.kind,
			info.getterName,
		)
	case printer.PrivateIdentifierKindMethod:
		return tx.Factory().NewClassPrivateFieldGetHelper(
			receiver,
			info.brandCheckIdentifier,
			info.kind,
			info.methodName,
		)
	case printer.PrivateIdentifierKindField:
		var f *ast.IdentifierNode
		if info.isStatic {
			f = info.variableName
		}
		return tx.Factory().NewClassPrivateFieldGetHelper(
			receiver,
			info.brandCheckIdentifier,
			info.kind,
			f,
		)
	case printer.PrivateIdentifierKindUntransformed:
		debug.Fail("Access helpers should not be created for untransformed private elements")
		return nil
	}
	debug.AssertNever(info, "Unknown private element type")
	return nil
}

func (tx *classFieldsTransformer) visitPropertyAccessExpression(node *ast.PropertyAccessExpression) *ast.Node {
	if ast.IsPrivateIdentifier(node.Name()) {
		info := tx.accessPrivateIdentifier(node.Name())
		if info != nil {
			result := tx.createPrivateIdentifierAccess(info, node.Expression)
			tx.EmitContext().SetOriginal(result, node.AsNode())
			result.Loc = node.Loc
			return result
		}
	}
	if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
		ast.IsSuperProperty(node.AsNode()) && ast.IsIdentifier(node.Name()) &&
		isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		data := tx.lexicalEnvironment.data
		if data.facts&classFactsClassWasDecorated != 0 {
			return tx.visitInvalidSuperProperty(node.AsNode())
		}
		if data.classConstructor != nil && data.superClassReference != nil {
			// converts `super.x` into `Reflect.get(_baseTemp, "x", _classTemp)`
			superProperty := tx.Factory().NewReflectGetCall(
				data.superClassReference,
				tx.Factory().NewStringLiteralFromNode(node.Name()),
				data.classConstructor,
			)
			tx.EmitContext().SetOriginal(superProperty, node.Expression)
			superProperty.Loc = node.Expression.Loc
			return superProperty
		}
	}
	// Visit only the expression, not the name (when it's a regular identifier), to prevent
	// substitution of property names. Strada's onSubstituteNode only fires for
	// EmitHint.Expression, which excludes the .name of PropertyAccessExpression.
	// Private identifier names are still visited through VisitEachChild so they can be
	// transformed by visitPrivateIdentifier.
	if ast.IsIdentifier(node.Name()) {
		return tx.visitPropertyAccessExpressionForSubstitution(node)
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

// visitPropertyAccessExpressionForSubstitution visits only the expression of a PropertyAccessExpression,
// leaving the name unchanged. This prevents the name from being treated as a standalone identifier
// reference and incorrectly substituted with a class alias.
func (tx *classFieldsTransformer) visitPropertyAccessExpressionForSubstitution(node *ast.PropertyAccessExpression) *ast.Node {
	expression := tx.Visitor().VisitNode(node.Expression)
	if expression != node.Expression {
		return tx.Factory().UpdatePropertyAccessExpression(node, expression, node.QuestionDotToken, node.Name())
	}
	return node.AsNode()
}

func (tx *classFieldsTransformer) visitElementAccessExpression(node *ast.ElementAccessExpression) *ast.Node {
	if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
		ast.IsSuperProperty(node.AsNode()) &&
		isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		data := tx.lexicalEnvironment.data
		if data.facts&classFactsClassWasDecorated != 0 {
			return tx.visitInvalidSuperProperty(node.AsNode())
		}
		if data.classConstructor != nil && data.superClassReference != nil {
			// converts `super[x]` into `Reflect.get(_baseTemp, x, _classTemp)`
			superProperty := tx.Factory().NewReflectGetCall(
				data.superClassReference,
				tx.Visitor().VisitNode(node.ArgumentExpression),
				data.classConstructor,
			)
			tx.EmitContext().SetOriginal(superProperty, node.Expression)
			superProperty.Loc = node.Expression.Loc
			return superProperty
		}
	}
	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitPreOrPostfixUnaryExpression(node *ast.Node, discarded bool) *ast.Node {
	var operator ast.Kind
	var operand *ast.Node
	if ast.IsPrefixUnaryExpression(node) {
		operator = node.AsPrefixUnaryExpression().Operator
		operand = node.AsPrefixUnaryExpression().Operand
	} else {
		operator = node.AsPostfixUnaryExpression().Operator
		operand = node.AsPostfixUnaryExpression().Operand
	}

	if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
		operandSkipped := ast.SkipParentheses(operand)

		// Private identifier property access
		if ast.IsPropertyAccessExpression(operandSkipped) && ast.IsPrivateIdentifier(operandSkipped.Name()) {
			info := tx.accessPrivateIdentifier(operandSkipped.Name())
			if info != nil {
				receiver := tx.Visitor().VisitNode(operandSkipped.Expression())
				readExpression, initializeExpression := tx.createCopiableReceiverExpr(receiver)

				expression := tx.createPrivateIdentifierAccessHelper(info, readExpression)
				var temp *ast.IdentifierNode
				if !ast.IsPrefixUnaryExpression(node) && !discarded {
					temp = tx.Factory().NewTempVariable()
					tx.EmitContext().AddVariableDeclaration(temp)
				}
				expression = expandPreOrPostfixIncrementOrDecrementExpression(tx.Factory(), tx.EmitContext(), node, expression, temp)
				assignReceiver := readExpression
				if initializeExpression != nil {
					assignReceiver = initializeExpression
				}
				expression = tx.createPrivateIdentifierAssignment(info, assignReceiver, expression, ast.KindEqualsToken)
				tx.EmitContext().SetOriginal(expression, node)
				expression.Loc = node.Loc
				if temp != nil {
					expression = tx.Factory().NewCommaExpression(expression, temp)
					expression.Loc = node.Loc
				}
				return expression
			}
		} else if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
			ast.IsSuperProperty(operandSkipped) &&
			isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
			tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
			// converts `++super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = ++_a), _classTemp), _b)`
			// converts `++super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = ++_b), _classTemp), _c)`
			// converts `--super.a` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = --_a), _classTemp), _b)`
			// converts `--super[f()]` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = --_b), _classTemp), _c)`
			// converts `super.a++` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a++), _classTemp), _b)`
			// converts `super[f()]++` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b++), _classTemp), _c)`
			// converts `super.a--` into `(Reflect.set(_baseTemp, "a", (_a = Reflect.get(_baseTemp, "a", _classTemp), _b = _a--), _classTemp), _b)`
			// converts `super[f()]--` into `(Reflect.set(_baseTemp, _a = f(), (_b = Reflect.get(_baseTemp, _a, _classTemp), _c = _b--), _classTemp), _c)`
			data := tx.lexicalEnvironment.data
			if data.facts&classFactsClassWasDecorated != 0 {
				visitedExpr := tx.visitInvalidSuperProperty(operandSkipped)
				if ast.IsPrefixUnaryExpression(node) {
					return tx.Factory().UpdatePrefixUnaryExpression(node.AsPrefixUnaryExpression(), visitedExpr)
				}
				return tx.Factory().UpdatePostfixUnaryExpression(node.AsPostfixUnaryExpression(), visitedExpr)
			}
			if data.classConstructor != nil && data.superClassReference != nil {
				var setterName *ast.Expression
				var getterName *ast.Expression
				if ast.IsPropertyAccessExpression(operandSkipped) {
					if ast.IsIdentifier(operandSkipped.Name()) {
						getterName = tx.Factory().NewStringLiteralFromNode(operandSkipped.Name())
						setterName = getterName
					}
				} else if ast.IsElementAccessExpression(operandSkipped) {
					if transformers.IsSimpleInlineableExpression(operandSkipped.AsElementAccessExpression().ArgumentExpression) {
						getterName = operandSkipped.AsElementAccessExpression().ArgumentExpression
						setterName = getterName
					} else {
						getterName = tx.Factory().NewTempVariable()
						tx.EmitContext().AddVariableDeclaration(getterName)
						setterName = tx.Factory().NewAssignmentExpression(getterName, tx.Visitor().VisitNode(operandSkipped.AsElementAccessExpression().ArgumentExpression))
					}
				}
				if setterName != nil && getterName != nil {
					expression := tx.Factory().NewReflectGetCall(data.superClassReference, getterName, data.classConstructor)
					expression.Loc = operandSkipped.Loc

					var temp *ast.IdentifierNode
					if !discarded {
						temp = tx.Factory().NewTempVariable()
						tx.EmitContext().AddVariableDeclaration(temp)
					}
					expression = expandPreOrPostfixIncrementOrDecrementExpression(tx.Factory(), tx.EmitContext(), node, expression, temp)
					expression = tx.Factory().NewReflectSetCall(data.superClassReference, setterName, expression, data.classConstructor)
					tx.EmitContext().SetOriginal(expression, node)
					expression.Loc = node.Loc
					if temp != nil {
						expression = tx.Factory().NewCommaExpression(expression, temp)
						expression.Loc = node.Loc
					}
					return expression
				}
			}
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitForStatement(node *ast.ForStatement) *ast.Node {
	initializer := tx.discardedValueVisitor.VisitNode(node.Initializer)
	condition := tx.Visitor().VisitNode(node.Condition)
	incrementor := tx.discardedValueVisitor.VisitNode(node.Incrementor)
	saved := tx.inIterationStatement
	tx.inIterationStatement = true
	body := tx.EmitContext().VisitIterationBody(node.Statement, tx.Visitor())
	tx.inIterationStatement = saved
	return tx.Factory().UpdateForStatement(node, initializer, condition, incrementor, body)
}

func (tx *classFieldsTransformer) visitExpressionStatement(node *ast.ExpressionStatement) *ast.Node {
	// Preserve private identifiers that appear directly as the expression of an
	// ExpressionStatement (e.g., `#;`). This is error-recovery output from the parser
	// for invalid syntax. Keeping it ensures the runtime throws a SyntaxError rather
	// than silently succeeding with an empty statement.
	if ast.IsPrivateIdentifier(node.Expression) && tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		return node.AsNode()
	}
	return tx.Factory().UpdateExpressionStatement(
		node,
		tx.discardedValueVisitor.VisitNode(node.Expression),
	)
}

func (tx *classFieldsTransformer) createCopiableReceiverExpr(receiver *ast.Expression) (readExpression *ast.Expression, initializeExpression *ast.Expression) {
	clone := receiver
	if !ast.NodeIsSynthesized(receiver) {
		clone = receiver.Clone(tx.Factory())
	}
	if transformers.IsSimpleInlineableExpression(receiver) {
		return clone, nil
	}
	readExpression = tx.Factory().NewTempVariable()
	tx.EmitContext().AddVariableDeclaration(readExpression)
	initializeExpression = tx.Factory().NewAssignmentExpression(readExpression, clone)
	return readExpression, initializeExpression
}

func (tx *classFieldsTransformer) visitCallExpression(node *ast.CallExpression) *ast.Node {
	if ast.IsPropertyAccessExpression(node.Expression) && ast.IsPrivateIdentifier(node.Expression.AsPropertyAccessExpression().Name()) &&
		tx.accessPrivateIdentifier(node.Expression.AsPropertyAccessExpression().Name()) != nil {
		// obj.#x()

		// Transform call expressions of private names to properly bind the `this` parameter.
		thisArg, target := tx.createCallBinding(node.Expression)
		visitedTarget := tx.Visitor().VisitNode(target)
		visitedThisArg := tx.Visitor().VisitNode(thisArg)
		visitedArgs := tx.Visitor().VisitNodes(node.Arguments)
		allArgs := make([]*ast.Node, 0, 1+len(visitedArgs.Nodes))
		allArgs = append(allArgs, visitedThisArg)
		allArgs = append(allArgs, visitedArgs.Nodes...)
		if node.Flags&ast.NodeFlagsOptionalChain != 0 {
			return tx.Factory().UpdateCallExpression(
				node,
				tx.Factory().NewPropertyAccessExpression(visitedTarget, node.QuestionDotToken, tx.Factory().NewIdentifier("call"), ast.NodeFlagsOptionalChain),
				nil, /*questionDotToken*/
				nil, /*typeArguments*/
				tx.Factory().NewNodeList(allArgs),
			)
		}
		return tx.Factory().UpdateCallExpression(
			node,
			tx.Factory().NewPropertyAccessExpression(visitedTarget, nil, tx.Factory().NewIdentifier("call"), ast.NodeFlagsNone),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Factory().NewNodeList(allArgs),
		)
	}

	if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
		ast.IsSuperProperty(node.Expression) &&
		isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil &&
		tx.lexicalEnvironment.data.classConstructor != nil {
		// super.x()
		// super[x]()

		// converts `super.f(...)` into `Reflect.get(_baseTemp, "f", _classTemp).call(_classTemp, ...)`
		invocation := tx.Factory().NewFunctionCallCall(
			tx.Visitor().VisitNode(node.Expression),
			tx.lexicalEnvironment.data.classConstructor,
			tx.Visitor().VisitNodes(node.Arguments).Nodes,
		)
		tx.EmitContext().SetOriginal(invocation, node.AsNode())
		invocation.Loc = node.Loc
		return invocation
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitTaggedTemplateExpression(node *ast.TaggedTemplateExpression) *ast.Node {
	if ast.IsPropertyAccessExpression(node.Tag) && ast.IsPrivateIdentifier(node.Tag.AsPropertyAccessExpression().Name()) &&
		tx.accessPrivateIdentifier(node.Tag.AsPropertyAccessExpression().Name()) != nil {
		// Bind the `this` correctly for tagged template literals when the tag is a private identifier property access.
		thisArg, target := tx.createCallBinding(node.Tag)
		bindExpr := tx.Factory().NewCallExpression(
			tx.Factory().NewPropertyAccessExpression(tx.Visitor().VisitNode(target), nil, tx.Factory().NewIdentifier("bind"), ast.NodeFlagsNone),
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Factory().NewNodeList([]*ast.Node{tx.Visitor().VisitNode(thisArg)}),
			ast.NodeFlagsNone,
		)
		return tx.Factory().UpdateTaggedTemplateExpression(
			node,
			bindExpr,
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Visitor().VisitNode(node.Template),
		)
	}

	if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
		ast.IsSuperProperty(node.Tag) &&
		isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil &&
		tx.lexicalEnvironment.data.classConstructor != nil {
		// converts `` super.f`x` `` into `` Reflect.get(_baseTemp, "f", _classTemp).bind(_classTemp)`x` ``
		invocation := tx.Factory().NewFunctionBindCall(
			tx.Visitor().VisitNode(node.Tag),
			tx.lexicalEnvironment.data.classConstructor,
			nil,
		)
		tx.EmitContext().SetOriginal(invocation, node.AsNode())
		invocation.Loc = node.Loc
		return tx.Factory().UpdateTaggedTemplateExpression(
			node,
			invocation,
			nil, /*questionDotToken*/
			nil, /*typeArguments*/
			tx.Visitor().VisitNode(node.Template),
		)
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) transformClassStaticBlockDeclaration(node *ast.Node) *ast.Expression {
	if tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		if isClassThisAssignmentBlock(tx.EmitContext(), node) {
			result := tx.Visitor().VisitNode(node.AsClassStaticBlockDeclaration().Body.AsBlock().Statements.Nodes[0].Expression())
			// If the generated `_classThis` assignment is a noop (i.e., `_classThis = _classThis`), we can
			// eliminate the expression
			if ast.IsAssignmentExpression(result, true /*excludeCompoundAssignment*/) {
				binary := result.AsBinaryExpression()
				if binary.Left == binary.Right {
					return nil
				}
			}
			return result
		}

		if isClassNamedEvaluationHelperBlock(tx.EmitContext(), node) {
			return tx.Visitor().VisitNode(node.AsClassStaticBlockDeclaration().Body.AsBlock().Statements.Nodes[0].Expression())
		}

		tx.EmitContext().StartVariableEnvironment()
		statements := tx.setCurrentClassElementAndVisitStatements(node, node.AsClassStaticBlockDeclaration().Body.AsBlock().Statements.Nodes)
		statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)

		iife := tx.Factory().NewImmediatelyInvokedArrowFunction(statements)
		arrowFunction := ast.SkipParentheses(iife.Expression())
		tx.EmitContext().SetOriginal(arrowFunction, node)
		tx.EmitContext().AddEmitFlags(arrowFunction, printer.EFNoLexicalArguments)
		// Preserve the statement list source range so the printer can emit detached comments
		// (e.g., `// do` inside an otherwise empty static block)
		arrowFunction.AsArrowFunction().Body.AsBlock().Statements.Loc = node.AsClassStaticBlockDeclaration().Body.AsBlock().Statements.Loc
		tx.EmitContext().SetOriginal(iife, node)
		tx.EmitContext().AssignSourceMapRange(iife, node)
		return iife
	}
	return nil
}

func (tx *classFieldsTransformer) setCurrentClassElementAndVisitStatements(classElement *ast.Node, statements []*ast.Statement) []*ast.Statement {
	savedCurrentClassElement := tx.currentClassElement
	tx.currentClassElement = classElement
	result, _ := tx.Visitor().VisitSlice(statements)
	tx.currentClassElement = savedCurrentClassElement
	return result
}

func (tx *classFieldsTransformer) isAnonymousClassNeedingAssignedNameWorker(node *anonymousFunctionDefinition) bool {
	if ast.IsClassExpression(node) && node.Name() == nil {
		staticPropertiesOrClassStaticBlocks := tx.getStaticPropertiesAndClassStaticBlock(node)
		if core.Some(staticPropertiesOrClassStaticBlocks, func(n *ast.Node) bool {
			return isClassNamedEvaluationHelperBlock(tx.EmitContext(), n)
		}) {
			return false
		}
		hasTransformableStatics := (tx.shouldTransformPrivateElementsOrClassStaticBlocks ||
			tx.nodeHasTransformPrivateStaticElementsFlag(node)) &&
			core.Some(staticPropertiesOrClassStaticBlocks, func(n *ast.Node) bool {
				return ast.IsClassStaticBlockDeclaration(n) ||
					ast.IsPrivateIdentifierClassElementDeclaration(n) ||
					tx.shouldTransformInitializers && ast.IsInitializedProperty(n)
			})
		return hasTransformableStatics
	}
	return false
}

func (tx *classFieldsTransformer) visitBinaryExpression(node *ast.BinaryExpression, discarded bool) *ast.Node {
	if ast.IsDestructuringAssignment(node.AsNode()) {
		// ({ x: obj.#x } = ...)
		// ({ x: super.x } = ...)
		// ({ x: super[x] } = ...)
		savedPendingExpressions := tx.pendingExpressions
		tx.pendingExpressions = nil
		updated := tx.Factory().UpdateBinaryExpression(
			node,
			nil,
			tx.assignmentTargetVisitor.VisitNode(node.Left),
			nil,
			node.OperatorToken,
			tx.Visitor().VisitNode(node.Right),
		)
		var result *ast.Expression
		if len(tx.pendingExpressions) > 0 {
			exprs := append(tx.pendingExpressions, updated)
			result = tx.Factory().InlineExpressions(exprs)
		} else {
			result = updated
		}
		tx.pendingExpressions = savedPendingExpressions
		return result
	}

	if ast.IsAssignmentExpression(node.AsNode(), false /*excludeCompound*/) {
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

		if isNamedEvaluationAnd(tx.EmitContext(), node.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
			node = transformNamedEvaluation(tx.EmitContext(), node.AsNode(), false, "").AsBinaryExpression()
			debug.Assert(node.AsNode() != nil && ast.IsAssignmentExpression(node.AsNode(), false))
		}

		left := ast.SkipOuterExpressions(node.Left, ast.OEKPartiallyEmittedExpressions|ast.OEKParentheses)
		if ast.IsPropertyAccessExpression(left) && ast.IsPrivateIdentifier(left.Name()) {
			// obj.#x = ...
			info := tx.accessPrivateIdentifier(left.Name())
			if info != nil {
				result := tx.createPrivateIdentifierAssignment(info, left.Expression(), node.Right, node.OperatorToken.Kind)
				tx.EmitContext().SetOriginal(result, node.AsNode())
				result.Loc = node.Loc
				return result
			}
		} else if tx.shouldTransformSuperInStaticInitializers && tx.currentClassElement != nil &&
			ast.IsSuperProperty(node.Left) &&
			isStaticPropertyDeclarationOrClassStaticBlock(tx.currentClassElement) &&
			tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
			// super.x = ...
			// super[x] = ...
			// super.x += ...
			// super.x -= ...
			data := tx.lexicalEnvironment.data
			if data.facts&classFactsClassWasDecorated != 0 {
				return tx.Factory().UpdateBinaryExpression(
					node,
					nil,
					tx.visitInvalidSuperProperty(node.Left),
					nil,
					node.OperatorToken,
					tx.Visitor().VisitNode(node.Right),
				)
			}
			if data.classConstructor != nil && data.superClassReference != nil {
				var setterName *ast.Expression
				if ast.IsElementAccessExpression(node.Left) {
					setterName = tx.Visitor().VisitNode(node.Left.AsElementAccessExpression().ArgumentExpression)
				} else if ast.IsPropertyAccessExpression(node.Left) && ast.IsIdentifier(node.Left.AsPropertyAccessExpression().Name()) {
					setterName = tx.Factory().NewStringLiteralFromNode(node.Left.AsPropertyAccessExpression().Name())
				}
				if setterName != nil {
					// converts `super.x = 1` into `(Reflect.set(_baseTemp, "x", _a = 1, _classTemp), _a)`
					// converts `super[f()] = 1` into `(Reflect.set(_baseTemp, f(), _a = 1, _classTemp), _a)`
					// converts `super.x += 1` into `(Reflect.set(_baseTemp, "x", _a = Reflect.get(_baseTemp, "x", _classtemp) + 1, _classTemp), _a)`
					// converts `super[f()] += 1` into `(Reflect.set(_baseTemp, _a = f(), _b = Reflect.get(_baseTemp, _a, _classtemp) + 1, _classTemp), _b)`

					expression := tx.Visitor().VisitNode(node.Right)
					if ast.IsCompoundAssignment(node.OperatorToken.Kind) {
						getterName := setterName
						if !transformers.IsSimpleInlineableExpression(setterName) {
							getterName = tx.Factory().NewTempVariable()
							tx.EmitContext().AddVariableDeclaration(getterName)
							setterName = tx.Factory().NewAssignmentExpression(getterName, setterName)
						}
						superPropertyGet := tx.Factory().NewReflectGetCall(
							data.superClassReference,
							getterName,
							data.classConstructor,
						)
						tx.EmitContext().SetOriginal(superPropertyGet, node.Left)
						superPropertyGet.Loc = node.Left.Loc
						expression = tx.Factory().NewBinaryExpression(
							nil,
							superPropertyGet,
							nil,
							tx.Factory().NewToken(transformers.GetNonAssignmentOperatorForCompoundAssignment(node.OperatorToken.Kind)),
							expression,
						)
						expression.Loc = node.Loc
					}

					var temp *ast.IdentifierNode
					if !discarded {
						temp = tx.Factory().NewTempVariable()
						tx.EmitContext().AddVariableDeclaration(temp)
					}
					if temp != nil {
						expression = tx.Factory().NewAssignmentExpression(temp, expression)
						expression.Loc = node.Loc
					}

					expression = tx.Factory().NewReflectSetCall(
						data.superClassReference,
						setterName,
						expression,
						data.classConstructor,
					)
					tx.EmitContext().SetOriginal(expression, node.AsNode())
					expression.Loc = node.Loc

					if temp != nil {
						expression = tx.Factory().NewCommaExpression(expression, temp)
						expression.Loc = node.Loc
					}
					return expression
				}
			}
		}
	}

	if node.OperatorToken.Kind == ast.KindInKeyword && ast.IsPrivateIdentifier(node.Left) {
		// #x in obj
		return tx.transformPrivateIdentifierInInExpression(node)
	}

	return tx.Visitor().VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitParenthesizedExpression(node *ast.ParenthesizedExpression, discarded bool) *ast.Node {
	// 8.4.5 RS: NamedEvaluation
	//   ParenthesizedExpression : `(` Expression `)`
	//     ...
	//     2. Return ? NamedEvaluation of |Expression| with argument _name_.
	if discarded {
		expression := tx.discardedValueVisitor.VisitNode(node.Expression)
		return tx.Factory().UpdateParenthesizedExpression(node, expression)
	}
	expression := tx.Visitor().VisitNode(node.Expression)
	return tx.Factory().UpdateParenthesizedExpression(node, expression)
}

func (tx *classFieldsTransformer) createPrivateIdentifierAssignment(info *privateIdentifierInfo, receiver *ast.Expression, right *ast.Expression, operator ast.Kind) *ast.Expression {
	receiver = tx.Visitor().VisitNode(receiver)
	right = tx.Visitor().VisitNode(right)

	if ast.IsCompoundAssignment(operator) {
		readExpression, initializeExpression := tx.createCopiableReceiverExpr(receiver)
		if initializeExpression != nil {
			receiver = initializeExpression
		} else {
			receiver = readExpression
		}
		right = tx.Factory().NewBinaryExpression(
			nil,
			tx.createPrivateIdentifierAccessHelper(info, readExpression),
			nil,
			tx.Factory().NewToken(transformers.GetNonAssignmentOperatorForCompoundAssignment(operator)),
			right,
		)
	}

	tx.EmitContext().SetCommentRange(receiver, core.NewTextRange(-1, receiver.End()))

	switch info.kind {
	case printer.PrivateIdentifierKindAccessor:
		return tx.Factory().NewClassPrivateFieldSetHelper(
			receiver,
			info.brandCheckIdentifier,
			right,
			info.kind,
			info.setterName,
		)
	case printer.PrivateIdentifierKindMethod:
		return tx.Factory().NewClassPrivateFieldSetHelper(
			receiver,
			info.brandCheckIdentifier,
			right,
			info.kind,
			nil,
		)
	case printer.PrivateIdentifierKindField:
		var f *ast.IdentifierNode
		if info.isStatic {
			f = info.variableName
		}
		return tx.Factory().NewClassPrivateFieldSetHelper(
			receiver,
			info.brandCheckIdentifier,
			right,
			info.kind,
			f,
		)
	case printer.PrivateIdentifierKindUntransformed:
		debug.Fail("Access helpers should not be created for untransformed private elements")
		return nil
	}
	debug.AssertNever(info, "Unknown private element type")
	return nil
}

func (tx *classFieldsTransformer) getPrivateInstanceMethodsAndAccessors(node *ast.Node) []*ast.Node {
	return core.Filter(node.Members(), isNonStaticMethodOrAccessorWithPrivateName)
}

// memberContainsConstructorReference checks if a class member's body contains an identifier
// that resolves to the class declaration. Replaces Strada's resolver.hasNodeCheckFlag(member,
// NodeCheckFlags.ContainsConstructorReference) by walking the AST with the EmitResolver.
// Only checks member bodies (not computed property names), since computed property names
// are evaluated during class definition when the binding is still correct.
func (tx *classFieldsTransformer) memberContainsConstructorReference(member *ast.Node, classDecl *ast.Node) bool {
	classOriginal := tx.EmitContext().MostOriginal(classDecl)
	className := ast.GetNameOfDeclaration(classDecl)
	var check func(n *ast.Node) bool
	check = func(n *ast.Node) bool {
		if ast.IsIdentifier(n) && n != className {
			decl := tx.resolver.GetReferencedValueDeclaration(n)
			if decl == classOriginal {
				return true
			}
		}
		// For PropertyAccessExpression, only check the expression, not the name.
		// The .Name() is a property access name, not a value reference to the class.
		if ast.IsPropertyAccessExpression(n) {
			return check(n.Expression())
		}
		return n.ForEachChild(check)
	}
	// Check only the body/initializer of the member, not the name (which may be
	// a computed property name that shouldn't trigger alias substitution).
	if ast.IsClassStaticBlockDeclaration(member) {
		body := member.AsClassStaticBlockDeclaration().Body
		if body != nil && check(body.AsNode()) {
			return true
		}
	} else {
		body := member.Body()
		if body != nil && check(body) {
			return true
		}
	}
	if ast.IsPropertyDeclaration(member) {
		init := member.Initializer()
		if init != nil && check(init) {
			return true
		}
	}
	return false
}

// classContainsConstructorReference checks if any member of a class contains
// references to the class's own constructor. Replaces Strada's
// resolver.hasNodeCheckFlag(node, NodeCheckFlags.ContainsConstructorReference).
func (tx *classFieldsTransformer) classContainsConstructorReference(node *ast.Node) bool {
	for _, member := range node.Members() {
		if tx.memberContainsConstructorReference(member, node) {
			return true
		}
	}
	return false
}

func (tx *classFieldsTransformer) getClassFacts(node *ast.Node) classFacts {
	facts := classFactsNone

	original := tx.EmitContext().MostOriginal(node)
	if ast.IsClassLike(original) && ast.ClassOrConstructorParameterIsDecorated(tx.legacyDecorators /*useLegacyDecorators*/, original) {
		facts |= classFactsClassWasDecorated
	}

	if tx.shouldTransformPrivateElementsOrClassStaticBlocks &&
		(classHasClassThisAssignment(tx.EmitContext(), node) || classHasExplicitlyAssignedName(tx.EmitContext(), node)) {
		facts |= classFactsNeedsClassConstructorReference
	}

	var containsPublicInstanceFields bool
	var containsInitializedPublicInstanceFields bool
	var containsInstancePrivateElements bool
	var containsInstanceAutoAccessors bool

	for _, member := range node.Members() {
		if ast.IsStatic(member) {
			if member.Name() != nil && (ast.IsPrivateIdentifier(member.Name()) || ast.IsAutoAccessorPropertyDeclaration(member)) &&
				tx.shouldTransformPrivateElementsOrClassStaticBlocks {
				facts |= classFactsNeedsClassConstructorReference
			} else if ast.IsAutoAccessorPropertyDeclaration(member) && tx.shouldTransformAutoAccessors &&
				node.Name() == nil && tx.EmitContext().ClassThis(node) == nil {
				facts |= classFactsNeedsClassConstructorReference
			}
			if ast.IsPropertyDeclaration(member) || ast.IsClassStaticBlockDeclaration(member) {
				if tx.shouldTransformThisInStaticInitializers && member.SubtreeFacts()&ast.SubtreeContainsLexicalThis != 0 {
					facts |= classFactsNeedsSubstitutionForThisInClassStaticField
					if facts&classFactsClassWasDecorated == 0 {
						facts |= classFactsNeedsClassConstructorReference
					}
				}
				if tx.shouldTransformSuperInStaticInitializers && member.SubtreeFacts()&ast.SubtreeContainsLexicalSuper != 0 {
					if facts&classFactsClassWasDecorated == 0 {
						facts |= classFactsNeedsClassConstructorReference | classFactsNeedsClassSuperReference
					}
				}
			}
		} else if !ast.HasAbstractModifier(tx.EmitContext().MostOriginal(member)) {
			if ast.IsAutoAccessorPropertyDeclaration(member) {
				containsInstanceAutoAccessors = true
				containsInstancePrivateElements = containsInstancePrivateElements || ast.IsPrivateIdentifierClassElementDeclaration(member)
			} else if ast.IsPrivateIdentifierClassElementDeclaration(member) {
				containsInstancePrivateElements = true
				if tx.memberContainsConstructorReference(member, node) {
					facts |= classFactsNeedsClassConstructorReference
				}
			} else if ast.IsPropertyDeclaration(member) {
				containsPublicInstanceFields = true
				containsInitializedPublicInstanceFields = containsInitializedPublicInstanceFields || member.Initializer() != nil
			}
		}
	}

	willHoistInitializersToConstructor := (tx.shouldTransformInitializersUsingDefine && containsPublicInstanceFields) ||
		(tx.shouldTransformInitializersUsingSet && containsInitializedPublicInstanceFields) ||
		(tx.shouldTransformPrivateElementsOrClassStaticBlocks && containsInstancePrivateElements) ||
		(tx.shouldTransformPrivateElementsOrClassStaticBlocks && containsInstanceAutoAccessors && tx.shouldTransformAutoAccessors)

	if willHoistInitializersToConstructor {
		facts |= classFactsWillHoistInitializersToConstructor
	}

	return facts
}

func (tx *classFieldsTransformer) visitExpressionWithTypeArgumentsInHeritageClause(node *ast.ExpressionWithTypeArguments) *ast.Node {
	facts := classFactsNone
	if tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		facts = tx.lexicalEnvironment.data.facts
	}
	if facts&classFactsNeedsClassSuperReference != 0 {
		temp := tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
		})
		tx.EmitContext().AddVariableDeclaration(temp)
		tx.getClassLexicalEnvironment().superClassReference = temp
		return tx.Factory().UpdateExpressionWithTypeArguments(
			node,
			tx.Factory().NewAssignmentExpression(temp, tx.Visitor().VisitNode(node.Expression)),
			nil, /*typeArguments*/
		)
	}
	return tx.heritageClauseVisitor.VisitEachChild(node.AsNode())
}

func (tx *classFieldsTransformer) visitInNewClassLexicalEnvironment(node *ast.Node, visitor func(tx *classFieldsTransformer, node *ast.Node, facts classFacts) *ast.Node) *ast.Node {
	savedCurrentClassContainer := tx.currentClassContainer
	savedPendingExpressions := tx.pendingExpressions
	savedLexicalEnvironment := tx.lexicalEnvironment
	tx.currentClassContainer = node
	tx.pendingExpressions = nil
	tx.startClassLexicalEnvironment()
	original := tx.EmitContext().MostOriginal(node)
	tx.enclosingClassDeclarations.Add(original)

	if tx.shouldTransformPrivateElementsOrClassStaticBlocks || tx.nodeHasTransformPrivateStaticElementsFlag(node) {
		name := ast.GetNameOfDeclaration(node)
		if name != nil && ast.IsIdentifier(name) {
			tx.getPrivateIdentifierEnvironment().data.className = name
		} else if assignedName := tx.EmitContext().AssignedName(node); assignedName != nil {
			if ast.IsStringLiteral(assignedName) {
				// If the assigned name has a textSourceNode that is an identifier, use it directly.
				if textSourceNode := tx.EmitContext().TextSource(assignedName); textSourceNode != nil && ast.IsIdentifier(textSourceNode) {
					tx.getPrivateIdentifierEnvironment().data.className = textSourceNode
				} else if scanner.IsIdentifierText(assignedName.Text(), core.LanguageVariantStandard) {
					// If the text is a valid identifier, create an identifier from it.
					prefixName := tx.Factory().NewIdentifier(assignedName.Text())
					tx.getPrivateIdentifierEnvironment().data.className = prefixName
				}
			}
		}
	}

	if tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		privateInstanceMethodsAndAccessors := tx.getPrivateInstanceMethodsAndAccessors(node)
		if len(privateInstanceMethodsAndAccessors) > 0 {
			tx.getPrivateIdentifierEnvironment().data.weakSetName = tx.createHoistedVariableForClass(
				"instances",
				privateInstanceMethodsAndAccessors[0].Name(),
				"",
			)
		}
	}

	facts := tx.getClassFacts(node)
	if facts != classFactsNone {
		tx.getClassLexicalEnvironment().facts = facts
	}

	result := visitor(tx, node, facts)
	tx.enclosingClassDeclarations.Delete(original)
	tx.endClassLexicalEnvironment()
	debug.Assert(tx.lexicalEnvironment == savedLexicalEnvironment)
	tx.currentClassContainer = savedCurrentClassContainer
	tx.pendingExpressions = savedPendingExpressions
	tx.lexicalEnvironment = savedLexicalEnvironment
	return result
}

func (tx *classFieldsTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	return tx.visitInNewClassLexicalEnvironment(node.AsNode(), (*classFieldsTransformer).visitClassDeclarationInNewClassLexicalEnvironment)
}

func (tx *classFieldsTransformer) visitClassDeclarationInNewClassLexicalEnvironment(node *ast.Node, facts classFacts) *ast.Node {
	classDecl := node.AsClassDeclaration()
	// If a class has private static fields, or a static field has a `this` or `super` reference,
	// then we need to allocate a temp variable to hold on to that reference.
	var pendingClassReferenceAssignment *ast.Expression
	if facts&classFactsNeedsClassConstructorReference != 0 {
		// If we aren't transforming class static blocks, then we can't reuse `_classThis` since in
		// `class C { ... static { _classThis = ... } }; _classThis = C` the outer assignment would occur *after*
		// class static blocks evaluate and would overwrite the replacement constructor produced by class
		// decorators.

		// If we are transforming class static blocks, then we can reuse `_classThis` since the assignment
		// will be evaluated *before* the transformed static blocks are evaluated and thus won't overwrite
		// the replacement constructor.

		if tx.shouldTransformPrivateElementsOrClassStaticBlocks && tx.EmitContext().ClassThis(node) != nil {
			classThis := tx.EmitContext().ClassThis(node)
			tx.getClassLexicalEnvironment().classConstructor = classThis
			pendingClassReferenceAssignment = tx.Factory().NewAssignmentExpression(
				classThis,
				tx.Factory().GetLocalName(node),
			)
		} else {
			temp := tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
				Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
			})
			tx.EmitContext().AddVariableDeclaration(temp)
			tx.getClassLexicalEnvironment().classConstructor = temp.Clone(tx.Factory())
			pendingClassReferenceAssignment = tx.Factory().NewAssignmentExpression(
				temp,
				tx.Factory().GetLocalName(node),
			)
		}
	}

	if tx.EmitContext().ClassThis(node) != nil {
		tx.getClassLexicalEnvironment().classThis = tx.EmitContext().ClassThis(node)
	}

	isClassWithConstructorReference := tx.classContainsConstructorReference(node)

	// Register class alias BEFORE visiting members (Strada registers after, since its
	// onSubstituteNode runs at emit time; we substitute eagerly during transformation).
	alias := tx.getClassLexicalEnvironment().classConstructor
	if isClassWithConstructorReference && alias != nil {
		tx.classAliases[tx.EmitContext().MostOriginal(node)] = alias
	}

	modifiers := tx.modifierVisitor.VisitModifiers(classDecl.Modifiers())
	heritageClauses := tx.heritageClauseVisitor.VisitNodes(classDecl.HeritageClauses)
	members, membersPrologue := tx.transformClassMembers(node)

	var statements []*ast.Node

	if pendingClassReferenceAssignment != nil {
		tx.pendingExpressions = append([]*ast.Expression{pendingClassReferenceAssignment}, tx.pendingExpressions...)
	}

	// Write any pending expressions from elided or moved computed property names
	if len(tx.pendingExpressions) > 0 {
		statements = append(statements, tx.Factory().NewExpressionStatement(tx.Factory().InlineExpressions(tx.pendingExpressions)))
	}

	// A class declaration without a name needs a generated name if it has static
	// initialized properties, since those will be moved outside the class body and
	// need to reference the class by name.
	name := classDecl.Name()

	if tx.shouldTransformInitializersUsingSet || tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		// Emit static property assignment. Because classDeclaration is lexically evaluated,
		// it is safe to emit static property assignment after classDeclaration
		// From ES6 specification:
		//   HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
		//                               a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
		staticProperties := tx.getStaticPropertiesAndClassStaticBlock(node)
		if len(staticProperties) > 0 {
			if name == nil {
				name = tx.Factory().NewGeneratedNameForNode(node)
			}
			statements = tx.addPropertyOrClassStaticBlockStatements(statements, staticProperties, tx.Factory().GetLocalName(node))
		}
	}

	isExport := ast.HasSyntacticModifier(node, ast.ModifierFlagsExport)
	isDefault := ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault)

	if len(statements) > 0 && isExport && isDefault {
		modifiers = transformers.ExtractModifiers(tx.EmitContext(), modifiers, ^ast.ModifierFlagsExportDefault)
		exportAssignment := tx.Factory().NewExportAssignment(nil, false /*isExportEquals*/, nil /*typeNode*/, tx.Factory().GetLocalName(node))
		statements = append(statements, exportAssignment)
	}

	updatedClass := tx.Factory().UpdateClassDeclaration(
		classDecl,
		modifiers,
		name,
		nil, /*typeParameters*/
		heritageClauses,
		members,
	)

	result := make([]*ast.Node, 0, 1+len(statements)+1)
	if membersPrologue != nil {
		result = append(result, tx.Factory().NewExpressionStatement(membersPrologue))
	}
	result = append(result, updatedClass)
	result = append(result, statements...)
	return tx.Factory().NewSyntaxList(result)
}

func (tx *classFieldsTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	return tx.visitInNewClassLexicalEnvironment(node.AsNode(), (*classFieldsTransformer).visitClassExpressionInNewClassLexicalEnvironment)
}

func (tx *classFieldsTransformer) visitClassExpressionInNewClassLexicalEnvironment(node *ast.Node, facts classFacts) *ast.Node {
	classExpr := node.AsClassExpression()

	// If this class expression is a transformation of a decorated class declaration,
	// then we want to output the pendingExpressions as statements, not as inlined
	// expressions with the class statement.
	//
	// In this case, we use pendingStatements to produce the same output as the
	// class declaration transformation. The VariableStatement visitor will insert
	// these statements after the class expression variable statement.
	isDecoratedClassDeclaration := facts&classFactsClassWasDecorated != 0

	if tx.EmitContext().ClassThis(node) != nil {
		tx.getClassLexicalEnvironment().classThis = tx.EmitContext().ClassThis(node)
	}

	var temp *ast.IdentifierNode
	if facts&classFactsNeedsClassConstructorReference != 0 {
		if (tx.shouldTransformPrivateElementsOrClassStaticBlocks || tx.nodeHasTransformPrivateStaticElementsFlag(node)) && tx.EmitContext().ClassThis(node) != nil {
			classThis := tx.EmitContext().ClassThis(node)
			tx.getClassLexicalEnvironment().classConstructor = classThis
			temp = classThis
		} else {
			temp = tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
				Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
			})
			if tx.classExpressionNeedsBlockScopedTemp() {
				tx.EmitContext().AddLexicalDeclaration(temp)
			} else {
				tx.EmitContext().AddVariableDeclaration(temp)
			}
			tx.getClassLexicalEnvironment().classConstructor = temp.Clone(tx.Factory())
		}
	}

	staticPropertiesOrClassStaticBlocks := tx.getStaticPropertiesAndClassStaticBlock(node)

	// Pre-compute whether the class expression will need a temp variable wrapper.
	// Strada registers class aliases AFTER transformClassMembers (since onSubstituteNode runs
	// at emit time), but we must predict this before visiting members since we substitute
	// eagerly. This requires pre-detecting willHavePrivatePendingExpressions.
	isClassWithConstructorReference := false
	hasTransformableStatics := false
	deferTempDeclaration := false
	if !isDecoratedClassDeclaration {
		isClassWithConstructorReference = tx.classContainsConstructorReference(node)
		hasTransformableStatics = (tx.shouldTransformPrivateElementsOrClassStaticBlocks ||
			tx.nodeHasTransformPrivateStaticElementsFlag(node)) &&
			core.Some(staticPropertiesOrClassStaticBlocks, func(n *ast.Node) bool {
				return ast.IsClassStaticBlockDeclaration(n) ||
					ast.IsPrivateIdentifierClassElementDeclaration(n) ||
					(tx.shouldTransformInitializers && ast.IsInitializedProperty(n))
			})

		// Private instance elements (fields, methods, accessors) transformed to
		// WeakMap/WeakSet will add initialization expressions to pendingExpressions
		// during transformClassMembers. Pre-detect this so we know whether the class
		// will be wrapped with a temp variable.
		willHavePrivatePendingExpressions := tx.shouldTransformPrivateElementsOrClassStaticBlocks &&
			core.Some(node.Members(), func(n *ast.Node) bool {
				return ast.IsPrivateIdentifierClassElementDeclaration(n) && !ast.HasStaticModifier(n) && tx.shouldTransformClassElementToWeakMap(n)
			})
		willNeedTempWrapper := hasTransformableStatics || willHavePrivatePendingExpressions

		// Register class alias BEFORE visiting members (Strada registers after, since its
		// onSubstituteNode runs at emit time). Only register when the class will be wrapped
		// with a temp, matching Strada's conditional registration.
		if isClassWithConstructorReference && willNeedTempWrapper && tx.getClassLexicalEnvironment().classConstructor == nil {
			// Create temp early so the alias is available during member visiting, even though in the Strada
			// reference the temp would be created later in the pendingExpressions branch.
			temp = tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
				Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
			})
			// Defer AddVariableDeclaration to preserve Strada's variable declaration ordering.
			deferTempDeclaration = true
			tx.getClassLexicalEnvironment().classConstructor = temp.Clone(tx.Factory())
		}
		if alias := tx.getClassLexicalEnvironment().classConstructor; isClassWithConstructorReference && willNeedTempWrapper && alias != nil {
			tx.classAliases[tx.EmitContext().MostOriginal(node)] = alias
		}
	}

	modifiers := tx.modifierVisitor.VisitModifiers(classExpr.Modifiers())
	heritageClauses := tx.heritageClauseVisitor.VisitNodes(classExpr.HeritageClauses)
	members, membersPrologue := tx.transformClassMembers(node)

	if deferTempDeclaration {
		if tx.classExpressionNeedsBlockScopedTemp() {
			tx.EmitContext().AddLexicalDeclaration(temp)
		} else {
			tx.EmitContext().AddVariableDeclaration(temp)
		}
	}

	classExpression := tx.Factory().UpdateClassExpression(
		classExpr,
		modifiers,
		classExpr.Name(),
		nil, /*typeParameters*/
		heritageClauses,
		members,
	)

	var expressions []*ast.Expression
	if membersPrologue != nil {
		expressions = append(expressions, membersPrologue)
	}

	if !isDecoratedClassDeclaration {
		if hasTransformableStatics || len(tx.pendingExpressions) > 0 {
			if temp == nil {
				temp = tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
					Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
				})
				if tx.classExpressionNeedsBlockScopedTemp() {
					tx.EmitContext().AddLexicalDeclaration(temp)
				} else {
					tx.EmitContext().AddVariableDeclaration(temp)
				}
				tx.getClassLexicalEnvironment().classConstructor = temp.Clone(tx.Factory())
				if isClassWithConstructorReference {
					tx.classAliases[tx.EmitContext().MostOriginal(node)] = tx.getClassLexicalEnvironment().classConstructor
				}
			}

			expressions = append(expressions, tx.Factory().NewAssignmentExpression(temp, classExpression))

			// Add any pending expressions leftover from elided or relocated computed property names
			expressions = append(expressions, tx.pendingExpressions...)

			expressions = append(expressions, tx.generateInitializedPropertyExpressionsOrClassStaticBlock(staticPropertiesOrClassStaticBlocks, temp)...)
			expressions = append(expressions, temp.Clone(tx.Factory()))
		} else {
			expressions = append(expressions, classExpression)
		}
	} else {
		// Decorated class declaration path: emit static properties as separate statements
		// via pendingStatements, matching the class declaration output structure.

		// Write any pending expressions from elided or moved computed property names
		if len(tx.pendingExpressions) > 0 {
			for _, expr := range tx.pendingExpressions {
				tx.pendingStatements = append(tx.pendingStatements, tx.Factory().NewExpressionStatement(expr))
			}
		}

		// Emit static properties as statements (via pendingStatements) using the class's
		// internal name as the receiver, matching the class declaration output structure.
		if len(staticPropertiesOrClassStaticBlocks) > 0 {
			classThisOrName := tx.EmitContext().ClassThis(node)
			if classThisOrName == nil {
				classThisOrName = tx.Factory().GetLocalName(node)
			}
			tx.pendingStatements = tx.addPropertyOrClassStaticBlockStatements(tx.pendingStatements, staticPropertiesOrClassStaticBlocks, classThisOrName)
		}

		if temp != nil {
			expressions = append(expressions, tx.Factory().NewAssignmentExpression(temp, classExpression))
		} else if tx.shouldTransformPrivateElementsOrClassStaticBlocks && tx.EmitContext().ClassThis(node) != nil {
			expressions = append(expressions, tx.Factory().NewAssignmentExpression(tx.EmitContext().ClassThis(node), classExpression))
		} else {
			expressions = append(expressions, classExpression)
		}
	}

	if len(expressions) > 1 {
		tx.EmitContext().AddEmitFlags(classExpression, printer.EFIndented)
		for _, expr := range expressions {
			tx.EmitContext().AddEmitFlags(expr, printer.EFStartOnNewLine)
		}
	}
	return tx.Factory().InlineExpressions(expressions)
}

func (tx *classFieldsTransformer) visitClassStaticBlockDeclaration(node *ast.Node) *ast.Node {
	if !tx.shouldTransformPrivateElementsOrClassStaticBlocks {
		return tx.Visitor().VisitEachChild(node)
	}
	// ClassStaticBlockDeclaration for classes are transformed in visitClassDeclaration/visitClassExpression.
	return nil
}

// visitThisExpression replaces Strada's substituteThisExpression / onSubstituteNode.
// Strada substitutes `this` at emit time; we do it eagerly during transformation.
//
// The Strada noSubstitution set (ensureDynamicThisIfNeeded) is not needed because
// transformAutoAccessor() passes the receiver directly rather than emitting `this`.
func (tx *classFieldsTransformer) visitThisExpression(node *ast.Node) *ast.Node {
	if tx.insideComputedPropertyName && tx.shouldTransformThisInStaticInitializers &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		// Don't replace `this` in computed property names for ES-decorated classes.
		// The esDecorator transformer wraps them in an arrow IIFE where `this` already
		// refers to the correct outer scope.
		if tx.lexicalEnvironment.data.facts&classFactsClassWasDecorated == 0 || tx.legacyDecorators {
			if classThis := tx.tryGetClassThisNoContainer(); classThis != nil {
				return classThis
			}
		}
	}
	if tx.shouldTransformThisInStaticInitializers && tx.currentClassElement != nil &&
		(ast.IsClassStaticBlockDeclaration(tx.currentClassElement) ||
			(ast.IsPropertyDeclaration(tx.currentClassElement) && ast.HasStaticModifier(tx.currentClassElement))) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil {
		if classThis := tx.tryGetClassThisNoContainer(); classThis != nil {
			return classThis
		}
		// When the class was decorated with legacy decorators and no class constructor
		// reference is available, the decorator may replace the constructor, so `this`
		// cannot reliably point to the class. Use `(void 0)` instead.
		if tx.lexicalEnvironment.data.facts&classFactsClassWasDecorated != 0 && tx.legacyDecorators {
			return tx.Factory().NewParenthesizedExpression(tx.Factory().NewVoidZeroExpression())
		}
	}
	return node
}

func (tx *classFieldsTransformer) transformClassMembers(node *ast.Node) (members *ast.NodeList, prologue *ast.Expression) {
	shouldTransformPrivateStaticElementsInClass := tx.EmitContext().EmitFlags(node)&printer.EFTransformPrivateStaticElements != 0

	// Declare private names
	if tx.shouldTransformPrivateElementsOrClassStaticBlocks || tx.shouldTransformPrivateStaticElementsInFile {
		for _, member := range node.Members() {
			if ast.IsPrivateIdentifierClassElementDeclaration(member) {
				if tx.shouldTransformClassElementToWeakMap(member) {
					tx.addPrivateIdentifierToEnvironment(member)
				} else {
					env := tx.getPrivateIdentifierEnvironment()
					tx.setPrivateIdentifier(env, member.Name(), &privateIdentifierInfo{
						kind: printer.PrivateIdentifierKindUntransformed,
					})
				}
			}
		}

		if tx.shouldTransformPrivateElementsOrClassStaticBlocks {
			if len(tx.getPrivateInstanceMethodsAndAccessors(node)) > 0 {
				tx.createBrandCheckWeakSetForPrivateMethods()
			}
		}

		if tx.shouldTransformAutoAccessorsInCurrentClass() {
			for _, member := range node.Members() {
				if ast.IsAutoAccessorPropertyDeclaration(member) {
					storageName := tx.Factory().NewGeneratedPrivateNameForNodeEx(member.Name(), printer.AutoGenerateOptions{Suffix: "_accessor_storage"})
					if tx.shouldTransformPrivateElementsOrClassStaticBlocks ||
						shouldTransformPrivateStaticElementsInClass && ast.HasStaticModifier(member) {
						tx.addPrivateIdentifierPropertyDeclarationToEnvironment(member, storageName)
					} else {
						env := tx.getPrivateIdentifierEnvironment()
						// Only register as untransformed if it hasn't already been registered
						// by the first loop (e.g., if esDecorators expanded a private auto-accessor
						// into a backing field with the same generated name).
						if _, ok := tx.getPrivateIdentifier(env, storageName); !ok {
							tx.setPrivateIdentifier(env, storageName, &privateIdentifierInfo{
								kind: printer.PrivateIdentifierKindUntransformed,
							})
						}
					}
				}
			}
		}
	}

	members = tx.classElementVisitor.VisitNodes(node.MemberList())

	// Create a synthetic constructor if necessary
	var syntheticConstructor *ast.Node
	if !core.Some(members.Nodes, ast.IsConstructorDeclaration) {
		syntheticConstructor = tx.transformConstructor(nil, node)
	}

	// If there are pending expressions create a class static block in which to evaluate them, but only if
	// class static blocks are not also being transformed. This block will be injected at the top of the class
	// to ensure that expressions from computed property names are evaluated before any other static
	// initializers.
	var syntheticStaticBlock *ast.Node
	if !tx.shouldTransformPrivateElementsOrClassStaticBlocks && len(tx.pendingExpressions) > 0 {
		statement := tx.Factory().NewExpressionStatement(tx.Factory().InlineExpressions(tx.pendingExpressions))
		if statement.SubtreeFacts()&ast.SubtreeContainsLexicalThisOrSuper != 0 {
			// If there are `this` or `super` references from computed property names, shift the expression
			// into an arrow function to be evaluated in the outer scope so that `this` and `super` are
			// properly captured.
			temp := tx.Factory().NewTempVariable()
			tx.EmitContext().AddVariableDeclaration(temp)
			arrow := tx.Factory().NewArrowFunction(
				nil,                           /*modifiers*/
				nil,                           /*typeParameters*/
				tx.Factory().NewNodeList(nil), /*parameters*/
				nil,                           /*returnType*/
				nil,                           /*fullSignature*/
				tx.Factory().NewToken(ast.KindEqualsGreaterThanToken), /*equalsGreaterThanToken*/
				tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{statement}), false /*multiline*/),
			)
			prologue = tx.Factory().NewAssignmentExpression(temp, arrow)
			statement = tx.Factory().NewExpressionStatement(
				tx.Factory().NewCallExpression(temp, nil /*questionDotToken*/, nil /*typeArguments*/, tx.Factory().NewNodeList(nil), ast.NodeFlagsNone),
			)
		}

		block := tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{statement}), false /*multiline*/)
		syntheticStaticBlock = tx.Factory().NewClassStaticBlockDeclaration(nil /*modifiers*/, block)
		tx.pendingExpressions = nil
	}

	// If we created a synthetic constructor or class static block, add them to the visited members
	if syntheticConstructor != nil || syntheticStaticBlock != nil {
		membersArray := make([]*ast.Node, 0, len(members.Nodes)+2)

		// Find and preserve classThis assignment block and named evaluation helper block at the top
		classThisIdx := slices.IndexFunc(members.Nodes, func(n *ast.Node) bool {
			return isClassThisAssignmentBlock(tx.EmitContext(), n)
		})
		namedEvalIdx := slices.IndexFunc(members.Nodes, func(n *ast.Node) bool {
			return isClassNamedEvaluationHelperBlock(tx.EmitContext(), n)
		})

		if classThisIdx >= 0 {
			membersArray = append(membersArray, members.Nodes[classThisIdx])
		}
		if namedEvalIdx >= 0 {
			membersArray = append(membersArray, members.Nodes[namedEvalIdx])
		}
		if syntheticConstructor != nil {
			membersArray = append(membersArray, syntheticConstructor)
		}
		if syntheticStaticBlock != nil {
			membersArray = append(membersArray, syntheticStaticBlock)
		}

		for i, member := range members.Nodes {
			if i != classThisIdx && i != namedEvalIdx {
				membersArray = append(membersArray, member)
			}
		}
		members = tx.Factory().NewNodeList(membersArray)
		members.Loc = node.MemberList().Loc
	}

	return members, prologue
}

func (tx *classFieldsTransformer) createBrandCheckWeakSetForPrivateMethods() {
	env := tx.getPrivateIdentifierEnvironment()
	weakSetName := env.data.weakSetName
	debug.Assert(weakSetName != nil, "weakSetName should be set in private identifier environment")

	tx.addPendingExpressions(
		tx.Factory().NewAssignmentExpression(
			weakSetName,
			tx.Factory().NewNewExpression(
				tx.Factory().NewIdentifier("WeakSet"),
				nil, /*typeArguments*/
				tx.Factory().NewNodeList(nil),
			),
		),
	)
}

func (tx *classFieldsTransformer) transformConstructor(constructor *ast.ConstructorDeclaration, container *ast.Node) *ast.Node {
	// NOTE: The Strada reference pre-visits the constructor via `visitNode(constructor, visitor)` before
	// checking WillHoistInitializersToConstructor. This is not done here because Go's variable environment
	// (StartVariableEnvironment/EndAndMergeVariableEnvironment) is scoped inside transformConstructorBody.
	// Pre-visiting would hoist variables outside that scope, causing them to appear after field initializers
	// instead of before. Instead, we visit parameters and body separately within the correct scopes.
	if tx.lexicalEnvironment == nil || tx.lexicalEnvironment.data == nil ||
		tx.lexicalEnvironment.data.facts&classFactsWillHoistInitializersToConstructor == 0 {
		if constructor != nil {
			return tx.Visitor().VisitEachChild(constructor.AsNode())
		}
		return nil
	}

	extendsClauseElement := ast.GetClassExtendsHeritageElement(container)
	isDerivedClass := extendsClauseElement != nil && ast.SkipOuterExpressions(extendsClauseElement.Expression(), ast.OEKAll).Kind != ast.KindNullKeyword

	var parameters *ast.NodeList
	if constructor != nil {
		parameters = tx.Visitor().VisitNodes(constructor.Parameters)
	}

	body := tx.transformConstructorBody(container, constructor, isDerivedClass)
	if body == nil {
		if constructor != nil {
			return tx.Visitor().VisitEachChild(constructor.AsNode())
		}
		return nil
	}

	if constructor != nil {
		debug.Assert(parameters != nil)
		return tx.Factory().UpdateConstructorDeclaration(
			constructor,
			nil, /*modifiers*/
			nil, /*typeParameters*/
			parameters,
			nil, /*returnType*/
			nil, /*fullSignature*/
			body,
		)
	}

	if parameters == nil {
		parameters = tx.Factory().NewNodeList(nil)
	}

	result := tx.Factory().NewConstructorDeclaration(
		nil, /*modifiers*/
		nil, /*typeParameters*/
		parameters,
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
	result.Loc = container.Loc
	return result
}

func (tx *classFieldsTransformer) transformConstructorBodyWorker(
	statementsOut []*ast.Statement,
	statementsIn []*ast.Statement,
	statementOffset int,
	superPath []int,
	superPathDepth int,
	initializerStatements []*ast.Statement,
	constructor *ast.ConstructorDeclaration,
) []*ast.Statement {
	superStatementIndex := superPath[superPathDepth]
	superStatement := statementsIn[superStatementIndex]

	// Visit statements before super
	visited, _ := tx.Visitor().VisitSlice(statementsIn[statementOffset:superStatementIndex])
	statementsOut = append(statementsOut, visited...)
	statementOffset = superStatementIndex + 1

	if ast.IsTryStatement(superStatement) {
		tryBlock := superStatement.AsTryStatement().TryBlock.AsBlock()
		tryBlockStatements := tx.transformConstructorBodyWorker(
			nil,
			tryBlock.Statements.Nodes,
			0, /*statementOffset*/
			superPath,
			superPathDepth+1,
			initializerStatements,
			constructor,
		)
		tryStatementList := tx.Factory().NewNodeList(tryBlockStatements)
		tryStatementList.Loc = tryBlock.Statements.Loc

		catchClause := tx.Visitor().VisitNode(superStatement.AsTryStatement().CatchClause)
		finallyBlock := tx.Visitor().VisitNode(superStatement.AsTryStatement().FinallyBlock)

		updated := tx.Factory().UpdateTryStatement(
			superStatement.AsTryStatement(),
			tx.Factory().UpdateBlock(tryBlock, tryStatementList),
			catchClause,
			finallyBlock,
		)
		statementsOut = append(statementsOut, updated)
	} else {
		visited, _ := tx.Visitor().VisitSlice(statementsIn[superStatementIndex : superStatementIndex+1])
		statementsOut = append(statementsOut, visited...)

		// Add the property initializers. Transforms this:
		//
		//  public x = 1;
		//
		// Into this:
		//
		//  constructor() {
		//      this.x = 1;
		//  }
		//
		// If we do useDefineForClassFields, they'll be converted elsewhere.
		// We instead *remove* them from the transformed output at this stage.

		// parameter-property assignments should occur immediately after the prologue and `super()`,
		// so only count the statements that immediately follow.
		for statementOffset < len(statementsIn) {
			stmt := statementsIn[statementOffset]
			orig := tx.EmitContext().MostOriginal(stmt)
			if ast.IsParameterPropertyDeclaration(orig, constructor.AsNode()) {
				statementOffset++
			} else {
				break
			}
		}

		statementsOut = append(statementsOut, initializerStatements...)
	}

	// Visit remaining statements
	visited2, _ := tx.Visitor().VisitSlice(statementsIn[statementOffset:])
	statementsOut = append(statementsOut, visited2...)
	return statementsOut
}

func (tx *classFieldsTransformer) transformConstructorBody(container *ast.Node, constructor *ast.ConstructorDeclaration, isDerivedClass bool) *ast.Node {
	instanceProperties := tx.getProperties(container, false /*requireInitializer*/, false /*isStatic*/)
	properties := instanceProperties
	if !tx.compilerOptions.GetUseDefineForClassFields() {
		properties = core.Filter(properties, func(prop *ast.Node) bool {
			return prop.Initializer() != nil || ast.IsPrivateIdentifier(prop.Name()) || ast.HasAccessorModifier(prop)
		})
	}

	privateMethodsAndAccessors := tx.getPrivateInstanceMethodsAndAccessors(container)
	needsConstructorBody := len(properties) > 0 || len(privateMethodsAndAccessors) > 0

	// Only generate synthetic constructor when there are property initializers to move.
	if constructor == nil && !needsConstructorBody {
		return tx.EmitContext().VisitFunctionBody(nil, tx.Visitor())
	}

	tx.EmitContext().StartVariableEnvironment()

	needsSyntheticConstructor := constructor == nil && isDerivedClass
	var statements []*ast.Statement

	// Add the property initializers. Transforms this:
	//
	//  public x = 1;
	//
	// Into this:
	//
	//  constructor() {
	//      this.x = 1;
	//  }
	//
	var initializerStatements []*ast.Statement
	receiver := tx.Factory().NewThisExpression()

	// private methods can be called in property initializers, they should execute first
	initializerStatements = tx.addInstanceMethodStatements(initializerStatements, privateMethodsAndAccessors, receiver)

	if constructor != nil {
		parameterProperties := core.Filter(instanceProperties, func(prop *ast.Node) bool {
			return ast.IsParameterPropertyDeclaration(tx.EmitContext().MostOriginal(prop), constructor.AsNode())
		})
		nonParameterProperties := core.Filter(properties, func(prop *ast.Node) bool {
			return !ast.IsParameterPropertyDeclaration(tx.EmitContext().MostOriginal(prop), constructor.AsNode())
		})
		initializerStatements = tx.addPropertyOrClassStaticBlockStatements(initializerStatements, parameterProperties, receiver)
		initializerStatements = tx.addPropertyOrClassStaticBlockStatements(initializerStatements, nonParameterProperties, receiver)
	} else {
		initializerStatements = tx.addPropertyOrClassStaticBlockStatements(initializerStatements, properties, receiver)
	}

	if constructor != nil && constructor.Body != nil {
		body := constructor.Body.AsBlock()

		// Copy prologue
		for _, stmt := range body.Statements.Nodes {
			if ast.IsPrologueDirective(stmt) {
				statements = append(statements, stmt)
			} else {
				break
			}
		}
		statementOffset := len(statements)

		superPath := transformers.FindSuperStatementIndexPath(body.Statements.Nodes, statementOffset)
		if len(superPath) > 0 {
			statements = tx.transformConstructorBodyWorker(statements, body.Statements.Nodes, statementOffset, superPath, 0, initializerStatements, constructor)
		} else {
			// parameter-property assignments should occur immediately after the prologue and `super()`,
			// so only count the statements that immediately follow.
			for statementOffset < len(body.Statements.Nodes) {
				stmt := body.Statements.Nodes[statementOffset]
				orig := tx.EmitContext().MostOriginal(stmt)
				if ast.IsParameterPropertyDeclaration(orig, constructor.AsNode()) {
					statementOffset++
				} else {
					break
				}
			}
			statements = append(statements, initializerStatements...)
			visited, _ := tx.Visitor().VisitSlice(body.Statements.Nodes[statementOffset:])
			statements = append(statements, visited...)
		}
	} else {
		if needsSyntheticConstructor {
			// Add a synthetic `super` call:
			//
			//  super(...arguments);
			//
			superCall := tx.Factory().NewExpressionStatement(
				tx.Factory().NewCallExpression(
					tx.Factory().NewKeywordExpression(ast.KindSuperKeyword),
					nil, /*typeArguments*/
					nil, /*questionDotToken*/
					tx.Factory().NewNodeList([]*ast.Node{
						tx.Factory().NewSpreadElement(tx.Factory().NewIdentifier("arguments")),
					}),
					ast.NodeFlagsNone,
				),
			)
			statements = append(statements, superCall)
		}
		statements = append(statements, initializerStatements...)
	}

	statements = tx.EmitContext().EndAndMergeVariableEnvironment(statements)

	if len(statements) == 0 && constructor == nil {
		return nil
	}

	var multiLine bool
	if constructor != nil && constructor.Body != nil &&
		len(constructor.Body.AsBlock().Statements.Nodes) >= len(statements) {
		multiLine = constructor.Body.AsBlock().Multiline
	} else {
		multiLine = len(statements) > 0
	}

	statementList := tx.Factory().NewNodeList(statements)
	if constructor != nil && constructor.Body != nil {
		statementList.Loc = constructor.Body.AsBlock().Statements.Loc
	} else {
		statementList.Loc = core.NewTextRange(container.MemberList().Loc.Pos(), container.MemberList().Loc.End())
	}

	block := tx.Factory().NewBlock(statementList, multiLine)
	if constructor != nil && constructor.Body != nil {
		block.Loc = constructor.Body.Loc
	}
	return block
}

// addPropertyOrClassStaticBlockStatements generates assignment statements for property initializers.
func (tx *classFieldsTransformer) addPropertyOrClassStaticBlockStatements(statements []*ast.Node, properties []*ast.Node, receiver *ast.Expression) []*ast.Node {
	for _, property := range properties {
		if ast.IsStatic(property) && !tx.shouldTransformPrivateElementsOrClassStaticBlocks {
			continue
		}
		statement := tx.transformPropertyOrClassStaticBlock(property, receiver)
		if statement != nil {
			statements = append(statements, statement)
		}
	}
	return statements
}

func (tx *classFieldsTransformer) transformPropertyOrClassStaticBlock(property *ast.Node, receiver *ast.Expression) *ast.Node {
	var expression *ast.Expression
	if ast.IsClassStaticBlockDeclaration(property) {
		expression = tx.setCurrentClassElementAnd(property, (*classFieldsTransformer).transformClassStaticBlockDeclaration, property)
	} else {
		expression = tx.transformProperty(property.AsPropertyDeclaration(), receiver)
	}
	if expression == nil {
		return nil
	}

	statement := tx.Factory().NewExpressionStatement(expression)
	tx.EmitContext().SetOriginal(statement, property)
	tx.EmitContext().AddEmitFlags(statement, tx.EmitContext().EmitFlags(property)&printer.EFNoComments)
	tx.EmitContext().SetCommentRange(statement, property.Loc)

	propertyOriginalNode := tx.EmitContext().MostOriginal(property)
	if ast.IsParameter(propertyOriginalNode) {
		tx.EmitContext().SetSourceMapRange(statement, propertyOriginalNode.Loc)
		tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
	} else {
		tx.EmitContext().SetSourceMapRange(statement, transformers.MoveRangePastModifiers(property))
	}

	// `setOriginalNode` *copies* the `emitNode` from `property`, so now both
	// `statement` and `expression` have a copy of the synthesized comments.
	// Drop the comments from expression to avoid printing them twice.
	tx.EmitContext().SetSyntheticLeadingComments(expression, nil)
	tx.EmitContext().SetSyntheticTrailingComments(expression, nil)

	// If the property was originally an auto-accessor, don't emit comments here since they will be attached to
	// the synthesized getter.
	if ast.HasAccessorModifier(propertyOriginalNode) {
		tx.EmitContext().AddEmitFlags(statement, printer.EFNoComments)
	}

	return statement
}

// generateInitializedPropertyExpressionsOrClassStaticBlock generates assignment expressions for property initializers.
func (tx *classFieldsTransformer) generateInitializedPropertyExpressionsOrClassStaticBlock(
	propertiesOrClassStaticBlocks []*ast.Node,
	receiver *ast.Expression,
) []*ast.Expression {
	var expressions []*ast.Expression
	for _, property := range propertiesOrClassStaticBlocks {
		var expression *ast.Expression
		if ast.IsClassStaticBlockDeclaration(property) {
			expression = tx.setCurrentClassElementAnd(property, (*classFieldsTransformer).transformClassStaticBlockDeclaration, property)
		} else {
			expression = tx.transformProperty(property.AsPropertyDeclaration(), receiver)
		}
		if expression == nil {
			continue
		}
		tx.EmitContext().SetOriginalEx(expression, property, true /*allowOverwrite*/)
		tx.EmitContext().AssignCommentAndSourceMapRanges(expression, property)
		expressions = append(expressions, expression)
	}
	return expressions
}

// transformProperty transforms a property initializer into an assignment expression.
func (tx *classFieldsTransformer) transformProperty(property *ast.PropertyDeclaration, receiver *ast.Expression) *ast.Expression {
	savedCurrentClassElement := tx.currentClassElement
	transformed := tx.transformPropertyWorker(property, receiver)
	if transformed != nil && ast.HasStaticModifier(property.AsNode()) &&
		tx.lexicalEnvironment != nil && tx.lexicalEnvironment.data != nil && tx.lexicalEnvironment.data.facts != 0 {
		// capture the lexical environment for the member
		tx.EmitContext().SetOriginal(transformed, property.AsNode())
		tx.EmitContext().SetSourceMapRange(transformed, tx.EmitContext().SourceMapRange(property.Name()))
	}
	tx.currentClassElement = savedCurrentClassElement
	return transformed
}

func (tx *classFieldsTransformer) transformPropertyWorker(property *ast.PropertyDeclaration, receiver *ast.Expression) *ast.Expression {
	// We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
	emitAssignment := !tx.compilerOptions.GetUseDefineForClassFields()

	if isNamedEvaluationAnd(tx.EmitContext(), property.AsNode(), tx.isAnonymousClassNeedingAssignedName) {
		property = transformNamedEvaluation(tx.EmitContext(), property.AsNode(), false, "").AsPropertyDeclaration()
	}

	propertyName := property.Name()
	if ast.HasAccessorModifier(property.AsNode()) {
		propertyName = tx.Factory().NewGeneratedPrivateNameForNodeEx(property.Name(), printer.AutoGenerateOptions{Suffix: "_accessor_storage"})
	} else if ast.IsComputedPropertyName(propertyName) && !transformers.IsSimpleInlineableExpression(propertyName.Expression()) {
		propertyName = tx.Factory().UpdateComputedPropertyName(
			propertyName.AsComputedPropertyName(),
			tx.Factory().NewGeneratedNameForNode(propertyName),
		)
	}

	if ast.HasStaticModifier(property.AsNode()) {
		tx.currentClassElement = property.AsNode()
	}

	if ast.IsPrivateIdentifier(propertyName) && tx.shouldTransformClassElementToWeakMap(property.AsNode()) {
		info := tx.accessPrivateIdentifier(propertyName)
		if info != nil {
			if info.kind == printer.PrivateIdentifierKindField {
				if !info.isStatic {
					return createPrivateInstanceFieldInitializer(
						tx.Factory(),
						receiver,
						tx.Visitor().VisitNode(property.Initializer),
						info.brandCheckIdentifier,
					)
				}
				return createPrivateStaticFieldInitializer(
					tx.Factory(),
					info.variableName,
					tx.Visitor().VisitNode(property.Initializer),
				)
			}
			return nil
		} else {
			debug.Fail("Undeclared private name for property declaration.")
		}
	}

	if (ast.IsPrivateIdentifier(propertyName) || ast.HasStaticModifier(property.AsNode())) && property.Initializer == nil {
		return nil
	}

	// TODO: can we get rid of this original checking and better coordinate with runtimesyntax?
	if ast.HasAbstractModifier(tx.EmitContext().MostOriginal(property.AsNode())) {
		return nil
	}

	initializer := tx.Visitor().VisitNode(property.Initializer)
	propertyOriginalNode := tx.EmitContext().MostOriginal(property.AsNode())
	if ast.IsParameterPropertyDeclaration(propertyOriginalNode, propertyOriginalNode.Parent) && ast.IsIdentifier(propertyName) {
		// A parameter-property declaration always overrides the initializer. The only time a parameter-property
		// declaration *should* have an initializer is when decorators have added initializers that need to run before
		// any other initializer
		localName := propertyName.Clone(tx.Factory())
		if initializer != nil {
			// unwrap `(__runInitializers(this, _instanceExtraInitializers), void 0)`
			if ast.IsParenthesizedExpression(initializer) &&
				ast.IsCommaExpression(initializer.Expression()) &&
				tx.EmitContext().IsCallToHelper(initializer.Expression().AsBinaryExpression().Left, "__runInitializers") &&
				ast.IsVoidExpression(initializer.Expression().AsBinaryExpression().Right) &&
				ast.IsNumericLiteral(initializer.Expression().AsBinaryExpression().Right.Expression()) {
				initializer = initializer.Expression().AsBinaryExpression().Left
			}
			initializer = tx.Factory().InlineExpressions([]*ast.Expression{initializer, localName})
		} else {
			initializer = localName
		}
		tx.EmitContext().AddEmitFlags(propertyName, printer.EFNoComments|printer.EFNoSourceMap)
		tx.EmitContext().SetSourceMapRange(localName, propertyOriginalNode.Name().Loc)
		tx.EmitContext().AddEmitFlags(localName, printer.EFNoComments)
	} else if initializer == nil {
		initializer = tx.Factory().NewVoidZeroExpression()
	}

	if emitAssignment || ast.IsPrivateIdentifier(propertyName) {
		memberAccess := createMemberAccessForPropertyName(tx.Factory(), tx.EmitContext(), receiver, propertyName, propertyName)
		tx.EmitContext().AddEmitFlags(memberAccess, printer.EFNoLeadingComments)
		return tx.Factory().NewAssignmentExpression(memberAccess, initializer)
	}

	// useDefineForClassFields: Object.defineProperty
	var name *ast.Expression
	if ast.IsComputedPropertyName(propertyName) {
		name = propertyName.Expression()
	} else if ast.IsIdentifier(propertyName) {
		name = tx.Factory().NewStringLiteral(propertyName.Text(), ast.TokenFlagsNone)
	} else {
		name = propertyName
	}
	descriptor := tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{
		tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("enumerable"), nil, nil, tx.Factory().NewTrueExpression()),
		tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("configurable"), nil, nil, tx.Factory().NewTrueExpression()),
		tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("writable"), nil, nil, tx.Factory().NewTrueExpression()),
		tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("value"), nil, nil, initializer),
	}), true)
	return tx.Factory().NewObjectDefinePropertyCall(receiver, name, descriptor)
}

// addInstanceMethodStatements generates brand-check initializer for private methods.
func (tx *classFieldsTransformer) addInstanceMethodStatements(statements []*ast.Statement, methods []*ast.Node, receiver *ast.Expression) []*ast.Statement {
	if !tx.shouldTransformPrivateElementsOrClassStaticBlocks || len(methods) == 0 {
		return statements
	}

	env := tx.getPrivateIdentifierEnvironment()
	weakSetName := env.data.weakSetName
	debug.Assert(weakSetName != nil, "weakSetName should be set in private identifier environment")

	return append(statements,
		tx.Factory().NewExpressionStatement(
			createPrivateInstanceMethodInitializer(tx.Factory(), receiver, weakSetName),
		),
	)
}

func (tx *classFieldsTransformer) visitInvalidSuperProperty(node *ast.Node) *ast.Node {
	if ast.IsPropertyAccessExpression(node) {
		return tx.Factory().UpdatePropertyAccessExpression(
			node.AsPropertyAccessExpression(),
			tx.Factory().NewVoidZeroExpression(),
			nil,
			node.AsPropertyAccessExpression().Name(),
		)
	}
	return tx.Factory().UpdateElementAccessExpression(
		node.AsElementAccessExpression(),
		tx.Factory().NewVoidZeroExpression(),
		nil,
		tx.Visitor().VisitNode(node.AsElementAccessExpression().ArgumentExpression),
	)
}

// getPropertyNameExpressionIfNeeded transforms a computed property name, then either returns an expression
// which caches the value of the result or the expression itself if the value is either unused or safe to
// inline into multiple locations.
// shouldHoist indicates whether the expression needs to be reused (i.e., for an initializer or a decorator).
func (tx *classFieldsTransformer) getPropertyNameExpressionIfNeeded(name *ast.PropertyName, shouldHoist bool) *ast.Expression {
	if !ast.IsComputedPropertyName(name) {
		return nil
	}
	cacheAssignment := findComputedPropertyNameCacheAssignment(tx.EmitContext(), name)
	// Switch to outer lex env for computed property name expressions, matching
	// Strada reference's onEmitNode behavior for ComputedPropertyName.
	savedLexicalEnvironment := tx.lexicalEnvironment
	savedInsideComputedPropertyName := tx.insideComputedPropertyName
	tx.insideComputedPropertyName = true
	if tx.lexicalEnvironment != nil && tx.lexicalEnvironment.previous != nil {
		tx.lexicalEnvironment = tx.lexicalEnvironment.previous
	}
	expression := tx.Visitor().VisitNode(name.Expression())
	tx.lexicalEnvironment = savedLexicalEnvironment
	tx.insideComputedPropertyName = savedInsideComputedPropertyName
	innerExpression := ast.SkipPartiallyEmittedExpressions(expression)
	inlinable := transformers.IsSimpleInlineableExpression(innerExpression)
	alreadyTransformed := cacheAssignment != nil || (ast.IsAssignmentExpression(innerExpression, true /*excludeCompoundAssignment*/) && ast.IsIdentifier(innerExpression.AsBinaryExpression().Left) && transformers.IsGeneratedIdentifier(tx.EmitContext(), innerExpression.AsBinaryExpression().Left))
	if !alreadyTransformed && !inlinable && shouldHoist {
		generatedName := tx.Factory().NewGeneratedNameForNode(name)
		if tx.requiresBlockScopedVar() {
			tx.EmitContext().AddLexicalDeclaration(generatedName)
		} else {
			tx.EmitContext().AddVariableDeclaration(generatedName)
		}
		return tx.Factory().NewAssignmentExpression(generatedName, expression)
	}
	if inlinable || ast.IsIdentifier(innerExpression) {
		return nil
	}
	return expression
}

func (tx *classFieldsTransformer) startClassLexicalEnvironment() {
	tx.lexicalEnvironment = &classLexicalEnv{previous: tx.lexicalEnvironment}
}

func (tx *classFieldsTransformer) endClassLexicalEnvironment() {
	tx.lexicalEnvironment = tx.lexicalEnvironment.previous
}

func (tx *classFieldsTransformer) getClassLexicalEnvironment() *classLexicalEnvironment {
	debug.Assert(tx.lexicalEnvironment != nil)
	if tx.lexicalEnvironment.data == nil {
		tx.lexicalEnvironment.data = &classLexicalEnvironment{}
	}
	return tx.lexicalEnvironment.data
}

func (tx *classFieldsTransformer) getPrivateIdentifierEnvironment() *privateEnvironment {
	debug.Assert(tx.lexicalEnvironment != nil)
	if tx.lexicalEnvironment.privateEnv == nil {
		tx.lexicalEnvironment.privateEnv = &privateEnvironment{
			members: make(map[string]*privateIdentifierInfo),
		}
	}
	return tx.lexicalEnvironment.privateEnv
}

func (tx *classFieldsTransformer) addPendingExpressions(exprs ...*ast.Expression) {
	tx.pendingExpressions = append(tx.pendingExpressions, exprs...)
}

func (tx *classFieldsTransformer) addPrivateIdentifierPropertyDeclarationToEnvironment(node *ast.Node, name *ast.Node) {
	lex := tx.getClassLexicalEnvironment()
	env := tx.getPrivateIdentifierEnvironment()
	isStatic := ast.HasStaticModifier(node)
	previousInfo, _ := tx.getPrivateIdentifier(env, name)
	isValid := !tx.isReservedPrivateName(name) && previousInfo == nil

	if isStatic {
		brandCheckIdentifier := lex.classThis
		if brandCheckIdentifier == nil {
			brandCheckIdentifier = lex.classConstructor
		}
		variableName := tx.createHoistedVariableForPrivateName(name, "")
		tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
			kind:                 printer.PrivateIdentifierKindField,
			isStatic:             true,
			brandCheckIdentifier: brandCheckIdentifier,
			variableName:         variableName,
			isValid:              isValid,
		})
	} else {
		weakMapName := tx.createHoistedVariableForPrivateName(name, "")
		tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
			kind:                 printer.PrivateIdentifierKindField,
			isStatic:             false,
			brandCheckIdentifier: weakMapName,
			isValid:              isValid,
		})
		tx.addPendingExpressions(
			tx.Factory().NewAssignmentExpression(
				weakMapName,
				tx.Factory().NewNewExpression(
					tx.Factory().NewIdentifier("WeakMap"),
					nil, /*typeArguments*/
					tx.Factory().NewNodeList(nil),
				),
			),
		)
	}
}

func (tx *classFieldsTransformer) addPrivateIdentifierMethodToEnvironment(name *ast.Node, lex *classLexicalEnvironment, env *privateEnvironment, isStatic bool, isValid bool) {
	methodName := tx.createHoistedVariableForPrivateName(name, "")
	var brandCheckIdentifier *ast.IdentifierNode
	if isStatic {
		brandCheckIdentifier = lex.classThis
		if brandCheckIdentifier == nil {
			brandCheckIdentifier = lex.classConstructor
		}
		debug.Assert(brandCheckIdentifier != nil, "classConstructor should be set in private identifier environment")
	} else {
		brandCheckIdentifier = env.data.weakSetName
	}
	tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
		kind:                 printer.PrivateIdentifierKindMethod,
		methodName:           methodName,
		brandCheckIdentifier: brandCheckIdentifier,
		isStatic:             isStatic,
		isValid:              isValid,
	})
}

func (tx *classFieldsTransformer) addPrivateIdentifierGetAccessorToEnvironment(name *ast.Node, lex *classLexicalEnvironment, env *privateEnvironment, isStatic bool, isValid bool, previousInfo *privateIdentifierInfo) {
	getterName := tx.createHoistedVariableForPrivateName(name, "_get")
	var brandCheckIdentifier *ast.IdentifierNode
	if isStatic {
		brandCheckIdentifier = lex.classThis
		if brandCheckIdentifier == nil {
			brandCheckIdentifier = lex.classConstructor
		}
		debug.Assert(brandCheckIdentifier != nil, "classConstructor should be set in private identifier environment")
	} else {
		brandCheckIdentifier = env.data.weakSetName
		debug.Assert(brandCheckIdentifier != nil, "weakSetName should be set in private identifier environment")
	}

	if previousInfo != nil && previousInfo.kind == printer.PrivateIdentifierKindAccessor && previousInfo.isStatic == isStatic && previousInfo.getterName == nil {
		previousInfo.getterName = getterName
	} else {
		tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
			kind:                 printer.PrivateIdentifierKindAccessor,
			getterName:           getterName,
			brandCheckIdentifier: brandCheckIdentifier,
			isStatic:             isStatic,
			isValid:              isValid,
		})
	}
}

func (tx *classFieldsTransformer) addPrivateIdentifierSetAccessorToEnvironment(name *ast.Node, lex *classLexicalEnvironment, env *privateEnvironment, isStatic bool, isValid bool, previousInfo *privateIdentifierInfo) {
	setterName := tx.createHoistedVariableForPrivateName(name, "_set")
	var brandCheckIdentifier *ast.IdentifierNode
	if isStatic {
		brandCheckIdentifier = lex.classThis
		if brandCheckIdentifier == nil {
			brandCheckIdentifier = lex.classConstructor
		}
		debug.Assert(brandCheckIdentifier != nil, "classConstructor should be set in private identifier environment")
	} else {
		brandCheckIdentifier = env.data.weakSetName
		debug.Assert(brandCheckIdentifier != nil, "weakSetName should be set in private identifier environment")
	}

	if previousInfo != nil && previousInfo.kind == printer.PrivateIdentifierKindAccessor && previousInfo.isStatic == isStatic && previousInfo.setterName == nil {
		previousInfo.setterName = setterName
	} else {
		tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
			kind:                 printer.PrivateIdentifierKindAccessor,
			setterName:           setterName,
			brandCheckIdentifier: brandCheckIdentifier,
			isStatic:             isStatic,
			isValid:              isValid,
		})
	}
}

func (tx *classFieldsTransformer) addPrivateIdentifierAutoAccessorToEnvironment(node *ast.Node, name *ast.Node, lex *classLexicalEnvironment, env *privateEnvironment, isStatic bool, isValid bool) {
	getterName := tx.createHoistedVariableForPrivateName(name, "_get")
	setterName := tx.createHoistedVariableForPrivateName(name, "_set")
	var brandCheckIdentifier *ast.IdentifierNode
	if isStatic {
		brandCheckIdentifier = lex.classThis
		if brandCheckIdentifier == nil {
			brandCheckIdentifier = lex.classConstructor
		}
		debug.Assert(brandCheckIdentifier != nil, "classConstructor should be set in private identifier environment")
	} else {
		brandCheckIdentifier = env.data.weakSetName
		debug.Assert(brandCheckIdentifier != nil, "weakSetName should be set in private identifier environment")
	}

	tx.setPrivateIdentifier(env, name, &privateIdentifierInfo{
		kind:                 printer.PrivateIdentifierKindAccessor,
		getterName:           getterName,
		setterName:           setterName,
		brandCheckIdentifier: brandCheckIdentifier,
		isStatic:             isStatic,
		isValid:              isValid,
	})
}

func (tx *classFieldsTransformer) addPrivateIdentifierToEnvironment(node *ast.Node) {
	lex := tx.getClassLexicalEnvironment()
	env := tx.getPrivateIdentifierEnvironment()
	name := node.Name()
	isStatic := ast.HasStaticModifier(node)
	previousInfo, _ := tx.getPrivateIdentifier(env, name)
	isValid := !tx.isReservedPrivateName(name) && previousInfo == nil

	if ast.IsAutoAccessorPropertyDeclaration(node) {
		tx.addPrivateIdentifierAutoAccessorToEnvironment(node, name, lex, env, isStatic, isValid)
	} else if ast.IsPropertyDeclaration(node) {
		tx.addPrivateIdentifierPropertyDeclarationToEnvironment(node, name)
	} else if ast.IsMethodDeclaration(node) {
		tx.addPrivateIdentifierMethodToEnvironment(name, lex, env, isStatic, isValid)
	} else if ast.IsGetAccessorDeclaration(node) {
		tx.addPrivateIdentifierGetAccessorToEnvironment(name, lex, env, isStatic, isValid, previousInfo)
	} else if ast.IsSetAccessorDeclaration(node) {
		tx.addPrivateIdentifierSetAccessorToEnvironment(name, lex, env, isStatic, isValid, previousInfo)
	}
}

func (tx *classFieldsTransformer) setPrivateIdentifier(env *privateEnvironment, name *ast.Node, info *privateIdentifierInfo) {
	if tx.EmitContext().HasAutoGenerateInfo(name) {
		if env.generatedIdentifiers == nil {
			env.generatedIdentifiers = make(map[*ast.Node]*privateIdentifierInfo)
		}
		env.generatedIdentifiers[tx.EmitContext().GetNodeForGeneratedName(name)] = info
	} else {
		env.members[name.Text()] = info
	}
}

func (tx *classFieldsTransformer) getPrivateIdentifier(env *privateEnvironment, name *ast.Node) (*privateIdentifierInfo, bool) {
	if tx.EmitContext().HasAutoGenerateInfo(name) {
		info, ok := env.generatedIdentifiers[tx.EmitContext().GetNodeForGeneratedName(name)]
		return info, ok
	}
	info, ok := env.members[name.Text()]
	return info, ok
}

func (tx *classFieldsTransformer) createHoistedVariableForClass(nameText string, node *ast.Node, suffix string) *ast.IdentifierNode {
	env := tx.getPrivateIdentifierEnvironment()
	var identifier *ast.IdentifierNode
	if env.data.className != nil {
		prefix := "_" + env.data.className.Text() + "_"
		identifier = tx.Factory().NewUniqueNameEx(prefix+nameText, printer.AutoGenerateOptions{
			Flags:  printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsReservedInNestedScopes,
			Suffix: suffix,
		})
	} else {
		identifier = tx.Factory().NewUniqueNameEx("_"+nameText, printer.AutoGenerateOptions{
			Flags:  printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsReservedInNestedScopes,
			Suffix: suffix,
		})
	}
	if tx.requiresBlockScopedVar() {
		tx.EmitContext().AddLexicalDeclaration(identifier)
	} else {
		tx.EmitContext().AddVariableDeclaration(identifier)
	}
	return identifier
}

func (tx *classFieldsTransformer) createHoistedVariableForClassFromNode(name *ast.Node, suffix string) *ast.IdentifierNode {
	env := tx.getPrivateIdentifierEnvironment()
	var prefix string
	if env.data.className != nil {
		prefix = "_" + env.data.className.Text() + "_"
	} else {
		prefix = "_"
	}
	identifier := tx.Factory().NewGeneratedNameForNodeEx(name, printer.AutoGenerateOptions{
		Flags:  printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsReservedInNestedScopes,
		Prefix: prefix,
		Suffix: suffix,
	})
	if tx.requiresBlockScopedVar() {
		tx.EmitContext().AddLexicalDeclaration(identifier)
	} else {
		tx.EmitContext().AddVariableDeclaration(identifier)
	}
	return identifier
}

func (tx *classFieldsTransformer) createHoistedVariableForPrivateName(name *ast.Node, suffix string) *ast.IdentifierNode {
	// If the name is a generated identifier (e.g., auto-accessor backing field),
	// use node-based name generation so the emitter can resolve the name properly.
	if tx.EmitContext().HasAutoGenerateInfo(name) {
		return tx.createHoistedVariableForClassFromNode(name, suffix)
	}
	text := name.Text()
	if len(text) >= 1 && text[0] == '#' {
		text = text[1:] // strip leading '#'
	}
	return tx.createHoistedVariableForClass(text, name, suffix)
}

// accessPrivateIdentifier accesses an already defined PrivateIdentifier in the current
// PrivateIdentifierEnvironment.
func (tx *classFieldsTransformer) accessPrivateIdentifier(name *ast.Node) *privateIdentifierInfo {
	for env := tx.lexicalEnvironment; env != nil; env = env.previous {
		if env.privateEnv != nil {
			if info, ok := tx.getPrivateIdentifier(env.privateEnv, name); ok {
				if info.kind == printer.PrivateIdentifierKindUntransformed {
					return nil
				}
				return info
			}
		}
	}
	return nil
}

func (tx *classFieldsTransformer) wrapPrivateIdentifierForDestructuringTarget(node *ast.Node) *ast.Node {
	prop := node.AsPropertyAccessExpression()
	parameter := tx.Factory().NewGeneratedNameForNode(node)
	info := tx.accessPrivateIdentifier(prop.Name())
	if info == nil {
		return tx.Visitor().VisitEachChild(node)
	}
	receiver := prop.Expression
	// We cannot copy `this` or `super` into the function because they will be bound
	// differently inside the function.
	isThisOrSuperProperty := prop.Expression.Kind == ast.KindThisKeyword || prop.Expression.Kind == ast.KindSuperKeyword
	if isThisOrSuperProperty || !transformers.IsSimpleCopiableExpression(prop.Expression) {
		receiver = tx.Factory().NewTempVariableEx(printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsReservedInNestedScopes,
		})
		tx.EmitContext().AddVariableDeclaration(receiver)
		tx.pendingExpressions = append(tx.pendingExpressions,
			tx.Factory().NewAssignmentExpression(receiver, tx.Visitor().VisitNode(prop.Expression)),
		)
	}
	assignExpr := tx.createPrivateIdentifierAssignment(info, receiver, parameter, ast.KindEqualsToken)
	return tx.Factory().NewAssignmentTargetWrapper(parameter, assignExpr)
}

func (tx *classFieldsTransformer) visitAssignmentElement(node *ast.Node) *ast.Node {
	// 13.15.5.5 RS: IteratorDestructuringAssignmentEvaluation
	//   AssignmentElement : DestructuringAssignmentTarget Initializer?
	//     ...
	//     4. If |Initializer| is present and _value_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
	//           i. Let _v_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
	//     ...

	if isNamedEvaluationAnd(tx.EmitContext(), node, tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
	}
	if ast.IsAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		left := tx.visitDestructuringAssignmentTarget(node.AsBinaryExpression().Left)
		right := tx.Visitor().VisitNode(node.AsBinaryExpression().Right)
		return tx.Factory().UpdateBinaryExpression(
			node.AsBinaryExpression(),
			nil,
			left,
			nil,
			node.AsBinaryExpression().OperatorToken,
			right,
		)
	}
	return tx.visitDestructuringAssignmentTarget(node)
}

func (tx *classFieldsTransformer) visitAssignmentRestElement(node *ast.Node) *ast.Node {
	spread := node.AsSpreadElement()
	if ast.IsLeftHandSideExpression(spread.Expression) {
		expr := tx.visitDestructuringAssignmentTarget(spread.Expression)
		return tx.Factory().UpdateSpreadElement(spread, expr)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitArrayAssignmentElement(node *ast.Node) *ast.Node {
	if ast.IsArrayBindingOrAssignmentElement(node) {
		if ast.IsSpreadElement(node) {
			return tx.visitAssignmentRestElement(node)
		}
		if node.Kind != ast.KindOmittedExpression {
			return tx.visitAssignmentElement(node)
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitAssignmentProperty(node *ast.Node) *ast.Node {
	// AssignmentProperty : PropertyName `:` AssignmentElement
	// AssignmentElement : DestructuringAssignmentTarget Initializer?

	// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
	//   AssignmentElement : DestructuringAssignmentTarget Initializer?
	//     ...
	//     3. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousfunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
	//           i. Let _rhsValue_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
	//     ...

	prop := node.AsPropertyAssignment()
	name := tx.Visitor().VisitNode(prop.Name())
	init := prop.Initializer
	if ast.IsAssignmentExpression(init, true /*excludeCompoundAssignment*/) {
		assignElem := tx.visitAssignmentElement(init)
		return tx.Factory().UpdatePropertyAssignment(prop, nil, name, nil, nil, assignElem)
	}
	if ast.IsLeftHandSideExpression(init) {
		target := tx.visitDestructuringAssignmentTarget(init)
		return tx.Factory().UpdatePropertyAssignment(prop, nil, name, nil, nil, target)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitShorthandAssignmentProperty(node *ast.Node) *ast.Node {
	// AssignmentProperty : IdentifierReference Initializer?

	// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
	//   AssignmentProperty : IdentifierReference Initializer?
	//     ...
	//     4. If |Initializer?| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
	//     ...

	if isNamedEvaluationAnd(tx.EmitContext(), node, tx.isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node, false /*ignoreEmptyStringLiteral*/, "" /*assignedName*/)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitAssignmentRestProperty(node *ast.Node) *ast.Node {
	spread := node.AsSpreadAssignment()
	if ast.IsLeftHandSideExpression(spread.Expression) {
		expr := tx.visitDestructuringAssignmentTarget(spread.Expression)
		return tx.Factory().UpdateSpreadAssignment(spread, expr)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitObjectAssignmentElement(node *ast.Node) *ast.Node {
	debug.Assert(node != nil && ast.IsObjectBindingOrAssignmentElement(node))
	if ast.IsSpreadAssignment(node) {
		return tx.visitAssignmentRestProperty(node)
	}
	if ast.IsShorthandPropertyAssignment(node) {
		return tx.visitShorthandAssignmentProperty(node)
	}
	if ast.IsPropertyAssignment(node) {
		return tx.visitAssignmentProperty(node)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *classFieldsTransformer) visitAssignmentPattern(node *ast.Node) *ast.Node {
	if ast.IsArrayLiteralExpression(node) {
		// Transforms private names in destructuring assignment array bindings.
		// Transforms SuperProperty assignments in destructuring assignment array bindings in static initializers.
		//
		// Source:
		// ([ this.#myProp ] = [ "hello" ]);
		//
		// Transformation:
		// [ { set value(x) { this.#myProp = x; } }.value ] = [ "hello" ];
		return tx.Factory().UpdateArrayLiteralExpression(
			node.AsArrayLiteralExpression(),
			tx.arrayAssignmentElementVisitor.VisitNodes(node.AsArrayLiteralExpression().Elements),
		)
	}
	// Transforms private names in destructuring assignment object bindings.
	// Transforms SuperProperty assignments in destructuring assignment object bindings in static initializers.
	//
	// Source:
	// ({ stringProperty: this.#myProp } = { stringProperty: "hello" });
	//
	// Transformation:
	// ({ stringProperty: { set value(x) { this.#myProp = x; } }.value }) = { stringProperty: "hello" };
	return tx.Factory().UpdateObjectLiteralExpression(
		node.AsObjectLiteralExpression(),
		tx.objectAssignmentElementVisitor.VisitNodes(node.AsObjectLiteralExpression().Properties),
	)
}

func createPrivateStaticFieldInitializer(factory *printer.NodeFactory, variableName *ast.IdentifierNode, initializer *ast.Expression) *ast.Expression {
	if initializer == nil {
		initializer = factory.NewVoidZeroExpression()
	}
	return factory.NewAssignmentExpression(
		variableName,
		factory.NewObjectLiteralExpression(
			factory.NewNodeList([]*ast.Node{
				factory.NewPropertyAssignment(nil, factory.NewIdentifier("value"), nil, nil, initializer),
			}),
			false,
		),
	)
}

func createPrivateInstanceFieldInitializer(factory *printer.NodeFactory, receiver *ast.Expression, initializer *ast.Expression, weakMapName *ast.IdentifierNode) *ast.Expression {
	if initializer == nil {
		initializer = factory.NewVoidZeroExpression()
	}
	return factory.NewMethodCall(weakMapName, factory.NewIdentifier("set"), []*ast.Node{receiver, initializer})
}

func createPrivateInstanceMethodInitializer(factory *printer.NodeFactory, receiver *ast.Expression, weakSetName *ast.IdentifierNode) *ast.Expression {
	return factory.NewMethodCall(weakSetName, factory.NewIdentifier("add"), []*ast.Node{receiver})
}

func (tx *classFieldsTransformer) isReservedPrivateName(node *ast.Node) bool {
	return !(ast.IsPrivateIdentifier(node) && tx.EmitContext().HasAutoGenerateInfo(node)) && node.Text() == "#constructor"
}

func isStaticPropertyDeclarationOrClassStaticBlock(node *ast.Node) bool {
	return ast.IsClassStaticBlockDeclaration(node) ||
		(ast.IsPropertyDeclaration(node) && ast.HasStaticModifier(node))
}

func (tx *classFieldsTransformer) getProperties(node *ast.Node, requireInitializer bool, isStatic bool) []*ast.Node {
	var result []*ast.Node
	for _, member := range node.Members() {
		if ast.IsPropertyDeclaration(member) &&
			(!requireInitializer || member.Initializer() != nil) &&
			ast.HasStaticModifier(member) == isStatic {
			result = append(result, member)
		}
	}
	return result
}

func (tx *classFieldsTransformer) getStaticPropertiesAndClassStaticBlock(node *ast.Node) []*ast.Node {
	var result []*ast.Node
	for _, member := range node.Members() {
		if ast.IsClassStaticBlockDeclaration(member) || (ast.IsPropertyDeclaration(member) && ast.HasStaticModifier(member)) {
			result = append(result, member)
		}
	}
	return result
}

// classHasClassThisAssignment checks if a class has a static block that is a class-this assignment.
func classHasClassThisAssignment(emitContext *printer.EmitContext, node *ast.Node) bool {
	for _, member := range node.Members() {
		if isClassThisAssignmentBlock(emitContext, member) {
			return true
		}
	}
	return false
}

func isNonStaticMethodOrAccessorWithPrivateName(member *ast.Node) bool {
	return !ast.IsStatic(member) &&
		(ast.IsMethodOrAccessor(member) || ast.IsAutoAccessorPropertyDeclaration(member)) &&
		ast.IsPrivateIdentifier(member.Name())
}

func createMemberAccessForPropertyName(factory *printer.NodeFactory, emitContext *printer.EmitContext, receiver *ast.Expression, name *ast.PropertyName, location *ast.PropertyName) *ast.Expression {
	if ast.IsComputedPropertyName(name) {
		expression := factory.NewElementAccessExpression(receiver, nil, name.Expression(), ast.NodeFlagsNone)
		expression.Loc = location.Loc
		return expression
	}
	var expression *ast.Expression
	if ast.IsIdentifier(name) || ast.IsPrivateIdentifier(name) {
		expression = factory.NewPropertyAccessExpression(receiver, nil, name, ast.NodeFlagsNone)
	} else {
		// string or numeric literal
		expression = factory.NewElementAccessExpression(receiver, nil, name, ast.NodeFlagsNone)
	}
	emitContext.SetCommentRange(expression, name.Loc)
	emitContext.SetSourceMapRange(expression, name.Loc)
	emitContext.AddEmitFlags(expression, printer.EFNoNestedSourceMaps)
	return expression
}

func (tx *classFieldsTransformer) createCallBinding(node *ast.Node) (thisArg *ast.Expression, target *ast.Expression) {
	if ast.IsSuperProperty(node) {
		return tx.Factory().NewThisExpression(), node
	}
	if ast.IsPropertyAccessExpression(node) {
		expr := node.AsPropertyAccessExpression()
		if shouldBeCapturedInTempVariable(expr.Expression) {
			thisArg = tx.Factory().NewTempVariable()
			tx.EmitContext().AddVariableDeclaration(thisArg)
			target = tx.Factory().NewPropertyAccessExpression(
				tx.Factory().NewParenthesizedExpression( // TODO: do we even need these?
					tx.Factory().NewAssignmentExpression(thisArg, expr.Expression),
				),
				nil,
				expr.Name(),
				ast.NodeFlagsNone,
			)
			return thisArg, target
		}
		return expr.Expression, node
	}
	thisArg = tx.Factory().NewVoidZeroExpression()
	target = node
	return thisArg, target
}

func shouldBeCapturedInTempVariable(node *ast.Node) bool {
	target := ast.SkipParentheses(node)
	switch target.Kind {
	case ast.KindIdentifier, ast.KindThisKeyword, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindStringLiteral:
		return false
	default:
		return true
	}
}

func (tx *classFieldsTransformer) createAccessorPropertyGetRedirector(node *ast.PropertyDeclaration, modifiers *ast.ModifierList, name *ast.PropertyName, receiver *ast.Expression) *ast.Node {
	backingFieldName := tx.Factory().NewGeneratedPrivateNameForNodeEx(node.Name(), printer.AutoGenerateOptions{Suffix: "_accessor_storage"})
	returnExpr := tx.Factory().NewPropertyAccessExpression(
		receiver,
		nil,
		backingFieldName,
		ast.NodeFlagsNone,
	)
	returnStmt := tx.Factory().NewReturnStatement(returnExpr)
	body := tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{returnStmt}), false)
	return tx.Factory().NewGetAccessorDeclaration(
		modifiers,
		name,
		nil, /*typeParameters*/
		tx.Factory().NewNodeList([]*ast.Node{}),
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
}

func (tx *classFieldsTransformer) createAccessorPropertySetRedirector(node *ast.PropertyDeclaration, modifiers *ast.ModifierList, name *ast.PropertyName, receiver *ast.Expression) *ast.Node {
	backingFieldName := tx.Factory().NewGeneratedPrivateNameForNodeEx(node.Name(), printer.AutoGenerateOptions{Suffix: "_accessor_storage"})
	valueParam := tx.Factory().NewParameterDeclaration(
		nil, /*modifiers*/
		nil, /*dotDotDotToken*/
		tx.Factory().NewIdentifier("value"),
		nil, /*questionToken*/
		nil, /*typeNode*/
		nil, /*initializer*/
	)
	assignExpr := tx.Factory().NewAssignmentExpression(
		tx.Factory().NewPropertyAccessExpression(
			receiver,
			nil,
			backingFieldName,
			ast.NodeFlagsNone,
		),
		tx.Factory().NewIdentifier("value"),
	)
	exprStmt := tx.Factory().NewExpressionStatement(assignExpr)
	body := tx.Factory().NewBlock(tx.Factory().NewNodeList([]*ast.Node{exprStmt}), false)
	return tx.Factory().NewSetAccessorDeclaration(
		modifiers,
		name,
		nil, /*typeParameters*/
		tx.Factory().NewNodeList([]*ast.Node{valueParam}),
		nil, /*returnType*/
		nil, /*fullSignature*/
		body,
	)
}

// flattenCommaList decomposes a comma expression tree into a sequence of expressions.
func flattenCommaList(node *ast.Expression) iter.Seq[*ast.Expression] {
	return func(yield func(*ast.Expression) bool) {
		flattenCommaListWorker(node, yield)
	}
}

func flattenCommaListWorker(node *ast.Expression, yield func(*ast.Expression) bool) bool {
	if ast.IsParenthesizedExpression(node) && ast.NodeIsSynthesized(node) {
		return flattenCommaListWorker(node.Expression(), yield)
	} else if ast.IsCommaExpression(node.AsNode()) {
		return flattenCommaListWorker(node.AsBinaryExpression().Left, yield) &&
			flattenCommaListWorker(node.AsBinaryExpression().Right, yield)
	} else {
		return yield(node)
	}
}

func findComputedPropertyNameCacheAssignment(emitContext *printer.EmitContext, name *ast.Node) *ast.BinaryExpression {
	node := name.Expression()
	for {
		node = ast.SkipOuterExpressions(node, 0)
		if ast.IsBinaryExpression(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
			node = node.AsBinaryExpression().Right
			continue
		}
		if ast.IsAssignmentExpression(node, true /*excludeCompoundAssignment*/) && ast.IsIdentifier(node.AsBinaryExpression().Left) {
			return node.AsBinaryExpression()
		}
		break
	}
	return nil
}

func expandPreOrPostfixIncrementOrDecrementExpression(factory *printer.NodeFactory, emitContext *printer.EmitContext, node *ast.Node, expression *ast.Expression, resultVariable *ast.IdentifierNode) *ast.Expression {
	var operator ast.Kind
	var operand *ast.Node
	if ast.IsPrefixUnaryExpression(node) {
		operator = node.AsPrefixUnaryExpression().Operator
		operand = node.AsPrefixUnaryExpression().Operand
	} else {
		operator = node.AsPostfixUnaryExpression().Operator
		operand = node.AsPostfixUnaryExpression().Operand
	}

	temp := factory.NewTempVariable()
	emitContext.AddVariableDeclaration(temp)
	expression = factory.NewAssignmentExpression(temp, expression)
	expression.Loc = operand.Loc

	var operation *ast.Expression
	if ast.IsPrefixUnaryExpression(node) {
		operation = factory.NewPrefixUnaryExpression(operator, temp)
	} else {
		operation = factory.NewPostfixUnaryExpression(temp, operator)
	}
	operation.Loc = node.Loc

	if resultVariable != nil {
		operation = factory.NewAssignmentExpression(resultVariable, operation)
		operation.Loc = node.Loc
	}

	expression = factory.NewCommaExpression(expression, operation)
	expression.Loc = node.Loc

	if ast.IsPostfixUnaryExpression(node) {
		expression = factory.NewCommaExpression(expression, temp)
		expression.Loc = node.Loc
	}

	return expression
}

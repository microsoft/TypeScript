package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/transformers"
)

// Class/Decorator evaluation order, as it pertains to this transformer:
//
// 1. Class decorators are evaluated outside of the private name scope of the class.
//    - 15.8.20 RS: BindingClassDeclarationEvaluation
//    - 15.8.21 RS: Evaluation
//    - 8.3.5 RS: NamedEvaluation
// 2. ClassHeritage clause is evaluated outside of the private name scope of the class.
//    - 15.8.19 RS: ClassDefinitionEvaluation, Step 8.c.
// 3. The name of the class is assigned.
// 4. For each member:
//    a. Member Decorators are evaluated.
//       - 15.8.19 RS: ClassDefinitionEvaluation, Step 23.
//       - Probably 15.7.13 RS: ClassElementEvaluation, but it's missing from spec text.
//    b. Computed Property name is evaluated
//       - 15.8.19 RS: ClassDefinitionEvaluation, Step 23.
//       - 15.8.15 RS: ClassFieldDefinitionEvaluation, Step 1.
//       - 15.4.5 RS: MethodDefinitionEvaluation, Step 1.
// 5. Static non-field (method/getter/setter/auto-accessor) element decorators are applied
// 6. Non-static non-field (method/getter/setter/auto-accessor) element decorators are applied
// 7. Static field (excl. auto-accessor) element decorators are applied
// 8. Non-static field (excl. auto-accessor) element decorators are applied
// 9. Class decorators are applied
// 10. Class binding is initialized
// 11. Static method extra initializers are evaluated
// 12. Static fields are initialized (incl. extra initializers) and static blocks are evaluated
// 13. Class extra initializers are evaluated
//
// Class constructor evaluation order, as it pertains to this transformer:
//
// 1. Instance method extra initializers are evaluated
// 2. For each instance field/auto-accessor:
//    a. The field is initialized and defined on the instance.
//    b. Extra initializers for the field are evaluated.

// lexicalEntryKind discriminates the kind of lexical scope entry.
type lexicalEntryKind int

const (
	lexicalEntryKindClass lexicalEntryKind = iota
	lexicalEntryKindClassElement
	lexicalEntryKindName
	lexicalEntryKindOther
)

// lexicalEntry represents a single entry in the lexical scope stack used to track
// nested class declarations and their state during transformation.
type lexicalEntry struct {
	kind                    lexicalEntryKind
	next                    *lexicalEntry
	classInfoData           *classInfo
	savedPendingExpressions []*ast.Expression
	classThisData           *ast.IdentifierNode
	classSuperData          *ast.IdentifierNode
	depth                   int
}

// memberInfo stores decoration-related data for a single class element.
type memberInfo struct {
	memberDecoratorsName        *ast.IdentifierNode // used in class definition step 4.a
	memberInitializersName      *ast.IdentifierNode // used in class definition step 12 and constructor evaluation step 2.a
	memberExtraInitializersName *ast.IdentifierNode // used in class definition step 12 and constructor evaluation step 2.b
	memberDescriptorName        *ast.IdentifierNode
}

// classInfo stores all transformation data for a single decorated class.
type classInfo struct {
	class                                 *ast.Node
	classDecoratorsName                   *ast.IdentifierNode // used in class definition step 2
	classDescriptorName                   *ast.IdentifierNode // used in class definition step 10
	classExtraInitializersName            *ast.IdentifierNode // used in class definition step 13
	classThis                             *ast.IdentifierNode // `_classThis`, if needed.
	classSuper                            *ast.IdentifierNode // `_classSuper`, if needed.
	metadataReference                     *ast.IdentifierNode
	memberInfos                           collections.OrderedMap[*ast.Node, *memberInfo] // used in class definition step 4.a, 12, and constructor evaluation
	instanceMethodExtraInitializersName   *ast.IdentifierNode                            // used in constructor evaluation step 1
	staticMethodExtraInitializersName     *ast.IdentifierNode                            // used in class definition step 11
	staticNonFieldDecorationStatements    []*ast.Statement
	nonStaticNonFieldDecorationStatements []*ast.Statement
	staticFieldDecorationStatements       []*ast.Statement
	nonStaticFieldDecorationStatements    []*ast.Statement
	hasStaticInitializers                 bool
	hasNonAmbientInstanceFields           bool
	hasStaticPrivateClassElements         bool
	pendingStaticInitializers             []*ast.Expression
	pendingInstanceInitializers           []*ast.Expression
}

type esDecoratorTransformer struct {
	transformers.Transformer
	compilerOptions                            *core.CompilerOptions
	top                                        *lexicalEntry
	classInfoStack                             *classInfo
	classThis                                  *ast.IdentifierNode
	classSuper                                 *ast.IdentifierNode
	pendingExpressions                         []*ast.Expression
	outerThis                                  *ast.IdentifierNode
	shouldTransformPrivateStaticElementsInFile bool
	outerThisVisitor                           *ast.NodeVisitor
	discardedVisitor                           *ast.NodeVisitor
	modifierVisitor                            *ast.NodeVisitor
	exportStrippingModifierVisitor             *ast.NodeVisitor
	classElementVisitor                        *ast.NodeVisitor
	nonConstructorClassElementVisitor          *ast.NodeVisitor
	constructorClassElementVisitor             *ast.NodeVisitor
	arrayAssignmentVisitor                     *ast.NodeVisitor
	objectAssignmentVisitor                    *ast.NodeVisitor
	staticOnlyModifierVisitor                  *ast.NodeVisitor
	asyncOnlyModifierVisitor                   *ast.NodeVisitor
	accessorStrippingModifierVisitor           *ast.NodeVisitor
}

func newESDecoratorTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &esDecoratorTransformer{compilerOptions: opts.CompilerOptions}
	result := tx.NewTransformer(tx.visit, opts.Context)
	ec := tx.EmitContext()
	tx.outerThisVisitor = ec.NewNodeVisitor(tx.outerThisVisit)
	tx.discardedVisitor = ec.NewNodeVisitor(tx.discardedValueVisit)
	tx.modifierVisitor = ec.NewNodeVisitor(tx.modifierVisitorVisit)
	tx.exportStrippingModifierVisitor = ec.NewNodeVisitor(tx.exportStrippingModifierVisit)
	tx.classElementVisitor = ec.NewNodeVisitor(tx.classElementVisitorVisit)
	tx.nonConstructorClassElementVisitor = ec.NewNodeVisitor(tx.nonConstructorClassElementVisit)
	tx.constructorClassElementVisitor = ec.NewNodeVisitor(tx.constructorClassElementVisit)
	tx.arrayAssignmentVisitor = ec.NewNodeVisitor(tx.visitArrayAssignmentElement)
	tx.objectAssignmentVisitor = ec.NewNodeVisitor(tx.visitObjectAssignmentElement)
	tx.staticOnlyModifierVisitor = ec.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		if node.Kind == ast.KindStaticKeyword {
			return node
		}
		return nil
	})
	tx.asyncOnlyModifierVisitor = ec.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		if node.Kind == ast.KindAsyncKeyword {
			return node
		}
		return nil
	})
	tx.accessorStrippingModifierVisitor = ec.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		if node.Kind == ast.KindAccessorKeyword {
			return nil
		}
		return node
	})
	return result
}

func (tx *esDecoratorTransformer) updateState() {
	tx.classInfoStack = nil
	tx.classThis = nil
	tx.classSuper = nil
	if tx.top == nil {
		return
	}
	switch tx.top.kind {
	case lexicalEntryKindClass:
		tx.classInfoStack = tx.top.classInfoData
	case lexicalEntryKindClassElement:
		tx.classInfoStack = tx.top.next.classInfoData
		tx.classThis = tx.top.classThisData
		tx.classSuper = tx.top.classSuperData
	case lexicalEntryKindName:
		grandparent := tx.top.next.next.next
		if grandparent != nil && grandparent.kind == lexicalEntryKindClassElement {
			tx.classInfoStack = grandparent.next.classInfoData
			tx.classThis = grandparent.classThisData
			tx.classSuper = grandparent.classSuperData
		}
	}
}

func (tx *esDecoratorTransformer) enterClass(ci *classInfo) {
	tx.top = &lexicalEntry{
		kind:                    lexicalEntryKindClass,
		next:                    tx.top,
		classInfoData:           ci,
		savedPendingExpressions: tx.pendingExpressions,
	}
	tx.pendingExpressions = nil
	tx.updateState()
}

func (tx *esDecoratorTransformer) exitClass() {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindClass, "Incorrect value for top.kind. Expected top.kind to be 'class' but got '", tx.top.kind, "' instead.")
	tx.pendingExpressions = tx.top.savedPendingExpressions
	tx.top = tx.top.next
	tx.updateState()
}

func (tx *esDecoratorTransformer) enterClassElement(node *ast.Node) {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindClass, "Incorrect value for top.kind. Expected top.kind to be 'class' but got '", tx.top.kind, "' instead.")
	tx.top = &lexicalEntry{
		kind: lexicalEntryKindClassElement,
		next: tx.top,
	}
	if ast.IsClassStaticBlockDeclaration(node) || ast.IsPropertyDeclaration(node) && ast.HasStaticModifier(node) {
		if tx.top.next.classInfoData != nil {
			tx.top.classThisData = tx.top.next.classInfoData.classThis
			tx.top.classSuperData = tx.top.next.classInfoData.classSuper
		}
	}
	tx.updateState()
}

func (tx *esDecoratorTransformer) exitClassElement() {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindClassElement, "Incorrect value for top.kind. Expected top.kind to be 'class-element' but got '", tx.top.kind, "' instead.")
	debug.Assert(tx.top.next != nil && tx.top.next.kind == lexicalEntryKindClass, "Incorrect value for top.next.kind. Expected top.next.kind to be 'class' but got '", tx.top.next.kind, "' instead.")
	tx.top = tx.top.next
	tx.updateState()
}

func (tx *esDecoratorTransformer) enterName() {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindClassElement, "Incorrect value for top.kind. Expected top.kind to be 'class-element' but got '", tx.top.kind, "' instead.")
	tx.top = &lexicalEntry{
		kind: lexicalEntryKindName,
		next: tx.top,
	}
	tx.updateState()
}

func (tx *esDecoratorTransformer) exitName() {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindName, "Incorrect value for top.kind. Expected top.kind to be 'name' but got '", tx.top.kind, "' instead.")
	tx.top = tx.top.next
	tx.updateState()
}

func (tx *esDecoratorTransformer) enterOther() {
	if tx.top != nil && tx.top.kind == lexicalEntryKindOther {
		debug.Assert(len(tx.pendingExpressions) == 0)
		tx.top.depth++
	} else {
		tx.top = &lexicalEntry{
			kind:                    lexicalEntryKindOther,
			next:                    tx.top,
			savedPendingExpressions: tx.pendingExpressions,
		}
		tx.pendingExpressions = nil
		tx.updateState()
	}
}

func (tx *esDecoratorTransformer) exitOther() {
	debug.Assert(tx.top != nil && tx.top.kind == lexicalEntryKindOther, "Incorrect value for top.kind. Expected top.kind to be 'other' but got '", tx.top.kind, "' instead.")
	if tx.top.depth > 0 {
		debug.Assert(len(tx.pendingExpressions) == 0)
		tx.top.depth--
	} else {
		tx.pendingExpressions = tx.top.savedPendingExpressions
		tx.top = tx.top.next
		tx.updateState()
	}
}

func (tx *esDecoratorTransformer) visitSourceFile(node *ast.SourceFile) *ast.Node {
	tx.top = nil
	tx.shouldTransformPrivateStaticElementsInFile = false
	visited := tx.Visitor().VisitEachChild(node.AsNode())
	tx.EmitContext().AddEmitHelper(visited, tx.EmitContext().ReadEmitHelpers()...)
	if tx.shouldTransformPrivateStaticElementsInFile {
		tx.EmitContext().AddEmitFlags(visited, printer.EFTransformPrivateStaticElements)
		tx.shouldTransformPrivateStaticElementsInFile = false
	}
	return visited
}

func (tx *esDecoratorTransformer) outerThisVisit(n *ast.Node) *ast.Node {
	if n.SubtreeFacts()&ast.SubtreeContainsLexicalThis == 0 && n.Kind != ast.KindThisKeyword {
		return n
	}
	if n.Kind == ast.KindThisKeyword {
		if tx.outerThis == nil {
			tx.outerThis = tx.Factory().NewUniqueNameEx("_outerThis", printer.AutoGenerateOptions{
				Flags: printer.GeneratedIdentifierFlagsOptimistic,
			})
		}
		return tx.outerThis
	}
	return tx.outerThisVisitor.VisitEachChild(n)
}

func (tx *esDecoratorTransformer) shouldVisitNode(node *ast.Node) bool {
	return node.SubtreeFacts()&ast.SubtreeContainsDecorators != 0 ||
		(tx.classThis != nil && node.SubtreeFacts()&ast.SubtreeContainsLexicalThis != 0) ||
		(tx.classThis != nil && tx.classSuper != nil && node.SubtreeFacts()&ast.SubtreeContainsLexicalSuper != 0)
}

func (tx *esDecoratorTransformer) visit(node *ast.Node) *ast.Node {
	// When experimentalDecorators is set, the legacy decorator transformer has already
	// removed all decorators before this transform runs, so this is a no-op.
	// When targeting ESNext with useDefineForClassFields, there's nothing to transform either.
	if tx.compilerOptions.ExperimentalDecorators.IsTrue() ||
		(tx.compilerOptions.GetEmitScriptTarget() >= core.ScriptTargetESNext && tx.compilerOptions.GetUseDefineForClassFields()) {
		return node
	}
	if node.Kind == ast.KindSourceFile {
		return tx.visitSourceFile(node.AsSourceFile())
	}
	if !tx.shouldVisitNode(node) {
		return node
	}
	switch node.Kind {
	case ast.KindDecorator:
		// Decorators are elided. In Strada, a separate `modifierVisitor` drops decorators
		// before they reach `visitor` via visitEachChild. Here, `visit` serves as both
		// visitors, so decorators from modifier lists reach it directly.
		return nil
	case ast.KindClassDeclaration:
		return tx.visitClassDeclaration(node.AsClassDeclaration())
	case ast.KindClassExpression:
		return tx.visitClassExpression(node.AsClassExpression())
	case ast.KindConstructor, ast.KindPropertyDeclaration, ast.KindClassStaticBlockDeclaration:
		debug.Fail("Not supported outside of a class. Use 'classElementVisitor' instead.")
		return nil
	case ast.KindParameter:
		return tx.visitParameterDeclaration(node.AsParameterDeclaration())
	// Support NamedEvaluation to ensure the correct class name for class expressions.
	case ast.KindBinaryExpression:
		return tx.visitBinaryExpression(node, false /*discarded*/)
	case ast.KindPropertyAssignment, ast.KindVariableDeclaration, ast.KindBindingElement:
		return tx.visitNamedEvaluationSite(node, node.Initializer())
	case ast.KindExportAssignment:
		return tx.visitExportAssignment(node)
	case ast.KindThisKeyword:
		return tx.visitThisExpression(node)
	case ast.KindForStatement:
		return tx.visitForStatement(node)
	case ast.KindExpressionStatement:
		return tx.visitExpressionStatement(node)
	case ast.KindParenthesizedExpression:
		return tx.visitParenthesizedExpression(node, false /*discarded*/)
	case ast.KindPartiallyEmittedExpression:
		return tx.visitPartiallyEmittedExpression(node, false /*discarded*/)
	case ast.KindCallExpression:
		return tx.visitCallExpression(node)
	case ast.KindTaggedTemplateExpression:
		return tx.visitTaggedTemplateExpression(node)
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return tx.visitPreOrPostfixUnaryExpression(node, false /*discarded*/)
	case ast.KindPropertyAccessExpression:
		return tx.visitPropertyAccessExpression(node)
	case ast.KindElementAccessExpression:
		return tx.visitElementAccessExpression(node)
	case ast.KindComputedPropertyName:
		return tx.visitComputedPropertyName(node)
	case ast.KindMethodDeclaration,
		ast.KindSetAccessor,
		ast.KindGetAccessor,
		ast.KindFunctionExpression,
		ast.KindFunctionDeclaration:
		tx.enterOther()
		result := tx.Visitor().VisitEachChild(node)
		tx.exitOther()
		return result
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

func (tx *esDecoratorTransformer) modifierVisitorVisit(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindDecorator {
		return nil
	}
	return node
}

func (tx *esDecoratorTransformer) classElementVisitorVisit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindConstructor:
		return tx.visitConstructorDeclaration(node)
	case ast.KindMethodDeclaration:
		return tx.visitMethodDeclaration(node)
	case ast.KindGetAccessor:
		return tx.visitGetAccessorDeclaration(node)
	case ast.KindSetAccessor:
		return tx.visitSetAccessorDeclaration(node)
	case ast.KindPropertyDeclaration:
		return tx.visitPropertyDeclaration(node)
	case ast.KindClassStaticBlockDeclaration:
		return tx.visitClassStaticBlockDeclaration(node)
	default:
		return tx.visit(node)
	}
}

func (tx *esDecoratorTransformer) discardedValueVisit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return tx.visitPreOrPostfixUnaryExpression(node, true /*discarded*/)
	case ast.KindBinaryExpression:
		return tx.visitBinaryExpression(node, true /*discarded*/)
	case ast.KindParenthesizedExpression:
		return tx.visitParenthesizedExpression(node, true /*discarded*/)
	case ast.KindPartiallyEmittedExpression:
		return tx.visitPartiallyEmittedExpression(node, true /*discarded*/)
	default:
		return tx.visit(node)
	}
}

func (tx *esDecoratorTransformer) nonConstructorClassElementVisit(node *ast.Node) *ast.Node {
	if ast.IsConstructorDeclaration(node) {
		return node // skip constructors in pass 1
	}
	return tx.classElementVisitorVisit(node)
}

func (tx *esDecoratorTransformer) constructorClassElementVisit(node *ast.Node) *ast.Node {
	if ast.IsConstructorDeclaration(node) {
		return tx.classElementVisitorVisit(node)
	}
	return node
}

func (tx *esDecoratorTransformer) exportStrippingModifierVisit(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindExportKeyword {
		return nil
	}
	return tx.modifierVisitorVisit(node)
}

func getHelperVariableName(ec *printer.EmitContext, node *ast.Node) string {
	name := node.Name()
	declarationName := ""
	switch {
	case name != nil && ast.IsIdentifier(name) && !transformers.IsGeneratedIdentifier(ec, name):
		declarationName = name.Text()
	case name != nil && ast.IsPrivateIdentifier(name) && !ec.HasAutoGenerateInfo(name):
		if text := name.Text(); len(text) > 1 {
			declarationName = text[1:]
		}
	case name != nil && ast.IsStringLiteral(name) && scanner.IsIdentifierText(name.Text(), core.LanguageVariantStandard):
		declarationName = name.Text()
	case ast.IsClassLike(node):
		declarationName = "class"
	default:
		declarationName = "member"
	}

	if ast.IsGetAccessorDeclaration(node) {
		declarationName = "get_" + declarationName
	}
	if ast.IsSetAccessorDeclaration(node) {
		declarationName = "set_" + declarationName
	}
	if name != nil && ast.IsPrivateIdentifier(name) {
		declarationName = "private_" + declarationName
	}
	if ast.IsStatic(node) {
		declarationName = "static_" + declarationName
	}
	return "_" + declarationName
}

func (tx *esDecoratorTransformer) createHelperVariable(node *ast.Node, suffix string) *ast.IdentifierNode {
	return tx.Factory().NewUniqueNameEx(
		getHelperVariableName(tx.EmitContext(), node)+"_"+suffix,
		printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsReservedInNestedScopes},
	)
}

func (tx *esDecoratorTransformer) createLet(name *ast.IdentifierNode, initializer *ast.Expression) *ast.Statement {
	return tx.Factory().NewVariableStatement(
		nil,
		tx.Factory().NewVariableDeclarationList(
			ast.NodeFlagsLet,
			tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewVariableDeclaration(name, nil, nil, initializer),
			}),
		),
	)
}

func (tx *esDecoratorTransformer) createClassInfo(node *ast.Node) *classInfo {
	f := tx.Factory()
	ci := &classInfo{
		class: node,
		metadataReference: f.NewUniqueNameEx("_metadata", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		}),
	}

	// Before visiting we perform a first pass to collect information we'll need
	// as we descend.

	// If the class itself is decorated, create a _classThis binding
	if ast.NodeIsDecorated(false, node, nil, nil) {
		needsUniqueClassThis := core.Some(node.Members(), func(member *ast.Node) bool {
			return (ast.IsPrivateIdentifierClassElementDeclaration(member) || ast.IsAutoAccessorPropertyDeclaration(member)) && ast.HasStaticModifier(member)
		})
		// We do not mark _classThis as FileLevel if it may be reused by class private fields, which requires the
		// ability access the captured `_classThis` of outer scopes.
		var flags printer.GeneratedIdentifierFlags = printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel
		if needsUniqueClassThis {
			flags = printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsReservedInNestedScopes
		}
		ci.classThis = f.NewUniqueNameEx("_classThis", printer.AutoGenerateOptions{Flags: flags})
	}

	for _, member := range node.Members() {
		if ast.IsMethodOrAccessor(member) && ast.NodeOrChildIsDecorated(false, member, node, nil) {
			if ast.HasStaticModifier(member) {
				if ci.staticMethodExtraInitializersName == nil {
					ci.staticMethodExtraInitializersName = f.NewUniqueNameEx("_staticExtraInitializers", printer.AutoGenerateOptions{
						Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
					})
					var renamedClassThis *ast.Node
					if ci.classThis != nil {
						renamedClassThis = ci.classThis
					} else {
						renamedClassThis = f.NewThisExpression()
					}
					initializer := f.NewRunInitializersHelper(renamedClassThis, ci.staticMethodExtraInitializersName, nil)
					nameRange := node.Name()
					if nameRange != nil {
						tx.EmitContext().SetSourceMapRange(initializer, nameRange.Loc)
					} else {
						tx.EmitContext().SetSourceMapRange(initializer, transformers.MoveRangePastDecorators(node))
					}
					ci.pendingStaticInitializers = append(ci.pendingStaticInitializers, initializer)
				}
			} else {
				if ci.instanceMethodExtraInitializersName == nil {
					ci.instanceMethodExtraInitializersName = f.NewUniqueNameEx("_instanceExtraInitializers", printer.AutoGenerateOptions{
						Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
					})
					initializer := f.NewRunInitializersHelper(f.NewThisExpression(), ci.instanceMethodExtraInitializersName, nil)
					nameRange := node.Name()
					if nameRange != nil {
						tx.EmitContext().SetSourceMapRange(initializer, nameRange.Loc)
					} else {
						tx.EmitContext().SetSourceMapRange(initializer, transformers.MoveRangePastDecorators(node))
					}
					ci.pendingInstanceInitializers = append(ci.pendingInstanceInitializers, initializer)
				}
			}
		}

		if ast.IsClassStaticBlockDeclaration(member) {
			if !isClassNamedEvaluationHelperBlock(tx.EmitContext(), member) {
				ci.hasStaticInitializers = true
			}
		} else if ast.IsPropertyDeclaration(member) {
			if ast.HasStaticModifier(member) {
				ci.hasStaticInitializers = ci.hasStaticInitializers || member.Initializer() != nil || ast.HasDecorators(member)
			} else {
				ci.hasNonAmbientInstanceFields = ci.hasNonAmbientInstanceFields || !ast.HasSyntacticModifier(member, ast.ModifierFlagsAmbient)
			}
		}

		if (ast.IsPrivateIdentifierClassElementDeclaration(member) || ast.IsAutoAccessorPropertyDeclaration(member)) && ast.HasStaticModifier(member) {
			ci.hasStaticPrivateClassElements = true
		}

		// exit early if possible
		if ci.staticMethodExtraInitializersName != nil &&
			ci.instanceMethodExtraInitializersName != nil &&
			ci.hasStaticInitializers &&
			ci.hasNonAmbientInstanceFields &&
			ci.hasStaticPrivateClassElements {
			break
		}
	}

	return ci
}

func (tx *esDecoratorTransformer) transformClassLike(node *ast.Node) *ast.Expression {
	f := tx.Factory()
	ec := tx.EmitContext()

	ec.StartVariableEnvironment()

	// When a class has class decorators we end up transforming it into a statement that would otherwise give it an
	// assigned name. If the class doesn't have an assigned name, we'll give it an assigned name of `""`.
	if !classHasDeclaredOrExplicitlyAssignedName(ec, node) && ast.ClassOrConstructorParameterIsDecorated(false, node) {
		node = injectClassNamedEvaluationHelperBlockIfMissing(ec, node, f.NewStringLiteral("", 0), nil)
	}

	classReference := f.GetLocalNameEx(node, printer.AssignedNameOptions{})
	ci := tx.createClassInfo(node)
	classDefinitionStatements := []*ast.Statement{}
	var leadingBlockStatements []*ast.Statement
	var trailingBlockStatements []*ast.Statement
	var syntheticConstructor *ast.Node
	var heritageClauses *ast.NodeList
	shouldTransformPrivateStaticElementsInClass := false

	// 1. Class decorators are evaluated outside the private name scope of the class.
	//
	// - Since class decorators don't have privileged access to private names defined inside the class,
	//   they must be evaluated outside of the class body.
	// - Since a class decorator can replace the class constructor, we must define a variable to keep track
	//   of the mutated class.
	// - Since a class decorator can add extra initializers, we must define a variable to keep track of
	//   extra initializers.
	classDecorators := tx.transformAllDecoratorsOfDeclaration(node.Decorators())
	if len(classDecorators) > 0 {
		debug.Assert(ci.classThis != nil)

		ci.classDecoratorsName = f.NewUniqueNameEx("_classDecorators", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		})
		ci.classDescriptorName = f.NewUniqueNameEx("_classDescriptor", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		})
		ci.classExtraInitializersName = f.NewUniqueNameEx("_classExtraInitializers", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		})

		decoratorsArray := f.NewArrayLiteralExpression(
			f.NewNodeList(classDecorators),
			false,
		)
		classDefinitionStatements = append(classDefinitionStatements,
			tx.createLet(ci.classDecoratorsName, decoratorsArray),
			tx.createLet(ci.classDescriptorName, nil),
			tx.createLet(ci.classExtraInitializersName, f.NewArrayLiteralExpression(f.NewNodeList(nil), false)),
			tx.createLet(ci.classThis, nil),
		)

		if len(classDecorators) > 0 && ci.hasStaticPrivateClassElements {
			shouldTransformPrivateStaticElementsInClass = true
			tx.shouldTransformPrivateStaticElementsInFile = true
		}
	}

	// 2. ClassHeritage clause is evaluated outside of the private name scope of the class.
	extendsClause := ast.GetHeritageClause(node, ast.KindExtendsKeyword)
	var extendsElement *ast.Node
	if extendsClause != nil {
		hc := extendsClause.AsHeritageClause()
		if hc.Types != nil && len(hc.Types.Nodes) > 0 {
			extendsElement = hc.Types.Nodes[0]
		}
	}
	var extendsExpression *ast.Expression
	if extendsElement != nil {
		extendsExpression = tx.Visitor().VisitNode(extendsElement.AsExpressionWithTypeArguments().Expression)
	}

	if extendsExpression != nil {
		// Rewrite `super` in static initializers so that we can use the correct `this`.
		ci.classSuper = f.NewUniqueNameEx("_classSuper", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		})

		// Ensure we do not give the class or function an assigned name due to the variable by prefixing it
		// with `0, `.
		unwrapped := ast.SkipOuterExpressions(extendsExpression, ast.OEKAll)
		safeExtendsExpression := extendsExpression
		if (ast.IsClassExpression(unwrapped) && unwrapped.Name() == nil) ||
			(ast.IsFunctionExpression(unwrapped) && unwrapped.Name() == nil) ||
			ast.IsArrowFunction(unwrapped) {
			safeExtendsExpression = f.NewCommaExpression(
				f.NewNumericLiteral("0", 0),
				extendsExpression,
			)
		}
		classDefinitionStatements = append(classDefinitionStatements, tx.createLet(ci.classSuper, safeExtendsExpression))

		updatedExtendsElement := f.UpdateExpressionWithTypeArguments(extendsElement.AsExpressionWithTypeArguments(), ci.classSuper, nil)
		updatedExtendsClause := f.UpdateHeritageClause(extendsClause.AsHeritageClause(), f.NewNodeList([]*ast.Node{updatedExtendsElement}))
		heritageClauses = f.NewNodeList([]*ast.Node{updatedExtendsClause})
	}

	var renamedClassThis *ast.Node
	if ci.classThis != nil {
		renamedClassThis = ci.classThis
	} else {
		renamedClassThis = f.NewThisExpression()
	}

	// 3. The name of the class is assigned.
	//
	// If the class did not have a name, the caller should have performed injectClassNamedEvaluationHelperBlockIfMissing
	// prior to calling this function if a name was needed.

	// 4. For each member:
	//    a. Member Decorators are evaluated
	//    b. Computed Property Name is evaluated, if present
	//
	// We visit members in two passes:
	// - The first pass visits methods, accessors, and fields to collect decorators and computed property names.
	// - The second pass visits the constructor to add instance initializers.
	//
	// NOTE: If there are no constructors, but there are instance initializers, a synthetic constructor is added.
	tx.enterClass(ci)

	leadingBlockStatements = append(leadingBlockStatements, tx.createMetadata(ci.metadataReference, ci.classSuper))

	// Since the constructor can appear anywhere in the class body and its transform depends on other class elements,
	// we must first visit all non-constructor members, then visit the constructor, all while maintaining document order.
	members := tx.nonConstructorClassElementVisitor.VisitNodes(node.MemberList())
	members = tx.constructorClassElementVisitor.VisitNodes(members)

	// Handle pending expressions (computed property names and decorator evaluations)
	if len(tx.pendingExpressions) > 0 {
		// If a pending expression contains a lexical `this`, we'll need to capture the lexical `this` of the
		// container and transform it in the expression. This ensures we use the correct `this` in the resulting
		// class `static` block. We don't use substitution here because the size of the tree we are visiting
		// is likely to be small and doesn't justify the complexity of introducing substitution.
		tx.outerThis = nil
		for _, expr := range tx.pendingExpressions {
			// If a pending expression contains lexical `this`, capture it
			if expr.SubtreeFacts()&ast.SubtreeContainsLexicalThis != 0 {
				expr = tx.outerThisVisitor.VisitNode(expr)
			}
			statement := f.NewExpressionStatement(expr)
			leadingBlockStatements = append(leadingBlockStatements, statement)
		}
		if tx.outerThis != nil {
			classDefinitionStatements = append(
				[]*ast.Statement{tx.createLet(tx.outerThis, f.NewThisExpression())},
				classDefinitionStatements...,
			)
		}
		tx.pendingExpressions = nil
	}
	tx.exitClass()

	// If there are instance initializers but no constructor, synthesize one
	if len(ci.pendingInstanceInitializers) > 0 && ast.GetFirstConstructorWithBody(node) == nil {
		initializerStatements := tx.prepareConstructor(ci)
		if len(initializerStatements) > 0 {
			isDerivedClass := extendsElement != nil && ast.SkipOuterExpressions(extendsElement.AsExpressionWithTypeArguments().Expression, ast.OEKAll).Kind != ast.KindNullKeyword
			constructorStatements := []*ast.Statement{}
			if isDerivedClass {
				spreadArguments := f.NewSpreadElement(f.NewIdentifier("arguments"))
				superCall := f.NewCallExpression(f.NewKeywordExpression(ast.KindSuperKeyword), nil, nil, f.NewNodeList([]*ast.Expression{spreadArguments}), ast.NodeFlagsNone)
				constructorStatements = append(constructorStatements, f.NewExpressionStatement(superCall))
			}
			constructorStatements = append(constructorStatements, initializerStatements...)
			constructorBody := f.NewBlock(f.NewNodeList(constructorStatements), true)
			syntheticConstructor = f.NewConstructorDeclaration(nil, nil, f.NewNodeList(nil), nil, nil, constructorBody)
		}
	}

	// Used in class definition steps 5,7,11
	if ci.staticMethodExtraInitializersName != nil {
		classDefinitionStatements = append(classDefinitionStatements,
			tx.createLet(ci.staticMethodExtraInitializersName, f.NewArrayLiteralExpression(f.NewNodeList(nil), false)),
		)
	}

	// Used in class definition steps 6,8, and construction
	if ci.instanceMethodExtraInitializersName != nil {
		classDefinitionStatements = append(classDefinitionStatements,
			tx.createLet(ci.instanceMethodExtraInitializersName, f.NewArrayLiteralExpression(f.NewNodeList(nil), false)),
		)
	}

	// Used in class definition steps 7, 8, 12, and construction.
	// Emit member info variable declarations; the reference implementation emits static member vars first, then non-static.
	if ci.memberInfos.Size() > 0 {
		classDefinitionStatements = append(classDefinitionStatements, tx.emitMemberInfoDeclarations(ci, true /*isStatic*/)...)
		classDefinitionStatements = append(classDefinitionStatements, tx.emitMemberInfoDeclarations(ci, false /*isStatic*/)...)
	}

	// 5. Static non-field element decorators are applied
	leadingBlockStatements = append(leadingBlockStatements, ci.staticNonFieldDecorationStatements...)

	// 6. Non-static non-field element decorators are applied
	leadingBlockStatements = append(leadingBlockStatements, ci.nonStaticNonFieldDecorationStatements...)

	// 7. Static field element decorators are applied
	leadingBlockStatements = append(leadingBlockStatements, ci.staticFieldDecorationStatements...)

	// 8. Non-static field element decorators are applied
	leadingBlockStatements = append(leadingBlockStatements, ci.nonStaticFieldDecorationStatements...)

	// 9. Class decorators are applied
	// 10. Class binding is initialized
	//
	// produces:
	//   __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name, metadata }, null, _classExtraInitializers);
	if ci.classDescriptorName != nil && ci.classDecoratorsName != nil && ci.classExtraInitializersName != nil && ci.classThis != nil {
		valueProperty := f.NewPropertyAssignment(nil, f.NewIdentifier("value"), nil, nil, renamedClassThis)
		classDescriptor := f.NewObjectLiteralExpression(f.NewNodeList([]*ast.Node{valueProperty}), false)
		classDescriptorAssignment := f.NewAssignmentExpression(ci.classDescriptorName, classDescriptor)
		classNameReference := f.NewPropertyAccessExpression(renamedClassThis, nil, f.NewIdentifier("name"), ast.NodeFlagsNone)

		contextObj := f.NewESDecorateClassContextObject(classNameReference, ci.metadataReference)

		esDecorateHelper := f.NewESDecorateHelper(
			f.NewToken(ast.KindNullKeyword),
			classDescriptorAssignment,
			ci.classDecoratorsName,
			contextObj,
			f.NewToken(ast.KindNullKeyword),
			ci.classExtraInitializersName,
		)
		esDecorateStatement := f.NewExpressionStatement(esDecorateHelper)
		ec.SetSourceMapRange(esDecorateStatement, transformers.MoveRangePastDecorators(node))
		leadingBlockStatements = append(leadingBlockStatements, esDecorateStatement)

		// produces:
		//   C = _classThis = _classDescriptor.value;
		classDescriptorValueRef := f.NewPropertyAccessExpression(ci.classDescriptorName, nil, f.NewIdentifier("value"), ast.NodeFlagsNone)
		classThisAssignment := f.NewAssignmentExpression(ci.classThis, classDescriptorValueRef)
		classReferenceAssignment := f.NewAssignmentExpression(classReference, classThisAssignment)
		leadingBlockStatements = append(leadingBlockStatements, f.NewExpressionStatement(classReferenceAssignment))
	}

	// produces:
	//   if (metadata) Object.defineProperty(C, Symbol.metadata, { configurable: true, writable: true, value: metadata });
	leadingBlockStatements = append(leadingBlockStatements, tx.createSymbolMetadata(renamedClassThis, ci.metadataReference))

	// 11. Static extra initializers
	// 12. Static fields are initialized
	if len(ci.pendingStaticInitializers) > 0 {
		for _, initializer := range ci.pendingStaticInitializers {
			initializerStatement := f.NewExpressionStatement(initializer)
			ec.SetSourceMapRange(initializerStatement, ec.SourceMapRange(initializer))
			trailingBlockStatements = append(trailingBlockStatements, initializerStatement)
		}
		ci.pendingStaticInitializers = nil
	}

	// 13. Class extra initializers
	if ci.classExtraInitializersName != nil {
		runClassInitializersHelper := f.NewRunInitializersHelper(renamedClassThis, ci.classExtraInitializersName, nil)
		runClassInitializersStatement := f.NewExpressionStatement(runClassInitializersHelper)
		if node.Name() != nil {
			ec.SetSourceMapRange(runClassInitializersStatement, node.Name().Loc)
		} else {
			ec.SetSourceMapRange(runClassInitializersStatement, transformers.MoveRangePastDecorators(node))
		}
		trailingBlockStatements = append(trailingBlockStatements, runClassInitializersStatement)
	}

	// If there are no other static initializers to run, combine the leading and trailing block statements
	if len(leadingBlockStatements) > 0 && len(trailingBlockStatements) > 0 && !ci.hasStaticInitializers {
		leadingBlockStatements = append(leadingBlockStatements, trailingBlockStatements...)
		trailingBlockStatements = nil
	}

	// prepare a leading `static {}` block, if necessary
	//
	// produces:
	//   class C {
	//       static { ... }
	//       ...
	//   }
	var leadingStaticBlock *ast.Node
	if len(leadingBlockStatements) > 0 {
		leadingStaticBlock = f.NewClassStaticBlockDeclaration(
			nil,
			f.NewBlock(f.NewNodeList(leadingBlockStatements), true),
		)
	}

	if leadingStaticBlock != nil && shouldTransformPrivateStaticElementsInClass {
		// We use EFTransformPrivateStaticElements as a marker on a class static block
		// to inform the classFields transform that it shouldn't rename `this` to `_classThis` in the
		// transformed class static block.
		ec.SetEmitFlags(leadingStaticBlock, printer.EFTransformPrivateStaticElements)
	}

	// prepare a trailing `static {}` block, if necessary
	//
	// produces:
	//   class C {
	//       ...
	//       static { ... }
	//   }
	var trailingStaticBlock *ast.Node
	if len(trailingBlockStatements) > 0 {
		trailingStaticBlock = f.NewClassStaticBlockDeclaration(
			nil,
			f.NewBlock(f.NewNodeList(trailingBlockStatements), true),
		)
	}

	// Assemble new members list
	if leadingStaticBlock != nil || syntheticConstructor != nil || trailingStaticBlock != nil {
		newMembers := make([]*ast.Node, 0, len(members.Nodes)+3)

		// Find the existing NamedEvaluation helper block index
		existingNamedEvaluationHelperBlockIndex := -1
		for i, m := range members.Nodes {
			if isClassNamedEvaluationHelperBlock(ec, m) {
				existingNamedEvaluationHelperBlockIndex = i
				break
			}
		}

		// add the leading `static {}` block
		if leadingStaticBlock != nil {
			// add the `static {}` block after any existing NamedEvaluation helper block, if one exists.
			newMembers = append(newMembers, members.Nodes[:existingNamedEvaluationHelperBlockIndex+1]...)
			newMembers = append(newMembers, leadingStaticBlock)
			newMembers = append(newMembers, members.Nodes[existingNamedEvaluationHelperBlockIndex+1:]...)
		} else {
			newMembers = append(newMembers, members.Nodes...)
		}

		// append the synthetic constructor, if necessary
		if syntheticConstructor != nil {
			newMembers = append(newMembers, syntheticConstructor)
		}

		// append a trailing `static {}` block, if necessary
		if trailingStaticBlock != nil {
			newMembers = append(newMembers, trailingStaticBlock)
		}

		membersList := f.NewNodeList(newMembers)
		membersList.Loc = members.Loc
		members = membersList
	}

	lexicalEnvironment := ec.EndVariableEnvironment()

	var classExpression *ast.Node
	if len(classDecorators) > 0 {
		classExpression = f.NewClassExpression(nil, nil, nil, heritageClauses, members)
		ec.SetOriginal(classExpression, node)
		if ci.classThis != nil {
			classExpression = injectClassThisAssignmentIfMissing(ec, f, classExpression, ci.classThis)
		}

		// We use `var` instead of `let` so we can leverage NamedEvaluation to define the class name
		// and still be able to ensure it is initialized prior to any use in `static {}`.

		// produces:
		//   (() => {
		//       let _classDecorators = [...];
		//       let _classDescriptor;
		//       let _classExtraInitializers = [];
		//       let _classThis;
		//       ...
		//       var C = class {
		//           static {
		//               __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, ...);
		//               C = _classThis = _classDescriptor.value;
		//           }
		//           static x = 1;
		//           static y = C.x; // `C` will already be defined here.
		//           static { ... }
		//       };
		//       return C;
		//   })();

		classReferenceDeclaration := f.NewVariableDeclaration(classReference, nil, nil, classExpression)
		classReferenceVarDeclList := f.NewVariableDeclarationList(ast.NodeFlagsNone, f.NewNodeList([]*ast.Node{classReferenceDeclaration}))
		var returnExpr *ast.Expression
		if ci.classThis != nil {
			returnExpr = f.NewAssignmentExpression(classReference, ci.classThis)
		} else {
			returnExpr = classReference
		}
		classDefinitionStatements = append(classDefinitionStatements,
			f.NewVariableStatement(nil, classReferenceVarDeclList),
			f.NewReturnStatement(returnExpr),
		)
	} else {
		// produces:
		//   return <classExpression>;
		classExpression = f.NewClassExpression(nil, node.Name(), nil, heritageClauses, members)
		ec.SetOriginal(classExpression, node)
		classDefinitionStatements = append(classDefinitionStatements, f.NewReturnStatement(classExpression))
	}

	if shouldTransformPrivateStaticElementsInClass {
		ec.AddEmitFlags(classExpression, printer.EFTransformPrivateStaticElements)
		for _, member := range classExpression.Members() {
			if (ast.IsPrivateIdentifierClassElementDeclaration(member) || ast.IsAutoAccessorPropertyDeclaration(member)) && ast.HasStaticModifier(member) {
				ec.AddEmitFlags(member, printer.EFTransformPrivateStaticElements)
			}
		}
	}

	mergedStatements := ec.MergeEnvironment(classDefinitionStatements, lexicalEnvironment)
	return f.NewImmediatelyInvokedArrowFunction(mergedStatements)
}

// Generates let declarations for member decorator info variables, filtered by static/non-static.
func (tx *esDecoratorTransformer) emitMemberInfoDeclarations(ci *classInfo, isStatic bool) []*ast.Statement {
	f := tx.Factory()
	var stmts []*ast.Statement
	for member, mi := range ci.memberInfos.Entries() {
		if ast.IsStatic(member) != isStatic {
			continue
		}
		stmts = append(stmts, tx.createLet(mi.memberDecoratorsName, nil))
		if mi.memberInitializersName != nil {
			stmts = append(stmts, tx.createLet(mi.memberInitializersName, f.NewArrayLiteralExpression(f.NewNodeList(nil), false)))
		}
		if mi.memberExtraInitializersName != nil {
			stmts = append(stmts, tx.createLet(mi.memberExtraInitializersName, f.NewArrayLiteralExpression(f.NewNodeList(nil), false)))
		}
		if mi.memberDescriptorName != nil {
			stmts = append(stmts, tx.createLet(mi.memberDescriptorName, nil))
		}
	}
	return stmts
}

func isDecoratedClassLike(node *ast.Node) bool {
	return ast.ClassOrConstructorParameterIsDecorated(false, node) ||
		ast.ChildIsDecorated(false, node, nil)
}

func (tx *esDecoratorTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	if isDecoratedClassLike(node.AsNode()) {
		f := tx.Factory()
		ec := tx.EmitContext()
		statements := []*ast.Statement{}

		originalClass := ec.MostOriginal(node.AsNode())
		if !ast.IsClassLike(originalClass) {
			originalClass = node.AsNode()
		}
		var className *ast.Expression
		if originalClass.Name() != nil {
			className = f.NewStringLiteralFromNode(originalClass.Name())
		} else {
			className = f.NewStringLiteral("default", 0)
		}

		isExport := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport)
		isDefault := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsDefault)

		classNode := node.AsNode()
		if node.Name() == nil {
			classNode = injectClassNamedEvaluationHelperBlockIfMissing(ec, classNode, className, nil)
		}

		if isExport && isDefault {
			iife := tx.transformClassLike(classNode)
			if classNode.Name() != nil {
				// produces:
				//   let C = (() => { ... })();
				//   export default C;
				varDecl := f.NewVariableDeclaration(f.GetLocalName(classNode), nil, nil, iife)
				ec.SetOriginal(varDecl, classNode)
				varDecls := f.NewVariableDeclarationList(ast.NodeFlagsLet, f.NewNodeList([]*ast.Node{varDecl}))
				varStatement := f.NewVariableStatement(nil, varDecls)
				statements = append(statements, varStatement)

				exportStatement := f.NewExportDefault(f.GetDeclarationName(classNode))
				ec.SetOriginal(exportStatement, classNode)
				ec.AssignCommentRange(exportStatement, classNode)
				ec.SetSourceMapRange(exportStatement, transformers.MoveRangePastDecorators(classNode))
				statements = append(statements, exportStatement)
			} else {
				// produces:
				//   export default (() => { ... })();
				exportStatement := f.NewExportDefault(iife)
				ec.SetOriginal(exportStatement, classNode)
				ec.AssignCommentRange(exportStatement, classNode)
				ec.SetSourceMapRange(exportStatement, transformers.MoveRangePastDecorators(classNode))
				statements = append(statements, exportStatement)
			}
		} else {
			debug.Assert(classNode.Name() != nil, "A class declaration that is not a default export must have a name.")
			// produces:
			//   let C = (() => { ... })();
			iife := tx.transformClassLike(classNode)
			modifiers := tx.exportStrippingModifierVisitor.VisitModifiers(classNode.Modifiers())

			declName := f.GetLocalNameEx(classNode, printer.AssignedNameOptions{AllowSourceMaps: true})
			varDecl := f.NewVariableDeclaration(declName, nil, nil, iife)
			ec.SetOriginal(varDecl, classNode)
			varDecls := f.NewVariableDeclarationList(ast.NodeFlagsLet, f.NewNodeList([]*ast.Node{varDecl}))
			varStatement := f.NewVariableStatement(modifiers, varDecls)
			ec.SetOriginal(varStatement, classNode)
			ec.AssignCommentRange(varStatement, classNode)
			statements = append(statements, varStatement)

			if isExport {
				// produces:
				//   export { C };
				exportStatement := f.NewExternalModuleExport(declName)
				ec.SetOriginal(exportStatement, classNode)
				statements = append(statements, exportStatement)
			}
		}

		return transformers.SingleOrMany(statements, f)
	}

	// Non-decorated class
	modifiers := tx.modifierVisitor.VisitModifiers(node.Modifiers())
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	tx.enterClass(nil)
	members := tx.classElementVisitor.VisitNodes(node.Members)
	tx.exitClass()
	return tx.Factory().UpdateClassDeclaration(node, modifiers, node.Name(), nil, heritageClauses, members)
}

func (tx *esDecoratorTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	if isDecoratedClassLike(node.AsNode()) {
		iife := tx.transformClassLike(node.AsNode())
		tx.EmitContext().SetOriginal(iife, node.AsNode())
		return iife
	}

	modifiers := tx.modifierVisitor.VisitModifiers(node.Modifiers())
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	tx.enterClass(nil)
	members := tx.classElementVisitor.VisitNodes(node.Members)
	tx.exitClass()
	return tx.Factory().UpdateClassExpression(node, modifiers, node.Name(), nil, heritageClauses, members)
}

func (tx *esDecoratorTransformer) prepareConstructor(ci *classInfo) []*ast.Statement {
	// Decorated instance members can add "extra" initializers to the instance. If a class contains any instance
	// fields, we'll inject the `__runInitializers()` call for these extra initializers into the initializer of
	// the first class member that will be initialized. However, if the class does not contain any fields that
	// we can piggyback on, we need to synthesize a `__runInitializers()` call in the constructor instead.
	if len(ci.pendingInstanceInitializers) == 0 {
		return nil
	}
	f := tx.Factory()
	statements := []*ast.Statement{
		f.NewExpressionStatement(f.InlineExpressions(ci.pendingInstanceInitializers)),
	}
	ci.pendingInstanceInitializers = nil
	return statements
}

func (tx *esDecoratorTransformer) transformConstructorBodyWorker(statementsOut []*ast.Statement, statementsIn []*ast.Statement, statementOffset int, superPath []int, superPathDepth int, initializerStatements []*ast.Statement) []*ast.Statement {
	superStatementIndex := superPath[superPathDepth]
	// Visit statements before super
	if superStatementIndex > statementOffset {
		for _, s := range statementsIn[statementOffset:superStatementIndex] {
			statementsOut = append(statementsOut, tx.Visitor().VisitNode(s))
		}
	}

	superStatement := statementsIn[superStatementIndex]
	if ast.IsTryStatement(superStatement) {
		// Recurse into try block
		tryBlockNode := superStatement.AsTryStatement().TryBlock
		tryBlock := tryBlockNode.AsBlock()
		tryBlockStatements := tx.transformConstructorBodyWorker(nil, tryBlock.Statements.Nodes, 0, superPath, superPathDepth+1, initializerStatements)

		newTryBlock := tx.Factory().NewBlock(tx.Factory().NewNodeList(tryBlockStatements), true)
		// Use the original try block's range even though the statements may differ due to
		// injected initializer statements. This preserves source map fidelity for the enclosing
		// try statement.
		newTryBlock.Loc = tryBlockNode.Loc

		var catchClause *ast.Node
		if superStatement.AsTryStatement().CatchClause != nil {
			catchClause = tx.Visitor().VisitNode(superStatement.AsTryStatement().CatchClause)
		}
		var finallyBlock *ast.Node
		if superStatement.AsTryStatement().FinallyBlock != nil {
			finallyBlock = tx.Visitor().VisitNode(superStatement.AsTryStatement().FinallyBlock)
		}
		updated := tx.Factory().UpdateTryStatement(superStatement.AsTryStatement(), newTryBlock, catchClause, finallyBlock)
		statementsOut = append(statementsOut, updated)
	} else {
		statementsOut = append(statementsOut, tx.Visitor().VisitNode(superStatement))
		statementsOut = append(statementsOut, initializerStatements...)
	}

	// Visit statements after super
	if superStatementIndex+1 < len(statementsIn) {
		for _, s := range statementsIn[superStatementIndex+1:] {
			statementsOut = append(statementsOut, tx.Visitor().VisitNode(s))
		}
	}
	return statementsOut
}

func (tx *esDecoratorTransformer) visitConstructorDeclaration(node *ast.Node) *ast.Node {
	tx.enterClassElement(node)
	modifiers := tx.modifierVisitor.VisitModifiers(node.Modifiers())
	parameters := tx.Visitor().VisitNodes(node.ParameterList())

	var body *ast.Node
	ctor := node.AsConstructorDeclaration()
	if ctor.Body != nil && tx.classInfoStack != nil {
		// If there are instance extra initializers we need to add them to the body along with any
		// field initializers
		initializerStatements := tx.prepareConstructor(tx.classInfoStack)
		if len(initializerStatements) > 0 {
			stmts := []*ast.Statement{}
			prologue, rest := tx.Factory().SplitStandardPrologue(ctor.Body.AsBlock().Statements.Nodes)
			stmts = append(stmts, prologue...)

			superStatementIndices := transformers.FindSuperStatementIndexPath(rest, 0)
			if len(superStatementIndices) > 0 {
				stmts = tx.transformConstructorBodyWorker(stmts, rest, 0, superStatementIndices, 0, initializerStatements)
			} else {
				stmts = append(stmts, initializerStatements...)
				visited, _ := tx.Visitor().VisitSlice(rest)
				stmts = append(stmts, visited...)
			}

			body = tx.Factory().NewBlock(tx.Factory().NewNodeList(stmts), true)
			tx.EmitContext().SetOriginal(body, ctor.Body.AsNode())
			body.Loc = ctor.Body.Loc
		}
	}

	if body == nil {
		body = tx.Visitor().VisitNode(ctor.Body.AsNode())
	}
	tx.exitClassElement()
	return tx.Factory().UpdateConstructorDeclaration(ctor, modifiers, nil, parameters, nil, nil, body)
}

func (tx *esDecoratorTransformer) finishClassElement(updated *ast.Node, original *ast.Node) *ast.Node {
	if updated != original {
		// While we emit the source map for the node after skipping decorators and modifiers,
		// we need to emit the comments for the original range.
		tx.EmitContext().AssignCommentRange(updated, original)
		tx.EmitContext().SetSourceMapRange(updated, transformers.MoveRangePastDecorators(original))
	}
	return updated
}

type partialResult struct {
	modifiers             *ast.ModifierList
	referencedName        *ast.Expression
	name                  *ast.Node
	initializersName      *ast.IdentifierNode
	extraInitializersName *ast.IdentifierNode
	descriptorName        *ast.IdentifierNode
	thisArg               *ast.IdentifierNode
}

type createDescriptorFunc func(member *ast.Node, modifiers *ast.ModifierList) *ast.Expression

func (tx *esDecoratorTransformer) partialTransformClassElement(member *ast.Node, ci *classInfo, createDescriptor createDescriptorFunc) partialResult {
	f := tx.Factory()
	ec := tx.EmitContext()

	if ci == nil {
		modifiers := tx.modifierVisitor.VisitModifiers(member.Modifiers())
		tx.enterName()
		name := tx.visitPropertyName(member.Name())
		tx.exitName()
		return partialResult{modifiers: modifiers, name: name}
	}

	// Member decorators require privileged access to private names. However, computed property
	// evaluation occurs interspersed with decorator evaluation. This means that if we encounter
	// a computed property name we must inline decorator evaluation.

	// Collect decorators for this member. Decorator expressions evaluate outside the class body,
	// so `this` should NOT be replaced with `_classThis`.
	savedClassThis := tx.classThis
	tx.classThis = nil
	memberDecorators := tx.transformAllDecoratorsOfDeclaration(member.Decorators())
	tx.classThis = savedClassThis
	modifiers := tx.modifierVisitor.VisitModifiers(member.Modifiers())

	var result partialResult
	result.modifiers = modifiers

	if len(memberDecorators) > 0 {
		memberDecoratorsName := tx.createHelperVariable(member, "decorators")
		memberDecoratorsArray := f.NewArrayLiteralExpression(
			f.NewNodeList(memberDecorators),
			false,
		)
		memberDecoratorsAssignment := f.NewAssignmentExpression(memberDecoratorsName, memberDecoratorsArray)
		mi := &memberInfo{memberDecoratorsName: memberDecoratorsName}
		ci.memberInfos.Set(member, mi)
		tx.pendingExpressions = append(tx.pendingExpressions, memberDecoratorsAssignment)

		// 5. Static non-field (method/getter/setter/auto-accessor) element decorators are applied
		// 6. Non-static non-field (method/getter/setter/auto-accessor) element decorators are applied
		// 7. Static field (excl. auto-accessor) element decorators are applied
		// 8. Non-static field (excl. auto-accessor) element decorators are applied

		// Determine decorator kind
		var kind string
		switch {
		case ast.IsGetAccessorDeclaration(member):
			kind = "getter"
		case ast.IsSetAccessorDeclaration(member):
			kind = "setter"
		case ast.IsMethodDeclaration(member):
			kind = "method"
		case ast.IsAutoAccessorPropertyDeclaration(member):
			kind = "accessor"
		case ast.IsPropertyDeclaration(member):
			kind = "field"
		default:
			debug.Fail("Unexpected class element kind.")
		}

		// Determine the property name for the context
		var propertyNameComputed bool
		var propertyNameExpr *ast.Expression
		if member.Name() != nil && (ast.IsIdentifier(member.Name()) || ast.IsPrivateIdentifier(member.Name())) {
			propertyNameComputed = false
			propertyNameExpr = member.Name()
		} else if member.Name() != nil && ast.IsPropertyNameLiteral(member.Name()) {
			propertyNameComputed = true
			propertyNameExpr = f.NewStringLiteralFromNode(member.Name())
		} else if member.Name() != nil && ast.IsComputedPropertyName(member.Name()) {
			cpn := member.Name().AsComputedPropertyName()
			if ast.IsPropertyNameLiteral(cpn.Expression) && !ast.IsIdentifier(cpn.Expression) {
				propertyNameComputed = true
				propertyNameExpr = f.NewStringLiteralFromNode(cpn.Expression)
			} else {
				tx.enterName()
				result.referencedName, result.name = tx.visitReferencedPropertyName(member.Name())
				tx.exitName()
				propertyNameComputed = true
				propertyNameExpr = result.referencedName
			}
		}

		contextObj := f.NewESDecorateClassElementContextObject(
			kind,
			propertyNameComputed,
			propertyNameExpr,
			ast.IsStatic(member),
			member.Name() != nil && ast.IsPrivateIdentifier(member.Name()),
			// 15.7.3 CreateDecoratorAccessObject (kind, name)
			// 2. If _kind_ is ~field~, ~method~, ~accessor~, or ~getter~, then ...
			ast.IsPropertyDeclaration(member) || ast.IsGetAccessorDeclaration(member) || ast.IsMethodDeclaration(member),
			// 3. If _kind_ is ~field~, ~accessor~, or ~setter~, then ...
			ast.IsPropertyDeclaration(member) || ast.IsSetAccessorDeclaration(member),
			ci.metadataReference,
		)

		if ast.IsMethodOrAccessor(member) {
			// produces (public elements):
			//   __esDecorate(this, null, _static_member_decorators, { kind: "method", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, null, _member_decorators, { kind: "method", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);
			//   __esDecorate(this, null, _static_member_decorators, { kind: "getter", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, null, _member_decorators, { kind: "getter", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);
			//   __esDecorate(this, null, _static_member_decorators, { kind: "setter", name: "...", static: true, private: false, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, null, _member_decorators, { kind: "setter", name: "...", static: false, private: false, access: { ... } }, _instanceExtraInitializers);
			//
			// produces (private elements):
			//   __esDecorate(this, _static_member_descriptor = { value() { ... } }, _static_member_decorators, { kind: "method", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, _member_descriptor = { value() { ... } }, _member_decorators, { kind: "method", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);
			//   __esDecorate(this, _static_member_descriptor = { get() { ... } }, _static_member_decorators, { kind: "getter", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, _member_descriptor = { get() { ... } }, _member_decorators, { kind: "getter", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);
			//   __esDecorate(this, _static_member_descriptor = { set() { ... } }, _static_member_decorators, { kind: "setter", name: "...", static: true, private: true, access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(this, _member_descriptor = { set() { ... } }, _member_decorators, { kind: "setter", name: "...", static: false, private: true, access: { ... } }, _instanceExtraInitializers);
			methodExtraInitializersName := ci.instanceMethodExtraInitializersName
			if ast.IsStatic(member) {
				methodExtraInitializersName = ci.staticMethodExtraInitializersName
			}
			debug.Assert(methodExtraInitializersName != nil, "methodExtraInitializersName should be defined")

			var descriptorArg *ast.Expression
			if ast.IsPrivateIdentifierClassElementDeclaration(member) && createDescriptor != nil {
				// For private members, extract the method/accessor body into a descriptor object.
				// Filter modifiers to only keep async.
				asyncMods := tx.asyncOnlyModifierVisitor.VisitModifiers(modifiers)
				descriptor := createDescriptor(member, asyncMods)
				mi.memberDescriptorName = tx.createHelperVariable(member, "descriptor")
				result.descriptorName = mi.memberDescriptorName
				descriptorArg = f.NewAssignmentExpression(mi.memberDescriptorName, descriptor)
			} else {
				descriptorArg = f.NewToken(ast.KindNullKeyword)
			}

			esDecorateExpr := f.NewESDecorateHelper(
				f.NewThisExpression(),
				descriptorArg,
				memberDecoratorsName,
				contextObj,
				f.NewToken(ast.KindNullKeyword),
				methodExtraInitializersName,
			)
			esDecorateStatement := f.NewExpressionStatement(esDecorateExpr)
			ec.SetSourceMapRange(esDecorateStatement, transformers.MoveRangePastDecorators(member))
			tx.appendDecorationStatement(ci, member, esDecorateStatement)
		} else if ast.IsPropertyDeclaration(member) {
			mi.memberInitializersName = tx.createHelperVariable(member, "initializers")
			mi.memberExtraInitializersName = tx.createHelperVariable(member, "extraInitializers")
			result.initializersName = mi.memberInitializersName
			result.extraInitializersName = mi.memberExtraInitializersName
			if ast.IsStatic(member) {
				result.thisArg = ci.classThis
			}

			var ctorArg *ast.Node
			if ast.IsAutoAccessorPropertyDeclaration(member) {
				ctorArg = f.NewThisExpression()
			} else {
				ctorArg = f.NewToken(ast.KindNullKeyword)
			}

			var descriptorArg *ast.Expression
			if ast.IsPrivateIdentifierClassElementDeclaration(member) && ast.HasAccessorModifier(member) && createDescriptor != nil {
				descriptor := createDescriptor(member, nil)
				mi.memberDescriptorName = tx.createHelperVariable(member, "descriptor")
				result.descriptorName = mi.memberDescriptorName
				descriptorArg = f.NewAssignmentExpression(mi.memberDescriptorName, descriptor)
			} else {
				descriptorArg = f.NewToken(ast.KindNullKeyword)
			}

			// produces:
			//   __esDecorate(null, null, _static_member_decorators, { kind: "field", name: "...", static: true, private: ..., access: { ... } }, _staticExtraInitializers);
			//   __esDecorate(null, null, _member_decorators, { kind: "field", name: "...", static: false, private: ..., access: { ... } }, _instanceExtraInitializers);
			esDecorateExpr := f.NewESDecorateHelper(
				ctorArg,
				descriptorArg,
				memberDecoratorsName,
				contextObj,
				mi.memberInitializersName,
				mi.memberExtraInitializersName,
			)
			esDecorateStatement := f.NewExpressionStatement(esDecorateExpr)
			ec.SetSourceMapRange(esDecorateStatement, transformers.MoveRangePastDecorators(member))
			tx.appendDecorationStatement(ci, member, esDecorateStatement)
		}
	}

	if result.name == nil {
		tx.enterName()
		result.name = tx.visitPropertyName(member.Name())
		tx.exitName()
	}

	if (modifiers == nil || len(modifiers.Nodes) == 0) && (ast.IsMethodDeclaration(member) || ast.IsPropertyDeclaration(member)) {
		// Don't emit leading comments on the name for methods and properties without modifiers, otherwise we
		// will end up printing duplicate comments.
		ec.SetEmitFlags(result.name, printer.EFNoLeadingComments)
	}

	return result
}

// appendDecorationStatement appends an __esDecorate statement to the appropriate
// decoration statement list on classInfo based on the member's kind and static-ness.
func (tx *esDecoratorTransformer) appendDecorationStatement(ci *classInfo, member *ast.Node, stmt *ast.Statement) {
	if ast.IsMethodOrAccessor(member) || ast.IsAutoAccessorPropertyDeclaration(member) {
		if ast.IsStatic(member) {
			ci.staticNonFieldDecorationStatements = append(ci.staticNonFieldDecorationStatements, stmt)
		} else {
			ci.nonStaticNonFieldDecorationStatements = append(ci.nonStaticNonFieldDecorationStatements, stmt)
		}
	} else if ast.IsPropertyDeclaration(member) && !ast.IsAutoAccessorPropertyDeclaration(member) {
		if ast.IsStatic(member) {
			ci.staticFieldDecorationStatements = append(ci.staticFieldDecorationStatements, stmt)
		} else {
			ci.nonStaticFieldDecorationStatements = append(ci.nonStaticFieldDecorationStatements, stmt)
		}
	} else {
		debug.Fail("Unexpected class element kind.")
	}
}

func (tx *esDecoratorTransformer) visitMethodDeclaration(node *ast.Node) *ast.Node {
	tx.enterClassElement(node)
	result := tx.partialTransformClassElement(node, tx.classInfoStack, tx.createMethodDescriptorObject)
	if result.descriptorName != nil {
		tx.exitClassElement()
		return tx.finishClassElement(tx.createMethodDescriptorForwarder(result.modifiers, result.name, result.descriptorName), node)
	}
	parameters := tx.Visitor().VisitNodes(node.ParameterList())
	body := tx.Visitor().VisitNode(node.Body())
	tx.exitClassElement()
	method := node.AsMethodDeclaration()
	return tx.finishClassElement(
		tx.Factory().UpdateMethodDeclaration(method, result.modifiers, method.AsteriskToken, result.name, nil, nil, parameters, nil, nil, body),
		node,
	)
}

func (tx *esDecoratorTransformer) visitGetAccessorDeclaration(node *ast.Node) *ast.Node {
	tx.enterClassElement(node)
	result := tx.partialTransformClassElement(node, tx.classInfoStack, tx.createGetAccessorDescriptorObject)
	if result.descriptorName != nil {
		tx.exitClassElement()
		return tx.finishClassElement(tx.createGetAccessorDescriptorForwarder(result.modifiers, result.name, result.descriptorName), node)
	}
	parameters := tx.Visitor().VisitNodes(node.ParameterList())
	body := tx.Visitor().VisitNode(node.Body())
	tx.exitClassElement()
	accessor := node.AsGetAccessorDeclaration()
	return tx.finishClassElement(
		tx.Factory().UpdateGetAccessorDeclaration(accessor, result.modifiers, result.name, nil, parameters, nil, nil, body),
		node,
	)
}

func (tx *esDecoratorTransformer) visitSetAccessorDeclaration(node *ast.Node) *ast.Node {
	tx.enterClassElement(node)
	result := tx.partialTransformClassElement(node, tx.classInfoStack, tx.createSetAccessorDescriptorObject)
	if result.descriptorName != nil {
		tx.exitClassElement()
		return tx.finishClassElement(tx.createSetAccessorDescriptorForwarder(result.modifiers, result.name, result.descriptorName), node)
	}
	parameters := tx.Visitor().VisitNodes(node.ParameterList())
	body := tx.Visitor().VisitNode(node.Body())
	tx.exitClassElement()
	accessor := node.AsSetAccessorDeclaration()
	return tx.finishClassElement(
		tx.Factory().UpdateSetAccessorDeclaration(accessor, result.modifiers, result.name, nil, parameters, nil, nil, body),
		node,
	)
}

func (tx *esDecoratorTransformer) visitClassStaticBlockDeclaration(node *ast.Node) *ast.Node {
	tx.enterClassElement(node)
	f := tx.Factory()

	var result *ast.Node
	if isClassNamedEvaluationHelperBlock(tx.EmitContext(), node) {
		result = tx.Visitor().VisitEachChild(node)
		// Transfer AssignedName metadata to the new node so isClassNamedEvaluationHelperBlock
		// can still find it after visiting (visiting may create a new node when this->_classThis)
		if assignedName := tx.EmitContext().AssignedName(node); assignedName != nil && result != node {
			tx.EmitContext().SetAssignedName(result, assignedName)
		}
	} else if isClassThisAssignmentBlock(tx.EmitContext(), node) {
		savedClassThis := tx.classThis
		tx.classThis = nil
		result = tx.Visitor().VisitEachChild(node)
		tx.classThis = savedClassThis
	} else {
		// Use a nested variable environment so temp vars generated during static block
		// content transformation (e.g., super access temps) stay scoped to the static block.
		ec := tx.EmitContext()
		ec.StartVariableEnvironment()
		result = tx.Visitor().VisitEachChild(node)
		varStatements := ec.EndVariableEnvironment()
		if len(varStatements) > 0 {
			// Inject var declarations at the start of the static block's body
			blockBody := result.AsClassStaticBlockDeclaration().Body.AsBlock()
			newStmts := make([]*ast.Statement, 0, len(varStatements)+len(blockBody.Statements.Nodes))
			newStmts = append(newStmts, varStatements...)
			newStmts = append(newStmts, blockBody.Statements.Nodes...)
			result = f.NewClassStaticBlockDeclaration(nil, f.NewBlock(f.NewNodeList(newStmts), blockBody.Multiline))
		}
		if tx.classInfoStack != nil {
			tx.classInfoStack.hasStaticInitializers = true
			if len(tx.classInfoStack.pendingStaticInitializers) > 0 {
				// If we tried to inject the pending initializers into the current block, we might run into
				// variable name collisions due to sharing this blocks scope. To avoid this, we inject a new
				// static block that contains the pending initializers that precedes this block.
				stmts := []*ast.Node{}
				for _, init := range tx.classInfoStack.pendingStaticInitializers {
					initStmt := f.NewExpressionStatement(init)
					tx.EmitContext().SetSourceMapRange(initStmt, tx.EmitContext().SourceMapRange(init))
					stmts = append(stmts, initStmt)
				}
				body := f.NewBlock(f.NewNodeList(stmts), true)
				staticBlock := f.NewClassStaticBlockDeclaration(nil, body)
				tx.classInfoStack.pendingStaticInitializers = nil
				// Return both the new static block and the original
				tx.exitClassElement()
				return transformers.SingleOrMany([]*ast.Node{staticBlock, result}, tx.Factory())
			}
		}
	}

	tx.exitClassElement()
	return result
}

func (tx *esDecoratorTransformer) visitPropertyDeclaration(node *ast.Node) *ast.Node {
	if isNamedEvaluationAnd(tx.EmitContext(), node, isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node, canIgnoreEmptyStringLiteralInAssignedName(node.Initializer()), "")
	}

	tx.enterClassElement(node)

	// TODO(rbuckton): We support decorating `declare x` fields with legacyDecorators, but we currently don't
	//                 support them with esDecorators. We need to consider whether we will support them in the
	//                 future, and how. For now, these should be elided by the `ts` transform.
	debug.Assert(!ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient), "Not yet implemented.")

	// 10.2.1.3 RS: EvaluateBody
	//   Initializer : `=` AssignmentExpression
	//     ...
	//     3. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _functionObject_.[[ClassFieldInitializerName]].
	//     ...

	f := tx.Factory()
	ec := tx.EmitContext()

	var createDescriptor createDescriptorFunc
	if ast.HasAccessorModifier(node) {
		createDescriptor = tx.createAccessorPropertyDescriptorObject
	}
	result := tx.partialTransformClassElement(node, tx.classInfoStack, createDescriptor)

	ec.StartVariableEnvironment()

	initializer := tx.Visitor().VisitNode(node.Initializer())
	if result.initializersName != nil {
		var thisArg *ast.Node
		if result.thisArg != nil {
			thisArg = result.thisArg
		} else {
			thisArg = f.NewThisExpression()
		}
		if initializer == nil {
			initializer = f.NewVoidZeroExpression()
		}
		initializer = f.NewRunInitializersHelper(thisArg, result.initializersName, initializer)
	}

	if ast.IsStatic(node) && tx.classInfoStack != nil && initializer != nil {
		tx.classInfoStack.hasStaticInitializers = true
	}

	declarations := ec.EndVariableEnvironment()
	if len(declarations) > 0 {
		stmts := make([]*ast.Statement, len(declarations)+1)
		copy(stmts, declarations)
		stmts[len(declarations)] = f.NewReturnStatement(initializer)
		initializer = f.NewImmediatelyInvokedArrowFunction(stmts)
	}

	if tx.classInfoStack != nil {
		if ast.IsStatic(node) {
			initializer = tx.injectPendingInitializers(tx.classInfoStack, true, initializer)
			if result.extraInitializersName != nil {
				var thisArg *ast.Node
				if tx.classInfoStack.classThis != nil {
					thisArg = tx.classInfoStack.classThis
				} else {
					thisArg = f.NewThisExpression()
				}
				tx.classInfoStack.pendingStaticInitializers = append(tx.classInfoStack.pendingStaticInitializers,
					f.NewRunInitializersHelper(thisArg, result.extraInitializersName, nil),
				)
			}
		} else {
			initializer = tx.injectPendingInitializers(tx.classInfoStack, false, initializer)
			if result.extraInitializersName != nil {
				tx.classInfoStack.pendingInstanceInitializers = append(tx.classInfoStack.pendingInstanceInitializers,
					f.NewRunInitializersHelper(f.NewThisExpression(), result.extraInitializersName, nil),
				)
			}
		}
	}

	tx.exitClassElement()

	if ast.HasAccessorModifier(node) && result.descriptorName != nil {
		// given:
		//  accessor #x = 1;
		//
		// emits:
		//  static {
		//      _esDecorate(null, _private_x_descriptor = { get() { return this.#x_1; }, set(value) { this.#x_1 = value; } }, ...)
		//  }
		//  ...
		//  #x_1 = 1;
		//  get #x() { return _private_x_descriptor.get.call(this); }
		//  set #x(value) { _private_x_descriptor.set.call(this, value); }

		commentRange := ec.CommentRange(node)
		sourceMapRange := ec.SourceMapRange(node)

		// Since we're creating two declarations where there was previously one, cache
		// the expression for any computed property names.
		propName := node.Name()
		getterName := result.name
		setterName := result.name
		if ast.IsComputedPropertyName(propName) && !transformers.IsSimpleInlineableExpression(propName.Expression()) {
			cacheAssignment := findComputedPropertyNameCacheAssignment(ec, propName)
			if cacheAssignment != nil {
				getterName = f.UpdateComputedPropertyName(propName.AsComputedPropertyName(), tx.Visitor().VisitNode(propName.Expression()))
				setterName = f.UpdateComputedPropertyName(propName.AsComputedPropertyName(), cacheAssignment.Left)
			} else {
				temp := f.NewTempVariable()
				ec.SetSourceMapRange(temp, propName.Expression().Loc)
				ec.AddVariableDeclaration(temp)
				expression := tx.Visitor().VisitNode(propName.Expression())
				assignment := f.NewAssignmentExpression(temp, expression)
				ec.SetSourceMapRange(assignment, propName.Expression().Loc)
				getterName = f.UpdateComputedPropertyName(propName.AsComputedPropertyName(), assignment)
				setterName = f.UpdateComputedPropertyName(propName.AsComputedPropertyName(), temp)
			}
		}

		modifiersWithoutAccessor := tx.accessorStrippingModifierVisitor.VisitModifiers(result.modifiers)

		backingField := createAccessorPropertyBackingField(f, node.AsPropertyDeclaration(), modifiersWithoutAccessor, initializer)
		ec.SetOriginal(backingField, node)
		ec.SetEmitFlags(backingField, printer.EFNoComments)
		ec.SetSourceMapRange(backingField, sourceMapRange)
		ec.SetSourceMapRange(backingField.AsPropertyDeclaration().Name(), ec.SourceMapRange(node.Name()))

		getter := tx.createGetAccessorDescriptorForwarder(modifiersWithoutAccessor, getterName, result.descriptorName)
		ec.SetOriginal(getter, node)
		ec.SetCommentRange(getter, commentRange)
		ec.SetSourceMapRange(getter, sourceMapRange)

		setter := tx.createSetAccessorDescriptorForwarder(modifiersWithoutAccessor, setterName, result.descriptorName)
		ec.SetOriginal(setter, node)
		ec.SetEmitFlags(setter, printer.EFNoComments)
		ec.SetSourceMapRange(setter, sourceMapRange)

		return transformers.SingleOrMany([]*ast.Node{backingField, getter, setter}, f)
	}

	prop := node.AsPropertyDeclaration()
	return tx.finishClassElement(
		f.UpdatePropertyDeclaration(prop, result.modifiers, result.name, nil, nil, initializer),
		node,
	)
}

func (tx *esDecoratorTransformer) visitThisExpression(node *ast.Node) *ast.Node {
	if tx.classThis != nil {
		return tx.classThis
	}
	return node
}

func (tx *esDecoratorTransformer) visitCallExpression(node *ast.Node) *ast.Node {
	call := node.AsCallExpression()
	if ast.IsSuperProperty(call.Expression) && tx.classThis != nil {
		expression := tx.Visitor().VisitNode(call.Expression)
		argumentsList := tx.Visitor().VisitNodes(call.Arguments)
		invocation := tx.Factory().NewFunctionCallCall(expression, tx.classThis, argumentsList.Nodes)
		tx.EmitContext().SetOriginal(invocation, node)
		invocation.Loc = node.Loc
		return invocation
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitTaggedTemplateExpression(node *ast.Node) *ast.Node {
	tte := node.AsTaggedTemplateExpression()
	if ast.IsSuperProperty(tte.Tag) && tx.classThis != nil {
		tag := tx.Visitor().VisitNode(tte.Tag)
		boundTag := tx.Factory().NewFunctionBindCall(tag, tx.classThis, []*ast.Expression{})
		tx.EmitContext().SetOriginal(boundTag, node)
		boundTag.Loc = node.Loc
		template := tx.Visitor().VisitNode(tte.Template)
		return tx.Factory().UpdateTaggedTemplateExpression(tte, boundTag, nil, nil, template)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitPropertyAccessExpression(node *ast.Node) *ast.Node {
	pa := node.AsPropertyAccessExpression()
	if ast.IsSuperProperty(node) && ast.IsIdentifier(pa.Name()) && tx.classThis != nil && tx.classSuper != nil {
		propertyName := tx.Factory().NewStringLiteralFromNode(pa.Name())
		superProperty := tx.Factory().NewReflectGetCall(tx.classSuper, propertyName, tx.classThis)
		tx.EmitContext().SetOriginal(superProperty, pa.Expression)
		superProperty.Loc = pa.Expression.Loc
		return superProperty
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitElementAccessExpression(node *ast.Node) *ast.Node {
	ea := node.AsElementAccessExpression()
	if ast.IsSuperProperty(node) && tx.classThis != nil && tx.classSuper != nil {
		propertyName := tx.Visitor().VisitNode(ea.ArgumentExpression)
		superProperty := tx.Factory().NewReflectGetCall(tx.classSuper, propertyName, tx.classThis)
		tx.EmitContext().SetOriginal(superProperty, ea.Expression)
		superProperty.Loc = ea.Expression.Loc
		return superProperty
	}
	return tx.Visitor().VisitEachChild(node)
}

// 8.6.3 RS: IteratorBindingInitialization
//
//	SingleNameBinding : BindingIdentifier Initializer?
//	  ...
//	  5. If |Initializer| is present and _v_ is *undefined*, then
//	     a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	        i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
//
// 14.3.3.3 RS: KeyedBindingInitialization
//
//	SingleNameBinding : BindingIdentifier Initializer?
//	  ...
//	  4. If |Initializer| is present and _v_ is *undefined*, then
//	     a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	        i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
func (tx *esDecoratorTransformer) visitParameterDeclaration(node *ast.ParameterDeclaration) *ast.Node {
	paramNode := node.AsNode()
	if isNamedEvaluationAnd(tx.EmitContext(), paramNode, isAnonymousClassNeedingAssignedName) {
		paramNode = transformNamedEvaluation(tx.EmitContext(), paramNode, canIgnoreEmptyStringLiteralInAssignedName(paramNode.Initializer()), "")
		node = paramNode.AsParameterDeclaration()
	}

	updated := tx.Factory().UpdateParameterDeclaration(
		node,
		nil, // modifiers - strip all modifiers (including decorators)
		node.DotDotDotToken,
		tx.Visitor().VisitNode(node.Name()),
		nil, // questionToken
		nil, // type
		tx.Visitor().VisitNode(node.Initializer),
	)
	if updated != paramNode {
		// While we emit the source map for the node after skipping decorators and modifiers,
		// we need to emit the comments for the original range.
		tx.EmitContext().SetCommentRange(updated, paramNode.Loc)
		newLoc := transformers.MoveRangePastModifiers(paramNode)
		updated.Loc = newLoc
		tx.EmitContext().SetSourceMapRange(updated, newLoc)
		tx.EmitContext().SetEmitFlags(updated.Name(), printer.EFNoTrailingSourceMap)
	}
	return updated
}

// visitNamedEvaluationSite replaces Strada's visitPropertyAssignment, visitVariableDeclaration,
// and visitBindingElement, which all share the same logic.
//
// 13.2.5.5 RS: PropertyDefinitionEvaluation (PropertyAssignment)
//
//	PropertyAssignment : PropertyName `:` AssignmentExpression
//	  ...
//	  5. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true* and _isProtoSetter_ is *false*, then
//	     a. Let _popValue_ be ? NamedEvaluation of |AssignmentExpression| with argument _propKey_.
//	  ...
//
// 14.3.1.2 RS: Evaluation (VariableDeclaration)
//
//	LexicalBinding : BindingIdentifier Initializer
//	  ...
//	  3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	     a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
//
// 14.3.2.1 RS: Evaluation (VariableDeclaration)
//
//	VariableDeclaration : BindingIdentifier Initializer
//	  ...
//	  3. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	     a. Let _value_ be ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
//
// 8.6.3 RS: IteratorBindingInitialization (BindingElement)
//
//	SingleNameBinding : BindingIdentifier Initializer?
//	  ...
//	  5. If |Initializer| is present and _v_ is *undefined*, then
//	     a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	        i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
//
// 14.3.3.3 RS: KeyedBindingInitialization (BindingElement)
//
//	SingleNameBinding : BindingIdentifier Initializer?
//	  ...
//	  4. If |Initializer| is present and _v_ is *undefined*, then
//	     a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
//	        i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _bindingId_.
//	  ...
func (tx *esDecoratorTransformer) visitNamedEvaluationSite(node *ast.Node, classExpr *ast.Node) *ast.Node {
	if isNamedEvaluationAnd(tx.EmitContext(), node, isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node, canIgnoreEmptyStringLiteralInAssignedName(classExpr), "")
	}
	return tx.Visitor().VisitEachChild(node)
}

func isAnonymousClassNeedingAssignedName(node *ast.Node) bool {
	return ast.IsClassExpression(node) && node.Name() == nil && isDecoratedClassLike(node)
}

// The IIFE produced for `(@dec class {})` will result in an assigned name of the form
// `var class_1 = class { };`, and thus the empty string cannot be ignored. However, The IIFE
// produced for `(class { @dec x; })` will not result in an assigned name since it
// transforms to `return class { };`, and thus the empty string *can* be ignored.
func canIgnoreEmptyStringLiteralInAssignedName(node *ast.Node) bool {
	if node == nil {
		return false
	}
	innerExpression := ast.SkipOuterExpressions(node, ast.OEKAll)
	return ast.IsClassExpression(innerExpression) && innerExpression.Name() == nil && !ast.ClassOrConstructorParameterIsDecorated(false, innerExpression)
}

func (tx *esDecoratorTransformer) visitForStatement(node *ast.Node) *ast.Node {
	f := tx.Factory()
	forStmt := node.AsForStatement()
	return f.UpdateForStatement(
		forStmt,
		tx.discardedVisitor.VisitNode(forStmt.Initializer),
		tx.Visitor().VisitNode(forStmt.Condition),
		tx.discardedVisitor.VisitNode(forStmt.Incrementor),
		tx.EmitContext().VisitIterationBody(forStmt.Statement, tx.Visitor()),
	)
}

func (tx *esDecoratorTransformer) visitExpressionStatement(node *ast.Node) *ast.Node {
	return tx.discardedVisitor.VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitBinaryExpression(node *ast.Node, discarded bool) *ast.Node {
	f := tx.Factory()
	ec := tx.EmitContext()
	bin := node.AsBinaryExpression()

	if ast.IsDestructuringAssignment(node) {
		left := tx.visitAssignmentPattern(bin.Left)
		right := tx.Visitor().VisitNode(bin.Right)
		return f.UpdateBinaryExpression(bin, nil, left, nil, bin.OperatorToken, right)
	}

	if ast.IsAssignmentExpression(node, false) {
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

		if isNamedEvaluationAnd(ec, node, isAnonymousClassNeedingAssignedName) {
			node = transformNamedEvaluation(ec, node, canIgnoreEmptyStringLiteralInAssignedName(bin.Right), "")
			return tx.Visitor().VisitEachChild(node)
		}

		if ast.IsSuperProperty(bin.Left) && tx.classThis != nil && tx.classSuper != nil {
			var setterName *ast.Expression
			if ast.IsElementAccessExpression(bin.Left) {
				setterName = tx.Visitor().VisitNode(bin.Left.AsElementAccessExpression().ArgumentExpression)
			} else if ast.IsPropertyAccessExpression(bin.Left) && ast.IsIdentifier(bin.Left.AsPropertyAccessExpression().Name()) {
				setterName = f.NewStringLiteralFromNode(bin.Left.AsPropertyAccessExpression().Name())
			}
			if setterName != nil {
				// super.x = ...
				// super.x += ...
				// super[x] = ...
				// super[x] += ...
				expression := tx.Visitor().VisitNode(bin.Right)
				if ast.IsCompoundAssignment(bin.OperatorToken.Kind) {
					getterName := setterName
					if !transformers.IsSimpleInlineableExpression(setterName) {
						getterName = f.NewTempVariable()
						ec.AddVariableDeclaration(getterName)
						setterName = f.NewAssignmentExpression(getterName, setterName)
					}
					superPropertyGet := f.NewReflectGetCall(tx.classSuper, getterName, tx.classThis)
					ec.SetOriginal(superPropertyGet, bin.Left)
					superPropertyGet.Loc = bin.Left.Loc
					expression = f.AsNodeFactory().NewBinaryExpression(
						nil,
						superPropertyGet,
						nil,
						f.NewToken(transformers.GetNonAssignmentOperatorForCompoundAssignment(bin.OperatorToken.Kind)),
						expression,
					)
					expression.Loc = node.Loc
				}
				var temp *ast.Expression
				if !discarded {
					temp = f.NewTempVariable()
					ec.AddVariableDeclaration(temp)
				}
				if temp != nil {
					expression = f.NewAssignmentExpression(temp, expression)
					expression.Loc = node.Loc
				}
				expression = f.NewReflectSetCall(tx.classSuper, setterName, expression, tx.classThis)
				ec.SetOriginal(expression, node)
				expression.Loc = node.Loc
				if temp != nil {
					expression = f.NewCommaExpression(expression, temp)
					expression.Loc = node.Loc
				}
				return expression
			}
		}
	}

	if bin.OperatorToken.Kind == ast.KindCommaToken {
		left := tx.discardedVisitor.VisitNode(bin.Left)
		var right *ast.Node
		if discarded {
			right = tx.discardedVisitor.VisitNode(bin.Right)
		} else {
			right = tx.Visitor().VisitNode(bin.Right)
		}
		return f.UpdateBinaryExpression(bin, nil, left, nil, bin.OperatorToken, right)
	}

	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitPreOrPostfixUnaryExpression(node *ast.Node, discarded bool) *ast.Node {
	f := tx.Factory()
	ec := tx.EmitContext()

	var operator ast.Kind
	var operandNode *ast.Node
	if ast.IsPrefixUnaryExpression(node) {
		operator = node.AsPrefixUnaryExpression().Operator
		operandNode = node.AsPrefixUnaryExpression().Operand
	} else {
		operator = node.AsPostfixUnaryExpression().Operator
		operandNode = node.AsPostfixUnaryExpression().Operand
	}

	if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
		operand := ast.SkipParentheses(operandNode)
		if ast.IsSuperProperty(operand) && tx.classThis != nil && tx.classSuper != nil {
			var setterName *ast.Expression
			if ast.IsElementAccessExpression(operand) {
				setterName = tx.Visitor().VisitNode(operand.AsElementAccessExpression().ArgumentExpression)
			} else if ast.IsPropertyAccessExpression(operand) && ast.IsIdentifier(operand.AsPropertyAccessExpression().Name()) {
				setterName = f.NewStringLiteralFromNode(operand.AsPropertyAccessExpression().Name())
			}
			if setterName != nil {
				getterName := setterName
				if !transformers.IsSimpleInlineableExpression(setterName) {
					getterName = f.NewTempVariable()
					ec.AddVariableDeclaration(getterName)
					setterName = f.NewAssignmentExpression(getterName, setterName)
				}

				expression := f.NewReflectGetCall(tx.classSuper, getterName, tx.classThis)
				ec.SetOriginal(expression, node)
				expression.Loc = node.Loc

				// If the result of this expression is discarded (i.e., it's in a position where the result
				// will be otherwise unused, such as in an expression statement or the left side of a comma), we
				// don't need to create an extra temp variable to hold the result:
				//
				//  source (discarded):
				//    super.x++;
				//  generated:
				//    _a = Reflect.get(_super, "x"), _a++, Reflect.set(_super, "x", _a);
				//
				// Above, the temp variable `_a` is used to perform the correct coercion (i.e., number or
				// bigint). Since the result of the postfix unary is discarded, we don't need to capture the
				// result of the expression.
				//
				//  source (not discarded):
				//    y = super.x++;
				//  generated:
				//    y = (_a = Reflect.get(_super, "x"), _b = _a++, Reflect.set(_super, "x", _a), _b);
				//
				// When the result isn't discarded, we introduce a new temp variable (`_b`) to capture the
				// result of the operation so that we can provide it to `y` when the assignment is complete.
				var temp *ast.IdentifierNode
				if !discarded {
					temp = f.NewTempVariable()
					ec.AddVariableDeclaration(temp)
				}

				expression = expandPreOrPostfixIncrementOrDecrementExpression(f, ec, node, expression, temp)

				expression = f.NewReflectSetCall(tx.classSuper, setterName, expression, tx.classThis)
				ec.SetOriginal(expression, node)
				expression.Loc = node.Loc

				if temp != nil {
					expression = f.NewCommaExpression(expression, temp)
					expression.Loc = node.Loc
				}

				return expression
			}
		}
	}

	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitReferencedPropertyName(node *ast.Node) (*ast.Expression, *ast.Node) {
	if ast.IsPropertyNameLiteral(node) || ast.IsPrivateIdentifier(node) {
		return tx.Factory().NewStringLiteralFromNode(node), tx.Visitor().VisitNode(node)
	}

	cpn := node.AsComputedPropertyName()
	if ast.IsPropertyNameLiteral(cpn.Expression) && !ast.IsIdentifier(cpn.Expression) {
		return tx.Factory().NewStringLiteralFromNode(cpn.Expression), tx.Visitor().VisitNode(node)
	}

	referencedName := tx.Factory().NewGeneratedNameForNode(node)
	tx.EmitContext().AddVariableDeclaration(referencedName)

	key := tx.Factory().NewPropKeyHelper(tx.Visitor().VisitNode(cpn.Expression))
	assignment := tx.Factory().NewAssignmentExpression(referencedName, key)
	updatedName := tx.Factory().UpdateComputedPropertyName(cpn, tx.injectPendingExpressions(assignment))
	return referencedName, updatedName
}

func (tx *esDecoratorTransformer) visitPropertyName(node *ast.Node) *ast.Node {
	if ast.IsComputedPropertyName(node) {
		return tx.visitComputedPropertyName(node)
	}
	return tx.Visitor().VisitNode(node)
}

func (tx *esDecoratorTransformer) visitComputedPropertyName(node *ast.Node) *ast.Node {
	cpn := node.AsComputedPropertyName()
	expression := tx.Visitor().VisitNode(cpn.Expression)
	if !transformers.IsSimpleInlineableExpression(expression) {
		expression = tx.injectPendingExpressions(expression)
	}
	return tx.Factory().UpdateComputedPropertyName(cpn, expression)
}

func (tx *esDecoratorTransformer) visitDestructuringAssignmentTarget(node *ast.Node) *ast.Node {
	if ast.IsObjectLiteralExpression(node) || ast.IsArrayLiteralExpression(node) {
		return tx.visitAssignmentPattern(node)
	}

	if ast.IsSuperProperty(node) && tx.classThis != nil && tx.classSuper != nil {
		f := tx.Factory()
		ec := tx.EmitContext()
		var propertyName *ast.Expression
		if ast.IsElementAccessExpression(node) {
			propertyName = tx.Visitor().VisitNode(node.AsElementAccessExpression().ArgumentExpression)
		} else if ast.IsPropertyAccessExpression(node) && ast.IsIdentifier(node.AsPropertyAccessExpression().Name()) {
			propertyName = f.NewStringLiteralFromNode(node.AsPropertyAccessExpression().Name())
		}
		if propertyName != nil {
			paramName := f.NewTempVariable()
			expression := f.NewAssignmentTargetWrapper(
				paramName,
				f.NewReflectSetCall(
					tx.classSuper,
					propertyName,
					paramName,
					tx.classThis,
				),
			)
			ec.SetOriginal(expression, node)
			expression.Loc = node.Loc
			return expression
		}
	}

	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitAssignmentElement(node *ast.Node) *ast.Node {
	// 13.15.5.5 RS: IteratorDestructuringAssignmentEvaluation
	//   AssignmentElement : DestructuringAssignmentTarget Initializer?
	//     ...
	//     4. If |Initializer| is present and _value_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
	//           i. Let _v_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
	//     ...
	if ast.IsAssignmentExpression(node, true /*excludeCompoundAssignment*/) {
		f := tx.Factory()
		bin := node.AsBinaryExpression()
		if isNamedEvaluationAnd(tx.EmitContext(), node, isAnonymousClassNeedingAssignedName) {
			node = transformNamedEvaluation(tx.EmitContext(), node, canIgnoreEmptyStringLiteralInAssignedName(bin.Right), "")
			bin = node.AsBinaryExpression()
		}
		assignmentTarget := tx.visitDestructuringAssignmentTarget(bin.Left)
		initializer := tx.Visitor().VisitNode(bin.Right)
		return f.UpdateBinaryExpression(bin, nil, assignmentTarget, nil, bin.OperatorToken, initializer)
	}
	return tx.visitDestructuringAssignmentTarget(node)
}

func (tx *esDecoratorTransformer) visitAssignmentRestElement(node *ast.Node) *ast.Node {
	se := node.AsSpreadElement()
	if ast.IsLeftHandSideExpression(se.Expression) {
		f := tx.Factory()
		expression := tx.visitDestructuringAssignmentTarget(se.Expression)
		return f.UpdateSpreadElement(se, expression)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitArrayAssignmentElement(node *ast.Node) *ast.Node {
	debug.AssertNode(node, ast.IsArrayBindingOrAssignmentElement)
	if ast.IsSpreadElement(node) {
		return tx.visitAssignmentRestElement(node)
	}
	if !ast.IsOmittedExpression(node) {
		return tx.visitAssignmentElement(node)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitAssignmentPropertyNode(node *ast.Node) *ast.Node {
	// AssignmentProperty : PropertyName `:` AssignmentElement
	// AssignmentElement : DestructuringAssignmentTarget Initializer?

	// 13.15.5.6 RS: KeyedDestructuringAssignmentEvaluation
	//   AssignmentElement : DestructuringAssignmentTarget Initializer?
	//     ...
	//     3. If |Initializer| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousfunctionDefinition(|Initializer|) and IsIdentifierRef of |DestructuringAssignmentTarget| are both *true*, then
	//           i. Let _rhsValue_ be ? NamedEvaluation of |Initializer| with argument _lref_.[[ReferencedName]].
	//     ...

	f := tx.Factory()
	pa := node.AsPropertyAssignment()
	name := tx.Visitor().VisitNode(pa.Name())
	if ast.IsAssignmentExpression(pa.Initializer, true /*excludeCompoundAssignment*/) {
		assignmentElement := tx.visitAssignmentElement(pa.Initializer)
		return f.UpdatePropertyAssignment(pa, nil, name, nil, nil, assignmentElement)
	}
	if ast.IsLeftHandSideExpression(pa.Initializer) {
		assignmentElement := tx.visitDestructuringAssignmentTarget(pa.Initializer)
		return f.UpdatePropertyAssignment(pa, nil, name, nil, nil, assignmentElement)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitShorthandAssignmentProperty(node *ast.Node) *ast.Node {
	// AssignmentProperty : IdentifierReference Initializer?

	// 13.15.5.3 RS: PropertyDestructuringAssignmentEvaluation
	//   AssignmentProperty : IdentifierReference Initializer?
	//     ...
	//     4. If |Initializer?| is present and _v_ is *undefined*, then
	//        a. If IsAnonymousFunctionDefinition(|Initializer|) is *true*, then
	//           i. Set _v_ to ? NamedEvaluation of |Initializer| with argument _P_.
	//     ...
	if isNamedEvaluationAnd(tx.EmitContext(), node, isAnonymousClassNeedingAssignedName) {
		node = transformNamedEvaluation(tx.EmitContext(), node, canIgnoreEmptyStringLiteralInAssignedName(node.AsShorthandPropertyAssignment().ObjectAssignmentInitializer), "")
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitAssignmentRestProperty(node *ast.Node) *ast.Node {
	sa := node.AsSpreadAssignment()
	if ast.IsLeftHandSideExpression(sa.Expression) {
		f := tx.Factory()
		expression := tx.visitDestructuringAssignmentTarget(sa.Expression)
		return f.UpdateSpreadAssignment(sa, expression)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitObjectAssignmentElement(node *ast.Node) *ast.Node {
	debug.AssertNode(node, ast.IsObjectBindingOrAssignmentElement)
	if ast.IsSpreadAssignment(node) {
		return tx.visitAssignmentRestProperty(node)
	}
	if ast.IsShorthandPropertyAssignment(node) {
		return tx.visitShorthandAssignmentProperty(node)
	}
	if ast.IsPropertyAssignment(node) {
		return tx.visitAssignmentPropertyNode(node)
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *esDecoratorTransformer) visitAssignmentPattern(node *ast.Node) *ast.Node {
	f := tx.Factory()
	if ast.IsArrayLiteralExpression(node) {
		ale := node.AsArrayLiteralExpression()
		elements := tx.arrayAssignmentVisitor.VisitNodes(ale.Elements)
		return f.UpdateArrayLiteralExpression(ale, elements)
	}
	ole := node.AsObjectLiteralExpression()
	properties := tx.objectAssignmentVisitor.VisitNodes(ole.Properties)
	return f.UpdateObjectLiteralExpression(ole, properties)
}

func (tx *esDecoratorTransformer) visitExportAssignment(node *ast.Node) *ast.Node {
	// 16.2.3.7 RS: Evaluation
	//   ExportDeclaration : `export` `default` AssignmentExpression `;`
	//     1. If IsAnonymousFunctionDefinition(|AssignmentExpression|) is *true*, then
	//        a. Let _value_ be ? NamedEvaluation of |AssignmentExpression| with argument `"default"`.
	//     ...
	return tx.visitNamedEvaluationSite(node, node.Expression())
}

func (tx *esDecoratorTransformer) visitParenthesizedExpression(node *ast.Node, discarded bool) *ast.Node {
	// 8.4.5 RS: NamedEvaluation
	//   ParenthesizedExpression : `(` Expression `)`
	//     ...
	//     2. Return ? NamedEvaluation of |Expression| with argument _name_.

	f := tx.Factory()
	pe := node.AsParenthesizedExpression()
	var expression *ast.Node
	if discarded {
		expression = tx.discardedVisitor.VisitNode(pe.Expression)
	} else {
		expression = tx.Visitor().VisitNode(pe.Expression)
	}
	return f.UpdateParenthesizedExpression(pe, expression)
}

func (tx *esDecoratorTransformer) visitPartiallyEmittedExpression(node *ast.Node, discarded bool) *ast.Node {
	// Emulates 8.4.5 RS: NamedEvaluation
	pe := node.AsPartiallyEmittedExpression()
	var expression *ast.Node
	if discarded {
		expression = tx.discardedVisitor.VisitNode(pe.Expression)
	} else {
		expression = tx.Visitor().VisitNode(pe.Expression)
	}
	return tx.Factory().UpdatePartiallyEmittedExpression(pe, expression)
}

// prependExpressions prepends a list of expressions before a target expression, preserving
// parenthesization. If expression is nil, the pending expressions are inlined alone.
func (tx *esDecoratorTransformer) prependExpressions(pending []*ast.Expression, expression *ast.Expression) *ast.Expression {
	f := tx.Factory()
	if len(pending) == 0 {
		return expression
	}
	if expression == nil {
		return f.InlineExpressions(pending)
	}
	if ast.IsParenthesizedExpression(expression) {
		pe := expression.AsParenthesizedExpression()
		exprs := make([]*ast.Expression, len(pending)+1)
		copy(exprs, pending)
		exprs[len(pending)] = pe.Expression
		return f.UpdateParenthesizedExpression(pe, f.InlineExpressions(exprs))
	}
	exprs := make([]*ast.Expression, len(pending)+1)
	copy(exprs, pending)
	exprs[len(pending)] = expression
	return f.InlineExpressions(exprs)
}

func (tx *esDecoratorTransformer) injectPendingExpressions(expression *ast.Expression) *ast.Expression {
	result := tx.prependExpressions(tx.pendingExpressions, expression)
	debug.Assert(result != nil)
	if result != expression {
		tx.pendingExpressions = nil
	}
	return result
}

func (tx *esDecoratorTransformer) injectPendingInitializers(ci *classInfo, isStatic bool, expression *ast.Expression) *ast.Expression {
	var pending *[]*ast.Expression
	if isStatic {
		pending = &ci.pendingStaticInitializers
	} else {
		pending = &ci.pendingInstanceInitializers
	}
	result := tx.prependExpressions(*pending, expression)
	if result != expression {
		*pending = nil
	}
	return result
}

// Transforms all of the decorators for a declaration into an array of expressions.
func (tx *esDecoratorTransformer) transformAllDecoratorsOfDeclaration(decorators []*ast.Node) []*ast.Expression {
	if len(decorators) == 0 {
		return nil
	}
	result := make([]*ast.Expression, 0, len(decorators))
	for _, d := range decorators {
		result = append(result, tx.transformDecorator(d))
	}
	return result
}

// Transforms a decorator into an expression.
func (tx *esDecoratorTransformer) transformDecorator(decorator *ast.Node) *ast.Expression {
	expression := tx.Visitor().VisitNode(decorator.AsDecorator().Expression)
	tx.EmitContext().SetEmitFlags(expression, printer.EFNoComments)

	// preserve the 'this' binding for an access expression
	innerExpression := ast.SkipOuterExpressions(expression, ast.OEKAll)
	if ast.IsAccessExpression(innerExpression) {
		target, thisArg := tx.createCallBinding(expression)
		bindCall := tx.Factory().NewFunctionBindCall(target, thisArg, nil)
		return tx.Factory().RestoreOuterExpressions(expression, bindCall, ast.OEKAll)
	}
	return expression
}

func (tx *esDecoratorTransformer) createCallBinding(expression *ast.Expression) (*ast.Expression, *ast.Expression) {
	f := tx.Factory()
	callee := ast.SkipOuterExpressions(expression, ast.OEKAll)
	if ast.IsSuperProperty(callee) {
		return callee, f.NewThisExpression()
	}
	if callee.Kind == ast.KindSuperKeyword {
		return callee, f.NewThisExpression()
	}
	if tx.EmitContext().EmitFlags(callee)&printer.EFHelperName != 0 {
		return callee, f.NewVoidZeroExpression()
	}
	if ast.IsPropertyAccessExpression(callee) {
		pa := callee.AsPropertyAccessExpression()
		if tx.shouldBeCapturedInTempVariable(pa.Expression) {
			thisArg := f.NewTempVariable()
			tx.EmitContext().AddVariableDeclaration(thisArg)
			assign := f.NewAssignmentExpression(thisArg, pa.Expression)
			assign.Loc = pa.Expression.Loc
			target := f.NewPropertyAccessExpression(assign, nil, pa.Name(), ast.NodeFlagsNone)
			target.Loc = callee.Loc
			return target, thisArg
		}
		return callee, pa.Expression
	}
	if ast.IsElementAccessExpression(callee) {
		ea := callee.AsElementAccessExpression()
		if tx.shouldBeCapturedInTempVariable(ea.Expression) {
			thisArg := f.NewTempVariable()
			tx.EmitContext().AddVariableDeclaration(thisArg)
			assign := f.NewAssignmentExpression(thisArg, ea.Expression)
			assign.Loc = ea.Expression.Loc
			target := f.NewElementAccessExpression(assign, nil, ea.ArgumentExpression, ast.NodeFlagsNone)
			target.Loc = callee.Loc
			return target, thisArg
		}
		return callee, ea.Expression
	}
	return expression, f.NewVoidZeroExpression()
}

func (tx *esDecoratorTransformer) shouldBeCapturedInTempVariable(node *ast.Expression) bool {
	// This is a simplified version of the general shouldBeCapturedInTempVariable from
	// nodeFactory with cacheIdentifiers=true, since createCallBinding in this transform
	// always caches identifiers.
	target := ast.SkipParentheses(node)
	switch target.Kind {
	case ast.KindIdentifier:
		// cacheIdentifiers is always true for this transform's createCallBinding
		return true
	case ast.KindThisKeyword,
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindStringLiteral:
		return false
	default:
		return true
	}
}

// Creates a "value", "get", or "set" method for a pseudo-PropertyDescriptor object created for
// a private element.
func (tx *esDecoratorTransformer) createDescriptorMethod(
	original *ast.Node,
	name *ast.Node, // PrivateIdentifier
	modifiers *ast.ModifierList,
	asteriskToken *ast.TokenNode,
	kind string,
	parameters *ast.NodeList,
	body *ast.Node,
) *ast.Node {
	f := tx.Factory()
	ec := tx.EmitContext()

	if body == nil {
		body = f.NewBlock(f.NewNodeList([]*ast.Node{}), false)
	}

	funcExpr := f.NewFunctionExpression(
		modifiers,
		asteriskToken,
		nil, // name
		nil, // typeParameters
		parameters,
		nil, // type
		nil, // fullSignature
		body,
	)
	ec.SetOriginal(funcExpr, original)
	ec.SetSourceMapRange(funcExpr, transformers.MoveRangePastDecorators(original))
	ec.SetEmitFlags(funcExpr, printer.EFNoComments)

	var prefix string
	if kind == "get" || kind == "set" {
		prefix = kind
	}
	functionName := f.NewStringLiteralFromNode(name)
	namedFunction := f.NewSetFunctionNameHelper(funcExpr, functionName, prefix)

	method := f.NewPropertyAssignment(nil, f.NewIdentifier(kind), nil, nil, namedFunction)
	ec.SetOriginal(method, original)
	ec.SetSourceMapRange(method, transformers.MoveRangePastDecorators(original))
	ec.SetEmitFlags(method, printer.EFNoComments)
	return method
}

// Creates a pseudo-PropertyDescriptor object used when decorating a private MethodDeclaration.
func (tx *esDecoratorTransformer) createMethodDescriptorObject(member *ast.Node, modifiers *ast.ModifierList) *ast.Expression {
	f := tx.Factory()
	parameters := tx.Visitor().VisitNodes(member.ParameterList())
	body := tx.Visitor().VisitNode(member.Body())
	method := member.AsMethodDeclaration()
	return f.NewObjectLiteralExpression(
		f.NewNodeList([]*ast.Node{
			tx.createDescriptorMethod(member, member.Name(), modifiers, method.AsteriskToken, "value", parameters, body),
		}),
		false,
	)
}

// Creates a pseudo-PropertyDescriptor object used when decorating a private GetAccessorDeclaration.
func (tx *esDecoratorTransformer) createGetAccessorDescriptorObject(member *ast.Node, modifiers *ast.ModifierList) *ast.Expression {
	f := tx.Factory()
	body := tx.Visitor().VisitNode(member.Body())
	return f.NewObjectLiteralExpression(
		f.NewNodeList([]*ast.Node{
			tx.createDescriptorMethod(member, member.Name(), modifiers, nil, "get", f.NewNodeList([]*ast.Node{}), body),
		}),
		false,
	)
}

// Creates a pseudo-PropertyDescriptor object used when decorating a private SetAccessorDeclaration.
func (tx *esDecoratorTransformer) createSetAccessorDescriptorObject(member *ast.Node, modifiers *ast.ModifierList) *ast.Expression {
	f := tx.Factory()
	parameters := tx.Visitor().VisitNodes(member.ParameterList())
	body := tx.Visitor().VisitNode(member.Body())
	return f.NewObjectLiteralExpression(
		f.NewNodeList([]*ast.Node{
			tx.createDescriptorMethod(member, member.Name(), modifiers, nil, "set", parameters, body),
		}),
		false,
	)
}

// Creates a pseudo-PropertyDescriptor object used when decorating a private auto-accessor PropertyDeclaration.
// The descriptor contains get/set methods that access the generated backing field.
func (tx *esDecoratorTransformer) createAccessorPropertyDescriptorObject(member *ast.Node, _ *ast.ModifierList) *ast.Expression {
	//  {
	//      get() { return this.${privateName}; },
	//      set(value) { this.${privateName} = value; },
	//  }
	f := tx.Factory()
	backingFieldName := f.NewGeneratedPrivateNameForNodeEx(member.Name(), printer.AutoGenerateOptions{Suffix: "_accessor_storage"})
	return f.NewObjectLiteralExpression(
		f.NewNodeList([]*ast.Node{
			tx.createDescriptorMethod(
				member, member.Name(), nil, nil, "get",
				f.NewNodeList([]*ast.Node{}),
				f.NewBlock(f.NewNodeList([]*ast.Node{
					f.NewReturnStatement(
						f.NewPropertyAccessExpression(f.NewThisExpression(), nil, backingFieldName, ast.NodeFlagsNone),
					),
				}), false),
			),
			tx.createDescriptorMethod(
				member, member.Name(), nil, nil, "set",
				f.NewNodeList([]*ast.Node{
					f.NewParameterDeclaration(nil, nil, f.NewIdentifier("value"), nil, nil, nil),
				}),
				f.NewBlock(f.NewNodeList([]*ast.Node{
					f.NewExpressionStatement(
						f.NewAssignmentExpression(
							f.NewPropertyAccessExpression(f.NewThisExpression(), nil, backingFieldName, ast.NodeFlagsNone),
							f.NewIdentifier("value"),
						),
					),
				}), false),
			),
		}),
		false,
	)
}

// Creates a MethodDeclaration that forwards its invocation to a PropertyDescriptor object.
func (tx *esDecoratorTransformer) createMethodDescriptorForwarder(modifiers *ast.ModifierList, name *ast.Node, descriptorName *ast.IdentifierNode) *ast.Node {
	f := tx.Factory()
	staticOnly := tx.staticOnlyModifierVisitor.VisitModifiers(modifiers)
	return f.NewGetAccessorDeclaration(
		staticOnly,
		name,
		nil, // typeParameters
		f.NewNodeList([]*ast.Node{}),
		nil, // type
		nil, // fullSignature
		f.NewBlock(f.NewNodeList([]*ast.Node{
			f.NewReturnStatement(
				f.NewPropertyAccessExpression(descriptorName, nil, f.NewIdentifier("value"), ast.NodeFlagsNone),
			),
		}), false),
	)
}

// Creates a GetAccessorDeclaration that forwards its invocation to a PropertyDescriptor object.
func (tx *esDecoratorTransformer) createGetAccessorDescriptorForwarder(modifiers *ast.ModifierList, name *ast.Node, descriptorName *ast.IdentifierNode) *ast.Node {
	f := tx.Factory()
	staticOnly := tx.staticOnlyModifierVisitor.VisitModifiers(modifiers)
	return f.NewGetAccessorDeclaration(
		staticOnly,
		name,
		nil, // typeParameters
		f.NewNodeList([]*ast.Node{}),
		nil, // type
		nil, // fullSignature
		f.NewBlock(f.NewNodeList([]*ast.Node{
			f.NewReturnStatement(
				f.NewFunctionCallCall(
					f.NewPropertyAccessExpression(descriptorName, nil, f.NewIdentifier("get"), ast.NodeFlagsNone),
					f.NewThisExpression(),
					nil,
				),
			),
		}), false),
	)
}

// Creates a SetAccessorDeclaration that forwards its invocation to a PropertyDescriptor object.
func (tx *esDecoratorTransformer) createSetAccessorDescriptorForwarder(modifiers *ast.ModifierList, name *ast.Node, descriptorName *ast.IdentifierNode) *ast.Node {
	f := tx.Factory()
	staticOnly := tx.staticOnlyModifierVisitor.VisitModifiers(modifiers)
	return f.NewSetAccessorDeclaration(
		staticOnly,
		name,
		nil, // typeParameters
		f.NewNodeList([]*ast.Node{
			f.NewParameterDeclaration(nil, nil, f.NewIdentifier("value"), nil, nil, nil),
		}),
		nil, // type
		nil, // fullSignature
		f.NewBlock(f.NewNodeList([]*ast.Node{
			f.NewReturnStatement(
				f.NewFunctionCallCall(
					f.NewPropertyAccessExpression(descriptorName, nil, f.NewIdentifier("set"), ast.NodeFlagsNone),
					f.NewThisExpression(),
					[]*ast.Node{f.NewIdentifier("value")},
				),
			),
		}), false),
	)
}

func (tx *esDecoratorTransformer) createMetadata(name *ast.IdentifierNode, classSuper *ast.IdentifierNode) *ast.Statement {
	f := tx.Factory()

	var superMetadata *ast.Expression
	if classSuper != nil {
		superMetadata = tx.createSymbolMetadataReference(classSuper)
	} else {
		superMetadata = f.NewToken(ast.KindNullKeyword)
	}

	objectCreate := f.NewCallExpression(
		f.NewPropertyAccessExpression(f.NewIdentifier("Object"), nil, f.NewIdentifier("create"), ast.NodeFlagsNone),
		nil, nil,
		f.NewNodeList([]*ast.Expression{superMetadata}),
		ast.NodeFlagsNone,
	)

	symbolCheck := f.NewLogicalANDExpression(
		f.NewTypeCheck(f.NewIdentifier("Symbol"), "function"),
		f.NewPropertyAccessExpression(f.NewIdentifier("Symbol"), nil, f.NewIdentifier("metadata"), ast.NodeFlagsNone),
	)

	conditional := f.NewConditionalExpression(
		symbolCheck,
		f.NewToken(ast.KindQuestionToken),
		objectCreate,
		f.NewToken(ast.KindColonToken),
		f.NewVoidZeroExpression(),
	)

	varDecl := f.NewVariableDeclaration(name, nil, nil, conditional)
	varDeclList := f.NewVariableDeclarationList(ast.NodeFlagsConst, f.NewNodeList([]*ast.Node{varDecl}))
	return f.NewVariableStatement(nil, varDeclList)
}

func (tx *esDecoratorTransformer) createSymbolMetadata(target *ast.Expression, value *ast.IdentifierNode) *ast.Statement {
	f := tx.Factory()

	// Object.defineProperty(target, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value })
	symbolMetadata := f.NewPropertyAccessExpression(f.NewIdentifier("Symbol"), nil, f.NewIdentifier("metadata"), ast.NodeFlagsNone)

	descriptorProps := []*ast.Node{
		f.NewPropertyAssignment(nil, f.NewIdentifier("enumerable"), nil, nil, f.NewTrueExpression()),
		f.NewPropertyAssignment(nil, f.NewIdentifier("configurable"), nil, nil, f.NewTrueExpression()),
		f.NewPropertyAssignment(nil, f.NewIdentifier("writable"), nil, nil, f.NewTrueExpression()),
		f.NewPropertyAssignment(nil, f.NewIdentifier("value"), nil, nil, value),
	}
	descriptor := f.NewObjectLiteralExpression(f.NewNodeList(descriptorProps), false)

	defineProperty := f.NewCallExpression(
		f.NewPropertyAccessExpression(f.NewIdentifier("Object"), nil, f.NewIdentifier("defineProperty"), ast.NodeFlagsNone),
		nil, nil,
		f.NewNodeList([]*ast.Expression{target, symbolMetadata, descriptor}),
		ast.NodeFlagsNone,
	)

	ifStatement := f.NewIfStatement(value, f.NewExpressionStatement(defineProperty), nil)
	tx.EmitContext().SetEmitFlags(ifStatement, printer.EFSingleLine)
	return ifStatement
}

func (tx *esDecoratorTransformer) createSymbolMetadataReference(classSuper *ast.IdentifierNode) *ast.Expression {
	f := tx.Factory()
	symbolMetadata := f.NewPropertyAccessExpression(f.NewIdentifier("Symbol"), nil, f.NewIdentifier("metadata"), ast.NodeFlagsNone)
	elementAccess := f.NewElementAccessExpression(classSuper, nil, symbolMetadata, ast.NodeFlagsNone)
	return f.NewBinaryExpression(nil, elementAccess, nil, f.NewToken(ast.KindQuestionQuestionToken), f.NewToken(ast.KindNullKeyword))
}

func injectClassThisAssignmentIfMissing(ec *printer.EmitContext, f *printer.NodeFactory, node *ast.Node, classThis *ast.IdentifierNode) *ast.Node {
	if classHasClassThisAssignment(ec, node) {
		return node
	}

	// Create: static { _classThis = this; }
	expression := f.NewAssignmentExpression(classThis, f.NewThisExpression())
	statement := f.NewExpressionStatement(expression)
	body := f.NewBlock(f.NewNodeList([]*ast.Node{statement}), false)
	staticBlock := f.NewClassStaticBlockDeclaration(nil, body)
	ec.SetClassThis(staticBlock, classThis)

	if node.Name() != nil {
		ec.SetSourceMapRange(statement, node.Name().Loc)
	}

	newMembers := make([]*ast.Node, 0, 1+len(node.Members()))
	newMembers = append(newMembers, staticBlock)
	newMembers = append(newMembers, node.Members()...)
	membersList := f.NewNodeList(newMembers)
	membersList.Loc = node.MemberList().Loc

	var updatedNode *ast.Node
	if ast.IsClassDeclaration(node) {
		cd := node.AsClassDeclaration()
		updatedNode = f.UpdateClassDeclaration(cd, cd.Modifiers(), cd.Name(), nil, cd.HeritageClauses, membersList)
	} else {
		ce := node.AsClassExpression()
		updatedNode = f.UpdateClassExpression(ce, ce.Modifiers(), ce.Name(), nil, ce.HeritageClauses, membersList)
	}
	ec.SetClassThis(updatedNode, classThis)
	return updatedNode
}

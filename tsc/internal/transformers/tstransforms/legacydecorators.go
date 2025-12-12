package tstransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type LegacyDecoratorsTransformer struct {
	transformers.Transformer
	languageVersion   core.ScriptTarget
	referenceResolver binder.ReferenceResolver

	/**
	 * A map that keeps track of aliases created for classes with decorators to avoid issues
	 * with the double-binding behavior of classes.
	 */
	classAliases     map[*ast.Node]*ast.Node
	enclosingClasses []*ast.ClassDeclaration
}

func NewLegacyDecoratorsTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	tx := &LegacyDecoratorsTransformer{languageVersion: opt.CompilerOptions.GetEmitScriptTarget(), referenceResolver: opt.Resolver}
	return tx.NewTransformer(tx.visit, opt.Context)
}

func (tx *LegacyDecoratorsTransformer) visit(node *ast.Node) *ast.Node {
	// we have to visit all identifiers in classes, just in case they require substitution
	if (node.SubtreeFacts()&ast.SubtreeContainsDecorators) == 0 && len(tx.enclosingClasses) == 0 {
		return node
	}

	switch node.Kind {
	case ast.KindIdentifier:
		return tx.visitIdentifier(node.AsIdentifier())
	case ast.KindDecorator:
		// Decorators are elided. They will be emitted as part of `visitClassDeclaration`.
		return nil
	case ast.KindClassDeclaration:
		return tx.visitClassDeclaration(node.AsClassDeclaration())
	case ast.KindClassExpression:
		return tx.visitClassExpression(node.AsClassExpression())
	case ast.KindConstructor:
		return tx.visitConstructorDeclaration(node.AsConstructorDeclaration())
	case ast.KindMethodDeclaration:
		return tx.visitMethodDeclaration(node.AsMethodDeclaration())
	case ast.KindSetAccessor:
		return tx.visitSetAccessorDeclaration(node.AsSetAccessorDeclaration())
	case ast.KindGetAccessor:
		return tx.visitGetAccessorDeclaration(node.AsGetAccessorDeclaration())
	case ast.KindPropertyDeclaration:
		return tx.visitPropertyDeclaration(node.AsPropertyDeclaration())
	case ast.KindParameter:
		return tx.visitParamerDeclaration(node.AsParameterDeclaration())
	case ast.KindSourceFile:
		tx.classAliases = make(map[*ast.Node]*ast.Node)
		tx.enclosingClasses = nil
		result := tx.Visitor().VisitEachChild(node)
		tx.EmitContext().AddEmitHelper(result, tx.EmitContext().ReadEmitHelpers()...)
		tx.classAliases = nil
		tx.enclosingClasses = nil
		return result
	default:
		return tx.Visitor().VisitEachChild(node)
	}
}

func (tx *LegacyDecoratorsTransformer) visitIdentifier(node *ast.Identifier) *ast.Node {
	// takes the place of `substituteIdentifier` in the strada transform
	for _, d := range tx.enclosingClasses {
		if _, ok := tx.classAliases[d.AsNode()]; ok && tx.referenceResolver.GetReferencedValueDeclaration(tx.EmitContext().MostOriginal(node.AsNode())) == d.AsNode() {
			return tx.classAliases[d.AsNode()]
		}
	}
	return node.AsNode()
}

func elideNodes(f *printer.NodeFactory, nodes *ast.NodeList) *ast.NodeList {
	if nodes == nil {
		return nil
	}
	if len(nodes.Nodes) == 0 {
		return nodes
	}
	replacement := f.NewNodeList([]*ast.Node{})
	replacement.Loc = nodes.Loc
	return replacement
}

func elideModifiers(f *printer.NodeFactory, nodes *ast.ModifierList) *ast.ModifierList {
	if nodes == nil {
		return nil
	}
	if len(nodes.Nodes) == 0 {
		return nodes
	}
	replacement := f.NewModifierList([]*ast.Node{})
	replacement.Loc = nodes.Loc
	return replacement
}

func moveRangePastModifiers(node *ast.Node) core.TextRange {
	if ast.IsPropertyDeclaration(node) || ast.IsMethodDeclaration(node) {
		return core.NewTextRange(node.Name().Pos(), node.End())
	}

	var lastModifier *ast.Node
	if ast.CanHaveModifiers(node) {
		nodes := node.ModifierNodes()
		if nodes != nil {
			lastModifier = nodes[0]
		}
	}

	if lastModifier != nil && !ast.PositionIsSynthesized(lastModifier.End()) {
		return core.NewTextRange(lastModifier.End(), node.End())
	}
	return moveRangePastDecorators(node)
}

func moveRangePastDecorators(node *ast.Node) core.TextRange {
	var lastDecorator *ast.Node
	if ast.CanHaveModifiers(node) {
		nodes := node.ModifierNodes()
		if nodes != nil {
			lastDecorator = core.FindLast(nodes, ast.IsDecorator)
		}
	}

	if lastDecorator != nil && !ast.PositionIsSynthesized(lastDecorator.End()) {
		return core.NewTextRange(lastDecorator.End(), node.End())
	}
	return node.Loc
}

func (tx *LegacyDecoratorsTransformer) finishClassElement(updated *ast.Node, original *ast.Node) *ast.Node {
	if updated != original {
		// While we emit the source map for the node after skipping decorators and modifiers,
		// we need to emit the comments for the original range.
		tx.EmitContext().SetCommentRange(updated, original.Loc)
		tx.EmitContext().SetSourceMapRange(updated, moveRangePastModifiers(original))
	}
	return updated
}

func (tx *LegacyDecoratorsTransformer) visitParamerDeclaration(node *ast.ParameterDeclaration) *ast.Node {
	updated := tx.Factory().UpdateParameterDeclaration(
		node,
		elideModifiers(tx.Factory(), node.Modifiers()),
		node.DotDotDotToken,
		tx.Visitor().VisitNode(node.Name()),
		nil,
		nil,
		tx.Visitor().VisitNode(node.Initializer),
	)
	if updated != node.AsNode() {
		// While we emit the source map for the node after skipping decorators and modifiers,
		// we need to emit the comments for the original range.
		tx.EmitContext().SetCommentRange(updated, node.Loc)
		newLoc := moveRangePastModifiers(node.AsNode())
		updated.Loc = newLoc
		tx.EmitContext().SetSourceMapRange(updated, newLoc)
		tx.EmitContext().SetEmitFlags(updated.Name(), printer.EFNoTrailingSourceMap)
	}
	return updated
}

func (tx *LegacyDecoratorsTransformer) visitPropertyDeclaration(node *ast.PropertyDeclaration) *ast.Node {
	if (node.Flags & ast.NodeFlagsAmbient) != 0 {
		return nil
	}
	if ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsAmbient|ast.ModifierFlagsAbstract) {
		return nil
	}

	return tx.finishClassElement(
		tx.Factory().UpdatePropertyDeclaration(
			node,
			tx.Visitor().VisitModifiers(node.Modifiers()),
			tx.Visitor().VisitNode(node.Name()),
			nil,
			nil,
			tx.Visitor().VisitNode(node.Initializer),
		),
		node.AsNode(),
	)
}

func (tx *LegacyDecoratorsTransformer) visitGetAccessorDeclaration(node *ast.GetAccessorDeclaration) *ast.Node {
	return tx.finishClassElement(
		tx.Factory().UpdateGetAccessorDeclaration(
			node,
			tx.Visitor().VisitModifiers(node.Modifiers()),
			tx.Visitor().VisitNode(node.Name()),
			nil,
			tx.Visitor().VisitNodes(node.Parameters),
			nil,
			nil,
			tx.Visitor().VisitNode(node.Body),
		),
		node.AsNode(),
	)
}

func (tx *LegacyDecoratorsTransformer) visitSetAccessorDeclaration(node *ast.SetAccessorDeclaration) *ast.Node {
	return tx.finishClassElement(
		tx.Factory().UpdateSetAccessorDeclaration(
			node,
			tx.Visitor().VisitModifiers(node.Modifiers()),
			tx.Visitor().VisitNode(node.Name()),
			nil,
			tx.Visitor().VisitNodes(node.Parameters),
			nil,
			nil,
			tx.Visitor().VisitNode(node.Body),
		),
		node.AsNode(),
	)
}

func (tx *LegacyDecoratorsTransformer) visitMethodDeclaration(node *ast.MethodDeclaration) *ast.Node {
	return tx.finishClassElement(
		tx.Factory().UpdateMethodDeclaration(
			node,
			tx.Visitor().VisitModifiers(node.Modifiers()),
			node.AsteriskToken,
			tx.Visitor().VisitNode(node.Name()),
			nil,
			nil,
			tx.Visitor().VisitNodes(node.Parameters),
			nil,
			nil,
			tx.Visitor().VisitNode(node.Body),
		),
		node.AsNode(),
	)
}

func (tx *LegacyDecoratorsTransformer) visitConstructorDeclaration(node *ast.ConstructorDeclaration) *ast.Node {
	return tx.Factory().UpdateConstructorDeclaration(
		node,
		tx.Visitor().VisitModifiers(node.Modifiers()),
		nil,
		tx.Visitor().VisitNodes(node.Parameters),
		nil,
		nil,
		tx.Visitor().VisitNode(node.Body),
	)
}

func (tx *LegacyDecoratorsTransformer) visitClassExpression(node *ast.ClassExpression) *ast.Node {
	// Legacy decorators were not supported on class expressions
	return tx.Factory().UpdateClassExpression(
		node,
		tx.Visitor().VisitModifiers(node.Modifiers()),
		node.Name(),
		nil,
		tx.Visitor().VisitNodes(node.HeritageClauses),
		tx.Visitor().VisitNodes(node.Members),
	)
}

func (tx *LegacyDecoratorsTransformer) visitClassDeclaration(node *ast.ClassDeclaration) *ast.Node {
	decorated := ast.ClassOrConstructorParameterIsDecorated(true, node.AsNode())
	if !(decorated || ast.ChildIsDecorated(true, node.AsNode(), nil)) {
		return tx.Visitor().VisitEachChild(node.AsNode())
	}

	if decorated {
		return tx.transformClassDeclarationWithClassDecorators(node, node.Name())
	}
	return tx.transformClassDeclarationWithoutClassDecorators(node, node.Name())
}

/**
* Transforms a non-decorated class declaration.
*
* @param node A ClassDeclaration node.
* @param name The name of the class.
 */
func (tx *LegacyDecoratorsTransformer) transformClassDeclarationWithoutClassDecorators(node *ast.ClassDeclaration, name *ast.DeclarationName) *ast.Node {
	//  ${modifiers} class ${name} ${heritageClauses} {
	//      ${members}
	//  }
	modifiers := tx.Visitor().VisitModifiers(node.Modifiers())
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	initialMembers := tx.Visitor().VisitNodes(node.Members)
	members, decorationStatements := tx.transformDecoratorsOfClassElements(node, initialMembers)

	if name == nil && len(decorationStatements) > 0 {
		name = tx.Factory().NewGeneratedNameForNode(node.AsNode())
	}

	updated := tx.Factory().UpdateClassDeclaration(
		node,
		modifiers,
		name,
		nil,
		heritageClauses,
		members,
	)

	if len(decorationStatements) == 0 {
		return updated
	}
	return tx.Factory().NewSyntaxList(append([]*ast.Node{updated}, decorationStatements...))
}

func (tx *LegacyDecoratorsTransformer) popEnclosingClass() {
	tx.enclosingClasses = tx.enclosingClasses[:len(tx.enclosingClasses)-1]
}

func (tx *LegacyDecoratorsTransformer) pushEnclosingClass(cls *ast.ClassDeclaration) {
	tx.enclosingClasses = append(tx.enclosingClasses, cls)
}

/**
* Transforms a decorated class declaration and appends the resulting statements. If
* the class requires an alias to avoid issues with double-binding, the alias is returned.
 */
func (tx *LegacyDecoratorsTransformer) transformClassDeclarationWithClassDecorators(node *ast.ClassDeclaration, name *ast.DeclarationName) *ast.Node {
	// When we emit an ES6 class that has a class decorator, we must tailor the
	// emit to certain specific cases.
	//
	// In the simplest case, we emit the class declaration as a let declaration, and
	// evaluate decorators after the close of the class body:
	//
	//  [Example 1]
	//  ---------------------------------------------------------------------
	//  TypeScript                      | Javascript
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = class C {
	//  class C {                       | }
	//  }                               | C = __decorate([dec], C);
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = class C {
	//  export class C {                | }
	//  }                               | C = __decorate([dec], C);
	//                                  | export { C };
	//  ---------------------------------------------------------------------
	//
	// If a class declaration contains a reference to itself *inside* of the class body,
	// this introduces two bindings to the class: One outside of the class body, and one
	// inside of the class body. If we apply decorators as in [Example 1] above, there
	// is the possibility that the decorator `dec` will return a new value for the
	// constructor, which would result in the binding inside of the class no longer
	// pointing to the same reference as the binding outside of the class.
	//
	// As a result, we must instead rewrite all references to the class *inside* of the
	// class body to instead point to a local temporary alias for the class:
	//
	//  [Example 2]
	//  ---------------------------------------------------------------------
	//  TypeScript                      | Javascript
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = C_1 = class C {
	//  class C {                       |   static x() { return C_1.y; }
	//    static x() { return C.y; }    | }
	//    static y = 1;                 | C.y = 1;
	//  }                               | C = C_1 = __decorate([dec], C);
	//                                  | var C_1;
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = class C {
	//  export class C {                |   static x() { return C_1.y; }
	//    static x() { return C.y; }    | }
	//    static y = 1;                 | C.y = 1;
	//  }                               | C = C_1 = __decorate([dec], C);
	//                                  | export { C };
	//                                  | var C_1;
	//  ---------------------------------------------------------------------
	//
	// If a class declaration is the default export of a module, we instead emit
	// the export after the decorated declaration:
	//
	//  [Example 3]
	//  ---------------------------------------------------------------------
	//  TypeScript                      | Javascript
	//  ---------------------------------------------------------------------
	//  @dec                            | let default_1 = class {
	//  export default class {          | }
	//  }                               | default_1 = __decorate([dec], default_1);
	//                                  | export default default_1;
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = class C {
	//  export default class C {        | }
	//  }                               | C = __decorate([dec], C);
	//                                  | export default C;
	//  ---------------------------------------------------------------------
	//
	// If the class declaration is the default export and a reference to itself
	// inside of the class body, we must emit both an alias for the class *and*
	// move the export after the declaration:
	//
	//  [Example 4]
	//  ---------------------------------------------------------------------
	//  TypeScript                      | Javascript
	//  ---------------------------------------------------------------------
	//  @dec                            | let C = class C {
	//  export default class C {        |   static x() { return C_1.y; }
	//    static x() { return C.y; }    | }
	//    static y = 1;                 | C.y = 1;
	//  }                               | C = C_1 = __decorate([dec], C);
	//                                  | export default C;
	//                                  | var C_1;
	//  ---------------------------------------------------------------------
	//

	isExport := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsExport)
	isDefault := ast.HasSyntacticModifier(node.AsNode(), ast.ModifierFlagsDefault)
	var modifiers *ast.ModifierList
	if node.Modifiers() != nil && len(node.Modifiers().Nodes) > 0 {
		modifierNodes := core.Filter(node.Modifiers().Nodes, isNotExportOrDefaultOrDecorator)
		if len(modifierNodes) != len(node.Modifiers().Nodes) {
			modifiers = tx.Factory().NewModifierList(modifierNodes)
			modifiers.Loc = node.Modifiers().Loc
		} else {
			modifiers = node.Modifiers()
		}
	}

	location := moveRangePastModifiers(node.AsNode())
	classAlias := tx.getClassAliasIfNeeded(node)
	if classAlias != nil {
		tx.pushEnclosingClass(node)
		defer tx.popEnclosingClass()
	}

	// When we used to transform to ES5/3 this would be moved inside an IIFE and should reference the name
	// without any block-scoped variable collision handling - but we don't support that anymore, so we always
	// use the local name for the class
	declName := tx.Factory().GetLocalNameEx(node.AsNode(), printer.AssignedNameOptions{AllowComments: false, AllowSourceMaps: true})

	//  ... = class ${name} ${heritageClauses} {
	//      ${members}
	//  }
	heritageClauses := tx.Visitor().VisitNodes(node.HeritageClauses)
	members := tx.Visitor().VisitNodes(node.Members)

	members, decorationStatements := tx.transformDecoratorsOfClassElements(node, members)

	// If we're emitting to ES2022 or later then we need to reassign the class alias before
	// static initializers are evaluated.
	assignClassAliasInStaticBlock := tx.languageVersion >= core.ScriptTargetES2022 && classAlias != nil && members != nil && len(members.Nodes) > 0 && core.Some(members.Nodes, isClassStaticBlockDeclarationOrStaticProperty)
	if assignClassAliasInStaticBlock {
		memberList := []*ast.Node{}
		memberList = append(memberList, tx.Factory().NewClassStaticBlockDeclaration(nil, tx.Factory().NewBlock(
			tx.Factory().NewNodeList([]*ast.Node{tx.Factory().NewExpressionStatement(
				tx.Factory().NewAssignmentExpression(classAlias, tx.Factory().NewKeywordExpression(ast.KindThisKeyword)),
			)}),
			false,
		)))
		memberList = append(memberList, members.Nodes...)
		newList := tx.Factory().NewNodeList(memberList)
		newList.Loc = members.Loc
		members = newList
	}

	exprName := name
	if name != nil && transformers.IsGeneratedIdentifier(tx.EmitContext(), name) {
		exprName = nil
	}
	classExpression := tx.Factory().NewClassExpression(
		modifiers,
		exprName,
		nil,
		heritageClauses,
		members,
	)

	tx.EmitContext().SetOriginal(classExpression, node.AsNode())
	classExpression.Loc = location

	//  let ${name} = ${classExpression} where name is either declaredName if the class doesn't contain self-reference
	//                                         or decoratedClassAlias if the class contain self-reference.
	varInitializer := classExpression
	if classAlias != nil && !assignClassAliasInStaticBlock {
		varInitializer = tx.Factory().NewAssignmentExpression(classAlias, classExpression)
	}
	varDecl := tx.Factory().NewVariableDeclaration(
		declName,
		nil,
		nil,
		varInitializer,
	)
	tx.EmitContext().SetOriginal(varDecl, node.AsNode())

	varDeclList := tx.Factory().NewVariableDeclarationList(ast.NodeFlagsLet, tx.Factory().NewNodeList([]*ast.Node{varDecl}))
	varStatement := tx.Factory().NewVariableStatement(nil, varDeclList)
	tx.EmitContext().SetOriginal(varStatement, node.AsNode())
	varStatement.Loc = location
	tx.EmitContext().SetCommentRange(varStatement, node.Loc)

	statements := []*ast.Node{varStatement}
	statements = append(statements, decorationStatements...)
	statements = append(statements, tx.getConstructorDecorationStatement(node))

	if isExport {
		var exportStatement *ast.Node
		if isDefault {
			exportStatement = tx.Factory().NewExportAssignment(nil, false, nil, declName)
		} else {
			exportStatement = tx.Factory().NewExportDeclaration(
				nil,
				false,
				tx.Factory().NewNamedExports(
					tx.Factory().NewNodeList([]*ast.Node{tx.Factory().NewExportSpecifier(
						false,
						nil,
						tx.Factory().GetDeclarationName(node.AsNode()),
					)}),
				),
				nil,
				nil,
			)
		}
		statements = append(statements, exportStatement)
	}

	if len(statements) == 1 {
		return statements[0]
	}
	return tx.Factory().NewSyntaxList(statements)
}

func (tx *LegacyDecoratorsTransformer) hasInternalStaticReference(node *ast.ClassDeclaration) bool {
	var isOrContainsStaticSelfReference func(n *ast.Node) bool
	isOrContainsStaticSelfReference = func(n *ast.Node) bool {
		if ast.IsIdentifier(n) && tx.referenceResolver.GetReferencedValueDeclaration(tx.EmitContext().MostOriginal(n)) == node.AsNode() {
			return true
		}
		return n.ForEachChild(isOrContainsStaticSelfReference)
	}
	for _, node := range node.Members.Nodes {
		if node.ForEachChild(isOrContainsStaticSelfReference) {
			return true
		}
	}
	return false
}

/**
* Gets a local alias for a class declaration if it is a decorated class with an internal
* reference to the static side of the class. This is necessary to avoid issues with
* double-binding semantics for the class name.
 */
func (tx *LegacyDecoratorsTransformer) getClassAliasIfNeeded(node *ast.ClassDeclaration) *ast.Node {
	if !tx.hasInternalStaticReference(node) {
		return nil
	}
	nameText := "default"
	if node.Name() != nil && !transformers.IsGeneratedIdentifier(tx.EmitContext(), node.Name()) {
		nameText = node.Name().Text()
	}

	classAlias := tx.Factory().NewUniqueName(nameText)
	tx.EmitContext().AddVariableDeclaration(classAlias)
	tx.classAliases[node.AsNode()] = classAlias

	return classAlias
}

/**
* Generates a __decorate helper call for a class constructor.
*
* @param node The class node.
 */
func (tx *LegacyDecoratorsTransformer) getConstructorDecorationStatement(node *ast.ClassDeclaration) *ast.Node {
	expression := tx.generateConstructorDecorationExpression(node)
	if expression != nil {
		result := tx.Factory().NewExpressionStatement(expression)
		tx.EmitContext().SetOriginal(result, node.AsNode())
		return result
	}
	return nil
}

/**
* Generates a __decorate helper call for a class constructor.
*
* @param node The class node.
 */
func (tx *LegacyDecoratorsTransformer) generateConstructorDecorationExpression(node *ast.ClassDeclaration) *ast.Node {
	allDecorators := getAllDecoratorsOfClass(node, true)
	decoratorExpressions := tx.transformAllDecoratorsOfDeclaration(allDecorators)
	if len(decoratorExpressions) == 0 {
		return nil
	}

	var classAlias *ast.Node
	if tx.classAliases != nil {
		classAlias, _ = tx.classAliases[tx.EmitContext().MostOriginal(node.AsNode())]
	}

	// When we used to transform to ES5/3 this would be moved inside an IIFE and should reference the name
	// without any block-scoped variable collision handling - but we don't support that anymore, so we always
	// use the local name for the class
	localName := tx.Factory().GetDeclarationNameEx(node.AsNode(), printer.NameOptions{AllowComments: false, AllowSourceMaps: true})
	decorate := tx.Factory().NewDecorateHelper(decoratorExpressions, localName, nil, nil)
	assignmentTarget := decorate
	if classAlias != nil {
		assignmentTarget = tx.Factory().NewAssignmentExpression(classAlias, decorate)
	}
	expression := tx.Factory().NewAssignmentExpression(localName, assignmentTarget)
	tx.EmitContext().SetEmitFlags(expression, printer.EFNoComments)
	tx.EmitContext().SetSourceMapRange(expression, moveRangePastModifiers(node.AsNode()))
	return expression
}

func isClassStaticBlockDeclarationOrStaticProperty(node *ast.Node) bool {
	return ast.IsClassStaticBlockDeclaration(node) || (ast.IsPropertyDeclaration(node) && ast.HasStaticModifier(node))
}

func isNotExportOrDefaultOrDecorator(node *ast.Node) bool {
	return !(ast.IsDecorator(node) || node.Kind == ast.KindExportKeyword || node.Kind == ast.KindDefaultKeyword)
}

func decoratorContainsPrivateIdentifierInExpression(decorator *ast.Node) bool {
	return (decorator.SubtreeFacts() & ast.SubtreeContainsPrivateIdentifierInExpression) != 0
}

func parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators []*ast.Node) bool {
	return core.Some(parameterDecorators, decoratorContainsPrivateIdentifierInExpression)
}

func hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node *ast.ClassDeclaration) bool {
	if node.Members == nil || len(node.Members.Nodes) == 0 {
		return false
	}
	for _, member := range node.Members.Nodes {
		if !ast.CanHaveDecorators(member) {
			continue
		}
		allDecorators := getAllDecoratorsOfClassElement(member, node, true)
		if allDecorators == nil {
			continue
		}
		if core.Some(allDecorators.decorators, decoratorContainsPrivateIdentifierInExpression) {
			return true
		}
		if core.Some(allDecorators.parameters, parameterDecoratorsContainPrivateIdentifierInExpression) {
			return true
		}
	}
	return false
}

type allDecorators struct {
	decorators []*ast.Node
	parameters [][]*ast.Node
}

/**
 * Gets an allDecorators object containing the decorators for the class and the decorators for the
 * parameters of the constructor of the class.
 *
 * @param node The class node.
 *
 * @internal
 */
func getAllDecoratorsOfClass(node *ast.ClassDeclaration, useLegacyDecorators bool) *allDecorators {
	decorators := node.Decorators()
	var parameters [][]*ast.Node
	if useLegacyDecorators {
		parameters = getDecoratorsOfParameters(ast.GetFirstConstructorWithBody(node.AsNode()))
	}
	if len(decorators) == 0 && len(parameters) == 0 {
		return nil
	}
	return &allDecorators{decorators: decorators, parameters: parameters}
}

/**
 * Gets an allDecorators object containing the decorators for the member and its parameters.
 *
 * @param parent The class node that contains the member.
 * @param member The class member.
 *
 * @internal
 */
func getAllDecoratorsOfClassElement(member *ast.Node, parent *ast.ClassDeclaration, useLegacyDecorators bool) *allDecorators {
	switch member.Kind {
	case ast.KindGetAccessor, ast.KindSetAccessor:
		if !useLegacyDecorators {
			return getAllDecoratorsOfMethod(member, false)
		}
		return getAllDecoratorsOfAccessors(member, parent, true)
	case ast.KindMethodDeclaration:
		return getAllDecoratorsOfMethod(member, useLegacyDecorators)
	case ast.KindPropertyDeclaration:
		return getAllDecoratorsOfProperty(member)
	default:
		return nil
	}
}

/**
 * Gets an allDecorators object containing the decorators for the accessor and its parameters.
 *
 * @param parent The class node that contains the accessor.
 * @param accessor The class accessor member.
 */
func getAllDecoratorsOfAccessors(accessor *ast.Node, parent *ast.ClassDeclaration, useLegacyDecorators bool) *allDecorators {
	if accessor.Body() == nil {
		return nil
	}
	decls := ast.GetAllAccessorDeclarations(parent.Members.Nodes, accessor)
	var firstAccessorWithDecorators *ast.Node
	if ast.HasDecorators(decls.FirstAccessor) {
		firstAccessorWithDecorators = decls.FirstAccessor
	} else if ast.HasDecorators(decls.SecondAccessor) {
		firstAccessorWithDecorators = decls.SecondAccessor
	}

	if firstAccessorWithDecorators == nil || accessor != firstAccessorWithDecorators {
		return nil
	}

	decorators := firstAccessorWithDecorators.Decorators()
	var parameters [][]*ast.Node
	if useLegacyDecorators && decls.SetAccessor != nil {
		parameters = getDecoratorsOfParameters(decls.SetAccessor.AsNode())
	}

	if len(decorators) == 0 && len(parameters) == 0 {
		return nil
	}

	return &allDecorators{
		decorators: decorators,
		parameters: parameters,
	}
}

func getAllDecoratorsOfProperty(property *ast.Node) *allDecorators {
	decorators := property.Decorators()
	if len(decorators) == 0 {
		return nil
	}
	return &allDecorators{decorators: decorators}
}

func getAllDecoratorsOfMethod(method *ast.Node, useLegacyDecorators bool) *allDecorators {
	if method.Body() == nil {
		return nil
	}
	decorators := method.Decorators()
	var parameters [][]*ast.Node
	if useLegacyDecorators {
		parameters = getDecoratorsOfParameters(method)
	}
	if len(decorators) == 0 && len(parameters) == 0 {
		return nil
	}
	return &allDecorators{decorators: decorators, parameters: parameters}
}

/**
 * Gets an array of arrays of decorators for the parameters of a function-like node.
 * The offset into the result array should correspond to the offset of the parameter.
 *
 * @param node The function-like node.
 */
func getDecoratorsOfParameters(node *ast.Node) [][]*ast.Node {
	var decorators [][]*ast.Node
	if node != nil {
		parameters := node.Parameters()
		firstParameterIsThis := len(parameters) > 0 && ast.IsThisParameter(parameters[0])
		firstParameterOffset := 0
		numParameters := len(parameters)
		if firstParameterIsThis {
			firstParameterOffset = 1
			numParameters = numParameters - 1
		}
		for i := range numParameters {
			p := parameters[i+firstParameterOffset]
			if len(decorators) > 0 || ast.HasDecorators(p) {
				if len(decorators) == 0 {
					decorators = make([][]*ast.Node, numParameters)
				}
				decorators[i] = p.Decorators()
			}
		}

	}
	return decorators
}

func (tx *LegacyDecoratorsTransformer) transformDecoratorsOfClassElements(node *ast.ClassDeclaration, members *ast.NodeList) (*ast.NodeList, []*ast.Node) {
	var decorationStatements []*ast.Node
	decorationStatements = append(decorationStatements, tx.getClassElementDecorationStatements(node, false)...)
	decorationStatements = append(decorationStatements, tx.getClassElementDecorationStatements(node, true)...)
	if hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node) {
		var memberNodes []*ast.Node
		if members != nil && len(members.Nodes) > 0 {
			memberNodes = members.Nodes
		}
		members = tx.Factory().NewNodeList(
			append(
				append([]*ast.Node{}, memberNodes...),
				tx.Factory().NewClassStaticBlockDeclaration(nil, tx.Factory().NewBlock(tx.Factory().NewNodeList(decorationStatements), true)),
			),
		)
		decorationStatements = nil
	}

	return members, decorationStatements
}

/**
* Generates statements used to apply decorators to either the static or instance members
* of a class.
*
* @param node The class node.
* @param isStatic A value indicating whether to generate statements for static or
*                 instance members.
 */
func (tx *LegacyDecoratorsTransformer) getClassElementDecorationStatements(node *ast.ClassDeclaration, isStatic bool) []*ast.Node {
	exprs := tx.generateClassElementDecorationExpressions(node, isStatic)
	var statements []*ast.Node
	for _, e := range exprs {
		statements = append(statements, tx.Factory().NewExpressionStatement(e))
	}
	return statements
}

/**
* Determines whether a class member is either a static or an instance member of a class
* that is decorated, or has parameters that are decorated.
*
* @param member The class member.
 */
func isDecoratedClassElement(member *ast.Node, isStaticElement bool, parent *ast.ClassDeclaration) bool {
	return isStaticElement == ast.IsStatic(member) && ast.NodeOrChildIsDecorated(true, member, parent.AsNode(), nil)
}

/**
* Gets either the static or instance members of a class that are decorated, or have
* parameters that are decorated.
*
* @param node The class containing the member.
* @param isStatic A value indicating whether to retrieve static or instance members of
*                 the class.
 */
func getDecoratedClassElements(node *ast.ClassDeclaration, isStatic bool) []*ast.Node {
	if node.Members == nil || len(node.Members.Nodes) == 0 {
		return nil
	}
	var members []*ast.Node
	for _, member := range node.Members.Nodes {
		if isDecoratedClassElement(member, isStatic, node) {
			members = append(members, member)
		}
	}
	return members
}

/**
* Generates expressions used to apply decorators to either the static or instance members
* of a class.
*
* @param node The class node.
* @param isStatic A value indicating whether to generate expressions for static or
*                 instance members.
 */
func (tx *LegacyDecoratorsTransformer) generateClassElementDecorationExpressions(node *ast.ClassDeclaration, isStatic bool) []*ast.Node {
	members := getDecoratedClassElements(node, isStatic)
	var expressions []*ast.Node
	for _, member := range members {
		expr := tx.generateClassElementDecorationExpression(node, member)
		if expr != nil {
			expressions = append(expressions, expr)
		}
	}
	return expressions
}

/**
* Generates an expression used to evaluate class element decorators at runtime.
*
* @param node The class node that contains the member.
* @param member The class member.
 */
func (tx *LegacyDecoratorsTransformer) generateClassElementDecorationExpression(node *ast.ClassDeclaration, member *ast.Node) *ast.Node {
	allDecorators := getAllDecoratorsOfClassElement(member, node, true)
	decoratorExpressions := tx.transformAllDecoratorsOfDeclaration(allDecorators)
	if len(decoratorExpressions) == 0 {
		return nil
	}

	// Emit the call to __decorate. Given the following:
	//
	//   class C {
	//     @dec method(@dec2 x) {}
	//     @dec get accessor() {}
	//     @dec prop;
	//   }
	//
	// The emit for a method is:
	//
	//   __decorate([
	//       dec,
	//       __param(0, dec2),
	//       __metadata("design:type", Function),
	//       __metadata("design:paramtypes", [Object]),
	//       __metadata("design:returntype", void 0)
	//   ], C.prototype, "method", null);
	//
	// The emit for an accessor is:
	//
	//   __decorate([
	//       dec
	//   ], C.prototype, "accessor", null);
	//
	// The emit for a property is:
	//
	//   __decorate([
	//       dec
	//   ], C.prototype, "prop");
	//

	prefix := tx.getClassMemberPrefix(node, member)
	memberName := tx.getExpressionForPropertyName(member, !ast.HasAmbientModifier(member))
	var descriptor *ast.Node
	if ast.IsPropertyDeclaration(member) && !ast.HasAccessorModifier(member) {
		// We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
		// should not invoke `Object.getOwnPropertyDescriptor`.
		descriptor = tx.Factory().NewVoidZeroExpression()
	} else {
		// We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
		// We have this extra argument here so that we can inject an explicit property descriptor at a later date.
		descriptor = tx.Factory().NewKeywordExpression(ast.KindNullKeyword)
	}

	helper := tx.Factory().NewDecorateHelper(
		decoratorExpressions,
		prefix,
		memberName,
		descriptor,
	)

	tx.EmitContext().SetEmitFlags(helper, printer.EFNoComments)
	tx.EmitContext().SetSourceMapRange(helper, moveRangePastModifiers(member))
	return helper
}

func (tx *LegacyDecoratorsTransformer) isSyntheticMetadataDecorator(node *ast.Node) bool {
	return tx.EmitContext().IsCallToHelper(node.Expression(), "__metadata")
}

/**
* Transforms all of the decorators for a declaration into an array of expressions.
*
* @param allDecorators An object containing all of the decorators for the declaration.
 */
func (tx *LegacyDecoratorsTransformer) transformAllDecoratorsOfDeclaration(allDecorators *allDecorators) []*ast.Node {
	if allDecorators == nil {
		return nil
	}

	// ensure that metadata decorators are last
	mm := collections.GroupBy(allDecorators.decorators, tx.isSyntheticMetadataDecorator)
	metadata := mm.Get(true)
	decorators := mm.Get(false)

	var decoratorExpressions []*ast.Node
	decoratorExpressions = append(decoratorExpressions, tx.transformDecorators(decorators)...)
	decoratorExpressions = append(decoratorExpressions, tx.transformDecoratorsOfParameters(allDecorators.parameters)...)
	decoratorExpressions = append(decoratorExpressions, tx.transformDecorators(metadata)...)
	return decoratorExpressions
}

func (tx *LegacyDecoratorsTransformer) transformDecoratorsOfParameters(parameters [][]*ast.Node) []*ast.Node {
	var results []*ast.Node
	for i, decorators := range parameters {
		if len(decorators) > 0 {
			for _, decorator := range decorators {
				helper := tx.Factory().NewParamHelper(
					tx.Visitor().VisitNode(decorator.Expression()),
					i,
					decorator.Expression().Loc,
				)
				tx.EmitContext().SetEmitFlags(helper, printer.EFNoComments)
				results = append(results, helper)
			}
		}
	}
	return results
}

/**
* Transforms a list of decorators into an expression.
*
* @param decorator The decorator node.
 */
func (tx *LegacyDecoratorsTransformer) transformDecorators(decorators []*ast.Node) []*ast.Node {
	var results []*ast.Node
	for _, d := range decorators {
		results = append(results, tx.Visitor().VisitNode(d.Expression()))
	}
	return results
}

func (tx *LegacyDecoratorsTransformer) getClassMemberPrefix(node *ast.ClassDeclaration, member *ast.Node) *ast.Node {
	if ast.IsStatic(member) {
		return tx.Factory().GetDeclarationName(node.AsNode())
	}
	return tx.getClassPrototype(node)
}

func (tx *LegacyDecoratorsTransformer) getClassPrototype(node *ast.ClassDeclaration) *ast.Node {
	return tx.Factory().NewPropertyAccessExpression(
		tx.Factory().GetDeclarationName(node.AsNode()),
		nil,
		tx.Factory().NewIdentifier("prototype"),
		ast.NodeFlagsNone,
	)
}

func (tx *LegacyDecoratorsTransformer) getExpressionForPropertyName(member *ast.Node, generateNameForComputedPropertyName bool) *ast.Node {
	name := member.Name()
	if ast.IsPrivateIdentifier(name) {
		return tx.Factory().NewIdentifier("")
	} else if ast.IsComputedPropertyName(name) {
		if generateNameForComputedPropertyName && !transformers.IsSimpleInlineableExpression(name.AsComputedPropertyName().Expression) {
			return tx.Factory().NewGeneratedNameForNode(name)
		}
		return name.AsComputedPropertyName().Expression
	} else if ast.IsIdentifier(name) {
		return tx.Factory().NewStringLiteral(name.Text(), ast.TokenFlagsNone)
	} else {
		return tx.Factory().DeepCloneNode(name)
	}
}

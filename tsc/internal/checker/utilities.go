package checker

import (
	"cmp"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func NewDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	var file *ast.SourceFile
	var loc core.TextRange
	if node != nil {
		file = ast.GetSourceFileOfNode(node)
		loc = binder.GetErrorRangeForNode(file, node)
	}
	return ast.NewDiagnostic(file, loc, message, args...)
}

func NewDiagnosticChainForNode(chain *ast.Diagnostic, node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	if chain != nil {
		return ast.NewDiagnosticChain(chain, message, args...)
	}
	return NewDiagnosticForNode(node, message, args...)
}

func IsIntrinsicJsxName(name string) bool {
	return len(name) != 0 && (name[0] >= 'a' && name[0] <= 'z' || strings.ContainsRune(name, '-'))
}

func findInMap[K comparable, V any](m map[K]V, predicate func(V) bool) V {
	for _, value := range m {
		if predicate(value) {
			return value
		}
	}
	return *new(V)
}

func boolToTristate(b bool) core.Tristate {
	if b {
		return core.TSTrue
	}
	return core.TSFalse
}

func isCompoundAssignment(token ast.Kind) bool {
	return token >= ast.KindFirstCompoundAssignment && token <= ast.KindLastCompoundAssignment
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

func hasOverrideModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsOverride)
}

func hasAbstractModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAbstract)
}

func hasAmbientModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient)
}

func hasAsyncModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync)
}

func hasDecorators(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsDecorator)
}

func getSelectedModifierFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags {
	return node.ModifierFlags() & flags
}

func hasModifier(node *ast.Node, flags ast.ModifierFlags) bool {
	return node.ModifierFlags()&flags != 0
}

func hasReadonlyModifier(node *ast.Node) bool {
	return hasModifier(node, ast.ModifierFlagsReadonly)
}

func isBindingElementOfBareOrAccessedRequire(node *ast.Node) bool {
	return ast.IsBindingElement(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(node.Parent.Parent)
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 */
func isVariableDeclarationInitializedToBareOrAccessedRequire(node *ast.Node) bool {
	return isVariableDeclarationInitializedWithRequireHelper(node, true /*allowAccessedRequire*/)
}

func isVariableDeclarationInitializedWithRequireHelper(node *ast.Node, allowAccessedRequire bool) bool {
	if node.Kind == ast.KindVariableDeclaration && node.AsVariableDeclaration().Initializer != nil {
		initializer := node.AsVariableDeclaration().Initializer
		if allowAccessedRequire {
			initializer = getLeftmostAccessExpression(initializer)
		}
		return isRequireCall(initializer, true /*requireStringLiteralLikeArgument*/)
	}
	return false
}

func getLeftmostAccessExpression(expr *ast.Node) *ast.Node {
	for ast.IsAccessExpression(expr) {
		expr = expr.Expression()
	}
	return expr
}

func isRequireCall(node *ast.Node, requireStringLiteralLikeArgument bool) bool {
	if ast.IsCallExpression(node) {
		callExpression := node.AsCallExpression()
		if len(callExpression.Arguments.Nodes) == 1 {
			if ast.IsIdentifier(callExpression.Expression) && callExpression.Expression.AsIdentifier().Text == "require" {
				return !requireStringLiteralLikeArgument || ast.IsStringLiteralLike(callExpression.Arguments.Nodes[0])
			}
		}
	}
	return false
}

func isStaticPrivateIdentifierProperty(s *ast.Symbol) bool {
	return s.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration) && ast.IsStatic(s.ValueDeclaration)
}

func isEmptyObjectLiteral(expression *ast.Node) bool {
	return expression.Kind == ast.KindObjectLiteralExpression && len(expression.AsObjectLiteralExpression().Properties.Nodes) == 0
}

type AssignmentKind int32

const (
	AssignmentKindNone AssignmentKind = iota
	AssignmentKindDefinite
	AssignmentKindCompound
)

type AssignmentTarget = ast.Node // BinaryExpression | PrefixUnaryExpression | PostfixUnaryExpression | ForInOrOfStatement

func getAssignmentTargetKind(node *ast.Node) AssignmentKind {
	target := ast.GetAssignmentTarget(node)
	if target == nil {
		return AssignmentKindNone
	}
	switch target.Kind {
	case ast.KindBinaryExpression:
		binaryOperator := target.AsBinaryExpression().OperatorToken.Kind
		if binaryOperator == ast.KindEqualsToken || ast.IsLogicalOrCoalescingAssignmentOperator(binaryOperator) {
			return AssignmentKindDefinite
		}
		return AssignmentKindCompound
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return AssignmentKindCompound
	case ast.KindForInStatement, ast.KindForOfStatement:
		return AssignmentKindDefinite
	}
	panic("Unhandled case in getAssignmentTargetKind")
}

func isDeleteTarget(node *ast.Node) bool {
	if !ast.IsAccessExpression(node) {
		return false
	}
	node = ast.WalkUpParenthesizedExpressions(node.Parent)
	return node != nil && node.Kind == ast.KindDeleteExpression
}

func isInCompoundLikeAssignment(node *ast.Node) bool {
	target := ast.GetAssignmentTarget(node)
	return target != nil && ast.IsAssignmentExpression(target /*excludeCompoundAssignment*/, true) && isCompoundLikeAssignment(target)
}

func isCompoundLikeAssignment(assignment *ast.Node) bool {
	right := ast.SkipParentheses(assignment.AsBinaryExpression().Right)
	return right.Kind == ast.KindBinaryExpression && isShiftOperatorOrHigher(right.AsBinaryExpression().OperatorToken.Kind)
}

func getAssertedTypeNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindAsExpression:
		return node.AsAsExpression().Type
	case ast.KindSatisfiesExpression:
		return node.AsSatisfiesExpression().Type
	case ast.KindTypeAssertionExpression:
		return node.AsTypeAssertion().Type
	}
	panic("Unhandled case in getAssertedTypeNode")
}

func isConstAssertion(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindAsExpression, ast.KindTypeAssertionExpression:
		return isConstTypeReference(getAssertedTypeNode(node))
	}
	return false
}

func isConstTypeReference(node *ast.Node) bool {
	return ast.IsTypeReferenceNode(node) && len(node.TypeArguments()) == 0 && ast.IsIdentifier(node.AsTypeReferenceNode().TypeName) && node.AsTypeReferenceNode().TypeName.Text() == "const"
}

func getSingleVariableOfVariableStatement(node *ast.Node) *ast.Node {
	if !ast.IsVariableStatement(node) {
		return nil
	}
	return core.FirstOrNil(node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes)
}

func isTypeReferenceIdentifier(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindQualifiedName {
		node = node.Parent
	}
	return ast.IsTypeReferenceNode(node.Parent)
}

func isInTypeQuery(node *ast.Node) bool {
	// TypeScript 1.0 spec (April 2014): 3.6.3
	// A type query consists of the keyword typeof followed by an expression.
	// The expression is restricted to a single identifier or a sequence of identifiers separated by periods
	return ast.FindAncestorOrQuit(node, func(n *ast.Node) ast.FindAncestorResult {
		switch n.Kind {
		case ast.KindTypeQuery:
			return ast.FindAncestorTrue
		case ast.KindIdentifier, ast.KindQualifiedName:
			return ast.FindAncestorFalse
		}
		return ast.FindAncestorQuit
	}) != nil
}

func isTypeOnlyImportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().IsTypeOnly || node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindNamespaceImport:
		return node.Parent.AsImportClause().IsTypeOnly
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyExportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindExportSpecifier:
		return node.AsExportSpecifier().IsTypeOnly || node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	case ast.KindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.IsTypeOnly && d.ModuleSpecifier != nil && d.ExportClause == nil
	case ast.KindNamespaceExport:
		return node.Parent.AsExportDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyImportOrExportDeclaration(node *ast.Node) bool {
	return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func getNameFromImportDeclaration(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().Name()
	case ast.KindNamespaceImport:
		return node.AsNamespaceImport().Name()
	case ast.KindImportClause:
		return node.AsImportClause().Name()
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().Name()
	}
	return nil
}

func isValidTypeOnlyAliasUseSite(useSite *ast.Node) bool {
	return useSite.Flags&ast.NodeFlagsAmbient != 0 ||
		ast.IsPartOfTypeQuery(useSite) ||
		isIdentifierInNonEmittingHeritageClause(useSite) ||
		isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) ||
		!(ast.IsExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite))
}

func isIdentifierInNonEmittingHeritageClause(node *ast.Node) bool {
	if !ast.IsIdentifier(node) {
		return false
	}
	parent := node.Parent
	for ast.IsPropertyAccessExpression(parent) || ast.IsExpressionWithTypeArguments(parent) {
		parent = parent.Parent
	}
	return ast.IsHeritageClause(parent) && (parent.AsHeritageClause().Token == ast.KindImplementsKeyword || ast.IsInterfaceDeclaration(parent.Parent))
}

func isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node *ast.Node) bool {
	for ast.NodeKindIs(node, ast.KindIdentifier, ast.KindPropertyAccessExpression) {
		node = node.Parent
	}
	if node.Kind != ast.KindComputedPropertyName {
		return false
	}
	if ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsAbstract) {
		return true
	}
	return ast.NodeKindIs(node.Parent.Parent, ast.KindInterfaceDeclaration, ast.KindTypeLiteral)
}

func nodeCanBeDecorated(useLegacyDecorators bool, node *ast.Node, parent *ast.Node, grandparent *ast.Node) bool {
	// private names cannot be used with decorators yet
	if useLegacyDecorators && node.Name() != nil && ast.IsPrivateIdentifier(node.Name()) {
		return false
	}

	switch node.Kind {
	case ast.KindClassDeclaration:
		// class declarations are valid targets
		return true
	case ast.KindClassExpression:
		// class expressions are valid targets for native decorators
		return !useLegacyDecorators
	case ast.KindPropertyDeclaration:
		// property declarations are valid if their parent is a class declaration.
		return parent != nil && (ast.IsClassDeclaration(parent) || !useLegacyDecorators && ast.IsClassExpression(parent) && !hasAbstractModifier(node) && !hasAmbientModifier(node))
	case ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindMethodDeclaration:
		// if this method has a body and its parent is a class declaration, this is a valid target.
		return node.BodyData() != nil && parent != nil && (ast.IsClassDeclaration(parent) || !useLegacyDecorators && ast.IsClassExpression(parent))
	case ast.KindParameter:
		// TODO(rbuckton): Parameter decorator support for ES decorators must wait until it is standardized
		if !useLegacyDecorators {
			return false
		}
		// if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target.
		return parent != nil && parent.BodyData() != nil && (parent.BodyData()).Body != nil && (parent.Kind == ast.KindConstructor || parent.Kind == ast.KindMethodDeclaration || parent.Kind == ast.KindSetAccessor) && getThisParameter(parent) != node && grandparent != nil && grandparent.Kind == ast.KindClassDeclaration
	}

	return false
}

func isShorthandPropertyNameUseSite(useSite *ast.Node) bool {
	return ast.IsIdentifier(useSite) && ast.IsShorthandPropertyAssignment(useSite.Parent) && useSite.Parent.AsShorthandPropertyAssignment().Name() == useSite
}

func isTypeDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindTypeParameter, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration, ast.KindEnumDeclaration:
		return true
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportSpecifier:
		return node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindExportSpecifier:
		return node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	default:
		return false
	}
}

func canHaveSymbol(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBinaryExpression, ast.KindBindingElement, ast.KindCallExpression, ast.KindCallSignature,
		ast.KindClassDeclaration, ast.KindClassExpression, ast.KindClassStaticBlockDeclaration, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindElementAccessExpression, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindExportAssignment,
		ast.KindExportDeclaration, ast.KindExportSpecifier, ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindFunctionType,
		ast.KindGetAccessor, ast.KindIdentifier, ast.KindImportClause, ast.KindImportEqualsDeclaration, ast.KindImportSpecifier,
		ast.KindIndexSignature, ast.KindInterfaceDeclaration, ast.KindJSDocSignature, ast.KindJSDocTypeLiteral,
		ast.KindJsxAttribute, ast.KindJsxAttributes, ast.KindJsxSpreadAttribute, ast.KindMappedType, ast.KindMethodDeclaration,
		ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindNamedTupleMember, ast.KindNamespaceExport, ast.KindNamespaceExportDeclaration,
		ast.KindNamespaceImport, ast.KindNewExpression, ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral, ast.KindObjectLiteralExpression,
		ast.KindParameter, ast.KindPropertyAccessExpression, ast.KindPropertyAssignment, ast.KindPropertyDeclaration, ast.KindPropertySignature,
		ast.KindSetAccessor, ast.KindShorthandPropertyAssignment, ast.KindSourceFile, ast.KindSpreadAssignment, ast.KindStringLiteral,
		ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration, ast.KindTypeLiteral, ast.KindTypeParameter, ast.KindVariableDeclaration:
		return true
	}
	return false
}

func canHaveLocals(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBlock, ast.KindCallSignature, ast.KindCaseBlock, ast.KindCatchClause,
		ast.KindClassStaticBlockDeclaration, ast.KindConditionalType, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindFunctionDeclaration,
		ast.KindFunctionExpression, ast.KindFunctionType, ast.KindGetAccessor, ast.KindIndexSignature,
		ast.KindJSDocSignature, ast.KindMappedType,
		ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindSetAccessor, ast.KindSourceFile,
		ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration:
		return true
	}
	return false
}

func isShorthandAmbientModuleSymbol(moduleSymbol *ast.Symbol) bool {
	return isShorthandAmbientModule(moduleSymbol.ValueDeclaration)
}

func isShorthandAmbientModule(node *ast.Node) bool {
	// The only kind of module that can be missing a body is a shorthand ambient module.
	return node != nil && node.Kind == ast.KindModuleDeclaration && node.AsModuleDeclaration().Body == nil
}

func getAliasDeclarationFromName(node *ast.Node) *ast.Node {
	switch node.Parent.Kind {
	case ast.KindImportClause, ast.KindImportSpecifier, ast.KindNamespaceImport, ast.KindExportSpecifier, ast.KindExportAssignment,
		ast.KindImportEqualsDeclaration, ast.KindNamespaceExport:
		return node.Parent
	case ast.KindQualifiedName:
		return getAliasDeclarationFromName(node.Parent)
	}
	return nil
}

func entityNameToString(name *ast.Node) string {
	switch name.Kind {
	case ast.KindThisKeyword:
		return "this"
	case ast.KindIdentifier, ast.KindPrivateIdentifier:
		if ast.NodeIsSynthesized(name) {
			return name.Text()
		}
		return scanner.GetTextOfNode(name)
	case ast.KindQualifiedName:
		return entityNameToString(name.AsQualifiedName().Left) + "." + entityNameToString(name.AsQualifiedName().Right)
	case ast.KindPropertyAccessExpression:
		return entityNameToString(name.AsPropertyAccessExpression().Expression) + "." + entityNameToString(name.AsPropertyAccessExpression().Name())
	case ast.KindJsxNamespacedName:
		return entityNameToString(name.AsJsxNamespacedName().Namespace) + ":" + entityNameToString(name.AsJsxNamespacedName().Name())
	}
	panic("Unhandled case in entityNameToString")
}

func getContainingQualifiedNameNode(node *ast.Node) *ast.Node {
	for ast.IsQualifiedName(node.Parent) {
		node = node.Parent
	}
	return node
}

func isSideEffectImport(node *ast.Node) bool {
	ancestor := ast.FindAncestor(node, ast.IsImportDeclaration)
	return ancestor != nil && ancestor.AsImportDeclaration().ImportClause == nil
}

func getExternalModuleRequireArgument(node *ast.Node) *ast.Node {
	if isVariableDeclarationInitializedToBareOrAccessedRequire(node) {
		return getLeftmostAccessExpression(node.AsVariableDeclaration().Initializer).AsCallExpression().Arguments.Nodes[0]
	}
	return nil
}

func getExternalModuleImportEqualsDeclarationExpression(node *ast.Node) *ast.Node {
	// Debug.assert(isExternalModuleImportEqualsDeclaration(node))
	return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression
}

func isRightSideOfQualifiedNameOrPropertyAccess(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case ast.KindPropertyAccessExpression:
		return parent.AsPropertyAccessExpression().Name() == node
	case ast.KindMetaProperty:
		return parent.AsMetaProperty().Name() == node
	}
	return false
}

func getSourceFileOfModule(module *ast.Symbol) *ast.SourceFile {
	declaration := module.ValueDeclaration
	if declaration == nil {
		declaration = getNonAugmentationDeclaration(module)
	}
	return ast.GetSourceFileOfNode(declaration)
}

func getNonAugmentationDeclaration(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, func(d *ast.Node) bool {
		return !isExternalModuleAugmentation(d) && !ast.IsGlobalScopeAugmentation(d)
	})
}

func isExternalModuleAugmentation(node *ast.Node) bool {
	return ast.IsAmbientModule(node) && ast.IsModuleAugmentationExternal(node)
}

func isTopLevelInExternalModuleAugmentation(node *ast.Node) bool {
	return node != nil && node.Parent != nil && ast.IsModuleBlock(node.Parent) && isExternalModuleAugmentation(node.Parent.Parent)
}

func isSyntacticDefault(node *ast.Node) bool {
	return (ast.IsExportAssignment(node) && !node.AsExportAssignment().IsExportEquals) ||
		ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) ||
		ast.IsExportSpecifier(node) ||
		ast.IsNamespaceExport(node)
}

func hasExportAssignmentSymbol(moduleSymbol *ast.Symbol) bool {
	return moduleSymbol.Exports[ast.InternalSymbolNameExportEquals] != nil
}

func isTypeAlias(node *ast.Node) bool {
	return ast.IsTypeOrJSTypeAliasDeclaration(node)
}

func hasOnlyExpressionInitializer(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindVariableDeclaration, ast.KindParameter, ast.KindBindingElement, ast.KindPropertyDeclaration, ast.KindPropertyAssignment, ast.KindEnumMember:
		return true
	}
	return false
}

func hasDotDotDotToken(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter:
		return node.AsParameterDeclaration().DotDotDotToken != nil
	case ast.KindBindingElement:
		return node.AsBindingElement().DotDotDotToken != nil
	case ast.KindNamedTupleMember:
		return node.AsNamedTupleMember().DotDotDotToken != nil
	case ast.KindJsxExpression:
		return node.AsJsxExpression().DotDotDotToken != nil
	}
	return false
}

func IsTypeAny(t *Type) bool {
	return t != nil && t.flags&TypeFlagsAny != 0
}

func isJSDocOptionalParameter(node *ast.ParameterDeclaration) bool {
	return false // !!!
}

func isExclamationToken(node *ast.Node) bool {
	return node != nil && node.Kind == ast.KindExclamationToken
}

func isOptionalDeclaration(declaration *ast.Node) bool {
	switch declaration.Kind {
	case ast.KindParameter:
		return declaration.AsParameterDeclaration().QuestionToken != nil
	case ast.KindPropertyDeclaration:
		return ast.IsQuestionToken(declaration.AsPropertyDeclaration().PostfixToken)
	case ast.KindPropertySignature:
		return ast.IsQuestionToken(declaration.AsPropertySignatureDeclaration().PostfixToken)
	case ast.KindMethodDeclaration:
		return ast.IsQuestionToken(declaration.AsMethodDeclaration().PostfixToken)
	case ast.KindMethodSignature:
		return ast.IsQuestionToken(declaration.AsMethodSignatureDeclaration().PostfixToken)
	case ast.KindPropertyAssignment:
		return ast.IsQuestionToken(declaration.AsPropertyAssignment().PostfixToken)
	case ast.KindShorthandPropertyAssignment:
		return ast.IsQuestionToken(declaration.AsShorthandPropertyAssignment().PostfixToken)
	}
	return false
}

func isEmptyArrayLiteral(expression *ast.Node) bool {
	return ast.IsArrayLiteralExpression(expression) && len(expression.AsArrayLiteralExpression().Elements.Nodes) == 0
}

func declarationBelongsToPrivateAmbientMember(declaration *ast.Node) bool {
	root := ast.GetRootDeclaration(declaration)
	memberDeclaration := root
	if root.Kind == ast.KindParameter {
		memberDeclaration = root.Parent
	}
	return isPrivateWithinAmbient(memberDeclaration)
}

func isPrivateWithinAmbient(node *ast.Node) bool {
	return (hasModifier(node, ast.ModifierFlagsPrivate) || ast.IsPrivateIdentifierClassElementDeclaration(node)) && node.Flags&ast.NodeFlagsAmbient != 0
}

func isTypeAssertion(node *ast.Node) bool {
	return ast.IsAssertionExpression(ast.SkipParentheses(node))
}

func createSymbolTable(symbols []*ast.Symbol) ast.SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(ast.SymbolTable)
	for _, symbol := range symbols {
		result[symbol.Name] = symbol
	}
	return result
}

func (c *Checker) sortSymbols(symbols []*ast.Symbol) {
	slices.SortFunc(symbols, c.compareSymbols)
}

func (c *Checker) compareSymbolsWorker(s1, s2 *ast.Symbol) int {
	if s1 == s2 {
		return 0
	}
	if s1 == nil {
		return 1
	}
	if s2 == nil {
		return -1
	}
	if len(s1.Declarations) != 0 && len(s2.Declarations) != 0 {
		if r := c.compareNodes(s1.Declarations[0], s2.Declarations[0]); r != 0 {
			return r
		}
	} else if len(s1.Declarations) != 0 {
		return -1
	} else if len(s2.Declarations) != 0 {
		return 1
	}
	if r := strings.Compare(s1.Name, s2.Name); r != 0 {
		return r
	}
	// Fall back to symbol IDs. This is a last resort that should happen only when symbols have
	// no declaration and duplicate names.
	return int(ast.GetSymbolId(s1)) - int(ast.GetSymbolId(s2))
}

func (c *Checker) compareNodes(n1, n2 *ast.Node) int {
	if n1 == n2 {
		return 0
	}
	if n1 == nil {
		return 1
	}
	if n2 == nil {
		return -1
	}
	s1 := ast.GetSourceFileOfNode(n1)
	s2 := ast.GetSourceFileOfNode(n2)
	if s1 != s2 {
		f1 := c.fileIndexMap[s1]
		f2 := c.fileIndexMap[s2]
		// Order by index of file in the containing program
		return f1 - f2
	}
	// In the same file, order by source position
	return n1.Pos() - n2.Pos()
}

func CompareTypes(t1, t2 *Type) int {
	if t1 == t2 {
		return 0
	}
	if t1 == nil {
		return -1
	}
	if t2 == nil {
		return 1
	}
	if t1.checker != t2.checker {
		panic("Cannot compare types from different checkers")
	}
	// First sort in order of increasing type flags values.
	if c := getSortOrderFlags(t1) - getSortOrderFlags(t2); c != 0 {
		return c
	}
	// Order named types by name and, in the case of aliased types, by alias type arguments.
	if c := compareTypeNames(t1, t2); c != 0 {
		return c
	}
	// We have unnamed types or types with identical names. Now sort by data specific to the type.
	switch {
	case t1.flags&(TypeFlagsAny|TypeFlagsUnknown|TypeFlagsString|TypeFlagsNumber|TypeFlagsBoolean|TypeFlagsBigInt|TypeFlagsESSymbol|TypeFlagsVoid|TypeFlagsUndefined|TypeFlagsNull|TypeFlagsNever|TypeFlagsNonPrimitive) != 0:
		// Only distinguished by type IDs, handled below.
	case t1.flags&TypeFlagsObject != 0:
		// Order unnamed or identically named object types by symbol.
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
		// When object types have the same or no symbol, order by kind. We order type references before other kinds.
		if t1.objectFlags&ObjectFlagsReference != 0 && t2.objectFlags&ObjectFlagsReference != 0 {
			r1 := t1.AsTypeReference()
			r2 := t2.AsTypeReference()
			if r1.target.objectFlags&ObjectFlagsTuple != 0 && r2.target.objectFlags&ObjectFlagsTuple != 0 {
				// Tuple types have no associated symbol, instead we order by tuple element information.
				if c := compareTupleTypes(r1.target.AsTupleType(), r2.target.AsTupleType()); c != 0 {
					return c
				}
			}
			// Here we know we have references to instantiations of the same type because we have matching targets.
			if r1.node == nil && r2.node == nil {
				// Non-deferred type references with the same target are sorted by their type argument lists.
				if c := compareTypeLists(t1.AsTypeReference().resolvedTypeArguments, t2.AsTypeReference().resolvedTypeArguments); c != 0 {
					return c
				}
			} else {
				// Deferred type references with the same target are ordered by the source location of the reference.
				if c := t1.checker.compareNodes(r1.node, r2.node); c != 0 {
					return c
				}
				// Instantiations of the same deferred type reference are ordered by their associated type mappers
				// (which reflect the mapping of in-scope type parameters to type arguments).
				if c := compareTypeMappers(t1.AsObjectType().mapper, t2.AsObjectType().mapper); c != 0 {
					return c
				}
			}
		} else if t1.objectFlags&ObjectFlagsReference != 0 {
			return -1
		} else if t2.objectFlags&ObjectFlagsReference != 0 {
			return 1
		} else {
			// Order unnamed non-reference object types by kind associated type mappers. Reverse mapped types have
			// neither symbols nor mappers so they're ultimately ordered by unstable type IDs, but given their rarity
			// this should be fine.
			if c := int(t1.objectFlags&ObjectFlagsObjectTypeKindMask) - int(t2.objectFlags&ObjectFlagsObjectTypeKindMask); c != 0 {
				return c
			}
			if c := compareTypeMappers(t1.AsObjectType().mapper, t2.AsObjectType().mapper); c != 0 {
				return c
			}
		}
	case t1.flags&TypeFlagsUnion != 0:
		// Unions are ordered by origin and then constituent type lists.
		o1 := t1.AsUnionType().origin
		o2 := t2.AsUnionType().origin
		if o1 == nil && o2 == nil {
			if c := compareTypeLists(t1.Types(), t2.Types()); c != 0 {
				return c
			}
		} else if o1 == nil {
			return 1
		} else if o2 == nil {
			return -1
		} else {
			if c := CompareTypes(o1, o2); c != 0 {
				return c
			}
		}
	case t1.flags&TypeFlagsIntersection != 0:
		// Intersections are ordered by their constituent type lists.
		if c := compareTypeLists(t1.Types(), t2.Types()); c != 0 {
			return c
		}
	case t1.flags&(TypeFlagsEnum|TypeFlagsEnumLiteral|TypeFlagsUniqueESSymbol) != 0:
		// Enum members are ordered by their symbol (and thus their declaration order).
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsStringLiteral != 0:
		// String literal types are ordered by their values.
		if c := strings.Compare(t1.AsLiteralType().value.(string), t2.AsLiteralType().value.(string)); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsNumberLiteral != 0:
		// Numeric literal types are ordered by their values.
		if c := cmp.Compare(t1.AsLiteralType().value.(jsnum.Number), t2.AsLiteralType().value.(jsnum.Number)); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsBooleanLiteral != 0:
		b1 := t1.AsLiteralType().value.(bool)
		b2 := t2.AsLiteralType().value.(bool)
		if b1 != b2 {
			if b1 {
				return 1
			}
			return -1
		}
	case t1.flags&TypeFlagsTypeParameter != 0:
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsIndex != 0:
		if c := CompareTypes(t1.AsIndexType().target, t2.AsIndexType().target); c != 0 {
			return c
		}
		if c := int(t1.AsIndexType().flags) - int(t2.AsIndexType().flags); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsIndexedAccess != 0:
		if c := CompareTypes(t1.AsIndexedAccessType().objectType, t2.AsIndexedAccessType().objectType); c != 0 {
			return c
		}
		if c := CompareTypes(t1.AsIndexedAccessType().indexType, t2.AsIndexedAccessType().indexType); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsConditional != 0:
		if c := t1.checker.compareNodes(t1.AsConditionalType().root.node.AsNode(), t2.AsConditionalType().root.node.AsNode()); c != 0 {
			return c
		}
		if c := compareTypeMappers(t1.AsConditionalType().mapper, t2.AsConditionalType().mapper); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsSubstitution != 0:
		if c := CompareTypes(t1.AsSubstitutionType().baseType, t2.AsSubstitutionType().baseType); c != 0 {
			return c
		}
		if c := CompareTypes(t1.AsSubstitutionType().constraint, t2.AsSubstitutionType().constraint); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsTemplateLiteral != 0:
		if c := slices.Compare(t1.AsTemplateLiteralType().texts, t2.AsTemplateLiteralType().texts); c != 0 {
			return c
		}
		if c := compareTypeLists(t1.AsTemplateLiteralType().types, t2.AsTemplateLiteralType().types); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsStringMapping != 0:
		if c := CompareTypes(t1.AsStringMappingType().target, t2.AsStringMappingType().target); c != 0 {
			return c
		}
	}
	// Fall back to type IDs. This results in type creation order for built-in types.
	return int(t1.id) - int(t2.id)
}

func getSortOrderFlags(t *Type) int {
	// Return TypeFlagsEnum for all enum-like unit types (they'll be sorted by their symbols)
	if t.flags&(TypeFlagsEnumLiteral|TypeFlagsEnum) != 0 && t.flags&TypeFlagsUnion == 0 {
		return int(TypeFlagsEnum)
	}
	return int(t.flags)
}

func compareTypeNames(t1, t2 *Type) int {
	s1 := getTypeNameSymbol(t1)
	s2 := getTypeNameSymbol(t2)
	if s1 == s2 {
		if t1.alias != nil {
			return compareTypeLists(t1.alias.typeArguments, t2.alias.typeArguments)
		}
		return 0
	}
	if s1 == nil {
		return 1
	}
	if s2 == nil {
		return -1
	}
	return strings.Compare(s1.Name, s2.Name)
}

func getTypeNameSymbol(t *Type) *ast.Symbol {
	if t.alias != nil {
		return t.alias.symbol
	}
	if t.flags&(TypeFlagsTypeParameter|TypeFlagsStringMapping) != 0 || t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return t.symbol
	}
	return nil
}

func getObjectTypeName(t *Type) *ast.Symbol {
	if t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return t.symbol
	}
	return nil
}

func compareTupleTypes(t1, t2 *TupleType) int {
	if t1 == t2 {
		return 0
	}
	if t1.readonly != t2.readonly {
		return core.IfElse(t1.readonly, 1, -1)
	}
	if len(t1.elementInfos) != len(t2.elementInfos) {
		return len(t1.elementInfos) - len(t2.elementInfos)
	}
	for i := range t1.elementInfos {
		if c := int(t1.elementInfos[i].flags) - int(t2.elementInfos[i].flags); c != 0 {
			return c
		}
	}
	for i := range t1.elementInfos {
		if c := compareElementLabels(t1.elementInfos[i].labeledDeclaration, t2.elementInfos[i].labeledDeclaration); c != 0 {
			return c
		}
	}
	return 0
}

func compareElementLabels(n1, n2 *ast.Node) int {
	if n1 == n2 {
		return 0
	}
	if n1 == nil {
		return -1
	}
	if n2 == nil {
		return 1
	}
	return strings.Compare(n1.Name().Text(), n2.Name().Text())
}

func compareTypeLists(s1, s2 []*Type) int {
	if len(s1) != len(s2) {
		return len(s1) - len(s2)
	}
	for i, t1 := range s1 {
		if c := CompareTypes(t1, s2[i]); c != 0 {
			return c
		}
	}
	return 0
}

func compareTypeMappers(m1, m2 *TypeMapper) int {
	if m1 == m2 {
		return 0
	}
	if m1 == nil {
		return 1
	}
	if m2 == nil {
		return -1
	}
	kind1 := m1.Kind()
	kind2 := m2.Kind()
	if kind1 != kind2 {
		return int(kind1) - int(kind2)
	}
	switch kind1 {
	case TypeMapperKindSimple:
		m1 := m1.data.(*SimpleTypeMapper)
		m2 := m2.data.(*SimpleTypeMapper)
		if c := CompareTypes(m1.source, m2.source); c != 0 {
			return c
		}
		return CompareTypes(m1.target, m2.target)
	case TypeMapperKindArray:
		m1 := m1.data.(*ArrayTypeMapper)
		m2 := m2.data.(*ArrayTypeMapper)
		if c := compareTypeLists(m1.sources, m2.sources); c != 0 {
			return c
		}
		return compareTypeLists(m1.targets, m2.targets)
	case TypeMapperKindMerged:
		m1 := m1.data.(*MergedTypeMapper)
		m2 := m2.data.(*MergedTypeMapper)
		if c := compareTypeMappers(m1.m1, m2.m1); c != 0 {
			return c
		}
		return compareTypeMappers(m1.m2, m2.m2)
	}
	return 0
}

func getClassLikeDeclarationOfSymbol(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, ast.IsClassLike)
}

func isThisInTypeQuery(node *ast.Node) bool {
	if !ast.IsThisIdentifier(node) {
		return false
	}
	for ast.IsQualifiedName(node.Parent) && node.Parent.AsQualifiedName().Left == node {
		node = node.Parent
	}
	return node.Parent.Kind == ast.KindTypeQuery
}

func getDeclarationModifierFlagsFromSymbol(s *ast.Symbol) ast.ModifierFlags {
	return getDeclarationModifierFlagsFromSymbolEx(s, false /*isWrite*/)
}

func getDeclarationModifierFlagsFromSymbolEx(s *ast.Symbol, isWrite bool) ast.ModifierFlags {
	if s.ValueDeclaration != nil {
		var declaration *ast.Node
		if isWrite {
			declaration = core.Find(s.Declarations, ast.IsSetAccessorDeclaration)
		}
		if declaration == nil && s.Flags&ast.SymbolFlagsGetAccessor != 0 {
			declaration = core.Find(s.Declarations, ast.IsGetAccessorDeclaration)
		}
		if declaration == nil {
			declaration = s.ValueDeclaration
		}
		flags := ast.GetCombinedModifierFlags(declaration)
		if s.Parent != nil && s.Parent.Flags&ast.SymbolFlagsClass != 0 {
			return flags
		}
		return flags & ^ast.ModifierFlagsAccessibilityModifier
	}
	if s.CheckFlags&ast.CheckFlagsSynthetic != 0 {
		var accessModifier ast.ModifierFlags
		switch {
		case s.CheckFlags&ast.CheckFlagsContainsPrivate != 0:
			accessModifier = ast.ModifierFlagsPrivate
		case s.CheckFlags&ast.CheckFlagsContainsPublic != 0:
			accessModifier = ast.ModifierFlagsPublic
		default:
			accessModifier = ast.ModifierFlagsProtected
		}
		var staticModifier ast.ModifierFlags
		if s.CheckFlags&ast.CheckFlagsContainsStatic != 0 {
			staticModifier = ast.ModifierFlagsStatic
		}
		return accessModifier | staticModifier
	}
	if s.Flags&ast.SymbolFlagsPrototype != 0 {
		return ast.ModifierFlagsPublic | ast.ModifierFlagsStatic
	}
	return ast.ModifierFlagsNone
}

func isExponentiationOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskAsteriskToken
}

func isMultiplicativeOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskToken || kind == ast.KindSlashToken || kind == ast.KindPercentToken
}

func isMultiplicativeOperatorOrHigher(kind ast.Kind) bool {
	return isExponentiationOperator(kind) || isMultiplicativeOperator(kind)
}

func isAdditiveOperator(kind ast.Kind) bool {
	return kind == ast.KindPlusToken || kind == ast.KindMinusToken
}

func isAdditiveOperatorOrHigher(kind ast.Kind) bool {
	return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind)
}

func isShiftOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanLessThanToken || kind == ast.KindGreaterThanGreaterThanToken ||
		kind == ast.KindGreaterThanGreaterThanGreaterThanToken
}

func isShiftOperatorOrHigher(kind ast.Kind) bool {
	return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind)
}

func isRelationalOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanToken || kind == ast.KindLessThanEqualsToken || kind == ast.KindGreaterThanToken ||
		kind == ast.KindGreaterThanEqualsToken || kind == ast.KindInstanceOfKeyword || kind == ast.KindInKeyword
}

func isRelationalOperatorOrHigher(kind ast.Kind) bool {
	return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind)
}

func isEqualityOperator(kind ast.Kind) bool {
	return kind == ast.KindEqualsEqualsToken || kind == ast.KindEqualsEqualsEqualsToken ||
		kind == ast.KindExclamationEqualsToken || kind == ast.KindExclamationEqualsEqualsToken
}

func isEqualityOperatorOrHigher(kind ast.Kind) bool {
	return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind)
}

func isBitwiseOperator(kind ast.Kind) bool {
	return kind == ast.KindAmpersandToken || kind == ast.KindBarToken || kind == ast.KindCaretToken
}

func isBitwiseOperatorOrHigher(kind ast.Kind) bool {
	return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind)
}

func isLogicalOperatorOrHigher(kind ast.Kind) bool {
	return ast.IsLogicalBinaryOperator(kind) || isBitwiseOperatorOrHigher(kind)
}

func isAssignmentOperatorOrHigher(kind ast.Kind) bool {
	return kind == ast.KindQuestionQuestionToken || isLogicalOperatorOrHigher(kind) || ast.IsAssignmentOperator(kind)
}

func isBinaryOperator(kind ast.Kind) bool {
	return isAssignmentOperatorOrHigher(kind) || kind == ast.KindCommaToken
}

func isObjectLiteralType(t *Type) bool {
	return t.objectFlags&ObjectFlagsObjectLiteral != 0
}

func isDeclarationReadonly(declaration *ast.Node) bool {
	return ast.GetCombinedModifierFlags(declaration)&ast.ModifierFlagsReadonly != 0 && !ast.IsParameterPropertyDeclaration(declaration, declaration.Parent)
}

type orderedSet[T comparable] struct {
	valuesByKey map[T]struct{}
	values      []T
}

func (s *orderedSet[T]) contains(value T) bool {
	_, ok := s.valuesByKey[value]
	return ok
}

func (s *orderedSet[T]) add(value T) {
	if s.valuesByKey == nil {
		s.valuesByKey = make(map[T]struct{})
	}
	s.valuesByKey[value] = struct{}{}
	s.values = append(s.values, value)
}

func getContainingFunction(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsFunctionLike)
}

func getContainingFunctionOrClassStaticBlock(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsFunctionLikeOrClassStaticBlockDeclaration)
}

func isTypeReferenceType(node *ast.Node) bool {
	return node.Kind == ast.KindTypeReference || node.Kind == ast.KindExpressionWithTypeArguments
}

func isNodeDescendantOf(node *ast.Node, ancestor *ast.Node) bool {
	for node != nil {
		if node == ancestor {
			return true
		}
		node = node.Parent
	}
	return false
}

func isTypeUsableAsPropertyName(t *Type) bool {
	return t.flags&TypeFlagsStringOrNumberLiteralOrUnique != 0
}

/**
 * Gets the symbolic name for a member from its type.
 */
func getPropertyNameFromType(t *Type) string {
	switch {
	case t.flags&TypeFlagsStringLiteral != 0:
		return t.AsLiteralType().value.(string)
	case t.flags&TypeFlagsNumberLiteral != 0:
		return t.AsLiteralType().value.(jsnum.Number).String()
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name
	}
	panic("Unhandled case in getPropertyNameFromType")
}

func isNumericLiteralName(name string) bool {
	// The intent of numeric names is that
	//     - they are names with text in a numeric form, and that
	//     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
	//         acquired by applying the abstract 'ToNumber' operation on the name's text.
	//
	// The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
	// In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
	//
	// Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
	// according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
	// Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
	// because their 'ToString' representation is not equal to their original text.
	// This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
	//
	// Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
	// The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
	// Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
	//
	// Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
	// This is desired behavior, because when indexing with them as numeric entities, you are indexing
	// with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
	return jsnum.FromString(name).String() == name
}

func getPropertyNameForPropertyNameNode(name *ast.Node) string {
	switch name.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral,
		ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindJsxNamespacedName:
		return name.Text()
	case ast.KindComputedPropertyName:
		nameExpression := name.AsComputedPropertyName().Expression
		if ast.IsStringOrNumericLiteralLike(nameExpression) {
			return nameExpression.Text()
		}
		if ast.IsSignedNumericLiteral(nameExpression) {
			text := nameExpression.AsPrefixUnaryExpression().Operand.Text()
			if nameExpression.AsPrefixUnaryExpression().Operator == ast.KindMinusToken {
				text = "-" + text
			}
			return text
		}
		return ast.InternalSymbolNameMissing
	}
	panic("Unhandled case in getPropertyNameForPropertyNameNode")
}

func isThisProperty(node *ast.Node) bool {
	return (ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node)) && node.Expression().Kind == ast.KindThisKeyword
}

func isValidNumberString(s string, roundTripOnly bool) bool {
	if s == "" {
		return false
	}
	n := jsnum.FromString(s)
	return !n.IsNaN() && !n.IsInf() && (!roundTripOnly || n.String() == s)
}

func isValidBigIntString(s string, roundTripOnly bool) bool {
	if s == "" {
		return false
	}
	scanner := scanner.NewScanner()
	scanner.SetSkipTrivia(false)
	success := true
	scanner.SetOnError(func(diagnostic *diagnostics.Message, start, length int, args ...any) {
		success = false
	})
	scanner.SetText(s + "n")
	result := scanner.Scan()
	negative := result == ast.KindMinusToken
	if negative {
		result = scanner.Scan()
	}
	flags := scanner.TokenFlags()
	// validate that
	// * scanning proceeded without error
	// * a bigint can be scanned, and that when it is scanned, it is
	// * the full length of the input string (so the scanner is one character beyond the augmented input length)
	// * it does not contain a numeric separator (the `BigInt` constructor does not accept a numeric separator in its input)
	return success && result == ast.KindBigIntLiteral && scanner.TokenEnd() == len(s)+1 && flags&ast.TokenFlagsContainsSeparator == 0 &&
		(!roundTripOnly || s == pseudoBigIntToString(jsnum.NewPseudoBigInt(jsnum.ParsePseudoBigInt(scanner.TokenValue()), negative)))
}

func isValidESSymbolDeclaration(node *ast.Node) bool {
	if ast.IsVariableDeclaration(node) {
		return ast.IsVarConst(node) && ast.IsIdentifier(node.AsVariableDeclaration().Name()) && isVariableDeclarationInVariableStatement(node)
	}
	if ast.IsPropertyDeclaration(node) {
		return hasReadonlyModifier(node) && ast.HasStaticModifier(node)
	}
	return ast.IsPropertySignatureDeclaration(node) && hasReadonlyModifier(node)
}

func isVariableDeclarationInVariableStatement(node *ast.Node) bool {
	return ast.IsVariableDeclarationList(node.Parent) && ast.IsVariableStatement(node.Parent.Parent)
}

func isKnownSymbol(symbol *ast.Symbol) bool {
	return isLateBoundName(symbol.Name)
}

func isLateBoundName(name string) bool {
	return len(name) >= 2 && name[0] == '\xfe' && name[1] == '@'
}

func getThisParameter(signature *ast.Node) *ast.Node {
	// callback tags do not currently support this parameters
	if len(signature.Parameters()) != 0 {
		thisParameter := signature.Parameters()[0]
		if ast.IsThisParameter(thisParameter) {
			return thisParameter
		}
	}
	return nil
}

func isObjectOrArrayLiteralType(t *Type) bool {
	return t.objectFlags&(ObjectFlagsObjectLiteral|ObjectFlagsArrayLiteral) != 0
}

func getContainingClassExcludingClassDecorators(node *ast.Node) *ast.ClassLikeDeclaration {
	decorator := ast.FindAncestorOrQuit(node.Parent, func(n *ast.Node) ast.FindAncestorResult {
		if ast.IsClassLike(n) {
			return ast.FindAncestorQuit
		}
		if ast.IsDecorator(n) {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	})
	if decorator != nil && ast.IsClassLike(decorator.Parent) {
		return ast.GetContainingClass(decorator.Parent)
	}
	if decorator != nil {
		return ast.GetContainingClass(decorator)
	}
	return ast.GetContainingClass(node)
}

func isThisTypeParameter(t *Type) bool {
	return t.flags&TypeFlagsTypeParameter != 0 && t.AsTypeParameter().isThisType
}

func isCallLikeExpression(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement, ast.KindCallExpression, ast.KindNewExpression,
		ast.KindTaggedTemplateExpression, ast.KindDecorator:
		return true
	}
	return false
}

func isCallOrNewExpression(node *ast.Node) bool {
	return ast.IsCallExpression(node) || ast.IsNewExpression(node)
}

func isClassInstanceProperty(node *ast.Node) bool {
	return node.Parent != nil && ast.IsClassLike(node.Parent) && ast.IsPropertyDeclaration(node) && !ast.HasAccessorModifier(node)
}

func isThisInitializedObjectBindingExpression(node *ast.Node) bool {
	return node != nil && (ast.IsShorthandPropertyAssignment(node) || ast.IsPropertyAssignment(node)) && ast.IsBinaryExpression(node.Parent.Parent) &&
		node.Parent.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&
		node.Parent.Parent.AsBinaryExpression().Right.Kind == ast.KindThisKeyword
}

func isThisInitializedDeclaration(node *ast.Node) bool {
	return node != nil && ast.IsVariableDeclaration(node) && node.AsVariableDeclaration().Initializer != nil && node.AsVariableDeclaration().Initializer.Kind == ast.KindThisKeyword
}

func isWriteOnlyAccess(node *ast.Node) bool {
	return accessKind(node) == AccessKindWrite
}

func isWriteAccess(node *ast.Node) bool {
	return accessKind(node) != AccessKindRead
}

type AccessKind int32

const (
	AccessKindRead      AccessKind = iota // Only reads from a variable
	AccessKindWrite                       // Only writes to a variable without ever reading it. E.g.: `x=1;`.
	AccessKindReadWrite                   // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
)

func accessKind(node *ast.Node) AccessKind {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindParenthesizedExpression:
		return accessKind(parent)
	case ast.KindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindBinaryExpression:
		if parent.AsBinaryExpression().Left == node {
			operator := parent.AsBinaryExpression().OperatorToken
			if ast.IsAssignmentOperator(operator.Kind) {
				if operator.Kind == ast.KindEqualsToken {
					return AccessKindWrite
				}
				return AccessKindReadWrite
			}
		}
		return AccessKindRead
	case ast.KindPropertyAccessExpression:
		if parent.AsPropertyAccessExpression().Name() != node {
			return AccessKindRead
		}
		return accessKind(parent)
	case ast.KindPropertyAssignment:
		parentAccess := accessKind(parent.Parent)
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().Name() {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case ast.KindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer {
			return AccessKindRead
		}
		return accessKind(parent.Parent)
	case ast.KindArrayLiteralExpression:
		return accessKind(parent)
	case ast.KindForInStatement, ast.KindForOfStatement:
		if node == parent.AsForInOrOfStatement().Initializer {
			return AccessKindWrite
		}
		return AccessKindRead
	}
	return AccessKindRead
}

func reverseAccessKind(a AccessKind) AccessKind {
	switch a {
	case AccessKindRead:
		return AccessKindWrite
	case AccessKindWrite:
		return AccessKindRead
	case AccessKindReadWrite:
		return AccessKindReadWrite
	}
	panic("Unhandled case in reverseAccessKind")
}

func isJsxOpeningLikeElement(node *ast.Node) bool {
	return ast.IsJsxOpeningElement(node) || ast.IsJsxSelfClosingElement(node)
}

// Deprecated in favor of `ast.IsObjectLiteralElement`
func isObjectLiteralElementLike(node *ast.Node) bool {
	return ast.IsObjectLiteralElement(node)
}

func isInfinityOrNaNString(name string) bool {
	return name == "Infinity" || name == "-Infinity" || name == "NaN"
}

func (c *Checker) isConstantVariable(symbol *ast.Symbol) bool {
	return symbol.Flags&ast.SymbolFlagsVariable != 0 && (c.getDeclarationNodeFlagsFromSymbol(symbol)&ast.NodeFlagsConstant) != 0
}

func (c *Checker) isParameterOrMutableLocalVariable(symbol *ast.Symbol) bool {
	// Return true if symbol is a parameter, a catch clause variable, or a mutable local variable
	if symbol.ValueDeclaration != nil {
		declaration := ast.GetRootDeclaration(symbol.ValueDeclaration)
		return declaration != nil && (ast.IsParameter(declaration) || ast.IsVariableDeclaration(declaration) && (ast.IsCatchClause(declaration.Parent) || c.isMutableLocalVariableDeclaration(declaration)))
	}
	return false
}

func (c *Checker) isMutableLocalVariableDeclaration(declaration *ast.Node) bool {
	// Return true if symbol is a non-exported and non-global `let` variable
	return declaration.Parent.Flags&ast.NodeFlagsLet != 0 && !(ast.GetCombinedModifierFlags(declaration)&ast.ModifierFlagsExport != 0 || declaration.Parent.Parent.Kind == ast.KindVariableStatement && ast.IsGlobalSourceFile(declaration.Parent.Parent.Parent))
}

func isInAmbientOrTypeNode(node *ast.Node) bool {
	return node.Flags&ast.NodeFlagsAmbient != 0 || ast.FindAncestor(node, func(n *ast.Node) bool {
		return ast.IsInterfaceDeclaration(n) || ast.IsTypeOrJSTypeAliasDeclaration(n) || ast.IsTypeLiteralNode(n)
	}) != nil
}

func isVariableLike(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindBindingElement, ast.KindEnumMember, ast.KindParameter, ast.KindPropertyAssignment, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindShorthandPropertyAssignment, ast.KindVariableDeclaration:
		return true
	}
	return false
}

func getAncestor(node *ast.Node, kind ast.Kind) *ast.Node {
	for node != nil && node.Kind != kind {
		node = node.Parent
	}
	return node
}

func isLiteralExpressionOfObject(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression, ast.KindRegularExpressionLiteral,
		ast.KindFunctionExpression, ast.KindClassExpression:
		return true
	}
	return false
}

func canHaveFlowNode(node *ast.Node) bool {
	return node.FlowNodeData() != nil
}

func isNonNullAccess(node *ast.Node) bool {
	return ast.IsAccessExpression(node) && ast.IsNonNullExpression(node.Expression())
}

func getTagNameOfNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindJsxOpeningElement:
		return node.AsJsxOpeningElement().TagName
	case ast.KindJsxClosingElement:
		return node.AsJsxClosingElement().TagName
	case ast.KindJsxSelfClosingElement:
		return node.AsJsxSelfClosingElement().TagName
	}
	panic("Unhandled case in getTagNameOfNode")
}

func getBindingElementPropertyName(node *ast.Node) *ast.Node {
	name := node.AsBindingElement().PropertyName
	if name != nil {
		return name
	}
	return node.Name()
}

func indexOfNode(nodes []*ast.Node, node *ast.Node) int {
	index, ok := slices.BinarySearchFunc(nodes, node, compareNodePositions)
	if ok {
		return index
	}
	return -1
}

func compareNodePositions(n1, n2 *ast.Node) int {
	return n1.Pos() - n2.Pos()
}

func hasContextSensitiveParameters(node *ast.Node) bool {
	// Functions with type parameters are not context sensitive.
	if node.TypeParameters() == nil {
		// Functions with any parameters that lack type annotations are context sensitive.
		if core.Some(node.Parameters(), func(p *ast.Node) bool { return p.Type() == nil }) {
			return true
		}
		if !ast.IsArrowFunction(node) {
			// If the first parameter is not an explicit 'this' parameter, then the function has
			// an implicit 'this' parameter which is subject to contextual typing.
			parameter := core.FirstOrNil(node.Parameters())
			if parameter == nil || !ast.IsThisParameter(parameter) {
				return true
			}
		}
	}
	return false
}

func isCallChain(node *ast.Node) bool {
	return ast.IsCallExpression(node) && node.Flags&ast.NodeFlagsOptionalChain != 0
}

func (c *Checker) callLikeExpressionMayHaveTypeArguments(node *ast.Node) bool {
	return isCallOrNewExpression(node) || ast.IsTaggedTemplateExpression(node) || isJsxOpeningLikeElement(node)
}

func isSuperCall(n *ast.Node) bool {
	return ast.IsCallExpression(n) && n.Expression().Kind == ast.KindSuperKeyword
}

/**
 * Determines whether a node is a property or element access expression for `super`.
 *
 * @internal
 */
func isSuperProperty(node *ast.Node) bool {
	return ast.IsAccessExpression(node) && node.Expression().Kind == ast.KindSuperKeyword
}

func getMembersOfDeclaration(node *ast.Node) []*ast.Node {
	switch node.Kind {
	case ast.KindInterfaceDeclaration:
		return node.AsInterfaceDeclaration().Members.Nodes
	case ast.KindClassDeclaration:
		return node.AsClassDeclaration().Members.Nodes
	case ast.KindClassExpression:
		return node.AsClassExpression().Members.Nodes
	case ast.KindTypeLiteral:
		return node.AsTypeLiteralNode().Members.Nodes
	case ast.KindObjectLiteralExpression:
		return node.AsObjectLiteralExpression().Properties.Nodes
	}
	return nil
}

type FunctionFlags uint32

const (
	FunctionFlagsNormal         FunctionFlags = 0
	FunctionFlagsGenerator      FunctionFlags = 1 << 0
	FunctionFlagsAsync          FunctionFlags = 1 << 1
	FunctionFlagsInvalid        FunctionFlags = 1 << 2
	FunctionFlagsAsyncGenerator FunctionFlags = FunctionFlagsAsync | FunctionFlagsGenerator
)

func getFunctionFlags(node *ast.Node) FunctionFlags {
	if node == nil {
		return FunctionFlagsInvalid
	}
	data := node.BodyData()
	if data == nil {
		return FunctionFlagsInvalid
	}
	flags := FunctionFlagsNormal
	switch node.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindMethodDeclaration:
		if data.AsteriskToken != nil {
			flags |= FunctionFlagsGenerator
		}
		fallthrough
	case ast.KindArrowFunction:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync) {
			flags |= FunctionFlagsAsync
		}
	}
	if data.Body == nil {
		flags |= FunctionFlagsInvalid
	}
	return flags
}

func getLeftSideOfImportEqualsOrExportAssignment(nodeOnRightSide *ast.EntityName) *ast.Node {
	for nodeOnRightSide.Parent.Kind == ast.KindQualifiedName {
		nodeOnRightSide = nodeOnRightSide.Parent
	}

	if nodeOnRightSide.Parent.Kind == ast.KindImportEqualsDeclaration {
		if nodeOnRightSide.Parent.AsImportEqualsDeclaration().ModuleReference == nodeOnRightSide {
			return nodeOnRightSide.Parent
		}
		return nil
	}

	if nodeOnRightSide.Parent.Kind == ast.KindExportAssignment {
		if nodeOnRightSide.Parent.AsExportAssignment().Expression == nodeOnRightSide {
			return nodeOnRightSide.Parent
		}
		return nil
	}

	return nil
}

func isInRightSideOfImportOrExportAssignment(node *ast.EntityName) bool {
	return getLeftSideOfImportEqualsOrExportAssignment(node) != nil
}

func isJsxIntrinsicTagName(tagName *ast.Node) bool {
	return ast.IsIdentifier(tagName) && IsIntrinsicJsxName(tagName.Text()) || ast.IsJsxNamespacedName(tagName)
}

func getContainingObjectLiteral(f *ast.SignatureDeclaration) *ast.Node {
	if (f.Kind == ast.KindMethodDeclaration ||
		f.Kind == ast.KindGetAccessor ||
		f.Kind == ast.KindSetAccessor) && f.Parent.Kind == ast.KindObjectLiteralExpression {
		return f.Parent
	} else if f.Kind == ast.KindFunctionExpression && f.Parent.Kind == ast.KindPropertyAssignment {
		return f.Parent.Parent
	}
	return nil
}

func isImportTypeQualifierPart(node *ast.Node) *ast.Node {
	parent := node.Parent
	for ast.IsQualifiedName(parent) {
		node = parent
		parent = parent.Parent
	}

	if parent != nil && parent.Kind == ast.KindImportType && parent.AsImportTypeNode().Qualifier == node {
		return parent
	}

	return nil
}

func isInNameOfExpressionWithTypeArguments(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindPropertyAccessExpression {
		node = node.Parent
	}

	return node.Parent.Kind == ast.KindExpressionWithTypeArguments
}

func getTypeParameterFromJSDoc(node *ast.Node) *ast.Node {
	name := node.Name().Text()
	typeParameters := node.Parent.Parent.Parent.TypeParameters()
	return core.Find(typeParameters, func(p *ast.Node) bool { return p.Name().Text() == name })
}

func isTypeDeclarationName(name *ast.Node) bool {
	return name.Kind == ast.KindIdentifier &&
		isTypeDeclaration(name.Parent) &&
		ast.GetNameOfDeclaration(name.Parent) == name
}

func getIndexSymbolFromSymbolTable(symbolTable ast.SymbolTable) *ast.Symbol {
	return symbolTable[ast.InternalSymbolNameIndex]
}

// Indicates whether the result of an `Expression` will be unused.
// NOTE: This requires a node with a valid `parent` pointer.
func expressionResultIsUnused(node *ast.Node) bool {
	for {
		parent := node.Parent
		// walk up parenthesized expressions, but keep a pointer to the top-most parenthesized expression
		if ast.IsParenthesizedExpression(parent) {
			node = parent
			continue
		}
		// result is unused in an expression statement, `void` expression, or the initializer or incrementer of a `for` loop
		if ast.IsExpressionStatement(parent) || ast.IsVoidExpression(parent) || ast.IsForStatement(parent) && (parent.Initializer() == node || parent.AsForStatement().Incrementor == node) {
			return true
		}
		if ast.IsBinaryExpression(parent) && parent.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
			// left side of comma is always unused
			if node == parent.AsBinaryExpression().Left {
				return true
			}
			// right side of comma is unused if parent is unused
			node = parent
			continue
		}
		return false
	}
}

func pseudoBigIntToString(value jsnum.PseudoBigInt) string {
	return value.String()
}

func getSuperContainer(node *ast.Node, stopOnFunctions bool) *ast.Node {
	for {
		node = node.Parent
		if node == nil {
			return nil
		}
		switch node.Kind {
		case ast.KindComputedPropertyName:
			node = node.Parent
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
			if !stopOnFunctions {
				continue
			}
			fallthrough
		case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor,
			ast.KindGetAccessor, ast.KindSetAccessor, ast.KindClassStaticBlockDeclaration:
			return node
		case ast.KindDecorator:
			// Decorators are always applied outside of the body of a class or method.
			if ast.IsParameter(node.Parent) && ast.IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if ast.IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		}
	}
}

func forEachYieldExpression(body *ast.Node, visitor func(expr *ast.Node)) {
	var traverse func(*ast.Node) bool
	traverse = func(node *ast.Node) bool {
		switch node.Kind {
		case ast.KindYieldExpression:
			visitor(node)
			operand := node.Expression()
			if operand != nil {
				traverse(operand)
			}
		case ast.KindEnumDeclaration, ast.KindInterfaceDeclaration, ast.KindModuleDeclaration, ast.KindTypeAliasDeclaration:
			// These are not allowed inside a generator now, but eventually they may be allowed
			// as local types. Regardless, skip them to avoid the work.
		default:
			if ast.IsFunctionLike(node) {
				if node.Name() != nil && ast.IsComputedPropertyName(node.Name()) {
					// Note that we will not include methods/accessors of a class because they would require
					// first descending into the class. This is by design.
					traverse(node.Name().Expression())
				}
			} else if !ast.IsPartOfTypeNode(node) {
				// This is the general case, which should include mostly expressions and statements.
				// Also includes NodeArrays.
				node.ForEachChild(traverse)
			}
		}
		return false
	}
	traverse(body)
}

func SkipTypeChecking(sourceFile *ast.SourceFile, options *core.CompilerOptions) bool {
	return options.NoCheck.IsTrue() ||
		options.SkipLibCheck.IsTrue() && sourceFile.IsDeclarationFile ||
		options.SkipDefaultLibCheck.IsTrue() && sourceFile.HasNoDefaultLib ||
		!canIncludeBindAndCheckDiagnostics(sourceFile, options)
}

func canIncludeBindAndCheckDiagnostics(sourceFile *ast.SourceFile, options *core.CompilerOptions) bool {
	if sourceFile.CheckJsDirective != nil && !sourceFile.CheckJsDirective.Enabled {
		return false
	}

	if sourceFile.ScriptKind == core.ScriptKindTS || sourceFile.ScriptKind == core.ScriptKindTSX || sourceFile.ScriptKind == core.ScriptKindExternal {
		return true
	}

	isJS := sourceFile.ScriptKind == core.ScriptKindJS || sourceFile.ScriptKind == core.ScriptKindJSX
	isCheckJS := isJS && isCheckJSEnabledForFile(sourceFile, options)
	isPlainJS := isPlainJSFile(sourceFile, options.CheckJs)

	// By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
	// - plain JS: .js files with no // ts-check and checkJs: undefined
	// - check JS: .js files with either // ts-check or checkJs: true
	// - external: files that are added by plugins
	return isPlainJS || isCheckJS || sourceFile.ScriptKind == core.ScriptKindDeferred
}

func isCheckJSEnabledForFile(sourceFile *ast.SourceFile, compilerOptions *core.CompilerOptions) bool {
	if sourceFile.CheckJsDirective != nil {
		return sourceFile.CheckJsDirective.Enabled
	}
	return compilerOptions.CheckJs == core.TSTrue
}

func isPlainJSFile(file *ast.SourceFile, checkJs core.Tristate) bool {
	return file != nil && (file.ScriptKind == core.ScriptKindJS || file.ScriptKind == core.ScriptKindJSX) && file.CheckJsDirective == nil && checkJs == core.TSUnknown
}

func getEnclosingContainer(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, func(n *ast.Node) bool {
		return binder.GetContainerFlags(n)&binder.ContainerFlagsIsContainer != 0
	})
}

func getDeclarationsOfKind(symbol *ast.Symbol, kind ast.Kind) []*ast.Node {
	return core.Filter(symbol.Declarations, func(d *ast.Node) bool { return d.Kind == kind })
}

func hasType(node *ast.Node) bool {
	return node.Type() != nil
}

func getNonRestParameterCount(sig *Signature) int {
	return len(sig.parameters) - core.IfElse(signatureHasRestParameter(sig), 1, 0)
}

func minAndMax[T any](slice []T, getValue func(value T) int) (int, int) {
	var minValue, maxValue int
	for i, element := range slice {
		value := getValue(element)
		if i == 0 {
			minValue = value
			maxValue = value
		} else {
			minValue = min(minValue, value)
			maxValue = max(maxValue, value)
		}
	}
	return minValue, maxValue
}

func isModuleExportsAccessExpression(node *ast.Node) bool {
	return ast.IsAccessExpression(node) && ast.IsModuleIdentifier(node.Expression()) && ast.GetElementOrPropertyAccessName(node) == "exports"
}

func getNonModifierTokenRangeOfNode(node *ast.Node) core.TextRange {
	pos := node.Pos()
	if node.Modifiers() != nil {
		if last := ast.FindLastVisibleNode(node.Modifiers().Nodes); last != nil {
			pos = last.Pos()
		}
	}
	return scanner.GetRangeOfTokenAtPosition(ast.GetSourceFileOfNode(node), pos)
}

type FeatureMapEntry struct {
	lib   string
	props []string
}

var getFeatureMap = sync.OnceValue(func() map[string][]FeatureMapEntry {
	return map[string][]FeatureMapEntry{
		"Array": {
			{lib: "es2015", props: []string{"find", "findIndex", "fill", "copyWithin", "entries", "keys", "values"}},
			{lib: "es2016", props: []string{"includes"}},
			{lib: "es2019", props: []string{"flat", "flatMap"}},
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Iterator": {
			{lib: "es2015", props: []string{}},
		},
		"AsyncIterator": {
			{lib: "es2015", props: []string{}},
		},
		"ArrayBuffer": {
			{lib: "es2024", props: []string{
				"maxByteLength",
				"resizable",
				"resize",
				"detached",
				"transfer",
				"transferToFixedLength",
			}},
		},
		"Atomics": {
			{lib: "es2017", props: []string{
				"add",
				"and",
				"compareExchange",
				"exchange",
				"isLockFree",
				"load",
				"or",
				"store",
				"sub",
				"wait",
				"notify",
				"xor",
			}},
			{lib: "es2024", props: []string{
				"waitAsync",
			}},
		},
		"SharedArrayBuffer": {
			{lib: "es2017", props: []string{
				"byteLength",
				"slice",
			}},
			{lib: "es2024", props: []string{
				"growable",
				"maxByteLength",
				"grow",
			}},
		},
		"AsyncIterable": {
			{lib: "es2018", props: []string{}},
		},
		"AsyncIterableIterator": {
			{lib: "es2018", props: []string{}},
		},
		"AsyncGenerator": {
			{lib: "es2018", props: []string{}},
		},
		"AsyncGeneratorFunction": {
			{lib: "es2018", props: []string{}},
		},
		"RegExp": {
			{lib: "es2015", props: []string{"flags", "sticky", "unicode"}},
			{lib: "es2018", props: []string{"dotAll"}},
			{lib: "es2024", props: []string{"unicodeSets"}},
		},
		"Reflect": {
			{lib: "es2015", props: []string{"apply", "construct", "defineProperty", "deleteProperty", "get", "getOwnPropertyDescriptor", "getPrototypeOf", "has", "isExtensible", "ownKeys", "preventExtensions", "set", "setPrototypeOf"}},
		},
		"ArrayConstructor": {
			{lib: "es2015", props: []string{"from", "of"}},
			{lib: "esnext", props: []string{"fromAsync"}},
		},
		"ObjectConstructor": {
			{lib: "es2015", props: []string{"assign", "getOwnPropertySymbols", "keys", "is", "setPrototypeOf"}},
			{lib: "es2017", props: []string{"values", "entries", "getOwnPropertyDescriptors"}},
			{lib: "es2019", props: []string{"fromEntries"}},
			{lib: "es2022", props: []string{"hasOwn"}},
			{lib: "es2024", props: []string{"groupBy"}},
		},
		"NumberConstructor": {
			{lib: "es2015", props: []string{"isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt"}},
		},
		"Math": {
			{lib: "es2015", props: []string{"clz32", "imul", "sign", "log10", "log2", "log1p", "expm1", "cosh", "sinh", "tanh", "acosh", "asinh", "atanh", "hypot", "trunc", "fround", "cbrt"}},
		},
		"Map": {
			{lib: "es2015", props: []string{"entries", "keys", "values"}},
		},
		"MapConstructor": {
			{lib: "es2024", props: []string{"groupBy"}},
		},
		"Set": {
			{lib: "es2015", props: []string{"entries", "keys", "values"}},
			{lib: "esnext", props: []string{
				"union",
				"intersection",
				"difference",
				"symmetricDifference",
				"isSubsetOf",
				"isSupersetOf",
				"isDisjointFrom",
			}},
		},
		"PromiseConstructor": {
			{lib: "es2015", props: []string{"all", "race", "reject", "resolve"}},
			{lib: "es2020", props: []string{"allSettled"}},
			{lib: "es2021", props: []string{"any"}},
			{lib: "es2024", props: []string{"withResolvers"}},
		},
		"Symbol": {
			{lib: "es2015", props: []string{"for", "keyFor"}},
			{lib: "es2019", props: []string{"description"}},
		},
		"WeakMap": {
			{lib: "es2015", props: []string{"entries", "keys", "values"}},
		},
		"WeakSet": {
			{lib: "es2015", props: []string{"entries", "keys", "values"}},
		},
		"String": {
			{lib: "es2015", props: []string{"codePointAt", "includes", "endsWith", "normalize", "repeat", "startsWith", "anchor", "big", "blink", "bold", "fixed", "fontcolor", "fontsize", "italics", "link", "small", "strike", "sub", "sup"}},
			{lib: "es2017", props: []string{"padStart", "padEnd"}},
			{lib: "es2019", props: []string{"trimStart", "trimEnd", "trimLeft", "trimRight"}},
			{lib: "es2020", props: []string{"matchAll"}},
			{lib: "es2021", props: []string{"replaceAll"}},
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2024", props: []string{"isWellFormed", "toWellFormed"}},
		},
		"StringConstructor": {
			{lib: "es2015", props: []string{"fromCodePoint", "raw"}},
		},
		"DateTimeFormat": {
			{lib: "es2017", props: []string{"formatToParts"}},
		},
		"Promise": {
			{lib: "es2015", props: []string{}},
			{lib: "es2018", props: []string{"finally"}},
		},
		"RegExpMatchArray": {
			{lib: "es2018", props: []string{"groups"}},
		},
		"RegExpExecArray": {
			{lib: "es2018", props: []string{"groups"}},
		},
		"Intl": {
			{lib: "es2018", props: []string{"PluralRules"}},
		},
		"NumberFormat": {
			{lib: "es2018", props: []string{"formatToParts"}},
		},
		"SymbolConstructor": {
			{lib: "es2020", props: []string{"matchAll"}},
			{lib: "esnext", props: []string{
				"metadata",
				"dispose",
				"asyncDispose",
			}},
		},
		"DataView": {
			{lib: "es2020", props: []string{"setBigInt64", "setBigUint64", "getBigInt64", "getBigUint64"}},
		},
		"BigInt": {
			{lib: "es2020", props: []string{}},
		},
		"RelativeTimeFormat": {
			{lib: "es2020", props: []string{"format", "formatToParts", "resolvedOptions"}},
		},
		"Int8Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Uint8Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Uint8ClampedArray": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Int16Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Uint16Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Int32Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Uint32Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Float32Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Float64Array": {
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"BigInt64Array": {
			{lib: "es2020", props: []string{}},
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"BigUint64Array": {
			{lib: "es2020", props: []string{}},
			{lib: "es2022", props: []string{"at"}},
			{lib: "es2023", props: []string{"findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"}},
		},
		"Error": {
			{lib: "es2022", props: []string{"cause"}},
		},
	}
})

func rangeOfTypeParameters(sourceFile *ast.SourceFile, typeParameters *ast.NodeList) core.TextRange {
	return core.NewTextRange(typeParameters.Pos()-1, min(len(sourceFile.Text()), scanner.SkipTrivia(sourceFile.Text(), typeParameters.End())+1))
}

func tryGetPropertyAccessOrIdentifierToString(expr *ast.Node) string {
	switch {
	case ast.IsPropertyAccessExpression(expr):
		baseStr := tryGetPropertyAccessOrIdentifierToString(expr.Expression())
		if baseStr != "" {
			return baseStr + "." + entityNameToString(expr.Name())
		}
	case ast.IsElementAccessExpression(expr):
		baseStr := tryGetPropertyAccessOrIdentifierToString(expr.Expression())
		if baseStr != "" && ast.IsPropertyName(expr.AsElementAccessExpression().ArgumentExpression) {
			return baseStr + "." + getPropertyNameForPropertyNameNode(expr.AsElementAccessExpression().ArgumentExpression)
		}
	case ast.IsIdentifier(expr):
		return expr.Text()
	case ast.IsJsxNamespacedName(expr):
		return entityNameToString(expr)
	}
	return ""
}

func getInvokedExpression(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindTaggedTemplateExpression:
		return node.AsTaggedTemplateExpression().Tag
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement:
		return node.TagName()
	case ast.KindBinaryExpression:
		return node.AsBinaryExpression().Right
	default:
		return node.Expression()
	}
}

func getFirstJSDocTag(node *ast.Node, f func(*ast.Node) bool) *ast.Node {
	for _, jsdoc := range node.JSDoc(nil) {
		tags := jsdoc.AsJSDoc().Tags
		if tags != nil {
			for _, tag := range tags.Nodes {
				if f(tag) {
					return tag
				}
			}
		}
	}
	return nil
}

func getJSDocDeprecatedTag(node *ast.Node) *ast.Node {
	return getFirstJSDocTag(node, ast.IsJSDocDeprecatedTag)
}

func allDeclarationsInSameSourceFile(symbol *ast.Symbol) bool {
	if len(symbol.Declarations) > 1 {
		var sourceFile *ast.SourceFile
		for i, d := range symbol.Declarations {
			if i == 0 {
				sourceFile = ast.GetSourceFileOfNode(d)
			} else if ast.GetSourceFileOfNode(d) != sourceFile {
				return false
			}
		}
	}
	return true
}

package checker

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
)

func (b *NodeBuilderImpl) reuseNode(node *ast.Node) *ast.Node {
	if node == nil {
		return node
	}

	return b.tryReuseExistingNodeHelper(node)
}

// a wrapper around `reuseNode` that handles renaming `new` to `"new"` so we don't accidentally emit constructor signatures when we don't mean to
func (b *NodeBuilderImpl) reuseName(node *ast.Node) *ast.Node {
	res := b.reuseNode(node)
	if res != nil && res.Kind == ast.KindIdentifier && node.AsIdentifier().Text == "new" {
		str := b.f.NewStringLiteral("new", ast.TokenFlagsNone)
		b.e.SetOriginal(str, res)
		return b.setTextRange(str, res)
	}
	return res
}

func (b *NodeBuilderImpl) reuseTypeNode(node *ast.Node) *ast.Node {
	if node == nil {
		return node
	}
	r := b.reuseNode(node)
	if r != nil {
		// After successful reuse during hover, probe the reused AST for expandable
		// type references so canIncreaseExpansionDepth is set even though
		// typeToTypeNode (and shouldExpandType) were never called.
		if b.ctx.maxExpansionDepth >= 0 && !b.ctx.canIncreaseExpansionDepth {
			b.walkNodeForExpandability(node)
		}
		return r
	}
	b.ctx.tracker.ReportInferenceFallback(node)
	t := b.getTypeFromTypeNode(node, false)
	return b.typeToTypeNode(t)
}

// walkNodeForExpandability walks a reused AST node tree, calling checkTypeExpandability
// on each type reference, type predicate, or import type node.
// Short-circuits once canIncreaseExpansionDepth is set.
func (b *NodeBuilderImpl) walkNodeForExpandability(node *ast.Node) {
	if b.ctx.canIncreaseExpansionDepth || node == nil {
		return
	}
	// Check these explicitly so we look into type arguments wehther or not they are in the tree or not.
	if ast.IsTypeReferenceNode(node) || ast.IsExpressionWithTypeArguments(node) || ast.IsTypePredicateNode(node) || ast.IsImportTypeNode(node) {
		t := b.getTypeFromTypeNode(node, false)
		if t != nil {
			b.checkTypeExpandability(t)
			if b.ctx.canIncreaseExpansionDepth {
				return
			}
		}
	}
	node.ForEachChild(func(child *ast.Node) bool {
		b.walkNodeForExpandability(child)
		return b.ctx.canIncreaseExpansionDepth
	})
}

type recoveryBoundary struct {
	ctx                 *NodeBuilderContext
	hadError            bool
	deferredReports     []func()
	oldTracker          nodebuilder.SymbolTracker
	oldTrackedSymbols   []*TrackedSymbolArgs
	trackedSymbols      []*TrackedSymbolArgs
	oldEncounteredError bool
}

func (b *recoveryBoundary) markError(f func()) {
	b.hadError = true
	if f != nil {
		b.deferredReports = append(b.deferredReports, f)
	}
}

type originalRecoveryScopeState struct {
	trackedSymbolsTop   int
	unreportedErrorsTop int
	hadError            bool
}

func (b *recoveryBoundary) startRecoveryScope() originalRecoveryScopeState {
	trackedSymbolsTop := len(b.ctx.trackedSymbols)
	unreportedErrorsTop := len(b.deferredReports)
	return originalRecoveryScopeState{trackedSymbolsTop: trackedSymbolsTop, unreportedErrorsTop: unreportedErrorsTop, hadError: b.hadError}
}

func (b *recoveryBoundary) endRecoveryScope(state originalRecoveryScopeState) {
	b.hadError = state.hadError
	b.ctx.trackedSymbols = b.ctx.trackedSymbols[0:state.trackedSymbolsTop]
	b.deferredReports = b.deferredReports[0:state.unreportedErrorsTop]
}

type wrappingTracker struct {
	wrapped nodebuilder.SymbolTracker
	bound   *recoveryBoundary
}

func (w *wrappingTracker) PopErrorFallbackNode() {
	w.wrapped.PopErrorFallbackNode()
}

func (w *wrappingTracker) PushErrorFallbackNode(node *ast.Node) {
	w.wrapped.PushErrorFallbackNode(node)
}

func (w *wrappingTracker) ReportCyclicStructureError() {
	w.bound.markError(w.wrapped.ReportCyclicStructureError)
}

func (w *wrappingTracker) ReportInaccessibleThisError() {
	w.bound.markError(w.wrapped.ReportInaccessibleThisError)
}

func (w *wrappingTracker) ReportInaccessibleUniqueSymbolError() {
	w.bound.markError(w.wrapped.ReportInaccessibleUniqueSymbolError)
}

func (w *wrappingTracker) ReportInferenceFallback(node *ast.Node) {
	w.wrapped.ReportInferenceFallback(node) // Should this also be deferred?
}

func (w *wrappingTracker) ReportLikelyUnsafeImportRequiredError(specifier string, symbolName string) {
	w.bound.markError(func() { w.wrapped.ReportLikelyUnsafeImportRequiredError(specifier, symbolName) })
}

func (w *wrappingTracker) ReportNonSerializableProperty(propertyName string) {
	w.bound.markError(func() { w.wrapped.ReportNonSerializableProperty(propertyName) })
}

func (w *wrappingTracker) ReportNonlocalAugmentation(containingFile *ast.SourceFile, parentSymbol *ast.Symbol, augmentingSymbol *ast.Symbol) {
	w.wrapped.ReportNonlocalAugmentation(containingFile, parentSymbol, augmentingSymbol) // Should this also be deferred?
}

func (w *wrappingTracker) ReportPrivateInBaseOfClassExpression(propertyName string) {
	w.bound.markError(func() { w.wrapped.ReportPrivateInBaseOfClassExpression(propertyName) })
}

func (w *wrappingTracker) ReportTruncationError() {
	w.wrapped.ReportTruncationError() // Should this also be deferred?
}

func (w *wrappingTracker) TrackSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
	w.bound.trackedSymbols = append(w.bound.trackedSymbols, &TrackedSymbolArgs{symbol, enclosingDeclaration, meaning})
	return false
}

func newWrappingTracker(inner nodebuilder.SymbolTracker, bound *recoveryBoundary) *wrappingTracker {
	return &wrappingTracker{
		wrapped: inner,
		bound:   bound,
	}
}

func (b *NodeBuilderImpl) createRecoveryBoundary() *recoveryBoundary {
	b.ch.checkNotCanceled()
	bound := &recoveryBoundary{ctx: b.ctx, oldTracker: b.ctx.tracker, oldTrackedSymbols: b.ctx.trackedSymbols, oldEncounteredError: b.ctx.encounteredError}
	newTracker := NewSymbolTrackerImpl(b.ctx, newWrappingTracker(b.ctx.tracker, bound))
	b.ctx.tracker = newTracker
	b.ctx.trackedSymbols = nil
	return bound
}

func (b *NodeBuilderImpl) finalizeBoundary(bound *recoveryBoundary) bool {
	b.ctx.tracker = bound.oldTracker
	b.ctx.trackedSymbols = bound.oldTrackedSymbols
	b.ctx.encounteredError = bound.oldEncounteredError

	for _, f := range bound.deferredReports {
		f()
	}
	if bound.hadError {
		return false
	}
	for _, a := range bound.trackedSymbols {
		b.ctx.tracker.TrackSymbol(a.symbol, a.enclosingDeclaration, a.meaning)
	}
	return true
}

func (b *NodeBuilderImpl) tryReuseExistingNodeHelper(existing *ast.TypeNode) *ast.TypeNode {
	bound := b.createRecoveryBoundary()
	var transformed *ast.Node
	v := getExistingNodeTreeVisitor(b, bound) // !!! TODO: Cache visitor and just reset bound+host builder? We try this for a *lot* of nodes.
	transformed = v.VisitNode(existing)
	if !b.finalizeBoundary(bound) {
		return nil
	}
	b.ctx.approximateLength += existing.Loc.End() - existing.Loc.Pos()
	return transformed
}

func (b *NodeBuilderImpl) getModuleSpecifierOverride(parent *ast.Node, lit *ast.Node) string {
	if b.ctx.enclosingFile != ast.GetSourceFileOfNode(lit) {
		mode := core.ResolutionModeNone
		if parent.AsImportTypeNode().Attributes != nil {
			mode = b.ch.getResolutionModeOverride(parent.AsImportTypeNode().Attributes.AsImportAttributes(), false)
		}
		name := lit.Text()
		originalName := name
		nodeSymbol := b.ch.symbolNodeLinks.Get(parent).resolvedSymbol
		meaning := ast.SymbolFlagsType
		if parent.AsImportTypeNode().IsTypeOf {
			meaning = ast.SymbolFlagsValue
		}
		var parentSymbol *ast.Symbol
		if nodeSymbol != nil && b.ch.IsSymbolAccessible(nodeSymbol, b.ctx.enclosingDeclaration, meaning, false).Accessibility == printer.SymbolAccessibilityAccessible {
			parentSymbol = b.lookupSymbolChain(nodeSymbol, meaning, true)[0]
		}
		if parentSymbol != nil && IsExternalModuleSymbol(parentSymbol) {
			name = b.getSpecifierForModuleSymbol(parentSymbol, mode)
		} else {
			targetFile := b.ch.getExternalModuleFileFromDeclaration(parent)
			if targetFile != nil {
				name = b.getSpecifierForModuleSymbol(targetFile.Symbol, mode)
			}
		}
		if len(name) > 0 && strings.Contains(name, "/node_modules/") {
			b.ctx.encounteredError = true
			b.ctx.tracker.ReportLikelyUnsafeImportRequiredError(name, "")
		}
		if name != originalName {
			return name
		}
	}
	return ""
}

func (b *NodeBuilderImpl) rewriteModuleSpecifier(parent *ast.Node, lit *ast.Node) *ast.Node {
	newName := b.getModuleSpecifierOverride(parent, lit)
	if len(newName) == 0 {
		return lit
	}
	res := b.f.NewStringLiteral(newName, ast.TokenFlagsNone)
	b.e.SetOriginal(res, lit)
	return res
}

func (b *NodeBuilderImpl) getEnclosingDeclarationIgnoringFakeScope() *ast.Node {
	enc := b.ctx.enclosingDeclaration
	for enc != nil && b.links.Get(enc).fakeScopeForSignatureDeclaration != nil {
		enc = enc.Parent
	}
	return enc
}

func getExistingNodeTreeVisitor(b *NodeBuilderImpl, bound *recoveryBoundary) *ast.NodeVisitor {
	// TODO: wrap all these closures into methods on an object so we can guarantee we reuse the same memory on each invocation by reusing/resetting the object
	// instead of re-closing-over all of these each time we need a visitor. In theory the compiler could handle this, but in practice closure inlining hasn't been reliable
	var visitor *ast.NodeVisitor
	// note: also handles renaming type parameters renamed within the current context
	attachSymbolToLeftmostIdentifier := func(leftmost *ast.Node, node *ast.Node, sym *ast.Symbol) *ast.Node {
		var vis *ast.NodeVisitor
		visitorFunc := func(node *ast.Node) *ast.Node {
			if node == leftmost {
				var type_ *Type
				var name *ast.Node
				if sym != nil {
					type_ = b.ch.getDeclaredTypeOfSymbol(sym)
					if sym.Flags&ast.SymbolFlagsTypeParameter != 0 {
						name = b.typeParameterToName(type_).AsNode()
					}
				}
				if name == nil {
					name = b.newIdentifier(node.Text(), sym)
				}
				name = b.setTextRange(name, node)
				b.e.AddEmitFlags(name, printer.EFNoAsciiEscaping)
				return name
			}
			return b.setTextRange(node.VisitEachChild(vis), node)
		}
		vis = ast.NewNodeVisitor(visitorFunc, b.f, ast.NodeVisitorHooks{})
		return visitorFunc(node)
	}
	trackExistingEntityName := func(node *ast.Node, overrideEnclosing *ast.Node) (bool, *ast.Node, *ast.Symbol) {
		enclosingDeclaration := b.ctx.enclosingDeclaration
		if overrideEnclosing != nil {
			enclosingDeclaration = overrideEnclosing
		}
		introducesError := false
		leftmost := ast.GetFirstIdentifier(node)
		if ast.IsInJSFile(node) && (ast.IsExportsIdentifier(leftmost) || ast.IsModuleExportsAccessExpression(leftmost.Parent) || (ast.IsQualifiedName(leftmost.Parent) && ast.IsModuleIdentifier(leftmost.Parent.AsQualifiedName().Left) && ast.IsExportsIdentifier(leftmost.Parent.AsQualifiedName().Right))) {
			introducesError = true
			return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), nil
		}
		meaning := getMeaningOfEntityNameReference(node)
		var sym *ast.Symbol
		if ast.IsThisIdentifier(leftmost) {
			// `this` isn't a bindable identifier - skip resolution, find a relevant `this` symbol directly and avoid exhaustive scope traversal
			sym = b.ch.getSymbolOfDeclaration(b.ch.getThisContainer(leftmost, false, false))
			if b.ch.IsSymbolAccessible(sym, leftmost, meaning, false).Accessibility != printer.SymbolAccessibilityAccessible {
				introducesError = true
				b.ctx.tracker.ReportInaccessibleThisError()
			}
			return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
		}
		sym = b.ch.resolveEntityName(leftmost, meaning, true, true, nil)
		if b.ctx.enclosingDeclaration != nil && !(sym != nil && sym.Flags&ast.SymbolFlagsTypeParameter != 0) {
			sym = b.ch.getExportSymbolOfValueSymbolIfExported(sym)
			// Some declarations may be transplanted to a new location.
			// When this happens we need to make sure that the name has the same meaning at both locations
			// We also check for the unknownSymbol because when we create a fake scope some parameters may actually not be usable
			// either because they are the expanded rest parameter,
			// or because they are the newly added parameters from the tuple, which might have different meanings in the original context
			symAtLocation := b.ch.resolveEntityName(leftmost, meaning, true, true, b.ctx.enclosingDeclaration)
			if
			// Check for unusable parameters symbols
			symAtLocation == b.ch.unknownSymbol ||
				// If the symbol is not found, but was not found in the original scope either we probably have an error, don't reuse the node
				(symAtLocation == nil && sym != nil) ||
				// If the symbol is found both in declaration scope and in current scope then it should point to the same reference
				(symAtLocation != nil && sym != nil && b.ch.getSymbolIfSameReference(b.ch.getExportSymbolOfValueSymbolIfExported(symAtLocation), sym) == nil) {
				// In isolated declaration we will not do rest parameter expansion so there is no need to report on these.
				if symAtLocation != b.ch.unknownSymbol {
					b.ctx.tracker.ReportInferenceFallback(node)
				}
				introducesError = true
				return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), sym
			} else {
				sym = symAtLocation
			}
		}

		if sym != nil {
			// If a parameter is resolvable in the current context it is also visible, so no need to go to symbol accesibility
			if sym.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 && sym.ValueDeclaration != nil {
				if ast.IsPartOfParameterDeclaration(sym.ValueDeclaration) || ast.IsJSDocParameterTag(sym.ValueDeclaration) {
					return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
				}
			}
			if sym.Flags&ast.SymbolFlagsTypeParameter == 0 /* Type parameters are visible in the current context if they are are resolvable */ && !ast.IsDeclarationName(node) &&
				b.ch.IsSymbolAccessible(sym, enclosingDeclaration, meaning, false).Accessibility != printer.SymbolAccessibilityAccessible {
				b.ctx.tracker.ReportInferenceFallback(node)
				introducesError = true
			} else {
				b.ctx.tracker.TrackSymbol(sym, enclosingDeclaration, meaning)
			}
			return introducesError, attachSymbolToLeftmostIdentifier(leftmost, node, sym), nil
		}
		return introducesError, b.setTextRange(b.f.DeepCloneNode(node), node), nil
	}
	var tryVisitSimpleTypeNode func(node *ast.Node) *ast.Node
	tryVisitIndexedAccess := func(node *ast.Node) *ast.Node {
		resultObjectType := tryVisitSimpleTypeNode(node.AsIndexedAccessTypeNode().ObjectType)
		if resultObjectType == nil {
			return nil
		}
		return b.setTextRange(b.f.UpdateIndexedAccessTypeNode(node.AsIndexedAccessTypeNode(), resultObjectType, visitor.VisitNode(node.AsIndexedAccessTypeNode().IndexType)), node)
	}
	tryVisitKeyOf := func(node *ast.Node) *ast.Node {
		to := node.AsTypeOperatorNode()
		t := tryVisitSimpleTypeNode(to.Type)
		if t == nil {
			return nil
		}
		return b.setTextRange(b.f.UpdateTypeOperatorNode(to, to.Operator, t), node)
	}
	tryVisitTypeQuery := func(node *ast.Node) *ast.Node {
		introducesError, exprName, _ := trackExistingEntityName(node.AsTypeQueryNode().ExprName, nil)
		if !introducesError {
			return b.setTextRange(b.f.UpdateTypeQueryNode(
				node.AsTypeQueryNode(),
				exprName,
				visitor.VisitNodes(node.AsTypeQueryNode().TypeArguments),
			), node)
		}

		serializedName := b.serializeTypeName(node.AsTypeQueryNode().ExprName, true, visitor.VisitNodes(node.AsTypeQueryNode().TypeArguments))
		if serializedName != nil {
			return b.setTextRange(serializedName, node.AsTypeQueryNode().ExprName)
		}
		return nil
	}
	tryVisitTypeReference := func(node *ast.Node) *ast.Node {
		if ast.IsConstTypeReference(node) {
			return nil
		}
		s := b.ch.symbolNodeLinks.Get(node).resolvedSymbol
		if s == nil {
			return nil // ???
		}
		if s.Flags&ast.SymbolFlagsTypeParameter != 0 {
			declaredType := b.ch.getDeclaredTypeOfSymbol(s)
			if b.ctx.mapper != nil && b.ctx.mapper.Map(declaredType) != declaredType {
				return nil // refers to type parameter remapped by context (TODO improvement: just return the remapped param name?)
			}
		}
		// TODO: further bails in JSdoc - not required anymore due to dropped behavior/reparser?
		introducesError, newName, _ := trackExistingEntityName(node.AsTypeReferenceNode().TypeName, nil)
		if !introducesError {
			typeArguments := visitor.VisitNodes(node.AsTypeReferenceNode().TypeArguments)
			return b.setTextRange(b.f.UpdateTypeReferenceNode(
				node.AsTypeReferenceNode(),
				newName,
				typeArguments,
			), node)
		} else {
			serializedName := b.serializeTypeName(node.AsTypeReferenceNode().TypeName, false, visitor.VisitNodes(node.AsTypeReferenceNode().TypeArguments))
			if serializedName != nil {
				return b.setTextRange(serializedName, node.AsTypeReferenceNode().TypeName)
			}
			return nil
		}
	}
	tryVisitSimpleTypeNode = func(node *ast.Node) *ast.Node {
		innerNode := ast.SkipParentheses(node)
		switch innerNode.Kind {
		case ast.KindTypeReference:
			return tryVisitTypeReference(innerNode)
		case ast.KindTypeQuery:
			return tryVisitTypeQuery(innerNode)
		case ast.KindIndexedAccessType:
			return tryVisitIndexedAccess(innerNode)
		case ast.KindTypeOperator:
			if innerNode.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword {
				return tryVisitKeyOf(innerNode)
			}
		}
		return visitor.VisitNode(node)
	}
	visitExistingNodeTreeSymbolsWorker := func(node *ast.Node) *ast.Node {
		factory := b.f
		// !!! TODO: the reparser *should* make all the jsdoc remapping logic here redundant,
		// assuming we only ever try to preserve reparsed nodes and never walk back to the jsdoc "originals"
		// accidentally.
		// Still, what can be ported of the logic is here, just in case.
		// Begin JSDoc handling
		if node.Kind == ast.KindJSDocTypeExpression {
			// Unwrap JSDocTypeExpressions
			return visitor.VisitNode(node.AsJSDocTypeExpression().Type)
		}
		// !!! TODO: We don't _actually_ support jsdoc namepath types, emit `any` instead; verify we handle as gracefully as strada
		if node.Kind == ast.KindJSDocAllType /* || node.Kind == ast.JSDocNamepathType */ {
			return factory.NewKeywordTypeNode(ast.KindAnyKeyword)
		}
		// !!! TODO: verify JSDocUnknwonType is hopefully just parsed into `unknown` upfront; the kind no longer exists
		// if node.Kind == ast.KindJSDocUnknownType {
		// 	return factory.NewKeywordTypeNode(ast.KindUnknownKeyword)
		// }
		if node.Kind == ast.KindJSDocNullableType {
			unionMembers := []*ast.Node{
				visitor.VisitNode(node.AsJSDocNullableType().Type),
				factory.NewLiteralTypeNode(factory.NewKeywordExpression(ast.KindNullKeyword)),
			}
			return factory.NewUnionTypeNode(factory.NewNodeList(unionMembers))
		}
		if node.Kind == ast.KindJSDocOptionalType {
			unionMembers := []*ast.Node{
				visitor.VisitNode(node.AsJSDocOptionalType().Type),
				factory.NewKeywordTypeNode(ast.KindUndefinedKeyword),
			}
			return factory.NewUnionTypeNode(factory.NewNodeList(unionMembers))
		}
		if node.Kind == ast.KindJSDocNonNullableType {
			// Unwrap
			return visitor.VisitNode(node.AsJSDocNonNullableType().Type)
		}
		if node.Kind == ast.KindJSDocVariadicType { // !!! TODO: verify this matches how jsdoc variadics are actually handled now?
			return factory.NewArrayTypeNode(visitor.VisitNode(node.AsJSDocVariadicType().Type))
		}
		if node.Kind == ast.KindJSDocTypeLiteral {
			var members []*ast.Node
			for _, t := range node.AsJSDocTypeLiteral().JSDocPropertyTags {
				n := t.Name()
				var targetName *ast.Node
				if ast.IsIdentifier(n) {
					targetName = n
				} else {
					targetName = n.AsQualifiedName().Right // !!! TODO: without typesystem backup, doing this cast unguarded seems really suspect, even though it is what strada does
				}
				name := visitor.VisitNode(targetName)
				shouldBeOptional := t.AsJSDocParameterOrPropertyTag().IsBracketed || (t.TypeExpression() != nil && t.TypeExpression().Kind == ast.KindJSDocOptionalType)
				var question *ast.Node
				if shouldBeOptional {
					question = factory.NewToken(ast.KindQuestionToken)
				}
				ty := visitor.VisitNode(t.TypeExpression()) // !!! TODO: alternate lookup locations for the type? serialize on demand if it doesn't serialze? strada does something funky here.

				members = append(members, factory.NewPropertySignatureDeclaration(nil, name, question, ty, nil))
			}
			return factory.NewTypeLiteralNode(factory.NewNodeList(members))
		}
		// if (ast.IsExpressionWithTypeArguments(node) || ast.IsTypeReferenceNode(node)) && ast.IsJSDocIndexSignature(node) { /// !!! TODO: JSDocIndexSignature handling hasn't been ported - readd if it's readded
		// 	args := node.TypeArguments()
		// 	if len(args) != 2 {
		// 		return factory.NewKeywordTypeNode(ast.KindAnyKeyword) // shouldn't be flagged as a jsdoc index signature in the first place
		// 	}
		// 	return factory.NewTypeLiteralNode(factory.NewNodeList([]*ast.Node{
		// 		factory.NewIndexSignatureDeclaration(nil, factory.NewNodeList([]*ast.Node{
		// 			factory.NewParameterDeclaration(nil, nil, factory.NewIdentifier("x"), nil, visitor.VisitNode(args[0]), nil),
		// 		}), visitor.VisitNode(args[1])),
		// 	}))
		// }
		// if node.Kind == ast.KindJSDocFunctionType {} // !!! no longer exists
		// End JSDoc handling

		if ast.IsTypeReferenceNode(node) && ast.IsIdentifier(node.AsTypeReferenceNode().TypeName) && node.AsTypeReferenceNode().TypeName.AsIdentifier().Text == "" {
			replacement := factory.NewKeywordTypeNode(ast.KindAnyKeyword)
			b.e.SetOriginal(replacement, node)
			return replacement
		}
		if ast.IsThisTypeNode(node) {
			// TODO: strada never marks `this` type nodes as an error - it calls `canReuseTypeNode` on it, but that function always returns `true` for `this`
			// type nodes, which in turn fails to verify that the `this` context is the same between the source and target locations. The conservative thing is to
			// _never_ copy a `this`. We could improve this, but strada is *definitely* wrong and overbroad here. (note that we're inling uses of `canReuseTypeNode`
			// in corsa because of the unfurled host structure meaning we don't need to defer to a host object for functionality it needs)
			// bound.markError(nil) // conservative approach
			return node
		}
		if ast.IsTypeParameterDeclaration(node) {
			_, newName, _ := trackExistingEntityName(node.Name(), nil)
			return factory.UpdateTypeParameterDeclaration(
				node.AsTypeParameterDeclaration(),
				visitor.VisitModifiers(node.Modifiers()),
				newName,
				visitor.VisitNode(node.AsTypeParameterDeclaration().Constraint),
				visitor.VisitNode(node.AsTypeParameterDeclaration().Expression),
				visitor.VisitNode(node.AsTypeParameterDeclaration().DefaultType),
			)
		}
		if ast.IsIndexedAccessTypeNode(node) {
			result := tryVisitIndexedAccess(node)
			if result != nil {
				return result
			}
			bound.markError(nil)
			return node
		}
		if ast.IsTypeReferenceNode(node) {
			result := tryVisitTypeReference(node)
			if result != nil {
				return result
			}
			bound.markError(nil)
			return node
		}
		if ast.IsTypeQueryNode(node) {
			result := tryVisitTypeQuery(node)
			if result != nil {
				return result
			}
			bound.markError(nil)
			return node
		}
		if ast.IsTypeOperatorNode(node) {
			if node.AsTypeOperatorNode().Operator == ast.KindUniqueKeyword && node.AsTypeOperatorNode().Type.Kind == ast.KindSymbolKeyword {
				nonFakeEnclosing := b.getEnclosingDeclarationIgnoringFakeScope()
				sameScope := ast.FindAncestor(node, func(a *ast.Node) bool {
					return a == nonFakeEnclosing
				})
				if sameScope == nil {
					bound.markError(nil)
					return node
				}
			} else if node.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword {
				result := tryVisitKeyOf(node)
				if result != nil {
					return result
				}
				bound.markError(nil)
				return node
			}
		}
		if ast.IsLiteralImportTypeNode(node) {
			// assert keyword in imported attributes is deprecated, so we don't reuse types that contain it
			// Ex: import("pkg", { assert: {} }
			if node.AsImportTypeNode().Attributes != nil && node.AsImportTypeNode().Attributes.AsImportAttributes().Token == ast.KindAssertKeyword {
				bound.markError(nil)
				return node
			}
			t := b.getTypeFromTypeNode(node, true)
			if t == nil {
				bound.markError(nil)
				return node
			}
			if ast.IsInJSFile(node) {
				// !!! TODO: invalidate node reuse if js fallback logic used in type param list/typeof lookup (but isn't this logic gone?)
				// s := b.ch.symbolNodeLinks.Get(node).resolvedSymbol
			}
			originalSpec := node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal
			specifier := b.rewriteModuleSpecifier(node, originalSpec)
			if originalSpec == specifier {
				specifier = visitor.VisitNode(specifier) // visit node if not replaced
			}
			arg := node.AsImportTypeNode().Argument
			if specifier != originalSpec {
				arg = factory.NewLiteralTypeNode(specifier)
			}
			return factory.UpdateImportTypeNode(
				node.AsImportTypeNode(),
				node.AsImportTypeNode().IsTypeOf,
				arg,
				visitor.VisitNode(node.AsImportTypeNode().Attributes),
				visitor.VisitNode(node.AsImportTypeNode().Qualifier),
				visitor.VisitNodes(node.AsImportTypeNode().TypeArguments),
			)
		}
		if node.Name() != nil && node.Name().Kind == ast.KindComputedPropertyName && !b.ch.hasLateBindableName(node) {
			if !ast.HasDynamicName(node) {
				// !!! TODO: This matches strada, but rather than recursing, this should probably fall down to later cases.
				// Take a `["field"]` property declaration - it still needs a `: any` appended to it
				return visitor.VisitEachChild(node)
			}
			// !!! TODO: this condition matches strada, but it just seems wrong? Or at the very least extraordinarily approximate, and doesn't flag a builder error...
			shouldRemoveDeclaration := !((b.ctx.internalFlags&nodebuilder.InternalFlagsAllowUnresolvedNames != 0) && ast.IsEntityNameExpression(node.Name().AsComputedPropertyName().Expression) && (b.ch.checkComputedPropertyName(node.Name()).flags&TypeFlagsAny != 0))
			if shouldRemoveDeclaration {
				return nil
			}
		}
		if (ast.IsFunctionLike(node) && node.Type() == nil) || (ast.IsPropertyDeclaration(node) && node.Type() == nil && node.Initializer() == nil) || (ast.IsPropertySignatureDeclaration(node) && node.Type() == nil && node.Initializer() == nil) || (ast.IsParameterDeclaration(node) && node.Type() == nil && node.Initializer() == nil) {
			visited := visitor.VisitEachChild(node)
			if visited == node {
				visited = b.setTextRange(node.Clone(factory), node)
			}
			node = visited
			newType := factory.NewKeywordTypeNode(ast.KindAnyKeyword)
			switch node.Kind {
			case ast.KindPropertyDeclaration:
				return factory.UpdatePropertyDeclaration(
					node.AsPropertyDeclaration(),
					node.Modifiers(),
					node.Name(),
					node.PostfixToken(),
					newType,
					nil,
				)
			case ast.KindPropertySignature:
				return factory.UpdatePropertySignatureDeclaration(
					node.AsPropertySignatureDeclaration(),
					node.Modifiers(),
					node.Name(),
					node.PostfixToken(),
					newType,
					nil,
				)
			case ast.KindParameter:
				return factory.UpdateParameterDeclaration(
					node.AsParameterDeclaration(),
					nil,
					node.AsParameterDeclaration().DotDotDotToken,
					node.Name(),
					node.AsParameterDeclaration().QuestionToken,
					newType,
					nil,
				)
			case ast.KindMethodSignature:
				return factory.UpdateMethodSignatureDeclaration(
					node.AsMethodSignatureDeclaration(),
					node.Modifiers(),
					node.Name(),
					node.AsMethodSignatureDeclaration().PostfixToken,
					node.AsMethodSignatureDeclaration().TypeParameters,
					node.AsMethodSignatureDeclaration().Parameters,
					newType,
				)
			case ast.KindCallSignature:
				return factory.UpdateCallSignatureDeclaration(
					node.AsCallSignatureDeclaration(),
					node.AsCallSignatureDeclaration().TypeParameters,
					node.AsCallSignatureDeclaration().Parameters,
					newType,
				)
			case ast.KindJSDocSignature:
				return factory.UpdateJSDocSignature(
					node.AsJSDocSignature(),
					node.AsJSDocSignature().TypeParameters,
					node.AsJSDocSignature().Parameters,
					newType,
				)
			case ast.KindConstructSignature:
				return factory.UpdateConstructSignatureDeclaration(
					node.AsConstructSignatureDeclaration(),
					node.AsConstructSignatureDeclaration().TypeParameters,
					node.AsConstructSignatureDeclaration().Parameters,
					newType,
				)
			case ast.KindIndexSignature:
				return factory.UpdateIndexSignatureDeclaration(
					node.AsIndexSignatureDeclaration(),
					node.Modifiers(),
					node.AsIndexSignatureDeclaration().Parameters,
					newType,
				)
			case ast.KindFunctionType:
				return factory.UpdateFunctionTypeNode(
					node.AsFunctionTypeNode(),
					node.AsFunctionTypeNode().TypeParameters,
					node.AsFunctionTypeNode().Parameters,
					newType,
				)
			case ast.KindConstructorType:
				return factory.UpdateConstructorTypeNode(
					node.AsConstructorTypeNode(),
					node.Modifiers(),
					node.AsConstructorTypeNode().TypeParameters,
					node.AsConstructorTypeNode().Parameters,
					newType,
				)
			}
		}
		if ast.IsComputedPropertyName(node) && ast.IsEntityNameExpression(node.AsComputedPropertyName().Expression) {
			introducesError, result, _ := trackExistingEntityName(node.AsComputedPropertyName().Expression, nil)
			if !introducesError {
				return factory.UpdateComputedPropertyName(node.AsComputedPropertyName(), result)
			} else {
				// !!! TODO: rewriting computed names based on evaluator/typecheck results?
				// strada's behavior seems hard to justify vs marking an error and moving on
				bound.markError(nil)
				return visitor.VisitEachChild(node)
			}
		}
		if ast.IsTypePredicateNode(node) {
			var parameterName *ast.Node
			if ast.IsIdentifier(node.AsTypePredicateNode().ParameterName) {
				introducesError, result, _ := trackExistingEntityName(node.AsTypePredicateNode().ParameterName, nil)
				// Should not usually happen the only case is when a type predicate comes from a JSDoc type annotation with it's own parameter symbol definition.
				// /** @type {(v: unknown) => v is undefined} */
				// const isUndef = v => v === undefined;
				if introducesError {
					bound.markError(nil)
				}
				parameterName = result
			} else {
				parameterName = node.AsTypePredicateNode().ParameterName.Clone(factory)
			}
			return factory.UpdateTypePredicateNode(
				node.AsTypePredicateNode(),
				visitor.VisitNode(node.AsTypePredicateNode().AssertsModifier),
				parameterName,
				visitor.VisitNode(node.AsTypePredicateNode().Type),
			)
		}
		if ast.IsConditionalTypeNode(node) {
			checkType := visitor.VisitNode(node.AsConditionalTypeNode().CheckType)
			dispose := b.enterNewScope(node, nil, b.ch.getInferTypeParameters(node), nil, nil)
			extendsType := visitor.VisitNode(node.AsConditionalTypeNode().ExtendsType)
			trueType := visitor.VisitNode(node.AsConditionalTypeNode().TrueType)
			dispose()
			falseType := visitor.VisitNode(node.AsConditionalTypeNode().FalseType)
			return factory.UpdateConditionalTypeNode(
				node.AsConditionalTypeNode(),
				checkType,
				extendsType,
				trueType,
				falseType,
			)
		}

		// style applications
		if ast.IsTupleTypeNode(node) || (b.ctx.flags&nodebuilder.FlagsMultilineObjectLiterals == 0 && ast.IsTypeLiteralNode(node)) || ast.IsMappedTypeNode(node) {
			// make tuples/types/mappedtypes single line
			res := visitor.VisitEachChild(node)
			if res == node {
				res = res.Clone(factory)
				res = b.setTextRange(res, node)
			}
			b.e.AddEmitFlags(res, printer.EFSingleLine)
			return res
		}

		if ast.IsStringLiteral(node) && b.ctx.flags&nodebuilder.FlagsUseSingleQuotesForStringLiteralType != 0 && node.AsStringLiteral().TokenFlags&ast.TokenFlagsSingleQuote == 0 {
			// set single quote on string literals
			c := node.Clone(b.f)
			c.AsStringLiteral().TokenFlags ^= ast.TokenFlagsSingleQuote
			return c
		}

		return visitor.VisitEachChild(node)
	}
	nonLocalNode := true
	visitor = ast.NewNodeVisitor(func(node *ast.Node) *ast.Node {
		// If there was an error in a sibling node bail early, the result will be discarded anyway
		if bound.hadError {
			return node
		}
		recover_ := bound.startRecoveryScope()
		introducesNewScope := ast.IsFunctionLike(node) || ast.IsMappedTypeNode(node)
		var exit func()
		if introducesNewScope {
			var params []*ast.Symbol
			var typeParams []*Type
			if ast.IsFunctionLike(node) {
				sig := b.ch.getSignatureFromDeclaration(node)
				params = sig.parameters
				typeParams = sig.typeParameters
			} else if ast.IsConditionalTypeNode(node) { // !!! TODO: impossible in combination with the scope start check???
				typeParams = b.ch.getInferTypeParameters(node)
			} else if ast.IsMappedTypeNode(node) {
				typeParams = []*Type{b.ch.getDeclaredTypeOfTypeParameter(b.ch.getSymbolOfDeclaration(node.AsMappedTypeNode().TypeParameter))}
			}
			exit = b.enterNewScope(node, params, typeParams, nil, nil)
		}
		result := visitExistingNodeTreeSymbolsWorker(node)
		if exit != nil {
			exit()
		}

		if result == node && !ast.NodeIsSynthesized(node) {
			result = b.f.DeepCloneNode(node) // always clone a new node
		}

		// We want to clone the subtree, so when we mark it up with __pos and __end in quickfixes,
		//  we don't get odd behavior because of reused nodes. We also need to clone to _remove_
		//  the position information if the node comes from a different file than the one the node builder
		//  is set to build for (even though we are reusing the node structure, the position information
		//  would make the printer print invalid spans for literals and identifiers, and the formatter would
		//  choke on the mismatched positonal spans between a parent and an injected child from another file).
		result = b.setTextRange(result, node)

		if bound.hadError {
			if ast.IsTypeNode(node) && !ast.IsTypePredicateNode(node) {
				bound.endRecoveryScope(recover_)
				// TODO: this fallback matches strada behavior, but it lacks any verification that the type from `node` actually matches
				// the type we'd expect at this traversal position within the parent type.
				t := b.getTypeFromTypeNode(node, false)
				return b.typeToTypeNode(t)
			}
			return b.setTextRange(node.Clone(b.f), node)
		}

		return result
	}, b.f, ast.NodeVisitorHooks{
		VisitNodes: func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
			res := v.VisitNodes(nodes)
			if nonLocalNode && res != nil {
				// Remove position data from node lists originating in other files
				if res == nodes {
					res = nodes.Clone(b.f)
				}
				res.Loc = core.NewTextRange(-1, -1)
			}
			return res
		},
		VisitNode: func(node *ast.Node, v *ast.NodeVisitor) *ast.Node {
			// Capture if the current node is in the current file so node lists knoww if they can keep positions or not
			oldNonLocalNode := nonLocalNode
			nonLocalNode = b.ctx.enclosingFile == nil || b.ctx.enclosingFile != ast.GetSourceFileOfNode(b.e.MostOriginal(node))
			res := v.VisitNode(node)
			nonLocalNode = oldNonLocalNode
			return res
		},
	})
	return visitor
}

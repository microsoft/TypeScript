package checker

import (
	"fmt"
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type CompositeSymbolIdentity struct {
	isConstructorNode bool
	symbolId          ast.SymbolId
	nodeId            ast.NodeId
}

type TrackedSymbolArgs struct {
	symbol               *ast.Symbol
	enclosingDeclaration *ast.Node
	meaning              ast.SymbolFlags
}

type SerializedTypeEntry struct {
	node           *ast.Node
	truncating     bool
	addedLength    int
	trackedSymbols []*TrackedSymbolArgs
}

type CompositeTypeCacheIdentity struct {
	typeId        TypeId
	flags         nodebuilder.Flags
	internalFlags nodebuilder.InternalFlags
}

type NodeBuilderLinks struct {
	serializedTypes                  map[CompositeTypeCacheIdentity]*SerializedTypeEntry // Collection of types serialized at this location
	fakeScopeForSignatureDeclaration *string                                             // If present, this is a fake scope injected into an enclosing declaration chain.
}

type NodeBuilderSymbolLinks struct {
	specifierCache module.ModeAwareCache[string]
}
type NodeBuilderContext struct {
	tracker                         nodebuilder.SymbolTracker
	approximateLength               int
	encounteredError                bool
	truncating                      bool
	reportedDiagnostic              bool
	flags                           nodebuilder.Flags
	internalFlags                   nodebuilder.InternalFlags
	depth                           int
	enclosingDeclaration            *ast.Node
	enclosingFile                   *ast.SourceFile
	inferTypeParameters             []*Type
	visitedTypes                    collections.Set[TypeId]
	symbolDepth                     map[CompositeSymbolIdentity]int
	trackedSymbols                  []*TrackedSymbolArgs
	mapper                          *TypeMapper
	reverseMappedStack              []*ast.Symbol
	enclosingSymbolTypes            map[ast.SymbolId]*Type
	suppressReportInferenceFallback bool
	remappedSymbolReferences        map[ast.SymbolId]*ast.Symbol

	// per signature scope state
	hasCreatedTypeParameterSymbolList     bool
	hasCreatedTypeParametersNamesLookups  bool
	typeParameterNames                    map[TypeId]*ast.Identifier
	typeParameterNamesByText              map[string]struct{}
	typeParameterNamesByTextNextNameCount map[string]int
	typeParameterSymbolList               map[ast.SymbolId]struct{}
}

type nodeBuilderImpl struct {
	// host members
	f  *ast.NodeFactory
	ch *Checker
	e  *printer.EmitContext

	// cache
	links       core.LinkStore[*ast.Node, NodeBuilderLinks]
	symbolLinks core.LinkStore[*ast.Symbol, NodeBuilderSymbolLinks]

	// state
	ctx *NodeBuilderContext

	// reusable visitor
	cloneBindingNameVisitor *ast.NodeVisitor
}

const (
	defaultMaximumTruncationLength      = 160
	noTruncationMaximumTruncationLength = 1_000_000
)

// Node builder utility functions

func newNodeBuilderImpl(ch *Checker, e *printer.EmitContext) *nodeBuilderImpl {
	b := &nodeBuilderImpl{f: e.Factory.AsNodeFactory(), ch: ch, e: e}
	b.cloneBindingNameVisitor = ast.NewNodeVisitor(b.cloneBindingName, b.f, ast.NodeVisitorHooks{})
	return b
}

func (b *nodeBuilderImpl) saveRestoreFlags() func() {
	flags := b.ctx.flags
	internalFlags := b.ctx.internalFlags
	depth := b.ctx.depth

	return func() {
		b.ctx.flags = flags
		b.ctx.internalFlags = internalFlags
		b.ctx.depth = depth
	}
}

func (b *nodeBuilderImpl) checkTruncationLength() bool {
	if b.ctx.truncating {
		return b.ctx.truncating
	}
	b.ctx.truncating = b.ctx.approximateLength > (core.IfElse((b.ctx.flags&nodebuilder.FlagsNoTruncation != 0), noTruncationMaximumTruncationLength, defaultMaximumTruncationLength))
	return b.ctx.truncating
}

func (b *nodeBuilderImpl) appendReferenceToType(root *ast.TypeNode, ref *ast.TypeNode) *ast.TypeNode {
	if ast.IsImportTypeNode(root) {
		// first shift type arguments

		// !!! In the old emitter, an Identifier could have type arguments for use with quickinfo:
		// typeArguments := root.TypeArguments
		// qualifier := root.AsImportTypeNode().Qualifier
		// if qualifier != nil {
		// 	if ast.IsIdentifier(qualifier) {
		// 		if typeArguments != getIdentifierTypeArguments(qualifier) {
		// 			qualifier = setIdentifierTypeArguments(b.f.CloneNode(qualifier), typeArguments)
		// 		}
		// 	} else {
		// 		if typeArguments != getIdentifierTypeArguments(qualifier.Right) {
		// 			qualifier = b.f.UpdateQualifiedName(qualifier, qualifier.Left, setIdentifierTypeArguments(b.f.cloneNode(qualifier.Right), typeArguments))
		// 		}
		// 	}
		// }
		// !!! Without the above, nested type args are silently elided
		imprt := root.AsImportTypeNode()
		// then move qualifiers
		ids := getAccessStack(ref)
		var qualifier *ast.Node
		for _, id := range ids {
			if qualifier != nil {
				qualifier = b.f.NewQualifiedName(qualifier, id)
			} else {
				qualifier = id
			}
		}
		return b.f.UpdateImportTypeNode(imprt, imprt.IsTypeOf, imprt.Argument, imprt.Attributes, qualifier, ref.AsTypeReferenceNode().TypeArguments)
	} else {
		// first shift type arguments
		// !!! In the old emitter, an Identifier could have type arguments for use with quickinfo:
		// typeArguments := root.TypeArguments
		// typeName := root.AsTypeReferenceNode().TypeName
		// if ast.IsIdentifier(typeName) {
		// 	if typeArguments != getIdentifierTypeArguments(typeName) {
		// 		typeName = setIdentifierTypeArguments(b.f.cloneNode(typeName), typeArguments)
		// 	}
		// } else {
		// 	if typeArguments != getIdentifierTypeArguments(typeName.Right) {
		// 		typeName = b.f.UpdateQualifiedName(typeName, typeName.Left, setIdentifierTypeArguments(b.f.cloneNode(typeName.Right), typeArguments))
		// 	}
		// }
		// !!! Without the above, nested type args are silently elided
		// then move qualifiers
		ids := getAccessStack(ref)
		var typeName *ast.Node = root.AsTypeReferenceNode().TypeName
		for _, id := range ids {
			typeName = b.f.NewQualifiedName(typeName, id)
		}
		return b.f.UpdateTypeReferenceNode(root.AsTypeReferenceNode(), typeName, ref.AsTypeReferenceNode().TypeArguments)
	}
}

func getAccessStack(ref *ast.Node) []*ast.Node {
	var state *ast.Node = ref.AsTypeReferenceNode().TypeName
	ids := []*ast.Node{}
	for !ast.IsIdentifier(state) {
		entity := state.AsQualifiedName()
		ids = append([]*ast.Node{entity.Right}, ids...)
		state = entity.Left
	}
	ids = append([]*ast.Node{state}, ids...)
	return ids
}

func isClassInstanceSide(c *Checker, t *Type) bool {
	return t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsClass != 0 && (t == c.getDeclaredTypeOfClassOrInterface(t.symbol) || (t.flags&TypeFlagsObject != 0 && t.objectFlags&ObjectFlagsIsClassInstanceClone != 0))
}

func (b *nodeBuilderImpl) createElidedInformationPlaceholder() *ast.TypeNode {
	b.ctx.approximateLength += 3
	if b.ctx.flags&nodebuilder.FlagsNoTruncation == 0 {
		return b.f.NewTypeReferenceNode(b.f.NewIdentifier("..."), nil /*typeArguments*/)
	}
	return b.e.AddSyntheticLeadingComment(b.f.NewKeywordTypeNode(ast.KindAnyKeyword), ast.KindMultiLineCommentTrivia, "elided", false /*hasTrailingNewLine*/)
}

func (b *nodeBuilderImpl) mapToTypeNodes(list []*Type, isBareList bool) *ast.NodeList {
	if len(list) == 0 {
		return nil
	}

	if b.checkTruncationLength() {
		if !isBareList {
			var node *ast.Node
			if b.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
				node = b.e.AddSyntheticLeadingComment(b.f.NewKeywordTypeNode(ast.KindAnyKeyword), ast.KindMultiLineCommentTrivia, "elided", false /*hasTrailingNewLine*/)
			} else {
				node = b.f.NewTypeReferenceNode(b.f.NewIdentifier("..."), nil /*typeArguments*/)
			}
			return b.f.NewNodeList([]*ast.Node{node})
		} else if len(list) > 2 {
			nodes := []*ast.Node{
				b.typeToTypeNode(list[0]),
				nil,
				b.typeToTypeNode(list[len(list)-1]),
			}

			if b.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
				nodes[1] = b.e.AddSyntheticLeadingComment(b.f.NewKeywordTypeNode(ast.KindAnyKeyword), ast.KindMultiLineCommentTrivia, fmt.Sprintf("... %d more elided ...", len(list)-2), false /*hasTrailingNewLine*/)
			} else {
				text := fmt.Sprintf("... %d more ...", len(list)-2)
				nodes[1] = b.f.NewTypeReferenceNode(b.f.NewIdentifier(text), nil /*typeArguments*/)
			}
			return b.f.NewNodeList(nodes)
		}
	}

	mayHaveNameCollisions := b.ctx.flags&nodebuilder.FlagsUseFullyQualifiedType == 0
	type seenName struct {
		t *Type
		i int
	}
	var seenNames *collections.MultiMap[string, seenName]
	if mayHaveNameCollisions {
		seenNames = &collections.MultiMap[string, seenName]{}
	}

	result := make([]*ast.Node, 0, len(list))

	for i, t := range list {
		if b.checkTruncationLength() && (i+2 < len(list)-1) {
			if b.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
				result = append(result, b.e.AddSyntheticLeadingComment(b.f.NewKeywordTypeNode(ast.KindAnyKeyword), ast.KindMultiLineCommentTrivia, fmt.Sprintf("... %d more elided ...", len(list)-i), false /*hasTrailingNewLine*/))
			} else {
				text := fmt.Sprintf("... %d more ...", len(list)-i)
				result = append(result, b.f.NewTypeReferenceNode(b.f.NewIdentifier(text), nil /*typeArguments*/))
			}
			typeNode := b.typeToTypeNode(list[len(list)-1])
			if typeNode != nil {
				result = append(result, typeNode)
			}
			break
		}
		b.ctx.approximateLength += 2 // Account for whitespace + separator
		typeNode := b.typeToTypeNode(t)
		if typeNode != nil {
			result = append(result, typeNode)
			if seenNames != nil && isIdentifierTypeReference(typeNode) {
				seenNames.Add(typeNode.AsTypeReferenceNode().TypeName.Text(), seenName{t, len(result) - 1})
			}
		}
	}

	if seenNames != nil {
		// To avoid printing types like `[Foo, Foo]` or `Bar & Bar` where
		// occurrences of the same name actually come from different
		// namespaces, go through the single-identifier type reference nodes
		// we just generated, and see if any names were generated more than
		// once while referring to different types. If so, regenerate the
		// type node for each entry by that name with the
		// `UseFullyQualifiedType` flag enabled.
		restoreFlags := b.saveRestoreFlags()
		b.ctx.flags |= nodebuilder.FlagsUseFullyQualifiedType
		for types := range seenNames.Values() {
			if !arrayIsHomogeneous(types, func(a, b seenName) bool {
				return typesAreSameReference(a.t, b.t)
			}) {
				for _, seen := range types {
					result[seen.i] = b.typeToTypeNode(seen.t)
				}
			}
		}
		restoreFlags()
	}

	return b.f.NewNodeList(result)
}

func isIdentifierTypeReference(node *ast.Node) bool {
	return ast.IsTypeReferenceNode(node) && ast.IsIdentifier(node.AsTypeReferenceNode().TypeName)
}

func arrayIsHomogeneous[T any](array []T, comparer func(a, B T) bool) bool {
	if len(array) < 2 {
		return true
	}
	first := array[0]
	for i := 1; i < len(array); i++ {
		target := array[i]
		if !comparer(first, target) {
			return false
		}
	}
	return true
}

func typesAreSameReference(a, b *Type) bool {
	return a == b || a.symbol != nil && a.symbol == b.symbol || a.alias != nil && a.alias == b.alias
}

func (b *nodeBuilderImpl) setCommentRange(node *ast.Node, range_ *ast.Node) {
	if range_ != nil && b.ctx.enclosingFile != nil && b.ctx.enclosingFile == ast.GetSourceFileOfNode(range_) {
		// Copy comments to node for declaration emit
		b.e.AssignCommentRange(node, range_)
	}
}

func (b *nodeBuilderImpl) tryReuseExistingTypeNodeHelper(existing *ast.TypeNode) *ast.TypeNode {
	return nil // !!!
}

func (b *nodeBuilderImpl) tryReuseExistingTypeNode(typeNode *ast.TypeNode, t *Type, host *ast.Node, addUndefined bool) *ast.TypeNode {
	originalType := t
	if addUndefined {
		t = b.ch.getOptionalType(t, !ast.IsParameter(host))
	}
	clone := b.tryReuseExistingNonParameterTypeNode(typeNode, t, host, nil)
	if clone != nil {
		// explicitly add `| undefined` if it's missing from the input type nodes and the type contains `undefined` (and not the missing type)
		if addUndefined && containsNonMissingUndefinedType(b.ch, t) && !someType(b.getTypeFromTypeNode(typeNode, false), func(t *Type) bool {
			return t.flags&TypeFlagsUndefined != 0
		}) {
			return b.f.NewUnionTypeNode(b.f.NewNodeList([]*ast.TypeNode{clone, b.f.NewKeywordTypeNode(ast.KindUndefinedKeyword)}))
		}
		return clone
	}
	if addUndefined && originalType != t {
		cloneMissingUndefined := b.tryReuseExistingNonParameterTypeNode(typeNode, originalType, host, nil)
		if cloneMissingUndefined != nil {
			return b.f.NewUnionTypeNode(b.f.NewNodeList([]*ast.TypeNode{cloneMissingUndefined, b.f.NewKeywordTypeNode(ast.KindUndefinedKeyword)}))
		}
	}
	return nil
}

func (b *nodeBuilderImpl) typeNodeIsEquivalentToType(annotatedDeclaration *ast.Node, t *Type, typeFromTypeNode *Type) bool {
	if typeFromTypeNode == t {
		return true
	}
	if annotatedDeclaration == nil {
		return false
	}
	// !!!
	// used to be hasEffectiveQuestionToken for JSDoc
	if isOptionalDeclaration(annotatedDeclaration) {
		return b.ch.getTypeWithFacts(t, TypeFactsNEUndefined) == typeFromTypeNode
	}
	return false
}

func (b *nodeBuilderImpl) existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing *ast.TypeNode, t *Type) bool {
	// In JS, you can say something like `Foo` and get a `Foo<any>` implicitly - we don't want to preserve that original `Foo` in these cases, though.
	if t.objectFlags&ObjectFlagsReference == 0 {
		return true
	}
	if !ast.IsTypeReferenceNode(existing) {
		return true
	}
	// `type` is a reference type, and `existing` is a type reference node, but we still need to make sure they refer to the _same_ target type
	// before we go comparing their type argument counts.
	b.ch.getTypeFromTypeReference(existing)
	// call to ensure symbol is resolved
	links := b.ch.symbolNodeLinks.TryGet(existing)
	if links == nil {
		return true
	}
	symbol := links.resolvedSymbol
	if symbol == nil {
		return true
	}
	existingTarget := b.ch.getDeclaredTypeOfSymbol(symbol)
	if existingTarget == nil || existingTarget != t.AsTypeReference().target {
		return true
	}
	return len(existing.TypeArguments()) >= b.ch.getMinTypeArgumentCount(t.AsTypeReference().target.AsInterfaceType().TypeParameters())
}

func (b *nodeBuilderImpl) tryReuseExistingNonParameterTypeNode(existing *ast.TypeNode, t *Type, host *ast.Node, annotationType *Type) *ast.TypeNode {
	if host == nil {
		host = b.ctx.enclosingDeclaration
	}
	if annotationType == nil {
		annotationType = b.getTypeFromTypeNode(existing, true)
	}
	if annotationType != nil && b.typeNodeIsEquivalentToType(host, t, annotationType) && b.existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing, t) {
		result := b.tryReuseExistingTypeNodeHelper(existing)
		if result != nil {
			return result
		}
	}
	return nil
}

func (b *nodeBuilderImpl) getResolvedTypeWithoutAbstractConstructSignatures(t *StructuredType) *Type {
	if len(t.ConstructSignatures()) == 0 {
		return t.AsType()
	}
	if t.objectTypeWithoutAbstractConstructSignatures != nil {
		return t.objectTypeWithoutAbstractConstructSignatures
	}
	constructSignatures := core.Filter(t.ConstructSignatures(), func(signature *Signature) bool {
		return signature.flags&SignatureFlagsAbstract == 0
	})
	if len(constructSignatures) == len(t.ConstructSignatures()) {
		t.objectTypeWithoutAbstractConstructSignatures = t.AsType()
		return t.AsType()
	}
	typeCopy := b.ch.newAnonymousType(t.symbol, t.members, t.CallSignatures(), core.IfElse(len(constructSignatures) > 0, constructSignatures, []*Signature{}), t.indexInfos)
	t.objectTypeWithoutAbstractConstructSignatures = typeCopy
	typeCopy.AsStructuredType().objectTypeWithoutAbstractConstructSignatures = typeCopy
	return typeCopy
}

func (b *nodeBuilderImpl) symbolToNode(symbol *ast.Symbol, meaning ast.SymbolFlags) *ast.Node {
	if b.ctx.internalFlags&nodebuilder.InternalFlagsWriteComputedProps != 0 {
		if symbol.ValueDeclaration != nil {
			name := ast.GetNameOfDeclaration(symbol.ValueDeclaration)
			if name != nil && ast.IsComputedPropertyName(name) {
				return name
			}
		}
		if b.ch.valueSymbolLinks.Has(symbol) {
			nameType := b.ch.valueSymbolLinks.Get(symbol).nameType
			if nameType != nil && nameType.flags&(TypeFlagsEnumLiteral|TypeFlagsUniqueESSymbol) != 0 {
				oldEnclosing := b.ctx.enclosingDeclaration
				b.ctx.enclosingDeclaration = nameType.symbol.ValueDeclaration
				result := b.f.NewComputedPropertyName(b.symbolToExpression(nameType.symbol, meaning))
				b.ctx.enclosingDeclaration = oldEnclosing
				return result
			}
		}
	}
	return b.symbolToExpression(symbol, meaning)
}

func (b *nodeBuilderImpl) symbolToName(symbol *ast.Symbol, meaning ast.SymbolFlags, expectsIdentifier bool) *ast.Node {
	chain := b.lookupSymbolChain(symbol, meaning, false)
	if expectsIdentifier && len(chain) != 1 && !b.ctx.encounteredError && (b.ctx.flags&nodebuilder.FlagsAllowQualifiedNameInPlaceOfIdentifier != 0) {
		b.ctx.encounteredError = true
	}
	return b.createEntityNameFromSymbolChain(chain, len(chain)-1)
}

func (b *nodeBuilderImpl) createEntityNameFromSymbolChain(chain []*ast.Symbol, index int) *ast.Node {
	// typeParameterNodes := b.lookupTypeParameterNodes(chain, index)
	symbol := chain[index]

	if index == 0 {
		b.ctx.flags |= nodebuilder.FlagsInInitialEntityName
	}
	symbolName := b.getNameOfSymbolAsWritten(symbol)
	if index == 0 {
		b.ctx.flags ^= nodebuilder.FlagsInInitialEntityName
	}

	identifier := b.f.NewIdentifier(symbolName)
	b.e.AddEmitFlags(identifier, printer.EFNoAsciiEscaping)
	// !!! TODO: smuggle type arguments out
	// if (typeParameterNodes) setIdentifierTypeArguments(identifier, factory.createNodeArray<TypeNode | TypeParameterDeclaration>(typeParameterNodes));
	// identifier.symbol = symbol;
	// expression = identifier;
	if index > 0 {
		return b.f.NewQualifiedName(
			b.createEntityNameFromSymbolChain(chain, index-1),
			identifier,
		)
	}
	return identifier
}

// TODO: Audit usages of symbolToEntityNameNode - they should probably all be symbolToName
func (b *nodeBuilderImpl) symbolToEntityNameNode(symbol *ast.Symbol) *ast.EntityName {
	identifier := b.f.NewIdentifier(symbol.Name)
	if symbol.Parent != nil {
		return b.f.NewQualifiedName(b.symbolToEntityNameNode(symbol.Parent), identifier)
	}
	return identifier
}

func (b *nodeBuilderImpl) symbolToTypeNode(symbol *ast.Symbol, mask ast.SymbolFlags, typeArguments *ast.NodeList) *ast.TypeNode {
	chain := b.lookupSymbolChain(symbol, mask, (b.ctx.flags&nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope == 0)) // If we're using aliases outside the current scope, dont bother with the module
	if len(chain) == 0 {
		return nil // TODO: shouldn't be possible, `lookupSymbolChain` should always at least return the input symbol and issue an error
	}
	isTypeOf := mask == ast.SymbolFlagsValue
	if core.Some(chain[0].Declarations, hasNonGlobalAugmentationExternalModuleSymbol) {
		// module is root, must use `ImportTypeNode`
		var nonRootParts *ast.Node
		if len(chain) > 1 {
			nonRootParts = b.createAccessFromSymbolChain(chain, len(chain)-1, 1, typeArguments)
		}
		typeParameterNodes := typeArguments
		if typeParameterNodes == nil {
			typeParameterNodes = b.lookupTypeParameterNodes(chain, 0)
		}
		contextFile := ast.GetSourceFileOfNode(b.e.MostOriginal(b.ctx.enclosingDeclaration)) // TODO: Just use b.ctx.enclosingFile ? Or is the delayed lookup important for context moves?
		targetFile := ast.GetSourceFileOfModule(chain[0])
		var specifier string
		var attributes *ast.Node
		if b.ch.compilerOptions.GetModuleResolutionKind() == core.ModuleResolutionKindNode16 || b.ch.compilerOptions.GetModuleResolutionKind() == core.ModuleResolutionKindNodeNext {
			// An `import` type directed at an esm format file is only going to resolve in esm mode - set the esm mode assertion
			if targetFile != nil && contextFile != nil && b.ch.program.GetEmitModuleFormatOfFile(targetFile) == core.ModuleKindESNext && b.ch.program.GetEmitModuleFormatOfFile(targetFile) != b.ch.program.GetEmitModuleFormatOfFile(contextFile) {
				specifier = b.getSpecifierForModuleSymbol(chain[0], core.ModuleKindESNext)
				attributes = b.f.NewImportAttributes(
					ast.KindWithKeyword,
					b.f.NewNodeList([]*ast.Node{b.f.NewImportAttribute(b.f.NewStringLiteral("resolution-mode"), b.f.NewStringLiteral("import"))}),
					false,
				)
			}
		}
		if len(specifier) == 0 {
			specifier = b.getSpecifierForModuleSymbol(chain[0], core.ResolutionModeNone)
		}
		if (b.ctx.flags&nodebuilder.FlagsAllowNodeModulesRelativePaths == 0) /* && b.ch.compilerOptions.GetModuleResolutionKind() != core.ModuleResolutionKindClassic */ && strings.Contains(specifier, "/node_modules/") {
			oldSpecifier := specifier

			if b.ch.compilerOptions.GetModuleResolutionKind() == core.ModuleResolutionKindNode16 || b.ch.compilerOptions.GetModuleResolutionKind() == core.ModuleResolutionKindNodeNext {
				// We might be able to write a portable import type using a mode override; try specifier generation again, but with a different mode set
				swappedMode := core.ModuleKindESNext
				if b.ch.program.GetEmitModuleFormatOfFile(contextFile) == core.ModuleKindESNext {
					swappedMode = core.ModuleKindCommonJS
				}
				specifier = b.getSpecifierForModuleSymbol(chain[0], swappedMode)

				if strings.Contains(specifier, "/node_modules/") {
					// Still unreachable :(
					specifier = oldSpecifier
				} else {
					modeStr := "require"
					if swappedMode == core.ModuleKindESNext {
						modeStr = "import"
					}
					attributes = b.f.NewImportAttributes(
						ast.KindWithKeyword,
						b.f.NewNodeList([]*ast.Node{b.f.NewImportAttribute(b.f.NewStringLiteral("resolution-mode"), b.f.NewStringLiteral(modeStr))}),
						false,
					)
				}
			}

			if attributes == nil {
				// If ultimately we can only name the symbol with a reference that dives into a `node_modules` folder, we should error
				// since declaration files with these kinds of references are liable to fail when published :(
				b.ctx.encounteredError = true
				b.ctx.tracker.ReportLikelyUnsafeImportRequiredError(oldSpecifier)
			}
		}

		lit := b.f.NewLiteralTypeNode(b.f.NewStringLiteral(specifier))
		b.ctx.approximateLength += len(specifier) + 10 // specifier + import("")
		if nonRootParts == nil || ast.IsEntityName(nonRootParts) {
			if nonRootParts != nil {
				// !!! TODO: smuggle type arguments out
				// const lastId = isIdentifier(nonRootParts) ? nonRootParts : nonRootParts.right;
				// setIdentifierTypeArguments(lastId, /*typeArguments*/ undefined);
			}
			return b.f.NewImportTypeNode(isTypeOf, lit, attributes, nonRootParts, typeParameterNodes)
		}

		splitNode := getTopmostIndexedAccessType(nonRootParts.AsIndexedAccessTypeNode())
		qualifier := splitNode.ObjectType.AsTypeReference().TypeName
		return b.f.NewIndexedAccessTypeNode(
			b.f.NewImportTypeNode(isTypeOf, lit, attributes, qualifier, typeParameterNodes),
			splitNode.IndexType,
		)

	}

	entityName := b.createAccessFromSymbolChain(chain, len(chain)-1, 0, typeArguments)
	if ast.IsIndexedAccessTypeNode(entityName) {
		return entityName // Indexed accesses can never be `typeof`
	}
	if isTypeOf {
		return b.f.NewTypeQueryNode(entityName, nil)
	}
	// !!! TODO: smuggle type arguments out
	// Move type arguments from last identifier on chain to type reference
	// const lastId = isIdentifier(entityName) ? entityName : entityName.right;
	// const lastTypeArgs = getIdentifierTypeArguments(lastId);
	// setIdentifierTypeArguments(lastId, /*typeArguments*/ undefined);
	return b.f.NewTypeReferenceNode(entityName, typeArguments)
}

func getTopmostIndexedAccessType(node *ast.IndexedAccessTypeNode) *ast.IndexedAccessTypeNode {
	if ast.IsIndexedAccessTypeNode(node.ObjectType) {
		return getTopmostIndexedAccessType(node.ObjectType.AsIndexedAccessTypeNode())
	}
	return node
}

func (b *nodeBuilderImpl) createAccessFromSymbolChain(chain []*ast.Symbol, index int, stopper int, overrideTypeArguments *ast.NodeList) *ast.Node {
	// !!! TODO: smuggle type arguments out
	typeParameterNodes := overrideTypeArguments
	if index != (len(chain) - 1) {
		typeParameterNodes = b.lookupTypeParameterNodes(chain, index)
	}
	symbol := chain[index]
	var parent *ast.Symbol
	if index > 0 {
		parent = chain[index-1]
	}

	var symbolName string
	if index == 0 {
		b.ctx.flags |= nodebuilder.FlagsInInitialEntityName
		symbolName = b.getNameOfSymbolAsWritten(symbol)
		b.ctx.approximateLength += len(symbolName) + 1
		b.ctx.flags ^= nodebuilder.FlagsInInitialEntityName
	} else {
		// lookup a ref to symbol within parent to handle export aliases
		if parent != nil {
			exports := b.ch.getExportsOfSymbol(parent)
			if exports != nil {
				// avoid exhaustive iteration in the common case
				res, ok := exports[symbol.Name]
				if symbol.Name != ast.InternalSymbolNameExportEquals && !isLateBoundName(symbol.Name) && ok && res != nil && b.ch.getSymbolIfSameReference(res, symbol) != nil {
					symbolName = symbol.Name
				} else {
					results := make(map[*ast.Symbol]string, 1)
					for name, ex := range exports {
						if b.ch.getSymbolIfSameReference(ex, symbol) != nil && !isLateBoundName(name) && name != ast.InternalSymbolNameExportEquals {
							results[ex] = name
							// break // must collect all results and sort them - exports are randomly iterated
						}
					}
					resultSymbols := slices.Collect(maps.Keys(results))
					if len(resultSymbols) > 0 {
						b.ch.sortSymbols(resultSymbols)
						symbolName = results[resultSymbols[0]]
					}
				}
			}
		}
	}

	if len(symbolName) == 0 {
		var name *ast.Node
		for _, d := range symbol.Declarations {
			name = ast.GetNameOfDeclaration(d)
			if name != nil {
				break
			}
		}
		if name != nil && ast.IsComputedPropertyName(name) && ast.IsEntityName(name.AsComputedPropertyName().Expression) {
			lhs := b.createAccessFromSymbolChain(chain, index-1, stopper, overrideTypeArguments)
			if ast.IsEntityName(lhs) {
				return b.f.NewIndexedAccessTypeNode(
					b.f.NewParenthesizedTypeNode(b.f.NewTypeQueryNode(lhs, nil)),
					b.f.NewTypeQueryNode(name.Expression(), nil),
				)
			}
			return lhs
		}
		symbolName = b.getNameOfSymbolAsWritten(symbol)
	}
	b.ctx.approximateLength += len(symbolName) + 1

	if (b.ctx.flags&nodebuilder.FlagsForbidIndexedAccessSymbolReferences == 0) && parent != nil &&
		b.ch.getMembersOfSymbol(parent) != nil && b.ch.getMembersOfSymbol(parent)[symbol.Name] != nil &&
		b.ch.getSymbolIfSameReference(b.ch.getMembersOfSymbol(parent)[symbol.Name], symbol) != nil {
		// Should use an indexed access
		lhs := b.createAccessFromSymbolChain(chain, index-1, stopper, overrideTypeArguments)
		if ast.IsIndexedAccessTypeNode(lhs) {
			return b.f.NewIndexedAccessTypeNode(
				lhs,
				b.f.NewLiteralTypeNode(b.f.NewStringLiteral(symbolName)),
			)
		}
		return b.f.NewIndexedAccessTypeNode(
			b.f.NewTypeReferenceNode(lhs, typeParameterNodes),
			b.f.NewLiteralTypeNode(b.f.NewStringLiteral(symbolName)),
		)
	}

	identifier := b.f.NewIdentifier(symbolName)
	b.e.AddEmitFlags(identifier, printer.EFNoAsciiEscaping)
	// !!! TODO: smuggle type arguments out
	// if (typeParameterNodes) setIdentifierTypeArguments(identifier, factory.createNodeArray<TypeNode | TypeParameterDeclaration>(typeParameterNodes));
	// identifier.symbol = symbol;

	if index > stopper {
		lhs := b.createAccessFromSymbolChain(chain, index-1, stopper, overrideTypeArguments)
		if !ast.IsEntityName(lhs) {
			panic("Impossible construct - an export of an indexed access cannot be reachable")
		}
		return b.f.NewQualifiedName(lhs, identifier)
	}

	return identifier
}

func (b *nodeBuilderImpl) symbolToExpression(symbol *ast.Symbol, mask ast.SymbolFlags) *ast.Expression {
	chain := b.lookupSymbolChain(symbol, mask, false)
	return b.createExpressionFromSymbolChain(chain, len(chain)-1)
}

func (b *nodeBuilderImpl) createExpressionFromSymbolChain(chain []*ast.Symbol, index int) *ast.Expression {
	// typeParameterNodes := b.lookupTypeParameterNodes(chain, index)
	symbol := chain[index]

	if index == 0 {
		b.ctx.flags |= nodebuilder.FlagsInInitialEntityName
	}
	symbolName := b.getNameOfSymbolAsWritten(symbol)
	if index == 0 {
		b.ctx.flags ^= nodebuilder.FlagsInInitialEntityName
	}

	if startsWithSingleOrDoubleQuote(symbolName) && core.Some(symbol.Declarations, hasNonGlobalAugmentationExternalModuleSymbol) {
		return b.f.NewStringLiteral(b.getSpecifierForModuleSymbol(symbol, core.ResolutionModeNone))
	}

	if index == 0 || canUsePropertyAccess(symbolName) {
		identifier := b.f.NewIdentifier(symbolName)
		b.e.AddEmitFlags(identifier, printer.EFNoAsciiEscaping)
		// !!! TODO: smuggle type arguments out
		// if (typeParameterNodes) setIdentifierTypeArguments(identifier, factory.createNodeArray<TypeNode | TypeParameterDeclaration>(typeParameterNodes));
		// identifier.symbol = symbol;
		if index > 0 {
			return b.f.NewPropertyAccessExpression(b.createExpressionFromSymbolChain(chain, index-1), nil, identifier, ast.NodeFlagsNone)
		}
		return identifier
	}

	if startsWithSquareBracket(symbolName) {
		symbolName = symbolName[1 : len(symbolName)-1]
	}

	var expression *ast.Expression
	if startsWithSingleOrDoubleQuote(symbolName) && symbol.Flags&ast.SymbolFlagsEnumMember == 0 {
		expression = b.f.NewStringLiteral(stringutil.UnquoteString(symbolName))
	} else if jsnum.FromString(symbolName).String() == symbolName {
		// TODO: the follwing in strada would assert if the number is negative, but no such assertion exists here
		// Moreover, what's even guaranteeing the name *isn't* -1 here anyway? Needs double-checking.
		expression = b.f.NewNumericLiteral(symbolName)
	}
	if expression == nil {
		expression = b.f.NewIdentifier(symbolName)
		b.e.AddEmitFlags(expression, printer.EFNoAsciiEscaping)
		// !!! TODO: smuggle type arguments out
		// if (typeParameterNodes) setIdentifierTypeArguments(identifier, factory.createNodeArray<TypeNode | TypeParameterDeclaration>(typeParameterNodes));
		// identifier.symbol = symbol;
		// expression = identifier;
	}
	return b.f.NewElementAccessExpression(b.createExpressionFromSymbolChain(chain, index-1), nil, expression, ast.NodeFlagsNone)
}

func canUsePropertyAccess(name string) bool {
	if len(name) == 0 {
		return false
	}
	// TODO: in strada, this only used `isIdentifierStart` on the first character, while this checks the whole string for validity
	// - possible strada bug?
	if strings.HasPrefix(name, "#") {
		return len(name) > 1 && scanner.IsIdentifierText(name[1:], core.LanguageVariantStandard)
	}
	return scanner.IsIdentifierText(name, core.LanguageVariantStandard)
}

func startsWithSingleOrDoubleQuote(str string) bool {
	return strings.HasPrefix(str, "'") || strings.HasPrefix(str, "\"")
}

func startsWithSquareBracket(str string) bool {
	return strings.HasPrefix(str, "[")
}

func isDefaultBindingContext(location *ast.Node) bool {
	return location.Kind == ast.KindSourceFile || ast.IsAmbientModule(location)
}

func (b *nodeBuilderImpl) getNameOfSymbolFromNameType(symbol *ast.Symbol) string {
	if b.ch.valueSymbolLinks.Has(symbol) {
		nameType := b.ch.valueSymbolLinks.Get(symbol).nameType
		if nameType == nil {
			return ""
		}
		if nameType.flags&TypeFlagsStringOrNumberLiteral != 0 {
			var name string
			switch v := nameType.AsLiteralType().value.(type) {
			case string:
				name = v
			case jsnum.Number:
				name = v.String()
			}
			if !scanner.IsIdentifierText(name, core.LanguageVariantStandard) && !isNumericLiteralName(name) {
				return b.ch.valueToString(nameType.AsLiteralType().value)
			}
			if isNumericLiteralName(name) && strings.HasPrefix(name, "-") {
				return fmt.Sprintf("[%s]", name)
			}
			return name
		}
		if nameType.flags&TypeFlagsUniqueESSymbol != 0 {
			text := b.getNameOfSymbolAsWritten(nameType.AsUniqueESSymbolType().symbol)
			return fmt.Sprintf("[%s]", text)
		}
	}
	return ""
}

/**
* Gets a human-readable name for a symbol.
* Should *not* be used for the right-hand side of a `.` -- use `symbolName(symbol)` for that instead.
*
* Unlike `symbolName(symbol)`, this will include quotes if the name is from a string literal.
* It will also use a representation of a number as written instead of a decimal form, e.g. `0o11` instead of `9`.
 */
func (b *nodeBuilderImpl) getNameOfSymbolAsWritten(symbol *ast.Symbol) string {
	result, ok := b.ctx.remappedSymbolReferences[ast.GetSymbolId(symbol)]
	if ok {
		symbol = result
	}
	if symbol.Name == ast.InternalSymbolNameDefault && (b.ctx.flags&nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope == 0) &&
		// If it's not the first part of an entity name, it must print as `default`
		((b.ctx.flags&nodebuilder.FlagsInInitialEntityName == 0) ||
			// if the symbol is synthesized, it will only be referenced externally it must print as `default`
			len(symbol.Declarations) == 0 ||
			// if not in the same binding context (source file, module declaration), it must print as `default`
			(b.ctx.enclosingDeclaration != nil && ast.FindAncestor(symbol.Declarations[0], isDefaultBindingContext) != ast.FindAncestor(b.ctx.enclosingDeclaration, isDefaultBindingContext))) {
		return "default"
	}
	if len(symbol.Declarations) > 0 {
		name := core.FirstNonNil(symbol.Declarations, ast.GetNameOfDeclaration) // Try using a declaration with a name, first
		if name != nil {
			// !!! TODO: JS Object.defineProperty declarations
			// if ast.IsCallExpression(declaration) && ast.IsBindableObjectDefinePropertyCall(declaration) {
			// 	return symbol.Name
			// }
			if ast.IsComputedPropertyName(name) && symbol.CheckFlags&ast.CheckFlagsLate == 0 {
				if b.ch.valueSymbolLinks.Has(symbol) && b.ch.valueSymbolLinks.Get(symbol).nameType != nil && b.ch.valueSymbolLinks.Get(symbol).nameType.flags&TypeFlagsStringOrNumberLiteral != 0 {
					result := b.getNameOfSymbolFromNameType(symbol)
					if len(result) > 0 {
						return result
					}
				}
			}
			return scanner.DeclarationNameToString(name)
		}
		declaration := symbol.Declarations[0] // Declaration may be nameless, but we'll try anyway
		if declaration.Parent != nil && declaration.Parent.Kind == ast.KindVariableDeclaration {
			return scanner.DeclarationNameToString(declaration.Parent.AsVariableDeclaration().Name())
		}
		if ast.IsClassExpression(declaration) || ast.IsFunctionExpression(declaration) || ast.IsArrowFunction(declaration) {
			if b.ctx != nil && !b.ctx.encounteredError && b.ctx.flags&nodebuilder.FlagsAllowAnonymousIdentifier == 0 {
				b.ctx.encounteredError = true
			}
			switch declaration.Kind {
			case ast.KindClassExpression:
				return "(Anonymous class)"
			case ast.KindFunctionExpression, ast.KindArrowFunction:
				return "(Anonymous function)"
			}
		}
	}
	name := b.getNameOfSymbolFromNameType(symbol)
	if len(name) > 0 {
		return name
	}
	return symbol.Name
}

// The full set of type parameters for a generic class or interface type consists of its outer type parameters plus
// its locally declared type parameters.
func (b *nodeBuilderImpl) getTypeParametersOfClassOrInterface(symbol *ast.Symbol) []*Type {
	result := make([]*Type, 0)
	result = append(result, b.ch.getOuterTypeParametersOfClassOrInterface(symbol)...)
	result = append(result, b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)...)
	return result
}

func (b *nodeBuilderImpl) lookupTypeParameterNodes(chain []*ast.Symbol, index int) *ast.TypeParameterList {
	debug.Assert(chain != nil && 0 <= index && index < len(chain))
	symbol := chain[index]
	symbolId := ast.GetSymbolId(symbol)
	if !b.ctx.hasCreatedTypeParameterSymbolList {
		b.ctx.hasCreatedTypeParameterSymbolList = true
		b.ctx.typeParameterSymbolList = make(map[ast.SymbolId]struct{})
	}
	_, ok := b.ctx.typeParameterSymbolList[symbolId]
	if ok {
		return nil
	}
	b.ctx.typeParameterSymbolList[symbolId] = struct{}{}

	if b.ctx.flags&nodebuilder.FlagsWriteTypeParametersInQualifiedName != 0 && index < (len(chain)-1) {
		parentSymbol := symbol
		nextSymbol := chain[index+1]

		if nextSymbol.CheckFlags&ast.CheckFlagsInstantiated != 0 {
			targetSymbol := parentSymbol
			if parentSymbol.Flags&ast.SymbolFlagsAlias != 0 {
				targetSymbol = b.ch.resolveAlias(parentSymbol)
			}
			params := b.getTypeParametersOfClassOrInterface(targetSymbol)
			targetMapper := b.ch.valueSymbolLinks.Get(nextSymbol).mapper
			if targetMapper != nil {
				params = core.Map(params, targetMapper.Map)
			}
			return b.mapToTypeNodes(params, false /*isBareList*/)
		} else {
			typeParameterNodes := b.typeParametersToTypeParameterDeclarations(symbol)
			if len(typeParameterNodes) > 0 {
				return b.f.NewNodeList(typeParameterNodes)
			}
			return nil
		}
	}

	return nil
}

// TODO: move `lookupSymbolChain` and co to `symbolaccessibility.go` (but getSpecifierForModuleSymbol uses much context which makes that hard?)
func (b *nodeBuilderImpl) lookupSymbolChain(symbol *ast.Symbol, meaning ast.SymbolFlags, yieldModuleSymbol bool) []*ast.Symbol {
	b.ctx.tracker.TrackSymbol(symbol, b.ctx.enclosingDeclaration, meaning)
	return b.lookupSymbolChainWorker(symbol, meaning, yieldModuleSymbol)
}

func (b *nodeBuilderImpl) lookupSymbolChainWorker(symbol *ast.Symbol, meaning ast.SymbolFlags, yieldModuleSymbol bool) []*ast.Symbol {
	// Try to get qualified name if the symbol is not a type parameter and there is an enclosing declaration.
	var chain []*ast.Symbol
	isTypeParameter := symbol.Flags&ast.SymbolFlagsTypeParameter != 0
	if !isTypeParameter && (b.ctx.enclosingDeclaration != nil || b.ctx.flags&nodebuilder.FlagsUseFullyQualifiedType != 0) && (b.ctx.internalFlags&nodebuilder.InternalFlagsDoNotIncludeSymbolChain == 0) {
		res := b.getSymbolChain(symbol, meaning /*endOfChain*/, true, yieldModuleSymbol)
		chain = res
		debug.CheckDefined(chain)
		debug.Assert(len(chain) > 0)
	} else {
		chain = append(chain, symbol)
	}
	return chain
}

type sortedSymbolNamePair struct {
	sym  *ast.Symbol
	name string
}

/** @param endOfChain Set to false for recursive calls; non-recursive calls should always output something. */
func (b *nodeBuilderImpl) getSymbolChain(symbol *ast.Symbol, meaning ast.SymbolFlags, endOfChain bool, yieldModuleSymbol bool) []*ast.Symbol {
	accessibleSymbolChain := b.ch.getAccessibleSymbolChain(symbol, b.ctx.enclosingDeclaration, meaning, b.ctx.flags&nodebuilder.FlagsUseOnlyExternalAliasing != 0)
	qualifierMeaning := meaning
	if len(accessibleSymbolChain) > 1 {
		qualifierMeaning = getQualifiedLeftMeaning(meaning)
	}
	if len(accessibleSymbolChain) == 0 ||
		b.ch.needsQualification(accessibleSymbolChain[0], b.ctx.enclosingDeclaration, qualifierMeaning) {
		// Go up and add our parent.
		root := symbol
		if len(accessibleSymbolChain) > 0 {
			root = accessibleSymbolChain[0]
		}
		parents := b.ch.getContainersOfSymbol(root, b.ctx.enclosingDeclaration, meaning)
		if len(parents) > 0 {
			parentSpecifiers := core.Map(parents, func(symbol *ast.Symbol) sortedSymbolNamePair {
				if core.Some(symbol.Declarations, hasNonGlobalAugmentationExternalModuleSymbol) {
					return sortedSymbolNamePair{symbol, b.getSpecifierForModuleSymbol(symbol, core.ResolutionModeNone)}
				}
				return sortedSymbolNamePair{symbol, ""}
			})
			slices.SortStableFunc(parentSpecifiers, b.sortByBestName)
			for _, pair := range parentSpecifiers {
				parent := pair.sym
				parentChain := b.getSymbolChain(parent, getQualifiedLeftMeaning(meaning), false, yieldModuleSymbol)
				if len(parentChain) > 0 {
					if parent.Exports != nil {
						exported, ok := parent.Exports[ast.InternalSymbolNameExportEquals]
						if ok && b.ch.getSymbolIfSameReference(exported, symbol) != nil {
							// parentChain root _is_ symbol - symbol is a module export=, so it kinda looks like it's own parent
							// No need to lookup an alias for the symbol in itself
							accessibleSymbolChain = parentChain
							break
						}
					}
					nextSyms := accessibleSymbolChain
					if len(nextSyms) == 0 {
						fallback := b.ch.getAliasForSymbolInContainer(parent, symbol)
						if fallback == nil {
							fallback = symbol
						}
						nextSyms = append(nextSyms, fallback)
					}
					accessibleSymbolChain = append(parentChain, nextSyms...)
					break
				}
			}
		}
	}
	if len(accessibleSymbolChain) > 0 {
		return accessibleSymbolChain
	}
	if
	// If this is the last part of outputting the symbol, always output. The cases apply only to parent symbols.
	endOfChain ||
		// If a parent symbol is an anonymous type, don't write it.
		(symbol.Flags&(ast.SymbolFlagsTypeLiteral|ast.SymbolFlagsObjectLiteral) == 0) {
		// If a parent symbol is an external module, don't write it. (We prefer just `x` vs `"foo/bar".x`.)
		if !endOfChain && !yieldModuleSymbol && core.Some(symbol.Declarations, hasNonGlobalAugmentationExternalModuleSymbol) {
			return nil
		}
		return []*ast.Symbol{symbol}
	}
	return nil
}

func (b_ *nodeBuilderImpl) sortByBestName(a sortedSymbolNamePair, b sortedSymbolNamePair) int {
	specifierA := a.name
	specifierB := b.name
	if len(specifierA) > 0 && len(specifierB) > 0 {
		isBRelative := tspath.PathIsRelative(specifierB)
		if tspath.PathIsRelative(specifierA) == isBRelative {
			// Both relative or both non-relative, sort by number of parts
			return modulespecifiers.CountPathComponents(specifierA) - modulespecifiers.CountPathComponents(specifierB)
		}
		if isBRelative {
			// A is non-relative, B is relative: prefer A
			return -1
		}
		// A is relative, B is non-relative: prefer B
		return 1
	}
	return b_.ch.compareSymbols(a.sym, b.sym) // must sort symbols for stable ordering
}

func isAmbientModuleSymbolName(s string) bool {
	return strings.HasPrefix(s, "\"") && strings.HasSuffix(s, "\"")
}

func canHaveModuleSpecifier(node *ast.Node) bool {
	if node == nil {
		return false
	}
	switch node.Kind {
	case ast.KindVariableDeclaration,
		ast.KindBindingElement,
		ast.KindImportDeclaration,
		ast.KindExportDeclaration,
		ast.KindImportEqualsDeclaration,
		ast.KindImportClause,
		ast.KindNamespaceExport,
		ast.KindNamespaceImport,
		ast.KindExportSpecifier,
		ast.KindImportSpecifier,
		ast.KindImportType:
		return true
	}
	return false
}

func TryGetModuleSpecifierFromDeclaration(node *ast.Node) *ast.Node {
	res := tryGetModuleSpecifierFromDeclarationWorker(node)
	if res == nil || !ast.IsStringLiteral(res) {
		return nil
	}
	return res
}

func tryGetModuleSpecifierFromDeclarationWorker(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindVariableDeclaration, ast.KindBindingElement:
		requireCall := ast.FindAncestor(node.Initializer(), func(node *ast.Node) bool {
			return ast.IsRequireCall(node, true /*requireStringLiteralLikeArgument*/)
		})
		if requireCall == nil {
			return nil
		}
		return requireCall.AsCallExpression().Arguments.Nodes[0]
	case ast.KindImportDeclaration:
		return node.AsImportDeclaration().ModuleSpecifier
	case ast.KindExportDeclaration:
		return node.AsExportDeclaration().ModuleSpecifier
	case ast.KindJSDocImportTag:
		return node.AsJSDocImportTag().ModuleSpecifier
	case ast.KindImportEqualsDeclaration:
		ref := node.AsImportEqualsDeclaration().ModuleReference
		if ref.Kind != ast.KindExternalModuleReference {
			return nil
		}
		return ref.AsExternalModuleReference().Expression
	case ast.KindImportClause:
		if ast.IsImportDeclaration(node.Parent) {
			return node.Parent.AsImportDeclaration().ModuleSpecifier
		}
		return node.Parent.AsJSDocImportTag().ModuleSpecifier
	case ast.KindNamespaceExport:
		return node.Parent.AsExportDeclaration().ModuleSpecifier
	case ast.KindNamespaceImport:
		if ast.IsImportDeclaration(node.Parent.Parent) {
			return node.Parent.Parent.AsImportDeclaration().ModuleSpecifier
		}
		return node.Parent.Parent.AsJSDocImportTag().ModuleSpecifier
	case ast.KindExportSpecifier:
		return node.Parent.Parent.AsExportDeclaration().ModuleSpecifier
	case ast.KindImportSpecifier:
		if ast.IsImportDeclaration(node.Parent.Parent.Parent) {
			return node.Parent.Parent.Parent.AsImportDeclaration().ModuleSpecifier
		}
		return node.Parent.Parent.Parent.AsJSDocImportTag().ModuleSpecifier
	case ast.KindImportType:
		if ast.IsLiteralImportTypeNode(node) {
			return node.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal
		}
		return nil
	default:
		debug.AssertNever(node)
		return nil
	}
}

func (b *nodeBuilderImpl) getSpecifierForModuleSymbol(symbol *ast.Symbol, overrideImportMode core.ResolutionMode) string {
	file := ast.GetDeclarationOfKind(symbol, ast.KindSourceFile)
	if file == nil {
		equivalentSymbol := core.FirstNonNil(symbol.Declarations, func(d *ast.Node) *ast.Symbol {
			return b.ch.getFileSymbolIfFileSymbolExportEqualsContainer(d, symbol)
		})
		if equivalentSymbol != nil {
			file = ast.GetDeclarationOfKind(equivalentSymbol, ast.KindSourceFile)
		}
	}

	if file == nil {
		if isAmbientModuleSymbolName(symbol.Name) {
			return stringutil.StripQuotes(symbol.Name)
		}
	}
	if b.ctx.enclosingFile == nil || b.ctx.tracker.GetModuleSpecifierGenerationHost() == nil {
		if isAmbientModuleSymbolName(symbol.Name) {
			return stringutil.StripQuotes(symbol.Name)
		}
		return ast.GetSourceFileOfModule(symbol).FileName()
	}

	enclosingDeclaration := b.e.MostOriginal(b.ctx.enclosingDeclaration)
	var originalModuleSpecifier *ast.Node
	if canHaveModuleSpecifier(enclosingDeclaration) {
		originalModuleSpecifier = TryGetModuleSpecifierFromDeclaration(enclosingDeclaration)
	}
	contextFile := b.ctx.enclosingFile
	resolutionMode := overrideImportMode
	if resolutionMode == core.ResolutionModeNone && originalModuleSpecifier != nil {
		resolutionMode = b.ch.program.GetModeForUsageLocation(contextFile, originalModuleSpecifier)
	} else if resolutionMode == core.ResolutionModeNone && contextFile != nil {
		resolutionMode = b.ch.program.GetDefaultResolutionModeForFile(contextFile)
	}
	cacheKey := module.ModeAwareCacheKey{Name: string(contextFile.Path()), Mode: resolutionMode}
	links := b.symbolLinks.Get(symbol)
	if links.specifierCache == nil {
		links.specifierCache = make(module.ModeAwareCache[string])
	}
	result, ok := links.specifierCache[cacheKey]
	if ok {
		return result
	}
	isBundle := false // !!! remove me
	// For declaration bundles, we need to generate absolute paths relative to the common source dir for imports,
	// just like how the declaration emitter does for the ambient module declarations - we can easily accomplish this
	// using the `baseUrl` compiler option (which we would otherwise never use in declaration emit) and a non-relative
	// specifier preference
	host := b.ctx.tracker.GetModuleSpecifierGenerationHost()
	specifierCompilerOptions := b.ch.compilerOptions
	specifierPref := modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative
	endingPref := modulespecifiers.ImportModuleSpecifierEndingPreferenceNone
	if resolutionMode == core.ResolutionModeESM {
		endingPref = modulespecifiers.ImportModuleSpecifierEndingPreferenceJs
	}
	if isBundle {
		// !!! relies on option cloning and specifier host implementation
		// specifierCompilerOptions = &core.CompilerOptions{BaseUrl: host.CommonSourceDirectory()}
		// TODO: merge with b.ch.compilerOptions
		specifierPref = modulespecifiers.ImportModuleSpecifierPreferenceNonRelative
		endingPref = modulespecifiers.ImportModuleSpecifierEndingPreferenceMinimal
	}

	allSpecifiers := modulespecifiers.GetModuleSpecifiers(
		symbol,
		b.ch,
		specifierCompilerOptions,
		contextFile,
		host,
		modulespecifiers.UserPreferences{
			ImportModuleSpecifierPreference: specifierPref,
			ImportModuleSpecifierEnding:     endingPref,
		},
		modulespecifiers.ModuleSpecifierOptions{
			OverrideImportMode: overrideImportMode,
		},
		false, /*forAutoImports*/
	)
	specifier := allSpecifiers[0]
	links.specifierCache[cacheKey] = specifier
	return specifier
}

func (b *nodeBuilderImpl) typeParameterToDeclarationWithConstraint(typeParameter *Type, constraintNode *ast.TypeNode) *ast.TypeParameterDeclarationNode {
	restoreFlags := b.saveRestoreFlags()
	b.ctx.flags &= ^nodebuilder.FlagsWriteTypeParametersInQualifiedName // Avoids potential infinite loop when building for a claimspace with a generic
	modifiers := ast.CreateModifiersFromModifierFlags(b.ch.getTypeParameterModifiers(typeParameter), b.f.NewModifier)
	var modifiersList *ast.ModifierList
	if len(modifiers) > 0 {
		modifiersList = b.f.NewModifierList(modifiers)
	}
	name := b.typeParameterToName(typeParameter)
	defaultParameter := b.ch.getDefaultFromTypeParameter(typeParameter)
	var defaultParameterNode *ast.Node
	if defaultParameter != nil {
		defaultParameterNode = b.typeToTypeNode(defaultParameter)
	}
	restoreFlags()
	return b.f.NewTypeParameterDeclaration(
		modifiersList,
		name.AsNode(),
		constraintNode,
		defaultParameterNode,
	)
}

/**
* Unlike the utilities `setTextRange`, this checks if the `location` we're trying to set on `range` is within the
* same file as the active context. If not, the range is not applied. This prevents us from copying ranges across files,
* which will confuse the node printer (as it assumes all node ranges are within the current file).
* Additionally, if `range` _isn't synthetic_, or isn't in the current file, it will _copy_ it to _remove_ its' position
* information.
*
* It also calls `setOriginalNode` to setup a `.original` pointer, since you basically *always* want these in the node builder.
 */
func (b *nodeBuilderImpl) setTextRange(range_ *ast.Node, location *ast.Node) *ast.Node {
	if range_ == nil {
		return range_
	}
	if !ast.NodeIsSynthesized(range_) || (range_.Flags&ast.NodeFlagsSynthesized == 0) || b.ctx.enclosingFile == nil || b.ctx.enclosingFile != ast.GetSourceFileOfNode(b.e.MostOriginal(range_)) {
		range_ = range_.Clone(b.f) // if `range` is synthesized or originates in another file, copy it so it definitely has synthetic positions
	}
	if range_ == location || location == nil {
		return range_
	}
	// Don't overwrite the original node if `range` has an `original` node that points either directly or indirectly to `location`
	original := b.e.Original(range_)
	for original != nil && original != location {
		original = b.e.Original(original)
	}
	if original == nil {
		b.e.SetOriginalEx(range_, location, true)
	}

	// only set positions if range comes from the same file since copying text across files isn't supported by the emitter
	if b.ctx.enclosingFile != nil && b.ctx.enclosingFile == ast.GetSourceFileOfNode(b.e.MostOriginal(range_)) {
		range_.Loc = location.Loc
		return range_
	}
	return range_
}

func (b *nodeBuilderImpl) typeParameterShadowsOtherTypeParameterInScope(name string, typeParameter *Type) bool {
	result := b.ch.resolveName(b.ctx.enclosingDeclaration, name, ast.SymbolFlagsType, nil, false, false)
	if result != nil && result.Flags&ast.SymbolFlagsTypeParameter != 0 {
		return result != typeParameter.symbol
	}
	return false
}

func (b *nodeBuilderImpl) typeParameterToName(typeParameter *Type) *ast.Identifier {
	if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && b.ctx.typeParameterNames != nil {
		cached, ok := b.ctx.typeParameterNames[typeParameter.id]
		if ok {
			return cached
		}
	}
	result := b.symbolToName(typeParameter.symbol, ast.SymbolFlagsType /*expectsIdentifier*/, true)
	if !ast.IsIdentifier(result) {
		return b.f.NewIdentifier("(Missing type parameter)").AsIdentifier()
	}
	if typeParameter.symbol != nil && len(typeParameter.symbol.Declarations) > 0 {
		decl := typeParameter.symbol.Declarations[0]
		if decl != nil && ast.IsTypeParameterDeclaration(decl) {
			result = b.setTextRange(result, decl.Name())
		}
	}
	if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 {
		if !b.ctx.hasCreatedTypeParametersNamesLookups {
			b.ctx.hasCreatedTypeParametersNamesLookups = true
			b.ctx.typeParameterNames = make(map[TypeId]*ast.Identifier)
			b.ctx.typeParameterNamesByText = make(map[string]struct{})
			b.ctx.typeParameterNamesByTextNextNameCount = make(map[string]int)
		}

		rawText := result.AsIdentifier().Text
		i := 0
		cached, ok := b.ctx.typeParameterNamesByTextNextNameCount[rawText]
		if ok {
			i = cached
		}
		text := rawText

		for true {
			_, present := b.ctx.typeParameterNamesByText[text]
			if !present && !b.typeParameterShadowsOtherTypeParameterInScope(text, typeParameter) {
				break
			}
			i++
			text = fmt.Sprintf("%s_%d", rawText, i)
		}

		if text != rawText {
			// !!! TODO: smuggle type arguments out
			// const typeArguments = getIdentifierTypeArguments(result);
			result = b.f.NewIdentifier(text)
			// setIdentifierTypeArguments(result, typeArguments);
		}

		// avoiding iterations of the above loop turns out to be worth it when `i` starts to get large, so we cache the max
		// `i` we've used thus far, to save work later
		b.ctx.typeParameterNamesByTextNextNameCount[rawText] = i
		b.ctx.typeParameterNames[typeParameter.id] = result.AsIdentifier()
		b.ctx.typeParameterNamesByText[text] = struct{}{}
	}

	return result.AsIdentifier()
}

func (b *nodeBuilderImpl) isMappedTypeHomomorphic(mapped *Type) bool {
	return b.ch.getHomomorphicTypeVariable(mapped) != nil
}

func (b *nodeBuilderImpl) isHomomorphicMappedTypeWithNonHomomorphicInstantiation(mapped *MappedType) bool {
	return mapped.target != nil && !b.isMappedTypeHomomorphic(mapped.AsType()) && b.isMappedTypeHomomorphic(mapped.target)
}

func (b *nodeBuilderImpl) createMappedTypeNodeFromType(t *Type) *ast.TypeNode {
	debug.Assert(t.Flags()&TypeFlagsObject != 0)
	mapped := t.AsMappedType()
	var readonlyToken *ast.Node
	if mapped.declaration.ReadonlyToken != nil {
		readonlyToken = b.f.NewToken(mapped.declaration.ReadonlyToken.Kind)
	}
	var questionToken *ast.Node
	if mapped.declaration.QuestionToken != nil {
		questionToken = b.f.NewToken(mapped.declaration.QuestionToken.Kind)
	}
	var appropriateConstraintTypeNode *ast.Node
	var newTypeVariable *ast.Node

	// If the mapped type isn't `keyof` constraint-declared, _but_ still has modifiers preserved, and its naive instantiation won't preserve modifiers because its constraint isn't `keyof` constrained, we have work to do
	needsModifierPreservingWrapper := !b.ch.isMappedTypeWithKeyofConstraintDeclaration(t) &&
		b.ch.getModifiersTypeFromMappedType(t).flags&TypeFlagsUnknown == 0 &&
		b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 &&
		!(b.ch.getConstraintTypeFromMappedType(t).flags&TypeFlagsTypeParameter != 0 && b.ch.getConstraintOfTypeParameter(b.ch.getConstraintTypeFromMappedType(t)).flags&TypeFlagsIndex != 0)

	cleanup := b.enterNewScope(mapped.declaration.AsNode(), nil, []*Type{b.ch.getTypeParameterFromMappedType(t)}, nil, nil)
	defer cleanup()

	if b.ch.isMappedTypeWithKeyofConstraintDeclaration(t) {
		// We have a { [P in keyof T]: X }
		// We do this to ensure we retain the toplevel keyof-ness of the type which may be lost due to keyof distribution during `getConstraintTypeFromMappedType`
		if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && b.isHomomorphicMappedTypeWithNonHomomorphicInstantiation(mapped) {
			newParam := b.ch.newTypeParameter(
				b.ch.newSymbol(ast.SymbolFlagsTypeParameter, "T"),
			)
			name := b.typeParameterToName(newParam)
			newTypeVariable = b.f.NewTypeReferenceNode(name.AsNode(), nil)
		}
		indexTarget := newTypeVariable
		if indexTarget == nil {
			indexTarget = b.typeToTypeNode(b.ch.getModifiersTypeFromMappedType(t))
		}
		appropriateConstraintTypeNode = b.f.NewTypeOperatorNode(ast.KindKeyOfKeyword, indexTarget)
	} else if needsModifierPreservingWrapper {
		// So, step 1: new type variable
		newParam := b.ch.newTypeParameter(
			b.ch.newSymbol(ast.SymbolFlagsTypeParameter, "T"),
		)
		name := b.typeParameterToName(newParam)
		newTypeVariable = b.f.NewTypeReferenceNode(name.AsNode(), nil)
		// step 2: make that new type variable itself the constraint node, making the mapped type `{[K in T_1]: Template}`
		appropriateConstraintTypeNode = newTypeVariable
	} else {
		appropriateConstraintTypeNode = b.typeToTypeNode(b.ch.getConstraintTypeFromMappedType(t))
	}

	typeParameterNode := b.typeParameterToDeclarationWithConstraint(b.ch.getTypeParameterFromMappedType(t), appropriateConstraintTypeNode)
	var nameTypeNode *ast.Node
	if mapped.declaration.NameType != nil {
		nameTypeNode = b.typeToTypeNode(b.ch.getNameTypeFromMappedType(t))
	}
	templateTypeNode := b.typeToTypeNode(b.ch.removeMissingType(
		b.ch.getTemplateTypeFromMappedType(t),
		getMappedTypeModifiers(t)&MappedTypeModifiersIncludeOptional != 0,
	))
	result := b.f.NewMappedTypeNode(
		readonlyToken,
		typeParameterNode,
		nameTypeNode,
		questionToken,
		templateTypeNode,
		nil,
	)
	b.ctx.approximateLength += 10
	b.e.AddEmitFlags(result, printer.EFSingleLine)

	if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && b.isHomomorphicMappedTypeWithNonHomomorphicInstantiation(mapped) {
		// homomorphic mapped type with a non-homomorphic naive inlining
		// wrap it with a conditional like `SomeModifiersType extends infer U ? {..the mapped type...} : never` to ensure the resulting
		// type stays homomorphic

		rawConstraintTypeFromDeclaration := b.getTypeFromTypeNode(mapped.declaration.TypeParameter.AsTypeParameter().Constraint.AsTypeOperatorNode().Type, false)
		if rawConstraintTypeFromDeclaration != nil {
			rawConstraintTypeFromDeclaration = b.ch.getConstraintOfTypeParameter(rawConstraintTypeFromDeclaration)
		}
		if rawConstraintTypeFromDeclaration == nil {
			rawConstraintTypeFromDeclaration = b.ch.unknownType
		}
		originalConstraint := b.ch.instantiateType(rawConstraintTypeFromDeclaration, mapped.mapper)

		var originalConstraintNode *ast.Node
		if originalConstraint.flags&TypeFlagsUnknown != 0 {
			originalConstraintNode = b.typeToTypeNode(originalConstraint)
		}

		return b.f.NewConditionalTypeNode(
			b.typeToTypeNode(b.ch.getModifiersTypeFromMappedType(t)),
			b.f.NewInferTypeNode(b.f.NewTypeParameterDeclaration(nil, newTypeVariable.AsTypeReference().TypeName.Clone(b.f), originalConstraintNode, nil)),
			result,
			b.f.NewKeywordTypeNode(ast.KindNeverKeyword),
		)
	} else if needsModifierPreservingWrapper {
		// and step 3: once the mapped type is reconstructed, create a `ConstraintType extends infer T_1 extends keyof ModifiersType ? {[K in T_1]: Template} : never`
		// subtly different from the `keyof` constraint case, by including the `keyof` constraint on the `infer` type parameter, it doesn't rely on the constraint type being itself
		// constrained to a `keyof` type to preserve its modifier-preserving behavior. This is all basically because we preserve modifiers for a wider set of mapped types than
		// just homomorphic ones.
		return b.f.NewConditionalTypeNode(
			b.typeToTypeNode(b.ch.getConstraintTypeFromMappedType(t)),
			b.f.NewInferTypeNode(b.f.NewTypeParameterDeclaration(nil, newTypeVariable.AsTypeReference().TypeName.Clone(b.f), b.f.NewTypeOperatorNode(ast.KindKeyOfKeyword, b.typeToTypeNode(b.ch.getModifiersTypeFromMappedType(t))), nil)),
			result,
			b.f.NewKeywordTypeNode(ast.KindNeverKeyword),
		)
	}

	return result
}

func (b *nodeBuilderImpl) typePredicateToTypePredicateNode(predicate *TypePredicate) *ast.Node {
	var assertsModifier *ast.Node
	if predicate.kind == TypePredicateKindAssertsIdentifier || predicate.kind == TypePredicateKindAssertsThis {
		assertsModifier = b.f.NewToken(ast.KindAssertsKeyword)
	}
	var parameterName *ast.Node
	if predicate.kind == TypePredicateKindIdentifier || predicate.kind == TypePredicateKindAssertsIdentifier {
		parameterName = b.f.NewIdentifier(predicate.parameterName)
		b.e.AddEmitFlags(parameterName, printer.EFNoAsciiEscaping)
	} else {
		parameterName = b.f.NewThisTypeNode()
	}
	var typeNode *ast.Node
	if predicate.t != nil {
		typeNode = b.typeToTypeNode(predicate.t)
	}
	return b.f.NewTypePredicateNode(
		assertsModifier,
		parameterName,
		typeNode,
	)
}

func (b *nodeBuilderImpl) typeToTypeNodeHelperWithPossibleReusableTypeNode(t *Type, typeNode *ast.TypeNode) *ast.TypeNode {
	if t == nil {
		return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
	}
	if typeNode != nil && b.getTypeFromTypeNode(typeNode, false) == t {
		reused := b.tryReuseExistingTypeNodeHelper(typeNode)
		if reused != nil {
			return reused
		}
	}
	return b.typeToTypeNode(t)
}

func (b *nodeBuilderImpl) typeParameterToDeclaration(parameter *Type) *ast.Node {
	constraint := b.ch.getConstraintOfTypeParameter(parameter)
	var constraintNode *ast.Node
	if constraint != nil {
		constraintNode = b.typeToTypeNodeHelperWithPossibleReusableTypeNode(constraint, b.ch.getConstraintDeclaration(parameter))
	}
	return b.typeParameterToDeclarationWithConstraint(parameter, constraintNode)
}

func (b *nodeBuilderImpl) symbolToTypeParameterDeclarations(symbol *ast.Symbol) []*ast.Node {
	return b.typeParametersToTypeParameterDeclarations(symbol)
}

func (b *nodeBuilderImpl) typeParametersToTypeParameterDeclarations(symbol *ast.Symbol) []*ast.Node {
	targetSymbol := b.ch.getTargetSymbol(symbol)
	if targetSymbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface|ast.SymbolFlagsAlias) != 0 {
		var results []*ast.Node
		params := b.ch.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)
		for _, param := range params {
			results = append(results, b.typeParameterToDeclaration(param))
		}
		return results
	} else if targetSymbol.Flags&ast.SymbolFlagsFunction != 0 {
		var results []*ast.Node
		for _, param := range b.ch.getTypeParametersFromDeclaration(symbol.ValueDeclaration) {
			results = append(results, b.typeParameterToDeclaration(param))
		}
		return results
	}
	return nil
}

func getEffectiveParameterDeclaration(symbol *ast.Symbol) *ast.Node {
	parameterDeclaration := ast.GetDeclarationOfKind(symbol, ast.KindParameter)
	if parameterDeclaration != nil {
		return parameterDeclaration
	}
	if symbol.Flags&ast.SymbolFlagsTransient == 0 {
		return ast.GetDeclarationOfKind(symbol, ast.KindJSDocParameterTag)
	}
	return nil
}

func (b *nodeBuilderImpl) symbolToParameterDeclaration(parameterSymbol *ast.Symbol, preserveModifierFlags bool) *ast.Node {
	parameterDeclaration := getEffectiveParameterDeclaration(parameterSymbol)

	parameterType := b.ch.getTypeOfSymbol(parameterSymbol)
	parameterTypeNode := b.serializeTypeForDeclaration(parameterDeclaration, parameterType, parameterSymbol)
	var modifiers *ast.ModifierList
	if b.ctx.flags&nodebuilder.FlagsOmitParameterModifiers == 0 && preserveModifierFlags && parameterDeclaration != nil && ast.CanHaveModifiers(parameterDeclaration) {
		originals := core.Filter(parameterDeclaration.Modifiers().Nodes, ast.IsModifier)
		clones := core.Map(originals, func(node *ast.Node) *ast.Node { return node.Clone(b.f) })
		if len(clones) > 0 {
			modifiers = b.f.NewModifierList(clones)
		}
	}
	isRest := parameterDeclaration != nil && isRestParameter(parameterDeclaration) || parameterSymbol.CheckFlags&ast.CheckFlagsRestParameter != 0
	var dotDotDotToken *ast.Node
	if isRest {
		dotDotDotToken = b.f.NewToken(ast.KindDotDotDotToken)
	}
	name := b.parameterToParameterDeclarationName(parameterSymbol, parameterDeclaration)
	// TODO: isOptionalParameter on emit resolver here is silly - hoist to checker and reexpose on emit resolver?
	isOptional := parameterDeclaration != nil && b.ch.GetEmitResolver().isOptionalParameter(parameterDeclaration) || parameterSymbol.CheckFlags&ast.CheckFlagsOptionalParameter != 0
	var questionToken *ast.Node
	if isOptional {
		questionToken = b.f.NewToken(ast.KindQuestionToken)
	}

	parameterNode := b.f.NewParameterDeclaration(
		modifiers,
		dotDotDotToken,
		name,
		questionToken,
		parameterTypeNode,
		/*initializer*/ nil,
	)
	b.ctx.approximateLength += len(parameterSymbol.Name) + 3
	return parameterNode
}

func (b *nodeBuilderImpl) parameterToParameterDeclarationName(parameterSymbol *ast.Symbol, parameterDeclaration *ast.Node) *ast.Node {
	if parameterDeclaration == nil || parameterDeclaration.Name() == nil {
		return b.f.NewIdentifier(parameterSymbol.Name)
	}

	name := parameterDeclaration.Name()
	switch name.Kind {
	case ast.KindIdentifier:
		cloned := b.f.DeepCloneNode(name)
		b.e.SetEmitFlags(cloned, printer.EFNoAsciiEscaping)
		return cloned
	case ast.KindQualifiedName:
		cloned := b.f.DeepCloneNode(name.AsQualifiedName().Right)
		b.e.SetEmitFlags(cloned, printer.EFNoAsciiEscaping)
		return cloned
	default:
		return b.cloneBindingName(name)
	}
}

func (b *nodeBuilderImpl) cloneBindingName(node *ast.Node) *ast.Node {
	if ast.IsComputedPropertyName(node) && b.ch.isLateBindableName(node) {
		b.trackComputedName(node.Expression(), b.ctx.enclosingDeclaration)
	}

	visited := b.cloneBindingNameVisitor.VisitEachChild(node)

	if ast.IsBindingElement(visited) {
		bindingElement := visited.AsBindingElement()
		visited = b.f.UpdateBindingElement(
			bindingElement,
			bindingElement.DotDotDotToken,
			bindingElement.PropertyName,
			bindingElement.Name(),
			nil, // remove initializer
		)
	}

	if !ast.NodeIsSynthesized(visited) {
		visited = b.f.DeepCloneNode(visited)
	}

	b.e.SetEmitFlags(visited, printer.EFSingleLine|printer.EFNoAsciiEscaping)
	return visited
}

func (b *nodeBuilderImpl) symbolTableToDeclarationStatements(symbolTable *ast.SymbolTable) []*ast.Node {
	panic("unimplemented") // !!!
}

func (b *nodeBuilderImpl) serializeTypeForExpression(expr *ast.Node) *ast.Node {
	// !!! TODO: shim, add node reuse
	t := b.ch.instantiateType(b.ch.getWidenedType(b.ch.getRegularTypeOfExpression(expr)), b.ctx.mapper)
	return b.typeToTypeNode(t)
}

func (b *nodeBuilderImpl) serializeInferredReturnTypeForSignature(signature *Signature, returnType *Type) *ast.Node {
	oldSuppressReportInferenceFallback := b.ctx.suppressReportInferenceFallback
	b.ctx.suppressReportInferenceFallback = true
	typePredicate := b.ch.getTypePredicateOfSignature(signature)
	var returnTypeNode *ast.Node
	if typePredicate != nil {
		var predicate *TypePredicate
		if b.ctx.mapper != nil {
			predicate = b.ch.instantiateTypePredicate(typePredicate, b.ctx.mapper)
		} else {
			predicate = typePredicate
		}
		returnTypeNode = b.typePredicateToTypePredicateNodeHelper(predicate)
	} else {
		returnTypeNode = b.typeToTypeNode(returnType)
	}
	b.ctx.suppressReportInferenceFallback = oldSuppressReportInferenceFallback
	return returnTypeNode
}

func (b *nodeBuilderImpl) typePredicateToTypePredicateNodeHelper(typePredicate *TypePredicate) *ast.Node {
	var assertsModifier *ast.Node
	if typePredicate.kind == TypePredicateKindAssertsThis || typePredicate.kind == TypePredicateKindAssertsIdentifier {
		assertsModifier = b.f.NewToken(ast.KindAssertsKeyword)
	} else {
		assertsModifier = nil
	}
	var parameterName *ast.Node
	if typePredicate.kind == TypePredicateKindIdentifier || typePredicate.kind == TypePredicateKindAssertsIdentifier {
		parameterName = b.f.NewIdentifier(typePredicate.parameterName)
		b.e.SetEmitFlags(parameterName, printer.EFNoAsciiEscaping)
	} else {
		parameterName = b.f.NewThisTypeNode()
	}
	var typeNode *ast.Node
	if typePredicate.t != nil {
		typeNode = b.typeToTypeNode(typePredicate.t)
	}
	return b.f.NewTypePredicateNode(assertsModifier, parameterName, typeNode)
}

type SignatureToSignatureDeclarationOptions struct {
	modifiers     []*ast.Node
	name          *ast.PropertyName
	questionToken *ast.Node
}

func (b *nodeBuilderImpl) signatureToSignatureDeclarationHelper(signature *Signature, kind ast.Kind, options *SignatureToSignatureDeclarationOptions) *ast.Node {
	var typeParameters []*ast.Node

	expandedParams := b.ch.getExpandedParameters(signature, true /*skipUnionExpanding*/)[0]
	cleanup := b.enterNewScope(signature.declaration, expandedParams, signature.typeParameters, signature.parameters, signature.mapper)
	b.ctx.approximateLength += 3
	// Usually a signature contributes a few more characters than this, but 3 is the minimum

	if b.ctx.flags&nodebuilder.FlagsWriteTypeArgumentsOfSignature != 0 && signature.target != nil && signature.mapper != nil && len(signature.target.typeParameters) != 0 {
		for _, parameter := range signature.target.typeParameters {
			typeParameters = append(typeParameters, b.typeToTypeNode(b.ch.instantiateType(parameter, signature.mapper)))
		}
	} else {
		for _, parameter := range signature.typeParameters {
			typeParameters = append(typeParameters, b.typeParameterToDeclaration(parameter))
		}
	}

	restoreFlags := b.saveRestoreFlags()
	b.ctx.flags &^= nodebuilder.FlagsSuppressAnyReturnType
	// If the expanded parameter list had a variadic in a non-trailing position, don't expand it
	parameters := core.Map(core.IfElse(core.Some(expandedParams, func(p *ast.Symbol) bool {
		return p != expandedParams[len(expandedParams)-1] && p.CheckFlags&ast.CheckFlagsRestParameter != 0
	}), signature.parameters, expandedParams), func(parameter *ast.Symbol) *ast.Node {
		return b.symbolToParameterDeclaration(parameter, kind == ast.KindConstructor)
	})
	var thisParameter *ast.Node
	if b.ctx.flags&nodebuilder.FlagsOmitThisParameter != 0 {
		thisParameter = nil
	} else {
		thisParameter = b.tryGetThisParameterDeclaration(signature)
	}
	if thisParameter != nil {
		parameters = append([]*ast.Node{thisParameter}, parameters...)
	}
	restoreFlags()

	returnTypeNode := b.serializeReturnTypeForSignature(signature)

	var modifiers []*ast.Node
	if options != nil {
		modifiers = options.modifiers
	}
	if (kind == ast.KindConstructorType) && signature.flags&SignatureFlagsAbstract != 0 {
		flags := ast.ModifiersToFlags(modifiers)
		modifiers = ast.CreateModifiersFromModifierFlags(flags|ast.ModifierFlagsAbstract, b.f.NewModifier)
	}

	paramList := b.f.NewNodeList(parameters)
	var typeParamList *ast.NodeList
	if len(typeParameters) != 0 {
		typeParamList = b.f.NewNodeList(typeParameters)
	}
	var modifierList *ast.ModifierList
	if len(modifiers) > 0 {
		modifierList = b.f.NewModifierList(modifiers)
	}
	var name *ast.Node
	if options != nil {
		name = options.name
	}
	if name == nil {
		name = b.f.NewIdentifier("")
	}

	var node *ast.Node
	switch {
	case kind == ast.KindCallSignature:
		node = b.f.NewCallSignatureDeclaration(typeParamList, paramList, returnTypeNode)
	case kind == ast.KindConstructSignature:
		node = b.f.NewConstructSignatureDeclaration(typeParamList, paramList, returnTypeNode)
	case kind == ast.KindMethodSignature:
		var questionToken *ast.Node
		if options != nil {
			questionToken = options.questionToken
		}
		node = b.f.NewMethodSignatureDeclaration(modifierList, name, questionToken, typeParamList, paramList, returnTypeNode)
	case kind == ast.KindMethodDeclaration:
		node = b.f.NewMethodDeclaration(modifierList, nil /*asteriskToken*/, name, nil /*questionToken*/, typeParamList, paramList, returnTypeNode, nil /*fullSignature*/, nil /*body*/)
	case kind == ast.KindConstructor:
		node = b.f.NewConstructorDeclaration(modifierList, nil /*typeParamList*/, paramList, nil /*returnTypeNode*/, nil /*fullSignature*/, nil /*body*/)
	case kind == ast.KindGetAccessor:
		node = b.f.NewGetAccessorDeclaration(modifierList, name, nil /*typeParamList*/, paramList, returnTypeNode, nil /*fullSignature*/, nil /*body*/)
	case kind == ast.KindSetAccessor:
		node = b.f.NewSetAccessorDeclaration(modifierList, name, nil /*typeParamList*/, paramList, nil /*returnTypeNode*/, nil /*fullSignature*/, nil /*body*/)
	case kind == ast.KindIndexSignature:
		node = b.f.NewIndexSignatureDeclaration(modifierList, paramList, returnTypeNode)
	// !!! JSDoc Support
	// case kind == ast.KindJSDocFunctionType:
	// 	node = b.f.NewJSDocFunctionType(parameters, returnTypeNode)
	case kind == ast.KindFunctionType:
		if returnTypeNode == nil {
			returnTypeNode = b.f.NewTypeReferenceNode(b.f.NewIdentifier(""), nil)
		}
		node = b.f.NewFunctionTypeNode(typeParamList, paramList, returnTypeNode)
	case kind == ast.KindConstructorType:
		if returnTypeNode == nil {
			returnTypeNode = b.f.NewTypeReferenceNode(b.f.NewIdentifier(""), nil)
		}
		node = b.f.NewConstructorTypeNode(modifierList, typeParamList, paramList, returnTypeNode)
	case kind == ast.KindFunctionDeclaration:
		// TODO: assert name is Identifier
		node = b.f.NewFunctionDeclaration(modifierList, nil /*asteriskToken*/, name, typeParamList, paramList, returnTypeNode, nil /*fullSignature*/, nil /*body*/)
	case kind == ast.KindFunctionExpression:
		// TODO: assert name is Identifier
		node = b.f.NewFunctionExpression(modifierList, nil /*asteriskToken*/, name, typeParamList, paramList, returnTypeNode, nil /*fullSignature*/, b.f.NewBlock(b.f.NewNodeList([]*ast.Node{}), false))
	case kind == ast.KindArrowFunction:
		node = b.f.NewArrowFunction(modifierList, typeParamList, paramList, returnTypeNode, nil /*fullSignature*/, nil /*equalsGreaterThanToken*/, b.f.NewBlock(b.f.NewNodeList([]*ast.Node{}), false))
	default:
		panic("Unhandled kind in signatureToSignatureDeclarationHelper")
	}

	// !!! TODO: Smuggle type arguments of signatures out for quickinfo
	// if typeArguments != nil {
	// 	node.TypeArguments = b.f.NewNodeList(typeArguments)
	// }

	cleanup()
	return node
}

func (c *Checker) getExpandedParameters(sig *Signature, skipUnionExpanding bool) [][]*ast.Symbol {
	if signatureHasRestParameter(sig) {
		restIndex := len(sig.parameters) - 1
		restSymbol := sig.parameters[restIndex]
		restType := c.getTypeOfSymbol(restSymbol)
		getUniqAssociatedNamesFromTupleType := func(t *Type, restSymbol *ast.Symbol) []string {
			names := core.MapIndex(t.Target().AsTupleType().elementInfos, func(info TupleElementInfo, i int) string {
				return c.getTupleElementLabel(info, restSymbol, i)
			})
			if len(names) > 0 {
				duplicates := []int{}
				uniqueNames := make(map[string]bool)
				for i, name := range names {
					_, ok := uniqueNames[name]
					if ok {
						duplicates = append(duplicates, i)
					} else {
						uniqueNames[name] = true
					}
				}
				counters := make(map[string]int)
				for _, i := range duplicates {
					counter, ok := counters[names[i]]
					if !ok {
						counter = 1
					}
					var name string
					for true {
						name = fmt.Sprintf("%s_%d", names[i], counter)
						_, ok := uniqueNames[name]
						if ok {
							counter++
							continue
						} else {
							uniqueNames[name] = true
							break
						}
					}
					names[i] = name
					counters[names[i]] = counter + 1
				}
			}
			return names
		}
		expandSignatureParametersWithTupleMembers := func(restType *Type, restIndex int, restSymbol *ast.Symbol) []*ast.Symbol {
			elementTypes := c.getTypeArguments(restType)
			associatedNames := getUniqAssociatedNamesFromTupleType(restType, restSymbol)
			restParams := core.MapIndex(elementTypes, func(t *Type, i int) *ast.Symbol {
				// Lookup the label from the individual tuple passed in before falling back to the signature `rest` parameter name
				// TODO: getTupleElementLabel can no longer fail, investigate if this lack of falliability meaningfully changes output
				// var name *string
				// if associatedNames != nil && associatedNames[i] != nil {
				// 	name = associatedNames[i]
				// } else {
				// 	name = c.getParameterNameAtPosition(sig, restIndex+i, restType)
				// }
				name := associatedNames[i]
				flags := restType.Target().AsTupleType().elementInfos[i].flags
				var checkFlags ast.CheckFlags
				switch {
				case flags&ElementFlagsVariable != 0:
					checkFlags = ast.CheckFlagsRestParameter
				case flags&ElementFlagsOptional != 0:
					checkFlags = ast.CheckFlagsOptionalParameter
				}
				symbol := c.newSymbolEx(ast.SymbolFlagsFunctionScopedVariable, name, checkFlags)
				links := c.valueSymbolLinks.Get(symbol)
				if flags&ElementFlagsRest != 0 {
					links.resolvedType = c.createArrayType(t)
				} else {
					links.resolvedType = t
				}
				return symbol
			})
			return core.Concatenate(sig.parameters[0:restIndex], restParams)
		}

		if isTupleType(restType) {
			return [][]*ast.Symbol{expandSignatureParametersWithTupleMembers(restType, restIndex, restSymbol)}
		} else if !skipUnionExpanding && restType.flags&TypeFlagsUnion != 0 && core.Every(restType.AsUnionType().types, isTupleType) {
			return core.Map(restType.AsUnionType().types, func(t *Type) []*ast.Symbol {
				return expandSignatureParametersWithTupleMembers(t, restIndex, restSymbol)
			})
		}
	}
	return [][]*ast.Symbol{sig.parameters}
}

func (b *nodeBuilderImpl) tryGetThisParameterDeclaration(signature *Signature) *ast.Node {
	if signature.thisParameter != nil {
		return b.symbolToParameterDeclaration(signature.thisParameter, false)
	}
	if signature.declaration != nil && ast.IsInJSFile(signature.declaration) {
		// !!! JSDoc Support
		// thisTag := getJSDocThisTag(signature.declaration)
		// if (thisTag && thisTag.typeExpression) {
		// 	return factory.createParameterDeclaration(
		// 		/*modifiers*/ undefined,
		// 		/*dotDotDotToken*/ undefined,
		// 		"this",
		// 		/*questionToken*/ undefined,
		// 		typeToTypeNodeHelper(getTypeFromTypeNode(context, thisTag.typeExpression), context),
		// 	);
		// }
	}
	return nil
}

/**
* Serializes the return type of the signature by first trying to use the syntactic printer if possible and falling back to the checker type if not.
 */
func (b *nodeBuilderImpl) serializeReturnTypeForSignature(signature *Signature) *ast.Node {
	suppressAny := b.ctx.flags&nodebuilder.FlagsSuppressAnyReturnType != 0
	restoreFlags := b.saveRestoreFlags()
	if suppressAny {
		b.ctx.flags &= ^nodebuilder.FlagsSuppressAnyReturnType // suppress only toplevel `any`s
	}
	var returnTypeNode *ast.Node

	returnType := b.ch.getReturnTypeOfSignature(signature)
	if !(suppressAny && IsTypeAny(returnType)) {
		// !!! IsolatedDeclaration support
		// if signature.declaration != nil && !ast.NodeIsSynthesized(signature.declaration) {
		// 	declarationSymbol := b.ch.getSymbolOfDeclaration(signature.declaration)
		// 	restore := addSymbolTypeToContext(declarationSymbol, returnType)
		// 	returnTypeNode = syntacticNodeBuilder.serializeReturnTypeForSignature(signature.declaration, declarationSymbol)
		// 	restore()
		// }
		if returnTypeNode == nil {
			returnTypeNode = b.serializeInferredReturnTypeForSignature(signature, returnType)
		}
	}

	if returnTypeNode == nil && !suppressAny {
		returnTypeNode = b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
	}
	restoreFlags()
	return returnTypeNode
}

func (b *nodeBuilderImpl) indexInfoToIndexSignatureDeclarationHelper(indexInfo *IndexInfo, typeNode *ast.TypeNode) *ast.Node {
	name := getNameFromIndexInfo(indexInfo)
	indexerTypeNode := b.typeToTypeNode(indexInfo.keyType)

	indexingParameter := b.f.NewParameterDeclaration(nil, nil, b.f.NewIdentifier(name), nil, indexerTypeNode, nil)
	if typeNode == nil {
		if indexInfo.valueType == nil {
			typeNode = b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
		} else {
			typeNode = b.typeToTypeNode(indexInfo.valueType)
		}
	}
	if indexInfo.valueType == nil && b.ctx.flags&nodebuilder.FlagsAllowEmptyIndexInfoType == 0 {
		b.ctx.encounteredError = true
	}
	b.ctx.approximateLength += len(name) + 4
	var modifiers *ast.ModifierList
	if indexInfo.isReadonly {
		b.ctx.approximateLength += 9
		modifiers = b.f.NewModifierList([]*ast.Node{b.f.NewModifier(ast.KindReadonlyKeyword)})
	}
	return b.f.NewIndexSignatureDeclaration(modifiers, b.f.NewNodeList([]*ast.Node{indexingParameter}), typeNode)
}

/**
* Unlike `typeToTypeNodeHelper`, this handles setting up the `AllowUniqueESSymbolType` flag
* so a `unique symbol` is returned when appropriate for the input symbol, rather than `typeof sym`
* @param declaration - The preferred declaration to pull existing type nodes from (the symbol will be used as a fallback to find any annotated declaration)
* @param type - The type to write; an existing annotation must match this type if it's used, otherwise this is the type serialized as a new type node
* @param symbol - The symbol is used both to find an existing annotation if declaration is not provided, and to determine if `unique symbol` should be printed
 */
func (b *nodeBuilderImpl) serializeTypeForDeclaration(declaration *ast.Declaration, t *Type, symbol *ast.Symbol) *ast.Node {
	// !!! node reuse logic
	if symbol == nil {
		symbol = b.ch.getSymbolOfDeclaration(declaration)
	}
	if t == nil {
		t = b.ctx.enclosingSymbolTypes[ast.GetSymbolId(symbol)]
		if t == nil {
			if symbol.Flags&ast.SymbolFlagsAccessor != 0 && declaration.Kind == ast.KindSetAccessor {
				t = b.ch.instantiateType(b.ch.getWriteTypeOfSymbol(symbol), b.ctx.mapper)
			} else if symbol != nil && (symbol.Flags&(ast.SymbolFlagsTypeLiteral|ast.SymbolFlagsSignature) == 0) {
				t = b.ch.instantiateType(b.ch.getWidenedLiteralType(b.ch.getTypeOfSymbol(symbol)), b.ctx.mapper)
			} else {
				t = b.ch.errorType
			}
		}
	}

	// !!! TODO: JSDoc, getEmitResolver call is unfortunate layering for the helper - hoist it into checker
	addUndefinedForParameter := declaration != nil && (ast.IsParameter(declaration) /*|| ast.IsJSDocParameterTag(declaration)*/) && b.ch.GetEmitResolver().requiresAddingImplicitUndefined(declaration, symbol, b.ctx.enclosingDeclaration)
	if addUndefinedForParameter {
		t = b.ch.getOptionalType(t, false)
	}

	restoreFlags := b.saveRestoreFlags()
	if t.flags&TypeFlagsUniqueESSymbol != 0 && t.symbol == symbol && (b.ctx.enclosingDeclaration == nil || core.Some(symbol.Declarations, func(d *ast.Declaration) bool {
		return ast.GetSourceFileOfNode(d) == b.ctx.enclosingFile
	})) {
		b.ctx.flags |= nodebuilder.FlagsAllowUniqueESSymbolType
	}
	result := b.typeToTypeNode(t) // !!! expressionOrTypeToTypeNode
	restoreFlags()
	return result
}

const MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH = 3

func (b *nodeBuilderImpl) shouldUsePlaceholderForProperty(propertySymbol *ast.Symbol) bool {
	// Use placeholders for reverse mapped types we've either
	// (1) already descended into, or
	// (2) are nested reverse mappings within a mapping over a non-anonymous type, or
	// (3) are deeply nested properties that originate from the same mapped type.
	// Condition (2) is a restriction mostly just to
	// reduce the blowup in printback size from doing, eg, a deep reverse mapping over `Window`.
	// Since anonymous types usually come from expressions, this allows us to preserve the output
	// for deep mappings which likely come from expressions, while truncating those parts which
	// come from mappings over library functions.
	// Condition (3) limits printing of possibly infinitely deep reverse mapped types.
	if propertySymbol.CheckFlags&ast.CheckFlagsReverseMapped == 0 {
		return false
	}
	// (1)
	for _, elem := range b.ctx.reverseMappedStack {
		if elem == propertySymbol {
			return true
		}
	}
	// (2)
	if len(b.ctx.reverseMappedStack) > 0 {
		last := b.ctx.reverseMappedStack[len(b.ctx.reverseMappedStack)-1]
		if b.ch.ReverseMappedSymbolLinks.Has(last) {
			links := b.ch.ReverseMappedSymbolLinks.TryGet(last)
			propertyType := links.propertyType
			if propertyType != nil && propertyType.objectFlags&ObjectFlagsAnonymous == 0 {
				return true
			}
		}
	}
	// (3) - we only inspect the last MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH elements of the
	// stack for approximate matches to catch tight infinite loops
	// TODO: Why? Reasoning lost to time. this could probably stand to be improved?
	if len(b.ctx.reverseMappedStack) < MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH {
		return false
	}
	if !b.ch.ReverseMappedSymbolLinks.Has(propertySymbol) {
		return false
	}
	propertyLinks := b.ch.ReverseMappedSymbolLinks.TryGet(propertySymbol)
	propMappedType := propertyLinks.mappedType
	if propMappedType == nil || propMappedType.symbol == nil {
		return false
	}
	for i := range b.ctx.reverseMappedStack {
		if i > MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH {
			break
		}
		prop := b.ctx.reverseMappedStack[len(b.ctx.reverseMappedStack)-1-i]
		if b.ch.ReverseMappedSymbolLinks.Has(prop) {
			links := b.ch.ReverseMappedSymbolLinks.TryGet(prop)
			mappedType := links.mappedType
			if mappedType != nil && mappedType.symbol == propMappedType.symbol {
				return true
			}
		}
	}
	return false
}

func (b *nodeBuilderImpl) trackComputedName(accessExpression *ast.Node, enclosingDeclaration *ast.Node) {
	// get symbol of the first identifier of the entityName
	firstIdentifier := ast.GetFirstIdentifier(accessExpression)
	name := b.ch.resolveName(firstIdentifier, firstIdentifier.Text(), ast.SymbolFlagsValue|ast.SymbolFlagsExportValue, nil /*nameNotFoundMessage*/, true /*isUse*/, false)
	if name != nil {
		b.ctx.tracker.TrackSymbol(name, enclosingDeclaration, ast.SymbolFlagsValue)
	}
}

func (b *nodeBuilderImpl) createPropertyNameNodeForIdentifierOrLiteral(name string, _singleQuote bool, stringNamed bool, isMethod bool) *ast.Node {
	isMethodNamedNew := isMethod && name == "new"
	if !isMethodNamedNew && scanner.IsIdentifierText(name, core.LanguageVariantStandard) {
		return b.f.NewIdentifier(name)
	}
	if !stringNamed && !isMethodNamedNew && isNumericLiteralName(name) && jsnum.FromString(name) >= 0 {
		return b.f.NewNumericLiteral(name)
	}
	result := b.f.NewStringLiteral(name)
	// !!! TODO: set singleQuote
	return result
}

func (b *nodeBuilderImpl) isStringNamed(d *ast.Declaration) bool {
	name := ast.GetNameOfDeclaration(d)
	if name == nil {
		return false
	}
	if ast.IsComputedPropertyName(name) {
		t := b.ch.checkExpression(name.AsComputedPropertyName().Expression)
		return t.flags&TypeFlagsStringLike != 0
	}
	if ast.IsElementAccessExpression(name) {
		t := b.ch.checkExpression(name.AsElementAccessExpression().ArgumentExpression)
		return t.flags&TypeFlagsStringLike != 0
	}
	return ast.IsStringLiteral(name)
}

func (b *nodeBuilderImpl) isSingleQuotedStringNamed(d *ast.Declaration) bool {
	return false // !!!
	// TODO: actually support single-quote-style-maintenance
	// name := ast.GetNameOfDeclaration(d)
	// return name != nil && ast.IsStringLiteral(name) && (name.AsStringLiteral().SingleQuote || !nodeIsSynthesized(name) && startsWith(getTextOfNode(name, false /*includeTrivia*/), "'"))
}

func (b *nodeBuilderImpl) getPropertyNameNodeForSymbol(symbol *ast.Symbol) *ast.Node {
	stringNamed := len(symbol.Declarations) != 0 && core.Every(symbol.Declarations, b.isStringNamed)
	singleQuote := len(symbol.Declarations) != 0 && core.Every(symbol.Declarations, b.isSingleQuotedStringNamed)
	isMethod := symbol.Flags&ast.SymbolFlagsMethod != 0
	fromNameType := b.getPropertyNameNodeForSymbolFromNameType(symbol, singleQuote, stringNamed, isMethod)
	if fromNameType != nil {
		return fromNameType
	}

	name := symbol.Name
	const privateNamePrefix = ast.InternalSymbolNamePrefix + "#"
	if strings.HasPrefix(name, privateNamePrefix) {
		// symbol IDs are unstable - replace #nnn# with #private#
		name = name[len(privateNamePrefix):]
		name = strings.TrimLeftFunc(name, stringutil.IsDigit)
		name = "__#private" + name
	}

	return b.createPropertyNameNodeForIdentifierOrLiteral(name, singleQuote, stringNamed, isMethod)
}

// See getNameForSymbolFromNameType for a stringy equivalent
func (b *nodeBuilderImpl) getPropertyNameNodeForSymbolFromNameType(symbol *ast.Symbol, singleQuote bool, stringNamed bool, isMethod bool) *ast.Node {
	if !b.ch.valueSymbolLinks.Has(symbol) {
		return nil
	}
	nameType := b.ch.valueSymbolLinks.TryGet(symbol).nameType
	if nameType == nil {
		return nil
	}
	if nameType.flags&TypeFlagsStringOrNumberLiteral != 0 {
		var name string
		switch nameType.AsLiteralType().value.(type) {
		case jsnum.Number:
			name = nameType.AsLiteralType().value.(jsnum.Number).String()
		case string:
			name = nameType.AsLiteralType().value.(string)
		}
		if !scanner.IsIdentifierText(name, core.LanguageVariantStandard) && (stringNamed || !isNumericLiteralName(name)) {
			// !!! TODO: set singleQuote
			return b.f.NewStringLiteral(name)
		}
		if isNumericLiteralName(name) && name[0] == '-' {
			return b.f.NewComputedPropertyName(b.f.NewPrefixUnaryExpression(ast.KindMinusToken, b.f.NewNumericLiteral(name[1:])))
		}
		return b.createPropertyNameNodeForIdentifierOrLiteral(name, singleQuote, stringNamed, isMethod)
	}
	if nameType.flags&TypeFlagsUniqueESSymbol != 0 {
		return b.f.NewComputedPropertyName(b.symbolToExpression(nameType.AsUniqueESSymbolType().symbol, ast.SymbolFlagsValue))
	}
	return nil
}

func (b *nodeBuilderImpl) addPropertyToElementList(propertySymbol *ast.Symbol, typeElements []*ast.TypeElement) []*ast.TypeElement {
	propertyIsReverseMapped := propertySymbol.CheckFlags&ast.CheckFlagsReverseMapped != 0
	var propertyType *Type
	if b.shouldUsePlaceholderForProperty(propertySymbol) {
		propertyType = b.ch.anyType
	} else {
		propertyType = b.ch.getNonMissingTypeOfSymbol(propertySymbol)
	}
	saveEnclosingDeclaration := b.ctx.enclosingDeclaration
	b.ctx.enclosingDeclaration = nil
	if isLateBoundName(propertySymbol.Name) {
		if len(propertySymbol.Declarations) > 0 {
			decl := propertySymbol.Declarations[0]
			if b.ch.hasLateBindableName(decl) {
				if ast.IsBinaryExpression(decl) {
					name := ast.GetNameOfDeclaration(decl)
					if name != nil && ast.IsElementAccessExpression(name) && ast.IsPropertyAccessEntityNameExpression(name.AsElementAccessExpression().ArgumentExpression, false /*allowJs*/) {
						b.trackComputedName(name.AsElementAccessExpression().ArgumentExpression, saveEnclosingDeclaration)
					}
				} else {
					b.trackComputedName(decl.Name().Expression(), saveEnclosingDeclaration)
				}
			}
		} else {
			b.ctx.tracker.ReportNonSerializableProperty(b.ch.symbolToString(propertySymbol))
		}
	}
	if propertySymbol.ValueDeclaration != nil {
		b.ctx.enclosingDeclaration = propertySymbol.ValueDeclaration
	} else if len(propertySymbol.Declarations) > 0 && propertySymbol.Declarations[0] != nil {
		b.ctx.enclosingDeclaration = propertySymbol.Declarations[0]
	} else {
		b.ctx.enclosingDeclaration = saveEnclosingDeclaration
	}
	propertyName := b.getPropertyNameNodeForSymbol(propertySymbol)
	b.ctx.enclosingDeclaration = saveEnclosingDeclaration
	b.ctx.approximateLength += len(ast.SymbolName(propertySymbol)) + 1

	if propertySymbol.Flags&ast.SymbolFlagsAccessor != 0 {
		writeType := b.ch.getWriteTypeOfSymbol(propertySymbol)
		if !b.ch.isErrorType(propertyType) && !b.ch.isErrorType(writeType) {
			propDeclaration := ast.GetDeclarationOfKind(propertySymbol, ast.KindPropertyDeclaration)
			if propertyType != writeType || propertySymbol.Parent.Flags&ast.SymbolFlagsClass != 0 && propDeclaration == nil {
				if getterDeclaration := ast.GetDeclarationOfKind(propertySymbol, ast.KindGetAccessor); getterDeclaration != nil {
					getterSignature := b.ch.getSignatureFromDeclaration(getterDeclaration)
					getter := b.signatureToSignatureDeclarationHelper(getterSignature, ast.KindGetAccessor, &SignatureToSignatureDeclarationOptions{
						name: propertyName,
					})
					b.setCommentRange(getter, getterDeclaration)
					typeElements = append(typeElements, getter)
				}
				if setterDeclaration := ast.GetDeclarationOfKind(propertySymbol, ast.KindSetAccessor); setterDeclaration != nil {
					setterSignature := b.ch.getSignatureFromDeclaration(setterDeclaration)
					setter := b.signatureToSignatureDeclarationHelper(setterSignature, ast.KindSetAccessor, &SignatureToSignatureDeclarationOptions{
						name: propertyName,
					})
					b.setCommentRange(setter, setterDeclaration)
					typeElements = append(typeElements, setter)
				}
				return typeElements
			} else if propertySymbol.Parent.Flags&ast.SymbolFlagsClass != 0 && propDeclaration != nil && core.Find(propDeclaration.ModifierNodes(), func(m *ast.Node) bool {
				return m.Kind == ast.KindAccessorKeyword
			}) != nil {
				fakeGetterSignature := b.ch.newSignature(SignatureFlagsNone, nil, nil, nil, nil, propertyType, nil, 0)
				fakeGetterDeclaration := b.signatureToSignatureDeclarationHelper(fakeGetterSignature, ast.KindGetAccessor, &SignatureToSignatureDeclarationOptions{
					name: propertyName,
				})
				b.setCommentRange(fakeGetterDeclaration, propDeclaration)
				typeElements = append(typeElements, fakeGetterDeclaration)

				setterParam := b.ch.newSymbol(ast.SymbolFlagsFunctionScopedVariable, "arg")
				b.ch.valueSymbolLinks.Get(setterParam).resolvedType = writeType
				fakeSetterSignature := b.ch.newSignature(SignatureFlagsNone, nil, nil, nil, []*ast.Symbol{setterParam}, b.ch.voidType, nil, 0)
				fakeSetterDeclaration := b.signatureToSignatureDeclarationHelper(fakeSetterSignature, ast.KindSetAccessor, &SignatureToSignatureDeclarationOptions{
					name: propertyName,
				})
				typeElements = append(typeElements, fakeSetterDeclaration)
				return typeElements
			}
		}
	}

	var optionalToken *ast.Node
	if propertySymbol.Flags&ast.SymbolFlagsOptional != 0 {
		optionalToken = b.f.NewToken(ast.KindQuestionToken)
	} else {
		optionalToken = nil
	}
	if propertySymbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 && len(b.ch.getPropertiesOfObjectType(propertyType)) == 0 && !b.ch.isReadonlySymbol(propertySymbol) {
		signatures := b.ch.getSignaturesOfType(b.ch.filterType(propertyType, func(t *Type) bool {
			return t.flags&TypeFlagsUndefined == 0
		}), SignatureKindCall)
		for _, signature := range signatures {
			methodDeclaration := b.signatureToSignatureDeclarationHelper(signature, ast.KindMethodSignature, &SignatureToSignatureDeclarationOptions{
				name:          propertyName,
				questionToken: optionalToken,
			})
			b.setCommentRange(methodDeclaration, core.Coalesce(signature.declaration, propertySymbol.ValueDeclaration))
			typeElements = append(typeElements, methodDeclaration)
		}
		if len(signatures) != 0 || optionalToken == nil {
			return typeElements
		}
	}
	var propertyTypeNode *ast.TypeNode
	if b.shouldUsePlaceholderForProperty(propertySymbol) {
		propertyTypeNode = b.createElidedInformationPlaceholder()
	} else {
		if propertyIsReverseMapped {
			b.ctx.reverseMappedStack = append(b.ctx.reverseMappedStack, propertySymbol)
		}
		if propertyType != nil {
			propertyTypeNode = b.serializeTypeForDeclaration(nil /*declaration*/, propertyType, propertySymbol)
		} else {
			propertyTypeNode = b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
		}
		if propertyIsReverseMapped {
			b.ctx.reverseMappedStack = b.ctx.reverseMappedStack[:len(b.ctx.reverseMappedStack)-1]
		}
	}

	var modifiers *ast.ModifierList
	if b.ch.isReadonlySymbol(propertySymbol) {
		modifiers = b.f.NewModifierList([]*ast.Node{b.f.NewModifier(ast.KindReadonlyKeyword)})
		b.ctx.approximateLength += 9
	}
	propertySignature := b.f.NewPropertySignatureDeclaration(modifiers, propertyName, optionalToken, propertyTypeNode, nil)

	b.setCommentRange(propertySignature, propertySymbol.ValueDeclaration)
	typeElements = append(typeElements, propertySignature)

	return typeElements
}

func (b *nodeBuilderImpl) createTypeNodesFromResolvedType(resolvedType *StructuredType) *ast.NodeList {
	if b.checkTruncationLength() {
		if b.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
			elem := b.f.NewNotEmittedTypeElement()
			return b.f.NewNodeList([]*ast.TypeElement{b.e.AddSyntheticLeadingComment(elem, ast.KindMultiLineCommentTrivia, "elided", false /*hasTrailingNewLine*/)})
		}
		return b.f.NewNodeList([]*ast.Node{b.f.NewPropertySignatureDeclaration(nil, b.f.NewIdentifier("..."), nil, nil, nil)})
	}
	var typeElements []*ast.TypeElement
	for _, signature := range resolvedType.CallSignatures() {
		typeElements = append(typeElements, b.signatureToSignatureDeclarationHelper(signature, ast.KindCallSignature, nil))
	}
	for _, signature := range resolvedType.ConstructSignatures() {
		if signature.flags&SignatureFlagsAbstract != 0 {
			continue
		}
		typeElements = append(typeElements, b.signatureToSignatureDeclarationHelper(signature, ast.KindConstructSignature, nil))
	}
	for _, info := range resolvedType.indexInfos {
		typeElements = append(typeElements, b.indexInfoToIndexSignatureDeclarationHelper(info, core.IfElse(resolvedType.objectFlags&ObjectFlagsReverseMapped != 0, b.createElidedInformationPlaceholder(), nil)))
	}

	properties := resolvedType.properties
	if len(properties) == 0 {
		return b.f.NewNodeList(typeElements)
	}

	i := 0
	for _, propertySymbol := range properties {
		i++
		if b.ctx.flags&nodebuilder.FlagsWriteClassExpressionAsTypeLiteral != 0 {
			if propertySymbol.Flags&ast.SymbolFlagsPrototype != 0 {
				continue
			}
			if getDeclarationModifierFlagsFromSymbol(propertySymbol)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
				b.ctx.tracker.ReportPrivateInBaseOfClassExpression(propertySymbol.Name)
			}
		}
		if b.checkTruncationLength() && (i+2 < len(properties)-1) {
			if b.ctx.flags&nodebuilder.FlagsNoTruncation != 0 {
				typeElements[len(typeElements)-1] = b.e.AddSyntheticLeadingComment(typeElements[len(typeElements)-1], ast.KindMultiLineCommentTrivia, fmt.Sprintf("... %d more elided ...", len(properties)-i), false /*hasTrailingNewLine*/)
			} else {
				text := fmt.Sprintf("... %d more ...", len(properties)-i)
				typeElements = append(typeElements, b.f.NewPropertySignatureDeclaration(nil, b.f.NewIdentifier(text), nil, nil, nil))
			}
			typeElements = b.addPropertyToElementList(properties[len(properties)-1], typeElements)
			break
		}
		typeElements = b.addPropertyToElementList(propertySymbol, typeElements)
	}
	if len(typeElements) != 0 {
		return b.f.NewNodeList(typeElements)
	} else {
		return nil
	}
}

func (b *nodeBuilderImpl) createTypeNodeFromObjectType(t *Type) *ast.TypeNode {
	if b.ch.isGenericMappedType(t) || (t.objectFlags&ObjectFlagsMapped != 0 && t.AsMappedType().containsError) {
		return b.createMappedTypeNodeFromType(t)
	}

	resolved := b.ch.resolveStructuredTypeMembers(t)
	callSigs := resolved.CallSignatures()
	ctorSigs := resolved.ConstructSignatures()
	if len(resolved.properties) == 0 && len(resolved.indexInfos) == 0 {
		if len(callSigs) == 0 && len(ctorSigs) == 0 {
			b.ctx.approximateLength += 2
			result := b.f.NewTypeLiteralNode(b.f.NewNodeList([]*ast.Node{}))
			b.e.SetEmitFlags(result, printer.EFSingleLine)
			return result
		}

		if len(callSigs) == 1 && len(ctorSigs) == 0 {
			signature := callSigs[0]
			signatureNode := b.signatureToSignatureDeclarationHelper(signature, ast.KindFunctionType, nil)
			return signatureNode
		}

		if len(ctorSigs) == 1 && len(callSigs) == 0 {
			signature := ctorSigs[0]
			signatureNode := b.signatureToSignatureDeclarationHelper(signature, ast.KindConstructorType, nil)
			return signatureNode
		}
	}

	abstractSignatures := core.Filter(ctorSigs, func(signature *Signature) bool {
		return signature.flags&SignatureFlagsAbstract != 0
	})
	if len(abstractSignatures) > 0 {
		types := core.Map(abstractSignatures, func(s *Signature) *Type {
			return b.ch.getOrCreateTypeFromSignature(s, nil)
		})
		// count the number of type elements excluding abstract constructors
		typeElementCount := len(callSigs) + (len(ctorSigs) - len(abstractSignatures)) + len(resolved.indexInfos) + (core.IfElse(b.ctx.flags&nodebuilder.FlagsWriteClassExpressionAsTypeLiteral != 0, core.CountWhere(resolved.properties, func(p *ast.Symbol) bool {
			return p.Flags&ast.SymbolFlagsPrototype == 0
		}), len(resolved.properties)))
		// don't include an empty object literal if there were no other static-side
		// properties to write, i.e. `abstract class C { }` becomes `abstract new () => {}`
		// and not `(abstract new () => {}) & {}`
		if typeElementCount != 0 {
			// create a copy of the object type without any abstract construct signatures.
			types = append(types, b.getResolvedTypeWithoutAbstractConstructSignatures(resolved))
		}
		return b.typeToTypeNode(b.ch.getIntersectionType(types))
	}

	restoreFlags := b.saveRestoreFlags()
	b.ctx.flags |= nodebuilder.FlagsInObjectTypeLiteral
	members := b.createTypeNodesFromResolvedType(resolved)
	restoreFlags()
	typeLiteralNode := b.f.NewTypeLiteralNode(members)
	b.ctx.approximateLength += 2
	b.e.SetEmitFlags(typeLiteralNode, core.IfElse((b.ctx.flags&nodebuilder.FlagsMultilineObjectLiterals != 0), 0, printer.EFSingleLine))
	return typeLiteralNode
}

func getTypeAliasForTypeLiteral(c *Checker, t *Type) *ast.Symbol {
	if t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsTypeLiteral != 0 && t.symbol.Declarations != nil {
		node := ast.WalkUpParenthesizedTypes(t.symbol.Declarations[0].Parent)
		if ast.IsTypeAliasDeclaration(node) {
			return c.getSymbolOfDeclaration(node)
		}
	}
	return nil
}

func (b *nodeBuilderImpl) shouldWriteTypeOfFunctionSymbol(symbol *ast.Symbol, typeId TypeId) bool {
	isStaticMethodSymbol := symbol.Flags&ast.SymbolFlagsMethod != 0 && core.Some(symbol.Declarations, func(declaration *ast.Node) bool {
		return ast.IsStatic(declaration) && !b.ch.isLateBindableIndexSignature(ast.GetNameOfDeclaration(declaration))
	})
	isNonLocalFunctionSymbol := false
	if symbol.Flags&ast.SymbolFlagsFunction != 0 {
		if symbol.Parent != nil {
			isNonLocalFunctionSymbol = true
		} else {
			for _, declaration := range symbol.Declarations {
				if declaration.Parent.Kind == ast.KindSourceFile || declaration.Parent.Kind == ast.KindModuleBlock {
					isNonLocalFunctionSymbol = true
					break
				}
			}
		}
	}
	if isStaticMethodSymbol || isNonLocalFunctionSymbol {
		// typeof is allowed only for static/non local functions
		return (b.ctx.flags&nodebuilder.FlagsUseTypeOfFunction != 0 || b.ctx.visitedTypes.Has(typeId)) && // it is type of the symbol uses itself recursively
			(b.ctx.flags&nodebuilder.FlagsUseStructuralFallback == 0 || b.ch.IsValueSymbolAccessible(symbol, b.ctx.enclosingDeclaration)) // And the build is going to succeed without visibility error or there is no structural fallback allowed
	}
	return false
}

func (b *nodeBuilderImpl) createAnonymousTypeNode(t *Type) *ast.TypeNode {
	typeId := t.id
	symbol := t.symbol
	if symbol != nil {
		isInstantiationExpressionType := t.objectFlags&ObjectFlagsInstantiationExpressionType != 0
		if isInstantiationExpressionType {
			instantiationExpressionType := t.AsInstantiationExpressionType()
			existing := instantiationExpressionType.node
			if ast.IsTypeQueryNode(existing) {
				typeNode := b.tryReuseExistingNonParameterTypeNode(existing, t, nil, nil)
				if typeNode != nil {
					return typeNode
				}
			}
			if b.ctx.visitedTypes.Has(typeId) {
				return b.createElidedInformationPlaceholder()
			}
			return b.visitAndTransformType(t, (*nodeBuilderImpl).createTypeNodeFromObjectType)
		}
		var isInstanceType ast.SymbolFlags
		if isClassInstanceSide(b.ch, t) {
			isInstanceType = ast.SymbolFlagsType
		} else {
			isInstanceType = ast.SymbolFlagsValue
		}

		// !!! JS support
		// if c.isJSConstructor(symbol.ValueDeclaration) {
		// 	// Instance and static types share the same symbol; only add 'typeof' for the static side.
		// 	return b.symbolToTypeNode(symbol, isInstanceType, nil)
		// } else
		if symbol.Flags&ast.SymbolFlagsClass != 0 && b.ch.getBaseTypeVariableOfClass(symbol) == nil && !(symbol.ValueDeclaration != nil && ast.IsClassLike(symbol.ValueDeclaration) && b.ctx.flags&nodebuilder.FlagsWriteClassExpressionAsTypeLiteral != 0 && (!ast.IsClassDeclaration(symbol.ValueDeclaration) || b.ch.IsSymbolAccessible(symbol, b.ctx.enclosingDeclaration, isInstanceType, false /*shouldComputeAliasesToMakeVisible*/).Accessibility != printer.SymbolAccessibilityAccessible)) || symbol.Flags&(ast.SymbolFlagsEnum|ast.SymbolFlagsValueModule) != 0 || b.shouldWriteTypeOfFunctionSymbol(symbol, typeId) {
			return b.symbolToTypeNode(symbol, isInstanceType, nil)
		} else if b.ctx.visitedTypes.Has(typeId) {
			// If type is an anonymous type literal in a type alias declaration, use type alias name
			typeAlias := getTypeAliasForTypeLiteral(b.ch, t)
			if typeAlias != nil {
				// The specified symbol flags need to be reinterpreted as type flags
				return b.symbolToTypeNode(typeAlias, ast.SymbolFlagsType, nil)
			} else {
				return b.createElidedInformationPlaceholder()
			}
		} else {
			return b.visitAndTransformType(t, (*nodeBuilderImpl).createTypeNodeFromObjectType)
		}
	} else {
		// Anonymous types without a symbol are never circular.
		return b.createTypeNodeFromObjectType(t)
	}
}

func (b *nodeBuilderImpl) getTypeFromTypeNode(node *ast.TypeNode, noMappedTypes bool) *Type {
	// !!! noMappedTypes optional param support
	t := b.ch.getTypeFromTypeNode(node)
	if b.ctx.mapper == nil {
		return t
	}

	instantiated := b.ch.instantiateType(t, b.ctx.mapper)
	if noMappedTypes && instantiated != t {
		return nil
	}
	return instantiated
}

func (b *nodeBuilderImpl) typeToTypeNodeOrCircularityElision(t *Type) *ast.TypeNode {
	if t.flags&TypeFlagsUnion != 0 {
		if b.ctx.visitedTypes.Has(t.id) {
			if b.ctx.flags&nodebuilder.FlagsAllowAnonymousIdentifier == 0 {
				b.ctx.encounteredError = true
				b.ctx.tracker.ReportCyclicStructureError()
			}
			return b.createElidedInformationPlaceholder()
		}
		return b.visitAndTransformType(t, (*nodeBuilderImpl).typeToTypeNode)
	}
	return b.typeToTypeNode(t)
}

func (b *nodeBuilderImpl) conditionalTypeToTypeNode(_t *Type) *ast.TypeNode {
	t := _t.AsConditionalType()
	checkTypeNode := b.typeToTypeNode(t.checkType)
	b.ctx.approximateLength += 15
	if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && t.root.isDistributive && t.checkType.flags&TypeFlagsTypeParameter == 0 {
		newParam := b.ch.newTypeParameter(b.ch.newSymbol(ast.SymbolFlagsTypeParameter, "T" /* as __String */))
		name := b.typeParameterToName(newParam)
		newTypeVariable := b.f.NewTypeReferenceNode(name.AsNode(), nil)
		b.ctx.approximateLength += 37
		// 15 each for two added conditionals, 7 for an added infer type
		newMapper := prependTypeMapping(t.root.checkType, newParam, t.mapper)
		saveInferTypeParameters := b.ctx.inferTypeParameters
		b.ctx.inferTypeParameters = t.root.inferTypeParameters
		extendsTypeNode := b.typeToTypeNode(b.ch.instantiateType(t.root.extendsType, newMapper))
		b.ctx.inferTypeParameters = saveInferTypeParameters
		trueTypeNode := b.typeToTypeNodeOrCircularityElision(b.ch.instantiateType(b.getTypeFromTypeNode(t.root.node.TrueType, false), newMapper))
		falseTypeNode := b.typeToTypeNodeOrCircularityElision(b.ch.instantiateType(b.getTypeFromTypeNode(t.root.node.FalseType, false), newMapper))

		// outermost conditional makes `T` a type parameter, allowing the inner conditionals to be distributive
		// second conditional makes `T` have `T & checkType` substitution, so it is correctly usable as the checkType
		// inner conditional runs the check the user provided on the check type (distributively) and returns the result
		// checkType extends infer T ? T extends checkType ? T extends extendsType<T> ? trueType<T> : falseType<T> : never : never;
		// this is potentially simplifiable to
		// checkType extends infer T ? T extends checkType & extendsType<T> ? trueType<T> : falseType<T> : never;
		// but that may confuse users who read the output more.
		// On the other hand,
		// checkType extends infer T extends checkType ? T extends extendsType<T> ? trueType<T> : falseType<T> : never;
		// may also work with `infer ... extends ...` in, but would produce declarations only compatible with the latest TS.
		newId := newTypeVariable.AsTypeReferenceNode().TypeName.AsIdentifier().Clone(b.f)
		syntheticExtendsNode := b.f.NewInferTypeNode(b.f.NewTypeParameterDeclaration(nil, newId, nil, nil))
		innerCheckConditionalNode := b.f.NewConditionalTypeNode(newTypeVariable, extendsTypeNode, trueTypeNode, falseTypeNode)
		syntheticTrueNode := b.f.NewConditionalTypeNode(b.f.NewTypeReferenceNode(name.Clone(b.f), nil), b.f.DeepCloneNode(checkTypeNode), innerCheckConditionalNode, b.f.NewKeywordTypeNode(ast.KindNeverKeyword))
		return b.f.NewConditionalTypeNode(checkTypeNode, syntheticExtendsNode, syntheticTrueNode, b.f.NewKeywordTypeNode(ast.KindNeverKeyword))
	}
	saveInferTypeParameters := b.ctx.inferTypeParameters
	b.ctx.inferTypeParameters = t.root.inferTypeParameters
	extendsTypeNode := b.typeToTypeNode(t.extendsType)
	b.ctx.inferTypeParameters = saveInferTypeParameters
	trueTypeNode := b.typeToTypeNodeOrCircularityElision(b.ch.getTrueTypeFromConditionalType(_t))
	falseTypeNode := b.typeToTypeNodeOrCircularityElision(b.ch.getFalseTypeFromConditionalType(_t))
	return b.f.NewConditionalTypeNode(checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode)
}

func (b *nodeBuilderImpl) getParentSymbolOfTypeParameter(typeParameter *TypeParameter) *ast.Symbol {
	tp := ast.GetDeclarationOfKind(typeParameter.symbol, ast.KindTypeParameter)
	var host *ast.Node
	// !!! JSDoc support
	// if ast.IsJSDocTemplateTag(tp.Parent) {
	// 	host = getEffectiveContainerForJSDocTemplateTag(tp.Parent)
	// } else {
	host = tp.Parent
	// }
	if host == nil {
		return nil
	}
	return b.ch.getSymbolOfNode(host)
}

func (b *nodeBuilderImpl) typeReferenceToTypeNode(t *Type) *ast.TypeNode {
	var typeArguments []*Type = b.ch.getTypeArguments(t)
	if t.Target() == b.ch.globalArrayType || t.Target() == b.ch.globalReadonlyArrayType {
		if b.ctx.flags&nodebuilder.FlagsWriteArrayAsGenericType != 0 {
			typeArgumentNode := b.typeToTypeNode(typeArguments[0])
			return b.f.NewTypeReferenceNode(b.f.NewIdentifier(core.IfElse(t.Target() == b.ch.globalArrayType, "Array", "ReadonlyArray")), b.f.NewNodeList([]*ast.TypeNode{typeArgumentNode}))
		}
		elementType := b.typeToTypeNode(typeArguments[0])
		arrayType := b.f.NewArrayTypeNode(elementType)
		if t.Target() == b.ch.globalArrayType {
			return arrayType
		} else {
			return b.f.NewTypeOperatorNode(ast.KindReadonlyKeyword, arrayType)
		}
	} else if t.Target().objectFlags&ObjectFlagsTuple != 0 {
		typeArguments = core.SameMapIndex(typeArguments, func(arg *Type, i int) *Type {
			isOptional := false
			if i < len(t.Target().AsTupleType().elementInfos) {
				isOptional = t.Target().AsTupleType().elementInfos[i].flags&ElementFlagsOptional != 0
			}
			return b.ch.removeMissingType(arg, isOptional)
		})
		if len(typeArguments) > 0 {
			arity := b.ch.getTypeReferenceArity(t)
			tupleConstituentNodes := b.mapToTypeNodes(typeArguments[0:arity], false /*isBareList*/)
			if tupleConstituentNodes != nil {
				for i := 0; i < len(tupleConstituentNodes.Nodes); i++ {
					flags := t.Target().AsTupleType().elementInfos[i].flags
					labeledElementDeclaration := t.Target().AsTupleType().elementInfos[i].labeledDeclaration

					if labeledElementDeclaration != nil {
						tupleConstituentNodes.Nodes[i] = b.f.NewNamedTupleMember(core.IfElse(flags&ElementFlagsVariable != 0, b.f.NewToken(ast.KindDotDotDotToken), nil), b.f.NewIdentifier(b.ch.getTupleElementLabel(t.Target().AsTupleType().elementInfos[i], nil, i)), core.IfElse(flags&ElementFlagsOptional != 0, b.f.NewToken(ast.KindQuestionToken), nil), core.IfElse(flags&ElementFlagsRest != 0, b.f.NewArrayTypeNode(tupleConstituentNodes.Nodes[i]), tupleConstituentNodes.Nodes[i]))
					} else {
						switch {
						case flags&ElementFlagsVariable != 0:
							tupleConstituentNodes.Nodes[i] = b.f.NewRestTypeNode(core.IfElse(flags&ElementFlagsRest != 0, b.f.NewArrayTypeNode(tupleConstituentNodes.Nodes[i]), tupleConstituentNodes.Nodes[i]))
						case flags&ElementFlagsOptional != 0:
							tupleConstituentNodes.Nodes[i] = b.f.NewOptionalTypeNode(tupleConstituentNodes.Nodes[i])
						}
					}
				}
				tupleTypeNode := b.f.NewTupleTypeNode(tupleConstituentNodes)
				b.e.SetEmitFlags(tupleTypeNode, printer.EFSingleLine)
				if t.Target().AsTupleType().readonly {
					return b.f.NewTypeOperatorNode(ast.KindReadonlyKeyword, tupleTypeNode)
				} else {
					return tupleTypeNode
				}
			}
		}
		if b.ctx.encounteredError || (b.ctx.flags&nodebuilder.FlagsAllowEmptyTuple != 0) {
			tupleTypeNode := b.f.NewTupleTypeNode(b.f.NewNodeList([]*ast.TypeNode{}))
			b.e.SetEmitFlags(tupleTypeNode, printer.EFSingleLine)
			if t.Target().AsTupleType().readonly {
				return b.f.NewTypeOperatorNode(ast.KindReadonlyKeyword, tupleTypeNode)
			} else {
				return tupleTypeNode
			}
		}
		b.ctx.encounteredError = true
		return nil
		// TODO: GH#18217
	} else if b.ctx.flags&nodebuilder.FlagsWriteClassExpressionAsTypeLiteral != 0 && t.symbol.ValueDeclaration != nil && ast.IsClassLike(t.symbol.ValueDeclaration) && !b.ch.IsValueSymbolAccessible(t.symbol, b.ctx.enclosingDeclaration) {
		return b.createAnonymousTypeNode(t)
	} else {
		outerTypeParameters := t.Target().AsInterfaceType().OuterTypeParameters()
		i := 0
		var resultType *ast.TypeNode
		if outerTypeParameters != nil {
			length := len(outerTypeParameters)
			for i < length {
				// Find group of type arguments for type parameters with the same declaring container.
				start := i
				parent := b.getParentSymbolOfTypeParameter(outerTypeParameters[i].AsTypeParameter())
				for ok := true; ok; ok = i < length && b.getParentSymbolOfTypeParameter(outerTypeParameters[i].AsTypeParameter()) == parent { // do-while loop
					i++
				}
				// When type parameters are their own type arguments for the whole group (i.e. we have
				// the default outer type arguments), we don't show the group.

				if !slices.Equal(outerTypeParameters[start:i], typeArguments[start:i]) {
					typeArgumentSlice := b.mapToTypeNodes(typeArguments[start:i], false /*isBareList*/)
					restoreFlags := b.saveRestoreFlags()
					b.ctx.flags |= nodebuilder.FlagsForbidIndexedAccessSymbolReferences
					ref := b.symbolToTypeNode(parent, ast.SymbolFlagsType, typeArgumentSlice)
					restoreFlags()
					if resultType == nil {
						resultType = ref
					} else {
						resultType = b.appendReferenceToType(resultType, ref)
					}
				}
			}
		}
		var typeArgumentNodes *ast.NodeList
		if len(typeArguments) > 0 {
			typeParameterCount := 0
			typeParams := t.Target().AsInterfaceType().TypeParameters()
			if typeParams != nil {
				typeParameterCount = min(len(typeParams), len(typeArguments))

				// Maybe we should do this for more types, but for now we only elide type arguments that are
				// identical to their associated type parameters' defaults for `Iterable`, `IterableIterator`,
				// `AsyncIterable`, and `AsyncIterableIterator` to provide backwards-compatible .d.ts emit due
				// to each now having three type parameters instead of only one.
				if b.ch.isReferenceToType(t, b.ch.getGlobalIterableType()) || b.ch.isReferenceToType(t, b.ch.getGlobalIterableIteratorType()) || b.ch.isReferenceToType(t, b.ch.getGlobalAsyncIterableType()) || b.ch.isReferenceToType(t, b.ch.getGlobalAsyncIterableIteratorType()) {
					if t.AsTypeReference().node == nil || !ast.IsTypeReferenceNode(t.AsTypeReference().node) || t.AsTypeReference().node.TypeArguments() == nil || len(t.AsTypeReference().node.TypeArguments()) < typeParameterCount {
						for typeParameterCount > 0 {
							typeArgument := typeArguments[typeParameterCount-1]
							typeParameter := t.Target().AsInterfaceType().TypeParameters()[typeParameterCount-1]
							defaultType := b.ch.getDefaultFromTypeParameter(typeParameter)
							if defaultType == nil || !b.ch.isTypeIdenticalTo(typeArgument, defaultType) {
								break
							}
							typeParameterCount--
						}
					}
				}
			}

			typeArgumentNodes = b.mapToTypeNodes(typeArguments[i:typeParameterCount], false /*isBareList*/)
		}
		restoreFlags := b.saveRestoreFlags()
		b.ctx.flags |= nodebuilder.FlagsForbidIndexedAccessSymbolReferences
		finalRef := b.symbolToTypeNode(t.symbol, ast.SymbolFlagsType, typeArgumentNodes)
		restoreFlags()
		if resultType == nil {
			return finalRef
		} else {
			return b.appendReferenceToType(resultType, finalRef)
		}
	}
}

func (b *nodeBuilderImpl) visitAndTransformType(t *Type, transform func(b *nodeBuilderImpl, t *Type) *ast.TypeNode) *ast.TypeNode {
	typeId := t.id
	isConstructorObject := t.objectFlags&ObjectFlagsAnonymous != 0 && t.symbol != nil && t.symbol.Flags&ast.SymbolFlagsClass != 0
	var id *CompositeSymbolIdentity
	switch {
	case t.objectFlags&ObjectFlagsReference != 0 && t.AsTypeReference().node != nil:
		id = &CompositeSymbolIdentity{false, 0, ast.GetNodeId(t.AsTypeReference().node)}
	case t.flags&TypeFlagsConditional != 0:
		id = &CompositeSymbolIdentity{false, 0, ast.GetNodeId(t.AsConditionalType().root.node.AsNode())}
	case t.symbol != nil:
		id = &CompositeSymbolIdentity{isConstructorObject, ast.GetSymbolId(t.symbol), 0}
	default:
		id = nil
	}
	// Since instantiations of the same anonymous type have the same symbol, tracking symbols instead
	// of types allows us to catch circular references to instantiations of the same anonymous type

	key := CompositeTypeCacheIdentity{typeId, b.ctx.flags, b.ctx.internalFlags}
	if b.ctx.enclosingDeclaration != nil && b.links.Has(b.ctx.enclosingDeclaration) {
		links := b.links.Get(b.ctx.enclosingDeclaration)
		cachedResult, ok := links.serializedTypes[key]
		if ok {
			// TODO:: check if we instead store late painted statements associated with this?
			for _, arg := range cachedResult.trackedSymbols {
				b.ctx.tracker.TrackSymbol(arg.symbol, arg.enclosingDeclaration, arg.meaning)
			}
			if cachedResult.truncating {
				b.ctx.truncating = true
			}
			b.ctx.approximateLength += cachedResult.addedLength
			return b.f.DeepCloneNode(cachedResult.node)
		}
	}

	var depth int
	if id != nil {
		depth = b.ctx.symbolDepth[*id]
		if depth > 10 {
			return b.createElidedInformationPlaceholder()
		}
		b.ctx.symbolDepth[*id] = depth + 1
	}
	b.ctx.visitedTypes.Add(typeId)
	prevTrackedSymbols := b.ctx.trackedSymbols
	b.ctx.trackedSymbols = nil
	startLength := b.ctx.approximateLength
	result := transform(b, t)
	addedLength := b.ctx.approximateLength - startLength
	if !b.ctx.reportedDiagnostic && !b.ctx.encounteredError {
		links := b.links.Get(b.ctx.enclosingDeclaration)
		if links.serializedTypes == nil {
			links.serializedTypes = make(map[CompositeTypeCacheIdentity]*SerializedTypeEntry)
		}
		links.serializedTypes[key] = &SerializedTypeEntry{
			node:           result,
			truncating:     b.ctx.truncating,
			addedLength:    addedLength,
			trackedSymbols: b.ctx.trackedSymbols,
		}
	}
	b.ctx.visitedTypes.Delete(typeId)
	if id != nil {
		b.ctx.symbolDepth[*id] = depth
	}
	b.ctx.trackedSymbols = prevTrackedSymbols
	return result

	// !!! TODO: Attempt node reuse or parse nodes to minimize copying once text range setting is set up
	// deepCloneOrReuseNode := func(node T) T {
	// 	if !nodeIsSynthesized(node) && getParseTreeNode(node) == node {
	// 		return node
	// 	}
	// 	return setTextRange(b.ctx, b.f.cloneNode(visitEachChildWorker(node, deepCloneOrReuseNode, nil /*b.ctx*/, deepCloneOrReuseNodes, deepCloneOrReuseNode)), node)
	// }

	// deepCloneOrReuseNodes := func(nodes *NodeArray[*ast.Node], visitor Visitor, test func(node *ast.Node) bool, start number, count number) *NodeArray[*ast.Node] {
	// 	if nodes != nil && nodes.length == 0 {
	// 		// Ensure we explicitly make a copy of an empty array; visitNodes will not do this unless the array has elements,
	// 		// which can lead to us reusing the same empty NodeArray more than once within the same AST during type noding.
	// 		return setTextRangeWorker(b.f.NewNodeArray(nil, nodes.hasTrailingComma), nodes)
	// 	}
	// 	return visitNodes(nodes, visitor, test, start, count)
	// }
}

func (b *nodeBuilderImpl) typeToTypeNode(t *Type) *ast.TypeNode {
	inTypeAlias := b.ctx.flags & nodebuilder.FlagsInTypeAlias
	b.ctx.flags &^= nodebuilder.FlagsInTypeAlias

	if t == nil {
		if b.ctx.flags&nodebuilder.FlagsAllowEmptyUnionOrIntersection == 0 {
			b.ctx.encounteredError = true
			return nil
			// TODO: GH#18217
		}
		b.ctx.approximateLength += 3
		return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
	}

	if b.ctx.flags&nodebuilder.FlagsNoTypeReduction == 0 {
		t = b.ch.getReducedType(t)
	}

	if t.flags&TypeFlagsAny != 0 {
		if t.alias != nil {
			return t.alias.ToTypeReferenceNode(b)
		}
		if t == b.ch.unresolvedType {
			return b.e.AddSyntheticLeadingComment(b.f.NewKeywordTypeNode(ast.KindAnyKeyword), ast.KindMultiLineCommentTrivia, "unresolved", false /*hasTrailingNewLine*/)
		}
		b.ctx.approximateLength += 3
		return b.f.NewKeywordTypeNode(core.IfElse(t == b.ch.intrinsicMarkerType, ast.KindIntrinsicKeyword, ast.KindAnyKeyword))
	}
	if t.flags&TypeFlagsUnknown != 0 {
		return b.f.NewKeywordTypeNode(ast.KindUnknownKeyword)
	}
	if t.flags&TypeFlagsString != 0 {
		b.ctx.approximateLength += 6
		return b.f.NewKeywordTypeNode(ast.KindStringKeyword)
	}
	if t.flags&TypeFlagsNumber != 0 {
		b.ctx.approximateLength += 6
		return b.f.NewKeywordTypeNode(ast.KindNumberKeyword)
	}
	if t.flags&TypeFlagsBigInt != 0 {
		b.ctx.approximateLength += 6
		return b.f.NewKeywordTypeNode(ast.KindBigIntKeyword)
	}
	if t.flags&TypeFlagsBoolean != 0 && t.alias == nil {
		b.ctx.approximateLength += 7
		return b.f.NewKeywordTypeNode(ast.KindBooleanKeyword)
	}
	if t.flags&TypeFlagsEnumLike != 0 {
		if t.symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
			parentSymbol := b.ch.getParentOfSymbol(t.symbol)
			parentName := b.symbolToTypeNode(parentSymbol, ast.SymbolFlagsType, nil)
			if b.ch.getDeclaredTypeOfSymbol(parentSymbol) == t {
				return parentName
			}
			memberName := ast.SymbolName(t.symbol)
			if scanner.IsIdentifierText(memberName, core.LanguageVariantStandard) {
				return b.appendReferenceToType(parentName /* as TypeReferenceNode | ImportTypeNode */, b.f.NewTypeReferenceNode(b.f.NewIdentifier(memberName), nil /*typeArguments*/))
			}
			if ast.IsImportTypeNode(parentName) {
				parentName.AsImportTypeNode().IsTypeOf = true
				// mutably update, node is freshly manufactured anyhow
				return b.f.NewIndexedAccessTypeNode(parentName, b.f.NewLiteralTypeNode(b.f.NewStringLiteral(memberName)))
			} else if ast.IsTypeReferenceNode(parentName) {
				return b.f.NewIndexedAccessTypeNode(b.f.NewTypeQueryNode(parentName.AsTypeReferenceNode().TypeName, nil), b.f.NewLiteralTypeNode(b.f.NewStringLiteral(memberName)))
			} else {
				panic("Unhandled type node kind returned from `symbolToTypeNode`.")
			}
		}
		return b.symbolToTypeNode(t.symbol, ast.SymbolFlagsType, nil)
	}
	if t.flags&TypeFlagsStringLiteral != 0 {
		b.ctx.approximateLength += len(t.AsLiteralType().value.(string)) + 2
		lit := b.f.NewStringLiteral(t.AsLiteralType().value.(string) /*, b.flags&nodebuilder.FlagsUseSingleQuotesForStringLiteralType != 0*/)
		b.e.AddEmitFlags(lit, printer.EFNoAsciiEscaping)
		return b.f.NewLiteralTypeNode(lit)
	}
	if t.flags&TypeFlagsNumberLiteral != 0 {
		value := t.AsLiteralType().value.(jsnum.Number)
		b.ctx.approximateLength += len(value.String())
		if value < 0 {
			return b.f.NewLiteralTypeNode(b.f.NewPrefixUnaryExpression(ast.KindMinusToken, b.f.NewNumericLiteral(value.String()[1:])))
		} else {
			return b.f.NewLiteralTypeNode(b.f.NewNumericLiteral(value.String()))
		}
	}
	if t.flags&TypeFlagsBigIntLiteral != 0 {
		b.ctx.approximateLength += len(pseudoBigIntToString(getBigIntLiteralValue(t))) + 1
		return b.f.NewLiteralTypeNode(b.f.NewBigIntLiteral(pseudoBigIntToString(getBigIntLiteralValue(t)) + "n"))
	}
	if t.flags&TypeFlagsBooleanLiteral != 0 {
		if t.AsLiteralType().value.(bool) {
			b.ctx.approximateLength += 4
			return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindTrueKeyword))
		} else {
			b.ctx.approximateLength += 5
			return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindFalseKeyword))
		}
	}
	if t.flags&TypeFlagsUniqueESSymbol != 0 {
		if b.ctx.flags&nodebuilder.FlagsAllowUniqueESSymbolType == 0 {
			if b.ch.IsValueSymbolAccessible(t.symbol, b.ctx.enclosingDeclaration) {
				b.ctx.approximateLength += 6
				return b.symbolToTypeNode(t.symbol, ast.SymbolFlagsValue, nil)
			}
			b.ctx.tracker.ReportInaccessibleUniqueSymbolError()
		}
		b.ctx.approximateLength += 13
		return b.f.NewTypeOperatorNode(ast.KindUniqueKeyword, b.f.NewKeywordTypeNode(ast.KindSymbolKeyword))
	}
	if t.flags&TypeFlagsVoid != 0 {
		b.ctx.approximateLength += 4
		return b.f.NewKeywordTypeNode(ast.KindVoidKeyword)
	}
	if t.flags&TypeFlagsUndefined != 0 {
		b.ctx.approximateLength += 9
		return b.f.NewKeywordTypeNode(ast.KindUndefinedKeyword)
	}
	if t.flags&TypeFlagsNull != 0 {
		b.ctx.approximateLength += 4
		return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindNullKeyword))
	}
	if t.flags&TypeFlagsNever != 0 {
		b.ctx.approximateLength += 5
		return b.f.NewKeywordTypeNode(ast.KindNeverKeyword)
	}
	if t.flags&TypeFlagsESSymbol != 0 {
		b.ctx.approximateLength += 6
		return b.f.NewKeywordTypeNode(ast.KindSymbolKeyword)
	}
	if t.flags&TypeFlagsNonPrimitive != 0 {
		b.ctx.approximateLength += 6
		return b.f.NewKeywordTypeNode(ast.KindObjectKeyword)
	}
	if isThisTypeParameter(t) {
		if b.ctx.flags&nodebuilder.FlagsInObjectTypeLiteral != 0 {
			if !b.ctx.encounteredError && b.ctx.flags&nodebuilder.FlagsAllowThisInObjectLiteral == 0 {
				b.ctx.encounteredError = true
			}
			b.ctx.tracker.ReportInaccessibleThisError()
		}
		b.ctx.approximateLength += 4
		return b.f.NewThisTypeNode()
	}

	if inTypeAlias == 0 && t.alias != nil && (b.ctx.flags&nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope != 0 || b.ch.IsTypeSymbolAccessible(t.alias.Symbol(), b.ctx.enclosingDeclaration)) {
		sym := t.alias.Symbol()
		typeArgumentNodes := b.mapToTypeNodes(t.alias.TypeArguments(), false /*isBareList*/)
		if isReservedMemberName(sym.Name) && sym.Flags&ast.SymbolFlagsClass == 0 {
			return b.f.NewTypeReferenceNode(b.f.NewIdentifier(""), typeArgumentNodes)
		}
		if typeArgumentNodes != nil && len(typeArgumentNodes.Nodes) == 1 && sym == b.ch.globalArrayType.symbol {
			return b.f.NewArrayTypeNode(typeArgumentNodes.Nodes[0])
		}
		return b.symbolToTypeNode(sym, ast.SymbolFlagsType, typeArgumentNodes)
	}

	objectFlags := t.objectFlags

	if objectFlags&ObjectFlagsReference != 0 {
		debug.Assert(t.Flags()&TypeFlagsObject != 0)
		if t.AsTypeReference().node != nil {
			return b.visitAndTransformType(t, (*nodeBuilderImpl).typeReferenceToTypeNode)
		} else {
			return b.typeReferenceToTypeNode(t)
		}
	}
	if t.flags&TypeFlagsTypeParameter != 0 || objectFlags&ObjectFlagsClassOrInterface != 0 {
		if t.flags&TypeFlagsTypeParameter != 0 && slices.Contains(b.ctx.inferTypeParameters, t) {
			b.ctx.approximateLength += len(ast.SymbolName(t.symbol)) + 6
			var constraintNode *ast.TypeNode
			constraint := b.ch.getConstraintOfTypeParameter(t)
			if constraint != nil {
				// If the infer type has a constraint that is not the same as the constraint
				// we would have normally inferred based on b, we emit the constraint
				// using `infer T extends ?`. We omit inferred constraints from type references
				// as they may be elided.
				inferredConstraint := b.ch.getInferredTypeParameterConstraint(t, true /*omitTypeReferences*/)
				if !(inferredConstraint != nil && b.ch.isTypeIdenticalTo(constraint, inferredConstraint)) {
					b.ctx.approximateLength += 9
					constraintNode = b.typeToTypeNode(constraint)
				}
			}
			return b.f.NewInferTypeNode(b.typeParameterToDeclarationWithConstraint(t, constraintNode))
		}
		if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && t.flags&TypeFlagsTypeParameter != 0 {
			name := b.typeParameterToName(t)
			b.ctx.approximateLength += len(name.Text)
			return b.f.NewTypeReferenceNode(b.f.NewIdentifier(name.Text), nil /*typeArguments*/)
		}
		// Ignore constraint/default when creating a usage (as opposed to declaration) of a type parameter.
		if t.symbol != nil {
			return b.symbolToTypeNode(t.symbol, ast.SymbolFlagsType, nil)
		}
		var name string
		if (t == b.ch.markerSuperTypeForCheck || t == b.ch.markerSubTypeForCheck) && b.ch.varianceTypeParameter != nil && b.ch.varianceTypeParameter.symbol != nil {
			name = (core.IfElse(t == b.ch.markerSubTypeForCheck, "sub-", "super-")) + ast.SymbolName(b.ch.varianceTypeParameter.symbol)
		} else {
			name = "?"
		}
		return b.f.NewTypeReferenceNode(b.f.NewIdentifier(name), nil /*typeArguments*/)
	}
	if t.flags&TypeFlagsUnion != 0 && t.AsUnionType().origin != nil {
		t = t.AsUnionType().origin
	}
	if t.flags&(TypeFlagsUnion|TypeFlagsIntersection) != 0 {
		var types []*Type
		if t.flags&TypeFlagsUnion != 0 {
			types = b.ch.formatUnionTypes(t.AsUnionType().types)
		} else {
			types = t.AsIntersectionType().types
		}
		if len(types) == 1 {
			return b.typeToTypeNode(types[0])
		}
		typeNodes := b.mapToTypeNodes(types, true /*isBareList*/)
		if typeNodes != nil && len(typeNodes.Nodes) > 0 {
			if t.flags&TypeFlagsUnion != 0 {
				return b.f.NewUnionTypeNode(typeNodes)
			} else {
				return b.f.NewIntersectionTypeNode(typeNodes)
			}
		} else {
			if !b.ctx.encounteredError && b.ctx.flags&nodebuilder.FlagsAllowEmptyUnionOrIntersection == 0 {
				b.ctx.encounteredError = true
			}
			return nil
			// TODO: GH#18217
		}
	}
	if objectFlags&(ObjectFlagsAnonymous|ObjectFlagsMapped) != 0 {
		debug.Assert(t.Flags()&TypeFlagsObject != 0)
		// The type is an object literal type.
		return b.createAnonymousTypeNode(t)
	}
	if t.flags&TypeFlagsIndex != 0 {
		indexedType := t.Target()
		b.ctx.approximateLength += 6
		indexTypeNode := b.typeToTypeNode(indexedType)
		return b.f.NewTypeOperatorNode(ast.KindKeyOfKeyword, indexTypeNode)
	}
	if t.flags&TypeFlagsTemplateLiteral != 0 {
		texts := t.AsTemplateLiteralType().texts
		types := t.AsTemplateLiteralType().types
		templateHead := b.f.NewTemplateHead(texts[0], texts[0], ast.TokenFlagsNone)
		templateSpans := b.f.NewNodeList(core.MapIndex(types, func(t *Type, i int) *ast.Node {
			var res *ast.TemplateMiddleOrTail
			if i < len(types)-1 {
				res = b.f.NewTemplateMiddle(texts[i+1], texts[i+1], ast.TokenFlagsNone)
			} else {
				res = b.f.NewTemplateTail(texts[i+1], texts[i+1], ast.TokenFlagsNone)
			}
			return b.f.NewTemplateLiteralTypeSpan(b.typeToTypeNode(t), res)
		}))
		b.ctx.approximateLength += 2
		return b.f.NewTemplateLiteralTypeNode(templateHead, templateSpans)
	}
	if t.flags&TypeFlagsStringMapping != 0 {
		typeNode := b.typeToTypeNode(t.Target())
		return b.symbolToTypeNode(t.AsStringMappingType().symbol, ast.SymbolFlagsType, b.f.NewNodeList([]*ast.Node{typeNode}))
	}
	if t.flags&TypeFlagsIndexedAccess != 0 {
		objectTypeNode := b.typeToTypeNode(t.AsIndexedAccessType().objectType)
		indexTypeNode := b.typeToTypeNode(t.AsIndexedAccessType().indexType)
		b.ctx.approximateLength += 2
		return b.f.NewIndexedAccessTypeNode(objectTypeNode, indexTypeNode)
	}
	if t.flags&TypeFlagsConditional != 0 {
		return b.visitAndTransformType(t, (*nodeBuilderImpl).conditionalTypeToTypeNode)
	}
	if t.flags&TypeFlagsSubstitution != 0 {
		typeNode := b.typeToTypeNode(t.AsSubstitutionType().baseType)
		if !b.ch.isNoInferType(t) {
			return typeNode
		}
		noInferSymbol := b.ch.getGlobalTypeAliasSymbol("NoInfer", 1, false)
		if noInferSymbol != nil {
			return b.symbolToTypeNode(noInferSymbol, ast.SymbolFlagsType, b.f.NewNodeList([]*ast.Node{typeNode}))
		} else {
			return typeNode
		}
	}

	panic("Should be unreachable.")
}

// Direct serialization core functions for types, type aliases, and symbols

func (t *TypeAlias) ToTypeReferenceNode(b *nodeBuilderImpl) *ast.Node {
	return b.f.NewTypeReferenceNode(b.symbolToEntityNameNode(t.Symbol()), b.mapToTypeNodes(t.TypeArguments(), false /*isBareList*/))
}

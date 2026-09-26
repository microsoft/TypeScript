package checker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// Resolving the members of an instantiated class or interface reference
// instantiates every declared member and merges every inherited one, even when
// the caller only wants one property (`expect(x).toBe`, `schema.optional`,
// `arr.map`). In large programs most of those symbols are never used.
//
// Instead, the first lookup on such a reference prepares a lazy member table:
// it does everything resolveObjectTypeMembers would do except create the
// member symbols, in the same order, so everything that gets resolved along
// the way (signatures, index infos, base types and their members) is resolved
// exactly as before. Lookups then instantiate only the requested member, the
// same way resolveObjectTypeMembers would have at the time the table was
// prepared, and if the members are resolved in full later, the symbols
// already handed out are reused. Should preparing the table lead back to the
// reference, the reference exposes the same partial members that
// resolveObjectTypeMembers would, and is from then on resolved in full.

type lazyMembersState int

const (
	lazyMembersResolvingDeclared lazyMembersState = iota // instantiating declared signatures and index infos, resolving base types
	lazyMembersResolvingBases                            // instantiating base types and resolving their members
	lazyMembersReady
	lazyMembersMaterialized // resolving the members in full, as resolveObjectTypeMembers does
)

type lazyMemberTable struct {
	state               lazyMembersState
	mapper              *TypeMapper
	typeArguments       []*Type
	unaffected          []string // declared members that instantiate to themselves
	callSignatures      []*Signature
	constructSignatures []*Signature
	indexInfos          []*IndexInfo
	baseTypes           []*Type // instantiated base types
	inheritedCount      int     // number of base types whose members have been inherited
	declared            map[string]*ast.Symbol
	found               map[string]*ast.Symbol // memoized lookups; nil means no such member
	resolving           *resolvingMembers
	shape               *lazyShape
}

// lazyShape describes the members of a reference whose lazy member table is
// ready, as far as that is known without resolving them.
type lazyShape struct {
	callSignatureCount      int
	constructSignatureCount int
}

// resolvingMembers holds the members of a lazily prepared type that is being
// resolved in full.
type resolvingMembers struct {
	members             ast.SymbolTable
	callSignatures      []*Signature
	constructSignatures []*Signature
	indexInfos          []*IndexInfo
}

// isUnresolvedInstantiatedReference reports whether t is a reference to a
// generic class or interface (other than the declaration itself) whose members
// haven't been resolved.
func isUnresolvedInstantiatedReference(t *Type) bool {
	if t.flags&TypeFlagsObject == 0 || t.objectFlags&(ObjectFlagsMembersResolved|ObjectFlagsReference) != ObjectFlagsReference {
		return false
	}
	source := t.Target()
	if source == nil || source == t || source.objectFlags&ObjectFlagsClassOrInterface == 0 || source.objectFlags&ObjectFlagsTuple != 0 {
		return false
	}
	return t.symbol == nil || t.symbol.Flags&ast.SymbolFlagsValueModule == 0
}

func (c *Checker) getReferenceMemberTypeArguments(t *Type, source *Type) (typeParameters []*Type, typeArguments []*Type) {
	typeParameters = source.AsInterfaceType().allTypeParameters
	typeArguments = c.getTypeArguments(t)
	if len(typeArguments) == len(typeParameters)-1 {
		typeArguments = core.Concatenate(typeArguments, []*Type{t})
	}
	return typeParameters, typeArguments
}

// getLazyMemberTable returns the lazy member table of t, preparing it first if
// needed, or nil if t's members aren't resolved lazily. A table returned while
// it is still being prepared isn't ready.
func (c *Checker) getLazyMemberTable(t *Type) *lazyMemberTable {
	if !isUnresolvedInstantiatedReference(t) {
		return nil
	}
	if lm := c.lazyMemberTables[t]; lm != nil {
		return lm
	}
	typeParameters, typeArguments := c.getReferenceMemberTypeArguments(t, t.Target())
	if slices.Equal(typeParameters, typeArguments) {
		return nil
	}
	// Resolving deferred type arguments may have led to t being resolved or
	// prepared already. Like resolveObjectTypeMembers, which would then replace
	// those members, prepare t (again) regardless.
	lm := &lazyMemberTable{
		mapper:        newTypeMapper(typeParameters, typeArguments),
		typeArguments: typeArguments,
		declared:      map[string]*ast.Symbol{},
		found:         map[string]*ast.Symbol{},
	}
	c.lazyMemberTables[t] = lm
	c.prepareLazyMembers(t, lm)
	if lm.state != lazyMembersReady {
		return nil
	}
	return lm
}

// prepareLazyMembers mirrors resolveObjectTypeMembers, except that it only
// records which declared members would instantiate to themselves instead of
// instantiating them.
func (c *Checker) prepareLazyMembers(t *Type, lm *lazyMemberTable) {
	source := t.Target()
	resolved := c.resolveDeclaredMembers(source)
	for id, symbol := range resolved.declaredMembers {
		if c.isNamedMember(symbol, id) && c.isSymbolUnaffectedByInstantiation(symbol, lm.mapper) {
			lm.unaffected = append(lm.unaffected, id)
		}
	}
	lm.callSignatures = c.instantiateSignatures(resolved.declaredCallSignatures, lm.mapper)
	lm.constructSignatures = c.instantiateSignatures(resolved.declaredConstructSignatures, lm.mapper)
	lm.indexInfos = c.instantiateIndexInfos(resolved.declaredIndexInfos, lm.mapper)
	baseTypes := c.getBaseTypes(source)
	lm.state = lazyMembersResolvingBases
	if t.objectFlags&ObjectFlagsMembersResolved != 0 {
		// A lookup led to t being resolved in full; resolveObjectTypeMembers
		// would now go on to replace those members with its own.
		c.resolveLazyMembers(t, lm)
	}
	thisArgument := core.LastOrNil(lm.typeArguments)
	for _, baseType := range baseTypes {
		instantiatedBaseType := baseType
		if thisArgument != nil {
			instantiatedBaseType = c.getTypeWithThisArgument(c.instantiateType(baseType, lm.mapper), thisArgument, false /*needsApparentType*/)
		}
		lm.baseTypes = append(lm.baseTypes, instantiatedBaseType)
		if lm.state == lazyMembersResolvingBases && !c.prepareBaseTypeMembers(instantiatedBaseType) {
			// The base type's members are only partially resolved, and t must
			// inherit them as they are now.
			c.resolveLazyMembers(t, lm)
		}
		if lm.state == lazyMembersMaterialized {
			c.inheritBaseTypeMembers(lm.resolving, instantiatedBaseType)
		}
		lm.inheritedCount++
	}
	if lm.state == lazyMembersMaterialized {
		t.objectFlags &^= ObjectFlagsUnresolvedMembers
		c.setStructuredTypeMembers(t, lm.resolving.members, lm.resolving.callSignatures, lm.resolving.constructSignatures, lm.resolving.indexInfos)
		delete(c.lazyMemberTables, t)
		return
	}
	lm.state = lazyMembersReady
}

// prepareBaseTypeMembers resolves the members of an instantiated base type as
// inheriting from it in resolveObjectTypeMembers would. It returns false, and
// leaves that to the caller, when those members are only partially resolved.
func (c *Checker) prepareBaseTypeMembers(baseType *Type) bool {
	if baseType == c.anyType {
		return true
	}
	reduced := c.getReducedApparentType(baseType)
	if reduced.flags&TypeFlagsObject != 0 {
		if reduced.objectFlags&ObjectFlagsUnresolvedMembers != 0 {
			return false
		}
		if lm := c.getLazyMemberTable(reduced); lm != nil {
			return lm.state == lazyMembersReady
		}
	}
	c.getPropertiesOfType(baseType)
	c.getSignaturesOfType(baseType, SignatureKindCall)
	c.getSignaturesOfType(baseType, SignatureKindConstruct)
	c.getIndexInfosOfType(baseType)
	return true
}

// resolveLazyMembers resolves the members of t, whose lazy member table is
// ready, as resolveObjectTypeMembers does. While the table's base types are
// still being prepared, it only exposes the members inherited so far, like
// resolveObjectTypeMembers would at that point, and prepareLazyMembers
// finishes the job.
func (c *Checker) resolveLazyMembers(t *Type, lm *lazyMemberTable) {
	source := t.Target()
	resolved := c.resolveDeclaredMembers(source)
	var members ast.SymbolTable
	if len(resolved.declaredMembers) != 0 {
		members = make(ast.SymbolTable, len(resolved.declaredMembers))
		for id, symbol := range resolved.declaredMembers {
			if c.isNamedMember(symbol, id) {
				members[id] = c.getLazyDeclaredMember(lm, symbol, id)
			}
		}
	}
	r := &resolvingMembers{
		members:             members,
		callSignatures:      lm.callSignatures,
		constructSignatures: lm.constructSignatures,
		indexInfos:          lm.indexInfos,
	}
	if len(c.getBaseTypes(source)) != 0 {
		c.setStructuredTypeMembers(t, r.members, r.callSignatures, r.constructSignatures, r.indexInfos)
		t.objectFlags |= ObjectFlagsUnresolvedMembers
		for _, baseType := range lm.baseTypes[:lm.inheritedCount] {
			c.inheritBaseTypeMembers(r, baseType)
		}
	}
	if lm.state != lazyMembersReady {
		lm.state = lazyMembersMaterialized
		lm.resolving = r
		return
	}
	t.objectFlags &^= ObjectFlagsUnresolvedMembers
	c.setStructuredTypeMembers(t, r.members, r.callSignatures, r.constructSignatures, r.indexInfos)
	delete(c.lazyMemberTables, t)
}

// inheritBaseTypeMembers is the body of the base type loop in
// resolveObjectTypeMembers.
func (c *Checker) inheritBaseTypeMembers(r *resolvingMembers, baseType *Type) {
	r.members = c.addInheritedMembers(r.members, c.getPropertiesOfType(baseType))
	r.callSignatures = core.Concatenate(r.callSignatures, c.getSignaturesOfType(baseType, SignatureKindCall))
	r.constructSignatures = core.Concatenate(r.constructSignatures, c.getSignaturesOfType(baseType, SignatureKindConstruct))
	var inheritedIndexInfos []*IndexInfo
	if baseType != c.anyType {
		inheritedIndexInfos = c.getIndexInfosOfType(baseType)
	} else {
		inheritedIndexInfos = []*IndexInfo{c.anyBaseTypeIndexInfo}
	}
	r.indexInfos = core.Concatenate(r.indexInfos, core.Filter(inheritedIndexInfos, func(info *IndexInfo) bool {
		return findIndexInfo(r.indexInfos, info.keyType) == nil
	}))
}

// getLazyDeclaredMember instantiates the declared member symbol named name as
// resolveObjectTypeMembers would have when the table was prepared.
func (c *Checker) getLazyDeclaredMember(lm *lazyMemberTable, symbol *ast.Symbol, name string) *ast.Symbol {
	result := lm.declared[name]
	if result == nil {
		if slices.Contains(lm.unaffected, name) {
			result = symbol
		} else {
			result = c.newInstantiatedSymbol(symbol, lm.mapper)
		}
		lm.declared[name] = result
	}
	return result
}

// lookupMemberLazily returns what resolveStructuredTypeMembers(t).members[name]
// would hold, without building t's member table. ok is false when the lazy
// path can't answer and the caller must resolve members normally.
func (c *Checker) lookupMemberLazily(t *Type, name string) (symbol *ast.Symbol, ok bool) {
	if isReservedMemberName(name) {
		return nil, false
	}
	lm := c.getLazyMemberTable(t)
	if lm == nil || lm.state == lazyMembersResolvingDeclared {
		return nil, false
	}
	if symbol, ok := lm.found[name]; ok {
		return symbol, true
	}
	// Mirrors resolveObjectTypeMembers: declared named members first, then
	// inherited properties, where a base may only fill a missing or non-value
	// entry (addInheritedMembers).
	resolved := c.resolveDeclaredMembers(t.Target())
	var result *ast.Symbol
	if decl := resolved.declaredMembers[name]; decl != nil && c.isNamedMember(decl, name) {
		result = c.getLazyDeclaredMember(lm, decl, name)
	}
	baseTypes := lm.baseTypes[:lm.inheritedCount]
	if lm.state != lazyMembersReady && len(resolved.declaredMembers) == 0 {
		// While base types are being resolved, resolveObjectTypeMembers only
		// exposes inherited members through the table of declared members.
		baseTypes = nil
	}
	for _, baseType := range baseTypes {
		if result != nil && result.Flags&ast.SymbolFlagsValue != 0 {
			break
		}
		if prop := c.getNamedPropertyOfType(baseType, name); prop != nil && !isStaticPrivateIdentifierProperty(prop) {
			result = prop
		}
	}
	if lm.state == lazyMembersReady {
		lm.found[name] = result
	}
	return result, true
}

// getNamedPropertyOfType finds name among getPropertiesOfType(t).
func (c *Checker) getNamedPropertyOfType(t *Type, name string) *ast.Symbol {
	reduced := c.getReducedApparentType(t)
	if reduced.flags&TypeFlagsObject != 0 {
		if symbol, ok := c.lookupMemberLazily(reduced, name); ok {
			return symbol
		}
		if symbol := c.resolveStructuredTypeMembers(reduced).members[name]; symbol != nil && c.isNamedMember(symbol, name) {
			return symbol
		}
		return nil
	}
	for _, prop := range c.getPropertiesOfType(t) {
		if prop.Name == name {
			return prop
		}
	}
	return nil
}

// getLazyShape returns the shape of t when t has a lazy member table that is
// ready. It is computed from the declared signatures and those of the
// prepared base types, which resolveObjectTypeMembers concatenates.
func (c *Checker) getLazyShape(t *Type) *lazyShape {
	lm := c.getLazyMemberTable(t)
	if lm == nil || lm.state != lazyMembersReady {
		return nil
	}
	if lm.shape == nil {
		shape := &lazyShape{
			callSignatureCount:      len(lm.callSignatures),
			constructSignatureCount: len(lm.constructSignatures),
		}
		for _, baseType := range lm.baseTypes {
			if baseShape := c.getLazyShape(c.getReducedApparentType(baseType)); baseShape != nil {
				shape.callSignatureCount += baseShape.callSignatureCount
				shape.constructSignatureCount += baseShape.constructSignatureCount
			} else {
				shape.callSignatureCount += len(c.getSignaturesOfType(baseType, SignatureKindCall))
				shape.constructSignatureCount += len(c.getSignaturesOfType(baseType, SignatureKindConstruct))
			}
		}
		lm.shape = shape
	}
	return lm.shape
}
